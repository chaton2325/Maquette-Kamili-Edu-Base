<script setup>
import { ref, onMounted } from 'vue'
import { Sparkles } from 'lucide-vue-next'
import Modal from '@/components/ui/Modal.vue'
import { useAuthStore } from '@/stores/auth'
import { useTourStore } from '@/stores/tour'

const props = defineProps({
  role: { type: String, required: true }
})

const auth = useAuthStore()
const tourStore = useTourStore()
const open = ref(false)

onMounted(() => {
  if (!auth.introSeen[props.role]) open.value = true
})

function start() {
  auth.markIntroSeen(props.role)
  open.value = false
  tourStore.start(props.role)
}

function dismiss() {
  auth.markIntroSeen(props.role)
  open.value = false
}
</script>

<template>
  <Modal v-model="open" title="Bienvenue !">
    <div class="flex flex-col items-center text-center gap-3">
      <div class="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center">
        <Sparkles :size="26" class="text-brand-600" />
      </div>
      <p class="text-sm text-ink-500">Voulez-vous une petite visite guidée pour découvrir les fonctionnalités de cet espace ?</p>
      <div class="flex gap-2 w-full mt-2">
        <button class="btn-secondary flex-1 text-sm" @click="dismiss">Plus tard</button>
        <button class="btn-primary flex-1 text-sm" @click="start">Découvrir</button>
      </div>
    </div>
  </Modal>
</template>
