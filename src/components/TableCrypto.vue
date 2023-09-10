<template>
  <div class="h-96 overflow-x-auto">
    <table class="table table-pin-rows table-pin-cols">
      <thead>
        <tr class="text-right">
          <template v-for="(x, i) in tableHeaders" :key="x.label">
            <component
              :is="i === 0 ? 'th' : 'td'"
              class="font-normal text-primary-content"
              :class="{ 'text-left': i === 0 }"
            >
              {{ x.label }}
            </component>
          </template>
        </tr>
      </thead>
      <tbody>
        <template v-for="x in ccStore.topList" :key="x">
          <tr class="text-right text-primary-content">
            <th class="text-left">
              <div class="mr-4 flex items-center">
                <img
                  class="mr-2 h-6 w-6"
                  :src="`${ccStore.ccUrl}/${x.CoinInfo.ImageUrl}`"
                  :alt="`${x.CoinInfo.Name} icon`"
                />
                <span class="font-bold">{{ x.CoinInfo.Name }}</span>
              </div>
            </th>
            <td>{{ x.RAW.USD.PRICE }}</td>
            <td>{{ x.RAW.USD.CHANGEPCT24HOUR }}</td>
            <td>{{ x.RAW.USD.CHANGEPCT24HOUR }}</td>
            <td>{{ x.RAW.USD.CHANGEPCT24HOUR }}</td>
            <td>{{ x.RAW.USD.CHANGEPCT24HOUR }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useCryptoCompareStore } from "@/stores/cryptoCompare"

const ccStore = useCryptoCompareStore()

const tableHeaders = [
  { label: "名稱" },
  { label: "最新價" },
  { label: "24H漲幅%" },
  { label: "24h最高" },
  { label: "24h最低" },
  { label: "24h成交量(USDT)" },
]

await ccStore.fetchTotalTopTierVolFull({})
</script>
