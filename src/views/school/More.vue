<script setup>
import { Bell, UserCircle, CircleHelp, Repeat } from 'lucide-vue-next'
import TopBar from '@/components/shell/TopBar.vue'
import ListRow from '@/components/ui/ListRow.vue'
import { useTourStore } from '@/stores/tour'

const tourStore = useTourStore()
function startTour() {
  tourStore.start('ecole')
}
</script>

<template>
  <div>
    <TopBar title="Plus" :help="false" />
    <div class="p-4 space-y-2">
      <div class="card divide-y divide-ink-100">
        <ListRow :to="{ name: 'school-announcements' }" title="Annonces" subtitle="Publier une communication">
          <template #left><div class="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center"><Bell :size="17" class="text-brand-600" /></div></template>
        </ListRow>
        <ListRow :to="{ name: 'school-profile' }" title="Profil de l'établissement" subtitle="Informations générales">
          <template #left><div class="w-9 h-9 rounded-lg bg-sky-50 flex items-center justify-center"><UserCircle :size="17" class="text-sky-600" /></div></template>
        </ListRow>
      </div>
      <div class="card divide-y divide-ink-100">
        <button class="w-full" @click="startTour">
          <ListRow title="Visite guidée" subtitle="Redécouvrir l'espace établissement" :chevron="false">
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
