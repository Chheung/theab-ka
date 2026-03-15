<template>
  <button
    @click="toggle"
    class="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gold/90 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:bg-burgundy transition-all duration-300 border border-gold-light/50 cursor-pointer"
    :class="{ 'animate-pulse-ring': isPlaying }"
    :title="isPlaying ? t('ui.pauseMusic') : t('ui.playMusic')"
  >
    <!-- Playing: equalizer bars -->
    <div v-if="isPlaying" class="flex items-end gap-0.5 h-4">
      <span class="w-1 bg-white rounded-full animate-eq-1" />
      <span class="w-1 bg-white rounded-full animate-eq-2" />
      <span class="w-1 bg-white rounded-full animate-eq-3" />
    </div>
    <!-- Paused: music note icon -->
    <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
  </button>
</template>

<script setup lang="ts">
const { isPlaying, toggle } = useBackgroundMusic()
const { t } = useI18n()
</script>

<style scoped>
@keyframes eq1 {
  0%, 100% { height: 4px; }
  50% { height: 16px; }
}
@keyframes eq2 {
  0%, 100% { height: 12px; }
  50% { height: 6px; }
}
@keyframes eq3 {
  0%, 100% { height: 8px; }
  50% { height: 14px; }
}
.animate-eq-1 { animation: eq1 0.6s ease-in-out infinite; }
.animate-eq-2 { animation: eq2 0.7s ease-in-out infinite 0.1s; }
.animate-eq-3 { animation: eq3 0.5s ease-in-out infinite 0.2s; }
</style>
