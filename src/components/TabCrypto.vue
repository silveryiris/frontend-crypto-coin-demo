<template>
  <div class="flex w-full overflow-x-auto py-2 text-sm text-primary-content">
    <button
      v-for="(x, i) in tabHeaders"
      :key="x.label"
      class="mx-4 my-2 flex shrink-0 px-2 py-0.5"
      :class="[activeTabId === x.id ? activeTabStyle : '']"
      @click="activeTab(i)"
    >
      {{ x.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const emit = defineEmits(["change"])

const tabHeaders = [
  { label: "自選", id: "custom" },
  { label: "熱門", id: "hot" },
  { label: "新幣上線", id: "new" },
  { label: "漲幅榜", id: "rise" },
  { label: "跌幅榜", id: "fall" },
]

const activeTabId = ref("custom")

const activeTab = (index = 0) => {
  const target = tabHeaders[index]

  if (target) {
    activeTabId.value = target.id

    emit("change", target.id)
  }
}

const activeTabStyle = "bg-slate-600 rounded"
</script>
