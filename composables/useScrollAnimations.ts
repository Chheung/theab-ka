import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Ref } from 'vue'

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

type AnimationType = 'fadeUp' | 'fadeIn' | 'scaleIn' | 'slideLeft' | 'slideRight' | 'staggerChildren'

interface AnimationOptions {
  trigger: Ref<HTMLElement | null>
  animation: AnimationType
  duration?: number
  delay?: number
  stagger?: number
  y?: number
  x?: number
  scale?: number
  start?: string
  end?: string
}

export function useScrollAnimations() {
  const triggers: ScrollTrigger[] = []

  function createAnimation(options: AnimationOptions) {
    onMounted(() => {
      const el = options.trigger.value
      if (!el) return

      const items = el.querySelectorAll('.animate-item')
      if (items.length === 0) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: options.start ?? 'top 85%',
          end: options.end ?? 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      const baseConfig = {
        duration: options.duration ?? 1,
        stagger: options.stagger ?? 0.2,
        ease: 'power3.out',
      }

      switch (options.animation) {
        case 'fadeUp':
          tl.from(items, { y: options.y ?? 60, opacity: 0, ...baseConfig })
          break
        case 'fadeIn':
          tl.from(items, { opacity: 0, duration: options.duration ?? 1.2, stagger: options.stagger ?? 0.15, ease: 'power2.out' })
          break
        case 'scaleIn':
          tl.from(items, { scale: options.scale ?? 0.8, opacity: 0, duration: options.duration ?? 0.8, stagger: options.stagger ?? 0.1, ease: 'back.out(1.7)' })
          break
        case 'slideLeft':
          tl.from(items, { x: options.x ?? -80, opacity: 0, ...baseConfig })
          break
        case 'slideRight':
          tl.from(items, { x: options.x ?? 80, opacity: 0, ...baseConfig })
          break
        case 'staggerChildren':
          tl.from(items, { y: 40, opacity: 0, duration: options.duration ?? 0.6, stagger: options.stagger ?? 0.1, ease: 'power2.out' })
          break
      }

      if (tl.scrollTrigger) {
        triggers.push(tl.scrollTrigger)
      }
    })
  }

  onUnmounted(() => {
    triggers.forEach(t => t.kill())
  })

  return { createAnimation }
}
