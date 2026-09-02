export const regions = [
  { id: 'adamaoua', nom: 'Adamaoua', chefLieu: 'Ngaoundéré', langue: 'FR' },
  { id: 'centre', nom: 'Centre', chefLieu: 'Yaoundé', langue: 'FR' },
  { id: 'est', nom: 'Est', chefLieu: 'Bertoua', langue: 'FR' },
  { id: 'extreme-nord', nom: 'Extrême-Nord', chefLieu: 'Maroua', langue: 'FR' },
  { id: 'littoral', nom: 'Littoral', chefLieu: 'Douala', langue: 'FR' },
  { id: 'nord', nom: 'Nord', chefLieu: 'Garoua', langue: 'FR' },
  { id: 'nord-ouest', nom: 'Nord-Ouest', chefLieu: 'Bamenda', langue: 'EN' },
  { id: 'ouest', nom: 'Ouest', chefLieu: 'Bafoussam', langue: 'FR' },
  { id: 'sud', nom: 'Sud', chefLieu: 'Ebolowa', langue: 'FR' },
  { id: 'sud-ouest', nom: 'Sud-Ouest', chefLieu: 'Buea', langue: 'EN' }
]

export function regionById(id) {
  return regions.find((r) => r.id === id)
}
