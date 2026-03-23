<template>
  <footer
    ref="sectionRef"
    class="relative bg-dark-soft min-h-screen flex flex-col justify-center px-6 overflow-hidden"
  >
    <div class="max-w-2xl mx-auto text-center">
      <!-- Names -->
      <p
        class="footer-names font-display text-5xl md:text-7xl text-warm-white font-semibold mb-4 will-change-transform tracking-wider"
      >
        {{ wedding?.groom_name_en }} &amp; {{ wedding?.bride_name_en }}
      </p>

      <!-- Date -->
      <p
        class="footer-date font-sans text-xs tracking-[0.35em] uppercase text-muted/50 mb-12 will-change-transform"
        :class="{ 'font-khmer! tracking-normal!': locale === 'kh' }"
      >
        {{ t("date.short") }}
      </p>

      <!-- Thin gold line -->
      <div
        class="footer-line flex items-center justify-center mb-12 will-change-transform"
      >
        <div class="h-px w-0 footer-line-left bg-gold/30" />
        <div
          class="w-1.5 h-1.5 rounded-full bg-gold/40 mx-4 footer-dot scale-0"
        />
        <div class="h-px w-0 footer-line-right bg-gold/30" />
      </div>

      <!-- Thank you -->
      <p
        class="footer-thankyou font-serif text-sm md:text-base text-muted/40 italic mb-14 will-change-transform"
        :class="{ 'font-khmer!': locale === 'kh' }"
      >
        {{ t("footer.thankyou") }}
      </p>

      <!-- Made by -->
      <div
        class="footer-credit border-t border-white/[0.06] pt-8 will-change-transform"
      >
        <p class="font-sans text-[11px] text-muted/30 tracking-wider">
          {{ t("footer.craftedBy") }}
          <span class="text-gold/40">{{ wedding?.footer_credit }}</span>
        </p>
        <p class="font-sans text-[10px] text-muted/20 mt-2">
          &copy; {{ footerYear }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const { wedding } = useWedding();

const footerYear = computed(() => {
  try {
    return new Date(wedding.value?.date).getFullYear().toString();
  } catch {
    return "";
  }
});

const { locale, t } = useI18n();

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const sectionRef = ref<HTMLElement | null>(null);

onMounted(() => {
  const el = sectionRef.value;
  if (!el) return;

  const q = gsap.utils.selector(el);

  gsap.fromTo(
    q(".footer-names"),
    { opacity: 0, scale: 1.8, letterSpacing: "0.5em" },
    {
      opacity: 1,
      scale: 1,
      letterSpacing: "0.05em",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "top 45%",
        scrub: 0.5,
      },
    },
  );

  gsap.fromTo(
    q(".footer-date"),
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
        end: "top 50%",
        scrub: 0.5,
      },
    },
  );

  gsap.fromTo(
    q(".footer-line"),
    { opacity: 0 },
    {
      opacity: 1,
      scrollTrigger: {
        trigger: el,
        start: "top 70%",
        end: "top 50%",
        scrub: 0.3,
      },
    },
  );
  gsap.to(q(".footer-line-left"), {
    width: "40px",
    scrollTrigger: {
      trigger: el,
      start: "top 65%",
      end: "top 45%",
      scrub: 0.3,
    },
  });
  gsap.to(q(".footer-line-right"), {
    width: "40px",
    scrollTrigger: {
      trigger: el,
      start: "top 65%",
      end: "top 45%",
      scrub: 0.3,
    },
  });
  gsap.to(q(".footer-dot"), {
    scale: 1,
    scrollTrigger: {
      trigger: el,
      start: "top 60%",
      end: "top 45%",
      scrub: 0.3,
    },
  });

  gsap.fromTo(
    q(".footer-thankyou"),
    { opacity: 0, y: 15 },
    {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: el,
        start: "top 55%",
        end: "top 40%",
        scrub: 0.3,
      },
    },
  );

  gsap.fromTo(
    q(".footer-credit"),
    { opacity: 0 },
    {
      opacity: 1,
      scrollTrigger: {
        trigger: el,
        start: "top 45%",
        end: "top 32%",
        scrub: 0.3,
      },
    },
  );
});
</script>
