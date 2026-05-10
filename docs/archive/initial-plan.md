# 實作計畫

## 背景

本專案的目標是實作一頁式台股月營收查詢工具，參考財報狗與雅虎股市的操作情境，完成桌面版的應用。

重點：

- 使用 TypeScript。
- 使用 React functional components。
- 使用 Next.js 佳。
- 使用 component library，MUI 佳。
- MUI 需要設定 theme。
- 需要良好的 component 切分。
- 使用 FinMind API 取得台股資料。
- README 需說明啟動方式、部署規劃與補充內容。
- 提供真實部署網址。

本文件將作為後續主要規格與實作計畫。

## 產品目標

實作一個台股月營收查詢頁，讓使用者能透過股票代號或股票名稱搜尋台股，並快速查看該股票近 5 年月營收表現。

核心價值：

- 快速切換股票。
- 用圖表理解營收趨勢。
- 用資料表檢查每月明細。
- 呈現資料來源與單位，方便檢核正確性。

## 功能範圍

### 必做功能

- 一頁式桌面版頁面。
- 頁面上方提供股票搜尋下拉選單。
- 搜尋支援股票代號，例如 `2330`。
- 搜尋支援股票名稱，例如 `台積電`。
- 下拉選單內容為目前可查詢的台股股票清單。
- 選擇股票後，頁面切換到該股票資料。
- 顯示目前股票名稱與代號，例如 `台積電 (2330)`。
- 顯示近 5 年每月營收圖表。
- 圖表包含：
  - 月營收柱狀圖。
  - 單月營收年增率折線圖。
  - 雙 y 軸。
  - x 軸為月份。
  - hover tooltip。
  - legend。
- 顯示資料表。
- 資料表包含：
  - 年度月份。
  - 每月營收。
  - 單月營收年增率。
- 資料表最新月份放在最右側，進入畫面時能看到最新資料。
- 顯示資料單位與資料來源。
- 提供 loading、error、empty state。

### 不做或低優先功能

- 不做手機版優化，桌面版優先。
- 不做登入。
- 不做使用者自訂追蹤清單。
- 不做完整股票分析頁。
- 不做每檔股票獨立 SEO 頁面，除非後續時間足夠。
- 不做 FinMind 以外的資料源整合。

## 畫面規格

### 整體版面

頁面以桌面版為主。背景為淺灰色，主要內容置中，使用白底區塊呈現資料。

主要區域：

1. 頂部搜尋列。
2. 目前股票標題。
3. 月營收圖表。
4. 詳細資料表。
5. 資料來源與單位說明。

### 頂部搜尋列

- 位於頁面最上方。
- 搜尋框置中。
- placeholder 類似：`輸入台 / 美股代號，查看公司價值`。
- 實作範圍只需要台股，但 placeholder 可依畫面保留或調整為更精準的 `輸入台股代號或名稱`。
- 使用 MUI `Autocomplete`。
- 選項顯示格式建議為：

```txt
2330 台積電
```

### 目前股票標題

- 位於圖表上方。
- 顯示目前股票名稱與代號。
- 格式：

```txt
台積電 (2330)
```

可預設 `2330 台積電`，也可依 query string 帶入指定股票。

### 圖表

圖表為主要視覺區塊。

資料：

- x 軸為月份。
- 範圍預設近 5 年。
- 左 y 軸為月營收。
- 右 y 軸為單月營收年增率。
- 月營收使用柱狀圖。
- 單月營收年增率使用折線圖。

視覺：

- 月營收顏色使用黃色系。
- 年增率顏色使用紅色系。
- 圖表背景白色。
- 格線使用淡灰色。
- legend 放在圖表上方或圖表內上緣。
- hover tooltip 使用深色或白色浮層皆可，但需清楚顯示數值。

Tooltip 內容：

```txt
2024/01
月營收：215,785,000 千元
單月營收年增率：7.89%
```

單位以 FinMind 原始資料為準，畫面標註 `千元`。

### 資料表

表格位於圖表下方。

列：

- 年度月份。
- 每月營收。
- 單月營收年增率。

欄：

- 每個月份一欄。
- 最新月份放在最右側。
- 若欄位超出容器寬度，允許水平捲動。
- 初始狀態應盡量定位在最右側，以便看到最新資料。

格式：

- 營收使用千分位。
- 年增率顯示小數點後兩位。
- 無資料顯示 `-`。

### 資料來源說明

位於資料表下方。

建議文案：

```txt
圖表單位：千元，數據來自公開資訊觀測站
網頁圖表數據更新日期，請註明出處為財報狗
```

