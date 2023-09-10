<script setup lang="ts">
import { RouterView } from "vue-router"
import CommonLoading from "@/components/common/CommonLoading.vue"
</script>

<template>
  <Transition name="bounce">
    <Suspense>
      <RouterView />

      <template #fallback>
        <CommonLoading />
      </template>
    </Suspense>
  </Transition>
</template>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
