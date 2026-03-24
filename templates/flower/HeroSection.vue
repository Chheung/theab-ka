<template>
  <section
    ref="heroRef"
    class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    style="background: linear-gradient(180deg, #fef5ef 0%, #fff8f3 40%, #f3e1da 100%)"
  >
    <!-- Watercolor wash texture -->
    <div class="absolute inset-0 opacity-30 pointer-events-none" style="background: radial-gradient(ellipse at 20% 20%, #d9a99e33 0%, transparent 50%), radial-gradient(ellipse at 80% 60%, #a3bfad33 0%, transparent 50%), radial-gradient(ellipse at 50% 90%, #c4897b22 0%, transparent 40%)" />

    <!-- Floating petals -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div v-for="i in 12" :key="i" class="petal absolute" :style="petalStyle(i)" />
    </div>

    <!-- Grain overlay -->
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E'); background-size: 128px" />

    <!-- Content -->
    <div class="hero-content relative z-10 flex flex-col items-center px-8 py-20">
      <!-- Ornate top border -->
      <svg class="w-48 mb-8 animate-[fadeIn_1s_0.2s_ease-out_both]" viewBox="0 0 200 30" fill="none">
        <path d="M0 15 Q25 0 50 15 T100 15 T150 15 T200 15" stroke="#c4897b" stroke-width="0.5" opacity="0.4" />
        <path d="M60 15 Q80 5 100 15 T140 15" stroke="#7b9e87" stroke-width="0.5" opacity="0.5" />
        <circle cx="100" cy="15" r="2" fill="#c4897b" opacity="0.4" />
        <circle cx="80" cy="12" r="1" fill="#7b9e87" opacity="0.3" />
        <circle cx="120" cy="12" r="1" fill="#7b9e87" opacity="0.3" />
        <!-- Leaf shapes -->
        <path d="M30 15 Q35 8 40 15 Q35 22 30 15Z" fill="#7b9e87" opacity="0.15" />
        <path d="M160 15 Q165 8 170 15 Q165 22 160 15Z" fill="#7b9e87" opacity="0.15" />
      </svg>

      <!-- Wedding of -->
      <p
        class="text-rose/60 mb-4 animate-[fadeUp_0.6s_0.3s_ease-out_both]"
        :class="locale === 'kh' ? 'font-khmer text-sm' : 'font-sans text-[10px] uppercase tracking-[0.5em]'"
      >
        {{ t("hero.weddingOf") }}
      </p>

      <!-- Photo frame with floral wreath -->
      <div class="relative mb-6 animate-[fadeIn_1s_0.5s_ease-out_both]">
        <!-- Wreath SVG -->
        <svg class="absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)]" viewBox="0 0 200 200" fill="none">
          <!-- Left branch -->
          <path d="M30 100 Q20 60 50 40" stroke="#7b9e87" stroke-width="0.8" opacity="0.5" fill="none" />
          <path d="M35 80 Q25 75 30 65" stroke="#7b9e87" stroke-width="0.5" opacity="0.3" fill="none" />
          <path d="M40 60 Q30 55 35 45" stroke="#7b9e87" stroke-width="0.5" opacity="0.3" fill="none" />
          <ellipse cx="28" cy="72" rx="6" ry="3" transform="rotate(-30 28 72)" fill="#7b9e87" opacity="0.12" />
          <ellipse cx="35" cy="52" rx="5" ry="2.5" transform="rotate(-45 35 52)" fill="#7b9e87" opacity="0.12" />
          <circle cx="45" cy="38" r="3" fill="#c4897b" opacity="0.15" />
          <!-- Right branch -->
          <path d="M170 100 Q180 60 150 40" stroke="#7b9e87" stroke-width="0.8" opacity="0.5" fill="none" />
          <path d="M165 80 Q175 75 170 65" stroke="#7b9e87" stroke-width="0.5" opacity="0.3" fill="none" />
          <path d="M160 60 Q170 55 165 45" stroke="#7b9e87" stroke-width="0.5" opacity="0.3" fill="none" />
          <ellipse cx="172" cy="72" rx="6" ry="3" transform="rotate(30 172 72)" fill="#7b9e87" opacity="0.12" />
          <ellipse cx="165" cy="52" rx="5" ry="2.5" transform="rotate(45 165 52)" fill="#7b9e87" opacity="0.12" />
          <circle cx="155" cy="38" r="3" fill="#c4897b" opacity="0.15" />
          <!-- Bottom branches -->
          <path d="M50 160 Q20 140 30 100" stroke="#7b9e87" stroke-width="0.8" opacity="0.4" fill="none" />
          <path d="M150 160 Q180 140 170 100" stroke="#7b9e87" stroke-width="0.8" opacity="0.4" fill="none" />
          <ellipse cx="38" cy="135" rx="5" ry="2.5" transform="rotate(60 38 135)" fill="#7b9e87" opacity="0.1" />
          <ellipse cx="162" cy="135" rx="5" ry="2.5" transform="rotate(-60 162 135)" fill="#7b9e87" opacity="0.1" />
          <!-- Small flowers -->
          <circle cx="48" cy="155" r="2.5" fill="#d9a99e" opacity="0.2" />
          <circle cx="152" cy="155" r="2.5" fill="#d9a99e" opacity="0.2" />
        </svg>

        <!-- Couple photo -->
        <div class="relative w-40 h-40 rounded-full overflow-hidden border-2 border-rose/20 shadow-lg">
          <img
            v-if="wedding?.hero_image"
            :src="wedding.hero_image"
            alt=""
            class="hero-bg w-full h-full object-cover"
            fetchpriority="high"
          />
          <div class="absolute inset-0 rounded-full" style="box-shadow: inset 0 0 30px rgba(196,137,123,0.15)" />
        </div>
      </div>

      <!-- Names stacked -->
      <div class="text-center mb-2 animate-[fadeUp_0.8s_0.8s_ease-out_both]">
        <h1 class="font-script text-5xl text-bark leading-tight">
          {{ wedding?.groom_name_en }}
        </h1>
        <div class="flex items-center justify-center gap-4 my-1">
          <div class="w-8 h-px bg-rose/30" />
          <span class="font-serif text-xl text-rose/50 italic">&amp;</span>
          <div class="w-8 h-px bg-rose/30" />
        </div>
        <h1 class="font-script text-5xl text-bark leading-tight">
          {{ wedding?.bride_name_en }}
        </h1>
      </div>

      <!-- Date & Location -->
      <p
        class="font-sans text-[10px] tracking-[0.4em] uppercase text-thorn/70 mt-4 mb-10 animate-[fadeUp_0.5s_1.2s_ease-out_both]"
        :class="{ 'font-khmer! text-xs! tracking-normal!': locale === 'kh' }"
      >
        {{ dateDisplay }} &middot; {{ venueCity }}
      </p>

      <!-- Invitation -->
      <p
        v-if="wedding?.guest?.name_en"
        class="font-serif text-base text-rose/70 italic mb-10 animate-[fadeUp_0.5s_1.4s_ease-out_both]"
      >
        {{ t("hero.youreInvited") }},
        <span class="text-rose font-medium">{{ wedding.guest.name_en }}</span>
      </p>

      <!-- Countdown -->
      <div class="mb-8 animate-[fadeUp_0.5s_1.6s_ease-out_both]">
        <CountdownTimer />
      </div>

      <!-- Ornate bottom border -->
      <svg class="w-32 animate-[fadeIn_1s_1.8s_ease-out_both]" viewBox="0 0 120 20" fill="none">
        <path d="M0 10 Q15 0 30 10 T60 10 T90 10 T120 10" stroke="#c4897b" stroke-width="0.5" opacity="0.3" />
        <circle cx="60" cy="10" r="1.5" fill="#c4897b" opacity="0.3" />
      </svg>

      <!-- Scroll hint -->
      <div class="mt-6 animate-[fadeIn_0.5s_2.2s_ease-out_both]">
        <div class="w-px h-8 bg-gradient-to-b from-transparent to-rose/30 mx-auto animate-float" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { wedding } = useWedding();
