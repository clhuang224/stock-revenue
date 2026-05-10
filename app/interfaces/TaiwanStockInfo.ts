import { FinMindDate } from '../types/FinMindDate'
import { FinMindSuccessResponse } from './FinMindResponse'

export interface TaiwanStockInfo {
  industry_category: string
  stock_id: string
  stock_name: string
  type: string
  date: FinMindDate
}

export type TaiwanStockInfoResponse = FinMindSuccessResponse<TaiwanStockInfo[]>
