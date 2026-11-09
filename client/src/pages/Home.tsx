import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowLeftRight,
  ArrowDownRight,
  ArrowUpRight,
  Award,
  Banknote,
  BarChart3,
  Bell,
  BookOpen,
  Building2,
  Check,
  CheckCircle2,
  ClipboardList,
  ChevronRight,
  CircleDollarSign,
  CloudOff,
  Database,
  Droplets,
  FileCheck2,
  FileText,
  Flag,
  Footprints,
  HardHat,
  HeartHandshake,
  Landmark,
  Languages,
  LayoutDashboard,
  LifeBuoy,
  LockKeyhole,
  Menu,
  Printer,
  Radio,
  RefreshCw,
  Search,
  Settings2,
  ShieldCheck,
  Share2,
  Sparkles,
  Trophy,
  Users,
  Wifi,
  WifiOff,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import WorkspaceSwitcher from "@/components/WorkspaceSwitcher";
import ResponsibleAI from "./ResponsibleAI";
import { EDUCATION_SYSTEMS, type EducationSystem } from "@shared/educationSystems";

type Section = "overview" | "apee" | "projects" | "football" | "schools" | "bulletins" | "ai";
type ExpenseStatus = "À valider" | "Validée" | "Payée";
type School = { name: string; location: string; status: string; students: number; sync: string; color: string; educationSystem: EducationSystem };
type Project = { title: string; school: string; type: string; progress: number; amount: string; icon: typeof Database; tone: string };

type Expense = {
  id: string;
  title: string;
  category: string;
  amount: number;
  status: ExpenseStatus;
  date: string;
};

const money = (value: number) => `${new Intl.NumberFormat("fr-FR").format(value)} FCFA`;

const initialExpenses: Expense[] = [
  { id: "EXP-2026-017", title: "Routeur et installation Wi-Fi", category: "Centre multimédia", amount: 285000, status: "À valider", date: "14 oct. 2026" },
  { id: "EXP-2026-016", title: "Kit lavage des mains", category: "WASH & hygiène", amount: 165000, status: "Validée", date: "11 oct. 2026" },
  { id: "EXP-2026-015", title: "Ballons Football for Schools", category: "Sport & vie", amount: 120000, status: "Payée", date: "08 oct. 2026" },
];

const schools: School[] = [
  { name: "École publique de Nkolbisson", location: "Centre · Yaoundé", status: "Pilote actif", students: 486, sync: "Aujourd’hui, 08:41", color: "mint", educationSystem: "francophone" },
  { name: "École publique de Domayo", location: "Extrême-Nord · Maroua", status: "Faible connectivité", students: 731, sync: "Hier, 17:20", color: "amber", educationSystem: "francophone" },
  { name: "Government Bilingual School Nkwen", location: "Nord-Ouest · Bamenda", status: "Pilote actif", students: 392, sync: "Aujourd’hui, 07:58", color: "blue", educationSystem: "anglophone" },
];

const projects: Project[] = [
  { title: "Centre multimédia pilote", school: "É.P. de Nkolbisson", type: "Numérique", progress: 82, amount: "3,6 M FCFA", icon: Database, tone: "teal" },
  { title: "Bloc latrines filles / garçons", school: "É.P. de Domayo", type: "WASH", progress: 54, amount: "2,1 M FCFA", icon: Droplets, tone: "blue" },
  { title: "Forage à pompe manuelle", school: "É.P. de Domayo", type: "Eau potable", progress: 28, amount: "4,8 M FCFA", icon: HardHat, tone: "orange" },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function StatusPill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "success" | "warning" | "neutral" | "danger" | "info" }) {
  return <span className={cx("status-pill", `status-${tone}`)}>{children}</span>;
}

function IconBox({ children, tone = "teal" }: { children: React.ReactNode; tone?: string }) {
  return <div className={cx("icon-box", `icon-${tone}`)}>{children}</div>;
}

function KpiCard({ label, value, delta, helper, icon, tone }: { label: string; value: string; delta?: string; helper: string; icon: React.ReactNode; tone: string }) {
  return (
    <div className="kpi-card">
      <div className="kpi-top"><IconBox tone={tone}>{icon}</IconBox>{delta && <span className="kpi-delta"><ArrowUpRight size={13} /> {delta}</span>}</div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-label">{label}</div>
      <div className="kpi-helper">{helper}</div>
    </div>
  );
}

function ProgressBar({ value, tone = "teal" }: { value: number; tone?: string }) {
  return <div className="progress-track"><div className={cx("progress-fill", `fill-${tone}`)} style={{ width: `${value}%` }} /></div>;
}

