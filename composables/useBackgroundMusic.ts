let sound: any = null;

export function useBackgroundMusic() {
  const { wedding } = useWedding();

  const isPlaying = useState("music-playing", () => false);
  const isLoaded = useState("music-loaded", () => false);

  const enabled = computed(() => wedding.value?.music_enabled ?? false);
  const musicUrl = computed(() => wedding.value?.music_url ?? "");
  const musicVolume = computed(() => wedding.value?.music_volume ?? 0.3);

  if (import.meta.client) {
    onMounted(async () => {
      if (!enabled.value || sound) return;

      const { Howl } = await import("howler");
      sound = new Howl({
        src: [musicUrl.value],
        loop: true,
        volume: musicVolume.value,
        html5: true,
        onload: () => {
          isLoaded.value = true;
        },
        onplay: () => {
          isPlaying.value = true;
        },
        onpause: () => {
          isPlaying.value = false;
        },
      });
    });
  }

  function toggle() {
    if (!sound) return;
    if (isPlaying.value) {
      sound.fade(musicVolume.value, 0, 500);
      setTimeout(() => sound?.pause(), 500);
    } else {
      sound.play();
      sound.fade(0, musicVolume.value, 1000);
    }
  }

  function play() {
    if (!sound || isPlaying.value) return;
    sound.play();
    sound.fade(0, musicVolume.value, 1000);
  }

  return { isPlaying, isLoaded, enabled, toggle, play };
}
