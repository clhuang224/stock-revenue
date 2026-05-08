'use client'

import {
  Autocomplete,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import BaseTable from './components/BaseTable'

type StockOption = {
  stockId: string
  stockName: string
}

type RevenuePoint = {
  label: string
  revenue: number
  yoyGrowth: number
}

const stocks: StockOption[] = [
  { stockId: '2330', stockName: '台積電' },
  { stockId: '2317', stockName: '鴻海' },
  { stockId: '2454', stockName: '聯發科' },
  { stockId: '2867', stockName: '三商壽' },
  { stockId: '2412', stockName: '中華電' },
  { stockId: '2603', stockName: '長榮' },
]

const revenuePoints: RevenuePoint[] = [
  { label: '2019/01', revenue: 12680000, yoyGrowth: 10.4 },
  { label: '2019/02', revenue: 13120000, yoyGrowth: 11.6 },
  { label: '2019/03', revenue: 13800000, yoyGrowth: 10.8 },
  { label: '2019/04', revenue: 14450000, yoyGrowth: 10.1 },
  { label: '2019/05', revenue: 13270000, yoyGrowth: 10.3 },
  { label: '2019/06', revenue: 14760000, yoyGrowth: 10.7 },
  { label: '2019/07', revenue: 14240000, yoyGrowth: 11.2 },
  { label: '2019/08', revenue: 13690000, yoyGrowth: 11.7 },
  { label: '2019/09', revenue: 13420000, yoyGrowth: 10.9 },
  { label: '2019/10', revenue: 14180000, yoyGrowth: 11.4 },
  { label: '2019/11', revenue: 12990000, yoyGrowth: 11.6 },
  { label: '2019/12', revenue: 15120000, yoyGrowth: 12.2 },
  { label: '2020/01', revenue: 17380000, yoyGrowth: 12.4 },
  { label: '2020/02', revenue: 10860000, yoyGrowth: 9.2 },
  { label: '2020/03', revenue: 11470000, yoyGrowth: 9.4 },
  { label: '2020/04', revenue: 15250000, yoyGrowth: 9.9 },
  { label: '2020/05', revenue: 16130000, yoyGrowth: 9.9 },
  { label: '2020/06', revenue: 15920000, yoyGrowth: 9.5 },
  { label: '2020/07', revenue: 11250000, yoyGrowth: 9.2 },
  { label: '2020/08', revenue: 13470000, yoyGrowth: 8.6 },
  { label: '2020/09', revenue: 16550000, yoyGrowth: 8.2 },
  { label: '2020/10', revenue: 17100000, yoyGrowth: 8.0 },
  { label: '2020/11', revenue: 17840000, yoyGrowth: 8.7 },
  { label: '2020/12', revenue: 14700000, yoyGrowth: 9.3 },
  { label: '2021/01', revenue: 15620000, yoyGrowth: 9.1 },
  { label: '2021/02', revenue: 9830000, yoyGrowth: 9.0 },
  { label: '2021/03', revenue: 10690000, yoyGrowth: 8.9 },
  { label: '2021/04', revenue: 11380000, yoyGrowth: 8.4 },
  { label: '2021/05', revenue: 16480000, yoyGrowth: 8.0 },
  { label: '2021/06', revenue: 16840000, yoyGrowth: 8.2 },
  { label: '2021/07', revenue: 17920000, yoyGrowth: 9.3 },
  { label: '2021/08', revenue: 9080000, yoyGrowth: 9.0 },
  { label: '2021/09', revenue: 10340000, yoyGrowth: 8.9 },
  { label: '2021/10', revenue: 11270000, yoyGrowth: 9.1 },
  { label: '2021/11', revenue: 10620000, yoyGrowth: 8.7 },
  { label: '2021/12', revenue: 11440000, yoyGrowth: 9.0 },
  { label: '2022/01', revenue: 10740000, yoyGrowth: 9.0 },
  { label: '2022/02', revenue: 12690000, yoyGrowth: 8.8 },
  { label: '2022/03', revenue: 1090000, yoyGrowth: 7.1 },
  { label: '2022/04', revenue: 942000, yoyGrowth: 6.8 },
  { label: '2022/05', revenue: 730000, yoyGrowth: 6.6 },
  { label: '2022/06', revenue: 681000, yoyGrowth: 5.8 },
  { label: '2022/07', revenue: 1138000, yoyGrowth: 5.6 },
  { label: '2022/08', revenue: 801000, yoyGrowth: 5.2 },
  { label: '2022/09', revenue: 726000, yoyGrowth: 5.4 },
  { label: '2022/10', revenue: 793000, yoyGrowth: 5.2 },
  { label: '2022/11', revenue: 1188000, yoyGrowth: 5.1 },
  { label: '2022/12', revenue: 1368000, yoyGrowth: 5.0 },
  { label: '2023/01', revenue: 843000, yoyGrowth: 5.2 },
  { label: '2023/02', revenue: 1472000, yoyGrowth: 5.0 },
  { label: '2023/03', revenue: 1508000, yoyGrowth: 4.9 },
  { label: '2023/04', revenue: 1016000, yoyGrowth: 4.9 },
  { label: '2023/05', revenue: 982000, yoyGrowth: 4.9 },
  { label: '2023/06', revenue: 789000, yoyGrowth: 4.8 },
  { label: '2023/07', revenue: 1165000, yoyGrowth: 4.8 },
]

const tableColumns = [
  { id: '202307', label: '202307' },
  { id: '202308', label: '202308' },
  { id: '202309', label: '202309' },
  { id: '202310', label: '202310' },
  { id: '202311', label: '202311' },
  { id: '202312', label: '202312' },
]
const tableRows = [
  {
    id: 'monthly-revenue',
    label: '每月營收',
    cells: {
      '202307': '587,040',
      '202308': '9,991,845',
      '202309': '9,704,224',
      '202310': '6,431,665',
      '202311': '8,169,564',
      '202312': '11,548,000',
    },
  },
  {
    id: 'monthly-yoy-growth',
    label: '單月營收年增率 (%)',
    cells: {
      '202307': '53.65',
      '202308': '-12.23',
      '202309': '-0.52',
      '202310': '-31.04',
      '202311': '5.18',
      '202312': '26.35',
    },
  },
]

const axisTicks = [20000000, 15000000, 10000000, 5000000, 0]
const selectedStock = stocks[3]
const maxRevenue = Math.max(...revenuePoints.map((point) => point.revenue))

function formatNumber(value: number) {
  return value.toLocaleString('en-US')
}

function buildLinePoints() {
  return revenuePoints
    .map((point, index) => {
      const x = (index / (revenuePoints.length - 1)) * 1000
      const y = 28 + ((12.8 - point.yoyGrowth) / (12.8 - 4.2)) * 304

      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

export default function Home() {
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
          borderBottom: '1px solid var(--border)',
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
            defaultValue={selectedStock}
            getOptionLabel={(option) => `${option.stockId} ${option.stockName}`}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="輸入台股代號或名稱，查看公司價值"
                variant="outlined"
              />
            )}
            sx={{
              width: 390,
              mx: 'auto',
              '& .MuiOutlinedInput-root': {
                bgcolor: 'background.paper',
                fontSize: 14,
              },
            }}
          />
        </Container>
      </Box>

      <Container
        maxWidth={false}
        sx={{ maxWidth: 850, py: 24 }}
      >
        <Paper
          variant="outlined"
          square
          sx={{ mb: 1, px: 2.5, py: 1.8, borderColor: 'var(--border)' }}
        >
          <Typography
            component="h1"
            sx={{ fontSize: 18, fontWeight: 700 }}
          >
            {selectedStock.stockName} ({selectedStock.stockId})
          </Typography>
        </Paper>

        <Paper
          variant="outlined"
          square
          sx={{ px: 2.5, pt: 2.2, pb: 1.8, borderColor: 'var(--border)' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Button
              variant="contained"
              disableElevation
              sx={{ px: 2.2 }}
            >
              每月營收
            </Button>
            <Button
              variant="contained"
              disableElevation
              sx={{ px: 2.2 }}
            >
              近 5 年
            </Button>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '72px minmax(0, 1fr) 42px',
              columnGap: 1.5,
            }}
          >
            <Box sx={{ pt: 4.4, textAlign: 'right' }}>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', fontWeight: 700 }}
              >
                千元
              </Typography>
              {axisTicks.map((tick) => (
                <Typography
                  key={tick}
                  variant="caption"
                  sx={{ display: 'block', mt: 4.05, color: 'text.secondary' }}
                >
                  {formatNumber(tick)}
                </Typography>
              ))}
            </Box>

            <Box>
              <Box
                sx={{
                  height: 28,
                  mb: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
                  <Box
                    sx={{
                      width: 16,
                      height: 10,
                      bgcolor: 'var(--chart-revenue)',
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary' }}
                  >
                    每月營收
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
                  <Box
                    sx={{
                      width: 16,
                      height: 10,
                      bgcolor: 'var(--chart-growth)',
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary' }}
                  >
                    單月營收年增率 (%)
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  position: 'relative',
                  height: 340,
                  borderLeft: '1px solid var(--grid-line)',
                  borderBottom: '1px solid var(--grid-line)',
                  backgroundImage:
                    'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
                  backgroundSize: '100% 68px, 20% 100%',
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="svg"
                  aria-hidden="true"
                  viewBox="0 0 1000 360"
                  preserveAspectRatio="none"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 2,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                  }}
                >
                  <polyline
                    points={buildLinePoints()}
                    fill="none"
                    stroke="var(--chart-growth)"
                    strokeWidth="4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </Box>

                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '4px',
                    px: 0.6,
                  }}
                >
                  {revenuePoints.map((point) => (
                    <Box
                      key={point.label}
                      title={`${point.label} 月營收 ${formatNumber(point.revenue)} 千元`}
                      sx={{
                        flex: '1 1 0',
                        minWidth: 3,
                        height: `${Math.max(8, (point.revenue / maxRevenue) * 78)}%`,
                        bgcolor: 'var(--chart-revenue-soft)',
                        border: '1px solid var(--chart-revenue)',
                        borderBottom: 0,
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  pt: 1.4,
                }}
              >
                {['2019', '2020', '2021', '2022', '2023'].map((year) => (
                  <Typography
                    key={year}
                    variant="caption"
                    sx={{ color: 'text.secondary' }}
                  >
                    {year}
                  </Typography>
                ))}
              </Box>
            </Box>

            <Box sx={{ pt: 0.4, textAlign: 'right' }}>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', fontWeight: 700 }}
              >
                %
              </Typography>
              {['12', '11', '10', '9', '8', '7', '6', '5', '4'].map((tick) => (
                <Typography
                  key={tick}
                  variant="caption"
                  sx={{ display: 'block', mt: 2.48, color: 'text.secondary' }}
                >
                  {tick}
                </Typography>
              ))}
            </Box>
          </Box>
        </Paper>

        <Paper
          variant="outlined"
          square
          sx={{
            mt: 1,
            px: 2.5,
            pt: 2.2,
            pb: 1.6,
            borderColor: 'var(--border)',
          }}
        >
          <Button
            variant="contained"
            disableElevation
            sx={{ mb: 2.2, px: 2.2 }}
          >
            詳細數據
          </Button>

          <BaseTable
            firstColumnLabel="年度月份"
            columns={tableColumns}
            rows={tableRows}
          />
        </Paper>

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
