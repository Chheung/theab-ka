import { Howl } from 'howler'

export function useBackgroundMusic() {
  const isPlaying = ref(false)
  const isLoaded = ref(false)
  let sound: Howl | null = null

  onMounted(() => {
    sound = new Howl({
      src: ['/sounds/background-music.mp3'],
      loop: true,
      volume: 0.3,
      html5: true,
      onload: () => {
        isLoaded.value = true
      },
      onplay: () => {
        isPlaying.value = true
      },
      onpause: () => {
        isPlaying.value = false
      },
    })
  })

  function toggle() {
    if (!sound) return
    if (isPlaying.value) {
      sound.fade(0.3, 0, 500)
      setTimeout(() => sound?.pause(), 500)
    } else {
      sound.play()
      sound.fade(0, 0.3, 1000)
    }
  }

  function play() {
    if (!sound || isPlaying.value) return
    sound.play()
    sound.fade(0, 0.3, 1000)
  }

  onUnmounted(() => {
    if (sound) {
      sound.unload()
    }
  })

  return { isPlaying, isLoaded, toggle, play }
}
