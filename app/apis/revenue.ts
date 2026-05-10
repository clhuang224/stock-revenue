import { queryOptions } from '@tanstack/react-query'
import type { RevenuePoint, RevenueResponse } from '../interfaces/RevenuePoint'

export const revenueQueryKeys = {
  all: ['revenue'] as const,
  byStockId: (stockId: string) => [...revenueQueryKeys.all, stockId] as const,
}

export async function fetchRevenue(stockId: string): Promise<RevenuePoint[]> {
  const params = new URLSearchParams({ stockId })
  const response = await fetch(`/api/revenue?${params.toString()}`)

  if (!response.ok) {
    throw new Error('月營收資料載入失敗')
  }

  const payload = (await response.json()) as RevenueResponse

  return payload.data
}

export function revenueQueryOptions(stockId: string) {
  return queryOptions({
    queryKey: revenueQueryKeys.byStockId(stockId),
    queryFn: () => fetchRevenue(stockId),
    enabled: Boolean(stockId),
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  })
}
