<script setup>
defineProps({
  initials: { type: String, default: '?' },
  color: { type: String, default: '#0f766e' },
  size: { type: Number, default: 40 }
})
</script>

<template>
  <div
    class="rounded-full flex items-center justify-center font-bold text-white shrink-0"
    :style="{ width: `${size}px`, height: `${size}px`, background: color, fontSize: `${Math.max(11, size * 0.36)}px` }"
  >
    {{ initials }}
  </div>
</template>
