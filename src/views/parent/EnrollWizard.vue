<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search, CircleCheck, PartyPopper } from 'lucide-vue-next'
import TopBar from '@/components/shell/TopBar.vue'
import Stepper from '@/components/ui/Stepper.vue'
import Badge from '@/components/ui/Badge.vue'
import PaymentSheet from '@/components/ui/PaymentSheet.vue'
import { useAuthStore } from '@/stores/auth'
import { useChildrenStore } from '@/stores/children'
import { useFeesStore } from '@/stores/fees'
import { schools } from '@/data/schools'
import { regions } from '@/data/regions'
import { formatFcfa } from '@/utils/currency'

const router = useRouter()
const auth = useAuthStore()
const childrenStore = useChildrenStore()
const feesStore = useFeesStore()

const steps = ['Enfant', 'Établissement', 'Classe', 'Documents', 'Récapitulatif']
const step = ref(0)
const done = ref(false)
const createdChild = ref(null)

const form = ref({
  prenom: '',
  nom: '',
  sexe: 'M',
  dateNaissance: '',
  schoolId: '',
  niveau: '',
  classe: '',
  documents: [
    { nom: 'Acte de naissance', statut: 'manquant' },
    { nom: 'Certificat médical', statut: 'manquant' },
    { nom: "2 photos d'identité", statut: 'manquant' }
  ]
})

const regionFilter = ref('')
const searchText = ref('')
const filteredSchools = computed(() =>
  schools.filter((s) => {
    const matchRegion = !regionFilter.value || s.region === regionFilter.value
    const matchSearch = !searchText.value || s.nom.toLowerCase().includes(searchText.value.toLowerCase()) || s.ville.toLowerCase().includes(searchText.value.toLowerCase())
    return matchRegion && matchSearch
  })
)
const selectedSchool = computed(() => schools.find((s) => s.id === form.value.schoolId))

const canNext = computed(() => {
  if (step.value === 0) return form.value.prenom && form.value.nom && form.value.dateNaissance
  if (step.value === 1) return !!form.value.schoolId
  if (step.value === 2) return !!form.value.classe
  if (step.value === 3) return form.value.documents.every((d) => d.statut === 'fourni')
  return true
})

function toggleDoc(doc) {
  doc.statut = doc.statut === 'fourni' ? 'manquant' : 'fourni'
}

function pickClasse(classe) {
  form.value.classe = classe
  form.value.niveau = classe.includes('Section') ? 'Maternelle' : 'Primaire'
}

const showPayment = ref(false)

function finalize(methode) {
  createdChild.value = childrenStore.registerChild({
    prenom: form.value.prenom,
    nom: form.value.nom,
    sexe: form.value.sexe,
    dateNaissance: form.value.dateNaissance,
    parentId: auth.profile?.id,
    parentNomAffiche: auth.profile?.nom,
    parentTelephoneAffiche: auth.profile?.telephone,
    schoolId: form.value.schoolId,
    niveau: form.value.niveau,
    classe: form.value.classe,
    documents: form.value.documents
  })
  feesStore.ensureChild(createdChild.value.id)
  done.value = true
}
</script>

