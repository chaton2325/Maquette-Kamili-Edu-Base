<script setup>
import { ref, computed } from 'vue'
import { Search } from 'lucide-vue-next'
import TopBar from '@/components/shell/TopBar.vue'
import Badge from '@/components/ui/Badge.vue'
import { schools } from '@/data/schools'
import { regions } from '@/data/regions'
import { iconFor } from '@/utils/icons'

const search = ref('')
const regionFilter = ref('')

const filtered = computed(() =>
  schools.filter((s) => {
    const matchRegion = !regionFilter.value || s.region === regionFilter.value
    const matchSearch = !search.value || s.nom.toLowerCase().includes(search.value.toLowerCase()) || s.ville.toLowerCase().includes(search.value.toLowerCase())
    return matchRegion && matchSearch
  })
)
</script>

<template>
  <div>
    <TopBar title="Établissements" />
    <div class="p-4 space-y-3">
      <div class="relative">
        <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
        <input v-model="search" class="field-input pl-9" placeholder="Rechercher une école, une ville..." />
      </div>
      <div class="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        <button class="chip shrink-0" :class="!regionFilter ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-600'" @click="regionFilter = ''">Toutes régions</button>
        <button v-for="r in regions" :key="r.id" class="chip shrink-0" :class="regionFilter === r.id ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-600'" @click="regionFilter = r.id">{{ r.nom }}</button>
      </div>
      <p class="text-xs text-ink-400 px-1">{{ filtered.length }} établissement(s)</p>
      <RouterLink v-for="s in filtered" :key="s.id" :to="{ name: 'ministry-school-detail', params: { id: s.id } }" class="card !p-3.5 flex items-center gap-3 tap-scale">
        <div class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" :style="{ background: `${s.couleur}1a` }">
          <component :is="iconFor(s.icon)" :size="20" :style="{ color: s.couleur }" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-[13.5px] font-bold text-ink-800 truncate">{{ s.nom }}</p>
          <p class="text-[11.5px] text-ink-400">{{ s.ville }} · {{ s.type }} · {{ s.effectif }} élèves</p>
        </div>
        <Badge tone="brand">{{ s.tauxReussiteCEP ?? '—' }}%</Badge>
      </RouterLink>
    </div>
  </div>
</template>
