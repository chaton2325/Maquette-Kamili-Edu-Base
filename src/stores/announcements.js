import { defineStore } from 'pinia'
import { announcements as seedAnnouncements } from '@/data/announcements'

export const useAnnouncementsStore = defineStore('announcements', {
  state: () => ({
    list: seedAnnouncements.map((a) => ({ ...a }))
  }),
  getters: {
    sorted: (state) => state.list.slice().sort((a, b) => new Date(b.date) - new Date(a.date)),
    forParent: (state) => (schoolIds) =>
      state.list
        .filter((a) => a.niveau === 'national' || schoolIds.includes(a.schoolId))
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
    forSchool: (state) => (schoolId) =>
      state.list
        .filter((a) => a.niveau === 'national' || a.schoolId === schoolId)
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date))
  },
  actions: {
    publish({ niveau, auteur, schoolId, titre, contenu, importante }) {
      const item = {
        id: `a-${Date.now()}`,
        niveau,
        auteur,
        schoolId: schoolId || null,
        titre,
        contenu,
        importante: !!importante,
        date: new Date().toISOString().slice(0, 10)
      }
      this.list.unshift(item)
      return item
    }
  }
})