<template>
  <div>
    <TopBar title="Inscrire un enfant" back />

    <div v-if="!done" class="p-4 space-y-4">
      <Stepper :steps="steps" :current="step" />

      <!-- Étape 1 : Enfant -->
      <div v-if="step === 0" class="space-y-3">
        <div>
          <label class="field-label">Prénom</label>
          <input v-model="form.prenom" class="field-input" placeholder="Ex : Junior" />
        </div>
        <div>
          <label class="field-label">Nom</label>
          <input v-model="form.nom" class="field-input" placeholder="Ex : Ngo Bella" />
        </div>
        <div>
          <label class="field-label">Sexe</label>
          <div class="grid grid-cols-2 gap-2">
            <button class="rounded-xl border-2 py-2.5 text-sm font-bold" :class="form.sexe === 'M' ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-ink-150 text-ink-500'" @click="form.sexe = 'M'">Garçon</button>
            <button class="rounded-xl border-2 py-2.5 text-sm font-bold" :class="form.sexe === 'F' ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-ink-150 text-ink-500'" @click="form.sexe = 'F'">Fille</button>
          </div>
        </div>
        <div>
          <label class="field-label">Date de naissance</label>
          <input v-model="form.dateNaissance" type="date" class="field-input" />
        </div>
      </div>

      <!-- Étape 2 : Établissement -->
      <div v-else-if="step === 1" class="space-y-3">
        <div class="relative">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
          <input v-model="searchText" class="field-input pl-9" placeholder="Rechercher une école, une ville..." />
        </div>
        <div class="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <button class="chip shrink-0" :class="!regionFilter ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-600'" @click="regionFilter = ''">Toutes régions</button>
          <button v-for="r in regions" :key="r.id" class="chip shrink-0" :class="regionFilter === r.id ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-600'" @click="regionFilter = r.id">{{ r.nom }}</button>
        </div>
        <div class="space-y-2 max-h-[420px] overflow-y-auto no-scrollbar">
          <button
            v-for="s in filteredSchools"
            :key="s.id"
            class="w-full text-left card !p-3 flex items-center gap-3"
            :class="form.schoolId === s.id && 'ring-2 ring-brand-500'"
            @click="form.schoolId = s.id"
          >
            <div class="min-w-0 flex-1">
              <p class="text-[13.5px] font-bold text-ink-800 truncate">{{ s.nom }}</p>
              <p class="text-[11.5px] text-ink-400">{{ s.ville }} · {{ s.type }}</p>
            </div>
            <Badge tone="brand">{{ s.note }}★</Badge>
          </button>
          <p v-if="!filteredSchools.length" class="text-center text-sm text-ink-400 py-6">Aucun établissement trouvé.</p>
        </div>
      </div>

      <!-- Étape 3 : Classe -->
      <div v-else-if="step === 2" class="space-y-3">
        <div class="card">
          <p class="text-[13.5px] font-bold text-ink-800">{{ selectedSchool?.nom }}</p>
          <p class="text-[11.5px] text-ink-400">{{ selectedSchool?.ville }}</p>
        </div>
        <p class="field-label">Choisir la classe / le niveau</p>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="c in selectedSchool?.classes"
            :key="c"
            class="rounded-xl border-2 py-2.5 text-sm font-bold"
            :class="form.classe === c ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-ink-150 text-ink-500'"
            @click="pickClasse(c)"
          >
            {{ c }}
          </button>
        </div>
      </div>

      <!-- Étape 4 : Documents -->
      <div v-else-if="step === 3" class="space-y-2">
        <p class="text-sm text-ink-500 mb-1">Simulez l'ajout des documents requis pour le dossier.</p>
        <button
          v-for="doc in form.documents"
          :key="doc.nom"
          class="w-full flex items-center justify-between card !p-3.5"
          @click="toggleDoc(doc)"
        >
          <span class="text-sm font-medium text-ink-700">{{ doc.nom }}</span>
          <Badge :tone="doc.statut === 'fourni' ? 'success' : 'neutral'">{{ doc.statut === 'fourni' ? 'Fourni' : 'Ajouter' }}</Badge>
        </button>
      </div>

      <!-- Étape 5 : Récapitulatif -->
      <div v-else class="space-y-3">
        <div class="card space-y-2 text-sm">
          <div class="flex justify-between"><span class="text-ink-400">Enfant</span><span class="font-semibold text-ink-800">{{ form.prenom }} {{ form.nom }}</span></div>
          <div class="flex justify-between"><span class="text-ink-400">Établissement</span><span class="font-semibold text-ink-800 text-right">{{ selectedSchool?.nom }}</span></div>
          <div class="flex justify-between"><span class="text-ink-400">Classe</span><span class="font-semibold text-ink-800">{{ form.classe }}</span></div>
          <div class="flex justify-between pt-2 border-t border-ink-100"><span class="text-ink-400">Frais de dossier</span><span class="font-extrabold text-brand-600">{{ formatFcfa(selectedSchool?.frais.inscription) }}</span></div>
        </div>
        <button class="btn-primary w-full" @click="showPayment = true">Payer et soumettre le dossier</button>
      </div>

      <div class="flex gap-2 pt-2">
        <button v-if="step > 0" class="btn-secondary flex-1" @click="step--">Précédent</button>
        <button v-if="step < steps.length - 1" class="btn-primary flex-1" :disabled="!canNext" @click="step++">Suivant</button>
      </div>
    </div>

    <div v-else class="p-6 flex flex-col items-center text-center gap-3 pt-16">
      <PartyPopper :size="48" class="text-brand-600" />
      <h2 class="font-extrabold text-lg text-ink-800">Dossier soumis !</h2>
      <p class="text-sm text-ink-500 max-w-[260px]">
        L'inscription de {{ createdChild?.prenom }} est en attente de validation par {{ selectedSchool?.nom }}. Vous serez notifié dès qu'elle sera traitée.
      </p>
      <Badge tone="warning">En attente de validation</Badge>
      <RouterLink :to="{ name: 'parent-children' }" class="btn-primary w-full mt-4">Voir mes enfants</RouterLink>
    </div>

    <PaymentSheet
      v-model="showPayment"
      :label="`Frais de dossier — ${selectedSchool?.nom}`"
      :amount="selectedSchool?.frais.inscription || 0"
      @paid="finalize"
    />
  </div>
</template>
