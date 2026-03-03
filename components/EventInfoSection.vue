<template>
  <section id="event-info" ref="sectionRef" class="relative bg-dark overflow-hidden no-snap">
    <!-- Big cinematic heading — pinned -->
    <div ref="headingPin" class="h-screen flex flex-col items-center justify-center px-6">
      <p class="event-script font-sans text-xs md:text-sm uppercase tracking-[0.4em] text-gold/60 mb-2 will-change-transform">Join Us</p>
      <p class="event-script-kh font-khmer text-sm text-gold/40 mb-6 will-change-transform">សូមអញ្ជើញ</p>
      <h2 class="event-title font-display text-5xl md:text-7xl lg:text-8xl text-warm-white font-semibold text-center will-change-transform">
        Our Wedding Day
      </h2>
      <p class="event-title-kh font-khmer text-lg md:text-xl text-warm-white/50 mt-3 will-change-transform">ថ្ងៃមង្គលការ</p>
      <div class="event-line w-16 h-px bg-gold/30 mx-auto mt-8 will-change-transform" />
    </div>

    <!-- Timeline content -->
    <div ref="timelineWrap" class="relative max-w-3xl mx-auto px-6 pb-40">
      <!-- Timeline center line -->
      <div class="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px">
        <div class="timeline-line w-full h-full bg-gold/20 origin-top" />
      </div>

      <div class="space-y-28 md:space-y-36">
        <!-- 1. Groom's Processional -->
        <div class="timeline-item relative pl-14 md:pl-0 md:grid md:grid-cols-2 md:gap-14 items-center">
          <div class="timeline-dot absolute left-6 md:left-1/2 top-1 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
            <div class="w-2.5 h-2.5 rounded-full bg-gold" />
          </div>
          <div class="md:col-start-2 md:pl-10">
            <div class="timeline-card bg-dark-card border border-white/[0.06] rounded-xl p-8 will-change-transform">
              <h3 class="font-display text-xl text-warm-white font-semibold mb-1">Groom's Processional</h3>
              <p class="font-sans text-[10px] uppercase tracking-[0.3em] text-gold/50 mb-6">ពិធីហែក្បួនមក</p>
              <div class="space-y-4 text-muted">
                <div class="flex items-center gap-3">
                  <div class="w-4 flex justify-center"><div class="w-1 h-1 rounded-full bg-gold/40" /></div>
                  <span class="font-sans text-sm">Saturday, 15 August 2026</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-4 flex justify-center"><div class="w-1 h-1 rounded-full bg-gold/40" /></div>
                  <span class="font-sans text-sm">6:00 AM</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-4 flex justify-center"><div class="w-1 h-1 rounded-full bg-gold/40" /></div>
                  <div>
                    <p class="font-serif text-sm text-warm-white/80">Bride's Family Home</p>
                    <p class="font-sans text-xs text-muted/60">Phnom Penh, Cambodia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Blessing Ceremony -->
        <div class="timeline-item relative pl-14 md:pl-0 md:grid md:grid-cols-2 md:gap-14 items-center">
          <div class="timeline-dot absolute left-6 md:left-1/2 top-1 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
            <div class="w-2.5 h-2.5 rounded-full bg-gold" />
          </div>
          <div class="md:col-start-1 md:pr-10 md:text-right">
            <div class="timeline-card bg-dark-card border border-white/[0.06] rounded-xl p-8 will-change-transform">
              <h3 class="font-display text-xl text-warm-white font-semibold mb-1">Blessing Ceremony</h3>
              <p class="font-sans text-[10px] uppercase tracking-[0.3em] text-gold/50 mb-6">ពិធីសូត្រមន្ត</p>
              <div class="space-y-4 text-muted">
                <div class="flex items-center gap-3 md:flex-row-reverse">
                  <div class="w-4 flex justify-center"><div class="w-1 h-1 rounded-full bg-gold/40" /></div>
                  <span class="font-sans text-sm">7:00 AM</span>
                </div>
                <div class="flex items-center gap-3 md:flex-row-reverse">
                  <div class="w-4 flex justify-center"><div class="w-1 h-1 rounded-full bg-gold/40" /></div>
                  <span class="font-sans text-sm">Monks' chanting & blessings</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Hair Cutting Ceremony -->
        <div class="timeline-item relative pl-14 md:pl-0 md:grid md:grid-cols-2 md:gap-14 items-center">
          <div class="timeline-dot absolute left-6 md:left-1/2 top-1 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
            <div class="w-2.5 h-2.5 rounded-full bg-gold" />
          </div>
          <div class="md:col-start-2 md:pl-10">
            <div class="timeline-card bg-dark-card border border-white/[0.06] rounded-xl p-8 will-change-transform">
              <h3 class="font-display text-xl text-warm-white font-semibold mb-1">Hair Cutting Ceremony</h3>
              <p class="font-sans text-[10px] uppercase tracking-[0.3em] text-gold/50 mb-6">ពិធីកាត់សក់</p>
              <div class="space-y-4 text-muted">
                <div class="flex items-center gap-3">
                  <div class="w-4 flex justify-center"><div class="w-1 h-1 rounded-full bg-gold/40" /></div>
                  <span class="font-sans text-sm">9:00 AM</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-4 flex justify-center"><div class="w-1 h-1 rounded-full bg-gold/40" /></div>
                  <span class="font-sans text-sm">Symbolic hair trim by elders</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. Knot-Tying Ceremony -->
        <div class="timeline-item relative pl-14 md:pl-0 md:grid md:grid-cols-2 md:gap-14 items-center">
          <div class="timeline-dot absolute left-6 md:left-1/2 top-1 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
            <div class="w-2.5 h-2.5 rounded-full bg-gold" />
          </div>
          <div class="md:col-start-1 md:pr-10 md:text-right">
            <div class="timeline-card bg-dark-card border border-white/[0.06] rounded-xl p-8 will-change-transform">
              <h3 class="font-display text-xl text-warm-white font-semibold mb-1">Knot-Tying Ceremony</h3>
              <p class="font-sans text-[10px] uppercase tracking-[0.3em] text-gold/50 mb-6">ពិធីបង្វិលប្រទីប</p>
              <div class="space-y-4 text-muted">
                <div class="flex items-center gap-3 md:flex-row-reverse">
                  <div class="w-4 flex justify-center"><div class="w-1 h-1 rounded-full bg-gold/40" /></div>
                  <span class="font-sans text-sm">11:00 AM</span>
                </div>
                <div class="flex items-center gap-3 md:flex-row-reverse">
                  <div class="w-4 flex justify-center"><div class="w-1 h-1 rounded-full bg-gold/40" /></div>
                  <span class="font-sans text-sm">Sacred thread & candle passing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 5. Lunch Banquet -->
        <div class="timeline-item relative pl-14 md:pl-0 md:grid md:grid-cols-2 md:gap-14 items-center">
          <div class="timeline-dot absolute left-6 md:left-1/2 top-1 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
            <div class="w-2.5 h-2.5 rounded-full bg-gold" />
          </div>
          <div class="md:col-start-2 md:pl-10">
            <div class="timeline-card bg-dark-card border border-white/[0.06] rounded-xl p-8 will-change-transform">
              <h3 class="font-display text-xl text-warm-white font-semibold mb-1">Lunch Banquet</h3>
              <p class="font-sans text-[10px] uppercase tracking-[0.3em] text-gold/50 mb-6">ពិធីថ្វាយភោជនាហារ</p>
              <div class="space-y-4 text-muted">
                <div class="flex items-center gap-3">
                  <div class="w-4 flex justify-center"><div class="w-1 h-1 rounded-full bg-gold/40" /></div>
                  <span class="font-sans text-sm">12:00 PM</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-4 flex justify-center"><div class="w-1 h-1 rounded-full bg-gold/40" /></div>
                  <div>
                    <p class="font-serif text-sm text-warm-white/80">Bride's Family Home</p>
                    <p class="font-sans text-xs text-muted/60">Phnom Penh, Cambodia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 6. Wedding Reception -->
        <div class="timeline-item relative pl-14 md:pl-0 md:grid md:grid-cols-2 md:gap-14 items-center">
          <div class="timeline-dot absolute left-6 md:left-1/2 top-1 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
            <div class="w-2.5 h-2.5 rounded-full bg-gold" />
          </div>
          <div class="md:col-start-1 md:pr-10 md:text-right">
            <div class="timeline-card bg-dark-card border border-white/[0.06] rounded-xl p-8 will-change-transform">
              <h3 class="font-display text-xl text-warm-white font-semibold mb-1">Wedding Reception</h3>
              <p class="font-sans text-[10px] uppercase tracking-[0.3em] text-gold/50 mb-6">ពិធីជប់លៀង</p>
              <div class="space-y-4 text-muted">
                <div class="flex items-center gap-3 md:flex-row-reverse">
                  <div class="w-4 flex justify-center"><div class="w-1 h-1 rounded-full bg-gold/40" /></div>
                  <span class="font-sans text-sm">5:00 PM</span>
                </div>
                <div class="flex items-center gap-3 md:flex-row-reverse">
                  <div class="w-4 flex justify-center"><div class="w-1 h-1 rounded-full bg-gold/40" /></div>
                  <div>
                    <p class="font-serif text-sm text-warm-white/80">Sofitel Phnom Penh Phokeethra</p>
                    <p class="font-sans text-xs text-muted/60">26 Old August Site, Sothearos Blvd</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 7. Dress Code -->
        <div class="timeline-item relative pl-14 md:pl-0 md:grid md:grid-cols-2 md:gap-14 items-center">
          <div class="timeline-dot absolute left-6 md:left-1/2 top-1 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
            <div class="w-2 h-2 bg-gold/60 rotate-45" />
          </div>
          <div class="md:col-start-2 md:pl-10">
            <div class="timeline-card border border-white/[0.06] rounded-xl px-8 py-5 will-change-transform">
              <span class="font-sans text-sm text-muted">Dress Code: <span class="text-gold">Formal / Semi-Formal</span></span>
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

  // Pinned heading
  const headingTl = gsap.timeline({
    scrollTrigger: { trigger: heading, start: 'top top', end: 'bottom top', scrub: true, pin: true },
  })

  headingTl
    .fromTo(q('.event-script'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3 })
    .fromTo(q('.event-script-kh'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25 }, 0.1)
    .fromTo(q('.event-title'), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4 }, 0.05)
    .fromTo(q('.event-title-kh'), { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.3 }, 0.15)
    .fromTo(q('.event-line'), { scaleX: 0 }, { scaleX: 1, duration: 0.2 }, 0.3)
    .to({}, { duration: 0.3 })
    .to(q('.event-script'), { opacity: 0, y: -20, duration: 0.2 })
    .to(q('.event-script-kh'), { opacity: 0, y: -15, duration: 0.15 }, '<')
    .to(q('.event-title'), { opacity: 0, scale: 1.05, y: -40, duration: 0.3 }, '<')
    .to(q('.event-title-kh'), { opacity: 0, y: -20, duration: 0.2 }, '<')
    .to(q('.event-line'), { opacity: 0, duration: 0.15 }, '<')

  // Timeline line
  gsap.fromTo(q('.timeline-line'), { scaleY: 0 }, {
    scaleY: 1, ease: 'none',
    scrollTrigger: { trigger: timeline, start: 'top 80%', end: 'bottom 50%', scrub: 0.5 },
  })

  // Cards
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
