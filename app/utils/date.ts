import {
  endOfDay,
  format,
  isValid,
  startOfDay,
  startOfMonth,
  subMonths,
} from 'date-fns'
import { FinMindDate } from '../types/FinMindDate'

export type DateRange = {
  startDate: Date
  endDate: Date
}

export function createRecentDateRange(
  monthCount: number,
  baseDate = new Date(),
): DateRange {
  const endDate = endOfDay(baseDate)

  return {
    startDate: startOfMonth(subMonths(baseDate, monthCount)),
    endDate,
  }
}

export function createWithinDateRange(
  monthCount: number,
  baseDate = new Date(),
): DateRange {
  const endDate = endOfDay(baseDate)

  return {
    startDate: startOfDay(subMonths(baseDate, monthCount)),
    endDate,
  }
}

export function formatDateParam(date: Date) {
  return String(date.getTime())
}

export function parseDateParam(value: string | null) {
  if (!value) {
    return null
  }

  const timestamp = Number(value)
  const date = new Date(timestamp)

  if (!Number.isSafeInteger(timestamp) || !isValid(date)) {
    return null
  }

  return date
}

export function formatFinMindDate(date: Date): FinMindDate {
  return format(date, 'yyyy-MM-dd') as FinMindDate
}
