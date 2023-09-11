export type MultipleSymbolsPriceParams = {
  /**
   * Comma separated cryptocurrency symbols list
   */
  fsyms: string
  /**
   * Comma separated cryptocurrency symbols list to convert into
   *
   * ex: USD,EUR,CNY
   */
  tsyms?: string
}

export type TotalTopTierVolFullParams = {
  /**
   * The currency symbol to convert into
   *
   * ex: USD
   */
  tsym?: string
  /**
   * The number of coins to return in the top list, default 10, min 10, max 100 will round to steps of 10 coins
   */
  limit?: number
}

export type CoinInfo = {
  Id: string
  Name: string
  ImageUrl: string
  AssetLaunchDate: string
}

export type CoinRawInfo = {
  PRICE: number
  CHANGEPCT24HOUR: number
  HIGHDAY: number
  LOWDAY: number
  VOLUME24HOUR: number
}

export type MultipleSymbolsPriceResponse = {
  [key: string]: {
    [key: string]: number
  }
}

export type TotalTopTierVolFullResponseData = {
  CoinInfo: CoinInfo
  RAW: {
    [key: string]: CoinRawInfo
  }
}

export type TotalTopTierVolFullResponse = {
  Data: TotalTopTierVolFullResponseData[]
}
