# frontend-crypto-coin-demo

## 專案使用環境參數

`.env` 檔案

```sh
# cryptocompare.com 申請的api key
VITE_CRYPTOCOMPARE_API_KEY = YOUR_API_KEY

# cryptocompare.com api 網址
VITE_CRYPTOCOMPARE_API_URL = https://min-api.cryptocompare.com/data

# cryptocompare.com 網址
VITE_CRYPTOCOMPARE_URL = https://www.cryptocompare.com

# 開啟MSW mock api server，可以使用預先寫好的假資料來開發，如果參數為`enabled`以外則關閉
# 只會於開發環境中植入
VITE_ENABLE_DEV_MSW = enabled
```

本地開發可以新建`.env.local`來修改環境參數，讀取優先權高於`.env`

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Format coding style with [Prettier]

```sh
npm run format
```
