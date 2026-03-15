<template>
  <div class="flex justify-center gap-6 md:gap-10">
    <div
      v-for="unit in units"
      :key="unit.key"
      class="flex flex-col items-center"
    >
      <span class="font-display text-3xl md:text-5xl text-gold font-light leading-none tracking-wider">
        {{ String(unit.value).padStart(2, '0') }}
      </span>
      <span class="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-muted mt-2" :class="{ 'font-khmer! text-[10px]! md:text-xs! tracking-normal!': locale === 'kh' }">
        {{ t(`countdown.${unit.key}`) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { wedding } from '~/config/wedding'

const { locale, t } = useI18n()
const targetDate = new Date(wedding.date)

const now = ref(new Date())
let interval: ReturnType<typeof setInterval> | null = null

const units = computed(() => {
  const diff = targetDate.getTime() - now.value.getTime()
  if (diff <= 0) return [
    { key: 'days', value: 0 },
    { key: 'hours', value: 0 },
    { key: 'minutes', value: 0 },
    { key: 'seconds', value: 0 },
  ]

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return [
    { key: 'days', value: days },
    { key: 'hours', value: hours },
    { key: 'minutes', value: minutes },
    { key: 'seconds', value: seconds },
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
