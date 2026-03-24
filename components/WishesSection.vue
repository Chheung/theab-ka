<template>
  <section class="py-10 px-6">
    <div class="space-y-4">
      <div
        v-for="c in comments"
        :key="c.id"
        class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5"
      >
        <div class="flex items-start gap-4">
          <div
            class="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-medium"
            :style="{
              background: c.avatar_bg || 'linear-gradient(135deg, #666, #444)',
            }"
          >
            {{ c.avatar_text }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-white/90 font-medium">{{ c.author }}</p>
            <p
              v-if="c.relationship_en"
              class="text-[10px] uppercase tracking-wider text-white/30 mb-2"
            >
              {{ c.relationship_en }}
            </p>
            <p class="text-sm text-white/60 italic leading-relaxed">
              "{{ c.message_en }}"
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ comments: any[] }>();
</script>
