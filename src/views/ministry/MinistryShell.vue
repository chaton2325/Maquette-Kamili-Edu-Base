<script setup>
import { Home, Map, Building2, Landmark, MoreHorizontal } from 'lucide-vue-next'
import BottomNav from '@/components/shell/BottomNav.vue'
import SideNav from '@/components/shell/SideNav.vue'
import IntroPrompt from '@/components/tour/IntroPrompt.vue'

const items = [
  { label: 'Accueil', icon: Home, to: { name: 'ministry-dashboard' }, section: 'dashboard', tour: 'nav-dashboard' },
  { label: 'Régions', icon: Map, to: { name: 'ministry-regions' }, section: 'regions', tour: 'nav-regions' },
  { label: 'Écoles', icon: Building2, to: { name: 'ministry-schools' }, section: 'schools', tour: 'nav-schools' },
  { label: 'Finances', icon: Landmark, to: { name: 'ministry-ape-finance' }, section: 'ape-finance', tour: 'nav-ape-finance' },
  { label: 'Plus', icon: MoreHorizontal, to: { name: 'ministry-more' }, section: 'more', tour: 'nav-more' }
]
</script>

<template>
  <div class="min-h-full flex flex-col md:flex-row">
    <SideNav :items="items" />
    <div class="flex-1 flex flex-col min-w-0">
      <div class="flex-1 flex flex-col md:max-w-4xl md:w-full md:mx-auto">
        <RouterView />
      </div>
      <BottomNav :items="items" />
    </div>
  </div>
  <IntroPrompt role="ministere" />
</template>