若不使用財報狗資料，第二句可調整為：

```txt
資料來源：FinMind，原始資料來自公開資訊觀測站
```

實作時應避免宣稱資料來自未實際使用的服務。

## 技術選型

- Framework: Next.js 16 App Router
- Language: TypeScript
- UI Library: MUI
- Styling: MUI theme + 必要的 global CSS
- Chart Library: MUI X Charts
- Data Source: FinMind API
- Deployment: Vercel
- Package Manager: pnpm

## 資料夾結構

```txt
app/api/                    # Next.js Route Handlers，處理 request 驗證、server-side token 與 API response
  stocks/route.ts
  revenue/route.ts

app/apis/                   # 前端 fetcher、TanStack Query options 與外部資料對接層
  stocks.ts                 # 股票清單 query function
  revenue.ts                # 月營收 query function
  finmind/                  # FinMind API client 與原始資料轉換
    client.ts
    stockService.ts
    revenueService.ts

app/components/             # 共用 UI 元件與首頁區塊元件
  BaseMixedChart.tsx
  BaseTable.tsx
  RevenueTrendChart.tsx
  home/                     # 首頁專用版面元件
    HomePanel.tsx

app/interfaces/             # FinMind 原始 response、dataset 型別與本專案 API response 型別
  FinMindResponse.ts
  RevenuePoint.ts
  StockOption.ts
  TaiwanStockInfo.ts
  TaiwanStockMonthRevenue.ts

app/types/                  # 跨 dataset 共用的基礎型別
  FinMindDate.ts
```

## Next.js 文件注意事項

本專案使用的 Next.js 版本可能與常見教學或舊版經驗不同。開發前需查閱本機文件：

- `node_modules/next/dist/docs/01-app/01-getting-started/`
- `node_modules/next/dist/docs/01-app/02-guides/`
- `node_modules/next/dist/docs/01-app/03-api-reference/`

尤其需要確認：

- App Router file conventions。
- Route Handler 行為。
- caching / revalidation。
- environment variables。
- deployment。
- static export 限制。
- MUI 與 Next App Router 整合方式。

## 部署策略

### 決策

主要部署環境使用 Vercel。

### 為何不使用 GitHub Pages

GitHub Pages 是靜態主機。如果使用 Next static export，會失去需要 server runtime 的能力，例如：

- server-side API proxy。
- runtime environment variables。
- request-based Route Handlers。
- SSR 動態資料。
- token 保護。
- ISR 或 server-side cache control。

本作業需要保護 FinMind token，不希望 token 出現在瀏覽器。因此不適合將主要部署方案設為 GitHub Pages。

若部署到 GitHub Pages，只剩兩種可行但不理想的方案：

- 無 token client-side fetch：token 不會外洩，但 API quota 較低，也無法展示 token 保護能力。
- GitHub Actions build-time 產生固定 JSON：可用 GitHub Secrets，但資料不是即時查詢任意股票，互動性受限。

### 為何使用 Vercel

Vercel 與 Next.js 整合完整，適合本作業：

- 支援 App Router。
- 支援 Route Handlers。
- 支援 server-side environment variables。
- 支援 SSR / Server Components。
- 支援 framework-aware deployment。
- 可將 `FINMIND_API_TOKEN` 安全放在 Vercel Environment Variables。
- 可用 GitHub repo 自動部署。

### Vercel 部署規劃

- repo 連接 Vercel。
- 在 Vercel Project Settings 設定 `FINMIND_API_TOKEN`。
- build command 使用預設 Next.js 設定。
- 不設定 `output: 'export'`。
- production 部署後確認：
  - 首頁可開啟。
  - 搜尋可使用。
  - API route 可取得資料。
  - Network request 不含 FinMind token。
  - refresh 後 query string 狀態正常。

## Next.js 使用策略

本專案是互動式資料工具，不是大量內容型網站，因此 SEO 不是唯一目標。不過應展示對 Next 的合理運用，而不是單純寫成純 client SPA。

採用 hybrid rendering：

### Server side

- 讀取 `FINMIND_API_TOKEN`。
- 建立 server-side FinMind client。
- 透過 Route Handler 代理 FinMind API。
- 預載預設股票資料。
- 設定 page metadata。
- 對低頻更新資料設定 cache。
- 將外部 API response 整理成前端需要的 DTO。

### Client side

- 股票搜尋。
- 股票切換。
- URL query 同步。
- 圖表互動。
- tooltip。
- 表格水平捲動。
- loading、error、empty state。

### URL 狀態

使用 query string 表示目前股票：

```txt
/?stock=2330
```

規則：

