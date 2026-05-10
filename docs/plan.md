# Roadmap

這份文件記錄專案接下來可以改進的方向。已完成的架構、功能與部署方式以 [`README.md`](../README.md) 為準。

早期完整規劃已封存於 [`docs/archive/initial-plan.md`](archive/initial-plan.md)，該文件保留原始思考脈絡，內容可能與目前實作不同。

## Current Scope

目前專案已完成一頁式台股月營收查詢工具：

- 使用股票代號或名稱搜尋台股。
- 顯示目前股票名稱與代號。
- 顯示近 3、5、8 年月營收與單月營收年增率圖表。
- 顯示月營收明細表，並預設定位到最新月份。
- 透過 query string 分享股票與時間區間，例如 `/?stock=2330&start_at=1609430400000&end_at=1778428799999`。
- 使用 TanStack Query 與 server response cache 減少重複請求。
- 透過 Next.js Route Handlers 代理 FinMind API，避免 token 暴露在瀏覽器。
- 使用 Vercel Git Integration 部署，GitHub Actions 負責檢查。

## Next Improvements

### Responsive Layout

- 目前以桌面版為主。
- 後續可補手機與平板斷點，優先處理搜尋列、圖表高度與表格水平捲動體驗。

### Error States

- 將目前共用錯誤文字拆得更細：
  - FinMind token 未設定。
  - stock id 格式錯誤。
  - 查無股票或查無營收。
  - FinMind quota 或 API 錯誤。
- server 仍需避免把 token、stack trace 或外部 API 細節回傳到前端。

### Data Freshness

- 評估在畫面上顯示資料最後更新月份。
- 評估是否在 API response 中加入 cache 或更新時間資訊，讓使用者更容易判斷資料新鮮度。

### Component Refinement

- 保持 `page.tsx` 專注於資料流與頁面組裝。
- `BaseTable`、`BaseMenu`、`BaseMixedChart` 維持通用元件定位。
- `StockAutocomplete`、`RevenueTrendChart`、`HomePanel` 維持目前較貼近首頁需求的命名。
- 若未來 `BaseMenu` 只服務時間範圍選擇，可再改成更語意化的 feature component。

### Performance

- 若股票清單過大造成搜尋效能下降，可評估：
  - 限制前端顯示的 option 數量。
  - 加入 client-side debounce。
  - 改成 server-side search endpoint。

## Validation

日常驗證以專案規範為準，避免使用 dev/build 當作例行檢查：

```bash
pnpm run typecheck
pnpm run lint
pnpm run format:check
```
