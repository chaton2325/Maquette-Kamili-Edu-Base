<script setup>
import { computed } from 'vue'
import { UserPlus, Wallet, GraduationCap, HandCoins, ChevronRight, Bell } from 'lucide-vue-next'
import TopBar from '@/components/shell/TopBar.vue'
import SectionCard from '@/components/ui/SectionCard.vue'
import Avatar from '@/components/ui/Avatar.vue'
import Badge from '@/components/ui/Badge.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { useAuthStore } from '@/stores/auth'
import { useChildrenStore } from '@/stores/children'
import { useFeesStore } from '@/stores/fees'
import { useAnnouncementsStore } from '@/stores/announcements'
import { schoolById } from '@/data/schools'
import { nationalTrend } from '@/data/successRates'
import { formatFcfa } from '@/utils/currency'
import { formatDate, timeAgo } from '@/utils/date'

const auth = useAuthStore()
const childrenStore = useChildrenStore()
const feesStore = useFeesStore()
const announcementsStore = useAnnouncementsStore()

const firstName = computed(() => auth.profile?.nom.split(' ')[0] || 'Parent')
const myChildren = computed(() => childrenStore.byParent(auth.profile?.id))
const mySchoolIds = computed(() => [...new Set(myChildren.value.map((c) => c.schoolId))])
const nextDue = computed(() => feesStore.nextDueForChildren(myChildren.value.map((c) => c.id)))
const totalDue = computed(() => feesStore.dueForChildren(myChildren.value.map((c) => c.id)))
const announcements = computed(() => announcementsStore.forParent(mySchoolIds.value).slice(0, 3))
const nationalRate = nationalTrend[nationalTrend.length - 1].tauxReussiteCEP

const statusTone = { validé: 'success', en_attente: 'warning', rejeté: 'danger' }
const statusLabel = { validé: 'Validé', en_attente: 'En attente', rejeté: 'Rejeté' }

const quickActions = [
  { label: 'Inscrire un enfant', icon: UserPlus, to: { name: 'parent-enroll' }, color: '#0f766e' },
  { label: 'Payer la scolarité', icon: Wallet, to: { name: 'parent-tuition' }, color: '#2563eb' },
  { label: 'Voir les notes', icon: GraduationCap, to: myChildren.value[0] ? { name: 'parent-child-detail', params: { id: myChildren.value[0].id }, query: { tab: 'notes' } } : { name: 'parent-children' }, color: '#7c3aed' },
  { label: 'Cotisation APE', icon: HandCoins, to: { name: 'parent-ape' }, color: '#d97706' }
]
</script>

<template>
  <div>
    <TopBar :title="`Bonjour, ${firstName}`" />
    <div class="p-4 space-y-4 pb-6">
      <div class="flex items-center gap-3">
        <Avatar :initials="auth.profile?.initiales" :color="auth.profile?.couleur" :size="46" />
        <div class="min-w-0 flex-1">
          <p class="font-bold text-ink-800 text-[15px] truncate">{{ auth.profile?.nom }}</p>
          <p class="text-xs text-ink-400">{{ formatDate(new Date().toISOString()) }}</p>
        </div>
        <RouterLink :to="{ name: 'parent-announcements' }" class="relative p-2 rounded-full active:bg-ink-100 tap-scale" aria-label="Annonces">
          <Bell :size="20" class="text-ink-500" />
          <span v-if="announcements.length" class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-flag-red"></span>
        </RouterLink>
      </div>

      <div v-if="totalDue > 0" class="card !bg-brand-600 !text-white flex items-center justify-between gap-3">
        <div class="min-w-0">
          <p class="text-xs font-semibold text-brand-100">Prochaine échéance</p>
          <p class="font-extrabold text-lg truncate">{{ formatFcfa(totalDue) }}</p>
          <p class="text-[11px] text-brand-100" v-if="nextDue">avant le {{ formatDate(nextDue.dateLimite) }}</p>
        </div>
        <RouterLink :to="{ name: 'parent-tuition' }" class="bg-white text-brand-700 text-xs font-bold rounded-lg px-3 py-2 shrink-0 tap-scale">Payer</RouterLink>
      </div>

      <div class="grid grid-cols-4 gap-2">
        <RouterLink v-for="a in quickActions" :key="a.label" :to="a.to" class="flex flex-col items-center gap-1.5 tap-scale">
          <div class="w-12 h-12 rounded-2xl flex items-center justify-center" :style="{ background: `${a.color}1a` }">
            <component :is="a.icon" :size="20" :style="{ color: a.color }" />
          </div>
          <span class="text-[10px] font-semibold text-ink-600 text-center leading-tight">{{ a.label }}</span>
        </RouterLink>
      </div>

      <SectionCard title="Mes enfants" data-tour="summary-children">
        <EmptyState v-if="!myChildren.length" :icon="UserPlus" title="Aucun enfant inscrit" text="Commencez par inscrire votre premier enfant.">
          <RouterLink :to="{ name: 'parent-enroll' }" class="btn-primary text-xs mt-2">Inscrire un enfant</RouterLink>
        </EmptyState>
        <div v-else class="divide-y divide-ink-100">
          <RouterLink
            v-for="child in myChildren"
            :key="child.id"
            :to="{ name: 'parent-child-detail', params: { id: child.id } }"
            class="flex items-center gap-3 py-2.5 tap-scale"
          >
            <Avatar :initials="child.initiales" :color="child.couleur" :size="38" />
            <div class="min-w-0 flex-1">
              <p class="text-[14px] font-semibold text-ink-800 truncate">{{ child.prenom }} {{ child.nom }}</p>
              <p class="text-[12px] text-ink-400 truncate">{{ child.classe }} · {{ schoolById(child.schoolId)?.nom }}</p>
            </div>
            <Badge :tone="statusTone[child.statut]">{{ statusLabel[child.statut] }}</Badge>
            <ChevronRight :size="18" class="text-ink-300 shrink-0" />
          </RouterLink>
        </div>
      </SectionCard>

      <SectionCard title="Réussite scolaire">
        <div class="flex items-center justify-between text-sm">
          <div>
            <p class="text-ink-400 text-xs">Moyenne nationale CEP 2026</p>
            <p class="font-extrabold text-2xl text-brand-600">{{ nationalRate }}%</p>
          </div>
          <RouterLink :to="{ name: 'parent-more' }" class="text-xs font-semibold text-brand-600 flex items-center gap-0.5">
            Détails <ChevronRight :size="14" />
          </RouterLink>
        </div>
      </SectionCard>

      <SectionCard title="Annonces" action-label="Tout voir" @action="$router.push({ name: 'parent-announcements' })">
        <EmptyState v-if="!announcements.length" :icon="Bell" title="Aucune annonce pour le moment" />
        <div v-else class="space-y-3">
          <div v-for="a in announcements" :key="a.id">
            <p class="text-[13.5px] font-semibold text-ink-800">{{ a.titre }}</p>
            <p class="text-[12px] text-ink-400">{{ a.auteur }} · {{ timeAgo(a.date) }}</p>
          </div>
        </div>
      </SectionCard>
    </div>
  </div>
</template>
