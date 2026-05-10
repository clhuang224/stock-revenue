'use client'

import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import type { DateValidationError } from '@mui/x-date-pickers/models'
import {
  endOfDay,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  isSameMonth,
  startOfMonth,
} from 'date-fns'
import BaseMenu, { type BaseMenuOption } from '../BaseMenu'
import { TimeRangePreset } from '../../enums/TimeRangePreset'
import { timeRangePresetMapMonthCount } from '../../constants/timeRangePresetMapMonthCount'
import { createRecentDateRange, type DateRange } from '../../utils/date'
import { getEnumValues } from '../../utils/getEnumValues'
import { timeRangePresetMapName } from '../../constants/timeRangePresetMapName'

export type RevenueTimeRange = DateRange

const CUSTOM_OPTION_VALUE = 'custom' as const
const CUSTOM_OPTION_LABEL = '自訂' as const
const maxRevenueMonthCount =
  timeRangePresetMapMonthCount[TimeRangePreset.EIGHT_YEARS]

type DraftDateRange = {
  startDate?: Date | null
  endDate?: Date | null
}

type TimeRangeMenuValue = TimeRangePreset | typeof CUSTOM_OPTION_VALUE

type RevenueTimeRangeControlProps = {
  value: RevenueTimeRange | null
  maxDate: Date
  onChange: (value: RevenueTimeRange) => void
}

const defaultTimeRangePreset = TimeRangePreset.FIVE_YEARS

const timeRangeMenuOptions: BaseMenuOption<TimeRangeMenuValue>[] = [
  ...getEnumValues(TimeRangePreset).map((timeRangePreset) => ({
    label: timeRangePresetMapName[timeRangePreset],
    value: timeRangePreset,
  })),
  {
    label: CUSTOM_OPTION_LABEL,
    value: CUSTOM_OPTION_VALUE,
  },
]

function getDateRangeFromPreset(
  timeRangePreset: TimeRangePreset,
): RevenueTimeRange {
  const monthCount = timeRangePresetMapMonthCount[timeRangePreset]

  return createRecentDateRange(monthCount)
}

function getDefaultCustomRange(): RevenueTimeRange {
  return createRecentDateRange(12)
}

function getMinSelectableDate() {
  return startOfMonth(createRecentDateRange(maxRevenueMonthCount).startDate)
}

function normalizeStartDate(value: Date | null) {
  return value ? startOfMonth(value) : null
}

function normalizeEndDate(value: Date | null) {
  if (!value) {
    return null
  }

  return isSameMonth(value, new Date())
    ? endOfDay(new Date())
    : endOfMonth(value)
}

function formatDateRangeLabel(dateRange: RevenueTimeRange) {
  return `${format(dateRange.startDate, 'yyyy/MM/dd')} - ${format(
    dateRange.endDate,
    'yyyy/MM/dd',
  )}`
}

function isCompleteDateRange(value: DraftDateRange): value is RevenueTimeRange {
  return Boolean(value.startDate && value.endDate)
}

function getDraftDateRange(value: RevenueTimeRange): DraftDateRange {
  return {
    startDate: value.startDate,
    endDate: value.endDate,
  }
}

function isSameDateRange(
  currentRange: RevenueTimeRange | null,
  nextRange: RevenueTimeRange,
) {
  return (
    currentRange?.startDate.getTime() === nextRange.startDate.getTime() &&
    currentRange.endDate.getTime() === nextRange.endDate.getTime()
  )
}

function getMatchingTimeRangePreset(value: RevenueTimeRange | null) {
  if (!value) {
    return null
  }

  return (
    getEnumValues(TimeRangePreset).find((timeRangePreset) =>
      isSameDateRange(value, getDateRangeFromPreset(timeRangePreset)),
    ) ?? null
  )
}

