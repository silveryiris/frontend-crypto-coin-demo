<template>
  <div class="h-96 overflow-x-auto">
    <table class="table table-pin-rows table-pin-cols">
      <thead>
        <tr class="text-right">
          <template v-for="(x, i) in tableHeaders" :key="x.label">
            <component
              :is="i === 0 ? 'th' : 'td'"
              class="font-normal text-primary-content"
              :class="{ 'text-left ': i === 0 }"
            >
              {{ x.label }}
              <span v-if="i === 0" class="block w-[30vw]"></span>
            </component>
          </template>
        </tr>
      </thead>
      <tbody>
        <template v-for="x in rows" :key="x">
          <tr @click="showCoinDetail(x)" class="text-right text-primary-content">
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
            <td>
              <BadgeNumberNotice :value="x.RAW.USD.PRICE" :show-notify-color="false" />
            </td>
            <td>
              <BadgeNumberNotice
                :value="x.RAW.USD.CHANGEPCT24HOUR"
                :show-plus-sign="true"
                suffix-label="%"
              />
            </td>
            <td><BadgeNumberNotice :value="x.RAW.USD.HIGHDAY" :show-notify-color="false" /></td>
            <td><BadgeNumberNotice :value="x.RAW.USD.LOWDAY" :show-notify-color="false" /></td>
            <td>
              <BadgeNumberNotice :value="x.RAW.USD.VOLUME24HOUR" :show-notify-color="false" />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue"
import type { PropType } from "vue"
import { useCryptoCompareStore } from "@/stores/cryptoCompare"
import type { TotalTopTierVolFullResponseData } from "@/stores/cryptoCompare.d"
import BadgeNumberNotice from "@/components/BadgeNumberNotice.vue"

const emit = defineEmits(["viewDetail"])

const props = defineProps({ rows: { type: Array as PropType<TotalTopTierVolFullResponseData[]> } })

const { rows } = toRefs(props)

const ccStore = useCryptoCompareStore()

const tableHeaders = [
  { label: "名稱" },
  { label: "最新價" },
  { label: "24H漲幅%" },
  { label: "24h最高" },
  { label: "24h最低" },
  { label: "24h成交量(USDT)" },
]

const showCoinDetail = (data: TotalTopTierVolFullResponseData) => {
  emit("viewDetail", data)
}
</script>
