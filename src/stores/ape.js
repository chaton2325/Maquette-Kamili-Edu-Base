import { defineStore } from 'pinia'
import { apeContributions as seedContributions, apeSchoolSummary } from '@/data/apeContributions'
import { apeProjects as seedProjects } from '@/data/apeProjects'

export const useApeStore = defineStore('ape', {
  state: () => ({
    contributions: JSON.parse(JSON.stringify(seedContributions)),
    projects: JSON.parse(JSON.stringify(seedProjects)),
    summaries: apeSchoolSummary
  }),
  getters: {
    contributionFor: (state) => (parentId, schoolId) => state.contributions[`${parentId}|${schoolId}`] || null,
    contributionsForParent: (state) => (parentId) =>
      Object.values(state.contributions).filter((c) => c.parentId === parentId),
    projectsBySchool: (state) => (schoolId) => state.projects.filter((p) => p.schoolId === schoolId),
    projectById: (state) => (id) => state.projects.find((p) => p.id === id),
    summaryForSchool: (state) => (schoolId) => state.summaries[schoolId] || null
  },
  actions: {
    payContribution(parentId, schoolId, methode) {
      const key = `${parentId}|${schoolId}`
      const contrib = this.contributions[key]
      if (!contrib) return
      contrib.statut = 'payé'
      contrib.historique.unshift({
        anneeScolaire: contrib.anneeScolaire,
        montant: contrib.montant,
        datePaiement: new Date().toISOString().slice(0, 10),
        methode,
        statut: 'payé'
      })
    },
    addProjectUpdate(projectId, { montant, texte, statut }) {
      const project = this.projectById(projectId)
      if (!project) return
      if (montant) project.montantCollecte = Math.min(project.budgetTotal, project.montantCollecte + montant)
      if (statut) project.statut = statut
      project.journal.unshift({ date: new Date().toISOString().slice(0, 10), texte })
    },
    createProject(schoolId, form) {
      const project = {
        id: `proj-${Date.now()}`,
        schoolId,
        titre: form.titre,
        description: form.description,
        icon: form.icon || 'building-2',
        couleur: form.couleur || '#0f766e',
        statut: 'Planifié',
        budgetTotal: form.budgetTotal,
        montantCollecte: 0,
        dateDebut: form.dateDebut,
        dateFinPrevue: form.dateFinPrevue,
        journal: [{ date: new Date().toISOString().slice(0, 10), texte: 'Projet créé par le bureau APE.' }]
      }
      this.projects.unshift(project)
      return project
    }
  }
})
