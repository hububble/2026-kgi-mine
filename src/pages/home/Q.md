## 等Hubuuble回應

1. Content page 支援 ?immersive=true 之類的參數
2. Content page 可依照參數隱藏特定 UI element
3. Content page 增加 [postMessage 與 parent iframe 溝通的能力](#取得content-page高傳到parent方式)
4. login page 是否已有 login state handling / redirect handling
5. 是否能接收 content page 傳來[影片、文章閱讀完成等事件](#傳任何事件到parent方式)
6. immersive app開發上需要在本機端可以取得token方式，是否可以登入完成後暫時用query string導回來？並暫時開放cors localhost fetch api們

```text
https://myImmersive.app/?token=xxxx-xxxx-xxxx-xxx
```

## 阿吉回應

1. 是否已可讀取 sessionStorage.getItem('mine_auth_token')

`當然可以`

2. 是否需要原始 React source code 才能 rebuild immersive app

   `source code：https://github.com/jameshsu1125/2026-kgi-mine 可以加collaborators共編`

### 取得Content page高傳到parent方式

```js
// 監聽 HTML 高度改變
const resizeObserver = new ResizeObserver(function () {
  const height = document.documentElement.scrollHeight;
  window.parent.postMessage({ type: 'iframe-height-changed', height: height }, '*');
});
resizeObserver.observe(document.documentElement);
```

```jsx
window.addEventListener('message', (event) => {
  if (event.data?.type === 'iframe-height-changed') {
    // 設定iframe高度
    document.querySelector('iframe').style.height = `${event.data.height}px`;
  }
});
```

### 傳任何事件到parent方式

```js
// 舉例
video.addEventListener('timeupdate', () => {
  const percentage = video.currentTime / video.duration;
  if (percentage >= 0.7) {
    window.parent.postMessage({ type: 'iframe-video-mission', percentage }, '*');
  }
});
```
