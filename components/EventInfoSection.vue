<template>
  <section id="event-info" ref="sectionRef" class="relative bg-dark overflow-hidden no-snap">
    <!-- Big cinematic heading — pinned -->
    <div ref="headingPin" class="h-screen flex flex-col items-center justify-center px-6">
      <p class="event-script font-sans text-xs md:text-sm uppercase tracking-[0.4em] text-gold/60 mb-6 will-change-transform" :class="{ 'font-khmer! text-sm! tracking-normal!': locale === 'kh' }">{{ t('event.subtitle') }}</p>
      <h2 class="event-title font-display text-5xl md:text-7xl lg:text-8xl text-warm-white font-semibold text-center will-change-transform" :class="{ 'font-khmer! text-4xl! md:text-6xl! lg:text-7xl!': locale === 'kh' }">
        {{ t('event.title') }}
      </h2>
      <div class="event-line w-16 h-px bg-gold/30 mx-auto mt-8 will-change-transform" />
    </div>

    <!-- Timeline content -->
    <div ref="timelineWrap" class="relative max-w-3xl mx-auto px-6 pb-40">
      <!-- Timeline center line -->
      <div class="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px">
        <div class="timeline-line w-full h-full bg-gold/20 origin-top" />
      </div>

      <div class="space-y-28 md:space-y-36">
        <!-- Event cards -->
        <div
          v-for="(event, i) in events"
          :key="i"
          class="timeline-item relative pl-14 md:pl-0 md:grid md:grid-cols-2 md:gap-14 items-center"
        >
          <div class="timeline-dot absolute left-6 md:left-1/2 top-1 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
            <div class="w-2.5 h-2.5 rounded-full bg-gold" />
          </div>
          <div :class="i % 2 === 0 ? 'md:col-start-2 md:pl-10' : 'md:col-start-1 md:pr-10 md:text-right'">
            <div class="timeline-card bg-dark-card border border-white/[0.06] rounded-xl p-8 will-change-transform">
              <h3 class="font-display text-xl text-warm-white font-semibold mb-6" :class="{ 'font-khmer! text-lg!': locale === 'kh' }">{{ event.title }}</h3>
              <div class="space-y-4 text-muted" :class="{ 'md:[&>.flex]:flex-row-reverse': i % 2 !== 0, 'font-khmer': locale === 'kh' }">
                <div v-if="event.date" class="flex items-center gap-3">
                  <div class="w-4 flex justify-center"><div class="w-1 h-1 rounded-full bg-gold/40" /></div>
                  <span class="font-sans text-sm" :class="{ 'font-khmer!': locale === 'kh' }">{{ event.date }}</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-4 flex justify-center"><div class="w-1 h-1 rounded-full bg-gold/40" /></div>
                  <span class="font-sans text-sm" :class="{ 'font-khmer!': locale === 'kh' }">{{ event.time }}</span>
                </div>
                <div v-if="event.description" class="flex items-center gap-3">
                  <div class="w-4 flex justify-center"><div class="w-1 h-1 rounded-full bg-gold/40" /></div>
                  <span class="font-sans text-sm" :class="{ 'font-khmer!': locale === 'kh' }">{{ event.description }}</span>
                </div>
                <div v-if="event.venue" class="flex items-center gap-3">
                  <div class="w-4 flex justify-center"><div class="w-1 h-1 rounded-full bg-gold/40" /></div>
                  <div>
                    <p class="font-serif text-sm text-warm-white/80">{{ event.venue }}</p>
                    <p v-if="event.venueDetail" class="font-sans text-xs text-muted/60" :class="{ 'font-khmer!': locale === 'kh' }">{{ event.venueDetail }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Dress Code -->
        <div class="timeline-item relative pl-14 md:pl-0 md:grid md:grid-cols-2 md:gap-14 items-center">
          <div class="timeline-dot absolute left-6 md:left-1/2 top-1 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
            <div class="w-2 h-2 bg-gold/60 rotate-45" />
          </div>
          <div class="md:col-start-2 md:pl-10">
            <div class="timeline-card border border-white/[0.06] rounded-xl px-8 py-5 will-change-transform">
              <span class="font-sans text-sm text-muted" :class="{ 'font-khmer!': locale === 'kh' }">{{ t('event.dressCode') }}: <span class="text-gold">{{ t('event.dressCodeValue') }}</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { locale, t, tv } = useI18n()

const events = computed(() => tv('event.events') as any[])

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

const sectionRef = ref<HTMLElement | null>(null)
const headingPin = ref<HTMLElement | null>(null)
const timelineWrap = ref<HTMLElement | null>(null)

onMounted(() => {
  const el = sectionRef.value
  const heading = headingPin.value
  const timeline = timelineWrap.value
  if (!el || !heading || !timeline) return

  const q = gsap.utils.selector(el)

  const headingTl = gsap.timeline({
    scrollTrigger: { trigger: heading, start: 'top top', end: 'bottom top', scrub: true, pin: true },
  })

  headingTl
    .fromTo(q('.event-script'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3 })
    .fromTo(q('.event-title'), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4 }, 0.05)
    .fromTo(q('.event-line'), { scaleX: 0 }, { scaleX: 1, duration: 0.2 }, 0.3)
    .to({}, { duration: 0.3 })
    .to(q('.event-script'), { opacity: 0, y: -20, duration: 0.2 })
    .to(q('.event-title'), { opacity: 0, scale: 1.05, y: -40, duration: 0.3 }, '<')
    .to(q('.event-line'), { opacity: 0, duration: 0.15 }, '<')

  gsap.fromTo(q('.timeline-line'), { scaleY: 0 }, {
    scaleY: 1, ease: 'none',
    scrollTrigger: { trigger: timeline, start: 'top 80%', end: 'bottom 50%', scrub: 0.5 },
  })

  el.querySelectorAll('.timeline-item').forEach((item, i) => {
    const card = item.querySelector('.timeline-card') as HTMLElement
    const dot = item.querySelector('.timeline-dot') as HTMLElement
    const isRight = i % 2 === 0

    if (card) {
      gsap.fromTo(card,
        { opacity: 0, y: 50, x: isRight ? 30 : -30 },
        { opacity: 1, y: 0, x: 0, scrollTrigger: { trigger: item, start: 'top 85%', end: 'top 45%', scrub: 0.5 } },
      )
    }
    if (dot) {
      gsap.fromTo(dot,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, scrollTrigger: { trigger: item, start: 'top 80%', end: 'top 60%', scrub: 0.3 } },
      )
    }
  })
})
</script>
