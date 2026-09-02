<script setup>
import { ref, computed } from 'vue'
import { Users, CalendarDays, Trophy } from 'lucide-vue-next'
import TopBar from '@/components/shell/TopBar.vue'
import Avatar from '@/components/ui/Avatar.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import TimetableGrid from '@/components/ui/TimetableGrid.vue'
import { useAuthStore } from '@/stores/auth'
import { useChildrenStore } from '@/stores/children'
import { schoolById } from '@/data/schools'
import { rosterByClass } from '@/data/grades'
import { timetableFor as getTimetable } from '@/data/timetables'

const auth = useAuthStore()
const childrenStore = useChildrenStore()

const school = computed(() => schoolById(auth.profile?.schoolId))
const selectedClasse = ref(school.value?.classes[0] || '')
const subTab = ref('eleves')

const roster = computed(() => childrenStore.byClass(school.value?.id, selectedClasse.value).filter((c) => c.statut === 'validé'))
const timetable = computed(() => getTimetable(school.value?.id, selectedClasse.value))
const results = computed(() => rosterByClass(school.value?.id, selectedClasse.value))

function studentFor(childId) {
  return childrenStore.byId(childId)
}
</script>

<template>
  <div v-if="school">
    <TopBar title="Classes" />
    <div class="p-4 space-y-3">
      <div class="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        <button v-for="c in school.classes" :key="c" class="chip shrink-0" :class="selectedClasse === c ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-600'" @click="selectedClasse = c">
          {{ c }}
        </button>
      </div>

      <div class="flex bg-ink-100 rounded-xl p-1 gap-1">
        <button class="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold py-2 rounded-lg" :class="subTab === 'eleves' ? 'bg-white text-brand-700 shadow-card' : 'text-ink-500'" @click="subTab = 'eleves'">
          <Users :size="14" /> Élèves
        </button>
        <button class="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold py-2 rounded-lg" :class="subTab === 'emploi' ? 'bg-white text-brand-700 shadow-card' : 'text-ink-500'" @click="subTab = 'emploi'">
          <CalendarDays :size="14" /> Emploi
        </button>
        <button class="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold py-2 rounded-lg" :class="subTab === 'resultats' ? 'bg-white text-brand-700 shadow-card' : 'text-ink-500'" @click="subTab = 'resultats'">
          <Trophy :size="14" /> Résultats
        </button>
      </div>

      <template v-if="subTab === 'eleves'">
        <EmptyState v-if="!roster.length" :icon="Users" title="Aucun élève dans cette classe" />
        <div v-else class="card divide-y divide-ink-100">
          <div v-for="c in roster" :key="c.id" class="flex items-center gap-3 py-2.5">
            <Avatar :initials="c.initiales" :color="c.couleur" :size="38" />
            <div class="min-w-0 flex-1">
              <p class="text-[13.5px] font-semibold text-ink-800 truncate">{{ c.prenom }} {{ c.nom }}</p>
              <p class="text-[11.5px] text-ink-400 truncate">Parent : {{ c.parentNomAffiche }} · {{ c.parentTelephoneAffiche }}</p>
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="subTab === 'emploi'">
        <EmptyState v-if="!timetable" :icon="CalendarDays" title="Emploi du temps non publié" text="Aucun emploi du temps enregistré pour cette classe." />
        <TimetableGrid v-else :timetable="timetable" />
      </template>

      <template v-else>
        <EmptyState v-if="!results.length" :icon="Trophy" title="Aucun résultat enregistré" text="Résultats de fin d'année 2025-2026 non disponibles pour cette classe." />
        <div v-else class="card divide-y divide-ink-100">
          <p class="text-[11px] font-bold text-ink-400 uppercase tracking-wide pb-2">Classement — fin d'année 2025-2026</p>
          <div v-for="r in results" :key="r.childId" class="flex items-center justify-between py-2">
            <span class="text-[13.5px] font-semibold text-ink-800">#{{ r.rangClasse }} — {{ studentFor(r.childId)?.prenom }} {{ studentFor(r.childId)?.nom }}</span>
            <span class="font-bold text-brand-600">{{ r.moyenne }}/20</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
