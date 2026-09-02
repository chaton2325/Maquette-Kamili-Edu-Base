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
    <Transition name="sheet-fade">
      <div v-if="modelValue" class="absolute inset-0 z-[100] bg-ink-900/50" @click.self="close">
        <Transition name="sheet-slide" appear>
          <div v-if="modelValue" class="absolute bottom-0 inset-x-0 mx-auto max-w-[420px] bg-white rounded-t-2xl p-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] shadow-floating max-h-[88%] overflow-y-auto">
            <div class="w-10 h-1 rounded-full bg-ink-200 mx-auto mb-3"></div>
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-bold text-ink-800 text-[16px]">{{ title }}</h3>
              <button class="p-1 rounded-full active:bg-ink-100" @click="close" aria-label="Fermer">
                <X :size="18" class="text-ink-500" />
              </button>
            </div>
            <slot />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.sheet-fade-enter-active,
.sheet-fade-leave-active {
  transition: opacity 0.2s ease;
}
.sheet-fade-enter-from,
.sheet-fade-leave-to {
  opacity: 0;
}
.sheet-slide-enter-active,
.sheet-slide-leave-active {
  transition: transform 0.25s ease;
}
.sheet-slide-enter-from,
.sheet-slide-leave-to {
  transform: translateY(100%);
}
</style>
