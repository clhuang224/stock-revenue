'use client'

import { useQuery } from '@tanstack/react-query'
import { Box, Button, Container, Typography } from '@mui/material'
import { isWithinInterval } from 'date-fns'
import { revenueQueryOptions } from './apis/revenue'
import { stocksQueryOptions } from './apis/stocks'
import BaseTable from './components/BaseTable'
import HomePanel from './components/home/HomePanel'
import RevenueTimeRangeControl, {
  type RevenueTimeRange,
} from './components/home/RevenueTimeRangeControl'
import RevenueTrendChart from './components/RevenueTrendChart'
import StockAutocomplete from './components/StockAutocomplete'
import useRevenueSearchParams from './hooks/useRevenueSearchParams'
import type { RevenuePoint } from './interfaces/RevenuePoint'
import { formatNumber, formatPercent } from './utils/format'

function getTableMonthId(point: RevenuePoint) {
  return `${point.year}${String(point.month).padStart(2, '0')}`
}

function buildTableColumns(revenuePoints: RevenuePoint[]) {
  return revenuePoints.map((point) => ({
    id: getTableMonthId(point),
    label: getTableMonthId(point),
  }))
}

function buildTableRows(revenuePoints: RevenuePoint[]) {
  return [
    {
      id: 'monthly-revenue',
      label: '每月營收',
      cells: Object.fromEntries(
        revenuePoints.map((point) => [
          getTableMonthId(point),
          formatNumber(point.revenue),
        ]),
      ),
    },
    {
      id: 'monthly-yoy-growth',
      label: '單月營收年增率 (%)',
      cells: Object.fromEntries(
        revenuePoints.map((point) => [
          getTableMonthId(point),
          formatPercent(point.yoyGrowth),
        ]),
      ),
    },
  ]
}

function filterRevenuePointsByDateRange(
  revenuePoints: RevenuePoint[],
  dateRange: RevenueTimeRange,
) {
  return revenuePoints.filter((point) =>
    isWithinInterval(new Date(point.year, point.month - 1, 1), {
      start: dateRange.startDate,
      end: dateRange.endDate,
    }),
  )
}

export default function Home() {
  const revenueSearchParams = useRevenueSearchParams()
  const selectedStockId = revenueSearchParams.stockId
  const revenueTimeRange = revenueSearchParams.dateRange
  const stocksQuery = useQuery(stocksQueryOptions())
  const revenueQuery = useQuery({
    ...revenueQueryOptions(selectedStockId),
    enabled: revenueSearchParams.isReady,
  })
  const stocks = stocksQuery.data ?? []
  const selectedStock =
    stocks.find((stock) => stock.stockId === selectedStockId) ?? null
  const revenuePoints = revenueQuery.data ?? []
  const filteredRevenuePoints = revenueTimeRange
    ? filterRevenuePointsByDateRange(revenuePoints, revenueTimeRange)
    : []
  const tableColumns = buildTableColumns(filteredRevenuePoints)
  const tableRows = buildTableRows(filteredRevenuePoints)
  const hasRawRevenueData = revenuePoints.length > 0
  const hasRevenueData = filteredRevenuePoints.length > 0
  const isRevenueLoading =
    !revenueSearchParams.isReady || revenueQuery.isLoading
  const isTimeRangeLoading = hasRawRevenueData && !revenueTimeRange
  const isRevenueDataLoading = isRevenueLoading || isTimeRangeLoading

  return (
    <Box
      sx={{
        height: '100dvh',
        bgcolor: 'background.default',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      <Box
        component="header"
        sx={{
          height: 68,
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container
          maxWidth={false}
          sx={{ maxWidth: 1280 }}
        >
          <StockAutocomplete
            options={stocks}
            value={selectedStock}
            loading={stocksQuery.isLoading || !revenueSearchParams.isReady}
            onChange={revenueSearchParams.setStockId}
          />
        </Container>
      </Box>
      <Box
        component="main"
        sx={{
          overflowY: 'auto',
          flex: 1,
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            py: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <HomePanel
            loading={stocksQuery.isLoading || !revenueSearchParams.isReady}
            title={
              selectedStock
                ? `${selectedStock.stockName} (${selectedStock.stockId})`
                : selectedStockId
            }
          />

          <HomePanel
            leftAction={<Button variant="contained">每月營收</Button>}
            rightAction={
              revenueSearchParams.isReady ? (
                <RevenueTimeRangeControl
                  value={revenueTimeRange}
                  maxDate={new Date()}
                  onChange={revenueSearchParams.setDateRange}
                />
              ) : null
            }
          >
            <RevenueTrendChart
              data={filteredRevenuePoints}
              loading={isRevenueDataLoading}
              error={revenueQuery.isError}
              empty={!isRevenueDataLoading && !hasRevenueData}
            />
          </HomePanel>

          <HomePanel leftAction={<Button variant="contained">詳細數據</Button>}>
            <BaseTable
              loading={isRevenueDataLoading}
              error={revenueQuery.isError}
              empty={!isRevenueDataLoading && !hasRevenueData}
              firstColumnLabel="年度月份"
              columns={tableColumns}
              rows={tableRows}
              minWidth={Math.max(760, 160 + tableColumns.length * 110)}
            />
          </HomePanel>

          <Box sx={{ mt: 2.4, textAlign: 'center', color: 'text.secondary' }}>
            <Typography variant="body2">
              圖表單位：千元，數據來自公開資訊觀測站
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 0.6 }}
            >
              資料來源：FinMind，原始資料來自公開資訊觀測站
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
