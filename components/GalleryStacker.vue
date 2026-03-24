<template>
  <section class="relative">
    <div class="grid grid-cols-2 gap-1 p-1">
      <div
        v-for="(img, i) in images"
        :key="img.id"
        class="relative overflow-hidden cursor-pointer"
        :class="
          images.length % 2 !== 0 && i === images.length - 1 ? 'col-span-2' : ''
        "
        @click="openLightbox(i)"
      >
        <img
          :src="img.src"
          alt=""
          class="w-full aspect-square object-cover"
          loading="lazy"
        />
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="lb">
        <div
          v-if="lbOpen"
          class="fixed inset-0 z-200 bg-black/95 flex items-center justify-center"
          @click.self="lbOpen = false"
        >
          <button
            @click="lbOpen = false"
            class="absolute top-5 right-5 z-50 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>

          <div class="absolute top-6 left-6 text-white/40 text-xs">
            {{ lbIndex + 1 }} / {{ images.length }}
          </div>

          <div
            class="w-full h-full flex items-center justify-center px-4"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
          >
            <img
              :src="images[lbIndex]?.src"
              alt=""
              class="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>

          <!-- Nav arrows -->
          <button
            v-if="lbIndex > 0"
            @click="lbIndex--"
            class="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <button
            v-if="lbIndex < images.length - 1"
            @click="lbIndex++"
            class="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  images: { id: number; src: string }[];
}>();

const lbOpen = ref(false);
const lbIndex = ref(0);
let touchStartX = 0;

function openLightbox(i: number) {
  lbIndex.value = i;
  lbOpen.value = true;
}

function onTouchStart(e: TouchEvent) {
  touchStartX = e.touches[0].clientX;
}
function onTouchMove() {}
function onTouchEnd(e: TouchEvent) {
  const delta = e.changedTouches[0].clientX - touchStartX;
  if (delta < -50 && lbIndex.value < props.images.length - 1) lbIndex.value++;
  if (delta > 50 && lbIndex.value > 0) lbIndex.value--;
}
</script>

<style scoped>
.lb-enter-active,
.lb-leave-active {
  transition: opacity 0.3s ease;
}
.lb-enter-from,
.lb-leave-to {
  opacity: 0;
}
</style>
