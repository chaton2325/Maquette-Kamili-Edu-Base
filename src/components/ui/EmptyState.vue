<script setup>
defineProps({
  icon: { type: [Object, Function], default: null },
  title: { type: String, required: true },
  text: { type: String, default: '' }
})
</script>

<template>
  <div class="flex flex-col items-center text-center gap-2 py-8 px-4">
    <div class="w-12 h-12 rounded-full bg-ink-100 flex items-center justify-center text-ink-400">
      <component :is="icon" :size="22" />
    </div>
    <p class="font-semibold text-ink-700 text-sm">{{ title }}</p>
    <p v-if="text" class="text-xs text-ink-400 max-w-[220px]">{{ text }}</p>
    <slot />
  </div>
</template>
