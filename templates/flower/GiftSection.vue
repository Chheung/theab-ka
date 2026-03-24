<template>
  <section
    ref="sectionRef"
    class="relative bg-bloom overflow-hidden min-h-screen flex flex-col justify-center py-24 px-6"
  >
    <div class="max-w-lg mx-auto w-full">
      <div
        class="gift-card relative bg-bloom-card border border-rose/15 rounded-xl p-8 shadow-sm will-change-transform"
      >
        <!-- Floral corner accents -->
        <div
          class="absolute top-4 left-4 w-6 h-6 border-t border-l border-sage/30"
        />
        <div
          class="absolute top-4 right-4 w-6 h-6 border-t border-r border-sage/30"
        />
        <div
          class="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-sage/30"
        />
        <div
          class="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-sage/30"
        />

        <p
          class="font-serif text-sm text-thorn text-center leading-relaxed mb-10"
          :class="{ 'font-khmer!': locale === 'kh' }"
        >
          {{ t("gift.message") }}
        </p>

        <div class="flex justify-center mb-10">
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <ClientOnly>
              <QrcodeVue
                :value="gift?.qr_value ?? ''"
                :size="180"
                level="H"
                render-as="svg"
                :foreground="'#3D2C2E'"
                :background="'#FFFFFF'"
              />
              <template #fallback>
                <div
                  class="w-45 h-45 bg-white flex items-center justify-center"
                >
                  <p class="text-thorn/30 text-xs">{{ t("ui.loading") }}</p>
                </div>
              </template>
            </ClientOnly>
          </div>
        </div>

        <div class="text-center space-y-2 mb-8">
          <p
            class="font-sans text-[10px] uppercase tracking-[0.3em] text-rose/60"
          >
            {{ gift?.bank_name }}
          </p>
          <p class="font-display text-lg text-bark">
            {{ gift?.account_name }}
          </p>
          <p class="font-sans text-sm text-thorn/60 tracking-wider">
            {{ gift?.account_number }}
          </p>
        </div>

        <div class="flex justify-center">
          <button
            @click="copyAccountNumber"
            class="inline-flex items-center gap-2 border border-rose/30 text-rose px-6 py-3 rounded-full font-sans text-xs uppercase tracking-[0.15em] hover:bg-rose/10 transition-all duration-300 cursor-pointer"
          >
            <svg
              v-if="!copied"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
            >
              <rect
                x="9"
                y="9"
                width="13"
                height="13"
                rx="2"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <path
                d="M5 15H4C2.9 15 2 14.1 2 13V4C2 2.9 2.9 2 4 2H13C14.1 2 15 2.9 15 4V5"
                stroke="currentColor"
                stroke-width="1.5"
              />
            </svg>
            <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ copied ? t("gift.copied") : t("gift.copyAccount") }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import QrcodeVue from "qrcode.vue";
const { wedding } = useWedding();
const gift = computed(() => wedding.value?.gifts?.[0]);
const { locale, t } = useI18n();

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
}
const sectionRef = ref<HTMLElement | null>(null);
const copied = ref(false);

async function copyAccountNumber() {
  const accountNumber = gift.value?.account_number ?? "";
  try {
    await navigator.clipboard.writeText(accountNumber);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = accountNumber;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  }
}

onMounted(() => {
  const el = sectionRef.value;
  if (!el) return;
  const q = gsap.utils.selector(el);
  gsap.fromTo(
    q(".gift-card"),
    { opacity: 0, y: 50, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      scrollTrigger: {
        trigger: q(".gift-card")[0],
        start: "top 90%",
        end: "top 50%",
        scrub: 0.5,
      },
    },
  );
});
</script>
