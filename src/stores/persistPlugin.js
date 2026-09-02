import { loadState, saveState } from '@/utils/persist'

// Stores volontairement non persistés (état de session uniquement).
const EXCLUDED = ['tour']

// Plugin Pinia : hydrate chaque store depuis le localStorage au démarrage,
// puis sauvegarde son état complet à chaque changement. Permet aux actions
// de démonstration (inscription, paiement...) de survivre au rechargement.
export function persistencePlugin({ store }) {
  if (EXCLUDED.includes(store.$id)) return

  const saved = loadState(store.$id, null)
  if (saved) store.$patch(saved)

  store.$subscribe(() => {
    saveState(store.$id, store.$state)
  }, { detached: true })
}
