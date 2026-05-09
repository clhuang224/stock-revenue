import type { TaiwanStockInfo } from '../../interfaces/TaiwanStockInfo'
import type { StockOption } from '../../interfaces/StockOption'

export function mapStockOptions(stocks: TaiwanStockInfo[]): StockOption[] {
  const stockOptions = stocks
    .filter((stock) => stock.stock_id && stock.stock_name)
    .map((stock) => ({
      stockId: stock.stock_id,
      stockName: stock.stock_name,
      industryCategory: stock.industry_category,
      type: stock.type,
    }))

  return Array.from(
    new Map(stockOptions.map((stock) => [stock.stockId, stock])).values(),
  ).sort((a, b) => a.stockId.localeCompare(b.stockId))
}
