import { defineStore } from 'pinia'
import { personas } from '@/data/personas'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentRole: null, // 'parent' | 'ecole' | 'ministere'
    overrides: {}, // { parent: { nom, telephone, email } }
    introSeen: { parent: false, ecole: false, ministere: false }
  }),
  getters: {
    isAuthenticated: (state) => !!state.currentRole,
    profile: (state) => {
      if (!state.currentRole) return null
      const base = personas[state.currentRole]
      const over = state.overrides[state.currentRole] || {}
      return { ...base, ...over }
    }
  },
  actions: {
    loginAs(role) {
      this.currentRole = role
    },
    registerParent(form) {
      this.overrides.parent = {
        nom: form.nom || personas.parent.nom,
        telephone: form.telephone || personas.parent.telephone,
        email: form.email || personas.parent.email
      }
      this.currentRole = 'parent'
    },
    logout() {
      this.currentRole = null
    },
    markIntroSeen(role) {
      this.introSeen[role] = true
    },
    resetIntro(role) {
      this.introSeen[role] = false
    }
  }
})
