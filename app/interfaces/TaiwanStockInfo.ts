import { TimeType } from '../types/TimeType'
import { FinMindResponse } from './FinMindResponse'

export interface TaiwanStockInfo {
  industry_category: string
  stock_id: string
  stock_name: string
  type: string
  date: TimeType
}

export type TaiwanStockInfoResponse = FinMindResponse<
  'success',
  200,
  TaiwanStockInfo[]
>
