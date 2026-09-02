<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopBar from '@/components/shell/TopBar.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const telephone = ref('+237 6 77 45 12 90')
const password = ref('')

function login() {
  auth.loginAs('parent')
  router.push('/parent')
}
</script>

<template>
  <div>
    <TopBar title="Connexion" back :help="false" />
    <div class="p-5 space-y-4 pt-6 md:max-w-sm md:mx-auto">
      <p class="text-sm text-ink-500">Connectez-vous à votre espace parent. (Formulaire de démonstration — tout numéro fonctionne.)</p>
      <div>
        <label class="field-label">Téléphone ou e-mail</label>
        <input v-model="telephone" class="field-input" />
      </div>
      <div>
        <label class="field-label">Mot de passe</label>
        <input v-model="password" type="password" class="field-input" placeholder="••••••••" />
      </div>
      <button class="btn-primary w-full" @click="login">Se connecter</button>
      <p class="text-center text-sm text-ink-400">
        Pas encore de compte ?
        <RouterLink to="/inscription-compte" class="text-brand-600 font-semibold">Créer un compte</RouterLink>
      </p>
      <div class="pt-4 border-t border-ink-100 text-center">
        <RouterLink to="/demo" class="text-xs font-semibold text-ink-400">Établissement ou Ministère ? Accéder à la démo →</RouterLink>
      </div>
    </div>
  </div>
</template>
