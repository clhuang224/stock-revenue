import { MonthNumber, TimeType } from '../types/TimeType'
import { FinMindSuccessResponse } from './FinMindResponse'

export interface TaiwanStockMonthRevenueQuery {
  dataset: 'TaiwanStockMonthRevenue'
  data_id: string
  start_date: TimeType
  end_date: TimeType
}

export interface TaiwanStockMonthRevenue {
  date: TimeType
  stock_id: string
  country: 'Taiwan'
  revenue: number
  revenue_month: MonthNumber
  revenue_year: number
  create_time: TimeType | ''
}

export type TaiwanStockMonthRevenueResponse = FinMindSuccessResponse<
  TaiwanStockMonthRevenue[]
>
