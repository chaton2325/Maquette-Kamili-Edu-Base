<script setup>
const props = defineProps({
  tone: { type: String, default: 'neutral' } // success | warning | danger | info | neutral | brand
})

const tones = {
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-rose-50 text-rose-700',
  info: 'bg-sky-50 text-sky-700',
  brand: 'bg-brand-50 text-brand-700',
  neutral: 'bg-ink-100 text-ink-600'
}
</script>

<template>
  <span class="chip" :class="tones[props.tone] || tones.neutral">
    <slot />
  </span>
</template>
