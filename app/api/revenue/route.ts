import { NextRequest } from 'next/server'
import { fetchFinMindData, FinMindApiError } from '../../apis/finmind/client'
import { mapRevenuePoints } from '../../apis/finmind/revenueService'
import type {
  TaiwanStockMonthRevenueQuery,
  TaiwanStockMonthRevenueResponse,
} from '../../interfaces/TaiwanStockMonthRevenue'
import { createRecentDateRange, formatFinMindDate } from '../../utils/date'

const REVENUE_CACHE_SECONDS = 60 * 60
const MAX_REVENUE_YEARS = 8

function getRevenueDateRange() {
  return createRecentDateRange((MAX_REVENUE_YEARS + 1) * 12)
}

function isValidStockId(stockId: string) {
  return /^[0-9A-Za-z]+$/.test(stockId)
}

export async function GET(request: NextRequest) {
  const stockId = request.nextUrl.searchParams.get('stockId') ?? ''

  if (!isValidStockId(stockId)) {
    return Response.json({ message: 'Invalid stockId' }, { status: 400 })
  }

  const { startDate, endDate } = getRevenueDateRange()

  try {
    const revenueQuery = {
      dataset: 'TaiwanStockMonthRevenue',
      data_id: stockId,
      start_date: formatFinMindDate(startDate),
      end_date: formatFinMindDate(endDate),
    } satisfies TaiwanStockMonthRevenueQuery
    const revenueRecords =
      await fetchFinMindData<TaiwanStockMonthRevenueResponse>(revenueQuery)
    const visibleDateRange = createRecentDateRange(MAX_REVENUE_YEARS * 12)

    const revenuePoints = mapRevenuePoints(revenueRecords).filter(
      (point) => new Date(point.date) >= visibleDateRange.startDate,
    )

    return Response.json(
      {
        stock: { stockId },
        data: revenuePoints,
      },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${REVENUE_CACHE_SECONDS}, stale-while-revalidate=${REVENUE_CACHE_SECONDS}`,
        },
      },
    )
  } catch (error) {
    const status = error instanceof FinMindApiError ? error.status : 500

    return Response.json({ message: 'Failed to load revenue' }, { status })
  }
}
