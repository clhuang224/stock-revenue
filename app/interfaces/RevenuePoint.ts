export interface RevenuePoint {
  date: string
  year: number
  month: number
  label: string
  revenue: number
  yoyGrowth: number | null
}

export interface RevenueResponse {
  stock: {
    stockId: string
  }
  data: RevenuePoint[]
}
