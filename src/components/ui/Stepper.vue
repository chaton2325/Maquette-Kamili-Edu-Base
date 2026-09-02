<script setup>
import { Check } from 'lucide-vue-next'

defineProps({
  steps: { type: Array, required: true }, // string[]
  current: { type: Number, required: true } // 0-based
})
</script>

<template>
  <div class="flex items-center">
    <template v-for="(step, i) in steps" :key="step">
      <div v-if="i !== 0" class="h-0.5 flex-1" :style="{ backgroundColor: i <= current ? '#1aab9d' : '#e2e5e8' }"></div>
      <div
        class="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
        :class="i < current ? 'bg-brand-600 text-white' : i === current ? 'bg-brand-600 text-white ring-4 ring-brand-100' : 'bg-ink-100 text-ink-400'"
      >
        <Check v-if="i < current" :size="13" />
        <span v-else>{{ i + 1 }}</span>
      </div>
    </template>
  </div>
</template>
