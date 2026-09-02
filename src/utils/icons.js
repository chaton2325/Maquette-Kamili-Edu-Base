import {
  School,
  Sparkles,
  HeartHandshake,
  Building2,
  Droplets,
  BookOpen,
  Hammer,
  Shield,
  Trophy,
  Utensils,
  Baby,
  Sun,
  Trees
} from 'lucide-vue-next'

export const iconMap = {
  school: School,
  sparkles: Sparkles,
  'heart-handshake': HeartHandshake,
  'building-2': Building2,
  droplets: Droplets,
  'book-open': BookOpen,
  hammer: Hammer,
  shield: Shield,
  trophy: Trophy,
  utensils: Utensils,
  baby: Baby,
  sun: Sun,
  trees: Trees
}

export function iconFor(key) {
  return iconMap[key] || School
}
