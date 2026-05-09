import { queryOptions } from '@tanstack/react-query'
import type { StockOption, StocksResponse } from '../interfaces/StockOption'

export const stockQueryKeys = {
  all: ['stocks'] as const,
}

export async function fetchStocks(): Promise<StockOption[]> {
  const response = await fetch('/api/stocks')

  if (!response.ok) {
    throw new Error('股票清單載入失敗')
  }

  const payload = (await response.json()) as StocksResponse

  return payload.data
}

export function stocksQueryOptions() {
  return queryOptions({
    queryKey: stockQueryKeys.all,
    queryFn: fetchStocks,
    staleTime: 24 * 60 * 60 * 1000,
  })
}
