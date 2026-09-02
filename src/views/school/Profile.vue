<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import TopBar from '@/components/shell/TopBar.vue'
import SectionCard from '@/components/ui/SectionCard.vue'
import Avatar from '@/components/ui/Avatar.vue'
import { useAuthStore } from '@/stores/auth'
import { schoolById } from '@/data/schools'

const auth = useAuthStore()
const router = useRouter()
const school = computed(() => schoolById(auth.profile?.schoolId))

function logout() {
  auth.logout()
  router.push('/')
}
</script>

<template>
  <div>
    <TopBar title="Profil établissement" back />
    <div class="p-4 space-y-4">
      <div class="flex flex-col items-center gap-2 py-2">
        <Avatar :initials="auth.profile?.initiales" :color="auth.profile?.couleur" :size="64" />
        <p class="font-bold text-ink-800">{{ auth.profile?.nom }}</p>
        <p class="text-xs text-ink-400">{{ auth.profile?.fonction }}</p>
      </div>

      <SectionCard title="Établissement">
        <dl class="text-sm divide-y divide-ink-100">
          <div class="flex justify-between py-2"><dt class="text-ink-400">Nom</dt><dd class="font-medium text-ink-700 text-right">{{ school?.nom }}</dd></div>
          <div class="flex justify-between py-2"><dt class="text-ink-400">Type</dt><dd class="font-medium text-ink-700">{{ school?.type }}</dd></div>
          <div class="flex justify-between py-2"><dt class="text-ink-400">Localisation</dt><dd class="font-medium text-ink-700">{{ school?.quartier }}, {{ school?.ville }}</dd></div>
          <div class="flex justify-between py-2"><dt class="text-ink-400">Téléphone</dt><dd class="font-medium text-ink-700">{{ school?.telephone }}</dd></div>
        </dl>
      </SectionCard>

      <RouterLink to="/demo" class="btn-secondary w-full text-center text-sm block">Changer de compte de démonstration</RouterLink>
      <button class="w-full text-center text-sm font-semibold text-rose-600 py-2" @click="logout">Se déconnecter</button>
    </div>
  </div>
</template>
