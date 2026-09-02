<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useTour } from '@/composables/useTour'

const { tourStore, steps, step, isFirst, isLast, next, prev, skip } = useTour()

const rect = ref(null)
const containerHeight = ref(0)

function computeRect() {
  const container = document.getElementById('device-viewport')
  if (!container) return
  containerHeight.value = container.clientHeight

  if (!step.value?.target) {
    rect.value = null
    return
  }
  const candidates = container.querySelectorAll(`[data-tour="${step.value.target}"]`)
  const el = Array.from(candidates).find((c) => c.offsetParent !== null) || candidates[0]
  if (!el) {
    rect.value = null
    return
  }
  const cRect = container.getBoundingClientRect()
  const eRect = el.getBoundingClientRect()
  rect.value = {
    top: eRect.top - cRect.top,
    left: eRect.left - cRect.left,
    width: eRect.width,
    height: eRect.height
  }
}

async function refresh() {
  rect.value = null
  await nextTick()
  setTimeout(computeRect, 180)
}

watch(() => (tourStore.active ? `${tourStore.role}-${tourStore.index}` : null), (val) => {
  if (val) refresh()
})

function onResize() {
  computeRect()
}
onMounted(() => window.addEventListener('resize', onResize))
onBeforeUnmount(() => window.removeEventListener('resize', onResize))

const spotlightStyle = computed(() => {
  if (!rect.value) return null
  return {
    top: `${rect.value.top - 6}px`,
    left: `${rect.value.left - 6}px`,
    width: `${rect.value.width + 12}px`,
    height: `${rect.value.height + 12}px`,
    boxShadow: '0 0 0 3px #1aab9d, 0 0 0 2000px rgba(11, 15, 20, 0.62)'
  }
})

const bubbleStyle = computed(() => {
  if (!rect.value) return {}
  const spaceBelow = containerHeight.value - (rect.value.top + rect.value.height)
  if (spaceBelow > 170 || rect.value.top < containerHeight.value / 2) {
    return { top: `${rect.value.top + rect.value.height + 16}px` }
  }
  return { bottom: `${containerHeight.value - rect.value.top + 16}px` }
})
</script>

<template>
  <Teleport to="#device-viewport">
    <div v-if="tourStore.active && step" class="absolute inset-0 z-[200]">
      <div v-if="rect" class="absolute rounded-2xl pointer-events-none transition-all duration-200" :style="spotlightStyle" />
      <div v-else class="absolute inset-0" style="background: rgba(11, 15, 20, 0.62);" />

      <div
        class="absolute inset-x-4 mx-auto max-w-[360px] bg-white rounded-2xl p-4 shadow-floating"
        :class="!rect && 'top-1/2 -translate-y-1/2'"
        :style="bubbleStyle"
      >
        <p class="text-[10px] font-bold text-brand-600 uppercase tracking-wide mb-1">Étape {{ tourStore.index + 1 }} / {{ steps.length }}</p>
        <h3 class="font-bold text-ink-800 text-[15px] mb-1">{{ step.title }}</h3>
        <p class="text-[13px] text-ink-500 mb-3 leading-snug">{{ step.text }}</p>
        <div class="flex items-center justify-between gap-2">
          <button class="btn-ghost text-xs shrink-0" @click="skip">Passer</button>
          <div class="flex gap-2">
            <button v-if="!isFirst" class="btn-secondary !py-1.5 !px-3 text-xs" @click="prev">Précédent</button>
            <button class="btn-primary !py-1.5 !px-4 text-xs" @click="next">{{ isLast ? 'Terminer' : 'Suivant' }}</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
