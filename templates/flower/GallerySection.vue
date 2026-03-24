<template>
  <section ref="sectionRef" class="relative bg-bloom overflow-hidden no-snap">
    <div ref="viewport" class="relative h-screen w-full overflow-hidden">
      <div
        v-for="(image, index) in gallery"
        :key="image.id"
        :ref="
          (el) => {
            if (el) slideRefs[Number(index)] = el as HTMLElement;
          }
        "
        class="gallery-slide absolute inset-0"
        :style="{ zIndex: gallery.length - Number(index) }"
      >
        <div class="absolute inset-0 overflow-hidden">
          <img
            :src="image.src"
            :alt="image.alt"
            class="slide-img absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div
          class="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-bloom/20"
        />
      </div>

      <div
        class="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2"
      >
        <div
          v-for="(_, i) in gallery"
          :key="i"
          class="w-1.5 h-1.5 rounded-full transition-all duration-300"
          :class="activeSlide === i ? 'bg-rose scale-125' : 'bg-white/40'"
        />
      </div>

      <div
        ref="closingOverlay"
        class="absolute inset-0 z-40 bg-bloom pointer-events-none"
        style="opacity: 0"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const { wedding } = useWedding();
const { locale, t } = useI18n();

const gallery = computed(() =>
  (wedding.value?.gallery_images ?? []).map((img: any) => ({
    id: img.id,
    src: img.url,
    alt: img.caption_en,
    date: img.photo_date,
  })),
);

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const sectionRef = ref<HTMLElement | null>(null);
const viewport = ref<HTMLElement | null>(null);
const closingOverlay = ref<HTMLElement | null>(null);
const slideRefs = ref<HTMLElement[]>([]);
const activeSlide = ref(0);

onMounted(() => {
  const vp = viewport.value;
  if (!vp) return;
  const slides = slideRefs.value;
  const total = slides.length;
  if (total === 0) return;

  const master = gsap.timeline();
  for (let i = 0; i < total - 1; i++) {
    const slide = slides[i];
    const img = slide.querySelector(".slide-img") as HTMLElement;
    if (img) master.to(img, { scale: 1.05, duration: 1, ease: "none" }, i);
    master.to(slide, { yPercent: -100, duration: 1, ease: "power2.inOut" }, i);
  }

  const lastSlide = slides[total - 1];
  const lastImg = lastSlide?.querySelector(".slide-img") as HTMLElement;
  const closePhase = total - 1;
  if (lastImg)
    master.to(
      lastImg,
      {
        scale: 0.7,
        borderRadius: "16px",
        duration: 0.8,
        ease: "power2.inOut",
      },
      closePhase,
    );
  master.to(
    lastSlide,
    { scale: 0.6, opacity: 0, duration: 0.8, ease: "power2.inOut" },
    closePhase,
  );
  if (closingOverlay.value)
    master.to(
      closingOverlay.value,
      { opacity: 1, duration: 0.4, ease: "power2.in" },
      closePhase + 0.4,
    );

  ScrollTrigger.create({
    trigger: vp,
    start: "top top",
    end: `+=${total * 100}%`,
    pin: true,
    scrub: 0.6,
    animation: master,
    onUpdate: (self) => {
      activeSlide.value = Math.min(
        Math.floor(self.progress * total),
        total - 1,
      );
    },
  });
});
</script>

<style scoped>
.gallery-slide {
  will-change: transform;
}
</style>
