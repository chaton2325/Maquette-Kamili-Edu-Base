<script setup>
import { ref, computed } from 'vue'
import { ClipboardCheck } from 'lucide-vue-next'
import TopBar from '@/components/shell/TopBar.vue'
import Avatar from '@/components/ui/Avatar.vue'
import Badge from '@/components/ui/Badge.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Modal from '@/components/ui/Modal.vue'
import { useAuthStore } from '@/stores/auth'
import { useChildrenStore } from '@/stores/children'
import { formatDate } from '@/utils/date'

const auth = useAuthStore()
const childrenStore = useChildrenStore()

const filter = ref('en_attente')
const all = computed(() => childrenStore.bySchool(auth.profile?.schoolId).slice().sort((a, b) => new Date(b.dateInscription) - new Date(a.dateInscription)))
const filtered = computed(() => (filter.value === 'tous' ? all.value : all.value.filter((c) => c.statut === filter.value)))

const statusTone = { validé: 'success', en_attente: 'warning', rejeté: 'danger' }
const statusLabel = { validé: 'Validé', en_attente: 'En attente', rejeté: 'Rejeté' }

const rejecting = ref(null)
const motif = ref('')

function approve(child) {
  childrenStore.setStatus(child.id, 'validé')
}
function openReject(child) {
  rejecting.value = child
  motif.value = ''
}
function confirmReject() {
  childrenStore.setStatus(rejecting.value.id, 'rejeté', motif.value || 'Dossier incomplet')
  rejecting.value = null
}
</script>

<template>
  <div>
    <TopBar title="Inscriptions" />
    <div class="p-4 space-y-3">
      <div class="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        <button v-for="f in [['en_attente','En attente'],['validé','Validées'],['rejeté','Rejetées'],['tous','Toutes']]" :key="f[0]" class="chip shrink-0" :class="filter === f[0] ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-600'" @click="filter = f[0]">
          {{ f[1] }}
        </button>
      </div>

      <EmptyState v-if="!filtered.length" :icon="ClipboardCheck" title="Rien à afficher" />

      <div v-for="c in filtered" :key="c.id" class="card !p-3.5">
        <div class="flex items-center gap-3">
          <Avatar :initials="c.initiales" :color="c.couleur" :size="42" />
          <div class="min-w-0 flex-1">
            <p class="text-[13.5px] font-bold text-ink-800 truncate">{{ c.prenom }} {{ c.nom }}</p>
            <p class="text-[11.5px] text-ink-400">{{ c.classe }} · Parent : {{ c.parentNomAffiche }}</p>
            <p class="text-[11px] text-ink-300">Reçu le {{ formatDate(c.dateInscription) }}</p>
          </div>
          <Badge :tone="statusTone[c.statut]">{{ statusLabel[c.statut] }}</Badge>
        </div>
        <div v-if="c.statut === 'en_attente'" data-tour="validate-actions" class="flex gap-2 mt-3">
          <button class="btn-secondary flex-1 !text-rose-600 text-xs" @click="openReject(c)">Rejeter</button>
          <button class="btn-primary flex-1 text-xs" @click="approve(c)">Valider</button>
        </div>
        <p v-else-if="c.statut === 'rejeté' && c.motifRejet" class="text-xs text-rose-600 mt-2 bg-rose-50 rounded-lg p-2">{{ c.motifRejet }}</p>
      </div>
    </div>

    <Modal :model-value="!!rejecting" title="Rejeter le dossier" @update:model-value="(v) => !v && (rejecting = null)">
      <div class="space-y-3">
        <p class="text-sm text-ink-500">Précisez le motif pour {{ rejecting?.prenom }} {{ rejecting?.nom }} :</p>
        <textarea v-model="motif" class="field-input" rows="3" placeholder="Ex : acte de naissance illisible"></textarea>
        <button class="btn-primary w-full text-sm" @click="confirmReject">Confirmer le rejet</button>
      </div>
    </Modal>
  </div>
</template>
