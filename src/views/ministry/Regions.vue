<script setup>
import { computed } from 'vue'
import TopBar from '@/components/shell/TopBar.vue'
import Badge from '@/components/ui/Badge.vue'
import { regions } from '@/data/regions'
import { regionStats } from '@/data/successRates'

const list = computed(() =>
  regions
    .map((r) => ({ ...r, ...regionStats[r.id] }))
    .sort((a, b) => b.tauxReussiteCEP - a.tauxReussiteCEP)
)

function toneFor(rate) {
  if (rate >= 80) return 'success'
  if (rate >= 65) return 'warning'
  return 'danger'
}
</script>

<template>
  <div>
    <TopBar title="Régions" />
    <div class="p-4 space-y-2.5">
      <p class="text-xs text-ink-400 px-1">Classées par taux de réussite au CEP (2026), du plus élevé au plus faible.</p>
      <RouterLink v-for="(r, i) in list" :key="r.id" :to="{ name: 'ministry-region-detail', params: { id: r.id } }" class="card !p-3.5 flex items-center gap-3 tap-scale">
        <span class="w-7 h-7 rounded-full bg-ink-100 flex items-center justify-center text-[11px] font-bold text-ink-500 shrink-0">{{ i + 1 }}</span>
        <div class="min-w-0 flex-1">
          <p class="text-[13.5px] font-bold text-ink-800 truncate">{{ r.nom }}</p>
          <p class="text-[11.5px] text-ink-400">{{ r.chefLieu }} · {{ r.nombreEcoles.toLocaleString('fr-FR') }} écoles</p>
        </div>
        <Badge :tone="toneFor(r.tauxReussiteCEP)">{{ r.tauxReussiteCEP }}%</Badge>
      </RouterLink>
    </div>
  </div>
</template>
