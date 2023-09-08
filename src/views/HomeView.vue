<template>
  <div class="container mx-auto">
    <button @click="fetchData" class="p-4">click API</button>
    <button @click="fetchData2" class="p-4">click API 2</button>

    <div>
      <h1>API {{ data }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useCryptoCompareStore } from "@/stores/cryptoCompare"

const ccStore = useCryptoCompareStore()
const data = ref()

await ccStore.fetchMultipleSymbolsPrice({ fsyms: "" })

const fetchData = async () => {
  const result = await ccStore.fetchMultipleSymbolsPrice({ fsyms: "" })

  data.value = result.value
}

const fetchData2 = async () => {
  const result = await ccStore.fetchTotalTopTierVolFull({})

  data.value = result.value
}
</script>