- 沒有 query 時使用預設股票。
- query 有合法股票代號時載入該股票。
- 使用者選擇股票後更新 query string。
- 重新整理頁面後保留目前股票。

若時間充足，可評估 `/stocks/[stockId]`，但若為單頁網站，可以 query string 為主。

### SSR / SEO 取捨

合理目標：

- 首頁 metadata 完整。
- 預設股票內容可 server-side render。
- 初始 HTML 不應只是空白殼。
- 分享網址時至少能保留股票代號狀態。

不追求：

- 每檔股票完整動態 SEO。
- 大量 pre-render 所有台股頁面。
- 複雜 Open Graph dynamic image。

原因：

- 這是一頁式資料工具。
- 台股股票數量多，完整預產生不是本專案核心。
- 使用者主要價值在互動查詢與資料呈現。

## FinMind Token 安全策略

### 原則

只要 token 出現在 browser bundle、前端 env、Network request header，使用者就能從 DevTools 看到。因此 token 不能放在 client side。

### 實作方式

- local development 使用 `.env.local`。
- Vercel production 使用 Environment Variables。
- 變數名稱：

```txt
FINMIND_API_TOKEN
```

- 不使用：

```txt
NEXT_PUBLIC_FINMIND_API_TOKEN
```

- 只在 server-side 程式碼讀取：

```ts
process.env.FINMIND_API_TOKEN
```

- browser 只呼叫本專案 API：
  - `/api/stocks`
  - `/api/revenue?stockId=2330`

### Server-side API layer 責任

- 驗證輸入。
- 補上 FinMind token。
- 呼叫 FinMind API。
- 處理錯誤。
- 整理資料格式。
- 設定 cache。
- 避免把 token 或原始敏感錯誤內容回傳到 client。

### 安全驗收

- repo 中不得提交 `.env.local`。
- README 不出現真實 token。
- client-side code 不讀取 `process.env.FINMIND_API_TOKEN`。
- Network request 中不應看到 `Authorization: Bearer {FinMind token}`。
- production build 後不應搜尋到 token 字串。

## FinMind API 規劃

### Base URL

```txt
https://api.finmindtrade.com/api/v4
```

### Authentication

server 端呼叫 FinMind 時加上：

```txt
Authorization: Bearer {FINMIND_API_TOKEN}
```

### 股票清單

Dataset:

```txt
TaiwanStockInfo
```

用途：

- 取得台股總覽。
- 建立搜尋下拉選單。

重要欄位：

- `industry_category`
- `stock_id`
- `stock_name`
- `type`
- `date`

前端需要格式：

```ts
type StockOption = {
  stockId: string
  stockName: string
  industryCategory: string
  type: string
}
```

清理規則：

- 過濾缺少 `stock_id` 或 `stock_name` 的資料。
- 優先保留一般上市櫃股票。
- 若 FinMind `type` 可識別 ETF、權證或其他商品，先排除非普通股。
- 搜尋比對 `stockId` 與 `stockName`。

### 月營收

Dataset:

```txt
TaiwanStockMonthRevenue
```

用途：

- 取得指定股票月營收。
- 產生圖表與資料表。

重要欄位：

- `date`
- `stock_id`
- `country`
- `revenue`
- `revenue_month`
- `revenue_year`

查詢參數：

- `dataset=TaiwanStockMonthRevenue`
- `data_id={stockId}`
- `start_date={近 5 年起始日}`
- `end_date={今天或月底}`

前端需要格式：

```ts
type RevenuePoint = {
  date: string
  year: number
  month: number
  label: string
  revenue: number
  yoyGrowth: number | null
}
```

排序：

- 內部資料以時間由舊到新排序，方便圖表顯示。
- 表格欄位最新月份在最右側。

## 資料計算規則

### 月份 label

建議格式：

```txt
2024/01
```

或表格欄位可使用：

```txt
202401
```

實作時需保持圖表與表格一致。

### 月營收

使用 FinMind `revenue` 欄位。

顯示格式：

- 使用千分位。
- 單位標註為 `千元`。

### 單月營收年增率

公式：

```txt
(當月營收 / 去年同月營收 - 1) * 100
```

規則：

- 以同一股票、同一月份、前一年資料計算。
- 若去年同月資料不存在，回傳 `null`。
- 若去年同月營收為 `0`，回傳 `null`，避免除以零。
- 顯示時四捨五入到小數點後兩位。
- 表格中 `null` 顯示為 `-`。
- tooltip 中 `null` 顯示為 `無去年同期資料` 或 `-`。

## Chart Library 評估

### MUI X Charts

優點：

