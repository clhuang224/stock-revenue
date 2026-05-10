import { fetchFinMindData, FinMindApiError } from '../../apis/finmind/client'
import { mapStockOptions } from '../../apis/finmind/stockService'
import type { TaiwanStockInfoResponse } from '../../interfaces/TaiwanStockInfo'

const STOCKS_CACHE_SECONDS = 24 * 60 * 60

export async function GET() {
  try {
    const stocks = await fetchFinMindData<TaiwanStockInfoResponse>({
      dataset: 'TaiwanStockInfo',
    })

    return Response.json(
      { data: mapStockOptions(stocks) },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${STOCKS_CACHE_SECONDS}, stale-while-revalidate=${STOCKS_CACHE_SECONDS}`,
        },
      },
    )
  } catch (error) {
    const status = error instanceof FinMindApiError ? error.status : 500

    return Response.json({ message: 'Failed to load stocks' }, { status })
  }
}
