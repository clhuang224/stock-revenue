import type { TaiwanStockMonthRevenue } from '../../interfaces/TaiwanStockMonthRevenue'
import type { RevenuePoint } from '../../interfaces/RevenuePoint'

function formatMonthLabel(year: number, month: number) {
  return `${year}/${String(month).padStart(2, '0')}`
}

function getRevenueKey(year: number, month: number) {
  return `${year}-${month}`
}

export function mapRevenuePoints(
  revenueRecords: TaiwanStockMonthRevenue[],
): RevenuePoint[] {
  const sortedRecords = [...revenueRecords].sort((a, b) => {
    if (a.revenue_year !== b.revenue_year) {
      return a.revenue_year - b.revenue_year
    }

    return a.revenue_month - b.revenue_month
  })

  const revenueByMonth = new Map(
    sortedRecords.map((record) => [
      getRevenueKey(record.revenue_year, record.revenue_month),
      record.revenue,
    ]),
  )

  return sortedRecords.map((record) => {
    const previousYearRevenue = revenueByMonth.get(
      getRevenueKey(record.revenue_year - 1, record.revenue_month),
    )
    const yoyGrowth =
      previousYearRevenue && previousYearRevenue !== 0
        ? (record.revenue / previousYearRevenue - 1) * 100
        : null

    return {
      date: record.date,
      year: record.revenue_year,
      month: record.revenue_month,
      label: formatMonthLabel(record.revenue_year, record.revenue_month),
      revenue: record.revenue,
      yoyGrowth,
    }
  })
}
