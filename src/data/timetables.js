export const creneaux = [
  '07:30 – 08:30',
  '08:30 – 09:30',
  '09:30 – 09:45',
  '09:45 – 10:45',
  '10:45 – 11:45',
  '11:45 – 12:45',
  '12:45 – 13:45',
  '13:45 – 14:30'
]

export const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']

const PAUSE = { matiere: 'Récréation', type: 'pause' }
const DEJEUNER = { matiere: 'Pause déjeuner', type: 'pause' }
const LIBRE = { matiere: 'Après-midi libre', type: 'libre' }

function cours(nom) {
  return { matiere: nom, type: 'cours' }
}

export const timetables = {
  'sch-01|CM2': {
    Lundi: [cours('Français'), cours('Mathématiques'), PAUSE, cours("Sciences d'Observation"), cours('Mathématiques'), DEJEUNER, cours('Anglais'), cours('EPS')],
    Mardi: [cours('Mathématiques'), cours('Français'), PAUSE, cours('Histoire-Géo / ECM'), cours('Français'), DEJEUNER, cours('Éducation Musicale'), cours('Étude surveillée')],
    Mercredi: [cours('Français'), cours('Mathématiques'), PAUSE, cours('Anglais'), cours("Sciences d'Observation"), LIBRE, cours('Activités sportives'), LIBRE],
    Jeudi: [cours('Mathématiques'), cours('Français'), PAUSE, cours('Histoire-Géo / ECM'), cours('Anglais'), DEJEUNER, cours('Français'), cours('EPS')],
    Vendredi: [cours('Français'), cours('Mathématiques'), PAUSE, cours("Sciences d'Observation"), cours('Histoire-Géo / ECM'), DEJEUNER, cours('Éducation Civique'), cours('Chorale')]
  },
  'sch-01|CE1': {
    Lundi: [cours('Lecture'), cours('Calcul'), PAUSE, cours('Écriture'), cours('Calcul'), DEJEUNER, cours('Anglais'), cours('EPS')],
    Mardi: [cours('Calcul'), cours('Lecture'), PAUSE, cours('Éveil Scientifique'), cours('Lecture'), DEJEUNER, cours('Écriture'), cours('Étude surveillée')],
    Mercredi: [cours('Lecture'), cours('Calcul'), PAUSE, cours('Anglais'), cours('Écriture'), LIBRE, cours('Activités sportives'), LIBRE],
    Jeudi: [cours('Calcul'), cours('Lecture'), PAUSE, cours('Éveil Scientifique'), cours('Anglais'), DEJEUNER, cours('Lecture'), cours('EPS')],
    Vendredi: [cours('Lecture'), cours('Calcul'), PAUSE, cours('Écriture'), cours('Éveil Scientifique'), DEJEUNER, cours('Chant / Poésie'), cours('Rassemblement')]
  }
}

export function timetableFor(schoolId, classe) {
  return timetables[`${schoolId}|${classe}`] || null
}
