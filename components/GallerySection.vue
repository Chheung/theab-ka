<template>
  <section ref="sectionRef" class="relative bg-dark overflow-hidden no-snap">
    <!-- Heading -->
    <div class="text-center pt-28 pb-14 md:pt-36 md:pb-20 px-6">
      <p class="gallery-script font-sans text-xs md:text-sm uppercase tracking-[0.4em] text-gold/60 mb-4" :class="{ 'font-khmer! text-sm! tracking-normal!': locale === 'kh' }">{{ t('gallery.subtitle') }}</p>
      <h2 class="gallery-title font-display text-5xl md:text-7xl text-warm-white font-semibold" :class="{ 'font-khmer! text-4xl! md:text-6xl!': locale === 'kh' }">
        {{ t('gallery.title') }}
      </h2>
    </div>

    <!-- Pinned gallery viewport -->
    <div ref="galleryViewport" class="relative h-screen w-full overflow-hidden">
      <!-- Slides stacked: first on top, last on bottom -->
      <div
        v-for="(image, index) in wedding.gallery"
        :key="image.id"
        :ref="el => { if (el) slideRefs[index] = el as HTMLElement }"
        class="gallery-slide absolute inset-0 cursor-pointer"
        :style="{ zIndex: wedding.gallery.length - index }"
        @click="openLightbox(index)"
      >
        <div class="absolute inset-0 overflow-hidden">
          <img
            :src="image.src"
            :alt="galleryItems[index]?.alt ?? image.alt"
            class="slide-img absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <!-- Gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />

        <!-- Caption -->
        <div class="slide-caption absolute bottom-0 left-0 right-0 p-8 md:p-14">
          <div class="max-w-2xl mx-auto">
            <p class="font-sans text-[10px] uppercase tracking-[0.3em] text-gold/60 mb-3" :class="{ 'font-khmer! text-xs! tracking-normal!': locale === 'kh' }">{{ galleryItems[index]?.date }}</p>
            <p class="font-display text-xl md:text-3xl text-white/90 leading-snug" :class="{ 'font-khmer! text-lg! md:text-2xl!': locale === 'kh' }">{{ galleryItems[index]?.alt }}</p>
          </div>
        </div>
      </div>

      <!-- Progress dots -->
      <div class="absolute right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        <div
          v-for="(_, i) in wedding.gallery"
          :key="i"
          class="progress-dot w-1.5 h-1.5 rounded-full bg-white/20 transition-all duration-300"
          :class="{ 'bg-gold/80! scale-125!': activeSlide === i }"
        />
      </div>
    </div>

    <!-- Lightbox -->
    <GalleryLightbox
      :images="wedding.gallery"
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
import { wedding } from '~/config/wedding'

const { locale, t, tv } = useI18n()

const galleryItems = computed(() => tv('gallery.items') as any[])

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

const sectionRef = ref<HTMLElement | null>(null)
const galleryViewport = ref<HTMLElement | null>(null)
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)
const slideRefs = ref<HTMLElement[]>([])
const activeSlide = ref(0)

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

  // Title entrance
  gsap.fromTo(q('.gallery-script'),
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 55%', scrub: 0.5 } },
  )
  gsap.fromTo(q('.gallery-title'),
    { opacity: 0, scale: 0.75 },
    { opacity: 1, scale: 1, scrollTrigger: { trigger: el, start: 'top 75%', end: 'top 50%', scrub: 0.5 } },
  )

  // Simple slide-up reveal
  const master = gsap.timeline()

  for (let i = 0; i < total - 1; i++) {
    const slide = slides[i]
    const img = slide.querySelector('.slide-img') as HTMLElement
    const caption = slide.querySelector('.slide-caption') as HTMLElement

    if (img) {
      master.to(img, { scale: 1.05, duration: 1, ease: 'none' }, i)
    }

    if (caption) {
      master.to(caption, { y: -40, opacity: 0, duration: 0.3, ease: 'power2.in' }, i)
    }

    master.to(slide, { yPercent: -100, duration: 1, ease: 'power2.inOut' }, i)
  }

  ScrollTrigger.create({
    trigger: viewport,
    start: 'top top',
    end: `+=${(total - 1) * 100}%`,
    pin: true,
    scrub: 0.6,
    animation: master,
    onUpdate: (self) => {
      const slideIndex = Math.min(Math.floor(self.progress * total), total - 1)
      activeSlide.value = slideIndex
    },
  })
})
</script>

<style scoped>
.gallery-slide {
  will-change: transform;
}
</style>
