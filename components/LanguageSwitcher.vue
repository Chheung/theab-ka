<template>
  <div class="fixed top-6 right-6 z-50 flex items-center gap-2">
    <MusicController />
    <button
      @click="toggleLocale()"
      class="flex items-center gap-1.5 bg-dark-card/80 backdrop-blur-md border border-white/8 rounded-full px-4 py-2 cursor-pointer hover:border-gold/30 transition-all duration-300"
    >
      <span
        class="font-sans text-[11px] uppercase tracking-wider transition-colors duration-300"
        :class="locale === 'kh' ? 'text-gold' : 'text-muted/50'"
      >ខ្មែរ</span>
      <span class="text-white/20 text-[10px]">/</span>
      <span
        class="font-sans text-[11px] uppercase tracking-wider transition-colors duration-300"
        :class="locale === 'en' ? 'text-gold' : 'text-muted/50'"
      >EN</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale, toggleLocale } = useI18n()
</script>
