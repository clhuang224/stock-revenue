export interface StockOption {
  stockId: string
  stockName: string
  industryCategory: string
  type: string
}

export interface StocksResponse {
  data: StockOption[]
}
