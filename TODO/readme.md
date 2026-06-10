# 為沈浸模式設定public folder

`在html裡面為React-dom 準備的 div 上設定data set即可，[data-base-uri=public-folder-URI]`

```html
<div id="immersive_experience_section" data-base-uri="https://npm-demo.b-cdn.net/kgi/"></div>
<script type="module" src="./index.tsx"></script>
```

# 修改

## date: 0610

### 1. api : `immersion/miner`, 在 result.minerList裡面的name欄位改成英文，圖片image改Path

`name會被設定成className, image目前設定成file name並放在public folder就可以`

```Json
[
    { minerId: 'aeea6169-d040-4496-a3e9-3fa0240a896f', name: 'character-peach', image: 'character-peach.png', order: 1 },
    { minerId: 'f29335bc-a29a-4815-9cfb-f431fdbc4aec', name: 'character-green', image: 'character-green.png', order: 2 },
    { minerId: 'b0fca377-8347-4d08-b137-466c6ed6f2f9', name: 'character-blue', image: 'character-blue.png', order: 3 },
    { minerId: '8febd1e2-f527-4677-bfae-154afbdbf805', name: 'character-orange', image: 'character-orange.png', order: 4 },
    { minerId: 'a1b2c3d4-e5f6-4g7h-8i9j-k0l1m2n3o4p5', name: 'character-gray', image: 'character-gray.png', order: 5 },
    { minerId: 'c3d4e5f6-a7b8-4h9i-8j0k-l1m2n3o4p5q6', name: 'character-yellow', image: 'character-yellow.png', order: 6 },
]
```
