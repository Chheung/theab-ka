<template>
  <Transition name="loading">
    <div
      v-if="!ready"
      class="fixed inset-0 z-200 flex flex-col items-center justify-center"
      :class="isFlower ? 'bg-bloom' : 'bg-dark'"
    >
      <!-- Names -->
      <p
        class="font-script text-4xl mb-4 pt-4"
        :class="isFlower ? 'rose-shimmer' : 'gold-shimmer'"
      >
        {{ wedding?.groom_name_en }} & {{ wedding?.bride_name_en }}
      </p>

      <!-- Loading bar -->
      <div
        class="w-32 h-px rounded-full overflow-hidden"
        :class="isFlower ? 'bg-rose/20' : 'bg-white/10'"
      >
        <div
          class="h-full rounded-full animate-loading-bar"
          :class="isFlower ? 'bg-rose/60' : 'bg-gold/60'"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { wedding } = useWedding();

const isFlower = computed(() => wedding.value?.template === "flower");
const ready = ref(false);

onMounted(() => {
  const heroImg = new Image();
  heroImg.src = wedding.value?.hero_image ?? "";

  const promises: Promise<any>[] = [
    new Promise<void>((resolve) => {
      if (heroImg.complete) return resolve();
      heroImg.onload = () => resolve();
      heroImg.onerror = () => resolve();
    }),
    document.fonts?.ready ?? Promise.resolve(),
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

.rose-shimmer {
  background: linear-gradient(
    90deg,
    #a06b5e 0%,
    #d9a99e 25%,
    #c4897b 50%,
    #d9a99e 75%,
    #a06b5e 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 4s linear infinite;
}
@keyframes shimmer {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}
</style>