export default function Home() {
  const [section, setSection] = useState<Section>("overview");
  const [mobileNav, setMobileNav] = useState(false);
  const [online, setOnline] = useState(typeof navigator === "undefined" ? true : navigator.onLine);
  const [showDemo, setShowDemo] = useState(true);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [reportPublished, setReportPublished] = useState(false);
  const [footballSessions, setFootballSessions] = useState(18);
  const [query, setQuery] = useState("");
  const [educationSystem, setEducationSystem] = useState<EducationSystem>("francophone");
  const [schoolSystems, setSchoolSystems] = useState<Record<string, EducationSystem>>(() => Object.fromEntries(schools.map((school) => [school.name, school.educationSystem])));
  const systemConfig = EDUCATION_SYSTEMS[educationSystem];
  const ui = systemConfig.ui;

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    const cached = window.localStorage.getItem("kamili-demo-state");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (typeof parsed.reportPublished === "boolean") setReportPublished(parsed.reportPublished);
        if (typeof parsed.footballSessions === "number") setFootballSessions(parsed.footballSessions);
        if (parsed.educationSystem === "francophone" || parsed.educationSystem === "anglophone") setEducationSystem(parsed.educationSystem);
        if (parsed.schoolSystems && typeof parsed.schoolSystems === "object") setSchoolSystems(parsed.schoolSystems);
      } catch { /* ignore invalid demo cache */ }
    }
    return () => { window.removeEventListener("online", goOnline); window.removeEventListener("offline", goOffline); };
  }, []);

  useEffect(() => {
    window.localStorage.setItem("kamili-demo-state", JSON.stringify({ reportPublished, footballSessions, educationSystem, schoolSystems }));
  }, [reportPublished, footballSessions, educationSystem, schoolSystems]);

  const filteredExpenses = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return expenses;
    return expenses.filter((expense) => `${expense.title} ${expense.category} ${expense.id}`.toLowerCase().includes(q));
  }, [expenses, query]);

  const navigate = (next: Section) => { setSection(next); setMobileNav(false); };
  const validateExpense = (id: string) => {
    setExpenses((items) => items.map((expense) => expense.id === id ? { ...expense, status: "Validée" } : expense));
    toast.success("Dépense validée", { description: "L’action est journalisée dans le registre d’audit." });
  };
  const publishReport = () => {
    setReportPublished(true);
    toast.success("Rapport trimestriel publié", { description: "Les parents peuvent maintenant consulter la synthèse." });
  };
  const addSession = () => {
    setFootballSessions((value) => value + 1);
    toast.success("Séance enregistrée hors connexion", { description: "Elle sera synchronisée dès que le réseau sera disponible." });
  };
  const switchEducationSystem = (next: EducationSystem) => {
    if (next === educationSystem) return;
    setEducationSystem(next);
    toast.success(`Mode ${EDUCATION_SYSTEMS[next].shortLabel} activé`, { description: "Les contenus pédagogiques et l’assistant IA suivront ce sous-système." });
  };

  return (
    <div className="app-shell">
      <aside className={cx("sidebar", mobileNav && "sidebar-open")}>
        <div className="brand"><div className="brand-mark"><Sparkles size={19} /></div><div><strong>KAMILI</strong><span>ÉDUC BASE</span></div><button className="mobile-close" onClick={() => setMobileNav(false)} aria-label="Fermer le menu"><X size={18} /></button></div>
        <WorkspaceSwitcher current="admin" subtitle={EDUCATION_SYSTEMS[educationSystem].shortLabel} />
        <div className="subsystem-switch" aria-label="Basculement du sous-système éducatif"><div className="subsystem-heading"><div><small>SOUS-SYSTÈME ACTIF</small><b>{EDUCATION_SYSTEMS[educationSystem].label}</b></div><Languages size={16} /></div><div className="subsystem-toggle" role="group" aria-label="Choisir le sous-système"><span className={cx("subsystem-thumb", educationSystem === "anglophone" && "thumb-right")} aria-hidden="true" /><button type="button" className={cx(educationSystem === "francophone" && "selected")} aria-pressed={educationSystem === "francophone"} onClick={() => switchEducationSystem("francophone")}><strong>FR</strong><span>Français</span></button><button type="button" className={cx(educationSystem === "anglophone" && "selected")} aria-pressed={educationSystem === "anglophone"} onClick={() => switchEducationSystem("anglophone")}><strong>EN</strong><span>English</span></button></div><div className="subsystem-helper"><ArrowLeftRight size={11} /> Basculez pour adapter l’espace de travail</div></div>
        <div className="nav-label">{ui.pilotage}</div>
        <nav className="main-nav">
          <button className={cx(section === "overview" && "active")} onClick={() => navigate("overview")}><LayoutDashboard size={18} /> Vue d’ensemble</button>
          <button className={cx(section === "schools" && "active")} onClick={() => navigate("schools")}><Building2 size={18} /> Établissements <span className="nav-count">12</span></button>
          <button className={cx(section === "apee" && "active")} onClick={() => navigate("apee")}><CircleDollarSign size={18} /> APEE & Finances <span className="nav-dot" /></button>
          <button className={cx(section === "projects" && "active")} onClick={() => navigate("projects")}><HardHat size={18} /> Projets scolaires <span className="nav-count">3</span></button>
          <button className={cx(section === "football" && "active")} onClick={() => navigate("football")}><Trophy size={18} /> Football for Schools</button>
          <button className={cx(section === "ai" && "active")} onClick={() => navigate("ai")}><Sparkles size={18} /> IA responsable <span className="nav-ai-badge">BÊTA</span></button>
        </nav>
        <div className="nav-label nav-label-spaced">{ui.trust}</div>
        <nav className="main-nav secondary-nav">
          <button onClick={() => toast.info("La recherche nationale sera disponible dans la prochaine version.")}><Search size={18} /> {ui.search}</button>
          <button onClick={() => toast.info("Centre d’aide : support@kamili.education")}><LifeBuoy size={18} /> {ui.help}</button>
          <button onClick={() => toast.info("Paramètres de démonstration")}><Settings2 size={18} /> {ui.settings}</button>
        </nav>
        <div className="sidebar-bottom"><div className="security-note"><ShieldCheck size={16} /><div><b>Mode sécurisé</b><span>Données de démonstration</span></div></div><div className="profile-mini"><div className="profile-avatar">PB</div><div><b>Dr Paul Biloa Mvondo</b><span>Administrateur MINEDUB</span></div></div></div>
      </aside>

      <main className="main-area">
        <header className="topbar"><button className="mobile-menu" onClick={() => setMobileNav(true)} aria-label="Ouvrir le menu"><Menu size={21} /></button><div className="breadcrumb"><span>Kamili Éduc</span><ChevronRight size={14} /><b>{section === "overview" ? "Vue d’ensemble" : section === "apee" ? "APEE & Finances" : section === "projects" ? "Projets scolaires" : section === "football" ? "Football for Schools" : section === "bulletins" ? "Bulletins bilingues" : section === "ai" ? "IA responsable" : "Établissements"}</b></div><div className="topbar-actions"><div className={cx("sync-status", online ? "is-online" : "is-offline")}><span className="sync-dot" />{online ? "Synchronisé" : "Hors connexion"}</div><button className="circle-button" onClick={() => toast.info(online ? "Toutes les données sont synchronisées." : "Les données sont conservées localement.")} aria-label="État de synchronisation"><RefreshCw size={17} /></button><button className="circle-button notification-button" onClick={() => toast.info("3 alertes nécessitent votre attention.")} aria-label="Notifications"><Bell size={17} /><i /></button></div></header>
        <div className="content-wrap">
          <div className="demo-banner"><div className="demo-banner-icon"><Radio size={17} /></div><div><b>Environnement de démonstration</b><span>Les chiffres et opérations affichés sont simulés. Les règles APEE et le programme FIFA doivent être validés institutionnellement.</span></div><button onClick={() => setShowDemo(false)} aria-label="Masquer l’avertissement"><X size={16} /></button></div>
          {!online && <div className="offline-banner"><WifiOff size={17} /><span><b>Mode hors connexion actif.</b> Les actions sont enregistrées localement et seront synchronisées au retour du réseau.</span></div>}

          {section === "overview" && <Overview navigate={navigate} schools={schools} schoolSystems={schoolSystems} projects={projects} reportPublished={reportPublished} footballSessions={footballSessions} educationSystem={educationSystem} />}
          {section === "apee" && <ApeePage expenses={filteredExpenses} query={query} setQuery={setQuery} validateExpense={validateExpense} reportPublished={reportPublished} publishReport={publishReport} />}
          {section === "projects" && <ProjectsPage projects={projects} />}
          {section === "football" && <FootballPage footballSessions={footballSessions} addSession={addSession} />}
          {section === "schools" && <SchoolsPage schoolSystems={schoolSystems} setSchoolSystem={(name, next) => { setSchoolSystems((current) => ({ ...current, [name]: next })); toast.success(`${next === "anglophone" ? "Anglophone" : "Francophone"} défini par défaut pour ${name}.`); }} />}
          {section === "bulletins" && <BilingualReportPage educationSystem={educationSystem} schoolSystems={schoolSystems} />}
          {section === "ai" && <ResponsibleAI educationSystem={educationSystem} />}
        </div>
      </main>
      {showDemo && <div className="demo-toast"><div className="demo-toast-icon"><Sparkles size={17} /></div><div><b>Bienvenue dans Kamili Éduc</b><span>Explorez les parcours APEE, projets et sport-éducation.</span></div><button onClick={() => setShowDemo(false)}><X size={15} /></button></div>}
    </div>
  );
}

