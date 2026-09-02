<script setup>
import { ref, computed } from 'vue'
import { Bell, Plus } from 'lucide-vue-next'
import TopBar from '@/components/shell/TopBar.vue'
import Badge from '@/components/ui/Badge.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Modal from '@/components/ui/Modal.vue'
import { useAuthStore } from '@/stores/auth'
import { useAnnouncementsStore } from '@/stores/announcements'
import { schoolById } from '@/data/schools'
import { formatDate } from '@/utils/date'

const auth = useAuthStore()
const announcementsStore = useAnnouncementsStore()

const school = computed(() => schoolById(auth.profile?.schoolId))
const list = computed(() => announcementsStore.forSchool(school.value?.id))

const showCreate = ref(false)
const form = ref({ titre: '', contenu: '', importante: false })
function publish() {
  announcementsStore.publish({
    niveau: 'ecole',
    auteur: school.value?.nom,
    schoolId: school.value?.id,
    titre: form.value.titre,
    contenu: form.value.contenu,
    importante: form.value.importante
  })
  showCreate.value = false
  form.value = { titre: '', contenu: '', importante: false }
}
</script>

<template>
  <div>
    <TopBar title="Annonces" />
    <div class="p-4 space-y-3">
      <button class="btn-primary w-full flex items-center justify-center gap-2 text-sm" @click="showCreate = true">
        <Plus :size="16" /> Publier une annonce
      </button>
      <EmptyState v-if="!list.length" :icon="Bell" title="Aucune annonce" />
      <div v-for="a in list" :key="a.id" class="card !p-3.5">
        <div class="flex items-center gap-1.5 flex-wrap">
          <p class="text-[13.5px] font-bold text-ink-800">{{ a.titre }}</p>
          <Badge v-if="a.importante" tone="danger">Important</Badge>
          <Badge v-if="a.niveau === 'national'" tone="brand">MINEDUB</Badge>
        </div>
        <p class="text-[13px] text-ink-500 mt-0.5">{{ a.contenu }}</p>
        <p class="text-[11px] text-ink-400 mt-1">{{ a.auteur }} · {{ formatDate(a.date) }}</p>
      </div>
    </div>

    <Modal v-model="showCreate" title="Nouvelle annonce">
      <div class="space-y-2.5">
        <input v-model="form.titre" class="field-input" placeholder="Titre" />
        <textarea v-model="form.contenu" class="field-input" rows="3" placeholder="Message aux parents"></textarea>
        <label class="flex items-center gap-2 text-sm text-ink-600">
          <input v-model="form.importante" type="checkbox" class="rounded" /> Marquer comme important
        </label>
        <button class="btn-primary w-full text-sm" :disabled="!form.titre || !form.contenu" @click="publish">Publier</button>
      </div>
    </Modal>
  </div>
</template>