const { locale, t } = useI18n();
const heroRef = ref<HTMLElement | null>(null);
const { enabled: musicEnabled, play } = useBackgroundMusic();

const dateDisplay = computed(() => {
  const d = wedding.value?.date;
  if (!d) return "";
  const dt = new Date(d);
  return dt.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
});
const venueCity = computed(() => wedding.value?.venues?.[0]?.city_en ?? "");

function petalStyle(i: number) {
  const left = 5 + Math.random() * 90;
  const delay = i * 1.2 + Math.random() * 2;
  const duration = 10 + Math.random() * 8;
  const size = 8 + Math.random() * 14;
  const rotation = Math.random() * 360;
  const colors = ['#c4897b', '#d9a99e', '#f3e1da', '#a3bfad'];
  return {
    left: `${left}%`,
    top: `-${size + 10}px`,
    width: `${size}px`,
    height: `${size * 0.6}px`,
    background: colors[i % colors.length],
    borderRadius: '50% 0 50% 0',
    transform: `rotate(${rotation}deg)`,
    animation: `petalFall ${duration}s ${delay}s ease-in-out infinite`,
    opacity: 0,
  };
}

onMounted(() => {
  if (musicEnabled.value) {
    let musicStarted = false;
    function onFirstScroll() {
      if (musicStarted) return;
      musicStarted = true;
      play();
      window.removeEventListener("wheel", onFirstScroll);
      window.removeEventListener("touchmove", onFirstScroll);
    }
    window.addEventListener("wheel", onFirstScroll, { once: true, passive: true });
    window.addEventListener("touchmove", onFirstScroll, { once: true, passive: true });
  }

  loadScrollParallax();
});

async function loadScrollParallax() {
  const el = heroRef.value;
  if (!el) return;
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
  gsap.registerPlugin(ScrollTrigger);

  const content = el.querySelector(".hero-content") as HTMLElement;
  if (content) {
    gsap.to(content, {
      y: -80, opacity: 0, ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: "70% top", scrub: true },
    });
  }
}
</script>

<style scoped>
@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes petalFall {
  0% { transform: translateY(0) rotate(0deg) scale(0.8); opacity: 0; }
  8% { opacity: 0.35; }
  50% { transform: translateY(50vh) rotate(180deg) translateX(20px) scale(1); }
  85% { opacity: 0.15; }
  100% { transform: translateY(105vh) rotate(400deg) translateX(-10px) scale(0.6); opacity: 0; }
}
</style>
