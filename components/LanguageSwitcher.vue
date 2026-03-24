<template>
  <div class="fixed top-6 right-6 z-50 flex items-center gap-2">
    <MusicController />
    <button
      @click="toggleLocale()"
      class="flex items-center gap-1.5 backdrop-blur-md border rounded-full px-4 py-2 cursor-pointer transition-all duration-300"
      :class="
        isFlower
          ? 'bg-bloom-card/80 border-rose/15 hover:border-rose/30'
          : 'bg-dark-card/80 border-white/8 hover:border-gold/30'
      "
    >
      <span
        class="font-sans text-[11px] uppercase tracking-wider transition-colors duration-300"
        :class="
          locale === 'kh'
            ? isFlower
              ? 'text-rose'
              : 'text-gold'
            : isFlower
              ? 'text-thorn/50'
              : 'text-muted/50'
        "
        >ខ្មែរ</span
      >
      <span
        class="text-[10px]"
        :class="isFlower ? 'text-bark/20' : 'text-white/20'"
        >/</span
      >
      <span
        class="font-sans text-[11px] uppercase tracking-wider transition-colors duration-300"
        :class="
          locale === 'en'
            ? isFlower
              ? 'text-rose'
              : 'text-gold'
            : isFlower
              ? 'text-thorn/50'
              : 'text-muted/50'
        "
        >EN</span
      >
    </button>
  </div>
</template>

<script setup lang="ts">
const { wedding } = useWedding();
const { locale, toggleLocale } = useI18n();
const isFlower = computed(() => wedding.value?.template === "flower");
</script>
