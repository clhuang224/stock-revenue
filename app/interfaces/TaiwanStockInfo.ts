import { TimeType } from '../types/TimeType'
import { FinMindSuccessResponse } from './FinMindResponse'

export interface TaiwanStockInfo {
  industry_category: string
  stock_id: string
  stock_name: string
  type: string
  date: TimeType
}

export type TaiwanStockInfoResponse = FinMindSuccessResponse<TaiwanStockInfo[]>
