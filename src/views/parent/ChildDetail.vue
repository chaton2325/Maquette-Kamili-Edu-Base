<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { FileWarning, CalendarDays } from 'lucide-vue-next'
import TopBar from '@/components/shell/TopBar.vue'
import Avatar from '@/components/ui/Avatar.vue'
import Badge from '@/components/ui/Badge.vue'
import SectionCard from '@/components/ui/SectionCard.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import PaymentSheet from '@/components/ui/PaymentSheet.vue'
import TimetableGrid from '@/components/ui/TimetableGrid.vue'
import { useChildrenStore } from '@/stores/children'
import { useFeesStore } from '@/stores/fees'
import { schoolById } from '@/data/schools'
import { bulletinByChild } from '@/data/grades'
import { timetableFor } from '@/data/timetables'
import { formatFcfa } from '@/utils/currency'
import { formatDate } from '@/utils/date'

const route = useRoute()
const childrenStore = useChildrenStore()
const feesStore = useFeesStore()

const child = computed(() => childrenStore.byId(route.params.id))
const school = computed(() => (child.value ? schoolById(child.value.schoolId) : null))

const tabs = [
  { key: 'profil', label: 'Profil' },
  { key: 'notes', label: 'Notes' },
  { key: 'emploi', label: 'Emploi' },
  { key: 'paiements', label: 'Paiements' }
]
const activeTab = ref(route.query.tab || 'profil')

const statusTone = { validé: 'success', en_attente: 'warning', rejeté: 'danger' }
const statusLabel = { validé: 'Validé', en_attente: 'En attente', rejeté: 'Rejeté' }

// Notes
const bulletin = computed(() => (child.value ? bulletinByChild(child.value.id) : null))
const selectedYear = ref(null)
const currentYearData = computed(() => {
  if (!bulletin.value) return null
  if (selectedYear.value) return bulletin.value.annees.find((a) => a.anneeScolaire === selectedYear.value)
  return bulletin.value.annees.slice().reverse().find((a) => a.trimestres.length) || bulletin.value.annees[0]
})

// Emploi du temps
const timetable = computed(() => (child.value ? timetableFor(child.value.schoolId, child.value.classe) : null))

// Paiements
const fees = computed(() => (child.value ? feesStore.forChild(child.value.id) : []))
const payingFee = ref(null)
const feeStatusTone = { payé: 'success', en_attente: 'warning', à_venir: 'neutral' }
const feeStatusLabel = { payé: 'Payé', en_attente: 'À payer', à_venir: 'À venir' }

function onPaid(methode) {
  if (payingFee.value) feesStore.payFee(child.value.id, payingFee.value.id, methode)
  payingFee.value = null
}
</script>

