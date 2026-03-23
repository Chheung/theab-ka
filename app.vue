<template>
  <div class="relative overflow-x-hidden">
    <!-- Loading state -->
    <div
      v-if="loading && !wedding"
      class="fixed inset-0 z-[200] bg-dark flex flex-col items-center justify-center"
    >
      <div class="w-32 h-px bg-white/10 rounded-full overflow-hidden">
        <div
          class="h-full bg-gold/60 rounded-full"
          style="animation: loadingBar 1.5s ease-in-out infinite"
        />
      </div>
    </div>

    <!-- Error state -->
    <div
      v-else-if="error && !wedding"
      class="fixed inset-0 z-[200] bg-dark flex flex-col items-center justify-center px-6"
    >
      <p class="font-serif text-lg text-muted/60 text-center">{{ error }}</p>
    </div>

    <!-- Main content -->
    <template v-else-if="wedding">
      <LoadingScreen />
      <LanguageSwitcher />
      <HeroSection />
      <EventInfoSection />
      <VenueMapSection />
      <GallerySection />
      <CommentsSection />
      <GiftSection />
      <FooterSection />
    </template>
  </div>
</template>

<script setup lang="ts">
const { wedding, loading, error } = useWedding();

if (import.meta.client) {
  history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
}
</script>

<style>
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
</style>
