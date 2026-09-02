<script setup>
import { GraduationCap, Users, School, Landmark } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-full flex flex-col bg-gradient-to-b from-brand-600 to-brand-800 text-white px-6 pt-[calc(env(safe-area-inset-top)+2.5rem)] pb-8 md:items-center md:justify-center md:px-4">
    <div class="w-full md:max-w-sm flex flex-col flex-1 md:flex-none md:min-h-[560px]">
      <div class="flex-1 flex flex-col items-center justify-center text-center gap-4">
        <div class="w-20 h-20 rounded-3xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
          <GraduationCap :size="38" />
        </div>
        <div>
          <h1 class="text-2xl font-extrabold">Kamili Éduc</h1>
          <p class="text-brand-100 text-sm mt-1">Éducation de base au Cameroun</p>
        </div>
        <p class="text-brand-100 text-[13px] max-w-[280px] leading-relaxed">
          Inscription des élèves, scolarité, notes, cotisations APE et suivi national — pour les parents, les établissements et le Ministère.
        </p>

        <div class="flex gap-4 mt-2 text-brand-100">
          <div class="flex flex-col items-center gap-1 text-[10px]"><Users :size="16" /> Parents</div>
          <div class="flex flex-col items-center gap-1 text-[10px]"><School :size="16" /> Écoles</div>
          <div class="flex flex-col items-center gap-1 text-[10px]"><Landmark :size="16" /> MINEDUB</div>
        </div>
      </div>

      <div class="space-y-2.5">
        <RouterLink to="/demo" class="btn-primary !bg-white !text-brand-700 w-full block text-center">Découvrir la démo</RouterLink>
        <RouterLink to="/connexion" class="w-full block text-center text-sm font-semibold text-white/90 py-2">J'ai déjà un compte</RouterLink>
        <p class="text-center text-[10.5px] text-brand-200/80 pt-2">Maquette à données simulées — aucune donnée réelle n'est utilisée.</p>
      </div>
    </div>
  </div>
</template>
