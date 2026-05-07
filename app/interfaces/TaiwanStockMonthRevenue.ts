import { MonthNumber, TimeType } from '../types/TimeType'
import { FinMindResponse } from './FinMindResponse'

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
    revenue_month: MonthNumber
    revenue_year: number
    create_time: TimeType | ''
}

export type TaiwanStockMonthRevenueResponse = FinMindResponse<
    'success',
    200,
    TaiwanStockMonthRevenue[]
>
