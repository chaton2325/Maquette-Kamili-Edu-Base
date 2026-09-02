<script setup>
const props = defineProps({
  value: { type: Number, required: true }, // 0-100
  color: { type: String, default: '#0f766e' },
  height: { type: Number, default: 8 },
  track: { type: String, default: '#eceef1' }
})
</script>

<template>
  <div class="w-full rounded-full overflow-hidden" :style="{ height: `${height}px`, background: track }">
    <div
      class="h-full rounded-full transition-all duration-500"
      :style="{ width: `${Math.min(100, Math.max(0, value))}%`, background: color }"
    />
  </div>
</template>
