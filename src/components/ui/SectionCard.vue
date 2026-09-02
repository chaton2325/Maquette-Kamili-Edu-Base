<script setup>
defineProps({
  title: { type: String, default: '' },
  actionLabel: { type: String, default: '' }
})
defineEmits(['action'])
</script>

<template>
  <section class="card">
    <div v-if="title" class="flex items-center justify-between mb-3">
      <h2 class="text-[15px] font-bold text-ink-800">{{ title }}</h2>
      <button v-if="actionLabel" class="text-xs font-semibold text-brand-600" @click="$emit('action')">{{ actionLabel }}</button>
      <slot v-else name="header-extra" />
    </div>
    <slot />
  </section>
</template>
