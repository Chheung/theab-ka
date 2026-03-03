<template>
  <section ref="sectionRef" class="relative bg-dark overflow-hidden no-snap">
    <!-- Heading (above the pinned area) -->
    <div class="text-center pt-28 pb-14 md:pt-36 md:pb-20 px-6">
      <p class="gallery-script font-sans text-xs md:text-sm uppercase tracking-[0.4em] text-gold/60 mb-1 will-change-transform">Cherished Memories</p>
      <p class="gallery-script font-khmer text-xs text-gold/40 mb-4 will-change-transform">វិចិត្រសាល</p>
      <h2 class="gallery-title font-display text-5xl md:text-7xl text-warm-white font-semibold will-change-transform">
        Our Gallery
      </h2>
    </div>

    <!-- This div gets pinned by GSAP — no CSS sticky needed -->
    <div ref="galleryViewport" class="relative h-screen w-full overflow-hidden">
      <!-- Stacked fullscreen slides -->
      <div
        v-for="(image, index) in images"
        :key="image.id"
        :ref="el => { if (el) slideRefs[index] = el as HTMLElement }"
        class="gallery-slide absolute inset-0 cursor-pointer"
        :style="{ zIndex: images.length - index }"
        @click="openLightbox(index)"
      >
        <!-- Image -->
        <div class="absolute inset-0 overflow-hidden">
          <img
            :src="image.src"
            :alt="image.alt"
            class="slide-img absolute inset-0 w-full h-full object-cover will-change-transform"
            loading="lazy"
          />
        </div>

        <!-- Gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />

        <!-- Caption -->
        <div class="slide-caption absolute bottom-0 left-0 right-0 p-8 md:p-14">
          <div class="max-w-2xl mx-auto">
            <p class="slide-date font-sans text-[10px] uppercase tracking-[0.3em] text-gold/60 mb-3">{{ image.date }}</p>
            <p class="slide-title font-display text-xl md:text-3xl text-white/90 leading-snug">{{ image.alt }}</p>
          </div>
        </div>
      </div>

      <!-- Scroll hint -->
      <div class="scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
        <div class="w-px h-8 bg-gradient-to-b from-transparent to-white/20" />
        <span class="font-sans text-[9px] text-white/30 uppercase tracking-[0.3em]">Scroll</span>
      </div>
    </div>

    <!-- Lightbox -->
    <GalleryLightbox
      :images="images"
      :current-index="lightboxIndex"
      :is-open="lightboxOpen"
      @close="lightboxOpen = false"
      @navigate="lightboxIndex = $event"
    />
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

const sectionRef = ref<HTMLElement | null>(null)
const galleryViewport = ref<HTMLElement | null>(null)
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)
const slideRefs = ref<HTMLElement[]>([])

