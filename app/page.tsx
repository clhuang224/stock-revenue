'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Autocomplete,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material'
import { revenueQueryOptions } from './apis/revenue'
import { stocksQueryOptions } from './apis/stocks'
import BaseTable from './components/BaseTable'
import HomePanel from './components/home/HomePanel'
import RevenueTrendChart from './components/RevenueTrendChart'
import type { RevenuePoint } from './interfaces/RevenuePoint'
import type { StockOption } from './interfaces/StockOption'

const defaultStockId = '2867'

function formatNumber(value: number) {
  return value.toLocaleString('en-US')
}

function formatPercent(value: number | null) {
  return value === null ? '-' : value.toFixed(2)
}

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

export default function Home() {
  const [selectedStockId, setSelectedStockId] = useState(defaultStockId)
  const stocksQuery = useQuery(stocksQueryOptions())
  const revenueQuery = useQuery(revenueQueryOptions(selectedStockId))
  const stocks = stocksQuery.data ?? []
  const selectedStock =
    stocks.find((stock) => stock.stockId === selectedStockId) ?? null
  const revenuePoints = revenueQuery.data ?? []
  const tableColumns = buildTableColumns(revenuePoints)
  const tableRows = buildTableRows(revenuePoints)
  const hasRevenueData = revenuePoints.length > 0

  return (
    <Box
      component="main"
      sx={{ minHeight: '100vh', bgcolor: 'background.default' }}
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
          <Autocomplete
            size="small"
            options={stocks}
            value={selectedStock}
            loading={stocksQuery.isLoading}
            getOptionKey={(option) => option.stockId}
            getOptionLabel={(option) => `${option.stockId} ${option.stockName}`}
            isOptionEqualToValue={(option, value) =>
              option.stockId === value.stockId
            }
            onChange={(_, option: StockOption | null) => {
              if (option) {
                setSelectedStockId(option.stockId)
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="輸入台股代號或名稱，查看公司價值"
              />
            )}
            sx={{
              width: 390,
              mx: 'auto',
            }}
          />
        </Container>
      </Box>

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
          title={
            selectedStock
              ? `${selectedStock.stockName} (${selectedStock.stockId})`
              : selectedStockId
          }
        />

        <HomePanel
          leftAction={<Button variant="contained">每月營收</Button>}
          rightAction={<Button variant="contained">近 5 年</Button>}
        >
          {revenueQuery.isLoading ? (
            <Typography sx={{ color: 'text.secondary' }}>
              資料載入中...
            </Typography>
          ) : revenueQuery.isError ? (
            <Typography sx={{ color: 'error.main' }}>
              月營收資料載入失敗，請稍後再試。
            </Typography>
          ) : hasRevenueData ? (
            <RevenueTrendChart data={revenuePoints} />
          ) : (
            <Typography sx={{ color: 'text.secondary' }}>
              查無月營收資料。
            </Typography>
          )}
        </HomePanel>

        <HomePanel leftAction={<Button variant="contained">詳細數據</Button>}>
          {revenueQuery.isLoading ? (
            <Typography sx={{ color: 'text.secondary' }}>
              資料載入中...
            </Typography>
          ) : revenueQuery.isError ? (
            <Typography sx={{ color: 'error.main' }}>
              詳細資料載入失敗，請稍後再試。
            </Typography>
          ) : hasRevenueData ? (
            <BaseTable
              firstColumnLabel="年度月份"
              columns={tableColumns}
              rows={tableRows}
              minWidth={Math.max(760, 160 + tableColumns.length * 110)}
            />
          ) : (
            <Typography sx={{ color: 'text.secondary' }}>
              查無詳細資料。
            </Typography>
          )}
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
  )
}
