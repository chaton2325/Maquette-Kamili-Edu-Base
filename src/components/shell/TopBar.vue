<script setup>
import { useRouter } from 'vue-router'
import { ChevronLeft, CircleHelp } from 'lucide-vue-next'
import { useTourStore } from '@/stores/tour'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  title: { type: String, default: '' },
  back: { type: Boolean, default: false },
  backTo: { type: [String, Object], default: null },
  help: { type: Boolean, default: true }
})

const router = useRouter()
const tour = useTourStore()
const auth = useAuthStore()

function goBack() {
  if (props.backTo) router.push(props.backTo)
  else router.back()
}

function openHelp() {
  if (auth.currentRole) tour.start(auth.currentRole)
}
</script>

<template>
  <header class="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-ink-100 pt-[env(safe-area-inset-top)]">
    <div class="h-14 px-3 flex items-center gap-1.5">
      <button v-if="back" class="p-2 -ml-1 rounded-full active:bg-ink-100 tap-scale" @click="goBack" aria-label="Retour">
        <ChevronLeft :size="22" class="text-ink-700" />
      </button>
      <h1 class="flex-1 text-[17px] font-bold text-ink-800 truncate" :class="{ 'ml-1': !back }">{{ title }}</h1>
      <slot name="actions" />
      <button
        v-if="help"
        data-tour="help-button"
        class="p-2 rounded-full active:bg-brand-50 tap-scale text-brand-600"
        @click="openHelp"
        aria-label="Visite guidée"
      >
        <CircleHelp :size="21" />
      </button>
    </div>
  </header>
</template>
