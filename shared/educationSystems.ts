export type EducationSystem = "francophone" | "anglophone";

export const EDUCATION_SYSTEMS = {
  francophone: {
    label: "Sous-système francophone",
    shortLabel: "Francophone",
    language: "Français",
    curriculumLabel: "Programmes francophones",
    assessmentLabel: "Évaluations et bulletins francophones",
    color: "teal",
    ui: { overview: "Vue d’ensemble", schools: "Établissements", apee: "APEE & Finances", projects: "Projets scolaires", search: "Recherche globale", help: "Centre d’aide", settings: "Paramètres", pilotage: "PILOTAGE", trust: "DONNÉES & CONFIANCE" },
    curriculum: ["Français", "Mathématiques", "Sciences et technologie", "Éducation à la citoyenneté"],
  },
  anglophone: {
    label: "Sous-système anglophone",
    shortLabel: "Anglophone",
    language: "English",
    curriculumLabel: "Anglophone curriculum",
    assessmentLabel: "English assessments & report cards",
    color: "blue",
    ui: { overview: "Overview", schools: "Schools", apee: "PTA & Finance", projects: "School projects", search: "Global search", help: "Help centre", settings: "Settings", pilotage: "PILOTING", trust: "DATA & TRUST" },
    curriculum: ["English", "Mathematics", "Science & Technology", "Citizenship Education"],
  },
} as const;

export function getEducationSystemLabel(system: EducationSystem) {
  return EDUCATION_SYSTEMS[system].label;
}

export function getEducationSystemPrompt(system: EducationSystem) {
  const config = EDUCATION_SYSTEMS[system];
  return `Sous-système : ${config.label}. Langue de production : ${config.language}. Adapte les exemples, les consignes et la terminologie au ${config.curriculumLabel}.`;
}