function PageIntro({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="page-intro"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action}</div>;
}

function Overview({ navigate, schools, schoolSystems, projects, reportPublished, footballSessions, educationSystem }: { navigate: (section: Section) => void; schools: School[]; schoolSystems: Record<string, EducationSystem>; projects: Project[]; reportPublished: boolean; footballSessions: number; educationSystem: EducationSystem }) {
  const config = EDUCATION_SYSTEMS[educationSystem];
  return <>
    <PageIntro eyebrow="Pilotage national · 14 octobre 2026" title="Bonjour, Dr Biloa Mvondo" description="Voici la situation consolidée des écoles pilotes et des projets prioritaires de l’éducation de base." action={<button className="primary-button" onClick={() => navigate("apee")}><FileText size={16} /> Voir le rapport APEE <ChevronRight size={16} /></button>} />
    <div className="kpi-grid">
      <KpiCard label="Élèves suivis" value="1 842" delta="12,4 %" helper="dans 12 écoles pilotes" icon={<Users size={19} />} tone="teal" />
      <KpiCard label="APEE documentées" value="12 / 12" delta="100 %" helper="gouvernance renseignée" icon={<Landmark size={19} />} tone="purple" />
      <KpiCard label="Fonds tracés" value="18,6 M" delta="8,2 %" helper="recettes et dépenses" icon={<CircleDollarSign size={19} />} tone="orange" />
      <KpiCard label="Écoles synchronisées" value="91 %" delta="4,8 %" helper="dernières 24 heures" icon={<Wifi size={19} />} tone="blue" />
    </div>
    <section className="curriculum-context panel"><div className="curriculum-icon"><BookOpen size={20} /></div><div className="curriculum-copy"><div className="panel-kicker">CONTEXTE PÉDAGOGIQUE ACTIF</div><h2>{config.label}</h2><p>{config.assessmentLabel}</p></div><div className="curriculum-subjects">{config.curriculum.map((subject) => <span key={subject}>{subject}</span>)}</div><button className="ghost-button" onClick={() => navigate("schools")}>Configurer par école <ChevronRight size={15} /></button></section>
    <div className="dashboard-grid main-grid">
      <section className="panel chart-panel"><div className="panel-header"><div><div className="panel-kicker">SUIVI NATIONAL</div><h2>Présence et progression</h2></div><button className="ghost-button" onClick={() => navigate("schools")}>Détails <ChevronRight size={15} /></button></div><div className="chart-legend"><span><i className="legend-dot teal-dot" /> Présence</span><span><i className="legend-dot orange-dot" /> Progression des résultats</span><select defaultValue="6 mois" aria-label="Période"><option>6 mois</option><option>12 mois</option></select></div><div className="line-chart"><div className="chart-y"><span>100%</span><span>80%</span><span>60%</span><span>40%</span><span>20%</span></div><div className="chart-canvas"><div className="grid-line g1" /><div className="grid-line g2" /><div className="grid-line g3" /><div className="grid-line g4" /><svg viewBox="0 0 640 220" preserveAspectRatio="none" aria-label="Graphique de progression"><defs><linearGradient id="fillTeal" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#1ea88f" stopOpacity=".22" /><stop offset="100%" stopColor="#1ea88f" stopOpacity="0" /></linearGradient></defs><path d="M0,135 C68,122 90,132 142,113 S220,92 270,105 S350,93 400,73 S485,80 535,53 S595,49 640,29 L640,220 L0,220Z" fill="url(#fillTeal)" /><path d="M0,135 C68,122 90,132 142,113 S220,92 270,105 S350,93 400,73 S485,80 535,53 S595,49 640,29" fill="none" stroke="#159a85" strokeWidth="3" /><path d="M0,160 C65,155 105,150 142,153 S225,145 270,137 S350,145 400,126 S480,132 535,116 S600,110 640,103" fill="none" stroke="#ef9a54" strokeWidth="2.5" strokeDasharray="6 6" /></svg><div className="chart-labels"><span>Mai</span><span>Juin</span><span>Juil.</span><span>Août</span><span>Sept.</span><span>Oct.</span></div></div></div><div className="chart-insight"><Sparkles size={16} /><span><b>+8,4 pts</b> de présence moyenne depuis le lancement du pilote.</span></div></section>
      <section className="panel priority-panel"><div className="panel-header"><div><div className="panel-kicker">À TRAITER</div><h2>Priorités du jour</h2></div><span className="alert-count">4</span></div><div className="priority-list"><PriorityItem icon={<AlertTriangle size={17} />} tone="orange" title="Dépense APEE à valider" detail="Routeur · É.P. Nkolbisson" action={() => navigate("apee")} /><PriorityItem icon={<Droplets size={17} />} tone="blue" title="Forage en attente" detail="Domayo · 28 % réalisé" action={() => navigate("projects")} /><PriorityItem icon={<WifiOff size={17} />} tone="purple" title="École non synchronisée" detail="Depuis 19 heures" action={() => navigate("schools")} /><PriorityItem icon={<Footprints size={17} />} tone="teal" title="Rapport sport à confirmer" detail="6 séances cette semaine" action={() => navigate("football")} /></div><button className="full-ghost" onClick={() => toast.info("La liste complète sera disponible dans la version pilote.")}>Voir toutes les alertes <ChevronRight size={15} /></button></section>
    </div>
    <div className="section-heading"><div><div className="panel-kicker">IMPACT TERRAIN</div><h2>Les écoles pilotes</h2></div><button className="ghost-button" onClick={() => navigate("schools")}>Voir les 12 écoles <ChevronRight size={15} /></button></div>
    <div className="school-grid">{schools.map((school) => <div className="school-card" key={school.name}><div className="school-card-top"><div className={cx("school-logo", `school-${school.color}`)}><Building2 size={19} /></div><StatusPill tone={school.status === "Faible connectivité" ? "warning" : "success"}>{school.status}</StatusPill></div><h3>{school.name}</h3><p>{school.location}</p><div className="school-meta"><span><Users size={14} /> {school.students} élèves</span><span><span className="tiny-sync" /> {school.sync}</span></div><div className="school-card-footer"><span>{EDUCATION_SYSTEMS[schoolSystems[school.name] ?? school.educationSystem].shortLabel} · Qualité <b>{school.color === "amber" ? "78" : "94"}%</b></span><ChevronRight size={16} /></div></div>)}</div>
    <div className="impact-strip"><div className="impact-copy"><div className="impact-icon"><HeartHandshake size={22} /></div><div><div className="panel-kicker">UNE ÉCOLE, DES PRIORITÉS VISIBLES</div><h2>Du financement à l’impact</h2><p>Kamili relie recettes APEE, projets réalisés et bénéfices pour les élèves. Chaque franc doit conduire à une preuve.</p></div></div><div className="impact-stats"><div><b>3</b><span>projets actifs</span></div><div><b>18</b><span>séances sport-éducation</span></div><div><b>{reportPublished ? "Publié" : "En attente"}</b><span>rapport parents</span></div></div><button className="outline-light" onClick={() => navigate("projects")}>Explorer les projets <ChevronRight size={15} /></button></div>
  </>;
}

