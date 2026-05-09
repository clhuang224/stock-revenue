import { fetchFinMindData, FinMindApiError } from '../../apis/finmind/client'
import { mapStockOptions } from '../../apis/finmind/stockService'
import type { TaiwanStockInfoResponse } from '../../interfaces/TaiwanStockInfo'

export async function GET() {
  try {
    const stocks = await fetchFinMindData<TaiwanStockInfoResponse>({
      dataset: 'TaiwanStockInfo',
    })

    return Response.json({ data: mapStockOptions(stocks) })
  } catch (error) {
    const status = error instanceof FinMindApiError ? error.status : 500

    return Response.json({ message: 'Failed to load stocks' }, { status })
  }
}
