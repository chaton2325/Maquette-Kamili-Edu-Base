<script setup>
import { ref, computed } from 'vue'
import { HandCoins, Building2 } from 'lucide-vue-next'
import TopBar from '@/components/shell/TopBar.vue'
import SectionCard from '@/components/ui/SectionCard.vue'
import Badge from '@/components/ui/Badge.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import PaymentSheet from '@/components/ui/PaymentSheet.vue'
import { useAuthStore } from '@/stores/auth'
import { useChildrenStore } from '@/stores/children'
import { useApeStore } from '@/stores/ape'
import { schoolById } from '@/data/schools'
import { iconFor } from '@/utils/icons'
import { formatFcfa, formatCompactFcfa } from '@/utils/currency'

const auth = useAuthStore()
const childrenStore = useChildrenStore()
const apeStore = useApeStore()

const tab = ref('cotisations')
const myChildren = computed(() => childrenStore.byParent(auth.profile?.id))
const mySchoolIds = computed(() => [...new Set(myChildren.value.map((c) => c.schoolId))])
const myContributions = computed(() => mySchoolIds.value.map((id) => apeStore.contributionFor(auth.profile?.id, id)).filter(Boolean))
const myProjects = computed(() => mySchoolIds.value.flatMap((id) => apeStore.projectsBySchool(id)))

const contribStatusTone = { payé: 'success', en_attente: 'warning', à_venir: 'neutral' }
const contribStatusLabel = { payé: 'Payée', en_attente: 'À payer', à_venir: 'Bientôt disponible' }
const projectStatusTone = { 'En cours': 'brand', Terminé: 'success', Planifié: 'neutral' }

const paying = ref(null)
function onPaid(methode) {
  if (paying.value) apeStore.payContribution(auth.profile?.id, paying.value.schoolId, methode)
  paying.value = null
}
</script>

<template>
  <div>
    <TopBar title="APE" />
    <div class="p-4 space-y-4">
      <div data-tour="ape-tabs" class="flex bg-ink-100 rounded-xl p-1 gap-1">
        <button class="flex-1 text-xs font-bold py-2 rounded-lg" :class="tab === 'cotisations' ? 'bg-white text-brand-700 shadow-card' : 'text-ink-500'" @click="tab = 'cotisations'">Cotisations</button>
        <button class="flex-1 text-xs font-bold py-2 rounded-lg" :class="tab === 'projets' ? 'bg-white text-brand-700 shadow-card' : 'text-ink-500'" @click="tab = 'projets'">Projets</button>
      </div>

      <template v-if="tab === 'cotisations'">
        <p class="text-xs text-ink-400 px-1">L'APE (Association des Parents d'Élèves) finance des projets pour améliorer l'école de vos enfants.</p>
        <EmptyState v-if="!myContributions.length" :icon="HandCoins" title="Aucune cotisation" />
        <SectionCard v-for="c in myContributions" :key="c.schoolId" :title="schoolById(c.schoolId)?.nom">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-lg font-extrabold text-ink-800">{{ formatFcfa(c.montant) }}</p>
              <p class="text-xs text-ink-400">Année {{ c.anneeScolaire }}</p>
            </div>
            <Badge :tone="contribStatusTone[c.statut]">{{ contribStatusLabel[c.statut] }}</Badge>
          </div>
          <button v-if="c.statut === 'en_attente'" class="btn-primary w-full mt-3 text-sm" @click="paying = c">Payer ma cotisation</button>
          <p v-else-if="c.note" class="text-xs text-ink-400 mt-2">{{ c.note }}</p>
          <div v-if="c.historique.length" class="mt-3 pt-3 border-t border-ink-100 space-y-1.5">
            <p class="text-[11px] font-bold text-ink-400 uppercase tracking-wide">Historique</p>
            <div v-for="h in c.historique" :key="h.anneeScolaire" class="flex justify-between text-[12.5px]">
              <span class="text-ink-500">{{ h.anneeScolaire }} · {{ h.methode }}</span>
              <span class="font-semibold text-ink-700">{{ formatFcfa(h.montant) }}</span>
            </div>
          </div>
        </SectionCard>
      </template>

      <template v-else>
        <EmptyState v-if="!myProjects.length" :icon="Building2" title="Aucun projet pour l'instant" />
        <RouterLink
          v-for="p in myProjects"
          :key="p.id"
          :to="{ name: 'parent-project-detail', params: { id: p.id } }"
          class="card !p-3.5 flex items-center gap-3 tap-scale"
        >
          <div class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" :style="{ background: `${p.couleur}1a` }">
            <component :is="iconFor(p.icon)" :size="20" :style="{ color: p.couleur }" />
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2">
              <p class="text-[13.5px] font-bold text-ink-800 truncate">{{ p.titre }}</p>
            </div>
            <p class="text-[11px] text-ink-400 mb-1.5">{{ schoolById(p.schoolId)?.nom }}</p>
            <ProgressBar :value="(p.montantCollecte / p.budgetTotal) * 100" :color="p.couleur" :height="6" />
            <p class="text-[11px] text-ink-400 mt-1">{{ formatCompactFcfa(p.montantCollecte) }} / {{ formatCompactFcfa(p.budgetTotal) }}</p>
          </div>
          <Badge :tone="projectStatusTone[p.statut]">{{ p.statut }}</Badge>
        </RouterLink>
      </template>
    </div>

    <PaymentSheet
      :model-value="!!paying"
      :label="paying ? `Cotisation APE — ${schoolById(paying.schoolId)?.nom}` : ''"
      :amount="paying?.montant || 0"
      @update:model-value="(v) => !v && (paying = null)"
      @paid="onPaid"
    />
  </div>
</template>
