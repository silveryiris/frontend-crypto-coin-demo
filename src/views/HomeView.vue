<template>
  <main>
    <div>
      <button @click="fetchData" class="p-4">click API</button>
      <button @click="fetchData2" class="p-4">click API 2</button>
      <div>API {{ data }}</div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useFetch } from "@vueuse/core"
import { ref } from "vue"

const apiUrl = import.meta.env.VITE_CRYPTOCOMPARE_API_URL
const endpoint = ref("")

const { data, execute } = useFetch(endpoint, { immediate: false, refetch: true })

const fetchData = () => {
  endpoint.value = `${apiUrl}/pricemulti`
  execute()
}

const fetchData2 = () => {
  endpoint.value = `${apiUrl}/top/totaltoptiervolfull`
  execute()
}
</script>
