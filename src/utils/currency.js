export function formatFcfa(montant) {
  if (montant === null || montant === undefined) return '—'
  return new Intl.NumberFormat('fr-FR').format(montant) + ' FCFA'
}

export function formatCompactFcfa(montant) {
  if (montant === null || montant === undefined) return '—'
  if (montant >= 1000000) return `${(montant / 1000000).toFixed(1).replace('.0', '')} M FCFA`
  if (montant >= 1000) return `${Math.round(montant / 1000)} k FCFA`
  return `${montant} FCFA`
}
