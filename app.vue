<template>
  <div class="relative overflow-x-hidden">
    <LoadingScreen />
    <LanguageSwitcher />
    <HeroSection />
    <EventInfoSection />
    <VenueMapSection />
    <GallerySection />
    <CommentsSection />
    <GiftSection />
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
if (import.meta.client) {
  history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
}
</script>
