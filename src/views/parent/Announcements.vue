<script setup>
import { computed } from 'vue'
import { Bell, Landmark, School } from 'lucide-vue-next'
import TopBar from '@/components/shell/TopBar.vue'
import Badge from '@/components/ui/Badge.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { useAuthStore } from '@/stores/auth'
import { useChildrenStore } from '@/stores/children'
import { useAnnouncementsStore } from '@/stores/announcements'
import { formatDate } from '@/utils/date'

const auth = useAuthStore()
const childrenStore = useChildrenStore()
const announcementsStore = useAnnouncementsStore()

const mySchoolIds = computed(() => [...new Set(childrenStore.byParent(auth.profile?.id).map((c) => c.schoolId))])
const list = computed(() => announcementsStore.forParent(mySchoolIds.value))
</script>

<template>
  <div>
    <TopBar title="Annonces" back />
    <div class="p-4 space-y-3">
      <EmptyState v-if="!list.length" :icon="Bell" title="Aucune annonce" />
      <div v-for="a in list" :key="a.id" class="card !p-3.5 flex gap-3">
        <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" :class="a.niveau === 'national' ? 'bg-flag-green/10 text-flag-green' : 'bg-brand-50 text-brand-600'">
          <component :is="a.niveau === 'national' ? Landmark : School" :size="17" />
        </div>
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-1.5 flex-wrap">
            <p class="text-[13.5px] font-bold text-ink-800">{{ a.titre }}</p>
            <Badge v-if="a.importante" tone="danger">Important</Badge>
          </div>
          <p class="text-[13px] text-ink-500 mt-0.5">{{ a.contenu }}</p>
          <p class="text-[11px] text-ink-400 mt-1">{{ a.auteur }} · {{ formatDate(a.date) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
