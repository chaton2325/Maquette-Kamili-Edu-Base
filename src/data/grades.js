// Résultats scolaires simulés. L'année 2025-2026 est terminée (3 trimestres,
// résultat annuel + décision de passage) ; l'année 2026-2027 vient de démarrer
// (rentrée début septembre) donc aucune note n'est encore disponible.

export const bulletins = {
  'c-001': {
    classeActuelle: 'CM2',
    annees: [
      {
        anneeScolaire: '2025-2026',
        classe: 'CM1',
        effectifClasse: 44,
        trimestres: [
          {
            numero: 1,
            matieres: [
              { nom: 'Français', note: 14, bareme: 20 },
              { nom: 'Mathématiques', note: 15, bareme: 20 },
              { nom: "Sciences d'Observation", note: 13, bareme: 20 },
              { nom: 'Histoire-Géo / ECM', note: 14, bareme: 20 },
              { nom: 'Anglais', note: 13, bareme: 20 },
              { nom: 'Éducation Physique et Sportive', note: 16, bareme: 20 },
              { nom: 'Éducation Musicale', note: 14, bareme: 20 }
            ],
            moyenneGenerale: 14.1,
            rang: 5,
            mention: 'Assez Bien',
            appreciation: "Bon trimestre, doit gagner en confiance à l'oral en anglais."
          },
          {
            numero: 2,
            matieres: [
              { nom: 'Français', note: 15, bareme: 20 },
              { nom: 'Mathématiques', note: 16, bareme: 20 },
              { nom: "Sciences d'Observation", note: 14, bareme: 20 },
              { nom: 'Histoire-Géo / ECM', note: 15, bareme: 20 },
              { nom: 'Anglais', note: 14, bareme: 20 },
              { nom: 'Éducation Physique et Sportive', note: 17, bareme: 20 },
              { nom: 'Éducation Musicale', note: 15, bareme: 20 }
            ],
            moyenneGenerale: 15.1,
            rang: 4,
            mention: 'Bien',
            appreciation: 'Progrès nets, élève appliqué et régulier.'
          },
          {
            numero: 3,
            matieres: [
              { nom: 'Français', note: 16, bareme: 20 },
              { nom: 'Mathématiques', note: 17, bareme: 20 },
              { nom: "Sciences d'Observation", note: 15, bareme: 20 },
              { nom: 'Histoire-Géo / ECM', note: 16, bareme: 20 },
              { nom: 'Anglais', note: 15, bareme: 20 },
              { nom: 'Éducation Physique et Sportive', note: 18, bareme: 20 },
              { nom: 'Éducation Musicale', note: 16, bareme: 20 }
            ],
            moyenneGenerale: 16.1,
            rang: 2,
            mention: 'Très Bien',
            appreciation: 'Excellent trimestre, félicitations du conseil de classe.'
          }
        ],
        resultatAnnuel: { moyenneGenerale: 15.1, rang: 3, mention: 'Bien', decision: 'Admis en classe de CM2' }
      },
      { anneeScolaire: '2026-2027', classe: 'CM2', effectifClasse: 46, trimestres: [], resultatAnnuel: null }
    ]
  },
  'c-002': {
    classeActuelle: 'CE1',
    annees: [
      {
        anneeScolaire: '2025-2026',
        classe: 'SIP',
        effectifClasse: 40,
        trimestres: [
          {
            numero: 1,
            matieres: [
              { nom: 'Lecture', note: 14, bareme: 20 },
              { nom: 'Écriture', note: 13, bareme: 20 },
              { nom: 'Calcul', note: 15, bareme: 20 },
              { nom: "Éveil Scientifique", note: 14, bareme: 20 },
              { nom: 'Anglais', note: 13, bareme: 20 },
              { nom: 'Éducation Physique et Sportive', note: 16, bareme: 20 }
            ],
            moyenneGenerale: 14.2,
            rang: 4,
            mention: 'Bien',
            appreciation: 'Bonne participation en classe, écriture à consolider.'
          },
          {
            numero: 2,
            matieres: [
              { nom: 'Lecture', note: 15, bareme: 20 },
              { nom: 'Écriture', note: 14, bareme: 20 },
              { nom: 'Calcul', note: 16, bareme: 20 },
              { nom: "Éveil Scientifique", note: 15, bareme: 20 },
              { nom: 'Anglais', note: 14, bareme: 20 },
              { nom: 'Éducation Physique et Sportive', note: 17, bareme: 20 }
            ],
            moyenneGenerale: 15.2,
            rang: 3,
            mention: 'Bien',
            appreciation: 'Élève sérieuse, belle progression en calcul.'
          },
          {
            numero: 3,
            matieres: [
              { nom: 'Lecture', note: 16, bareme: 20 },
              { nom: 'Écriture', note: 15, bareme: 20 },
              { nom: 'Calcul', note: 17, bareme: 20 },
              { nom: "Éveil Scientifique", note: 16, bareme: 20 },
              { nom: 'Anglais', note: 15, bareme: 20 },
              { nom: 'Éducation Physique et Sportive', note: 18, bareme: 20 }
            ],
            moyenneGenerale: 16.2,
            rang: 2,
            mention: 'Très Bien',
            appreciation: "Très bon trimestre, continuez ainsi !"
          }
        ],
        resultatAnnuel: { moyenneGenerale: 15.2, rang: 3, mention: 'Bien', decision: 'Admise en classe de CE1' }
      },
      { anneeScolaire: '2026-2027', classe: 'CE1', effectifClasse: 43, trimestres: [], resultatAnnuel: null }
    ]
  }
}

export function bulletinByChild(childId) {
  return bulletins[childId] || null
}

// Classement de fin d'année 2025-2026 (avant passage en classe supérieure),
// pour les vues Établissement / Ministère — extrait numérisé de la classe.
export const classRosters = {
  'sch-01|CM2': [
    { childId: 'c-013', moyenne: 17.0, rangClasse: 1 },
    { childId: 'c-010', moyenne: 16.3, rangClasse: 2 },
    { childId: 'c-001', moyenne: 15.1, rangClasse: 3 },
    { childId: 'c-015', moyenne: 14.5, rangClasse: 6 },
    { childId: 'c-011', moyenne: 14.0, rangClasse: 9 },
    { childId: 'c-016', moyenne: 13.3, rangClasse: 14 },
    { childId: 'c-012', moyenne: 12.7, rangClasse: 20 },
    { childId: 'c-014', moyenne: 11.4, rangClasse: 30 }
  ],
  'sch-01|CE1': [
    { childId: 'c-021', moyenne: 16.8, rangClasse: 1 },
    { childId: 'c-002', moyenne: 15.2, rangClasse: 3 },
    { childId: 'c-023', moyenne: 15.0, rangClasse: 4 },
    { childId: 'c-020', moyenne: 14.2, rangClasse: 8 },
    { childId: 'c-025', moyenne: 13.5, rangClasse: 15 },
    { childId: 'c-022', moyenne: 12.9, rangClasse: 19 },
    { childId: 'c-024', moyenne: 11.8, rangClasse: 27 }
  ]
}

export function rosterByClass(schoolId, classe) {
  return classRosters[`${schoolId}|${classe}`] || []
}
