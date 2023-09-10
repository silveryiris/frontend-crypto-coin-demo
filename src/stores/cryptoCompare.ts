import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { createFetch } from "@vueuse/core"
import type {
  TotalTopTierVolFullResponseData,
  MultipleSymbolsPriceParams,
  TotalTopTierVolFullParams,
  TotalTopTierVolFullResponse,
} from "./cryptoCompare.d"

export const useCryptoCompareStore = defineStore("cryptoCompare", () => {
  const apiUrl = ref(import.meta.env.VITE_CRYPTOCOMPARE_API_URL)
  const apiKey = ref(import.meta.env.VITE_CRYPTOCOMPARE_API_KEY)
  const ccUrl = ref(import.meta.env.VITE_CRYPTOCOMPARE_URL)

  const topList = ref<TotalTopTierVolFullResponseData[]>([])

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
    const { tsyms = "USD,EUR,CNY", fsyms } = params

    const endpoint = "/pricemulti"
    const searchParams = new URLSearchParams({ tsyms, fsyms }).toString()

    const { data } = await apiFetch(`${endpoint}?${searchParams}`).json()

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

    const { data } = await apiFetch<TotalTopTierVolFullResponse>(
      `${endpoint}?${searchParams}`
    ).json()

    topList.value = data.value.Data

    return data
  }

  /**
   * 熱門
   */
  const topVolumeList = computed(() => {
    return [...topList.value].sort((a, b) => b.RAW.USD.VOLUME24HOUR - a.RAW.USD.VOLUME24HOUR)
  })

  /**
   * 漲幅榜
   */
  const topChangedPercentList = computed(() => {
    return [...topList.value].sort((a, b) => b.RAW.USD.CHANGEPCT24HOUR - a.RAW.USD.CHANGEPCT24HOUR)
  })

  /**
   * 跌幅榜
   */
  const topMinusChangedPercentList = computed(() => {
    return [...topList.value].sort((a, b) => a.RAW.USD.CHANGEPCT24HOUR - b.RAW.USD.CHANGEPCT24HOUR)
  })

  /**
   * 新幣上線
   */
  const topLatestLaunchList = computed(() => {
    return [...topList.value].sort(
      (a, b) =>
        new Date(b.CoinInfo.AssetLaunchDate).getTime() -
        new Date(a.CoinInfo.AssetLaunchDate).getTime()
    )
  })

  return {
    apiUrl,
    apiKey,
    topList,
    ccUrl,
    fetchMultipleSymbolsPrice,
    fetchTotalTopTierVolFull,
    topVolumeList,
    topChangedPercentList,
    topMinusChangedPercentList,
    topLatestLaunchList,
  }
})
