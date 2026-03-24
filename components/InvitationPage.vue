<template>
  <div class="app-outer">
    <!-- ===== PHASE 1: Loading ===== -->
    <div
      v-if="phase === 'loading'"
      class="fixed inset-0 z-300 bg-black flex flex-col items-center justify-center gap-4"
    >
      <p class="text-white/30 text-[10px] uppercase tracking-[0.3em]">
        {{ t("ui.loading") }}
      </p>
      <div class="w-40 h-px bg-white/10 rounded-full overflow-hidden">
        <div
          class="h-full bg-gold/60 rounded-full transition-all duration-300"
          :style="{ width: loadProgress + '%' }"
        />
      </div>
    </div>

    <!-- ===== ERROR ===== -->
    <div
      v-if="phase === 'error'"
      class="fixed inset-0 z-300 bg-black flex items-center justify-center px-6"
    >
      <p class="text-white/50 text-sm text-center">{{ error }}</p>
    </div>

    <!-- ===== PHASE 2+3: Cover + Intro (same container, no flicker) ===== -->
    <div
      v-show="phase === 'cover' || phase === 'intro' || transitioning"
      class="fixed inset-0 z-300 bg-black flex justify-center transition-opacity duration-1000"
      :class="transitioning ? 'opacity-0' : 'opacity-100'"
    >
      <div class="relative w-full md:max-w-[430px] h-full">
        <!-- Cover background: cover asset, or first frame of intro video on desktop -->
        <video
          v-if="hasAsset('cover_video')"
          :src="videoSrc('cover_video')"
          autoplay
          loop
          muted
          playsinline
          class="absolute inset-0 w-full h-full object-fill"
        />
        <img
          v-else-if="hasAsset('cover_image')"
          :src="asset('cover_image')"
          alt=""
          class="absolute inset-0 w-full h-full object-fill"
        />
        <video
          v-else-if="!isMobile && hasAsset('opening_video')"
          :src="videoSrc('opening_video')"
          muted
          playsinline
          class="absolute inset-0 w-full h-full object-fill"
        />

        <!-- Intro video (mobile only, on top, hidden until playing) -->
        <video
          v-if="isMobile && hasAsset('opening_video')"
          ref="introVideoEl"
          :src="videoSrc('opening_video')"
          playsinline
          class="absolute inset-0 w-full h-full object-fill transition-opacity duration-500"
          :class="phase === 'intro' ? 'opacity-100' : 'opacity-0'"
          @ended="onIntroEnd"
          @timeupdate="onIntroTimeUpdate"
        />

        <!-- Dark overlay + text (fades out on click) -->
        <div
          class="absolute inset-0 flex items-center justify-center transition-opacity duration-500 cursor-pointer"
          :class="
            phase === 'cover' ? 'opacity-100' : 'opacity-0 pointer-events-none'
          "
          @click="startIntro"
        >
          <div class="absolute inset-0 bg-black/40" />
          <div class="relative z-10 text-center px-8">
            <p
              v-if="guestName"
              class="font-script text-gold-light text-3xl md:text-4xl leading-snug mb-4"
            >
              {{ guestName }}
            </p>
            <p
              class="text-warm-white/70 text-xs uppercase tracking-[0.3em] mb-12"
            >
              {{ t("cover.youAreInvited") }}
            </p>
            <div class="animate-float">
              <p
                class="text-gold/80 text-[11px] uppercase tracking-[0.2em] border border-gold/30 rounded-full px-6 py-2.5 inline-block"
              >
                {{ t("cover.clickToOpen") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== PHASE 4: Main page ===== -->
    <div
      v-if="
        wedding &&
        (hasAsset('background_video') || hasAsset('background_image'))
      "
      class="fixed inset-0 z-0 flex justify-center pointer-events-none"
    >
      <div
        class="w-full md:max-w-[430px] h-full"
        :style="
          !hasAsset('background_video') && hasAsset('background_image')
            ? {
                backgroundImage: `url(${asset('background_image')})`,
                backgroundPosition: 'center top',
                backgroundRepeat: 'repeat',
                backgroundSize: '100% auto',
              }
            : undefined
        "
      >
        <video
          v-if="hasAsset('background_video')"
          :src="videoSrc('background_video')"
          autoplay
          loop
          muted
          playsinline
          class="w-full h-full object-fill"
        />
      </div>
    </div>

    <div
      class="app-shell relative overflow-x-hidden transition-opacity duration-1000"
      :class="phase === 'main' ? 'opacity-100' : 'opacity-0'"
    >
      <template v-if="wedding">
        <LanguageSwitcher />
        <div
          class="relative z-10 w-[90svw] md:w-full mx-auto max-w-[430px] h-[95svh] mt-4 overflow-y-auto scrollbar-hide"
        >
          <div
            v-if="hasAsset('intro')"
            class="min-h-full flex items-center justify-center"
          >
            <img :src="asset('intro')" alt="" class="w-full" />
          </div>
          <img
            v-if="hasAsset('events')"
            :src="asset('events')"
            alt=""
            class="w-full"
          />
          <div v-if="hasAsset('map')" class="relative">
            <img :src="asset('map')" alt="" class="w-full" />
            <div
              v-if="venue?.map_url"
              class="absolute bottom-6 left-1/2 -translate-x-1/2"
            >
              <a
                :href="venue.map_url"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-2 bg-white/90 text-black px-5 py-2.5 rounded-full text-xs uppercase tracking-wider shadow-lg"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
                  />
                </svg>
                {{ t("venue.getDirections") }}
              </a>
            </div>
          </div>
          <GalleryStacker v-if="gallery.length" :images="gallery" />
          <GiftSection v-if="gifts.length" :gifts="gifts" />
          <WishesSection v-if="comments.length" :comments="comments" />
          <img
            v-if="hasAsset('ending')"
            :src="asset('ending')"
            alt=""
            class="w-full"
          />
          <footer v-if="wedding.footer_credit" class="py-6 text-center">
            <p class="text-[10px] text-white/20 tracking-wider">
              {{ t("footer.craftedBy") }}
              <span class="text-white/40">{{ wedding.footer_credit }}</span>
            </p>
          </footer>
        </div>
      </template>
    </div>

    <!-- Background music -->
    <audio
      v-if="hasAsset('music')"
      ref="musicEl"
      :src="videoSrc('music')"
      loop
      preload="auto"
    />
  </div>
</template>

<script setup lang="ts">
const { wedding, loading, error } = useWedding();
const { asset, hasAsset } = useTemplateAssets();
const { t } = useI18n();

const PHASES = ["loading", "error", "cover", "intro", "main"] as const;
type Phase = (typeof PHASES)[number];
const _phase = ref<Phase>("loading");
const phase = computed({
  get: () => _phase.value,
  set: (v: Phase) => {
    // Once main, never go back
    if (_phase.value === "main") return;
    _phase.value = v;
  },
});
const loadProgress = ref(0);
const introVideoEl = ref<HTMLVideoElement | null>(null);
const musicEl = ref<HTMLAudioElement | null>(null);
const isMobile = ref(true);
const blobUrls = ref<Record<string, string>>({});
const transitioning = ref(false);

onMounted(() => {
  isMobile.value = window.innerWidth <= 768;
});

// Resolve blob URL if available, otherwise fall back to original
function videoSrc(key: string) {
  const url = asset(key);
  return (url && blobUrls.value[url]) || url;
}

const guestName = computed(() => wedding.value?.guest?.name_en || null);
const venue = computed(() => wedding.value?.venues?.[0]);
const gallery = computed(() =>
  (wedding.value?.gallery_images ?? []).map((img: any) => ({
    id: img.id,
    src: img.url,
  })),
);
const gifts = computed(() => wedding.value?.gifts ?? []);
const comments = computed(() => wedding.value?.comments ?? []);

function onIntroEnd() {
  transitioning.value = true;
  setTimeout(() => {
    phase.value = "main";
    transitioning.value = false;
  }, 1000);
}

function onIntroTimeUpdate(e: Event) {
  const v = e.target as HTMLVideoElement;
  if (v.duration && v.currentTime >= v.duration - 0.3) {
    onIntroEnd();
  }
}

function startMusic() {
  if (musicEl.value) {
    musicEl.value.play().catch(() => {});
  }
}

function startIntro() {
  startMusic();
  if (isMobile.value && hasAsset("opening_video")) {
    phase.value = "intro";
    nextTick(() => {
      introVideoEl.value?.play();
    });
  } else {
    onIntroEnd();
  }
}

// Preload all assets, then move to cover (runs once)
const hasInitialized = ref(false);
watch(
  () => wedding.value,
  async (w) => {
    if (!w || hasInitialized.value) return;
    hasInitialized.value = true;

    const urls: string[] = [];
    for (const a of w.template_assets ?? []) urls.push(a.url);
    for (const img of w.gallery_images ?? []) urls.push(img.url);

    if (!urls.length) {
      phase.value = "cover";
      return;
    }

    let loaded = 0;
    const total = urls.length;

    await Promise.all(
      urls.map(
        (url) =>
          new Promise<void>(async (resolve) => {
            const done = () => {
              loaded++;
              loadProgress.value = Math.round((loaded / total) * 100);
              resolve();
            };
            if (url.match(/\.(mp4|webm|mov)$/i)) {
              try {
                const res = await fetch(url);
                const blob = await res.blob();
                blobUrls.value[url] = URL.createObjectURL(blob);
              } catch {}
              done();
            } else {
              const img = new Image();
              img.onload = done;
              img.onerror = done;
              img.src = url;
            }
          }),
      ),
    );

    phase.value = "cover";
  },
  { immediate: true },
);

watch(
  () => error.value,
  (err) => {
    if (err && !wedding.value) phase.value = "error";
  },
);

const title = computed(() => {
  if (!wedding.value) return "Wedding Invitation";
  return `${wedding.value.groom_name_en} & ${wedding.value.bride_name_en} — Wedding Invitation`;
});

const description = computed(() => {
  if (!wedding.value) return "";
  return `You are cordially invited to celebrate the wedding of ${wedding.value.groom_name_en} & ${wedding.value.bride_name_en}`;
});

useHead({
  title,
  meta: [
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
  ],
  script: [
    {
      innerHTML: "history.scrollRestoration='manual';window.scrollTo(0,0);",
      tagPosition: "head",
    },
  ],
});
</script>
