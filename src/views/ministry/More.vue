<script setup>
import { Radio, TriangleAlert, UserCircle, CircleHelp, Repeat } from 'lucide-vue-next'
import TopBar from '@/components/shell/TopBar.vue'
import ListRow from '@/components/ui/ListRow.vue'
import { useTourStore } from '@/stores/tour'

const tourStore = useTourStore()
function startTour() {
  tourStore.start('ministere')
}
</script>

<template>
  <div>
    <TopBar title="Plus" :help="false" />
    <div class="p-4 space-y-2">
      <div data-tour="more-links" class="card divide-y divide-ink-100">
        <ListRow :to="{ name: 'ministry-live' }" title="Inscriptions en direct" subtitle="Flux national en temps réel">
          <template #left><div class="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center"><Radio :size="17" class="text-brand-600" /></div></template>
        </ListRow>
        <ListRow :to="{ name: 'ministry-alerts' }" title="Alertes" subtitle="Anomalies à surveiller">
          <template #left><div class="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center"><TriangleAlert :size="17" class="text-amber-600" /></div></template>
        </ListRow>
        <ListRow :to="{ name: 'ministry-profile' }" title="Mon profil" subtitle="Informations personnelles">
          <template #left><div class="w-9 h-9 rounded-lg bg-sky-50 flex items-center justify-center"><UserCircle :size="17" class="text-sky-600" /></div></template>
        </ListRow>
      </div>
      <div class="card divide-y divide-ink-100">
        <button class="w-full" @click="startTour">
          <ListRow title="Visite guidée" subtitle="Redécouvrir l'espace ministère" :chevron="false">
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
