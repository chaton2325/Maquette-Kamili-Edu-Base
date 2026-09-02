<script setup>
import { ref, computed } from 'vue'
import { HandCoins, Building2, Plus } from 'lucide-vue-next'
import TopBar from '@/components/shell/TopBar.vue'
import SectionCard from '@/components/ui/SectionCard.vue'
import Badge from '@/components/ui/Badge.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Modal from '@/components/ui/Modal.vue'
import DoughnutChart from '@/components/ui/charts/DoughnutChart.vue'
import { useAuthStore } from '@/stores/auth'
import { useApeStore } from '@/stores/ape'
import { iconFor } from '@/utils/icons'
import { formatFcfa, formatCompactFcfa } from '@/utils/currency'

const auth = useAuthStore()
const apeStore = useApeStore()

const tab = ref('cotisations')
const schoolId = computed(() => auth.profile?.schoolId)
const summary = computed(() => apeStore.summaryForSchool(schoolId.value))
const projects = computed(() => apeStore.projectsBySchool(schoolId.value))
const projectStatusTone = { 'En cours': 'brand', Terminé: 'success', Planifié: 'neutral' }

const paidFamilies = computed(() => Math.round((summary.value?.tauxParticipation / 100) * summary.value?.nombreFamilles))

const showCreate = ref(false)
const form = ref({ titre: '', description: '', budgetTotal: '', icon: 'building-2', couleur: '#0f766e' })
function createProject() {
  apeStore.createProject(schoolId.value, { ...form.value, budgetTotal: Number(form.value.budgetTotal) || 0 })
  showCreate.value = false
  form.value = { titre: '', description: '', budgetTotal: '', icon: 'building-2', couleur: '#0f766e' }
}
</script>

<template>
  <div>
    <TopBar title="APE" />
    <div class="p-4 space-y-4">
      <div class="flex bg-ink-100 rounded-xl p-1 gap-1">
        <button class="flex-1 text-xs font-bold py-2 rounded-lg" :class="tab === 'cotisations' ? 'bg-white text-brand-700 shadow-card' : 'text-ink-500'" @click="tab = 'cotisations'">Cotisations</button>
        <button class="flex-1 text-xs font-bold py-2 rounded-lg" :class="tab === 'projets' ? 'bg-white text-brand-700 shadow-card' : 'text-ink-500'" @click="tab = 'projets'">Projets</button>
      </div>

      <template v-if="tab === 'cotisations' && summary">
        <SectionCard title="Cotisations de l'année">
          <DoughnutChart :labels="['Familles à jour', 'Familles en attente']" :values="[paidFamilies, summary.nombreFamilles - paidFamilies]" :colors="['#0f766e', '#fcd11655']" :height="160" />
          <div class="grid grid-cols-2 gap-2 mt-2 text-center">
            <div class="bg-brand-50 rounded-xl py-2">
              <p class="font-extrabold text-brand-700">{{ formatCompactFcfa(summary.montantCollecte) }}</p>
              <p class="text-[10.5px] text-ink-400">Collectés</p>
            </div>
            <div class="bg-ink-50 rounded-xl py-2">
              <p class="font-extrabold text-ink-700">{{ formatCompactFcfa(summary.montantAttendu) }}</p>
              <p class="text-[10.5px] text-ink-400">Attendus</p>
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Détails">
          <dl class="text-sm divide-y divide-ink-100">
            <div class="flex justify-between py-2"><dt class="text-ink-400">Cotisation par famille</dt><dd class="font-medium text-ink-700">{{ formatFcfa(summary.cotisation) }}</dd></div>
            <div class="flex justify-between py-2"><dt class="text-ink-400">Familles inscrites</dt><dd class="font-medium text-ink-700">{{ summary.nombreFamilles }}</dd></div>
            <div class="flex justify-between py-2"><dt class="text-ink-400">Taux de participation</dt><dd class="font-medium text-ink-700">{{ summary.tauxParticipation }}%</dd></div>
          </dl>
        </SectionCard>
      </template>

      <template v-else-if="tab === 'projets'">
        <button class="btn-primary w-full flex items-center justify-center gap-2 text-sm" @click="showCreate = true">
          <Plus :size="16" /> Nouveau projet
        </button>
        <EmptyState v-if="!projects.length" :icon="Building2" title="Aucun projet" />
        <RouterLink
          v-for="p in projects"
          :key="p.id"
          :to="{ name: 'school-project-detail', params: { id: p.id } }"
          class="card !p-3.5 flex items-center gap-3 tap-scale"
        >
          <div class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" :style="{ background: `${p.couleur}1a` }">
            <component :is="iconFor(p.icon)" :size="20" :style="{ color: p.couleur }" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[13.5px] font-bold text-ink-800 truncate">{{ p.titre }}</p>
            <ProgressBar :value="(p.montantCollecte / p.budgetTotal) * 100" :color="p.couleur" :height="6" />
            <p class="text-[11px] text-ink-400 mt-1">{{ formatCompactFcfa(p.montantCollecte) }} / {{ formatCompactFcfa(p.budgetTotal) }}</p>
          </div>
          <Badge :tone="projectStatusTone[p.statut]">{{ p.statut }}</Badge>
        </RouterLink>
      </template>
    </div>

    <Modal v-model="showCreate" title="Nouveau projet APE">
      <div class="space-y-2.5">
        <input v-model="form.titre" class="field-input" placeholder="Titre du projet" />
        <textarea v-model="form.description" class="field-input" rows="2" placeholder="Description"></textarea>
        <input v-model="form.budgetTotal" type="number" class="field-input" placeholder="Budget total (FCFA)" />
        <button class="btn-primary w-full text-sm" :disabled="!form.titre || !form.budgetTotal" @click="createProject">Créer le projet</button>
      </div>
    </Modal>
  </div>
</template>