function PriorityItem({ icon, tone, title, detail, action }: { icon: React.ReactNode; tone: string; title: string; detail: string; action: () => void }) {
  return <button className="priority-item" onClick={action}><div className={cx("priority-icon", `icon-${tone}`)}>{icon}</div><div><b>{title}</b><span>{detail}</span></div><ChevronRight size={16} /></button>;
}

function ApeePage({ expenses, query, setQuery, validateExpense, reportPublished, publishReport }: { expenses: Expense[]; query: string; setQuery: (value: string) => void; validateExpense: (id: string) => void; reportPublished: boolean; publishReport: () => void }) {
  const [tab, setTab] = useState<"overview" | "expenses" | "contributions">("overview");
  return <>
    <PageIntro eyebrow="Gouvernance & transparence" title="APEE & Finances scolaires" description="Un registre clair des contributions autorisées, des dépenses validées et des projets financés." action={<button className="primary-button" onClick={publishReport}><FileCheck2 size={16} /> {reportPublished ? "Rapport publié" : "Publier le rapport"}</button>} />
    <div className="trust-callout"><div className="trust-icon"><ShieldCheck size={21} /></div><div><b>100 % des opérations sont journalisées</b><span>Mode démonstration · aucune contribution réelle · toute nouvelle règle doit être validée institutionnellement.</span></div><StatusPill tone="info">Traçabilité active</StatusPill></div>
    <div className="kpi-grid finance-kpis"><KpiCard label="Recettes de l’année" value="18,6 M" delta="8,2 %" helper="sur 20,4 M attendus" icon={<ArrowDownRight size={19} />} tone="teal" /><KpiCard label="Taux de participation" value="91 %" delta="3,1 %" helper="1 674 familles" icon={<Users size={19} />} tone="purple" /><KpiCard label="Dépenses validées" value="12,9 M" helper="69 % des recettes" icon={<CheckCircle2 size={19} />} tone="orange" /><KpiCard label="Projets financés" value="3" helper="1 numérique · 2 WASH" icon={<HardHat size={19} />} tone="blue" /></div>
    <div className="tabs"><button className={cx(tab === "overview" && "tab-active")} onClick={() => setTab("overview")}>Vue synthèse</button><button className={cx(tab === "expenses" && "tab-active")} onClick={() => setTab("expenses")}>Dépenses <span>3</span></button><button className={cx(tab === "contributions" && "tab-active")} onClick={() => setTab("contributions")}>Contributions autorisées</button></div>
    {tab === "overview" && <div className="dashboard-grid finance-grid"><section className="panel budget-panel"><div className="panel-header"><div><div className="panel-kicker">BUDGET 2026–2027</div><h2>Où va la contribution ?</h2></div><button className="icon-button" onClick={() => toast.info("Export sécurisé en préparation.")}><FileText size={16} /></button></div><div className="budget-visual"><div className="donut"><div><b>18,6 M</b><span>collectés</span></div></div><div className="budget-legend"><BudgetLegend color="teal" label="Centre multimédia" value="35 %" amount="6,5 M" /><BudgetLegend color="blue" label="Eau & latrines" value="25 %" amount="4,6 M" /><BudgetLegend color="orange" label="Fonctionnement" value="20 %" amount="3,7 M" /><BudgetLegend color="purple" label="Solidarité & audit" value="20 %" amount="3,8 M" /></div></div><div className="budget-note"><LockKeyhole size={15} /><span>Les fonds sont affichés par rubrique. Les données nominatives restent privées.</span></div></section><section className="panel report-panel"><div className="panel-header"><div><div className="panel-kicker">COMMUNICATION PARENTS</div><h2>Rapport trimestriel</h2></div><StatusPill tone={reportPublished ? "success" : "warning"}>{reportPublished ? "Publié" : "À publier"}</StatusPill></div><div className="report-preview"><div className="report-top"><div className="mini-logo">K</div><div><b>É.P. de Nkolbisson</b><span>Rapport APEE · T3 2026</span></div></div><div className="report-row"><span>Solde initial</span><b>4 200 000 FCFA</b></div><div className="report-row positive"><span>+ Contributions reçues</span><b>5 800 000 FCFA</b></div><div className="report-row negative"><span>− Dépenses réalisées</span><b>3 100 000 FCFA</b></div><div className="report-total"><span>Solde disponible</span><b>6 900 000 FCFA</b></div></div><button className="secondary-button" onClick={publishReport}>{reportPublished ? <Check size={15} /> : <FileCheck2 size={15} />} {reportPublished ? "Rapport visible aux parents" : "Publier aux parents"}</button></section></div>}
    {tab === "expenses" && <ExpensesTable expenses={expenses} query={query} setQuery={setQuery} validateExpense={validateExpense} />}
    {tab === "contributions" && <ContributionsPanel />}
  </>;
}

