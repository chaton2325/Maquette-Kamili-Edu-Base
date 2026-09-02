<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopBar from '@/components/shell/TopBar.vue'
import SectionCard from '@/components/ui/SectionCard.vue'
import Avatar from '@/components/ui/Avatar.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const form = ref({
  nom: auth.profile?.nom || '',
  telephone: auth.profile?.telephone || '',
  email: auth.profile?.email || ''
})
const saved = ref(false)

function save() {
  auth.overrides.parent = { ...form.value }
  saved.value = true
  setTimeout(() => (saved.value = false), 1800)
}

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
        <p class="text-xs text-ink-400">Compte parent</p>
      </div>

      <SectionCard title="Mes informations">
        <div class="space-y-2.5">
          <div>
            <label class="field-label">Nom complet</label>
            <input v-model="form.nom" class="field-input" />
          </div>
          <div>
            <label class="field-label">Téléphone</label>
            <input v-model="form.telephone" class="field-input" />
          </div>
          <div>
            <label class="field-label">E-mail</label>
            <input v-model="form.email" class="field-input" />
          </div>
          <button class="btn-primary w-full text-sm" @click="save">{{ saved ? 'Enregistré ✓' : 'Enregistrer' }}</button>
        </div>
      </SectionCard>

      <SectionCard title="À propos">
        <p class="text-xs text-ink-400 leading-relaxed">
          Kamili Éduc est une maquette de démonstration pour l'éducation de base au Cameroun. Toutes les données (élèves, écoles, paiements) sont simulées.
        </p>
      </SectionCard>

      <RouterLink to="/demo" class="btn-secondary w-full text-center text-sm block">Changer de compte de démonstration</RouterLink>
      <button class="w-full text-center text-sm font-semibold text-rose-600 py-2" @click="logout">Se déconnecter</button>
    </div>
  </div>
</template>
