<template>
  <div v-show="isDisplay === true">
    <div class="flex items-center justify-between px-2 py-4">
      <button type="button"><ArrowLeftIcon class="h-6 w-6" @click="emit('close')" /></button>
      <span class="text-xl font-bold text-primary-content">{{ coinData.name }}/USDT</span>
      <button type="button"><BookOpenIcon class="h-6 w-6" @click="isOpenModal = true" /></button>
    </div>
    <div class="grid grid-cols-2 p-2">
      <div class="text-3xl text-emerald-500">{{ formatNumber(coinData.price) }}</div>
      <div class="grid gap-2 text-xs">
        <div class="col-span-2">
          <div class="mb-1">24h最高價</div>
          <div class="text-primary-content">{{ formatNumber(coinData.highDay) }}</div>
        </div>
        <div>
          <div class="mb-1">24h最低價</div>
          <div class="text-primary-content">{{ formatNumber(coinData.lowDay) }}</div>
        </div>
        <div>
          <div class="mb-1 whitespace-nowrap">24h成交量(USDT)</div>
          <div class="text-primary-content">
            {{ formatLocaleNumber(coinData.volume24Hour / 10000) }} 萬
          </div>
        </div>
      </div>
    </div>

    <CoinDetailModal
      :is-show="isOpenModal"
      :coin-name="coinData.name"
      @close="isOpenModal = false"
    ></CoinDetailModal>
  </div>
</template>

<script setup lang="ts">
import { toRefs, ref, type PropType } from "vue"
import { ArrowLeftIcon, BookOpenIcon } from "@heroicons/vue/24/solid"
import CoinDetailModal from "@/components/CoinDetailModal.vue"
import { formatNumber, formatLocaleNumber } from "@/composables/number"

const emit = defineEmits(["close"])

const props = defineProps({
  isDisplay: { type: Boolean, default: true },
  coinData: { type: Object as PropType<CoinData>, default: () => {} },
})

const { isDisplay, coinData } = toRefs(props)

const isOpenModal = ref(false)

export type CoinData = {
  name: string
  price: number
  highDay: number
  lowDay: number
  volume24Hour: number
}
</script>
