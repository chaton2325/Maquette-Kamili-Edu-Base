<script setup>
import { useRoute } from 'vue-router'

defineProps({
  items: { type: Array, required: true } // [{ label, icon, to: {name}, section, tour }]
})

const route = useRoute()
</script>

<template>
  <nav class="md:hidden sticky bottom-0 z-30 bg-white/97 backdrop-blur-sm border-t border-ink-100 pb-[env(safe-area-inset-bottom)]">
    <div class="h-16 grid" :style="{ gridTemplateColumns: `repeat(${items.length}, minmax(0,1fr))` }">
      <RouterLink
        v-for="item in items"
        :key="item.section"
        :to="item.to"
        :data-tour="item.tour"
        class="flex flex-col items-center justify-center gap-0.5 tap-scale"
        :class="route.meta.section === item.section ? 'text-brand-600' : 'text-ink-400'"
      >
        <component :is="item.icon" :size="22" :stroke-width="route.meta.section === item.section ? 2.4 : 2" />
        <span class="text-[10.5px] font-semibold leading-none">{{ item.label }}</span>
      </RouterLink>
    </div>
  </nav>
</template>
