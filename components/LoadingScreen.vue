<template>
  <Transition name="loading">
    <div
      v-if="!ready"
      class="fixed inset-0 z-[200] bg-dark flex flex-col items-center justify-center"
    >
      <!-- Names -->
      <p class="font-script text-4xl md:text-5xl gold-shimmer mb-4 pt-4">
        {{ wedding?.groom_name_en }} & {{ wedding?.bride_name_en }}
      </p>

      <!-- Loading bar -->
      <div class="w-32 h-px bg-white/10 rounded-full overflow-hidden">
        <div class="h-full bg-gold/60 rounded-full animate-loading-bar" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { wedding } = useWedding();

const ready = ref(false);

onMounted(() => {
  // Wait for key resources: fonts + hero image
  const heroImg = new Image();
  heroImg.src = wedding.value?.hero_image ?? "";

  const promises: Promise<any>[] = [
    // Hero image loaded
    new Promise<void>((resolve) => {
      if (heroImg.complete) return resolve();
      heroImg.onload = () => resolve();
      heroImg.onerror = () => resolve();
    }),
    // Fonts ready
    document.fonts?.ready ?? Promise.resolve(),
    // Minimum display time so it doesn't flash
    new Promise<void>((resolve) => setTimeout(resolve, 800)),
  ];

  Promise.all(promises).then(() => {
    ready.value = true;
  });
});
</script>

<style scoped>
.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.6s ease;
}
.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}

@keyframes loadingBar {
  0% {
    width: 0%;
  }
  50% {
    width: 70%;
  }
  100% {
    width: 100%;
  }
}
.animate-loading-bar {
  animation: loadingBar 1.5s ease-in-out infinite;
}
</style>
