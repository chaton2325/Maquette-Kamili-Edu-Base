<script setup>
import { Bell, UserCircle, CircleHelp, Repeat, GraduationCap, CalendarDays } from 'lucide-vue-next'
import TopBar from '@/components/shell/TopBar.vue'
import ListRow from '@/components/ui/ListRow.vue'
import { useAuthStore } from '@/stores/auth'
import { useChildrenStore } from '@/stores/children'
import { useTourStore } from '@/stores/tour'

const auth = useAuthStore()
const childrenStore = useChildrenStore()
const tourStore = useTourStore()
const firstChild = childrenStore.byParent(auth.profile?.id)[0]

function startTour() {
  tourStore.start('parent')
}
</script>

<template>
  <div>
    <TopBar title="Plus" :help="false" />
    <div class="p-4 space-y-2">
      <div class="card divide-y divide-ink-100">
        <ListRow :to="{ name: 'parent-announcements' }" title="Annonces" subtitle="École et Ministère">
          <template #left><div class="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center"><Bell :size="17" class="text-brand-600" /></div></template>
        </ListRow>
        <ListRow
          v-if="firstChild"
          :to="{ name: 'parent-child-detail', params: { id: firstChild.id }, query: { tab: 'notes' } }"
          title="Notes & bulletins"
          subtitle="Résultats de vos enfants"
        >
          <template #left><div class="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center"><GraduationCap :size="17" class="text-violet-600" /></div></template>
        </ListRow>
        <ListRow
          v-if="firstChild"
          :to="{ name: 'parent-child-detail', params: { id: firstChild.id }, query: { tab: 'emploi' } }"
          title="Emploi du temps"
          subtitle="Programme hebdomadaire"
        >
          <template #left><div class="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center"><CalendarDays :size="17" class="text-amber-600" /></div></template>
        </ListRow>
        <ListRow :to="{ name: 'parent-profile' }" title="Mon profil" subtitle="Informations personnelles">
          <template #left><div class="w-9 h-9 rounded-lg bg-sky-50 flex items-center justify-center"><UserCircle :size="17" class="text-sky-600" /></div></template>
        </ListRow>
      </div>

      <div class="card divide-y divide-ink-100">
        <button class="w-full" @click="startTour">
          <ListRow title="Visite guidée" subtitle="Redécouvrir l'application" :chevron="false">
            <template #left><div class="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center"><CircleHelp :size="17" class="text-emerald-600" /></div></template>
          </ListRow>
        </button>
        <ListRow to="/demo" title="Changer de compte" subtitle="Parent / Établissement / Ministère">
          <template #left><div class="w-9 h-9 rounded-lg bg-ink-100 flex items-center justify-center"><Repeat :size="17" class="text-ink-500" /></div></template>
        </ListRow>
      </div>
    </div>
  </div>
</template>