function BudgetLegend({ color, label, value, amount }: { color: string; label: string; value: string; amount: string }) { return <div className="budget-legend-row"><i className={`legend-square ${color}`} /><span>{label}</span><b>{value}</b><small>{amount}</small></div>; }
function ExpensesTable({ expenses, query, setQuery, validateExpense }: { expenses: Expense[]; query: string; setQuery: (value: string) => void; validateExpense: (id: string) => void }) {
  return <section className="panel table-panel"><div className="panel-header"><div><div className="panel-kicker">REGISTRE AUDITABLE</div><h2>Dépenses et validations</h2></div><button className="secondary-button" onClick={() => toast.info("Nouvelle dépense : formulaire sécurisé disponible dans le pilote.")}><Zap size={15} /> Nouvelle dépense</button></div><div className="table-toolbar"><div className="search-field"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher une dépense..." /></div><div className="table-filter"><span>Cette année</span><ChevronRight size={14} /></div></div><div className="table-wrap"><table><thead><tr><th>Opération</th><th>Rubrique</th><th>Montant</th><th>Statut</th><th>Action</th></tr></thead><tbody>{expenses.map((expense) => <tr key={expense.id}><td><div className="operation"><div className="operation-icon"><FileText size={15} /></div><div><b>{expense.title}</b><span>{expense.id} · {expense.date}</span></div></div></td><td>{expense.category}</td><td><b>{money(expense.amount)}</b></td><td><StatusPill tone={expense.status === "Payée" ? "success" : expense.status === "Validée" ? "info" : "warning"}>{expense.status}</StatusPill></td><td>{expense.status === "À valider" ? <button className="small-action" onClick={() => validateExpense(expense.id)}><Check size={14} /> Valider</button> : <button className="row-more" onClick={() => toast.info("Écriture journalisée et consultable par les contrôleurs.")}>Voir <ChevronRight size={14} /></button>}</td></tr>)}</tbody></table></div><div className="table-footer"><span><span className="tiny-sync" /> Chaque action est inscrite au journal d’audit</span><button onClick={() => toast.info("Export CSV sécurisé en préparation.")}>Exporter le registre <ArrowUpRight size={14} /></button></div></section>;
}
function ContributionsPanel() { return <section className="panel contribution-panel"><div className="panel-header"><div><div className="panel-kicker">RÈGLES CONFIGURABLES</div><h2>Contributions autorisées</h2></div><StatusPill tone="info">Validation institutionnelle requise</StatusPill></div><div className="contribution-list"><div className="contribution-card"><div className="contribution-card-icon"><Landmark size={18} /></div><div><b>Appui au fonctionnement de l’école</b><span>Montant configuré · applicable après validation</span></div><StatusPill tone="warning">En attente</StatusPill><ChevronRight size={16} /></div><div className="contribution-card"><div className="contribution-card-icon purple"><HeartHandshake size={18} /></div><div><b>Fonds solidarité familles</b><span>Contribution volontaire · exonération possible</span></div><StatusPill tone="success">Volontaire</StatusPill><ChevronRight size={16} /></div><div className="contribution-card"><div className="contribution-card-icon orange"><HardHat size={18} /></div><div><b>Projet prioritaire de l’école</b><span>Centre multimédia · eau · latrines</span></div><StatusPill tone="info">Projet</StatusPill><ChevronRight size={16} /></div></div></section>; }

