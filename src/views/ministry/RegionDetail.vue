<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { School } from 'lucide-vue-next'
import TopBar from '@/components/shell/TopBar.vue'
import SectionCard from '@/components/ui/SectionCard.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import BarChart from '@/components/ui/charts/BarChart.vue'
import { regionById } from '@/data/regions'
import { regionStat, nationalSummary } from '@/data/successRates'
import { schoolsByRegion } from '@/data/schools'
import { iconFor } from '@/utils/icons'

const route = useRoute()
const region = computed(() => regionById(route.params.id))
const stat = computed(() => regionStat(route.params.id))
const localSchools = computed(() => schoolsByRegion(route.params.id))
</script>

<template>
  <div v-if="region">
    <TopBar :title="region.nom" back />
    <div class="p-4 space-y-4">
      <SectionCard title="Comparaison au national">
        <BarChart
          :labels="['Réussite CEP', 'Scolarisation', 'Parité']"
          :values="[stat.tauxReussiteCEP, stat.tauxScolarisation, stat.tauxParite]"
          color="#0f766e"
          suffix="%"
          :height="160"
        />
        <p class="text-[11px] text-ink-400 text-center mt-1">National : {{ nationalSummary.tauxReussiteCEP }}% de réussite CEP</p>
      </SectionCard>

      <SectionCard title="Chiffres clés">
        <dl class="text-sm divide-y divide-ink-100">
          <div class="flex justify-between py-2"><dt class="text-ink-400">Chef-lieu</dt><dd class="font-medium text-ink-700">{{ region.chefLieu }}</dd></div>
          <div class="flex justify-between py-2"><dt class="text-ink-400">Établissements</dt><dd class="font-medium text-ink-700">{{ stat.nombreEcoles.toLocaleString('fr-FR') }}</dd></div>
          <div class="flex justify-between py-2"><dt class="text-ink-400">Élèves</dt><dd class="font-medium text-ink-700">{{ stat.effectifEleves.toLocaleString('fr-FR') }}</dd></div>
          <div class="flex justify-between py-2"><dt class="text-ink-400">Évolution réussite</dt><dd class="font-medium text-emerald-600">+{{ stat.evolution }} pt</dd></div>
        </dl>
      </SectionCard>

      <SectionCard :title="`Établissements suivis (${localSchools.length})`">
        <EmptyState v-if="!localSchools.length" :icon="School" title="Aucun établissement suivi dans cet échantillon" />
        <div v-else class="divide-y divide-ink-100">
          <RouterLink v-for="s in localSchools" :key="s.id" :to="{ name: 'ministry-school-detail', params: { id: s.id } }" class="flex items-center gap-3 py-2.5 tap-scale">
            <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" :style="{ background: `${s.couleur}1a` }">
              <component :is="iconFor(s.icon)" :size="16" :style="{ color: s.couleur }" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-[13px] font-semibold text-ink-800 truncate">{{ s.nom }}</p>
              <p class="text-[11px] text-ink-400">{{ s.ville }}</p>
            </div>
          </RouterLink>
        </div>
      </SectionCard>
    </div>
  </div>
</template>
