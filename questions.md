1. 登入的方式?

2. 頁面載入?如何使用 `/api/immersion/content` (取得沉浸式內容 (偏好礦/非偏好礦/候補區/看過未取得礦石) API)

#### `前後兩次用法，與回傳的東西不是很確定`

```json
{
    "isSuccess": true,
    "result": {
    "contentId": 0,
    "contentURL": "string",
    "image": "string",
    "isFavorited": true,
    "isLiked": true
}
```

3. `/api/immersion/miner` (取得題目/旅程/Miner角色 API)

#### `name的細節?`

```json
{
  "isSuccess": true,
  "result": {
    "tripList": [
      {
        "trip": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string"
      }
    ],
    "quizList": [
      {
        "quizId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string"
      }
    ],
    "minerList": [
      {
        "minerId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string",
        "image": "string"
      }
    ]
  }
}
```

3. 取得任務礦石`/api/member/mine/mission` (獲得任務礦石 API)。

#### `post body要mission id，要如何獲取?`

```json
{
  "missionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

```json
{
  "isSuccess": true,
  "result": true
}
```

4. 取得導航員/主題 API `/api/immersion/next-trip`(取得導航員/主題 API)

#### `json細節？`

```json
{
  "isSuccess": true,
  "result": {
    "pilotDtoList": [
      {
        "pilotId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string"
      }
    ],
    "nextTopicDtoList": [
      {
        "nextTopicId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string"
      }
    ]
  }
}
```

5. `/api/immersion/next-trip`(選擇導航員/主題 API)

#### `繼上題關聯？`

```json
{
  "pilotId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "topicId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

6. #### `問卷如何實現？`

7. #### `單筆礦石內容的url可行性`
