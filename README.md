# Stock Revenue

一頁式台股月營收查詢工具。使用者可以搜尋台股股票，查看近 5 年每月營收、單月營收年增率圖表，以及對應的資料表。

專案使用 Next.js、TypeScript、MUI 與 FinMind API，並透過 server-side API proxy 保護資料服務 token。

## Features

- 股票代號與股票名稱搜尋。
- 顯示目前股票名稱與代號。
- 顯示近 5 年月營收柱狀圖。
- 顯示單月營收年增率折線圖。
- 圖表 hover tooltip 顯示月份、月營收與年增率。
- 顯示月營收與單月營收年增率資料表。
- 使用 MUI component library 並設定 theme。
- 透過 Next.js server-side API proxy 保護 FinMind token。
- 部署目標為 Vercel。

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- MUI
- MUI X Charts
- FinMind API
- Vercel
- pnpm

## Data Source

資料來源為 FinMind API：

- `TaiwanStockInfo`: 台股總覽，用於股票搜尋清單。
- `TaiwanStockMonthRevenue`: 月營收表，用於圖表與資料表。

月營收年增率計算方式：

```txt
(當月營收 / 去年同月營收 - 1) * 100
```

若缺少去年同月資料，年增率顯示為 `-`。

## Environment Variables

本專案需要 FinMind API token。請建立 `.env.local`：

```bash
FINMIND_API_TOKEN=your_finmind_token
```

不要使用 `NEXT_PUBLIC_FINMIND_API_TOKEN`。任何 `NEXT_PUBLIC_` 開頭的變數都會被打包到前端，使用者可以在瀏覽器看到。

在 Vercel 部署時，請到 Project Settings 的 Environment Variables 加入：

```txt
FINMIND_API_TOKEN
```

## Getting Started

安裝依賴：

```bash
pnpm install
```

啟動開發伺服器：

```bash
pnpm dev
```

開啟：

```txt
http://localhost:3000
```

## Scripts

```bash
pnpm dev
```

啟動 Next.js development server。

```bash
pnpm build
```

建立 production build。

```bash
pnpm start
```

啟動 production server。

```bash
pnpm lint
```

執行 ESLint。

## Architecture

本專案採用 Next.js hybrid rendering：

- Server side:
  - 讀取 `FINMIND_API_TOKEN`。
  - 透過 API route 代理 FinMind API。
  - 預載預設股票資料。
  - 設定 metadata。
  - 對低頻更新資料設定 cache。
- Client side:
  - 股票搜尋與切換。
  - 圖表 hover 與互動。
  - 表格橫向瀏覽。
  - loading、error、empty state。

預計 API route：

- `GET /api/stocks`: 回傳股票搜尋清單。
- `GET /api/revenue?stockId=2330`: 回傳指定股票近 5 年月營收資料。

前端只呼叫本專案 API route，不直接把 FinMind token 傳到瀏覽器。

## Deployment

部署目標為 Vercel，原因：

- GitHub Pages 是靜態主機，不適合保護 API token。
- 本專案需要 server-side API proxy 呼叫 FinMind。
- Vercel 可直接支援 Next.js App Router、Route Handlers、server-side environment variables 與 SSR。

部署步驟：

1. 將專案連接到 Vercel。
2. 在 Vercel 設定 `FINMIND_API_TOKEN`。
3. 使用預設 Next.js build command。
4. 部署後測試股票搜尋、圖表、表格與 API error handling。

## Documentation

詳細架構決策、component 切分與實作規劃請見：

- [`docs/plan.md`](docs/plan.md)
