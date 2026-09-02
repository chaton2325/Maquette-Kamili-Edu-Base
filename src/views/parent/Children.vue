<script setup>
import { computed } from 'vue'
import { UserPlus } from 'lucide-vue-next'
import TopBar from '@/components/shell/TopBar.vue'
import Avatar from '@/components/ui/Avatar.vue'
import Badge from '@/components/ui/Badge.vue'
import ListRow from '@/components/ui/ListRow.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { useAuthStore } from '@/stores/auth'
import { useChildrenStore } from '@/stores/children'
import { schoolById } from '@/data/schools'

const auth = useAuthStore()
const childrenStore = useChildrenStore()
const myChildren = computed(() => childrenStore.byParent(auth.profile?.id))

const statusTone = { validé: 'success', en_attente: 'warning', rejeté: 'danger' }
const statusLabel = { validé: 'Validé', en_attente: 'En attente', rejeté: 'Rejeté' }
</script>

<template>
  <div>
    <TopBar title="Mes enfants" />
    <div class="p-4 space-y-3">
      <RouterLink data-tour="enroll-button" :to="{ name: 'parent-enroll' }" class="btn-primary flex items-center justify-center gap-2 text-sm">
        <UserPlus :size="17" /> Inscrire un enfant
      </RouterLink>

      <EmptyState v-if="!myChildren.length" :icon="UserPlus" title="Aucun enfant pour l’instant" text="Inscrivez votre premier enfant dans un établissement." />

      <div v-else class="card divide-y divide-ink-100">
        <ListRow
          v-for="child in myChildren"
          :key="child.id"
          :to="{ name: 'parent-child-detail', params: { id: child.id } }"
          :title="`${child.prenom} ${child.nom}`"
          :subtitle="`${child.classe} · ${schoolById(child.schoolId)?.nom}`"
        >
          <template #left>
            <Avatar :initials="child.initiales" :color="child.couleur" :size="42" />
          </template>
          <template #right>
            <Badge :tone="statusTone[child.statut]">{{ statusLabel[child.statut] }}</Badge>
          </template>
        </ListRow>
      </div>
    </div>
  </div>
</template>
