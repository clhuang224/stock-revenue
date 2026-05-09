'use client'

import type { SxProps, Theme } from '@mui/material/styles'
import { Box } from '@mui/material'
import {
  BarPlot,
  ChartsAxisHighlight,
  ChartsContainer,
  ChartsGrid,
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
  barStroke?: string
  height?: number
  sx?: SxProps<Theme>
}

export default function BaseMixedChart({
  dataset,
  xAxis,
  yAxis,
  series,
  barStroke,
  height = 420,
  sx,
}: BaseMixedChartProps) {
  const chartYAxis = yAxis.map((axis) => ({ ...axis, label: undefined }))
  const [leftAxis, rightAxis] = yAxis

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 8,
          right: 8,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: 'none',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Box
            component="span"
            sx={{ color: 'text.secondary', fontSize: 12, fontWeight: 700 }}
          >
            {leftAxis?.label}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {series.map((item) => (
              <Box
                key={item.dataKey ?? item.id ?? item.label?.toString()}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: 'text.secondary',
                  fontSize: 12,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: 12,
                    height: 10,
                    bgcolor: item.color,
                    border:
                      item.type === 'bar' && barStroke
                        ? `1px solid ${barStroke}`
                        : 0,
                  }}
                />
                <Box component="span">
                  {typeof item.label === 'function'
                    ? item.label('legend')
                    : item.label}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          component="span"
          sx={{ color: 'text.secondary', fontSize: 12, fontWeight: 700 }}
        >
          {rightAxis?.label}
        </Box>
      </Box>

      <ChartsContainer
        height={height}
        dataset={dataset}
        margin={{ top: 32, right: 8, bottom: 24, left: 8 }}
        xAxis={[xAxis]}
        yAxis={chartYAxis}
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
            '& .MuiChartsGrid-line': {
              stroke: 'var(--grid-line)',
            },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <ChartsGrid
          horizontal
          vertical
        />
        <BarPlot
          borderRadius={0}
          slotProps={{
            bar: barStroke
              ? {
                  stroke: barStroke,
                  strokeWidth: 1,
                }
              : undefined,
          }}
        />
        <LinePlot />
        <ChartsAxisHighlight x="band" />
        <ChartsTooltip trigger="axis" />
        <ChartsXAxis axisId={xAxis.id} />
        {yAxis.map((axis) => (
          <ChartsYAxis
            key={axis.id}
            axisId={axis.id}
          />
        ))}
      </ChartsContainer>
    </Box>
  )
}
