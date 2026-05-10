# Stock Revenue

一頁式台股月營收查詢工具。使用者可以搜尋台股股票，查看近 3、5、8 年每月營收、單月營收年增率圖表，以及對應的資料表。

專案使用 Next.js、TypeScript、MUI 與 FinMind API，並透過 server-side API proxy 保護資料服務 token。

## Demo

- Production: https://stock-revenue.lynns.me

## Features

- 股票代號與股票名稱搜尋。
- 記住使用者上次選擇的股票，重新開啟頁面時可延續查詢。
- 顯示目前股票名稱與代號。
- 顯示近 3、5、8 年月營收柱狀圖，並可切換時間範圍。
- 顯示單月營收年增率折線圖。
- 圖表 hover tooltip 顯示月份、月營收與年增率。
- 顯示月營收與單月營收年增率資料表。
- 使用 MUI component library 並設定 theme。
- 透過 Next.js server-side API proxy 保護 FinMind token。
- 部署目標為 Vercel。

## Technical Highlights

- 使用 Next.js Route Handlers 作為 FinMind proxy，避免 API token 暴露到瀏覽器。
- 將 FinMind 原始資料轉換成前端需要的 `StockOption` 與 `RevenuePoint`，讓 UI 不直接依賴外部 API schema。
- 使用 TanStack Query 管理 client-side request、cache、loading 與 error state。
- 針對股票清單與月營收設定 server response cache，降低 FinMind quota 壓力並提升切換股票時的互動速度。
- 將 chart、table、autocomplete 的 loading skeleton 收在各自元件內，讓首頁維持資料流與頁面組裝的責任。
- 透過 MUI theme 統一顏色、表格、按鈕與版面樣式。

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- MUI
- MUI X Charts
- TanStack Query
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

時間範圍用詞：

- 「近六個月」指從六個月前月份的 1 號 `00:00:00` 到今天 `23:59:59`。

## Environment Variables

本專案需要 FinMind API token。請建立 `.env.local`：

```bash
FINMIND_API_TOKEN=your_finmind_token
```

在 Vercel 部署時，請到 Project Settings 的 Environment Variables 加入：

```txt
FINMIND_API_TOKEN
```

## Getting Started

安裝依賴：

```bash
pnpm install
```

建立 `.env.local` 並加入：

```bash
FINMIND_API_TOKEN=your_finmind_token
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

| Command                 | Description                     |
| ----------------------- | ------------------------------- |
| `pnpm run dev`          | 啟動 Next.js development server |
| `pnpm run build`        | 建立 production build           |
| `pnpm run start`        | 啟動 production server          |
| `pnpm run typecheck`    | 執行 TypeScript type check      |
| `pnpm run lint`         | 執行 ESLint                     |
| `pnpm run format`       | 使用 Prettier 格式化            |
| `pnpm run format:check` | 檢查 Prettier 格式              |

建議驗證流程：

```bash
pnpm run typecheck
pnpm run lint
pnpm run format:check
```

## Architecture

本專案採用 Next.js API route 作為 FinMind proxy。瀏覽器只呼叫本專案 API，FinMind token 只存在 server-side runtime。

資料流：

```txt
Browser
  -> /api/stocks or /api/revenue
  -> app/apis/finmind/client.ts
  -> FinMind API
```

主要 API route：

- `GET /api/stocks`: 回傳股票搜尋清單。
- `GET /api/revenue?stockId=2330`: 回傳指定股票近 8 年月營收資料。

前端資料請求集中在 `app/apis/stocks.ts` 與 `app/apis/revenue.ts`，並透過 TanStack Query 管理 cache、loading 與 error state。

使用者選擇的股票代號會透過 `app/hooks/usePersistedStockId.ts` 寫入 `localStorage`，讓後續回到頁面時可以直接延續上次查詢。

快取策略：

- `/api/stocks`: 股票清單變動頻率低，server response 與 TanStack Query cache 皆保留 24 小時。
- `/api/revenue`: 月營收資料依股票代號快取，server response 與 TanStack Query cache 皆保留 1 小時。

這樣使用者在後續切換股票時，已查詢過的股票資料可以直接從 cache 顯示，減少重複請求並提升互動效能。

元件切分：

- `app/page.tsx`: 首頁資料流、查詢狀態與版面組裝。
- `StockAutocomplete`: 股票搜尋與 autocomplete loading skeleton。
- `RevenueTrendChart`: 月營收圖表、series 切換與 chart loading skeleton。
- `BaseTable`: 可水平捲動的資料表、sticky first column 與 table loading skeleton。
- `BaseMenu`: 共用選單，目前用於切換圖表與表格的時間範圍。
- `HomePanel`: 首頁白底區塊與標題 loading skeleton。

### Folder Structure

```txt
app/api/                    # Next.js Route Handlers，驗證 request、代理資料與回傳 API response
  stocks/route.ts
  revenue/route.ts

app/apis/                   # 前端 fetcher、TanStack Query options 與外部資料對接層
  stocks.ts                 # 股票清單 query function
  revenue.ts                # 月營收 query function
  finmind/                  # FinMind API client 與原始資料轉換
    client.ts
    stockService.ts
    revenueService.ts

app/interfaces/             # FinMind 原始 response、dataset 型別與本專案 API response 型別
  FinMindResponse.ts
  RevenuePoint.ts
  StockOption.ts
  TaiwanStockInfo.ts
  TaiwanStockMonthRevenue.ts

app/hooks/                  # 前端狀態與瀏覽器能力封裝，例如 localStorage 持久化
  usePersistedStockId.ts
```

## Deployment

部署目標為 Vercel，並使用 Vercel Git Integration 監聽 `main` branch 自動部署。Next.js Route Handlers 會在 server-side 讀取 `FINMIND_API_TOKEN` 並代理 FinMind API。

Vercel project environment variables：

```txt
FINMIND_API_TOKEN
```

Workflow：

- pull request：安裝依賴並執行 `pnpm run typecheck`、`pnpm run lint`、`pnpm run format:check`。
- push 到 `main`：執行相同檢查，production deployment 由 Vercel Git Integration 處理。

## Trade-offs

- 目前以桌面版資料瀏覽體驗為主，手機版排版留待後續優化。
- 股票狀態目前使用 `localStorage` 持久化，能延續個人使用情境；若要分享指定股票，可在後續加入 query string。
- 圖表使用 MUI X Charts，優先保持與 MUI theme 的一致性；若未來需要更複雜的金融圖表互動，可再評估其他 chart library。

## Documentation

後續改進方向請見：

- [`docs/plan.md`](docs/plan.md)
