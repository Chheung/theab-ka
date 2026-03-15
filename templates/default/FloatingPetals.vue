<template>
  <div
    ref="petalContainer"
    class="fixed inset-0 pointer-events-none overflow-hidden"
    style="z-index: 10"
  />
</template>

<script setup lang="ts">
const petalContainer = ref<HTMLElement | null>(null)
const petalCount = ref(15)

onMounted(() => {
  if (window.innerWidth < 768) {
    petalCount.value = 8
  }
})

usePetalAnimation(petalContainer, petalCount.value)
</script>
