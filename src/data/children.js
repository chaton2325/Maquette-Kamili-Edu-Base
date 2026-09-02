// Toutes les "fiches élève" de la maquette : celles du parent de démonstration
// (parentId: 'parent-01') ainsi que des dossiers d'autres familles simulées,
// utiles pour peupler les listes de classe et les files d'inscription côté
// Établissement / Ministère.

const DOCS_COMPLETS = [
  { nom: 'Acte de naissance', statut: 'fourni' },
  { nom: 'Certificat médical', statut: 'fourni' },
  { nom: '2 photos d\'identité', statut: 'fourni' }
]

export const children = [
  // --- Enfants du parent de démonstration ---
  {
    id: 'c-001',
    prenom: 'Junior',
    nom: 'Ngo Bella',
    sexe: 'M',
    dateNaissance: '2016-04-12',
    parentId: 'parent-01',
    parentNomAffiche: 'Mireille Ngo Bella',
    parentTelephoneAffiche: '+237 6 77 45 12 90',
    schoolId: 'sch-01',
    niveau: 'Primaire',
    classe: 'CM2',
    statut: 'validé',
    anneeScolaire: '2026-2027',
    dateInscription: '2020-09-02',
    documents: DOCS_COMPLETS,
    fraisDossierPaye: true,
    initiales: 'JN',
    couleur: '#0f766e'
  },
  {
    id: 'c-002',
    prenom: 'Merveille',
    nom: 'Ngo Bella',
    sexe: 'F',
    dateNaissance: '2018-09-03',
    parentId: 'parent-01',
    parentNomAffiche: 'Mireille Ngo Bella',
    parentTelephoneAffiche: '+237 6 77 45 12 90',
    schoolId: 'sch-01',
    niveau: 'Primaire',
    classe: 'CE1',
    statut: 'validé',
    anneeScolaire: '2026-2027',
    dateInscription: '2022-09-01',
    documents: DOCS_COMPLETS,
    fraisDossierPaye: true,
    initiales: 'MN',
    couleur: '#be123c'
  },
  {
    id: 'c-003',
    prenom: 'Divine',
    nom: 'Ngo Bella',
    sexe: 'F',
    dateNaissance: '2021-01-20',
    parentId: 'parent-01',
    parentNomAffiche: 'Mireille Ngo Bella',
    parentTelephoneAffiche: '+237 6 77 45 12 90',
    schoolId: 'sch-13',
    niveau: 'Maternelle',
    classe: 'Petite Section',
    statut: 'en_attente',
    anneeScolaire: '2026-2027',
    dateInscription: '2026-08-25',
    documents: [
      { nom: 'Acte de naissance', statut: 'fourni' },
      { nom: 'Certificat médical', statut: 'fourni' },
      { nom: "2 photos d'identité", statut: 'fourni' }
    ],
    fraisDossierPaye: true,
    initiales: 'DN',
    couleur: '#f59e0b'
  },

  // --- Camarades de classe de Junior (CM2, sch-01) ---
  { id: 'c-010', prenom: 'Christian', nom: 'Ateba', sexe: 'M', dateNaissance: '2016-02-18', parentNomAffiche: 'Paul Ateba', parentTelephoneAffiche: '+237 6 71 22 33 44', schoolId: 'sch-01', niveau: 'Primaire', classe: 'CM2', statut: 'validé', anneeScolaire: '2026-2027', dateInscription: '2020-09-02', documents: DOCS_COMPLETS, fraisDossierPaye: true, initiales: 'CA', couleur: '#2563eb' },
  { id: 'c-011', prenom: 'Larissa', nom: 'Mballa', sexe: 'F', dateNaissance: '2016-07-05', parentNomAffiche: 'Chantal Mballa', parentTelephoneAffiche: '+237 6 72 33 44 55', schoolId: 'sch-01', niveau: 'Primaire', classe: 'CM2', statut: 'validé', anneeScolaire: '2026-2027', dateInscription: '2020-09-02', documents: DOCS_COMPLETS, fraisDossierPaye: true, initiales: 'LM', couleur: '#be185d' },
  { id: 'c-012', prenom: 'Brice', nom: 'Onana', sexe: 'M', dateNaissance: '2016-01-30', parentNomAffiche: 'Vincent Onana', parentTelephoneAffiche: '+237 6 73 44 55 66', schoolId: 'sch-01', niveau: 'Primaire', classe: 'CM2', statut: 'validé', anneeScolaire: '2026-2027', dateInscription: '2020-09-02', documents: DOCS_COMPLETS, fraisDossierPaye: true, initiales: 'BO', couleur: '#0891b2' },
  { id: 'c-013', prenom: 'Nadège', nom: 'Essomba', sexe: 'F', dateNaissance: '2016-05-22', parentNomAffiche: 'Julienne Essomba', parentTelephoneAffiche: '+237 6 74 55 66 77', schoolId: 'sch-01', niveau: 'Primaire', classe: 'CM2', statut: 'validé', anneeScolaire: '2026-2027', dateInscription: '2020-09-02', documents: DOCS_COMPLETS, fraisDossierPaye: true, initiales: 'NE', couleur: '#7c3aed' },
  { id: 'c-014', prenom: 'Cédric', nom: 'Fouda', sexe: 'M', dateNaissance: '2016-11-11', parentNomAffiche: 'Marcel Fouda', parentTelephoneAffiche: '+237 6 75 66 77 88', schoolId: 'sch-01', niveau: 'Primaire', classe: 'CM2', statut: 'validé', anneeScolaire: '2026-2027', dateInscription: '2020-09-02', documents: DOCS_COMPLETS, fraisDossierPaye: true, initiales: 'CF', couleur: '#059669' },
  { id: 'c-015', prenom: 'Grace', nom: 'Mendo', sexe: 'F', dateNaissance: '2016-03-09', parentNomAffiche: 'Estelle Mendo', parentTelephoneAffiche: '+237 6 76 77 88 99', schoolId: 'sch-01', niveau: 'Primaire', classe: 'CM2', statut: 'validé', anneeScolaire: '2026-2027', dateInscription: '2020-09-02', documents: DOCS_COMPLETS, fraisDossierPaye: true, initiales: 'GM', couleur: '#d97706' },
  { id: 'c-016', prenom: 'Emmanuel', nom: 'Zang', sexe: 'M', dateNaissance: '2016-08-14', parentNomAffiche: 'Ferdinand Zang', parentTelephoneAffiche: '+237 6 77 88 99 00', schoolId: 'sch-01', niveau: 'Primaire', classe: 'CM2', statut: 'validé', anneeScolaire: '2026-2027', dateInscription: '2020-09-02', documents: DOCS_COMPLETS, fraisDossierPaye: true, initiales: 'EZ', couleur: '#4338ca' },

  // --- Camarades de classe de Merveille (CE1, sch-01) ---
  { id: 'c-020', prenom: 'Franck', nom: 'Bikoro', sexe: 'M', dateNaissance: '2018-02-02', parentNomAffiche: 'Serge Bikoro', parentTelephoneAffiche: '+237 6 78 11 22 33', schoolId: 'sch-01', niveau: 'Primaire', classe: 'CE1', statut: 'validé', anneeScolaire: '2026-2027', dateInscription: '2022-09-01', documents: DOCS_COMPLETS, fraisDossierPaye: true, initiales: 'FB', couleur: '#2563eb' },
  { id: 'c-021', prenom: 'Prisca', nom: 'Abomo', sexe: 'F', dateNaissance: '2018-06-19', parentNomAffiche: 'Delphine Abomo', parentTelephoneAffiche: '+237 6 79 22 33 44', schoolId: 'sch-01', niveau: 'Primaire', classe: 'CE1', statut: 'validé', anneeScolaire: '2026-2027', dateInscription: '2022-09-01', documents: DOCS_COMPLETS, fraisDossierPaye: true, initiales: 'PA', couleur: '#be185d' },
  { id: 'c-022', prenom: 'Yannick', nom: 'Mvogo', sexe: 'M', dateNaissance: '2018-10-27', parentNomAffiche: 'Alain Mvogo', parentTelephoneAffiche: '+237 6 80 33 44 55', schoolId: 'sch-01', niveau: 'Primaire', classe: 'CE1', statut: 'validé', anneeScolaire: '2026-2027', dateInscription: '2022-09-01', documents: DOCS_COMPLETS, fraisDossierPaye: true, initiales: 'YM', couleur: '#0891b2' },
  { id: 'c-023', prenom: 'Clarisse', nom: 'Owoundi', sexe: 'F', dateNaissance: '2018-01-15', parentNomAffiche: 'Bernadette Owoundi', parentTelephoneAffiche: '+237 6 81 44 55 66', schoolId: 'sch-01', niveau: 'Primaire', classe: 'CE1', statut: 'validé', anneeScolaire: '2026-2027', dateInscription: '2022-09-01', documents: DOCS_COMPLETS, fraisDossierPaye: true, initiales: 'CO', couleur: '#7c3aed' },
  { id: 'c-024', prenom: 'Hervé', nom: 'Nkolo', sexe: 'M', dateNaissance: '2018-12-08', parentNomAffiche: 'Théodore Nkolo', parentTelephoneAffiche: '+237 6 82 55 66 77', schoolId: 'sch-01', niveau: 'Primaire', classe: 'CE1', statut: 'validé', anneeScolaire: '2026-2027', dateInscription: '2022-09-01', documents: DOCS_COMPLETS, fraisDossierPaye: true, initiales: 'HN', couleur: '#059669' },
  { id: 'c-025', prenom: 'Odette', nom: 'Same', sexe: 'F', dateNaissance: '2018-04-25', parentNomAffiche: 'Léonie Same', parentTelephoneAffiche: '+237 6 83 66 77 88', schoolId: 'sch-01', niveau: 'Primaire', classe: 'CE1', statut: 'validé', anneeScolaire: '2026-2027', dateInscription: '2022-09-01', documents: DOCS_COMPLETS, fraisDossierPaye: true, initiales: 'OS', couleur: '#d97706' },

  // --- Inscriptions en attente / rejetées, réparties dans le pays (rentrée 2026-2027) ---
  { id: 'c-030', prenom: 'Aïcha', nom: 'Oumarou', sexe: 'F', dateNaissance: '2020-03-11', parentNomAffiche: 'Fatimatou Oumarou', parentTelephoneAffiche: '+237 6 95 10 20 30', schoolId: 'sch-09', niveau: 'Primaire', classe: 'SIL', statut: 'en_attente', anneeScolaire: '2026-2027', dateInscription: '2026-08-30', documents: DOCS_COMPLETS, fraisDossierPaye: true, initiales: 'AO', couleur: '#0f766e' },
  { id: 'c-031', prenom: 'Ibrahim', nom: 'Bello', sexe: 'M', dateNaissance: '2020-06-02', parentNomAffiche: 'Alhadji Moussa Bello', parentTelephoneAffiche: '+237 6 96 20 30 40', schoolId: 'sch-10', niveau: 'Primaire', classe: 'SIL', statut: 'en_attente', anneeScolaire: '2026-2027', dateInscription: '2026-09-01', documents: DOCS_COMPLETS, fraisDossierPaye: true, initiales: 'IB', couleur: '#0f766e' },
  { id: 'c-032', prenom: 'Solange', nom: 'Tchana', sexe: 'F', dateNaissance: '2019-09-14', parentNomAffiche: 'Robert Tchana', parentTelephoneAffiche: '+237 6 79 30 88 41', schoolId: 'sch-05', niveau: 'Primaire', classe: 'SIP', statut: 'en_attente', anneeScolaire: '2026-2027', dateInscription: '2026-08-28', documents: DOCS_COMPLETS, fraisDossierPaye: true, initiales: 'ST', couleur: '#0f766e' },
  { id: 'c-033', prenom: 'Blaise', nom: 'Ekema', sexe: 'M', dateNaissance: '2020-01-09', parentNomAffiche: 'Peter Ekema Jr', parentTelephoneAffiche: '+237 6 71 05 63 18', schoolId: 'sch-07', niveau: 'Primaire', classe: 'Class 1', statut: 'en_attente', anneeScolaire: '2026-2027', dateInscription: '2026-08-29', documents: DOCS_COMPLETS, fraisDossierPaye: true, initiales: 'BE', couleur: '#0f766e' },
  { id: 'c-034', prenom: 'Comfort', nom: 'Nyamsi', sexe: 'F', dateNaissance: '2020-05-17', parentNomAffiche: 'Comfort Ashu Nyamsi', parentTelephoneAffiche: '+237 6 78 61 22 90', schoolId: 'sch-06', niveau: 'Primaire', classe: 'Class 1', statut: 'en_attente', anneeScolaire: '2026-2027', dateInscription: '2026-09-02', documents: DOCS_COMPLETS, fraisDossierPaye: true, initiales: 'CN', couleur: '#0f766e' },
  { id: 'c-036', prenom: 'Rodrigue', nom: 'Mbarga', sexe: 'M', dateNaissance: '2019-11-23', parentNomAffiche: 'Gaston Mbarga', parentTelephoneAffiche: '+237 6 80 55 91 47', schoolId: 'sch-11', niveau: 'Primaire', classe: 'SIP', statut: 'en_attente', anneeScolaire: '2026-2027', dateInscription: '2026-08-31', documents: DOCS_COMPLETS, fraisDossierPaye: true, initiales: 'RM', couleur: '#0f766e' },
  { id: 'c-037', prenom: 'Océane', nom: 'Nnomo', sexe: 'F', dateNaissance: '2020-02-06', parentNomAffiche: 'Bernadette Nnomo', parentTelephoneAffiche: '+237 6 83 17 62 94', schoolId: 'sch-12', niveau: 'Primaire', classe: 'SIL', statut: 'en_attente', anneeScolaire: '2026-2027', dateInscription: '2026-08-26', documents: DOCS_COMPLETS, fraisDossierPaye: true, initiales: 'ON', couleur: '#0f766e' },
  { id: 'c-038', prenom: 'Junior', nom: 'Boukar', sexe: 'M', dateNaissance: '2019-07-30', parentNomAffiche: 'Alhadji Boukar', parentTelephoneAffiche: '+237 6 98 27 39 05', schoolId: 'sch-10', niveau: 'Primaire', classe: 'SIP', statut: 'rejeté', motifRejet: 'Acte de naissance illisible — à soumettre à nouveau', anneeScolaire: '2026-2027', dateInscription: '2026-08-20', documents: [{ nom: 'Acte de naissance', statut: 'à corriger' }, { nom: 'Certificat médical', statut: 'fourni' }, { nom: "2 photos d'identité", statut: 'fourni' }], fraisDossierPaye: true, initiales: 'JB', couleur: '#dc2626' }
]

export function childById(id) {
  return children.find((c) => c.id === id)
}

export function childrenByParent(parentId) {
  return children.filter((c) => c.parentId === parentId)
}

export function childrenBySchool(schoolId) {
  return children.filter((c) => c.schoolId === schoolId)
}

export function childrenByClass(schoolId, classe) {
  return children.filter((c) => c.schoolId === schoolId && c.classe === classe)
}

export function pendingChildren() {
  return children.filter((c) => c.statut === 'en_attente')
}
