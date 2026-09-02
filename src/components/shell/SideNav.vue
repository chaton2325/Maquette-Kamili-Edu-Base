<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { GraduationCap } from 'lucide-vue-next'
import Avatar from '@/components/ui/Avatar.vue'
import { useAuthStore } from '@/stores/auth'
import { roleLabels } from '@/data/personas'

defineProps({
  items: { type: Array, required: true } // [{ label, icon, to: {name}, section, tour }]
})

const route = useRoute()
const auth = useAuthStore()

const profileRouteName = { parent: 'parent-profile', ecole: 'school-profile', ministere: 'ministry-profile' }
const profileRoute = computed(() => ({ name: profileRouteName[auth.currentRole] }))
</script>

<template>
  <aside class="hidden md:flex md:flex-col md:w-64 md:shrink-0 md:sticky md:top-0 md:h-screen bg-white border-r border-ink-100">
    <div class="h-16 px-5 flex items-center gap-2.5 border-b border-ink-100 shrink-0">
      <div class="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shrink-0">
        <GraduationCap :size="18" />
      </div>
      <div class="min-w-0">
        <p class="font-extrabold text-ink-800 text-[14.5px] leading-tight truncate">Kamili Éduc</p>
        <p class="text-[10.5px] text-ink-400 truncate">Éducation de base</p>
      </div>
    </div>

    <nav class="flex-1 py-3 px-3 space-y-1 overflow-y-auto no-scrollbar">
      <RouterLink
        v-for="item in items"
        :key="item.section"
        :to="item.to"
        :data-tour="item.tour"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-semibold transition tap-scale"
        :class="route.meta.section === item.section ? 'bg-brand-50 text-brand-700' : 'text-ink-500 hover:bg-ink-50'"
      >
        <component :is="item.icon" :size="18" />
        {{ item.label }}
      </RouterLink>
    </nav>

    <RouterLink :to="profileRoute" class="m-3 p-2.5 rounded-xl bg-ink-50 flex items-center gap-2.5 tap-scale shrink-0">
      <Avatar :initials="auth.profile?.initiales" :color="auth.profile?.couleur" :size="34" />
      <div class="min-w-0">
        <p class="text-[12.5px] font-bold text-ink-800 truncate">{{ auth.profile?.nom }}</p>
        <p class="text-[10.5px] text-ink-400 truncate">{{ roleLabels[auth.currentRole] }}</p>
      </div>
    </RouterLink>
  </aside>
</template>
