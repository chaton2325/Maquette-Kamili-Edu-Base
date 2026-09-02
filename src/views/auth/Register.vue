<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopBar from '@/components/shell/TopBar.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const form = ref({ nom: '', telephone: '+237 6 ', email: '', password: '' })

function submit() {
  auth.registerParent(form.value)
  router.push('/parent')
}
</script>

<template>
  <div>
    <TopBar title="Créer un compte parent" back :help="false" />
    <div class="p-5 space-y-3 pt-6 md:max-w-sm md:mx-auto">
      <p class="text-sm text-ink-500">Créez votre compte parent pour inscrire vos enfants et suivre leur scolarité.</p>
      <div>
        <label class="field-label">Nom complet</label>
        <input v-model="form.nom" class="field-input" placeholder="Ex : Mireille Ngo Bella" />
      </div>
      <div>
        <label class="field-label">Téléphone</label>
        <input v-model="form.telephone" class="field-input" />
      </div>
      <div>
        <label class="field-label">E-mail (optionnel)</label>
        <input v-model="form.email" class="field-input" />
      </div>
      <div>
        <label class="field-label">Mot de passe</label>
        <input v-model="form.password" type="password" class="field-input" placeholder="••••••••" />
      </div>
      <button class="btn-primary w-full mt-2" :disabled="!form.nom || !form.telephone" @click="submit">Créer mon compte</button>
      <p class="text-center text-sm text-ink-400">
        Déjà inscrit ? <RouterLink to="/connexion" class="text-brand-600 font-semibold">Se connecter</RouterLink>
      </p>
    </div>
  </div>
</template>
