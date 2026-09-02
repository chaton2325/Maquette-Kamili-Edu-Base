import { defineStore } from 'pinia'

// État de session de la visite guidée (non persisté : on repart toujours
// de zéro à l'ouverture de l'appli).
export const useTourStore = defineStore('tour', {
  state: () => ({
    active: false,
    role: null,
    index: 0
  }),
  actions: {
    start(role) {
      this.role = role
      this.index = 0
      this.active = true
    },
    setIndex(i) {
      this.index = i
    },
    stop() {
      this.active = false
    }
  }
})
