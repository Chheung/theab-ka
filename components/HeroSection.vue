<template>
  <section ref="heroRef" class="relative h-screen flex items-center justify-center overflow-x-clip bg-dark">
    <!-- Background image -->
    <div class="absolute inset-0">
      <img
        :src="wedding.hero.backgroundImage"
        alt=""
        class="hero-bg absolute inset-0 w-full h-full object-cover opacity-40"
        fetchpriority="high"
        decoding="async"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/20 to-dark/90" />
    </div>

    <!-- Content -->
    <div class="hero-content relative z-10 text-center px-6 max-w-4xl mx-auto">
      <!-- Wedding of -->
      <p class="text-sm md:text-base text-gold/60 mb-6 animate-[fadeUp_0.6s_0.3s_ease-out_both]" :class="locale === 'kh' ? 'font-khmer' : 'font-sans text-xs md:text-sm uppercase tracking-[0.4em]'">
        {{ t('hero.weddingOf') }}
      </p>

      <!-- Names -->
      <div class="relative pt-8 pb-4 mb-2 animate-[fadeIn_1s_0.7s_ease-out_both]">
        <div class="flex items-end justify-center gap-3 md:gap-6">
          <h1 class="font-script text-6xl md:text-8xl lg:text-[10rem] gold-shimmer leading-[1.2]">
            {{ wedding.groom.name }}
          </h1>
          <span class="font-script text-3xl md:text-5xl lg:text-7xl text-gold/50 leading-[1.2]">
            &amp;
          </span>
          <h1 class="font-script text-6xl md:text-8xl lg:text-[10rem] gold-shimmer leading-[1.2]">
            {{ wedding.bride.name }}
          </h1>
        </div>
      </div>

      <!-- Date -->
      <p class="font-sans text-xs md:text-sm tracking-[0.35em] uppercase text-muted mb-6 animate-[fadeUp_0.5s_1.2s_ease-out_both]" :class="{ 'font-khmer! tracking-normal!': locale === 'kh' }">
        {{ t('date.display') }} &middot; {{ t('date.location') }}
      </p>

      <!-- Invitation -->
      <p class="font-serif text-lg md:text-2xl text-gold/60 italic mb-14 animate-[fadeUp_0.5s_1.4s_ease-out_both]">
        {{ t('hero.youreInvited') }}, <span class="text-gold/80">{{ wedding.guest.names }}</span>
      </p>

      <!-- Countdown -->
      <div class="mb-16 animate-[fadeUp_0.5s_1.6s_ease-out_both]">
        <CountdownTimer />
      </div>

      <!-- Scroll indicator -->
      <div class="animate-float animate-[fadeIn_0.5s_2s_ease-out_both]">
        <div class="w-px h-10 bg-gradient-to-b from-transparent to-gold/40 mx-auto" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { wedding } from '~/config/wedding'

const { locale, t } = useI18n()
const heroRef = ref<HTMLElement | null>(null)
const { play } = useBackgroundMusic()

onMounted(() => {
  let musicStarted = false
  function onFirstScroll() {
    if (musicStarted) return
    musicStarted = true
    play()
    window.removeEventListener('wheel', onFirstScroll)
    window.removeEventListener('touchmove', onFirstScroll)
  }
  window.addEventListener('wheel', onFirstScroll, { once: true, passive: true })
  window.addEventListener('touchmove', onFirstScroll, { once: true, passive: true })

  loadScrollParallax()
})

async function loadScrollParallax() {
  const el = heroRef.value
  if (!el) return

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ])
  gsap.registerPlugin(ScrollTrigger)

  const bg = el.querySelector('.hero-bg') as HTMLElement
  const content = el.querySelector('.hero-content') as HTMLElement

  if (bg) {
    gsap.to(bg, {
      scale: 1.2,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
    })
  }

  if (content) {
    gsap.to(content, {
      y: -120,
      opacity: 0,
      scale: 0.95,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top top', end: '60% top', scrub: true },
    })
  }
}
</script>

<style scoped>
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
