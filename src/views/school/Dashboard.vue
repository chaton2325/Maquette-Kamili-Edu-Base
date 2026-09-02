<script setup>
import { computed } from 'vue'
import { Users, GraduationCap, ClipboardList, HandCoins, ChevronRight } from 'lucide-vue-next'
import TopBar from '@/components/shell/TopBar.vue'
import StatCard from '@/components/ui/StatCard.vue'
import SectionCard from '@/components/ui/SectionCard.vue'
import Avatar from '@/components/ui/Avatar.vue'
import { useAuthStore } from '@/stores/auth'
import { useChildrenStore } from '@/stores/children'
import { useApeStore } from '@/stores/ape'
import { schoolById } from '@/data/schools'
import { formatCompactFcfa } from '@/utils/currency'
import { timeAgo } from '@/utils/date'

const auth = useAuthStore()
const childrenStore = useChildrenStore()
const apeStore = useApeStore()

const school = computed(() => schoolById(auth.profile?.schoolId))
const pending = computed(() => childrenStore.pendingBySchool(school.value?.id))
const enrolled = computed(() => childrenStore.bySchool(school.value?.id).filter((c) => c.statut === 'validé'))
const apeSummary = computed(() => apeStore.summaryForSchool(school.value?.id))
const recentValidated = computed(() =>
  childrenStore
    .bySchool(school.value?.id)
    .slice()
    .sort((a, b) => new Date(b.dateInscription) - new Date(a.dateInscription))
    .slice(0, 4)
)
</script>

<template>
  <div v-if="school">
    <TopBar :title="school.nom" />
    <div class="p-4 space-y-4">
      <div data-tour="summary-kpis" class="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <StatCard :icon="Users" label="Élèves inscrits" :value="enrolled.length" color="#0f766e" />
        <StatCard :icon="GraduationCap" label="Taux de réussite CEP" :value="`${school.tauxReussiteCEP ?? '—'}%`" color="#2563eb" />
        <StatCard :icon="ClipboardList" label="Inscriptions en attente" :value="pending.length" color="#d97706" />
        <StatCard :icon="HandCoins" label="Cotisations APE" :value="formatCompactFcfa(apeSummary?.montantCollecte)" :sub="`${apeSummary?.tauxParticipation}% des familles`" color="#7c3aed" />
      </div>

      <SectionCard v-if="pending.length" title="Inscriptions à traiter" action-label="Tout voir" @action="$router.push({ name: 'school-enrollments' })">
        <div class="divide-y divide-ink-100">
          <div v-for="c in pending.slice(0, 3)" :key="c.id" class="flex items-center gap-3 py-2">
            <Avatar :initials="c.initiales" :color="c.couleur" :size="36" />
            <div class="min-w-0 flex-1">
              <p class="text-[13.5px] font-semibold text-ink-800 truncate">{{ c.prenom }} {{ c.nom }}</p>
              <p class="text-[11.5px] text-ink-400">{{ c.classe }} · {{ timeAgo(c.dateInscription) }}</p>
            </div>
            <ChevronRight :size="16" class="text-ink-300" />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Établissement">
        <dl class="text-sm divide-y divide-ink-100">
          <div class="flex justify-between py-2"><dt class="text-ink-400">Type</dt><dd class="font-medium text-ink-700">{{ school.type }}</dd></div>
          <div class="flex justify-between py-2"><dt class="text-ink-400">Localisation</dt><dd class="font-medium text-ink-700">{{ school.quartier }}, {{ school.ville }}</dd></div>
          <div class="flex justify-between py-2"><dt class="text-ink-400">Directeur</dt><dd class="font-medium text-ink-700">{{ school.directeur }}</dd></div>
          <div class="flex justify-between py-2"><dt class="text-ink-400">Effectif total</dt><dd class="font-medium text-ink-700">{{ school.effectif }}</dd></div>
        </dl>
      </SectionCard>

      <SectionCard title="Dernières inscriptions">
        <div class="divide-y divide-ink-100">
          <div v-for="c in recentValidated" :key="c.id" class="flex items-center gap-3 py-2">
            <Avatar :initials="c.initiales" :color="c.couleur" :size="34" />
            <div class="min-w-0 flex-1">
              <p class="text-[13px] font-semibold text-ink-800 truncate">{{ c.prenom }} {{ c.nom }} · {{ c.classe }}</p>
            </div>
            <span class="text-[11px] text-ink-400 shrink-0">{{ timeAgo(c.dateInscription) }}</span>
          </div>
        </div>
      </SectionCard>
    </div>
  </div>
</template>
