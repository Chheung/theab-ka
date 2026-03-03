<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-dark/95 backdrop-blur-md"
        @click.self="$emit('close')"
      >
        <!-- Close button -->
        <button
          @click="$emit('close')"
          class="absolute top-8 right-8 text-white/40 hover:text-gold/80 transition-colors duration-300 z-10 cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </button>

        <!-- Previous -->
        <button
          @click="navigate(-1)"
          class="absolute left-6 md:left-10 text-white/30 hover:text-gold/70 transition-colors duration-300 z-10 cursor-pointer"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <!-- Image display -->
        <div class="max-w-5xl max-h-[80vh] mx-16">
          <img
            :src="images[currentIndex]?.src"
            :alt="images[currentIndex]?.alt"
            class="w-[85vw] max-w-5xl max-h-[75vh] object-contain"
          />
        </div>

        <!-- Next -->
        <button
          @click="navigate(1)"
          class="absolute right-6 md:right-10 text-white/30 hover:text-gold/70 transition-colors duration-300 z-10 cursor-pointer"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <!-- Caption & Counter -->
        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
          <p class="font-display text-base text-warm-white/70 tracking-wide mb-2">{{ images[currentIndex]?.alt }}</p>
          <p class="font-sans text-[10px] uppercase tracking-[0.3em] text-gold/40">{{ currentIndex + 1 }} / {{ images.length }}</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  images: Array<{ id: number; alt: string; src: string }>
  currentIndex: number
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
  navigate: [index: number]
}>()

function navigate(direction: number) {
  const newIndex = (props.currentIndex + direction + props.images.length) % props.images.length
  emit('navigate', newIndex)
}

function handleKeydown(e: KeyboardEvent) {
  if (!props.isOpen) return
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowLeft') navigate(-1)
  if (e.key === 'ArrowRight') navigate(1)
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.4s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
