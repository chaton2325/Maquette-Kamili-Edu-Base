import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BookOpenCheck,
  Check,
  CheckCircle2,
  ClipboardCheck,
  EyeOff,
  FileText,
  GraduationCap,
  History,
  Info,
  LockKeyhole,
  MessageSquareText,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { EDUCATION_SYSTEMS, type EducationSystem } from "@shared/educationSystems";

type DraftStatus = "Brouillon IA" | "À relire" | "Validé par l’enseignant";
type AIDraft = { id: string; title: string; subject: string; level: string; status: DraftStatus; createdAt: string; content: string };

const initialDrafts: AIDraft[] = [
  { id: "IA-026", title: "Les fractions dans la vie quotidienne", subject: "Mathématiques", level: "CM2", status: "Validé par l’enseignant", createdAt: "Aujourd’hui, 09:14", content: "Situation-problème : partager équitablement 3 mangues entre 4 enfants. Faire verbaliser la fraction, représenter puis vérifier par le calcul." },
  { id: "IA-025", title: "Le cycle de l’eau", subject: "Sciences", level: "CE2", status: "À relire", createdAt: "Hier, 16:42", content: "Objectif : décrire les étapes évaporation, condensation et précipitation à partir d’une observation locale." },
];

const templates = {
  lesson: "Prépare une séquence courte avec objectif, prérequis, activité différenciée, évaluation formative et adaptation pour une classe hétérogène.",
  exercises: "Crée cinq exercices progressifs avec corrigé séparé, consignes simples et une variante de remédiation.",
  feedback: "Propose une appréciation pédagogique factuelle, bienveillante et orientée vers une prochaine étape, sans diagnostic médical ni classement.",
};

function cx(...classes: Array<string | false | null | undefined>) { return classes.filter(Boolean).join(" "); }

