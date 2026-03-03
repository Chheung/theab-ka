<template>
  <div class="flex justify-center gap-6 md:gap-10">
    <div
      v-for="unit in units"
      :key="unit.label"
      class="flex flex-col items-center"
    >
      <span class="font-display text-3xl md:text-5xl text-gold font-light leading-none tracking-wider">
        {{ String(unit.value).padStart(2, '0') }}
      </span>
      <span class="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-muted mt-2">
        {{ unit.label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const targetDate = new Date('2026-08-15T10:00:00')

const now = ref(new Date())
let interval: ReturnType<typeof setInterval> | null = null

const units = computed(() => {
  const diff = targetDate.getTime() - now.value.getTime()
  if (diff <= 0) return [
    { label: 'Days', value: 0 },
    { label: 'Hours', value: 0 },
    { label: 'Minutes', value: 0 },
    { label: 'Seconds', value: 0 },
  ]

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ]
})

onMounted(() => {
  interval = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>
