<template>
  <section
    ref="sectionRef"
    class="relative bg-bloom overflow-hidden min-h-screen flex flex-col justify-center"
  >
    <div class="text-center py-28 px-6">
      <p
        class="map-script font-sans text-xs uppercase tracking-[0.4em] text-rose/60 mb-4 will-change-transform"
        :class="{ 'font-khmer! text-sm! tracking-normal!': locale === 'kh' }"
      >
        {{ t("venue.subtitle") }}
      </p>
      <h2
        class="map-title font-display text-5xl text-bark font-semibold will-change-transform"
        :class="{ 'font-khmer! text-4xl!': locale === 'kh' }"
      >
        {{ t("venue.title") }}
      </h2>
    </div>

    <div ref="mapPin" class="relative px-6 pb-28">
      <div class="map-container relative w-full mx-auto will-change-transform">
        <div
          class="map-clip rounded-xl overflow-hidden border border-rose/10 h-100 shadow-sm"
          style="clip-path: circle(0% at 50% 50%)"
        >
          <ClientOnly>
            <LMap
              :zoom="15"
              :center="[venue?.lat ?? 0, venue?.lng ?? 0]"
              :use-global-leaflet="false"
            >
              <LTileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution="&copy; OpenStreetMap &copy; CARTO"
              />
              <LMarker :lat-lng="[venue?.lat ?? 0, venue?.lng ?? 0]">
                <LPopup>
                  <div class="text-center p-1">
                    <strong>{{ venue?.name_en }}</strong
                    ><br />
                    <span class="text-sm text-gray-600">{{
                      venue?.address_en
                    }}</span>
                  </div>
                </LPopup>
              </LMarker>
            </LMap>
            <template #fallback>
              <div
                class="w-full h-full bg-bloom-card flex items-center justify-center"
              >
                <p class="text-thorn/50 font-sans text-sm">
                  {{ t("ui.loadingMap") }}
                </p>
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>

      <div class="map-link text-center mt-10 will-change-transform">
        <a
          :href="venue?.map_url"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-3 font-sans text-sm uppercase tracking-[0.2em] text-rose/60 hover:text-rose transition-colors duration-300 group"
        >
          {{ t("venue.getDirections") }}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            class="group-hover:translate-x-1 transition-transform"
          >
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const { wedding } = useWedding();
const venue = computed(() => wedding.value?.venues?.[0]);
const { locale, t } = useI18n();

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const sectionRef = ref<HTMLElement | null>(null);
const mapPin = ref<HTMLElement | null>(null);

onMounted(() => {
  const el = sectionRef.value;
  if (!el) return;
  const q = gsap.utils.selector(el);

  gsap.fromTo(
    q(".map-script"),
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "top 55%",
        scrub: 0.5,
      },
    },
  );
  gsap.fromTo(
    q(".map-title"),
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1,
      scale: 1,
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
        end: "top 50%",
        scrub: 0.5,
      },
    },
  );
  gsap.to(q(".map-clip"), {
    clipPath: "circle(100% at 50% 50%)",
    ease: "none",
    scrollTrigger: {
      trigger: q(".map-container")[0],
      start: "top 80%",
      end: "top 20%",
      scrub: 0.5,
    },
  });
  gsap.fromTo(
    q(".map-container"),
    { scale: 0.92 },
    {
      scale: 1,
      scrollTrigger: {
        trigger: q(".map-container")[0],
        start: "top 85%",
        end: "top 30%",
        scrub: 0.5,
      },
    },
  );
  gsap.fromTo(
    q(".map-link"),
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: q(".map-link")[0],
        start: "top 90%",
        end: "top 70%",
        scrub: 0.3,
      },
    },
  );
});
</script>
