<script setup>
import { computed } from 'vue'
import { TriangleAlert, ShieldCheck } from 'lucide-vue-next'
import TopBar from '@/components/shell/TopBar.vue'
import Badge from '@/components/ui/Badge.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { useApeStore } from '@/stores/ape'
import { useChildrenStore } from '@/stores/children'
import { schoolById } from '@/data/schools'
import { regionStats } from '@/data/successRates'
import { regions } from '@/data/regions'

const apeStore = useApeStore()
const childrenStore = useChildrenStore()

const lowApeSchools = computed(() =>
  Object.entries(apeStore.summaries)
    .filter(([, s]) => s.tauxParticipation < 55)
    .map(([id, s]) => ({ id, ...s, nom: schoolById(id)?.nom }))
)

const lowSchoolingRegions = computed(() =>
  regions
    .map((r) => ({ ...r, ...regionStats[r.id] }))
    .filter((r) => r.tauxScolarisation < 70)
)

const rejected = computed(() => childrenStore.list.filter((c) => c.statut === 'rejeté'))

const alerts = computed(() => [
  ...lowApeSchools.value.map((s) => ({
    id: `ape-${s.id}`,
    titre: `Faible participation APE — ${s.nom}`,
    detail: `Seulement ${s.tauxParticipation}% des familles à jour de cotisation.`,
    niveau: 'warning'
  })),
  ...lowSchoolingRegions.value.map((r) => ({
    id: `sco-${r.id}`,
    titre: `Taux de scolarisation faible — ${r.nom}`,
    detail: `${r.tauxScolarisation}% seulement, en dessous du seuil national de 70%.`,
    niveau: 'danger'
  })),
  ...rejected.value.map((c) => ({
    id: `rej-${c.id}`,
    titre: `Dossier rejeté — ${c.prenom} ${c.nom}`,
    detail: c.motifRejet,
    niveau: 'neutral'
  }))
])

const iconTone = { warning: 'text-amber-600 bg-amber-50', danger: 'text-rose-600 bg-rose-50', neutral: 'text-ink-500 bg-ink-100' }
const badgeTone = { warning: 'warning', danger: 'danger', neutral: 'neutral' }
</script>

<template>
  <div>
    <TopBar title="Alertes" back />
    <div class="p-4 space-y-3">
      <EmptyState v-if="!alerts.length" :icon="ShieldCheck" title="Aucune alerte" text="Tout est sous contrôle." />
      <div v-for="a in alerts" :key="a.id" class="card !p-3.5 flex gap-3">
        <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" :class="iconTone[a.niveau]">
          <TriangleAlert :size="17" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-[13.5px] font-bold text-ink-800">{{ a.titre }}</p>
          <p class="text-[12.5px] text-ink-500 mt-0.5">{{ a.detail }}</p>
        </div>
        <Badge :tone="badgeTone[a.niveau]">Alerte</Badge>
      </div>
    </div>
  </div>
</template>
