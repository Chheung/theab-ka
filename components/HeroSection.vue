<template>
  <section ref="heroRef" class="relative h-screen flex items-center justify-center overflow-hidden bg-dark">
    <!-- Background -->
    <div class="hero-bg absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1280&fit=crop&q=80"
        alt=""
        class="hero-bg-img absolute inset-0 w-full h-full object-cover will-change-transform opacity-40"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/20 to-dark/90" />
    </div>

    <div class="hero-content relative z-10 text-center px-6 max-w-4xl mx-auto will-change-transform">
      <!-- Thin gold line -->
      <div class="hero-line w-12 h-px bg-gold/50 mx-auto mb-10" />

      <!-- "The Wedding of" -->
      <p class="hero-subtitle font-sans text-xs md:text-sm uppercase tracking-[0.4em] text-gold/70 mb-2">
        The Wedding of
      </p>
      <p class="hero-subtitle-kh font-khmer text-sm md:text-base text-gold/50 mb-8">
        ពិធីមង្គលការ
      </p>

      <!-- Names -->
      <div class="flex items-center justify-center gap-3 md:gap-6 mb-6">
        <h1 class="hero-groom font-script text-6xl md:text-8xl lg:text-[10rem] gold-shimmer leading-none">
          Nato
        </h1>
        <span class="hero-ampersand font-sans text-xl md:text-2xl text-gold/40 uppercase tracking-[0.3em] font-light">
          &amp;
        </span>
        <h1 class="hero-bride font-script text-6xl md:text-8xl lg:text-[10rem] gold-shimmer leading-none">
          Rita
        </h1>
      </div>

      <!-- Thin gold line -->
      <div class="hero-line-bottom w-20 h-px bg-gold/30 mx-auto mb-8" />

      <!-- Date -->
      <p class="hero-date font-sans text-xs md:text-sm tracking-[0.35em] uppercase text-muted mb-6">
        15 August 2026 &middot; Phnom Penh
      </p>

      <!-- Personalized invitation -->
      <p class="hero-invite font-serif text-sm md:text-base text-gold/60 italic mb-12">
        You're invited, <span class="text-gold/80">Chheung &amp; Guekhuy</span>
      </p>

      <!-- Countdown -->
      <div class="hero-countdown mb-16">
        <CountdownTimer />
      </div>

      <!-- Scroll indicator -->
      <div class="hero-scroll-indicator">
        <div class="animate-float">
          <div class="w-px h-10 bg-gradient-to-b from-transparent to-gold/40 mx-auto mb-3" />
          <p class="text-gold/30 font-sans text-[9px] uppercase tracking-[0.4em]">Scroll</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

const heroRef = ref<HTMLElement | null>(null)
const { play } = useBackgroundMusic()

onMounted(() => {
  const el = heroRef.value
  if (!el) return

  // Auto-play music on first scroll
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

  const q = gsap.utils.selector(el)

  // Elegant entrance — slow and refined
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

  tl.from(q('.hero-bg'), { opacity: 0, duration: 1.5 })
    .from(q('.hero-line'), { scaleX: 0, duration: 0.8 }, '-=0.8')
    .from(q('.hero-subtitle'), { opacity: 0, y: 15, duration: 0.6 }, '-=0.4')
    .from(q('.hero-subtitle-kh'), { opacity: 0, y: 10, duration: 0.4 }, '-=0.3')
    .from(q('.hero-groom'), { opacity: 0, x: -40, duration: 0.8 }, '-=0.3')
    .from(q('.hero-bride'), { opacity: 0, x: 40, duration: 0.8 }, '-=0.7')
    .from(q('.hero-ampersand'), { opacity: 0, duration: 0.5 }, '-=0.4')
    .from(q('.hero-line-bottom'), { scaleX: 0, duration: 0.6 }, '-=0.3')
    .from(q('.hero-date'), { opacity: 0, duration: 0.5 }, '-=0.2')
    .from(q('.hero-invite'), { opacity: 0, y: 10, duration: 0.5 }, '-=0.2')
    .from(q('.hero-countdown'), { opacity: 0, y: 10, duration: 0.5 }, '-=0.2')
    .from(q('.hero-scroll-indicator'), { opacity: 0, duration: 0.5 }, '-=0.1')

  // Scroll-driven parallax exit
  gsap.to(q('.hero-bg-img'), {
    scale: 1.2,
    ease: 'none',
    scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
  })

  gsap.to(q('.hero-content'), {
    y: -120,
    opacity: 0,
    scale: 0.95,
    ease: 'none',
    scrollTrigger: { trigger: el, start: 'top top', end: '60% top', scrub: true },
  })
})
</script>
