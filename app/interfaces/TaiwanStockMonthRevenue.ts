import { MonthNumber, FinMindDate } from '../types/FinMindDate'
import { FinMindSuccessResponse } from './FinMindResponse'

export interface TaiwanStockMonthRevenueQuery {
  dataset: 'TaiwanStockMonthRevenue'
  data_id: string
  start_date: FinMindDate
  end_date: FinMindDate
}

export interface TaiwanStockMonthRevenue {
  date: FinMindDate
  stock_id: string
  country: 'Taiwan'
  revenue: number
  revenue_month: MonthNumber
  revenue_year: number
  create_time: FinMindDate | ''
}

export type TaiwanStockMonthRevenueResponse = FinMindSuccessResponse<
  TaiwanStockMonthRevenue[]
>
