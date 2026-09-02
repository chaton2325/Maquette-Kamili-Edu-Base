<script setup>
import { TrendingUp, TrendingDown } from 'lucide-vue-next'

defineProps({
  icon: { type: [Object, Function], default: null },
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  sub: { type: String, default: '' },
  trend: { type: Number, default: null },
  color: { type: String, default: '#0f766e' }
})
</script>

<template>
  <div class="card !p-3.5 flex flex-col gap-2 min-w-0">
    <div class="flex items-center justify-between">
      <div class="w-8 h-8 rounded-lg flex items-center justify-center" :style="{ background: `${color}1a` }">
        <component :is="icon" :size="17" :style="{ color }" />
      </div>
      <span v-if="trend !== null" class="flex items-center gap-0.5 text-xs font-semibold" :class="trend >= 0 ? 'text-emerald-600' : 'text-rose-600'">
        <component :is="trend >= 0 ? TrendingUp : TrendingDown" :size="13" />
        {{ Math.abs(trend) }}%
      </span>
    </div>
    <div class="min-w-0">
      <p class="text-lg font-extrabold text-ink-800 leading-tight truncate">{{ value }}</p>
      <p class="text-[11.5px] text-ink-400 font-medium truncate">{{ label }}</p>
      <p v-if="sub" class="text-[11px] text-ink-300 truncate">{{ sub }}</p>
    </div>
  </div>
</template>