export default function RevenueTimeRangeControl({
  value,
  maxDate,
  onChange,
}: RevenueTimeRangeControlProps) {
  const [isCustomDialogOpen, setIsCustomDialogOpen] = useState(false)
  const [startDateError, setStartDateError] =
    useState<DateValidationError>(null)
  const [endDateError, setEndDateError] = useState<DateValidationError>(null)
  const [draftCustomRange, setDraftCustomRange] = useState<DraftDateRange>(
    getDraftDateRange(value ?? getDefaultCustomRange()),
  )
  const selectedPreset =
    getMatchingTimeRangePreset(value) ?? (value ? null : defaultTimeRangePreset)
  const menuValue = selectedPreset ?? CUSTOM_OPTION_VALUE
  const menuLabel = selectedPreset
    ? timeRangePresetMapName[selectedPreset]
    : value
      ? formatDateRangeLabel(value)
      : CUSTOM_OPTION_LABEL

  useEffect(() => {
    if (!selectedPreset || value) {
      return
    }

    onChange(getDateRangeFromPreset(selectedPreset))
  }, [onChange, selectedPreset, value])

  function handleChange(nextValue: TimeRangeMenuValue) {
    if (nextValue === CUSTOM_OPTION_VALUE) {
      setDraftCustomRange(
        value ? getDraftDateRange(value) : getDefaultCustomRange(),
      )
      setStartDateError(null)
      setEndDateError(null)
      setIsCustomDialogOpen(true)

      return
    }

    onChange(getDateRangeFromPreset(nextValue))
  }

  function handleStartMonthChange(nextStartMonth: Date | null) {
    const startDate = normalizeStartDate(nextStartMonth)
    const endDate =
      startDate &&
      draftCustomRange.endDate &&
      isAfter(startDate, draftCustomRange.endDate)
        ? endOfMonth(startDate)
        : draftCustomRange.endDate

    setDraftCustomRange({
      startDate,
      endDate,
    })
  }

  function handleEndMonthChange(nextEndMonth: Date | null) {
    const endDate = normalizeEndDate(nextEndMonth)
    const startDate =
      endDate &&
      draftCustomRange.startDate &&
      isBefore(endDate, draftCustomRange.startDate)
        ? startOfMonth(endDate)
        : draftCustomRange.startDate

    setDraftCustomRange({
      startDate,
      endDate,
    })
  }

  function handleCloseCustomDialog() {
    setIsCustomDialogOpen(false)
  }

  const hasCustomRangeError = Boolean(startDateError || endDateError)

  function handleApplyCustomRange() {
    if (!isCompleteDateRange(draftCustomRange) || hasCustomRangeError) {
      return
    }

    onChange(draftCustomRange)
    setIsCustomDialogOpen(false)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <BaseMenu
          id="revenue-range-menu"
          label={menuLabel}
          options={timeRangeMenuOptions}
          value={menuValue}
          onChange={handleChange}
        />
        <Dialog
          open={isCustomDialogOpen}
          onClose={handleCloseCustomDialog}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>選擇時間區間</DialogTitle>
          <DialogContent
            sx={{
              display: 'flex',
              gap: 1.5,
            }}
          >
            <DatePicker
              label="起始月份"
              views={['year', 'month']}
              openTo="month"
              format="yyyy/MM"
              value={draftCustomRange.startDate ?? null}
              minDate={getMinSelectableDate()}
              maxDate={draftCustomRange.endDate ?? maxDate}
              onChange={handleStartMonthChange}
              onError={setStartDateError}
              slotProps={{
                textField: {
                  size: 'small',
                  sx: { width: 140, mt: 1 },
                },
              }}
            />
            <DatePicker
              label="結束月份"
              views={['year', 'month']}
              openTo="month"
              format="yyyy/MM"
              value={draftCustomRange.endDate ?? null}
              minDate={draftCustomRange.startDate ?? getMinSelectableDate()}
              maxDate={maxDate}
              onChange={handleEndMonthChange}
              onError={setEndDateError}
              slotProps={{
                textField: {
                  size: 'small',
                  sx: { width: 140, mt: 1 },
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="text"
              onClick={handleCloseCustomDialog}
            >
              取消
            </Button>
            <Button
              variant="contained"
              disabled={
                !draftCustomRange.startDate ||
                !draftCustomRange.endDate ||
                hasCustomRangeError
              }
              onClick={handleApplyCustomRange}
            >
              確定
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  )
}
