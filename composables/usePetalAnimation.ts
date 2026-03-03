import { gsap } from 'gsap'
import type { Ref } from 'vue'

interface Petal {
  element: HTMLElement
  timelines: gsap.core.Timeline[]
}

export function usePetalAnimation(container: Ref<HTMLElement | null>, count: number = 15) {
  const petals: Petal[] = []

  function createPetal(parent: HTMLElement): Petal {
    const el = document.createElement('div')
    el.className = 'absolute pointer-events-none'
    el.style.zIndex = '1'

    const size = 12 + Math.random() * 16
    const startX = Math.random() * 100
    const duration = 10 + Math.random() * 15
    const delay = Math.random() * 12
    const rotation = Math.random() * 360
    const hue = 340 + Math.random() * 30 // pink-rose range

    el.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" style="opacity: 0.35; filter: drop-shadow(0 1px 2px rgba(200,169,110,0.2));">
      <path d="M12 2C12 2 8 6 8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2Z" fill="hsl(${hue}, 60%, 75%)" />
      <path d="M2 12C2 12 6 8 12 8C18 8 22 12 22 12C22 12 18 16 12 16C6 16 2 12 2 12Z" fill="hsl(${hue}, 50%, 80%)" />
    </svg>`

    el.style.left = `${startX}%`
    el.style.top = '-5%'
    el.style.transform = `rotate(${rotation}deg)`

    parent.appendChild(el)

    const timelines: gsap.core.Timeline[] = []

    // Main falling animation
    const fallTl = gsap.timeline({ repeat: -1, delay })
    fallTl.fromTo(el,
      { y: -60, opacity: 0 },
      {
        y: window.innerHeight + 100,
        opacity: 0.4,
        rotation: rotation + 360 + Math.random() * 180,
        duration,
        ease: 'none',
      }
    )
    timelines.push(fallTl)

    // Gentle horizontal sway
    gsap.to(el, {
      x: `+=${20 + Math.random() * 40}`,
      duration: 2 + Math.random() * 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    return { element: el, timelines }
  }

  onMounted(() => {
    const parent = container.value
    if (!parent) return

    for (let i = 0; i < count; i++) {
      petals.push(createPetal(parent))
    }
  })

  onUnmounted(() => {
    petals.forEach(p => {
      p.timelines.forEach(tl => tl.kill())
      p.element.remove()
    })
  })
}
