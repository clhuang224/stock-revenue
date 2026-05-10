import { NextRequest } from 'next/server'
import { fetchFinMindData, FinMindApiError } from '../../apis/finmind/client'
import { mapRevenuePoints } from '../../apis/finmind/revenueService'
import type {
  TaiwanStockMonthRevenueQuery,
  TaiwanStockMonthRevenueResponse,
} from '../../interfaces/TaiwanStockMonthRevenue'
import type { TimeType } from '../../types/TimeType'

const REVENUE_CACHE_SECONDS = 60 * 60
const MAX_REVENUE_YEARS = 8

function formatDate(date: Date): TimeType {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}` as TimeType
}

function getRevenueDateRange() {
  const endDate = new Date()
  const startDate = new Date(endDate)

  startDate.setFullYear(startDate.getFullYear() - (MAX_REVENUE_YEARS + 1))
  startDate.setMonth(0, 1)

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  }
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
      start_date: startDate,
      end_date: endDate,
    } satisfies TaiwanStockMonthRevenueQuery
    const revenueRecords =
      await fetchFinMindData<TaiwanStockMonthRevenueResponse>(revenueQuery)
    const maxYearsAgo = new Date()
    maxYearsAgo.setFullYear(maxYearsAgo.getFullYear() - MAX_REVENUE_YEARS)
    maxYearsAgo.setMonth(0, 1)

    const revenuePoints = mapRevenuePoints(revenueRecords).filter(
      (point) => new Date(point.date) >= maxYearsAgo,
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
