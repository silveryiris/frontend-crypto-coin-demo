<template>
  <div class="flex w-full overflow-x-auto py-2 text-sm text-primary-content">
    <button
      v-for="(x, i) in tabHeaders"
      :key="x.label"
      class="mx-4 my-2 flex shrink-0 px-2 py-0.5"
      :class="[activeTabIndex === i ? activeTabStyle : '']"
      @click="activeTab(i)"
    >
      {{ x.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const tabHeaders = [
  { label: "自選" },
  { label: "熱門" },
  { label: "新幣上線" },
  { label: "漲幅榜" },
  { label: "跌幅榜" },
]

const activeTabIndex = ref(0)

const activeTab = (index = 0) => {
  const target = tabHeaders[index]

  if (target) {
    activeTabIndex.value = index
  }
}

const activeTabStyle = "bg-slate-600 rounded"
</script>
