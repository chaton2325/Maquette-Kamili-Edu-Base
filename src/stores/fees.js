import { defineStore } from 'pinia'
import { feeSchedules as seedFees } from '@/data/fees'

export const useFeesStore = defineStore('fees', {
  state: () => ({
    schedules: JSON.parse(JSON.stringify(seedFees))
  }),
  getters: {
    forChild: (state) => (childId) => state.schedules[childId] || [],
    dueForChild: (state) => (childId) =>
      (state.schedules[childId] || []).filter((f) => f.statut === 'en_attente').reduce((sum, f) => sum + f.montant, 0),
    dueForChildren: (state) => (childIds) =>
      childIds.reduce(
        (sum, id) => sum + (state.schedules[id] || []).filter((f) => f.statut === 'en_attente').reduce((s, f) => s + f.montant, 0),
        0
      ),
    nextDueForChildren: (state) => (childIds) => {
      const all = childIds.flatMap((id) => state.schedules[id] || []).filter((f) => f.statut === 'en_attente')
      if (!all.length) return null
      return all.sort((a, b) => new Date(a.dateLimite) - new Date(b.dateLimite))[0]
    }
  },
  actions: {
    ensureChild(childId) {
      if (!this.schedules[childId]) this.schedules[childId] = []
    },
    payFee(childId, feeId, methode) {
      const fee = (this.schedules[childId] || []).find((f) => f.id === feeId)
      if (!fee) return
      fee.statut = 'payé'
      fee.datePaiement = new Date().toISOString().slice(0, 10)
      fee.methode = methode
    }
  }
})
