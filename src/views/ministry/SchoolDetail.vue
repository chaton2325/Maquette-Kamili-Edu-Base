<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Building2 } from 'lucide-vue-next'
import TopBar from '@/components/shell/TopBar.vue'
import SectionCard from '@/components/ui/SectionCard.vue'
import Badge from '@/components/ui/Badge.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { schoolById } from '@/data/schools'
import { regionById } from '@/data/regions'
import { useChildrenStore } from '@/stores/children'
import { useApeStore } from '@/stores/ape'
import { iconFor } from '@/utils/icons'
import { formatFcfa, formatCompactFcfa } from '@/utils/currency'

const route = useRoute()
const childrenStore = useChildrenStore()
const apeStore = useApeStore()

const school = computed(() => schoolById(route.params.id))
const region = computed(() => (school.value ? regionById(school.value.region) : null))
const enrolled = computed(() => childrenStore.bySchool(school.value?.id).filter((c) => c.statut === 'validé').length)
const pending = computed(() => childrenStore.pendingBySchool(school.value?.id).length)
const apeSummary = computed(() => apeStore.summaryForSchool(school.value?.id))
const projects = computed(() => apeStore.projectsBySchool(school.value?.id))
const projectStatusTone = { 'En cours': 'brand', Terminé: 'success', Planifié: 'neutral' }
</script>

<template>
  <div v-if="school">
    <TopBar :title="school.nom" back />
    <div class="p-4 space-y-4">
      <div class="rounded-2xl p-4 flex items-center gap-3" :style="{ background: `${school.couleur}14` }">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" :style="{ background: `${school.couleur}22` }">
          <component :is="iconFor(school.icon)" :size="22" :style="{ color: school.couleur }" />
        </div>
        <div class="min-w-0">
          <p class="font-bold text-ink-800 truncate">{{ school.nom }}</p>
          <p class="text-xs text-ink-400">{{ school.quartier }}, {{ school.ville }} · {{ region?.nom }}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2.5">
        <div class="card !p-3 text-center"><p class="text-lg font-extrabold text-ink-800">{{ enrolled }}</p><p class="text-[11px] text-ink-400">Élèves suivis</p></div>
        <div class="card !p-3 text-center"><p class="text-lg font-extrabold text-ink-800">{{ school.tauxReussiteCEP ?? '—' }}%</p><p class="text-[11px] text-ink-400">Réussite CEP</p></div>
        <div class="card !p-3 text-center"><p class="text-lg font-extrabold text-amber-600">{{ pending }}</p><p class="text-[11px] text-ink-400">Inscriptions en attente</p></div>
        <div class="card !p-3 text-center"><p class="text-lg font-extrabold text-ink-800">{{ school.note }}★</p><p class="text-[11px] text-ink-400">Satisfaction parents</p></div>
      </div>

      <SectionCard title="Établissement">
        <dl class="text-sm divide-y divide-ink-100">
          <div class="flex justify-between py-2"><dt class="text-ink-400">Type</dt><dd class="font-medium text-ink-700">{{ school.type }}</dd></div>
          <div class="flex justify-between py-2"><dt class="text-ink-400">Directeur</dt><dd class="font-medium text-ink-700">{{ school.directeur }}</dd></div>
          <div class="flex justify-between py-2"><dt class="text-ink-400">Téléphone</dt><dd class="font-medium text-ink-700">{{ school.telephone }}</dd></div>
          <div class="flex justify-between py-2"><dt class="text-ink-400">Effectif total</dt><dd class="font-medium text-ink-700">{{ school.effectif }}</dd></div>
        </dl>
      </SectionCard>

      <SectionCard v-if="apeSummary" title="Cotisations APE">
        <div class="flex justify-between text-sm mb-2">
          <span class="font-extrabold text-brand-700">{{ formatCompactFcfa(apeSummary.montantCollecte) }}</span>
          <span class="text-ink-400">sur {{ formatCompactFcfa(apeSummary.montantAttendu) }}</span>
        </div>
        <ProgressBar :value="apeSummary.tauxParticipation" color="#0f766e" />
        <p class="text-[11px] text-ink-400 mt-1">{{ apeSummary.tauxParticipation }}% de participation des familles</p>
      </SectionCard>

      <SectionCard title="Projets APE">
        <EmptyState v-if="!projects.length" :icon="Building2" title="Aucun projet" />
        <div v-else class="space-y-3">
          <div v-for="p in projects" :key="p.id">
            <div class="flex items-center justify-between text-sm mb-1">
              <span class="font-semibold text-ink-800">{{ p.titre }}</span>
              <Badge :tone="projectStatusTone[p.statut]">{{ p.statut }}</Badge>
            </div>
            <ProgressBar :value="(p.montantCollecte / p.budgetTotal) * 100" :color="p.couleur" :height="6" />
            <p class="text-[11px] text-ink-400 mt-1">{{ formatFcfa(p.montantCollecte) }} / {{ formatFcfa(p.budgetTotal) }}</p>
          </div>
        </div>
      </SectionCard>
    </div>
  </div>
</template>
