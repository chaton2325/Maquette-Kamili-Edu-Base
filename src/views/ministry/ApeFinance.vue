<script setup>
import { computed } from 'vue'
import { Building2 } from 'lucide-vue-next'
import TopBar from '@/components/shell/TopBar.vue'
import SectionCard from '@/components/ui/SectionCard.vue'
import Badge from '@/components/ui/Badge.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import DoughnutChart from '@/components/ui/charts/DoughnutChart.vue'
import { useApeStore } from '@/stores/ape'
import { schoolById } from '@/data/schools'
import { iconFor } from '@/utils/icons'
import { formatCompactFcfa } from '@/utils/currency'

const apeStore = useApeStore()

const totalCollecte = computed(() => Object.values(apeStore.summaries).reduce((s, x) => s + x.montantCollecte, 0))
const totalAttendu = computed(() => Object.values(apeStore.summaries).reduce((s, x) => s + x.montantAttendu, 0))

const topSchools = computed(() =>
  Object.entries(apeStore.summaries)
    .sort((a, b) => b[1].montantCollecte - a[1].montantCollecte)
    .slice(0, 5)
    .map(([id, s]) => ({ id, ...s, nom: schoolById(id)?.nom }))
)

const statusCounts = computed(() => {
  const counts = { Planifié: 0, 'En cours': 0, Terminé: 0 }
  apeStore.projects.forEach((p) => (counts[p.statut] = (counts[p.statut] || 0) + 1))
  return counts
})
const projectStatusTone = { 'En cours': 'brand', Terminé: 'success', Planifié: 'neutral' }
</script>

<template>
  <div>
    <TopBar title="Finances APE" />
    <div class="p-4 space-y-4">
      <div class="card !bg-brand-600 !text-white">
        <p class="text-xs font-semibold text-brand-100">Total collecté (échantillon national)</p>
        <p class="text-2xl font-extrabold">{{ formatCompactFcfa(totalCollecte) }}</p>
        <p class="text-[11px] text-brand-100 mt-1">sur {{ formatCompactFcfa(totalAttendu) }} attendus</p>
      </div>

      <SectionCard title="Projets par statut">
        <DoughnutChart :labels="Object.keys(statusCounts)" :values="Object.values(statusCounts)" :colors="['#94a3b8', '#1aab9d', '#10b981']" :height="160" />
      </SectionCard>

      <SectionCard title="Écoles — plus fort taux de collecte">
        <div class="divide-y divide-ink-100">
          <RouterLink v-for="s in topSchools" :key="s.id" :to="{ name: 'ministry-school-detail', params: { id: s.id } }" class="py-2.5 block tap-scale">
            <div class="flex justify-between text-sm mb-1">
              <span class="font-semibold text-ink-800 truncate">{{ s.nom }}</span>
              <span class="font-bold text-brand-600 shrink-0">{{ formatCompactFcfa(s.montantCollecte) }}</span>
            </div>
            <ProgressBar :value="s.tauxParticipation" :height="5" />
          </RouterLink>
        </div>
      </SectionCard>

      <SectionCard title="Tous les projets APE suivis">
        <div class="space-y-3">
          <div v-for="p in apeStore.projects" :key="p.id" class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" :style="{ background: `${p.couleur}1a` }">
              <component :is="iconFor(p.icon)" :size="16" :style="{ color: p.couleur }" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-[13px] font-semibold text-ink-800 truncate">{{ p.titre }}</p>
              <p class="text-[11px] text-ink-400 truncate">{{ schoolById(p.schoolId)?.nom }}</p>
            </div>
            <Badge :tone="projectStatusTone[p.statut]">{{ p.statut }}</Badge>
          </div>
        </div>
      </SectionCard>
    </div>
  </div>
</template>
