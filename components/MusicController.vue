<template>
  <button
    v-if="enabled"
    @click="toggle"
    class="flex items-center gap-1.5 bg-dark-card/80 backdrop-blur-md border border-white/[0.08] rounded-full px-3 py-2 cursor-pointer hover:border-gold/30 transition-all duration-300"
    :title="isPlaying ? t('ui.pauseMusic') : t('ui.playMusic')"
  >
    <!-- Playing: equalizer bars -->
    <div v-if="isPlaying" class="flex items-end gap-0.5 h-3.5">
      <span class="w-0.5 bg-gold rounded-full animate-eq-1" />
      <span class="w-0.5 bg-gold rounded-full animate-eq-2" />
      <span class="w-0.5 bg-gold rounded-full animate-eq-3" />
    </div>
    <!-- Paused: muted icon -->
    <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" class="text-muted/50">
      <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>
  </button>
</template>

<script setup lang="ts">
const { isPlaying, enabled, toggle } = useBackgroundMusic()
const { t } = useI18n()
</script>

<style scoped>
@keyframes eq1 {
  0%, 100% { height: 4px; }
  50% { height: 14px; }
}
@keyframes eq2 {
  0%, 100% { height: 10px; }
  50% { height: 5px; }
}
@keyframes eq3 {
  0%, 100% { height: 7px; }
  50% { height: 12px; }
}
.animate-eq-1 { animation: eq1 0.6s ease-in-out infinite; }
.animate-eq-2 { animation: eq2 0.7s ease-in-out infinite 0.1s; }
.animate-eq-3 { animation: eq3 0.5s ease-in-out infinite 0.2s; }
</style>
