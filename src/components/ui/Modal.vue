<script setup>
import { X } from 'lucide-vue-next'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue'])

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <Teleport to="#device-viewport">
    <Transition name="fade">
      <div v-if="modelValue" class="absolute inset-0 z-[100] flex items-center justify-center p-5 bg-ink-900/50" @click.self="close">
        <div class="bg-white rounded-2xl w-full max-w-[400px] max-h-[85%] overflow-y-auto p-5 shadow-floating">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-ink-800 text-[16px]">{{ title }}</h3>
            <button class="p-1 rounded-full active:bg-ink-100" @click="close" aria-label="Fermer">
              <X :size="18" class="text-ink-500" />
            </button>
          </div>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
