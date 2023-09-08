import { ref } from "vue"
import { defineStore } from "pinia"
import { createFetch } from "@vueuse/core"

export const useCryptoCompareStore = defineStore("cryptoCompare", () => {
  const apiUrl = ref(import.meta.env.VITE_CRYPTOCOMPARE_API_URL)
  const apiKey = ref(import.meta.env.VITE_CRYPTOCOMPARE_API_KEY)

  const apiFetch = createFetch({
    baseUrl: apiUrl.value,
    options: {
      beforeFetch({ options }) {
        options.headers = {
          ...options.headers,
          Authorization: `Apikey ${apiKey.value}`,
        }
      },
    },
  })

  /**
   * Multiple Symbols Price
   *
   * Get the current price of any cryptocurrency in any other currency that you need.
   */
  const fetchMultipleSymbolsPrice = async (params: MultipleSymbolsPriceParams) => {
    console.log(params)
    const { tsyms = "USD,EUR,CNY", fsyms } = params

    const endpoint = "/pricemulti"
    const searchParams = new URLSearchParams({ tsyms, fsyms }).toString()

    const { data } = await apiFetch(`${endpoint}?${searchParams}`)

    return data
  }

  /**
   * Top list by 24H Top Tier Volume Full Data
   *
   * Get a number of top coins by their total top tier volume based on the top 20 markets in the last 24 hours.
   * Default value is first page (0) and the top 10 coins.
   */
  const fetchTotalTopTierVolFull = async (params: TotalTopTierVolFullParams) => {
    const { tsym = "USD", limit = 10 } = params

    const endpoint = "/top/totaltoptiervolfull"
    const searchParams = new URLSearchParams({ tsym, limit: limit.toString() }).toString()

    const { data } = await apiFetch(`${endpoint}?${searchParams}`)

    return data
  }

  return { apiUrl, apiKey, fetchMultipleSymbolsPrice, fetchTotalTopTierVolFull }
})

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
