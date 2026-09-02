// Statistiques nationales simulées pour le tableau de bord du Ministère et
// les comparaisons parent (résultat de l'enfant vs moyenne nationale/école).

export const nationalTrend = [
  { annee: '2022', tauxReussiteCEP: 71, tauxScolarisation: 84, tauxParite: 96 },
  { annee: '2023', tauxReussiteCEP: 73, tauxScolarisation: 85, tauxParite: 97 },
  { annee: '2024', tauxReussiteCEP: 75, tauxScolarisation: 86, tauxParite: 97 },
  { annee: '2025', tauxReussiteCEP: 76, tauxScolarisation: 87, tauxParite: 98 },
  { annee: '2026', tauxReussiteCEP: 79, tauxScolarisation: 88, tauxParite: 98 }
]

export const nationalSummary = {
  anneeScolaire: '2026-2027',
  totalEleves: 1725000,
  totalEtablissements: 11946,
  totalEnseignants: 46200,
  ratioElevesParEnseignant: 37,
  tauxReussiteCEP: 79,
  tauxScolarisation: 88,
  tauxParite: 98,
  evolutionReussite: 3
}

export const regionStats = {
  centre: { nombreEcoles: 1836, effectifEleves: 285000, tauxReussiteCEP: 85, tauxScolarisation: 93, tauxParite: 99, evolution: 2 },
  littoral: { nombreEcoles: 1620, effectifEleves: 260000, tauxReussiteCEP: 84, tauxScolarisation: 92, tauxParite: 99, evolution: 2 },
  ouest: { nombreEcoles: 1440, effectifEleves: 210000, tauxReussiteCEP: 80, tauxScolarisation: 89, tauxParite: 98, evolution: 3 },
  'nord-ouest': { nombreEcoles: 1170, effectifEleves: 150000, tauxReussiteCEP: 74, tauxScolarisation: 81, tauxParite: 97, evolution: 1 },
  'sud-ouest': { nombreEcoles: 1080, effectifEleves: 140000, tauxReussiteCEP: 73, tauxScolarisation: 80, tauxParite: 97, evolution: 1 },
  sud: { nombreEcoles: 900, effectifEleves: 95000, tauxReussiteCEP: 77, tauxScolarisation: 86, tauxParite: 98, evolution: 4 },
  est: { nombreEcoles: 840, effectifEleves: 90000, tauxReussiteCEP: 70, tauxScolarisation: 78, tauxParite: 95, evolution: 3 },
  adamaoua: { nombreEcoles: 780, effectifEleves: 100000, tauxReussiteCEP: 66, tauxScolarisation: 74, tauxParite: 90, evolution: 2 },
  nord: { nombreEcoles: 1020, effectifEleves: 170000, tauxReussiteCEP: 61, tauxScolarisation: 68, tauxParite: 85, evolution: 5 },
  'extreme-nord': { nombreEcoles: 1260, effectifEleves: 220000, tauxReussiteCEP: 58, tauxScolarisation: 63, tauxParite: 82, evolution: 4 }
}

export function regionStat(regionId) {
  return regionStats[regionId] || null
}
