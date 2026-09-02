<script setup>
import { ChevronRight } from 'lucide-vue-next'

defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  chevron: { type: Boolean, default: true }
})
</script>

<template>
  <component
    :is="$attrs.to ? 'RouterLink' : 'div'"
    v-bind="$attrs"
    class="flex items-center gap-3 py-2.5 tap-scale"
  >
    <slot name="left" />
    <div class="min-w-0 flex-1">
      <p class="text-[14px] font-semibold text-ink-800 truncate">{{ title }}</p>
      <p v-if="subtitle" class="text-[12px] text-ink-400 truncate">{{ subtitle }}</p>
    </div>
    <slot name="right" />
    <ChevronRight v-if="chevron" :size="18" class="text-ink-300 shrink-0" />
  </component>
</template>
