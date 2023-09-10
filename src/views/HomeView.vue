<template>
  <div class="container mx-auto px-2">
    <TabCrypto @change="handleTabChange"></TabCrypto>
    <TableCrypto :rows="tableData"></TableCrypto>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useCryptoCompareStore } from "@/stores/cryptoCompare"
import TabCrypto from "@/components/TabCrypto.vue"
import TableCrypto from "@/components/TableCrypto.vue"

const tabId = ref("")

const handleTabChange = (id: string) => {
  tabId.value = id
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
