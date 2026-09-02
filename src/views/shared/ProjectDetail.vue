<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Calendar, Target } from 'lucide-vue-next'
import TopBar from '@/components/shell/TopBar.vue'
import SectionCard from '@/components/ui/SectionCard.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import Badge from '@/components/ui/Badge.vue'
import { useApeStore } from '@/stores/ape'
import { useAuthStore } from '@/stores/auth'
import { schoolById } from '@/data/schools'
import { iconFor } from '@/utils/icons'
import { formatFcfa } from '@/utils/currency'
import { formatDate } from '@/utils/date'

const route = useRoute()
const apeStore = useApeStore()
const auth = useAuthStore()

const project = computed(() => apeStore.projectById(route.params.id))
const school = computed(() => (project.value ? schoolById(project.value.schoolId) : null))
const progress = computed(() => (project.value ? (project.value.montantCollecte / project.value.budgetTotal) * 100 : 0))
const statusTone = { 'En cours': 'brand', Terminé: 'success', Planifié: 'neutral' }

const canManage = computed(() => auth.currentRole === 'ecole' && project.value?.schoolId === auth.profile?.schoolId)

const form = ref({ montant: '', texte: '', statut: '' })
function submitUpdate() {
  apeStore.addProjectUpdate(project.value.id, {
    montant: Number(form.value.montant) || 0,
    texte: form.value.texte || 'Mise à jour du projet.',
    statut: form.value.statut || undefined
  })
  form.value = { montant: '', texte: '', statut: '' }
}
</script>

<template>
  <div v-if="project">
    <TopBar :title="project.titre" back />
    <div class="p-4 space-y-4">
      <div class="rounded-2xl p-5 flex flex-col items-center text-center gap-2" :style="{ background: `${project.couleur}14` }">
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center" :style="{ background: `${project.couleur}22` }">
          <component :is="iconFor(project.icon)" :size="26" :style="{ color: project.couleur }" />
        </div>
        <p class="font-bold text-ink-800">{{ school?.nom }}</p>
        <Badge :tone="statusTone[project.statut]">{{ project.statut }}</Badge>
      </div>

      <SectionCard title="Financement">
        <p class="text-sm text-ink-500 mb-2">{{ project.description }}</p>
        <ProgressBar :value="progress" :color="project.couleur" :height="10" />
        <div class="flex justify-between mt-2 text-sm">
          <span class="font-extrabold text-ink-800">{{ formatFcfa(project.montantCollecte) }}</span>
          <span class="text-ink-400">sur {{ formatFcfa(project.budgetTotal) }}</span>
        </div>
        <div class="flex items-center gap-4 mt-3 pt-3 border-t border-ink-100 text-xs text-ink-500">
          <span class="flex items-center gap-1"><Calendar :size="14" /> Début {{ formatDate(project.dateDebut) }}</span>
          <span class="flex items-center gap-1"><Target :size="14" /> Prévu {{ formatDate(project.dateFinPrevue) }}</span>
        </div>
      </SectionCard>

      <SectionCard title="Suivi du chantier">
        <div v-if="!project.journal.length" class="text-sm text-ink-400">Aucune mise à jour publiée pour l'instant.</div>
        <ol v-else class="space-y-3">
          <li v-for="(j, i) in project.journal" :key="i" class="flex gap-3">
            <div class="flex flex-col items-center pt-1">
              <span class="w-2 h-2 rounded-full bg-brand-500"></span>
              <span v-if="i < project.journal.length - 1" class="w-px flex-1 bg-ink-150"></span>
            </div>
            <div class="pb-1">
              <p class="text-[13px] text-ink-700">{{ j.texte }}</p>
              <p class="text-[11px] text-ink-400">{{ formatDate(j.date) }}</p>
            </div>
          </li>
        </ol>
      </SectionCard>

      <SectionCard v-if="canManage" title="Mettre à jour le projet (bureau APE)">
        <div class="space-y-2">
          <input v-model="form.montant" type="number" class="field-input" placeholder="Montant collecté supplémentaire (FCFA)" />
          <input v-model="form.texte" class="field-input" placeholder="Note de mise à jour" />
          <select v-model="form.statut" class="field-input">
            <option value="">Statut inchangé</option>
            <option>Planifié</option>
            <option>En cours</option>
            <option>Terminé</option>
          </select>
          <button class="btn-primary w-full text-sm" @click="submitUpdate">Publier la mise à jour</button>
        </div>
      </SectionCard>
    </div>
  </div>
</template>
