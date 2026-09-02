const PREFIX = 'kamili-educ:'

export function loadState(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function saveState(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // stockage indisponible (navigation privée, quota) — on ignore silencieusement
  }
}

export function persistStore(store, key, pick) {
  store.$subscribe(() => {
    saveState(key, pick ? pick(store) : store.$state)
  })
}
