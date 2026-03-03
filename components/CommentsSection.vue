<template>
  <section ref="sectionRef" class="relative bg-dark-soft overflow-hidden py-36 md:py-44 px-6">
    <div class="max-w-3xl mx-auto w-full">
      <!-- Heading -->
      <div class="text-center mb-20 md:mb-28">
        <p class="comments-script font-sans text-xs md:text-sm uppercase tracking-[0.4em] text-gold/60 mb-1 will-change-transform">Kind Words</p>
        <p class="comments-script font-khmer text-xs text-gold/40 mb-4 will-change-transform">ពាក្យអបអរ</p>
        <h2 class="comments-title font-display text-5xl md:text-7xl text-warm-white font-semibold will-change-transform">
          Wishes
        </h2>
      </div>

      <!-- Comments -->
      <div class="space-y-6 md:space-y-8" style="perspective: 1200px">
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="comment-card bg-dark-card border border-white/[0.06] rounded-xl p-6 md:p-8 will-change-transform"
        >
          <div class="flex items-start gap-5">
            <div class="shrink-0">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center text-warm-white font-sans font-medium text-xs"
                :style="{ background: comment.avatarBg }"
              >
                {{ comment.initials }}
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="font-display text-base text-warm-white font-semibold mb-0.5">{{ comment.name }}</h4>
              <p class="font-sans text-[10px] uppercase tracking-[0.25em] text-gold/40 mb-4">
                {{ comment.relation }}
              </p>
              <p class="font-serif text-sm text-muted leading-relaxed italic">
                "{{ comment.message }}"
              </p>
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

const comments = [
  {
    id: 1, name: 'Sarah Johnson', initials: 'SJ',
    avatarBg: 'linear-gradient(135deg, #B8975A, #8A6E3A)',
    message: 'Wishing you both a lifetime of love and happiness! Your love story is truly one for the ages. May every day bring you closer together.',
    relation: "Bride's Best Friend",
  },
  {
    id: 2, name: 'Michael Chen', initials: 'MC',
    avatarBg: 'linear-gradient(135deg, #4A2028, #6B3040)',
    message: 'Congratulations to the most beautiful couple! From college roommates to witnessing this beautiful union — what a journey, bro!',
    relation: "Groom's College Friend",
  },
  {
    id: 3, name: 'Aunt Patricia', initials: 'AP',
    avatarBg: 'linear-gradient(135deg, #8A6E3A, #B8975A)',
    message: 'My dearest niece and her wonderful partner, may your marriage be filled with all the right ingredients: a heap of love, a dash of humor, and a touch of romance.',
    relation: "Bride's Aunt",
  },
  {
    id: 4, name: 'David & Lisa Park', initials: 'DP',
    avatarBg: 'linear-gradient(135deg, #6B3040, #4A2028)',
    message: 'Two amazing people coming together to create an even more amazing future. We are so honored to be part of your special day!',
    relation: 'Family Friends',
  },
  {
    id: 5, name: 'Emma Williams', initials: 'EW',
    avatarBg: 'linear-gradient(135deg, #B8975A, #6B3040)',
    message: 'The way you two look at each other says it all. Here is to a lifetime of love, laughter, and happily ever after. So thrilled for you both!',
    relation: 'Work Colleague',
  },
  {
    id: 6, name: 'James & Rosie Thompson', initials: 'JR',
    avatarBg: 'linear-gradient(135deg, #4A2028, #B8975A)',
    message: 'As a couple married for 30 years, our advice: never stop dating each other, never stop laughing together, and always choose love. Congratulations!',
    relation: "Groom's Parents' Friends",
  },
]

onMounted(() => {
  const el = sectionRef.value
  if (!el) return

  const q = gsap.utils.selector(el)

  gsap.fromTo(q('.comments-script'), { opacity: 0, y: 30 },
    { opacity: 1, y: 0, scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 55%', scrub: 0.5 } })
  gsap.fromTo(q('.comments-title'), { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, scrollTrigger: { trigger: el, start: 'top 75%', end: 'top 50%', scrub: 0.5 } })

  el.querySelectorAll('.comment-card').forEach((card) => {
    gsap.fromTo(card,
      { opacity: 0, y: 50, rotateX: 10, scale: 0.95 },
      {
        opacity: 1, y: 0, rotateX: 0, scale: 1,
        scrollTrigger: { trigger: card, start: 'top 90%', end: 'top 60%', scrub: 0.4 },
      },
    )
  })
})
</script>

<style scoped>
.comment-card {
  transform-style: preserve-3d;
}
</style>