<template>
  <div v-if="child">
    <TopBar :title="`${child.prenom} ${child.nom}`" back />
    <div class="p-4 space-y-4">
      <div class="flex items-center gap-3">
        <Avatar :initials="child.initiales" :color="child.couleur" :size="52" />
        <div class="min-w-0 flex-1">
          <p class="font-bold text-ink-800">{{ child.prenom }} {{ child.nom }}</p>
          <p class="text-xs text-ink-400">{{ child.classe }} · {{ school?.nom }}</p>
        </div>
        <Badge :tone="statusTone[child.statut]">{{ statusLabel[child.statut] }}</Badge>
      </div>

      <div data-tour="child-tabs" class="flex bg-ink-100 rounded-xl p-1 gap-1">
        <button
          v-for="t in tabs"
          :key="t.key"
          class="flex-1 text-xs font-bold py-2 rounded-lg transition"
          :class="activeTab === t.key ? 'bg-white text-brand-700 shadow-card' : 'text-ink-500'"
          @click="activeTab = t.key"
        >
          {{ t.label }}
        </button>
      </div>

      <!-- Profil -->
      <template v-if="activeTab === 'profil'">
        <SectionCard title="Informations">
          <dl class="text-sm divide-y divide-ink-100">
            <div class="flex justify-between py-2"><dt class="text-ink-400">Sexe</dt><dd class="font-medium text-ink-700">{{ child.sexe === 'M' ? 'Masculin' : 'Féminin' }}</dd></div>
            <div class="flex justify-between py-2"><dt class="text-ink-400">Date de naissance</dt><dd class="font-medium text-ink-700">{{ formatDate(child.dateNaissance) }}</dd></div>
            <div class="flex justify-between py-2"><dt class="text-ink-400">Établissement</dt><dd class="font-medium text-ink-700 text-right">{{ school?.nom }}</dd></div>
            <div class="flex justify-between py-2"><dt class="text-ink-400">Classe</dt><dd class="font-medium text-ink-700">{{ child.classe }}</dd></div>
            <div class="flex justify-between py-2"><dt class="text-ink-400">Année scolaire</dt><dd class="font-medium text-ink-700">{{ child.anneeScolaire }}</dd></div>
            <div class="flex justify-between py-2"><dt class="text-ink-400">Date d'inscription</dt><dd class="font-medium text-ink-700">{{ formatDate(child.dateInscription) }}</dd></div>
          </dl>
        </SectionCard>

        <SectionCard v-if="child.motifRejet" title="Motif de rejet">
          <div class="flex items-start gap-2 text-rose-700 bg-rose-50 rounded-xl p-3 text-sm">
            <FileWarning :size="18" class="shrink-0 mt-0.5" />
            <p>{{ child.motifRejet }}</p>
          </div>
        </SectionCard>

        <SectionCard title="Documents">
          <div class="space-y-2">
            <div v-for="doc in child.documents" :key="doc.nom" class="flex items-center justify-between text-sm">
              <span class="text-ink-600">{{ doc.nom }}</span>
              <Badge :tone="doc.statut === 'fourni' ? 'success' : 'warning'">{{ doc.statut }}</Badge>
            </div>
          </div>
        </SectionCard>
      </template>

      <!-- Notes -->
      <template v-else-if="activeTab === 'notes'">
        <EmptyState v-if="!bulletin" :icon="FileWarning" title="Notes indisponibles" text="Les notes seront disponibles après validation de l'inscription." />
        <template v-else>
          <div class="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              v-for="a in bulletin.annees"
              :key="a.anneeScolaire"
              class="chip shrink-0"
              :class="(currentYearData?.anneeScolaire === a.anneeScolaire) ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-600'"
              @click="selectedYear = a.anneeScolaire"
            >
              {{ a.anneeScolaire }}
            </button>
          </div>

          <EmptyState v-if="!currentYearData?.trimestres.length" :icon="CalendarDays" title="Pas encore de notes" text="Les évaluations du 1er trimestre débutent en octobre." />
          <template v-else>
            <SectionCard :title="`Résultat annuel — ${currentYearData.classe}`">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-2xl font-extrabold text-brand-600">{{ currentYearData.resultatAnnuel.moyenneGenerale }}/20</p>
                  <p class="text-xs text-ink-400">Rang {{ currentYearData.resultatAnnuel.rang }}/{{ currentYearData.effectifClasse }} · {{ currentYearData.resultatAnnuel.mention }}</p>
                </div>
                <Badge tone="success">{{ currentYearData.resultatAnnuel.decision }}</Badge>
              </div>
            </SectionCard>

            <SectionCard v-for="t in currentYearData.trimestres" :key="t.numero" :title="`Trimestre ${t.numero}`">
              <div class="flex items-center justify-between mb-2 text-sm">
                <span class="font-bold text-ink-800">{{ t.moyenneGenerale }}/20</span>
                <Badge tone="brand">Rang {{ t.rang }}/{{ currentYearData.effectifClasse }} · {{ t.mention }}</Badge>
              </div>
              <div class="space-y-1.5">
                <div v-for="m in t.matieres" :key="m.nom" class="flex items-center justify-between text-[13px]">
                  <span class="text-ink-500">{{ m.nom }}</span>
                  <span class="font-semibold text-ink-800">{{ m.note }}/{{ m.bareme }}</span>
                </div>
              </div>
              <p class="text-xs text-ink-400 italic mt-2 pt-2 border-t border-ink-100">{{ t.appreciation }}</p>
            </SectionCard>
          </template>
        </template>
      </template>

      <!-- Emploi du temps -->
      <template v-else-if="activeTab === 'emploi'">
        <EmptyState v-if="!timetable" :icon="CalendarDays" title="Emploi du temps indisponible" text="Il n'a pas encore été publié pour cette classe." />
        <TimetableGrid v-else :timetable="timetable" />
      </template>

      <!-- Paiements -->
      <template v-else>
        <SectionCard title="Échéancier">
          <EmptyState v-if="!fees.length" :icon="FileWarning" title="Aucune échéance" />
          <div v-else class="divide-y divide-ink-100">
            <div v-for="f in fees" :key="f.id" class="py-2.5 flex items-center justify-between gap-2">
              <div class="min-w-0">
                <p class="text-[13.5px] font-semibold text-ink-800 truncate">{{ f.label }}</p>
                <p class="text-[11.5px] text-ink-400">
                  {{ f.statut === 'payé' ? `Payé le ${formatDate(f.datePaiement)}` : `Échéance : ${formatDate(f.dateLimite)}` }}
                </p>
              </div>
              <div class="text-right shrink-0">
                <p class="font-bold text-ink-800 text-sm">{{ formatFcfa(f.montant) }}</p>
                <button v-if="f.statut === 'en_attente'" class="text-[11px] font-bold text-brand-600" @click="payingFee = f">Payer</button>
                <Badge v-else :tone="feeStatusTone[f.statut]">{{ feeStatusLabel[f.statut] }}</Badge>
              </div>
            </div>
          </div>
        </SectionCard>
      </template>
    </div>

    <PaymentSheet
      :model-value="!!payingFee"
      :label="payingFee?.label || ''"
      :amount="payingFee?.montant || 0"
      @update:model-value="(v) => !v && (payingFee = null)"
      @paid="onPaid"
    />
  </div>
</template>
