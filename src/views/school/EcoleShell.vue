<script setup>
import { Home, ClipboardList, LayoutGrid, HandCoins, MoreHorizontal } from 'lucide-vue-next'
import BottomNav from '@/components/shell/BottomNav.vue'
import SideNav from '@/components/shell/SideNav.vue'
import IntroPrompt from '@/components/tour/IntroPrompt.vue'

const items = [
  { label: 'Accueil', icon: Home, to: { name: 'school-dashboard' }, section: 'dashboard', tour: 'nav-dashboard' },
  { label: 'Inscriptions', icon: ClipboardList, to: { name: 'school-enrollments' }, section: 'enrollments', tour: 'nav-inscriptions' },
  { label: 'Classes', icon: LayoutGrid, to: { name: 'school-classes' }, section: 'classes', tour: 'nav-classes' },
  { label: 'APE', icon: HandCoins, to: { name: 'school-ape' }, section: 'ape', tour: 'nav-ape' },
  { label: 'Plus', icon: MoreHorizontal, to: { name: 'school-more' }, section: 'more', tour: 'nav-more' }
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
  <IntroPrompt role="ecole" />
</template>
