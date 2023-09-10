<template>
  <div class="container mx-auto px-2">
    <TabCrypto></TabCrypto>
    <TableCrypto></TableCrypto>
  </div>
</template>

<script setup lang="ts">
import { useCryptoCompareStore } from "@/stores/cryptoCompare"
import TabCrypto from "@/components/TabCrypto.vue"
import TableCrypto from "@/components/TableCrypto.vue"

const ccStore = useCryptoCompareStore()

await ccStore.fetchMultipleSymbolsPrice({ fsyms: "" })
</script>