export default function ResponsibleAI({ educationSystem }: { educationSystem: EducationSystem }) {
  const { isAuthenticated } = useAuth();
  const systemConfig = EDUCATION_SYSTEMS[educationSystem];
  const serverDraftMutation = trpc.responsibleAI.generateDraft.useMutation();
  const [role, setRole] = useState<"teacher" | "student">("teacher");
  const [subject, setSubject] = useState("Mathématiques");
  const [level, setLevel] = useState("CM2");
  const [request, setRequest] = useState(templates.lesson);
  const [draft, setDraft] = useState("");
  const [drafts, setDrafts] = useState(initialDrafts);
  const [activeDraft, setActiveDraft] = useState(initialDrafts[0]);
  const [audit, setAudit] = useState(["09:18 · Enseignant vérifié · brouillon IA consulté", "09:14 · Contenu validé par l’enseignant · IA-026"]);

  const canAccess = role === "teacher";
  const remaining = useMemo(() => Math.max(0, 500 - request.length), [request.length]);

  const generateDraft = async () => {
    if (!canAccess) {
      toast.error("Accès refusé", { description: "L’IA pédagogique est réservée aux enseignants et adultes habilités." });
      return;
    }
    let generated = `Proposition de séquence — ${subject} · ${level}\n\nObjectif : permettre à chaque élève de construire une compréhension observable de la notion.\n\n1. Mise en situation locale (10 min)\nPartir d’un exemple du quotidien et faire émerger les représentations des élèves.\n\n2. Activité guidée (20 min)\nTravail en binômes, manipulation ou schéma, puis mise en commun. Prévoir une consigne simplifiée et un défi d’approfondissement.\n\n3. Vérification formative (10 min)\nDeux questions courtes, correction collective et reformulation par les élèves.\n\n4. Remédiation\nReprendre la notion avec un exemple concret pour les élèves qui en ont besoin.\n\nRappel : ce contenu est un brouillon assisté par IA. L’enseignant doit le vérifier, l’adapter au programme et le valider avant diffusion.`;
    if (isAuthenticated) {
      try {
        const response = await serverDraftMutation.mutateAsync({ subject, level, request, educationSystem });
        generated = response.draft;
      } catch (error) {
        toast.error("Le service IA sécurisé est indisponible", { description: "La démonstration locale reste disponible ; aucune donnée enfant n’a été envoyée." });
      }
    }
    setDraft(generated);
    setAudit((items) => [`Maintenant · Enseignant vérifié · brouillon généré pour ${subject} ${level}`, ...items]);
    toast.success(isAuthenticated ? "Brouillon généré côté serveur" : "Brouillon de démonstration généré", { description: "Il doit être relu et validé avant toute utilisation." });
  };

  const validateDraft = () => {
    if (!draft) return;
    const next: AIDraft = { id: `IA-${String(drafts.length + 27).padStart(3, "0")}`, title: `Séquence ${subject}`, subject, level, status: "Validé par l’enseignant", createdAt: "À l’instant", content: draft };
    setDrafts((items) => [next, ...items]);
    setActiveDraft(next);
    setAudit((items) => [`Maintenant · Validation humaine · ${next.id}`, ...items]);
    toast.success("Contenu validé par l’enseignant", { description: "Le contenu peut maintenant être partagé aux classes autorisées." });
  };

  const chooseDraft = (item: AIDraft) => { setActiveDraft(item); setDraft(item.content); };

  return <div className="ai-page">
    <div className="ai-hero"><div className="ai-hero-copy"><div className="eyebrow light">IA PÉDAGOGIQUE · {systemConfig.shortLabel.toUpperCase()} · ADULTES HABILITÉS</div><h1>Assistant de préparation responsable</h1><p>Une IA qui aide l’enseignant à gagner du temps, sans remplacer son jugement et sans exposer les données des enfants. Production : {systemConfig.language} · {systemConfig.curriculumLabel}.</p><div className="ai-hero-tags"><span><UserCheck size={14} /> Accès enseignant</span><span><EyeOff size={14} /> Données enfants masquées</span><span><ClipboardCheck size={14} /> Validation obligatoire</span></div></div><div className="ai-hero-mark"><Sparkles size={34} /><span>IA<br />responsable</span></div></div>

    <div className="ai-policy"><div className="ai-policy-icon"><ShieldAlert size={19} /></div><div><b>Règle centrale : l’IA propose, l’enseignant décide.</b><span>Aucun contenu généré ne peut être diffusé à un élève avant une relecture et une validation humaine tracée.</span></div><span className="status-pill status-success">Politique active</span></div>

    <div className="ai-layout">
      <section className="panel ai-workspace"><div className="panel-header"><div><div className="panel-kicker">ESPACE ENSEIGNANT</div><h2>Créer un support pédagogique</h2></div><div className="ai-user-badge"><GraduationCap size={15} /> {systemConfig.shortLabel} · Enseignant vérifié</div></div>
        <div className="ai-controls"><label>Matière<select value={subject} onChange={(event) => setSubject(event.target.value)}><option>Mathématiques</option><option>Français</option><option>Sciences</option><option>Éducation à la citoyenneté</option></select></label><label>Niveau<select value={level} onChange={(event) => setLevel(event.target.value)}><option>CP</option><option>CE1</option><option>CE2</option><option>CM1</option><option>CM2</option></select></label></div>
        <div className="ai-request-tabs"><button className={cx(request === templates.lesson && "selected")} onClick={() => setRequest(templates.lesson)}><BookOpenCheck size={15} /> Séquence</button><button className={cx(request === templates.exercises && "selected")} onClick={() => setRequest(templates.exercises)}><FileText size={15} /> Exercices</button><button className={cx(request === templates.feedback && "selected")} onClick={() => setRequest(templates.feedback)}><MessageSquareText size={15} /> Feedback</button></div>
        <label className="ai-prompt-label">Consigne pédagogique<textarea value={request} maxLength={500} onChange={(event) => setRequest(event.target.value)} /><span>{remaining} caractères restants · aucun nom d’enfant nécessaire</span></label>
        <button className="primary-button ai-generate" onClick={generateDraft}><Sparkles size={16} /> Générer un brouillon contrôlé</button>
        <div className="ai-guardrails"><div><LockKeyhole size={15} /><span>Les noms, notes et identifiants d’enfants sont interdits dans la consigne.</span></div><div><Info size={15} /><span>Vérifiez l’exactitude, le programme et l’adaptation au contexte local.</span></div></div>
      </section>

      <section className="panel ai-draft-panel"><div className="panel-header"><div><div className="panel-kicker">ZONE DE RELECTURE</div><h2>Résultat proposé</h2></div>{draft ? <span className="status-pill status-warning">À relire</span> : <span className="status-pill status-neutral">Aucun brouillon</span>}</div>{draft ? <><div className="draft-editor"><div className="draft-toolbar"><span><Sparkles size={14} /> Assisté par IA</span><button onClick={() => setDraft("")}><RotateCcw size={14} /> Effacer</button></div><textarea value={draft} onChange={(event) => setDraft(event.target.value)} aria-label="Brouillon à relire" /></div><div className="review-checks"><label><input type="checkbox" /> J’ai vérifié l’exactitude pédagogique.</label><label><input type="checkbox" /> J’ai retiré toute donnée personnelle.</label></div><button className="secondary-button ai-validate" onClick={validateDraft}><CheckCircle2 size={15} /> Valider et journaliser</button></> : <div className="ai-empty"><Sparkles size={25} /><b>Votre prochain support commence ici</b><span>Décrivez une séquence, un exercice ou un feedback. Le brouillon restera sous votre contrôle.</span></div>}</section>
    </div>

    <div className="ai-bottom-grid"><section className="panel ai-history"><div className="panel-header"><div><div className="panel-kicker">CONTENUS VALIDÉS</div><h2>Bibliothèque de l’enseignant</h2></div><span className="status-pill status-info">{drafts.length} contenus</span></div><div className="ai-draft-list">{drafts.map((item) => <button className={cx("ai-draft-row", activeDraft?.id === item.id && "active")} key={item.id} onClick={() => chooseDraft(item)}><div className="ai-draft-icon"><FileText size={15} /></div><div><b>{item.title}</b><span>{item.subject} · {item.level} · {item.createdAt}</span></div><span className={cx("status-pill", item.status === "Validé par l’enseignant" ? "status-success" : "status-warning")}>{item.status}</span></button>)}</div></section><section className="panel ai-audit"><div className="panel-header"><div><div className="panel-kicker">TRAÇABILITÉ</div><h2>Journal de confiance</h2></div><History size={17} color="#78a49b" /></div><div className="audit-note"><ShieldAlert size={16} /><span>Les actions IA sont conservées pour contrôle. Aucun usage commercial des données d’enfants.</span></div><div className="audit-list">{audit.slice(0, 5).map((event, index) => <div className="audit-row" key={`${event}-${index}`}><span className="audit-dot" /><span>{event}</span></div>)}</div></section></div>

    <div className="ai-student-lock"><div className="student-lock-icon"><Users size={18} /></div><div><b>Les élèves du primaire n’ont pas accès à l’IA libre</b><span>Ils reçoivent uniquement des supports sélectionnés et validés par leur enseignant. Le mode élève est volontairement limité.</span></div><button onClick={() => { setRole(role === "teacher" ? "student" : "teacher"); toast.info(role === "teacher" ? "Aperçu du mode élève verrouillé" : "Mode enseignant réactivé"); }}>{role === "teacher" ? "Simuler mode élève" : "Revenir enseignant"}</button></div>
    {!canAccess && <div className="ai-lock-overlay"><div><LockKeyhole size={24} /><b>Mode élève : IA indisponible</b><span>Seuls les supports validés par un adulte habilité sont accessibles.</span><button className="secondary-button" onClick={() => setRole("teacher")}><UserCheck size={15} /> Revenir à l’espace enseignant</button></div></div>}
  </div>;
}
