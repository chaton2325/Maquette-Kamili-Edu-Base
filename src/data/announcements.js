export const announcements = [
  { id: 'a-01', niveau: 'national', auteur: 'MINEDUB', schoolId: null, titre: 'Rentrée scolaire 2026-2027 fixée au 1er septembre', contenu: "Le Ministère de l'Éducation de Base confirme la rentrée des classes sur toute l'étendue du territoire.", date: '2026-08-20', importante: true },
  { id: 'a-02', niveau: 'national', auteur: 'MINEDUB', schoolId: null, titre: 'Gratuité des frais d’inscription maintenue dans le public', contenu: "Aucun frais d'inscription ne doit être exigé dans les écoles publiques pour l'année 2026-2027.", date: '2026-08-22', importante: true },
  { id: 'a-03', niveau: 'national', auteur: 'MINEDUB', schoolId: null, titre: 'Campagne nationale de vaccination scolaire', contenu: 'Du 8 au 12 septembre, une campagne de vaccination sera organisée dans les établissements de base.', date: '2026-08-28', importante: false },
  { id: 'a-04', niveau: 'national', auteur: 'MINEDUB', schoolId: null, titre: 'Résultats du CEP — session 2026', contenu: 'Le taux de réussite national au Certificat d’Études Primaires s’établit à 79 %, en hausse de 3 points.', date: '2026-07-10', importante: false },
  { id: 'a-05', niveau: 'national', auteur: 'MINEDUB', schoolId: null, titre: 'Programme national de cantines scolaires', contenu: 'Extension du programme de cantines à 120 écoles supplémentaires pour la rentrée 2026-2027.', date: '2026-06-15', importante: false },
  { id: 'a-06', niveau: 'ecole', auteur: 'École Publique de Nkolbisson', schoolId: 'sch-01', titre: 'Réunion des parents d’élèves', contenu: 'Réunion générale le samedi 12 septembre à 9h dans la cour principale.', date: '2026-08-30', importante: true },
  { id: 'a-07', niveau: 'ecole', auteur: 'École Publique de Nkolbisson', schoolId: 'sch-01', titre: 'Liste des fournitures scolaires 2026-2027', contenu: 'La liste des fournitures par niveau est disponible auprès des enseignants.', date: '2026-08-18', importante: false },
  { id: 'a-08', niveau: 'ecole', auteur: 'École Publique de Nkolbisson', schoolId: 'sch-01', titre: 'Assemblée générale APE', contenu: 'Élection du nouveau bureau APE le 19 septembre à 14h.', date: '2026-09-01', importante: true },
  { id: 'a-09', niveau: 'ecole', auteur: "Maternelle Publique d'Efoulan", schoolId: 'sch-13', titre: 'Journée portes ouvertes', contenu: 'Venez découvrir les classes et rencontrer les enseignantes le 5 septembre.', date: '2026-08-25', importante: false },
  { id: 'a-10', niveau: 'ecole', auteur: 'École Publique de Nkolbisson', schoolId: 'sch-01', titre: 'Reprise des cours de soutien', contenu: 'Les cours de soutien du mercredi reprennent dès le 15 septembre.', date: '2026-09-02', importante: false }
]

export function announcementsFor({ role, schoolIds = [] }) {
  return announcements
    .filter((a) => a.niveau === 'national' || (role !== 'parent' ? true : schoolIds.includes(a.schoolId)))
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}