function BilingualReportPage({ educationSystem, schoolSystems }: { educationSystem: EducationSystem; schoolSystems: Record<string, EducationSystem> }) {
  const [studentId, setStudentId] = useState("amina");
  const [term, setTerm] = useState("T1 · 2026–2027");
  const [generated, setGenerated] = useState(false);
  const students = [
    { id: "amina", name: "Amina Njoya", school: "École publique de Nkolbisson", className: "CM2 / Class 6", system: schoolSystems["École publique de Nkolbisson"] ?? "francophone" as EducationSystem, average: "15,8 / 20", englishAverage: "79 / 100" },
    { id: "brian", name: "Brian Fon", school: "Government Bilingual School Nkwen", className: "Class 5 / CM1", system: schoolSystems["Government Bilingual School Nkwen"] ?? "anglophone" as EducationSystem, average: "16,4 / 20", englishAverage: "82 / 100" },
    { id: "moussa", name: "Moussa Abba", school: "École publique de Domayo", className: "CM1 / Class 5", system: schoolSystems["École publique de Domayo"] ?? "francophone" as EducationSystem, average: "13,9 / 20", englishAverage: "69,5 / 100" },
  ];
  const student = students.find((item) => item.id === studentId) ?? students[0];
  const activeSystem = EDUCATION_SYSTEMS[student.system];
  const scores = student.id === "brian" ? [{ subject: "English / Anglais", fr: "16 / 20", en: "80 / 100" }, { subject: "Mathematics / Mathématiques", fr: "17 / 20", en: "85 / 100" }, { subject: "Science & Technology / Sciences", fr: "16 / 20", en: "80 / 100" }] : [{ subject: "Français / French", fr: "16 / 20", en: "80 / 100" }, { subject: "Mathématiques / Mathematics", fr: "15 / 20", en: "75 / 100" }, { subject: "Sciences / Science", fr: "16 / 20", en: "80 / 100" }];
  const generate = () => { setGenerated(true); toast.success("Bulletin bilingue généré", { description: `Version ${activeSystem.shortLabel} prête pour validation de l’enseignant.` }); };
  return <>
    <PageIntro eyebrow="Évaluation · bilingue · validation humaine" title="Bulletins scolaires bilingues" description="Générez un bulletin lisible dans les deux sous-systèmes. La version active de l’établissement est signalée, puis l’enseignant valide avant partage aux parents." action={<button className="primary-button" onClick={generate}><ClipboardList size={16} /> Générer le bulletin</button>} />
    <div className="report-controls panel"><div><label>Élève<select value={studentId} onChange={(event) => { setStudentId(event.target.value); setGenerated(false); }}><option value="amina">Amina Njoya · Nkolbisson</option><option value="brian">Brian Fon · G.B.S. Nkwen</option><option value="moussa">Moussa Abba · Domayo</option></select></label></div><div><label>Période<select value={term} onChange={(event) => setTerm(event.target.value)}><option>T1 · 2026–2027</option><option>T2 · 2026–2027</option><option>T3 · 2026–2027</option></select></label></div><div className="report-context"><span className="panel-kicker">SOUS-SYSTÈME DE L’ÉTABLISSEMENT</span><b>{activeSystem.label}</b><small>{activeSystem.assessmentLabel}</small></div><StatusPill tone={generated ? "success" : "warning"}>{generated ? "Généré · à valider" : "Brouillon non généré"}</StatusPill></div>
    <div className="report-meta"><div><div className="panel-kicker">APERÇU DU DOCUMENT</div><h2>{student.name} · {term}</h2><p>{student.school} · {student.className} · document bilingue prêt à imprimer</p></div><div className="report-actions"><button className="secondary-button" disabled={!generated} onClick={() => toast.info("Impression du bulletin bilingue préparée.")}><Printer size={15} /> Imprimer</button><button className="secondary-button" disabled={!generated} onClick={() => toast.success("Bulletin partagé en mode démonstration.")}><Share2 size={15} /> Partager aux parents</button></div></div>
    <div className="bilingual-report-grid"><ReportLanguageCard language="Français" subtitle="Sous-système francophone" active={student.system === "francophone"} student={student} scores={scores} average={student.average} generated={generated} /><ReportLanguageCard language="English" subtitle="Anglophone subsystem" active={student.system === "anglophone"} student={student} scores={scores} average={student.englishAverage} generated={generated} /></div>
    <div className="report-validation"><ShieldCheck size={17} /><div><b>Validation obligatoire avant diffusion</b><span>Le bulletin reste un brouillon tant que l’enseignant ou le directeur n’a pas contrôlé les notes, l’appréciation et la correspondance du sous-système.</span></div><StatusPill tone="info">Données de démonstration</StatusPill></div>
  </>;
}

