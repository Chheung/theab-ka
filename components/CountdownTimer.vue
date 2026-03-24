<template>
  <div class="flex justify-center gap-6">
    <div
      v-for="unit in units"
      :key="unit.key"
      class="flex flex-col items-center"
    >
      <span
        class="font-display text-3xl font-light leading-none tracking-wider"
        :class="isFlower ? 'text-rose' : 'text-gold'"
      >
        {{ String(unit.value).padStart(2, "0") }}
      </span>
      <span
        class="font-sans text-[9px] uppercase tracking-[0.3em] mt-2"
        :class="{
          'font-khmer! text-[10px]! tracking-normal!': locale === 'kh',
          'text-thorn': isFlower,
          'text-muted': !isFlower,
        }"
      >
        {{ t(`countdown.${unit.key}`) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { wedding } = useWedding();
const isFlower = computed(() => wedding.value?.template === "flower");

const { locale, t } = useI18n();
const targetDate = computed(() => new Date(wedding.value?.date ?? 0));

const now = ref(new Date());
let interval: ReturnType<typeof setInterval> | null = null;

const units = computed(() => {
  const diff = targetDate.value.getTime() - now.value.getTime();
  if (diff <= 0)
    return [
      { key: "days", value: 0 },
      { key: "hours", value: 0 },
      { key: "minutes", value: 0 },
      { key: "seconds", value: 0 },
    ];

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return [
    { key: "days", value: days },
    { key: "hours", value: hours },
    { key: "minutes", value: minutes },
    { key: "seconds", value: seconds },
  ];
});

onMounted(() => {
  interval = setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>
