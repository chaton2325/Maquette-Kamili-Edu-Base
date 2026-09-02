<script setup>
import { useRouter } from 'vue-router'
import { Users, School, Landmark, ChevronRight } from 'lucide-vue-next'
import TopBar from '@/components/shell/TopBar.vue'
import { useAuthStore } from '@/stores/auth'
import { personas } from '@/data/personas'

const router = useRouter()
const auth = useAuthStore()

const options = [
  { role: 'parent', icon: Users, title: 'Parent', desc: `Se connecter en tant que ${personas.parent.nom}`, color: '#0f766e', path: '/parent' },
  { role: 'ecole', icon: School, title: 'Établissement', desc: `Direction — École Publique de Nkolbisson`, color: '#2563eb', path: '/ecole' },
  { role: 'ministere', icon: Landmark, title: 'Ministère (MINEDUB)', desc: `${personas.ministere.fonction}`, color: '#7c3aed', path: '/ministere' }
]

function choose(opt) {
  auth.loginAs(opt.role)
  router.push(opt.path)
}
</script>

<template>
  <div>
    <TopBar title="Espace de démonstration" back :help="false" />
    <div class="p-5 space-y-3 pt-4 md:max-w-md md:mx-auto">
      <p class="text-sm text-ink-500 mb-1">Choisissez un profil pour explorer Kamili Éduc sous cet angle.</p>
      <button v-for="opt in options" :key="opt.role" class="w-full card !p-4 flex items-center gap-3 tap-scale" @click="choose(opt)">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" :style="{ background: `${opt.color}1a` }">
          <component :is="opt.icon" :size="22" :style="{ color: opt.color }" />
        </div>
        <div class="min-w-0 flex-1 text-left">
          <p class="font-bold text-ink-800">{{ opt.title }}</p>
          <p class="text-xs text-ink-400 truncate">{{ opt.desc }}</p>
        </div>
        <ChevronRight :size="18" class="text-ink-300" />
      </button>
    </div>
  </div>
</template>
