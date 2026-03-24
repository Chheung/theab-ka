<template>
  <footer
    ref="sectionRef"
    class="relative bg-bloom-soft min-h-screen flex flex-col justify-center px-6 overflow-hidden"
  >
    <div class="mx-auto text-center">
      <p
        class="footer-names font-display text-5xl text-bark font-semibold mb-4 will-change-transform tracking-wider"
      >
        {{ wedding?.groom_name_en }} &amp; {{ wedding?.bride_name_en }}
      </p>

      <p
        class="footer-date font-sans text-xs tracking-[0.35em] uppercase text-thorn/50 mb-12 will-change-transform"
        :class="{ 'font-khmer! tracking-normal!': locale === 'kh' }"
      >
        {{ dateShort }}
      </p>

      <!-- Floral divider -->
      <div
        class="footer-line flex items-center justify-center mb-12 will-change-transform"
      >
        <div class="h-px w-0 footer-line-left bg-rose/30" />
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          class="mx-4 text-sage/40 footer-dot scale-0"
        >
          <circle
            cx="12"
            cy="12"
            r="3"
            stroke="currentColor"
            stroke-width="1"
          />
          <path
            d="M12 5C12 5 13.5 7 13.5 8.5C13.5 10 12 12 12 12C12 12 10.5 10 10.5 8.5C10.5 7 12 5 12 5Z"
            fill="currentColor"
            opacity="0.4"
          />
          <path
            d="M12 19C12 19 13.5 17 13.5 15.5C13.5 14 12 12 12 12C12 12 10.5 14 10.5 15.5C10.5 17 12 19 12 19Z"
            fill="currentColor"
            opacity="0.4"
          />
        </svg>
        <div class="h-px w-0 footer-line-right bg-rose/30" />
      </div>

      <p
        class="footer-thankyou font-serif text-sm text-thorn/40 italic mb-14 will-change-transform"
        :class="{ 'font-khmer!': locale === 'kh' }"
      >
        {{ t("footer.thankyou") }}
      </p>

      <div
        class="footer-credit border-t border-bark/10 pt-8 will-change-transform"
      >
        <p class="font-sans text-[11px] text-thorn/30 tracking-wider">
          {{ t("footer.craftedBy") }}
          <span class="text-rose/50">{{ wedding?.footer_credit }}</span>
        </p>
        <p class="font-sans text-[10px] text-thorn/20 mt-2">
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
const dateShort = computed(() => {
  const d = wedding.value?.date;
  if (!d) return "";
  const dt = new Date(d);
  const dd = String(dt.getDate()).padStart(2, "0");
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  return `${dd} . ${mm} . ${dt.getFullYear()}`;
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