function ReportLanguageCard({ language, subtitle, active, student, scores, average, generated }: { language: string; subtitle: string; active: boolean; student: { name: string; school: string; className: string }; scores: Array<{ subject: string; fr: string; en: string }>; average: string; generated: boolean }) {
  return <section className={cx("panel report-language-card", active && "report-language-active")}><div className="report-card-head"><div><span className="report-language-code">{language === "Français" ? "FR" : "EN"}</span><div><b>{language}</b><small>{subtitle}</small></div></div>{active ? <StatusPill tone="success">Sous-système actif</StatusPill> : <StatusPill tone="neutral">Version miroir</StatusPill>}</div><div className="report-student"><div className="report-avatar">{student.name.split(" ").map((part) => part[0]).join("")}</div><div><b>{student.name}</b><span>{student.school}</span><small>{student.className} · T1 2026–2027</small></div></div><div className="report-table"><div className="report-table-row report-table-header"><span>Matière / Subject</span><span>Note / Mark</span></div>{scores.map((score) => <div className="report-table-row" key={score.subject}><span>{score.subject}</span><b>{language === "Français" ? score.fr : score.en}</b></div>)}<div className="report-average"><span>{language === "Français" ? "Moyenne générale" : "Overall average"}</span><b>{average}</b></div></div><div className="report-appreciation"><span>{language === "Français" ? "Appréciation" : "Teacher’s comment"}</span><p>{generated ? (language === "Français" ? "Élève sérieux et engagé. Les acquis sont solides ; poursuivre les efforts en résolution de problèmes." : "A committed learner with solid progress. Continue practising problem-solving and independent work.") : (language === "Français" ? "Le commentaire sera disponible après génération et validation." : "The comment will be available after generation and validation.")}</p></div><div className="report-signature"><span>{language === "Français" ? "Validation enseignant" : "Teacher validation"}</span><i>{generated ? "À signer" : "En attente"}</i></div></section>;
}

function ProjectsPage({ projects }: { projects: Project[] }) { return <><PageIntro eyebrow="Investir · réaliser · vérifier" title="Projets scolaires" description="Chaque ressource mobilisée doit devenir une infrastructure visible, entretenue et utile aux élèves." action={<button className="primary-button" onClick={() => toast.info("Le formulaire de projet sera activé dans le pilote.")}><HardHat size={16} /> Proposer un projet</button>} /><div className="project-hero"><div><div className="eyebrow light">PORTFOLIO D’IMPACT</div><h2>3 projets, une même exigence : la preuve.</h2><p>Du financement au dernier contrôle de maintenance, Kamili garde le fil.</p></div><div className="project-hero-stat"><b>18,6 M</b><span>mobilisés par les familles</span></div></div><div className="project-grid">{projects.map((project: Project) => { const Icon = project.icon; return <div className="project-card" key={project.title}><div className="project-card-top"><IconBox tone={project.tone}><Icon size={19} /></IconBox><StatusPill tone={project.progress > 70 ? "success" : "warning"}>{project.progress === 100 ? "Terminé" : "En cours"}</StatusPill></div><h3>{project.title}</h3><p>{project.school}</p><div className="project-progress-label"><span>Avancement</span><b>{project.progress}%</b></div><ProgressBar value={project.progress} tone={project.tone} /><div className="project-card-bottom"><span>{project.type}</span><b>{project.amount}</b></div><button className="project-link" onClick={() => toast.info(`${project.title} · cycle de vie et justificatifs`)}>Voir le projet <ChevronRight size={15} /></button></div>; })}</div><div className="project-principles"><div><ShieldCheck size={20} /><b>Réception contrôlée</b><span>Un paiement ne suffit pas à déclarer un projet terminé.</span></div><div><FileCheck2 size={20} /><b>Justificatifs attachés</b><span>Devis, réception et maintenance restent accessibles aux contrôleurs.</span></div><div><Users size={20} /><b>Impact mesuré</b><span>Élèves bénéficiaires, usage réel et qualité de service.</span></div></div></>; }

