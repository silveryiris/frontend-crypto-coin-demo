<template>
  <div class="container mx-auto px-2">
    <Transition>
      <div v-show="isDisplayCoinList === true">
        <TabCrypto @change="handleTabChange"></TabCrypto>
        <TableCrypto @view-detail="handleViewDetail" :rows="tableData"></TableCrypto>
      </div>
    </Transition>
    <Transition>
      <CoinDetail
        @close="isDisplayCoinList = true"
        :is-display="!isDisplayCoinList"
        :coin-data="coinData"
      ></CoinDetail>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, reactive } from "vue"
import { useCryptoCompareStore } from "@/stores/cryptoCompare"
import type { TotalTopTierVolFullResponseData } from "@/stores/cryptoCompare.d"
import TabCrypto from "@/components/TabCrypto.vue"
import TableCrypto from "@/components/TableCrypto.vue"
import CoinDetail from "@/components/CoinDetail.vue"
import type { CoinData } from "@/components/CoinDetail.vue"

const isDisplayCoinList = ref(true)

const tabId = ref("")
const coinData = reactive<CoinData>({
  name: "",
  price: 0,
  highDay: 0,
  lowDay: 0,
  volume24Hour: 0,
})

const handleTabChange = (id: string) => {
  tabId.value = id
}

const handleViewDetail = (data: TotalTopTierVolFullResponseData) => {
  isDisplayCoinList.value = false

  coinData.name = data.CoinInfo.Name
  coinData.price = data.RAW.USD.PRICE
  coinData.highDay = data.RAW.USD.HIGHDAY
  coinData.lowDay = data.RAW.USD.LOWDAY
  coinData.volume24Hour = data.RAW.USD.VOLUME24HOUR
}

const ccStore = useCryptoCompareStore()

onMounted(async () => await ccStore.fetchTotalTopTierVolFull({}))

const tableData = computed(() => {
  switch (tabId.value) {
    case "custom":
      return ccStore.topList
    case "hot":
      return ccStore.topVolumeList
    case "new":
      return ccStore.topLatestLaunchList
    case "rise":
      return ccStore.topChangedPercentList
    case "fall":
      return ccStore.topMinusChangedPercentList
    default:
      return ccStore.topList
  }
})
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
