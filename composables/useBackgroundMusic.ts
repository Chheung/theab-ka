import { wedding } from '~/config/wedding'

let sound: any = null
const isPlaying = ref(false)
const isLoaded = ref(false)
const enabled = wedding.music?.enabled ?? false

export function useBackgroundMusic() {
  if (!enabled) {
    return {
      isPlaying: ref(false),
      isLoaded: ref(true),
      enabled: false,
      toggle: () => {},
      play: () => {},
    }
  }

  onMounted(async () => {
    if (sound) return // already initialized

    const { Howl } = await import('howler')
    sound = new Howl({
      src: [wedding.music!.src],
      loop: true,
      volume: wedding.music!.volume,
      html5: true,
      onload: () => { isLoaded.value = true },
      onplay: () => { isPlaying.value = true },
      onpause: () => { isPlaying.value = false },
    })
  })

  function toggle() {
    if (!sound) return
    if (isPlaying.value) {
      sound.fade(wedding.music!.volume, 0, 500)
      setTimeout(() => sound?.pause(), 500)
    } else {
      sound.play()
      sound.fade(0, wedding.music!.volume, 1000)
    }
  }

  function play() {
    if (!sound || isPlaying.value) return
    sound.play()
    sound.fade(0, wedding.music!.volume, 1000)
  }

  return { isPlaying, isLoaded, enabled, toggle, play }
}
