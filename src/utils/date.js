export function formatDate(iso, options = { day: 'numeric', month: 'short', year: 'numeric' }) {
  if (!iso) return '—'
  return new Intl.DateTimeFormat('fr-FR', options).format(new Date(iso))
}

export function formatDateLong(iso) {
  return formatDate(iso, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

export function timeAgo(iso) {
  const diffMs = Date.now() - new Date(iso).getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays <= 0) return "aujourd'hui"
  if (diffDays === 1) return 'hier'
  if (diffDays < 7) return `il y a ${diffDays} j`
  if (diffDays < 30) return `il y a ${Math.floor(diffDays / 7)} sem.`
  return formatDate(iso)
}
