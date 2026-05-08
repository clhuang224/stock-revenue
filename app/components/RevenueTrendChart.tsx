'use client'

import BaseMixedChart from './BaseMixedChart'

export type RevenueTrendChartPoint = {
  label: string
  revenue: number
  yoyGrowth: number
}

type RevenueTrendChartProps = {
  data: RevenueTrendChartPoint[]
  height?: number
}

function formatNumber(value: number) {
  return value.toLocaleString('en-US')
}

export default function RevenueTrendChart({
  data,
  height,
}: RevenueTrendChartProps) {
  return (
    <BaseMixedChart
      height={height}
      dataset={data}
      xAxis={{
        id: 'month',
        dataKey: 'label',
        scaleType: 'band',
        valueFormatter: (value: string | number | Date) => String(value),
        tickLabelInterval: (_, index) => index % 12 === 0,
      }}
      yAxis={[
        {
          id: 'revenue',
          position: 'left',
          label: '千元',
          valueFormatter: (value: number) => formatNumber(value),
        },
        {
          id: 'growth',
          position: 'right',
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
          color: '#f5a400',
          valueFormatter: (value: number | null) =>
            value === null ? '-' : `${formatNumber(value)} 千元`,
        },
        {
          type: 'line',
          dataKey: 'yoyGrowth',
          yAxisId: 'growth',
          label: '單月營收年增率 (%)',
          color: '#ef5350',
          curve: 'linear',
          valueFormatter: (value: number | null) =>
            value === null ? '-' : `${value.toFixed(2)}%`,
        },
      ]}
    />
  )
}
