<script setup>
import { computed } from 'vue'
import { Users, School, GraduationCap, Scale, ChevronRight } from 'lucide-vue-next'
import TopBar from '@/components/shell/TopBar.vue'
import StatCard from '@/components/ui/StatCard.vue'
import SectionCard from '@/components/ui/SectionCard.vue'
import Avatar from '@/components/ui/Avatar.vue'
import LineChart from '@/components/ui/charts/LineChart.vue'
import { useChildrenStore } from '@/stores/children'
import { useApeStore } from '@/stores/ape'
import { nationalSummary, nationalTrend, regionStats } from '@/data/successRates'
import { regions } from '@/data/regions'
import { schoolById } from '@/data/schools'
import { formatCompactFcfa } from '@/utils/currency'
import { timeAgo } from '@/utils/date'

const childrenStore = useChildrenStore()
const apeStore = useApeStore()

const recent = computed(() => childrenStore.recentRegistrations.slice(0, 4))
const totalCollecte = computed(() => Object.values(apeStore.summaries).reduce((s, x) => s + x.montantCollecte, 0))

const topRegions = computed(() =>
  Object.entries(regionStats)
    .sort((a, b) => b[1].tauxReussiteCEP - a[1].tauxReussiteCEP)
    .slice(0, 3)
    .map(([id, stat]) => ({ id, ...stat, nom: regions.find((r) => r.id === id)?.nom }))
)

const statusLabel = { validé: 'Validé', en_attente: 'En attente', rejeté: 'Rejeté' }
</script>

<template>
  <div>
    <TopBar title="MINEDUB — Vue nationale" />
    <div class="p-4 space-y-4">
      <div data-tour="summary-kpis" class="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <StatCard :icon="Users" label="Élèves inscrits" :value="`${(nationalSummary.totalEleves / 1000000).toFixed(2)} M`" color="#0f766e" :trend="nationalSummary.evolutionReussite" />
        <StatCard :icon="School" label="Établissements" :value="nationalSummary.totalEtablissements.toLocaleString('fr-FR')" color="#2563eb" />
        <StatCard :icon="GraduationCap" label="Réussite CEP" :value="`${nationalSummary.tauxReussiteCEP}%`" color="#7c3aed" :trend="nationalSummary.evolutionReussite" />
        <StatCard :icon="Scale" label="Parité filles/garçons" :value="`${nationalSummary.tauxParite}%`" color="#d97706" />
      </div>

      <SectionCard title="Taux de réussite au CEP — tendance nationale">
        <LineChart :labels="nationalTrend.map((t) => t.annee)" :values="nationalTrend.map((t) => t.tauxReussiteCEP)" color="#0f766e" suffix="%" :height="160" />
      </SectionCard>

      <SectionCard title="Régions les plus performantes" action-label="Voir tout" @action="$router.push({ name: 'ministry-regions' })">
        <div class="divide-y divide-ink-100">
          <RouterLink v-for="r in topRegions" :key="r.id" :to="{ name: 'ministry-region-detail', params: { id: r.id } }" class="flex items-center justify-between py-2.5 tap-scale">
            <div>
              <p class="text-[13.5px] font-semibold text-ink-800">{{ r.nom }}</p>
              <p class="text-[11.5px] text-ink-400">{{ r.nombreEcoles.toLocaleString('fr-FR') }} écoles</p>
            </div>
            <span class="font-extrabold text-brand-600">{{ r.tauxReussiteCEP }}%</span>
          </RouterLink>
        </div>
      </SectionCard>

      <SectionCard title="Transparence financière APE" action-label="Détails" @action="$router.push({ name: 'ministry-ape-finance' })">
        <p class="text-2xl font-extrabold text-ink-800">{{ formatCompactFcfa(totalCollecte) }}</p>
        <p class="text-xs text-ink-400">collectés par les APE (échantillon suivi)</p>
      </SectionCard>

      <SectionCard title="Inscriptions récentes" action-label="Flux complet" @action="$router.push({ name: 'ministry-live' })">
        <div class="divide-y divide-ink-100">
          <div v-for="c in recent" :key="c.id" class="flex items-center gap-3 py-2">
            <Avatar :initials="c.initiales" :color="c.couleur" :size="34" />
            <div class="min-w-0 flex-1">
              <p class="text-[13px] font-semibold text-ink-800 truncate">{{ c.prenom }} {{ c.nom }}</p>
              <p class="text-[11px] text-ink-400 truncate">{{ schoolById(c.schoolId)?.nom }}</p>
            </div>
            <span class="text-[11px] text-ink-400 shrink-0">{{ timeAgo(c.dateInscription) }}</span>
          </div>
        </div>
      </SectionCard>
    </div>
  </div>
</template>