- 與 MUI theme 整合最好。
- Community 版本為 MIT license。
- 支援 React 19 peer dependency。
- 符合作業「MUI 佳」的技術方向。
- 本作業需要的柱狀圖、折線圖、tooltip、legend 原則上足夠。

缺點：

- 金融圖表細節與高度客製能力不如 Apache ECharts。
- 若雙 y 軸、tooltip 或表格聯動需求變複雜，可能需要額外處理。

結論：首選。

### Recharts

優點：

- React declarative API。
- MIT license。
- 雙軸、tooltip、legend、responsive container 成熟。
- 客製 tooltip 與 mixed chart 容易。

缺點：

- 視覺與 MUI theme 需自行整合。
- 需要額外調整才能與 MUI 畫面一致。

結論：若 MUI X Charts 雙軸或 tooltip 客製不足，改用 Recharts。

### Apache ECharts

優點：

- 圖表能力完整。
- 雙軸、tooltip、dataZoom、金融圖表互動強。
- 適合大型資料視覺化。

缺點：

- option object API 與 React component 切分展示感較弱。
- bundle 較重。
- 對本作業需求可能偏重。

結論：不作為首選，除非圖表互動需求超出 MUI X Charts 或 Recharts。

## MUI 規劃

### 安裝套件

預計安裝：

- `@mui/material`
- `@emotion/react`
- `@emotion/styled`
- `@mui/material-nextjs`
- `@emotion/cache`
- `@mui/x-charts`

### Next App Router 整合

使用 MUI 官方 App Router cache provider，避免 server rendering 時 style 插入位置不穩。

在 `app/layout.tsx` 中包 provider：

- `AppRouterCacheProvider`
- `ThemeProvider`
- `CssBaseline`

### Theme

建議 theme token：

- primary: 設計圖接近的藍色。
- background default: 淺灰。
- paper: 白色。
- chart revenue: 黃色。
- chart yoy: 紅色。
- table header: 淡灰。
- border radius: 保持克制，資料工具不使用過度圓角。

設計方向：

- 工作型資料介面。
- 密度適中。
- 避免 marketing hero。
- 避免過度裝飾。
- 優先可讀性與資料掃描效率。

## Component 規劃

### App-level

- `AppThemeProvider`
  - MUI theme。
  - App Router cache provider。
  - CssBaseline。

- `StockRevenuePage`
  - 頁面 orchestration。
  - 管理 selected stock。
  - 管理 URL query sync。
  - 組合搜尋、標題、圖表、表格。

### Feature components

- `StockSearch`
  - 使用 MUI Autocomplete。
  - 支援代號與名稱搜尋。
  - 顯示 loading/error。

- `StockHeader`
  - 顯示股票名稱與代號。

- `RevenueChart`
  - 顯示 mixed chart。
  - 處理 y 軸、legend、tooltip。

- `RevenueTable`
  - 顯示月營收與年增率。
  - 支援水平捲動。
  - 初始定位最新資料。

- `DataSourceNote`
  - 顯示單位、資料來源與更新說明。

- `LoadingState`
  - skeleton 或 progress。

- `ErrorState`
  - API 錯誤訊息。

- `EmptyState`
  - 無股票或無營收資料。

### Data modules

- `finmindClient`
  - server-side fetch wrapper。
  - token injection。
  - error normalization。

- `stockService`
  - 股票清單整理與過濾。

- `revenueService`
  - 月營收整理與年增率計算。

- `formatters`
  - 數字、百分比、月份格式化。

- `types`
  - API response 與 domain type。

## API Route 規劃

### `GET /api/stocks`

用途：

- 回傳搜尋用股票清單。

Response:

```ts
type StocksResponse = {
  data: StockOption[]
}
```

錯誤：

- `502`: FinMind API error。
- `503`: FinMind quota exceeded 或暫時不可用。

### `GET /api/revenue?stockId=2330`

用途：

- 回傳指定股票近 5 年月營收。

Query:

```ts
type RevenueQuery = {
  stockId: string
}
```

Response:

```ts
type RevenueResponse = {
  stock: {
    stockId: string
    stockName: string
  }
  data: RevenuePoint[]
}
```

錯誤：

- `400`: stockId 格式錯誤。
- `404`: 找不到股票或無資料。
- `502`: FinMind API error。
- `503`: FinMind quota exceeded 或暫時不可用。

### 輸入驗證

`stockId` 規則：

- 只允許英數字。
- 長度建議 2 到 12。
- trim 空白。
- 不允許 URL、script、特殊符號。

## 快取策略

### 股票清單

特性：

- 變動頻率低。
- 適合長 cache。

