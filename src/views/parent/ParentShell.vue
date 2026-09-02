<script setup>
import { Home, Users, Wallet, HandCoins, MoreHorizontal } from 'lucide-vue-next'
import BottomNav from '@/components/shell/BottomNav.vue'
import SideNav from '@/components/shell/SideNav.vue'
import IntroPrompt from '@/components/tour/IntroPrompt.vue'

const items = [
  { label: 'Accueil', icon: Home, to: { name: 'parent-dashboard' }, section: 'dashboard', tour: 'nav-dashboard' },
  { label: 'Enfants', icon: Users, to: { name: 'parent-children' }, section: 'children', tour: 'nav-children' },
  { label: 'Scolarité', icon: Wallet, to: { name: 'parent-tuition' }, section: 'scolarite', tour: 'nav-scolarite' },
  { label: 'APE', icon: HandCoins, to: { name: 'parent-ape' }, section: 'ape', tour: 'nav-ape' },
  { label: 'Plus', icon: MoreHorizontal, to: { name: 'parent-more' }, section: 'more', tour: 'nav-more' }
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
  <IntroPrompt role="parent" />
</template>
