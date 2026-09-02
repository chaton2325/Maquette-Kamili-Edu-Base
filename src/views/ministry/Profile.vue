<script setup>
import { useRouter } from 'vue-router'
import TopBar from '@/components/shell/TopBar.vue'
import SectionCard from '@/components/ui/SectionCard.vue'
import Avatar from '@/components/ui/Avatar.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push('/')
}
</script>

<template>
  <div>
    <TopBar title="Profil" back />
    <div class="p-4 space-y-4">
      <div class="flex flex-col items-center gap-2 py-2">
        <Avatar :initials="auth.profile?.initiales" :color="auth.profile?.couleur" :size="64" />
        <p class="font-bold text-ink-800">{{ auth.profile?.nom }}</p>
        <p class="text-xs text-ink-400">{{ auth.profile?.fonction }}</p>
      </div>

      <SectionCard title="Contact">
        <dl class="text-sm divide-y divide-ink-100">
          <div class="flex justify-between py-2"><dt class="text-ink-400">Téléphone</dt><dd class="font-medium text-ink-700">{{ auth.profile?.telephone }}</dd></div>
          <div class="flex justify-between py-2"><dt class="text-ink-400">E-mail</dt><dd class="font-medium text-ink-700">{{ auth.profile?.email }}</dd></div>
          <div class="flex justify-between py-2"><dt class="text-ink-400">Ville</dt><dd class="font-medium text-ink-700">{{ auth.profile?.ville }}</dd></div>
        </dl>
      </SectionCard>

      <RouterLink to="/demo" class="btn-secondary w-full text-center text-sm block">Changer de compte de démonstration</RouterLink>
      <button class="w-full text-center text-sm font-semibold text-rose-600 py-2" @click="logout">Se déconnecter</button>
    </div>
  </div>
</template>
