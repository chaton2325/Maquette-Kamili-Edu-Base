// Cotisations APE (Association des Parents d'Élèves) — une cotisation par
// famille et par établissement fréquenté, pour l'année en cours.

export const apeContributions = {
  'parent-01|sch-01': {
    parentId: 'parent-01',
    schoolId: 'sch-01',
    anneeScolaire: '2026-2027',
    montant: 5000,
    dateLimite: '2026-10-31',
    statut: 'en_attente',
    historique: [
      { anneeScolaire: '2025-2026', montant: 5000, datePaiement: '2025-10-12', methode: 'Orange Money', statut: 'payé' },
      { anneeScolaire: '2024-2025', montant: 4500, datePaiement: '2024-11-02', methode: 'Espèces (reçu école)', statut: 'payé' }
    ]
  },
  'parent-01|sch-13': {
    parentId: 'parent-01',
    schoolId: 'sch-13',
    anneeScolaire: '2026-2027',
    montant: 3000,
    statut: 'à_venir',
    note: 'Disponible après validation du dossier d’inscription',
    historique: []
  }
}

// Agrégats par établissement, utilisés dans les tableaux de bord
// Établissement et Ministère (transparence financière APE).
export const apeSchoolSummary = {
  'sch-01': { nombreFamilles: 360, cotisation: 5000, tauxParticipation: 82, montantCollecte: 1476000, montantAttendu: 1800000 },
  'sch-02': { nombreFamilles: 200, cotisation: 8000, tauxParticipation: 91, montantCollecte: 1456000, montantAttendu: 1600000 },
  'sch-03': { nombreFamilles: 320, cotisation: 5000, tauxParticipation: 75, montantCollecte: 1200000, montantAttendu: 1600000 },
  'sch-04': { nombreFamilles: 240, cotisation: 9000, tauxParticipation: 93, montantCollecte: 2008800, montantAttendu: 2160000 },
  'sch-05': { nombreFamilles: 225, cotisation: 4500, tauxParticipation: 70, montantCollecte: 708750, montantAttendu: 1012500 },
  'sch-06': { nombreFamilles: 180, cotisation: 6000, tauxParticipation: 88, montantCollecte: 950400, montantAttendu: 1080000 },
  'sch-07': { nombreFamilles: 205, cotisation: 5000, tauxParticipation: 65, montantCollecte: 666250, montantAttendu: 1025000 },
  'sch-08': { nombreFamilles: 170, cotisation: 4000, tauxParticipation: 55, montantCollecte: 374000, montantAttendu: 680000 },
  'sch-09': { nombreFamilles: 240, cotisation: 4000, tauxParticipation: 50, montantCollecte: 480000, montantAttendu: 960000 },
  'sch-10': { nombreFamilles: 270, cotisation: 3500, tauxParticipation: 48, montantCollecte: 453600, montantAttendu: 945000 },
  'sch-11': { nombreFamilles: 155, cotisation: 4000, tauxParticipation: 60, montantCollecte: 372000, montantAttendu: 620000 },
  'sch-12': { nombreFamilles: 140, cotisation: 4500, tauxParticipation: 72, montantCollecte: 453600, montantAttendu: 630000 },
  'sch-13': { nombreFamilles: 110, cotisation: 3000, tauxParticipation: 68, montantCollecte: 224400, montantAttendu: 330000 },
  'sch-14': { nombreFamilles: 290, cotisation: 8000, tauxParticipation: 89, montantCollecte: 2064800, montantAttendu: 2320000 }
}

export function apeContributionFor(parentId, schoolId) {
  return apeContributions[`${parentId}|${schoolId}`] || null
}

export function apeSummaryForSchool(schoolId) {
  return apeSchoolSummary[schoolId] || null
}
