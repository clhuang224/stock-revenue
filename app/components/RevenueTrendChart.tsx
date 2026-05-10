'use client'

import { useState } from 'react'
import {
  Box,
  Checkbox,
  FormControlLabel,
  Skeleton,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import BaseMixedChart from './BaseMixedChart'

export type RevenueTrendChartPoint = {
  label: string
  revenue: number
  yoyGrowth: number | null
}

type RevenueTrendChartProps = {
  data: RevenueTrendChartPoint[]
  height?: number
  loading?: boolean
  error?: boolean
  empty?: boolean
  errorMessage?: string
  emptyMessage?: string
}

function formatNumber(value: number) {
  return value.toLocaleString('en-US')
}

function isFirstMonthOfYear(value: string | number | Date) {
  return String(value).endsWith('/01')
}

function formatMonthAxisLabel(
  value: string | number | Date,
  context: { location: string },
) {
  const label = String(value)

  return context.location === 'tick' ? label.slice(0, 4) : label
}

export default function RevenueTrendChart({
  data,
  height,
  loading = false,
  error = false,
  empty = false,
  errorMessage = '月營收資料載入失敗，請稍後再試。',
  emptyMessage = '查無月營收資料。',
}: RevenueTrendChartProps) {
  const theme = useTheme()
  const [showRevenue, setShowRevenue] = useState(true)
  const [showGrowth, setShowGrowth] = useState(true)
  const yAxis = [
    {
      id: 'revenue',
      position: 'left' as const,
      width: 'auto' as const,
      label: '千元',
      valueFormatter: (value: number) => formatNumber(value),
    },
    {
      id: 'growth',
      position: 'right' as const,
      width: 'auto' as const,
      label: '%',
      valueFormatter: (value: number) => value.toFixed(0),
    },
  ].filter((axis) =>
    axis.id === 'revenue' ? showRevenue || !showGrowth : showGrowth,
  )
  const series = [
    showRevenue
      ? {
          type: 'bar' as const,
          dataKey: 'revenue',
          yAxisId: 'revenue',
          label: '每月營收',
          color: theme.palette.chart.revenueSoft,
          valueFormatter: (value: number | null) =>
            value === null ? '-' : `${formatNumber(value)} 千元`,
        }
      : null,
    showGrowth
      ? {
          type: 'line' as const,
          dataKey: 'yoyGrowth',
          yAxisId: 'growth',
          label: '單月營收年增率 (%)',
          color: theme.palette.chart.growth,
          curve: 'linear' as const,
          valueFormatter: (value: number | null) =>
            value === null ? '-' : `${value.toFixed(2)}%`,
        }
      : null,
  ].filter((item) => item !== null)

  if (loading) {
    return (
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1,
          }}
        >
          <Skeleton
            variant="text"
            width={180}
            height={24}
          />
          <Skeleton
            variant="text"
            width={28}
            height={24}
          />
        </Box>
        <Skeleton
          variant="rounded"
          height={height ?? 420}
          sx={{ width: '100%' }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1.5,
            mt: 1,
          }}
        >
          <Skeleton
            variant="rounded"
            width={96}
            height={28}
          />
          <Skeleton
            variant="rounded"
            width={168}
            height={28}
          />
        </Box>
      </Box>
    )
  }

  if (error) {
    return <Typography sx={{ color: 'error.main' }}>{errorMessage}</Typography>
  }

  if (empty) {
    return (
      <Typography sx={{ color: 'text.secondary' }}>{emptyMessage}</Typography>
    )
  }

  return (
    <Box>
      <BaseMixedChart
        height={height}
        dataset={data}
        barStroke={theme.palette.chart.revenue}
        xAxis={{
          id: 'month',
          dataKey: 'label',
          scaleType: 'band',
          tickInterval: isFirstMonthOfYear,
          tickLabelInterval: isFirstMonthOfYear,
          valueFormatter: formatMonthAxisLabel,
        }}
        yAxis={yAxis}
        series={series}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1.5,
          mt: 1,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={showRevenue}
              onChange={(event) => setShowRevenue(event.target.checked)}
            />
          }
          label="每月營收"
        />
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={showGrowth}
              onChange={(event) => setShowGrowth(event.target.checked)}
            />
          }
          label="單月營收年增率(%)"
        />
      </Box>
    </Box>
  )
}
