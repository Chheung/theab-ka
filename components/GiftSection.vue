<template>
  <section class="py-10 px-6">
    <div v-for="gift in gifts" :key="gift.id" class="mb-6 last:mb-0">
      <!-- QR -->
      <div class="flex justify-center mb-6">
        <div class="bg-white p-3 rounded-lg">
          <ClientOnly>
            <QrcodeVue
              :value="gift.qr_value ?? ''"
              :size="160"
              level="H"
              render-as="svg"
              foreground="#1a1a1a"
              background="#ffffff"
            />
            <template #fallback>
              <div class="w-40 h-40 bg-white" />
            </template>
          </ClientOnly>
        </div>
      </div>

      <!-- Bank info -->
      <div class="text-center space-y-1.5 mb-5">
        <p class="text-[10px] uppercase tracking-widest text-white/40">
          {{ gift.bank_name }}
        </p>
        <p class="text-base text-white/90 font-medium">
          {{ gift.account_name }}
        </p>
        <p class="text-sm text-white/50 tracking-wider font-mono">
          {{ gift.account_number }}
        </p>
      </div>

      <!-- Copy -->
      <div class="flex justify-center">
        <button
          @click="copy(gift.account_number)"
          class="inline-flex items-center gap-2 border border-white/20 text-white/60 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider hover:bg-white/5 transition-colors cursor-pointer"
        >
          {{
            copied === gift.account_number
              ? t("gift.copied")
              : t("gift.copyAccount")
          }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import QrcodeVue from "qrcode.vue";

defineProps<{ gifts: any[] }>();
const { t } = useI18n();
const copied = ref("");

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
  copied.value = text;
  setTimeout(() => (copied.value = ""), 2000);
}
</script>