function FootballPage({ footballSessions, addSession }: { footballSessions: number; addSession: () => void }) { return <><PageIntro eyebrow="Sport · éducation · compétences de vie" title="Football for Schools" description="Suivre les séances, les encadrants et les compétences de vie dans un cadre protecteur et validé institutionnellement." action={<button className="primary-button" onClick={addSession}><Footprints size={16} /> Enregistrer une séance</button>} /><div className="football-notice"><div className="football-ball"><Trophy size={22} /></div><div><b>Mode démonstration — protocole FIFA–Cameroun à confirmer</b><span>Kamili prépare le suivi opérationnel sans prétendre être un outil officiellement intégré avant validation du groupe de travail.</span></div><StatusPill tone="warning">À confirmer</StatusPill></div><div className="football-grid"><section className="football-main-card"><div className="panel-header"><div><div className="panel-kicker">PROGRAMME PILOTE</div><h2>Football & compétences de vie</h2></div><StatusPill tone="success">Actif en démo</StatusPill></div><div className="football-stat-row"><div><b>{footballSessions}</b><span>séances réalisées</span></div><div><b>612</b><span>élèves participants</span></div><div><b>49 %</b><span>filles participantes</span></div></div><div className="life-skills"><div className="panel-kicker">THÈMES TRAVAILLÉS CE MOIS-CI</div><div className="skill-chips"><span><HeartHandshake size={14} /> Coopération</span><span><ShieldCheck size={14} /> Respect</span><span><Users size={14} /> Inclusion</span><span><Droplets size={14} /> Hygiène</span><span><Award size={14} /> Discipline</span></div></div><div className="session-list"><div className="panel-kicker">DERNIÈRES SÉANCES</div><SessionRow date="14 oct. · 09:00" school="É.P. de Nkolbisson" detail="CM1 · coopération" status="Synchronisée" /><SessionRow date="13 oct. · 14:30" school="G.B.S. Nkwen" detail="CE2 · respect" status="Synchronisée" /><SessionRow date="12 oct. · 10:15" school="É.P. de Domayo" detail="CM2 · hygiène" status="En attente" /></div></section><section className="panel coach-panel"><div className="panel-header"><div><div className="panel-kicker">ENCADREMENT</div><h2>Ressources du programme</h2></div><button className="icon-button" onClick={() => toast.info("Répertoire des encadrants en préparation.")}><Users size={16} /></button></div><div className="coach-metric"><div className="metric-ring"><b>8</b></div><div><b>encadrants formés</b><span>sur 9 référents d’école</span></div></div><div className="equipment-line"><div className="equipment-icon"><Trophy size={17} /></div><div><b>Équipements suivis</b><span>24 ballons · 9 kits pédagogiques</span></div><StatusPill tone="success">92 % OK</StatusPill></div><div className="safeguarding-box"><ShieldCheck size={17} /><div><b>Protection de l’enfant</b><span>Incidents visibles uniquement aux rôles habilités.</span></div><ChevronRight size={15} /></div><button className="secondary-button full-button" onClick={() => toast.info("Rapport Football for Schools simulé prêt à exporter.")}><BarChart3 size={15} /> Générer le rapport programme</button></section></div></>; }
function SessionRow({ date, school, detail, status }: { date: string; school: string; detail: string; status: string }) { return <div className="session-row"><div className="session-date">{date}</div><div className="session-info"><b>{school}</b><span>{detail}</span></div><StatusPill tone={status === "En attente" ? "warning" : "success"}>{status}</StatusPill><ChevronRight size={15} /></div>; }

function SchoolsPage({ schoolSystems, setSchoolSystem }: { schoolSystems: Record<string, EducationSystem>; setSchoolSystem: (name: string, next: EducationSystem) => void }) { return <><PageIntro eyebrow="Réseau pilote" title="Établissements" description="Un aperçu des écoles, de la qualité des données et de la synchronisation terrain." action={<button className="primary-button" onClick={() => toast.info("Ajout d’établissement : workflow MINEDUB à configurer.")}><Building2 size={16} /> Ajouter une école</button>} /><div className="schools-summary"><div><span>Écoles pilotes</span><b>12</b></div><div><span>Synchronisées aujourd’hui</span><b>11</b></div><div><span>À accompagner</span><b>1</b></div><div><span>Qualité moyenne</span><b>91 %</b></div></div><section className="panel table-panel"><div className="panel-header"><div><div className="panel-kicker">REGISTRE DES ÉTABLISSEMENTS</div><h2>Écoles et synchronisation</h2></div><button className="secondary-button" onClick={() => toast.info("Export du registre en préparation.")}><FileText size={15} /> Exporter</button></div><div className="table-wrap"><table><thead><tr><th>Établissement</th><th>Élèves</th><th>Dernière synchro</th><th>Qualité data</th><th>État</th></tr></thead><tbody>{schools.map((school) => <tr key={school.name}><td><div className="operation"><div className={cx("school-logo small", `school-${school.color}`)}><Building2 size={15} /></div><div><b>{school.name}</b><span>{school.location}</span></div></div></td><td>{school.students}</td><td>{school.sync}</td><td><div className="quality-cell"><ProgressBar value={school.color === "amber" ? 78 : 94} tone={school.color === "amber" ? "orange" : "teal"} /><b>{school.color === "amber" ? "78" : "94"}%</b></div></td><td><StatusPill tone={school.color === "amber" ? "warning" : "success"}>{school.status}</StatusPill><select className="school-system-select" aria-label={`Sous-système par défaut pour ${school.name}`} value={schoolSystems[school.name] ?? school.educationSystem} onChange={(event) => setSchoolSystem(school.name, event.target.value as EducationSystem)}><option value="francophone">FR · Francophone</option><option value="anglophone">EN · Anglophone</option></select></td></tr>)}</tbody></table></div></section></>; }
