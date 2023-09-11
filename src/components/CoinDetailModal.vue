<template>
  <Teleport to="#modal">
    <dialog id="my_modal_2" class="modal" ref="modal">
      <div class="modal-box max-w-[80vw] bg-gray-800">
        <div class="mb-4 text-center text-xl font-bold text-primary-content">市場對比</div>
        <div
          v-for="(v, k) in result[coinName]"
          :key="k"
          class="my-2 flex justify-between rounded bg-gray-700 p-4 text-primary-content"
        >
          <span>{{ coinName }} / {{ k }}</span>
          <span>{{ v }}</span>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop" @submit="close">
        <button>close</button>
      </form>
    </dialog>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from "vue"
import { useCryptoCompareStore } from "@/stores/cryptoCompare"
import type { MultipleSymbolsPriceResponse } from "@/stores/cryptoCompare.d"

const emit = defineEmits(["close", "open"])

const modal = ref<HTMLDialogElement>()

const props = defineProps({
  isShow: { type: Boolean, default: false },
  coinName: { type: String, default: "" },
})

const { isShow, coinName } = toRefs(props)

const ccStore = useCryptoCompareStore()

const open = () => {
  modal.value?.showModal()
  emit("open")
}

const close = () => {
  modal.value?.close()
  emit("close")
}

const result = ref<MultipleSymbolsPriceResponse>({})

watch(coinName, async (value) => {
  const data = await ccStore.fetchMultipleSymbolsPrice({ fsyms: value })

  result.value = data.value
})

watch(isShow, (value) => {
  value === true ? open() : null
})
</script>
