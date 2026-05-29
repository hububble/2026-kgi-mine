# CSP（Content Security Policy）整理

## 1. 什麼是 CSP

- CSP（內容安全政策）是一種網站安全標頭（HTTP Header）。
- 作用是限制瀏覽器可載入與執行的資源（例如腳本、圖片、樣式）。
- 主要目標：降低 XSS（跨站腳本）與惡意注入攻擊風險。

延伸參考：

- MDN Web Docs：CSP 指南
- Google CSP Evaluator：策略安全性評估工具

## 2. 核心運作方式

- 伺服器在 HTTP 回應中加入 `Content-Security-Policy` 標頭。
- 瀏覽器收到後，依照規則清單（Directives）執行。
- 只有白名單中的資源會被允許載入或執行。
- 不符合規則的資源會被拒絕。

## 3. 常見指令（Directives）

- `default-src`：所有未另外定義資源類型的預設來源。
- `script-src`：可執行 JavaScript 的來源（例如 `'self'` 或特定網域）。
- `style-src`：CSS 樣式來源。
- `img-src`：圖片來源。
- `connect-src`：Ajax、Fetch、WebSocket 可連線的 API 來源。

## 4. 如何設定 CSP

### 方式一：後端 HTTP Header（推薦）

- 優點：最完整、最安全。
- 範例：只允許同源腳本與特定 CDN 圖片。

```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.com; img-src 'self' https://images.com;
```

### 方式二：前端 `<meta>` 標籤

- 適用：靜態網頁或無法調整伺服器設定時。
- 寫在 HTML 的 `<head>` 中。

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self';" />
```

注意：

- 使用 `<meta>` 時，無法使用部分進階功能（例如違規回報、沙盒模式）。

## 5. 常見關鍵字

- `'self'`：僅允許同網域資源。
- `'none'`：完全禁止此類資源。
- `'unsafe-inline'`：允許內聯腳本/樣式，會降低安全性，應盡量避免。
- `'unsafe-eval'`：允許 `eval()`、`setTimeout(string)` 等高風險語法。

## 6. 實務導入建議

不要一開始就套用最嚴格規則，避免網站功能大幅失效。建議流程如下：

1. 測試階段（Report-Only）
   - 使用 `Content-Security-Policy-Report-Only`。
   - 不會阻擋資源，但會記錄違規事件，方便盤點資源需求。
2. 修正調整
   - 根據違規報告補上合法來源到白名單。
3. 正式上線
   - 確認頁面功能正常後，切換為正式 `Content-Security-Policy`。
