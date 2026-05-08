'use client'

import type { SxProps, Theme } from '@mui/material/styles'
import {
  BarPlot,
  ChartsAxisHighlight,
  ChartsContainer,
  ChartsGrid,
  ChartsLegend,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  LinePlot,
  type XAxis,
  type YAxis,
} from '@mui/x-charts'
import type { BarSeriesType, LineSeriesType } from '@mui/x-charts/models'

type MixedChartSeries = BarSeriesType | LineSeriesType

type BaseMixedChartProps = {
  dataset: Record<string, unknown>[]
  xAxis: XAxis
  yAxis: YAxis[]
  series: MixedChartSeries[]
  height?: number
  sx?: SxProps<Theme>
}

export default function BaseMixedChart({
  dataset,
  xAxis,
  yAxis,
  series,
  height = 420,
  sx,
}: BaseMixedChartProps) {
  return (
    <ChartsContainer
      height={height}
      dataset={dataset}
      margin={{ top: 48, right: 54, bottom: 38, left: 74 }}
      xAxis={[xAxis]}
      yAxis={yAxis}
      series={series}
      sx={[
        {
          '& .MuiChartsAxis-line': {
            stroke: 'var(--grid-line)',
          },
          '& .MuiChartsAxis-tick': {
            stroke: 'var(--grid-line)',
          },
          '& .MuiChartsAxis-tickLabel': {
            fill: 'var(--foreground)',
            fontSize: 12,
          },
          '& .MuiChartsAxis-label': {
            fill: 'var(--foreground)',
            fontSize: 12,
            fontWeight: 700,
          },
          '& .MuiChartsGrid-line': {
            stroke: 'var(--grid-line)',
          },
          '& .MuiChartsLegend-label': {
            fill: 'var(--foreground)',
            fontSize: 12,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <ChartsGrid
        horizontal
        vertical
      />
      <BarPlot borderRadius={0} />
      <LinePlot />
      <ChartsAxisHighlight x="band" />
      <ChartsTooltip trigger="axis" />
      <ChartsLegend
        direction="horizontal"
        sx={{
          justifyContent: 'center',
        }}
      />
      <ChartsXAxis axisId={xAxis.id} />
      {yAxis.map((axis) => (
        <ChartsYAxis
          key={axis.id}
          axisId={axis.id}
        />
      ))}
    </ChartsContainer>
  )
}
