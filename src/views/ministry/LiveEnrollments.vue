<script setup>
import { computed } from 'vue'
import { Radio } from 'lucide-vue-next'
import TopBar from '@/components/shell/TopBar.vue'
import Avatar from '@/components/ui/Avatar.vue'
import Badge from '@/components/ui/Badge.vue'
import { useChildrenStore } from '@/stores/children'
import { schoolById } from '@/data/schools'
import { regionById } from '@/data/regions'
import { formatDate } from '@/utils/date'

const childrenStore = useChildrenStore()
const feed = computed(() => childrenStore.recentRegistrations)

const statusTone = { validé: 'success', en_attente: 'warning', rejeté: 'danger' }
const statusLabel = { validé: 'Validé', en_attente: 'En attente', rejeté: 'Rejeté' }
</script>

<template>
  <div>
    <TopBar title="Inscriptions en direct" back />
    <div class="p-4 space-y-3">
      <div class="flex items-center gap-2 text-xs font-semibold text-brand-600 bg-brand-50 rounded-lg px-3 py-2">
        <Radio :size="14" class="animate-pulse" /> Flux national des dossiers d'inscription
      </div>
      <div v-for="c in feed" :key="c.id" class="card !p-3.5 flex items-center gap-3">
        <Avatar :initials="c.initiales" :color="c.couleur" :size="38" />
        <div class="min-w-0 flex-1">
          <p class="text-[13.5px] font-bold text-ink-800 truncate">{{ c.prenom }} {{ c.nom }}</p>
          <p class="text-[11.5px] text-ink-400 truncate">{{ schoolById(c.schoolId)?.nom }} · {{ regionById(schoolById(c.schoolId)?.region)?.nom }}</p>
          <p class="text-[10.5px] text-ink-300">{{ formatDate(c.dateInscription) }}</p>
        </div>
        <Badge :tone="statusTone[c.statut]">{{ statusLabel[c.statut] }}</Badge>
      </div>
    </div>
  </div>
</template>
