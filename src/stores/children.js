import { defineStore } from 'pinia'
import { children as seedChildren } from '@/data/children'

function initials(prenom, nom) {
  return `${prenom?.[0] || ''}${nom?.[0] || ''}`.toUpperCase()
}

const AVATAR_COLORS = ['#0f766e', '#2563eb', '#be185d', '#7c3aed', '#0891b2', '#d97706', '#059669']

export const useChildrenStore = defineStore('children', {
  state: () => ({
    list: seedChildren.map((c) => ({ ...c }))
  }),
  getters: {
    byId: (state) => (id) => state.list.find((c) => c.id === id),
    byParent: (state) => (parentId) => state.list.filter((c) => c.parentId === parentId),
    bySchool: (state) => (schoolId) => state.list.filter((c) => c.schoolId === schoolId),
    byClass: (state) => (schoolId, classe) => state.list.filter((c) => c.schoolId === schoolId && c.classe === classe),
    pending: (state) => state.list.filter((c) => c.statut === 'en_attente'),
    pendingBySchool: (state) => (schoolId) => state.list.filter((c) => c.statut === 'en_attente' && c.schoolId === schoolId),
    recentRegistrations: (state) => {
      return state.list
        .slice()
        .sort((a, b) => new Date(b.dateInscription) - new Date(a.dateInscription))
    }
  },
  actions: {
    registerChild(form) {
      const id = `c-${Date.now()}`
      const color = AVATAR_COLORS[this.list.length % AVATAR_COLORS.length]
      const child = {
        id,
        prenom: form.prenom,
        nom: form.nom,
        sexe: form.sexe,
        dateNaissance: form.dateNaissance,
        parentId: form.parentId,
        parentNomAffiche: form.parentNomAffiche,
        parentTelephoneAffiche: form.parentTelephoneAffiche,
        schoolId: form.schoolId,
        niveau: form.niveau,
        classe: form.classe,
        statut: 'en_attente',
        anneeScolaire: '2026-2027',
        dateInscription: new Date().toISOString().slice(0, 10),
        documents: form.documents || [],
        fraisDossierPaye: true,
        initiales: initials(form.prenom, form.nom),
        couleur: color
      }
      this.list.push(child)
      return child
    },
    setStatus(childId, statut, motif) {
      const child = this.byId(childId)
      if (!child) return
      child.statut = statut
      if (motif) child.motifRejet = motif
      else delete child.motifRejet
    }
  }
})
