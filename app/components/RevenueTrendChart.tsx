'use client'

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
}: RevenueTrendChartProps) {
  const theme = useTheme()

  return (
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
      yAxis={[
        {
          id: 'revenue',
          position: 'left',
          width: 'auto',
          label: '千元',
          valueFormatter: (value: number) => formatNumber(value),
        },
        {
          id: 'growth',
          position: 'right',
          width: 'auto',
          label: '%',
          valueFormatter: (value: number) => `${value.toFixed(1)}%`,
        },
      ]}
      series={[
        {
          type: 'bar',
          dataKey: 'revenue',
          yAxisId: 'revenue',
          label: '每月營收',
          color: theme.palette.chart.revenueSoft,
          valueFormatter: (value: number | null) =>
            value === null ? '-' : `${formatNumber(value)} 千元`,
        },
        {
          type: 'line',
          dataKey: 'yoyGrowth',
          yAxisId: 'growth',
          label: '單月營收年增率 (%)',
          color: theme.palette.chart.growth,
          curve: 'linear',
          valueFormatter: (value: number | null) =>
            value === null ? '-' : `${value.toFixed(2)}%`,
        },
      ]}
    />
  )
}
