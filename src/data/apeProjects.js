// Projets financés par les cotisations APE. Pas de vraies photos dans cette
// maquette : chaque projet a une icône + une couleur pour rester léger et
// éviter des images cassées.

export const apeProjects = [
  {
    id: 'proj-01', schoolId: 'sch-01', titre: 'Construction de 2 salles de classe',
    description: "Deux nouvelles salles pour réduire les effectifs par classe (46 à 38 élèves visés).",
    icon: 'building-2', couleur: '#0f766e', statut: 'En cours',
    budgetTotal: 4500000, montantCollecte: 3150000,
    dateDebut: '2026-02-01', dateFinPrevue: '2026-12-15',
    journal: [
      { date: '2026-08-15', texte: 'Toiture posée, finitions intérieures en cours.' },
      { date: '2026-05-10', texte: 'Murs achevés, passage à la charpente.' },
      { date: '2026-02-01', texte: 'Pose de la première pierre par le bureau APE.' }
    ]
  },
  {
    id: 'proj-02', schoolId: 'sch-01', titre: "Forage d'un point d'eau potable",
    description: "Accès à l'eau potable pour les 612 élèves et le personnel.",
    icon: 'droplets', couleur: '#0891b2', statut: 'Terminé',
    budgetTotal: 1800000, montantCollecte: 1800000,
    dateDebut: '2025-03-01', dateFinPrevue: '2025-08-20',
    journal: [{ date: '2025-08-20', texte: 'Forage réceptionné et mis en service.' }]
  },
  {
    id: 'proj-03', schoolId: 'sch-02', titre: 'Bibliothèque scolaire numérique',
    description: 'Salle de lecture équipée de tablettes pour les classes de CM1-CM2.',
    icon: 'book-open', couleur: '#7c3aed', statut: 'En cours',
    budgetTotal: 3200000, montantCollecte: 2000000,
    dateDebut: '2026-01-10', dateFinPrevue: '2026-11-30',
    journal: [{ date: '2026-07-01', texte: 'Mobilier livré, achat des tablettes en cours.' }]
  },
  {
    id: 'proj-04', schoolId: 'sch-03', titre: 'Réfection de la toiture du bloc B',
    description: 'Remplacement des tôles endommagées par les intempéries.',
    icon: 'hammer', couleur: '#b45309', statut: 'Planifié',
    budgetTotal: 2500000, montantCollecte: 600000,
    dateDebut: '2026-11-01', dateFinPrevue: '2027-02-28', journal: []
  },
  {
    id: 'proj-05', schoolId: 'sch-04', titre: 'Bloc sanitaire — 6 cabines',
    description: 'Latrines séparées filles/garçons avec point de lavage des mains.',
    icon: 'droplets', couleur: '#0891b2', statut: 'Terminé',
    budgetTotal: 2000000, montantCollecte: 2000000,
    dateDebut: '2025-04-01', dateFinPrevue: '2025-09-01', journal: []
  },
  {
    id: 'proj-06', schoolId: 'sch-05', titre: "Clôture de sécurité de l'école",
    description: "Clôture en parpaings pour sécuriser l'enceinte scolaire.",
    icon: 'shield', couleur: '#334155', statut: 'En cours',
    budgetTotal: 3000000, montantCollecte: 1200000,
    dateDebut: '2026-04-01', dateFinPrevue: '2027-01-31', journal: []
  },
  {
    id: 'proj-07', schoolId: 'sch-06', titre: 'Terrain de sport multifonction',
    description: 'Terrain de football/basketball pour les activités EPS.',
    icon: 'trophy', couleur: '#ca8a04', statut: 'Planifié',
    budgetTotal: 2800000, montantCollecte: 500000,
    dateDebut: '2027-01-15', dateFinPrevue: '2027-06-30', journal: []
  },
  {
    id: 'proj-08', schoolId: 'sch-07', titre: 'Réhabilitation de 4 salles de classe',
    description: 'Réfection sols, peinture et menuiserie de 4 salles vétustes.',
    icon: 'building-2', couleur: '#0f766e', statut: 'En cours',
    budgetTotal: 5000000, montantCollecte: 2100000,
    dateDebut: '2026-03-01', dateFinPrevue: '2027-02-28', journal: []
  },
  {
    id: 'proj-09', schoolId: 'sch-08', titre: "Forage d'eau potable",
    description: "Réduire les longues distances de collecte d'eau pour les élèves.",
    icon: 'droplets', couleur: '#0891b2', statut: 'Planifié',
    budgetTotal: 1900000, montantCollecte: 300000,
    dateDebut: '2027-02-01', dateFinPrevue: '2027-07-31', journal: []
  },
  {
    id: 'proj-10', schoolId: 'sch-10', titre: 'Cantine scolaire communautaire',
    description: 'Cuisine et réfectoire pour un repas chaud quotidien.',
    icon: 'utensils', couleur: '#dc2626', statut: 'En cours',
    budgetTotal: 2200000, montantCollecte: 900000,
    dateDebut: '2026-05-01', dateFinPrevue: '2027-03-31', journal: []
  },
  {
    id: 'proj-11', schoolId: 'sch-13', titre: 'Aire de jeux pour la maternelle',
    description: 'Toboggans, balançoires et sol souple sécurisé.',
    icon: 'baby', couleur: '#f59e0b', statut: 'En cours',
    budgetTotal: 1200000, montantCollecte: 700000,
    dateDebut: '2026-06-01', dateFinPrevue: '2026-12-20', journal: []
  },
  {
    id: 'proj-12', schoolId: 'sch-14', titre: "Panneaux solaires pour l'école",
    description: 'Alimentation électrique autonome pour les salles informatiques.',
    icon: 'sun', couleur: '#eab308', statut: 'Terminé',
    budgetTotal: 3500000, montantCollecte: 3500000,
    dateDebut: '2025-09-01', dateFinPrevue: '2026-02-28', journal: []
  },
  {
    id: 'proj-13', schoolId: 'sch-11', titre: 'Reboisement et espaces verts',
    description: "Plantation d'arbres pour l'ombrage de la cour de récréation.",
    icon: 'trees', couleur: '#16a34a', statut: 'Planifié',
    budgetTotal: 800000, montantCollecte: 150000,
    dateDebut: '2027-03-01', dateFinPrevue: '2027-05-31', journal: []
  },
  {
    id: 'proj-14', schoolId: 'sch-09', titre: 'Construction d’un mur de clôture',
    description: "Sécurisation du périmètre de l'école face à la route nationale.",
    icon: 'shield', couleur: '#334155', statut: 'En cours',
    budgetTotal: 2600000, montantCollecte: 1100000,
    dateDebut: '2026-04-15', dateFinPrevue: '2027-01-15', journal: []
  }
]

export function projectsBySchool(schoolId) {
  return apeProjects.filter((p) => p.schoolId === schoolId)
}

export function projectById(id) {
  return apeProjects.find((p) => p.id === id)
}
