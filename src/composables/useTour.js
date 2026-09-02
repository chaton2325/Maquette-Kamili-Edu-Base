import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTourStore } from '@/stores/tour'
import { parentTour } from '@/tours/parentTour'
import { schoolTour } from '@/tours/schoolTour'
import { ministryTour } from '@/tours/ministryTour'

const TOURS = { parent: parentTour, ecole: schoolTour, ministere: ministryTour }

export function useTour() {
  const tourStore = useTourStore()
  const router = useRouter()

  const steps = computed(() => TOURS[tourStore.role] || [])
  const step = computed(() => steps.value[tourStore.index] || null)
  const isFirst = computed(() => tourStore.index === 0)
  const isLast = computed(() => tourStore.index >= steps.value.length - 1)

  async function goTo(index) {
    const target = steps.value[index]
    if (!target) return
    if (target.route) {
      await router.push(target.route).catch(() => {})
    }
    tourStore.setIndex(index)
  }

  function next() {
    if (isLast.value) {
      tourStore.stop()
      return
    }
    goTo(tourStore.index + 1)
  }

  function prev() {
    if (!isFirst.value) goTo(tourStore.index - 1)
  }

  function skip() {
    tourStore.stop()
  }

  return { tourStore, steps, step, isFirst, isLast, next, prev, skip, goTo }
}