策略：

- server-side fetch 設定 revalidate。
- API response 可設定 cache header。
- 若部署平台 cache 行為需確認，以 Next 16 文件為準。

### 月營收

特性：

- 月資料低頻更新。
- 同一股票會重複查詢。

策略：

- 依 `stockId` cache。
- 設定中長 revalidate。
- 發生錯誤時不 cache error response 太久。

### Quota

FinMind token 有 API 使用量限制。為降低 quota 風險：

- 股票清單 cache。
- 月營收 cache。
- 前端搜尋 debounce。
- 切換同一股票時避免重複 fetch。
- 錯誤訊息提示稍後再試。

## 狀態處理

### Loading

- 初次載入股票清單顯示 skeleton。
- 切換股票時圖表與表格顯示 loading。
- 搜尋框可顯示 loading spinner。

### Error

需區分：

- token 未設定。
- stockId 格式錯誤。
- 找不到股票。
- FinMind API 錯誤。
- FinMind quota exceeded。
- 網路錯誤。

使用者訊息需簡潔，不暴露 server token 或完整 stack trace。

### Empty

情境：

- 搜尋不到股票。
- 股票存在但沒有近 5 年月營收。
- 年增率缺少去年同期資料。

## 實作順序

1. 閱讀 Next 16 本機文件，確認 App Router、Route Handler、env、cache 寫法。
2. 安裝 MUI、MUI Next integration、MUI X Charts。
3. 建立 MUI theme 與 provider。
4. 建立 FinMind server-side client。
5. 建立 type definitions。
6. 建立股票清單 API route。
7. 建立月營收 API route。
8. 建立資料整理與年增率計算 helper。
9. 實作頁面基本 layout。
10. 實作股票搜尋。
11. 實作 URL query sync。
12. 實作股票標題。
13. 實作圖表。
14. 實作資料表。
15. 補 loading、error、empty states。
16. 補 README 啟動方式、環境變數、部署方式。
17. 驗證 lint。
18. 驗證 build。
19. 本機測試主要互動流程。
20. 部署到 Vercel。
21. 驗證 production 網站。

## 驗收項目

### 本機

- `pnpm install` 可安裝依賴。
- `.env.local` 設定 `FINMIND_API_TOKEN` 後，`pnpm dev` 可正常啟動。
- `pnpm lint` 通過。
- `pnpm build` 通過。

### 功能

- 可搜尋股票代號，例如 `2330`。
- 可搜尋股票名稱，例如 `台積電`。
- 選擇股票後 URL query 更新。
- 重新整理後仍顯示 query 指定股票。
- 顯示股票名稱與代號。
- 顯示近 5 年月營收柱狀圖。
- 顯示單月營收年增率折線圖。
- hover tooltip 顯示月份、月營收、年增率。
- 顯示資料表。
- 表格最新月份在最右側。
- 無去年同期資料時年增率顯示 `-`。
- API error 時有清楚錯誤訊息。

### 安全

- FinMind token 不在 repo 中。
- FinMind token 不在 README 中。
- FinMind token 不在 client-side code 中。
- Browser Network request 不顯示 FinMind token。
- 前端只呼叫本專案 API route。

### 部署

- Vercel production 設定 `FINMIND_API_TOKEN`。
- Vercel 部署成功。
- production 網站可搜尋股票。
- production 圖表與表格正常。

## README 內容規劃

README 需包含：

- 專案簡介。
- 功能列表。
- 技術棧。
- 環境變數。
- 本機啟動方式。
- scripts。
- 架構說明。
- 部署方式。
- plan 文件連結。

## 風險與備案

### MUI X Charts 客製不足

風險：

- 雙 y 軸或 tooltip 不符合需求。

備案：

- 改用 Recharts。

### FinMind API quota

風險：

- 免費 token 有請求限制。

備案：

- 增加 server-side cache。
- 前端避免重複請求。
- README 說明 quota 限制。

### Token 漏出

風險：

- 誤用 `NEXT_PUBLIC_`。
- client component 直接 fetch FinMind。

備案：

- 所有 FinMind 呼叫集中 server-side。
- code review 檢查 `NEXT_PUBLIC_FINMIND` 與 `Authorization`。
- 驗收時檢查 Network request。

### Vercel env 未設定

風險：

- production API route 無法呼叫 FinMind。

備案：

- API route 回傳明確錯誤。
- README 補設定步驟。

### 股票清單太大

風險：

- Autocomplete 效能下降。

備案：

- server 端只回傳必要欄位。
- 前端 filter limit。
- 必要時改成 server-side search endpoint。