const images = [
  { id: 1, alt: 'Our first date at the riverside cafe', date: 'March 2024', src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&h=800&fit=crop&q=80' },
  { id: 2, alt: 'Sunset walk along the beach', date: 'June 2024', src: 'https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=1200&h=800&fit=crop&q=80' },
  { id: 3, alt: 'The moment he proposed', date: 'October 2024', src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&h=800&fit=crop&q=80' },
  { id: 4, alt: 'Our engagement party', date: 'December 2024', src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&h=800&fit=crop&q=80' },
  { id: 5, alt: 'Pre-wedding photoshoot', date: 'February 2025', src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop&q=80' },
  { id: 6, alt: 'Our adventure in Siem Reap', date: 'April 2025', src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&h=800&fit=crop&q=80' },
  { id: 7, alt: 'Dancing under the stars', date: 'July 2025', src: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=1200&h=800&fit=crop&q=80' },
  { id: 8, alt: 'Together, forever and always', date: 'January 2026', src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&h=800&fit=crop&q=80' },
]

function openLightbox(index: number) {
  lightboxIndex.value = index
  lightboxOpen.value = true
}

onMounted(() => {
  const el = sectionRef.value
  const viewport = galleryViewport.value
  if (!el || !viewport) return

  const q = gsap.utils.selector(el)
  const slides = slideRefs.value
  const total = slides.length

  // Title: scrub-based scale reveal
  gsap.fromTo(q('.gallery-script'),
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 55%', scrub: 0.5 } },
  )
  gsap.fromTo(q('.gallery-title'),
    { opacity: 0, scale: 0.75 },
    { opacity: 1, scale: 1, scrollTrigger: { trigger: el, start: 'top 75%', end: 'top 50%', scrub: 0.5 } },
  )

  // Build the master timeline — each image transition takes 1 unit of time
  // Total duration = (total - 1) transitions
  const master = gsap.timeline()

  // Transition effects for variety
  const effects = ['clipCircle', 'slideUp', 'clipDiamond', 'zoomOut', 'clipHorizontal', 'slideRotate', 'clipVertical']

  for (let i = 0; i < total - 1; i++) {
    const slide = slides[i]
    const nextSlide = slides[i + 1]
    const caption = slide.querySelector('.slide-caption') as HTMLElement
    const nextCaption = nextSlide?.querySelector('.slide-caption') as HTMLElement
    const img = slide.querySelector('.slide-img') as HTMLElement
    const nextImg = nextSlide?.querySelector('.slide-img') as HTMLElement
    const effect = effects[i % effects.length]

    // Position in master timeline: each transition at its own time slot
    const pos = i

    // Current image parallax drift during its transition
    if (img) {
      master.to(img, { y: '-8%', scale: 1.08, duration: 1, ease: 'none' }, pos)
    }

    // Current caption fades out
    if (caption) {
      master.to(caption, { y: -80, opacity: 0, duration: 0.4, ease: 'power2.in' }, pos)
    }

    // Next caption enters from below (initially hidden, slides up)
    if (nextCaption) {
      master.fromTo(nextCaption,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
        pos + 0.6,
      )
    }

    // Next image starts slightly zoomed and settles
    if (nextImg) {
      master.fromTo(nextImg,
        { scale: 1.15 },
        { scale: 1, duration: 1, ease: 'power2.out' },
        pos,
      )
    }

    // Main slide transition effect
    switch (effect) {
      case 'clipCircle':
        master.fromTo(slide,
          { clipPath: 'circle(100% at 50% 50%)' },
          { clipPath: 'circle(0% at 50% 50%)', duration: 1, ease: 'power3.inOut' },
          pos,
        )
        break

      case 'slideUp':
        master.to(slide, { yPercent: -100, duration: 1, ease: 'power2.inOut' }, pos)
        break

      case 'clipDiamond':
        master.fromTo(slide,
          { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
          { clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)', duration: 1, ease: 'power3.inOut' },
          pos,
        )
        break

      case 'zoomOut':
        master.to(slide, { scale: 0.5, opacity: 0, duration: 1, ease: 'power2.inOut' }, pos)
        break

      case 'clipHorizontal':
        master.fromTo(slide,
          { clipPath: 'inset(0% 0% 0% 0%)' },
          { clipPath: 'inset(50% 0% 50% 0%)', duration: 1, ease: 'power3.inOut' },
          pos,
        )
        break

      case 'slideRotate':
        master.to(slide, { yPercent: -100, rotation: -3, scale: 0.9, duration: 1, ease: 'power2.inOut' }, pos)
        break

      case 'clipVertical':
        master.fromTo(slide,
          { clipPath: 'inset(0% 0% 0% 0%)' },
          { clipPath: 'inset(0% 50% 0% 50%)', duration: 1, ease: 'power3.inOut' },
          pos,
        )
        break
    }
  }

  // Pin the viewport and scrub the master timeline
  ScrollTrigger.create({
    trigger: viewport,
    start: 'top top',
    end: `+=${(total - 1) * 100}%`,
    pin: true,
    scrub: 0.8,
    animation: master,
    onUpdate: (self) => {
      // Hide scroll hint
      const hint = el.querySelector('.scroll-hint') as HTMLElement
      if (hint && self.progress > 0.02) {
        gsap.to(hint, { opacity: 0, duration: 0.3, overwrite: true })
      }
    },
  })
})
</script>

<style scoped>
.gallery-slide {
  will-change: clip-path, transform, opacity;
}
</style>
