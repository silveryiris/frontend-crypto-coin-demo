<template>
  <div class="rounded p-2" :class="notifyColor">
    <span v-if="showPlusSign === true && value >= 0">+</span>
    <span>{{ prefixLabel }}</span>
    <span>{{ displayNumber }}</span>
    <span>{{ suffixLabel }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue"
import { padLeadZero } from "@/composables/number"

const props = defineProps({
  value: { type: Number, default: 0 },
  padStart: { Type: Number, default: 0 },
  toFixed: { Type: Number, default: 2 },
  showPlusSign: { Type: Boolean, default: false },
  prefixLabel: { Type: String, default: "" },
  suffixLabel: { Type: String, default: "" },
  showNotifyColor: { type: Boolean, default: true },
})

const { padStart, toFixed, value, showPlusSign, prefixLabel, suffixLabel, showNotifyColor } =
  toRefs(props)

const positiveColor = "bg-emerald-500"
const negativeColor = "bg-rose-500"

const displayNumber = computed(() => {
  const label = value.value.toFixed(toFixed.value)

  const result = padLeadZero(label, padStart.value)

  return result
})

const notifyColor = computed(() => {
  if (showNotifyColor.value === false) return ""

  return value.value >= 0 ? positiveColor : negativeColor
})
</script>
