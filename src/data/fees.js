// Échéancier de scolarité 2026-2027 (rentrée début septembre) par enfant.
// statut : 'payé' | 'en_attente' | 'à_venir'

export const feeSchedules = {
  'c-001': [
    { id: 'f-001-1', label: "Frais d'inscription 2026-2027", montant: 8000, dateLimite: '2026-09-05', statut: 'payé', datePaiement: '2026-08-20', methode: 'MTN Mobile Money' },
    { id: 'f-001-2', label: 'Scolarité — Trimestre 1', montant: 15000, dateLimite: '2026-10-15', statut: 'en_attente' },
    { id: 'f-001-3', label: 'Cantine — Septembre', montant: 6000, dateLimite: '2026-09-10', statut: 'en_attente' },
    { id: 'f-001-4', label: 'Scolarité — Trimestre 2', montant: 15000, dateLimite: '2027-01-15', statut: 'à_venir' },
    { id: 'f-001-5', label: 'Scolarité — Trimestre 3', montant: 15000, dateLimite: '2027-04-15', statut: 'à_venir' }
  ],
  'c-002': [
    { id: 'f-002-1', label: "Frais d'inscription 2026-2027", montant: 8000, dateLimite: '2026-09-05', statut: 'payé', datePaiement: '2026-08-20', methode: 'MTN Mobile Money' },
    { id: 'f-002-2', label: 'Scolarité — Trimestre 1', montant: 15000, dateLimite: '2026-10-15', statut: 'en_attente' },
    { id: 'f-002-3', label: 'Cantine — Septembre', montant: 6000, dateLimite: '2026-09-10', statut: 'en_attente' },
    { id: 'f-002-4', label: 'Scolarité — Trimestre 2', montant: 15000, dateLimite: '2027-01-15', statut: 'à_venir' },
    { id: 'f-002-5', label: 'Scolarité — Trimestre 3', montant: 15000, dateLimite: '2027-04-15', statut: 'à_venir' }
  ],
  'c-003': [
    { id: 'f-003-1', label: 'Frais de dossier (inscription)', montant: 5000, dateLimite: '2026-08-25', statut: 'payé', datePaiement: '2026-08-25', methode: 'Orange Money' },
    { id: 'f-003-2', label: 'Scolarité — Trimestre 1', montant: 8000, dateLimite: '2026-10-15', statut: 'à_venir', note: 'Disponible après validation du dossier par l’établissement' }
  ]
}

export function feeScheduleFor(childId) {
  return feeSchedules[childId] || []
}
