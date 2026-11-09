import { useState } from "react";
import WorkspaceSwitcher from "@/components/WorkspaceSwitcher";
import {
  AlertTriangle,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FileCheck2,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Printer,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  CloudOff,
} from "lucide-react";
import { toast } from "sonner";

type Section = "overview" | "attendance" | "grades" | "bulletins" | "messages";
type Presence = "present" | "absent" | "late";
type Student = { id: string; name: string; sex: "F" | "M"; presence: Presence; avg: number; trend: "up" | "down" | "flat" };

const initialStudents: Student[] = [
  { id: "s1", name: "Amina Njoya", sex: "F", presence: "present", avg: 15.8, trend: "up" },
  { id: "s2", name: "Joseph Ateba", sex: "M", presence: "present", avg: 13.2, trend: "flat" },
  { id: "s3", name: "Fatima Hamadou", sex: "F", presence: "late", avg: 14.6, trend: "up" },
  { id: "s4", name: "Brice Mballa", sex: "M", presence: "present", avg: 9.4, trend: "down" },
  { id: "s5", name: "Grace Etoundi", sex: "F", presence: "present", avg: 17.1, trend: "up" },
  { id: "s6", name: "Ibrahim Moussa", sex: "M", presence: "absent", avg: 8.7, trend: "down" },
  { id: "s7", name: "Léa Fouda", sex: "F", presence: "present", avg: 12.9, trend: "flat" },
  { id: "s8", name: "Samuel Biyick", sex: "M", presence: "present", avg: 11.5, trend: "up" },
];

const schedule = [
  { time: "07:30 – 08:30", subject: "Mathématiques", topic: "Fractions et nombres décimaux", room: "CM2 A" },
  { time: "08:30 – 09:30", subject: "Français", topic: "Dictée et compréhension de texte", room: "CM2 A" },
  { time: "10:00 – 11:00", subject: "Sciences", topic: "Le cycle de l’eau", room: "CM2 A" },
  { time: "11:00 – 12:00", subject: "Éducation physique", topic: "Football for Schools · séance 4", room: "Terrain" },
];

const messages = [
  { from: "M. Ateba (parent de Joseph)", text: "Pouvez-vous m’indiquer les devoirs de la semaine ?", time: "Il y a 2 h", unread: true },
  { from: "Direction · Nkolbisson", text: "Rappel : remise des notes du T1 avant le 20 octobre.", time: "Hier", unread: true },
  { from: "Mme Hamadou (parent de Fatima)", text: "Merci pour le suivi, Fatima progresse bien.", time: "Lun.", unread: false },
];

const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

function Kpi({ label, value, helper, icon }: { label: string; value: string; helper: string; icon: React.ReactNode }) {
  return (
    <div className="kpi-card">
      <div className="kpi-top"><div className="icon-box icon-teal">{icon}</div></div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-label">{label}</div>
      <div className="kpi-helper">{helper}</div>
    </div>
  );
}

function Intro({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="page-intro"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action}</div>;
}

const titles: Record<Section, string> = {
  overview: "Ma journée",
  attendance: "Appel du jour",
  grades: "Saisie des notes",
  bulletins: "Bulletins à valider",
  messages: "Messages",
};

export default function Teacher() {
  const [section, setSection] = useState<Section>("overview");
  const [mobileNav, setMobileNav] = useState(false);
  const [students, setStudents] = useState(initialStudents);
  const [grades, setGrades] = useState<Record<string, string>>({ s1: "16", s2: "13", s3: "15" });
  const [validated, setValidated] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  const nav = (s: Section) => { setSection(s); setMobileNav(false); };
  const present = students.filter((s) => s.presence !== "absent").length;
  const rate = Math.round((present / students.length) * 100);
  const atRisk = students.filter((s) => s.avg < 10 || s.presence === "absent");

  const setPresence = (id: string, presence: Presence) => { setStudents((l) => l.map((s) => (s.id === id ? { ...s, presence } : s))); setSaved(false); };
  const saveAttendance = () => { setSaved(true); toast.success("Appel enregistré", { description: "Synchronisation automatique dès que le réseau est disponible." }); };
  const validate = (id: string, name: string) => { setValidated((v) => [...v, id]); toast.success(`Bulletin de ${name} validé`, { description: "Il sera partagé avec les parents." }); };

  const navItems: Array<{ id: Section; label: string; icon: React.ReactNode; badge?: string }> = [
    { id: "overview", label: "Ma journée", icon: <LayoutDashboard size={18} /> },
    { id: "attendance", label: "Appel & présence", icon: <Users size={18} /> },
    { id: "grades", label: "Notes", icon: <ClipboardList size={18} /> },
    { id: "bulletins", label: "Bulletins", icon: <FileCheck2 size={18} />, badge: String(initialStudents.length - 3 - validated.length) },
    { id: "messages", label: "Messages", icon: <MessageSquare size={18} />, badge: "2" },
  ];

  return (
    <div className="app-shell">
      <aside className={cx("sidebar", mobileNav && "sidebar-open")}>
        <div className="brand"><div className="brand-mark"><Sparkles size={19} /></div><div><strong>KAMILI</strong><span>ÉDUC · ENSEIGNANT</span></div><button className="mobile-close" onClick={() => setMobileNav(false)} aria-label="Fermer le menu"><X size={18} /></button></div>
        <WorkspaceSwitcher current="teacher" subtitle="É.P. de Nkolbisson" />
        <div className="nav-label">Mon espace</div>
        <nav className="main-nav">
          {navItems.map((n) => (
            <button key={n.id} className={cx(section === n.id && "active")} onClick={() => nav(n.id)}>{n.icon} {n.label} {n.badge && n.badge !== "0" && <span className="nav-count">{n.badge}</span>}</button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="security-note"><ShieldCheck size={16} /><div><b>Mode sécurisé</b><span>Données de démonstration</span></div></div>
          <div className="profile-mini"><div className="profile-avatar">EN</div><div><b>Mme Esther Ndongo</b><span>Enseignante · CM2 A</span></div></div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar"><button className="mobile-menu" onClick={() => setMobileNav(true)} aria-label="Ouvrir le menu"><Menu size={21} /></button><div className="breadcrumb"><span>Kamili Éduc</span><ChevronRight size={14} /><span>Enseignant</span><ChevronRight size={14} /><b>{titles[section]}</b></div></header>
        <div className="content-wrap">
          <div className="demo-banner"><div className="demo-banner-icon"><CloudOff size={17} /></div><div><b>Pensé pour le terrain</b><span>L’appel et les notes fonctionnent hors connexion. Données fictives de démonstration.</span></div></div>

          {section === "overview" && <>
            <Intro eyebrow="Mardi 14 octobre 2026" title="Bonjour, Mme Ndongo" description="Votre classe de CM2 A, vos cours du jour et ce qui demande votre attention." action={<button className="primary-button" onClick={() => nav("attendance")}><Users size={16} /> Faire l’appel <ChevronRight size={16} /></button>} />
            <div className="kpi-grid">
              <Kpi label="Élèves" value={String(students.length)} helper="CM2 A · 4 filles, 4 garçons (extrait)" icon={<Users size={19} />} />
              <Kpi label="Présence du jour" value={`${rate} %`} helper={`${present} présents sur ${students.length}`} icon={<CheckCircle2 size={19} />} />
              <Kpi label="Notes à saisir" value={String(students.length - Object.keys(grades).length)} helper="Évaluation de Mathématiques" icon={<ClipboardList size={19} />} />
              <Kpi label="Bulletins à valider" value={String(initialStudents.length - 3 - validated.length)} helper="avant le 20 octobre" icon={<FileCheck2 size={19} />} />
            </div>
            <div className="dashboard-grid main-grid">
              <section className="panel">
                <div className="panel-header"><div><div className="panel-kicker">EMPLOI DU TEMPS</div><h2>Mes cours aujourd’hui</h2></div><CalendarDays size={18} /></div>
                <div className="session-list">
                  {schedule.map((c) => <div className="session-row" key={c.time}><div className="session-date">{c.time}</div><div className="session-info"><b>{c.subject}</b><span>{c.topic} · {c.room}</span></div><BookOpen size={15} /></div>)}
                </div>
              </section>
              <section className="panel priority-panel">
                <div className="panel-header"><div><div className="panel-kicker">À SUIVRE</div><h2>Élèves à accompagner</h2></div><span className="alert-count">{atRisk.length}</span></div>
                <div className="priority-list">
                  {atRisk.map((s) => <button key={s.id} className="priority-item" onClick={() => nav("messages")}><div className="priority-icon icon-orange"><AlertTriangle size={17} /></div><div><b>{s.name}</b><span>{s.presence === "absent" ? "Absent aujourd’hui" : `Moyenne ${s.avg.toString().replace(".", ",")} / 20`}</span></div><ChevronRight size={16} /></button>)}
                </div>
              </section>
            </div>
          </>}

          {section === "attendance" && <>
            <Intro eyebrow="Mardi 14 octobre · 07:30" title="Appel du jour" description="Touchez l’état de chaque élève. L’appel est enregistré même sans réseau." action={<button className="primary-button" onClick={saveAttendance}><Check size={16} /> {saved ? "Appel enregistré" : "Enregistrer l’appel"}</button>} />
            <section className="panel table-panel"><div className="table-wrap"><table>
              <thead><tr><th>Élève</th><th>Présence</th></tr></thead>
              <tbody>{students.map((s) => <tr key={s.id}><td><b>{s.name}</b></td><td>
                {(["present", "late", "absent"] as Presence[]).map((p) => <button key={p} className={cx(s.presence === p ? "primary-button" : "secondary-button")} style={{ marginRight: 6, padding: "6px 12px" }} onClick={() => setPresence(s.id, p)}>{p === "present" ? "Présent" : p === "late" ? "Retard" : "Absent"}</button>)}
              </td></tr>)}</tbody>
            </table></div></section>
          </>}

          {section === "grades" && <>
            <Intro eyebrow="Évaluation · Mathématiques · Séquence 1" title="Saisie des notes" description="Entrez les notes sur 20. Les moyennes sont calculées automatiquement." action={<button className="primary-button" onClick={() => toast.success("Notes enregistrées", { description: "Brouillon sauvegardé localement." })}><Check size={16} /> Enregistrer</button>} />
            <section className="panel table-panel"><div className="table-wrap"><table>
              <thead><tr><th>Élève</th><th>Note / 20</th><th>Moyenne générale</th><th>Tendance</th></tr></thead>
              <tbody>{students.map((s) => <tr key={s.id}><td><b>{s.name}</b></td>
                <td><input type="number" min={0} max={20} step={0.5} value={grades[s.id] ?? ""} onChange={(e) => setGrades((g) => ({ ...g, [s.id]: e.target.value }))} style={{ width: 80, padding: "6px 8px", border: "1px solid #d0d7de", borderRadius: 8 }} aria-label={`Note de ${s.name}`} /></td>
                <td>{s.avg.toString().replace(".", ",")} / 20</td>
                <td><span className={cx("status-pill", s.trend === "up" ? "status-success" : s.trend === "down" ? "status-warning" : "status-neutral")}>{s.trend === "up" ? "En hausse" : s.trend === "down" ? "En baisse" : "Stable"}</span></td></tr>)}</tbody>
            </table></div></section>
          </>}

          {section === "bulletins" && <>
            <Intro eyebrow="Validation humaine obligatoire" title="Bulletins à valider" description="Contrôlez notes et appréciation avant partage aux parents." />
            <section className="panel table-panel"><div className="table-wrap"><table>
              <thead><tr><th>Élève</th><th>Moyenne</th><th>État</th><th /></tr></thead>
              <tbody>{students.map((s, i) => { const done = i < 3 || validated.includes(s.id); return <tr key={s.id}><td><b>{s.name}</b></td><td>{s.avg.toString().replace(".", ",")} / 20</td>
                <td><span className={cx("status-pill", done ? "status-success" : "status-warning")}>{done ? "Validé" : "À valider"}</span></td>
                <td>{done ? <button className="secondary-button" onClick={() => toast.info("Impression du bulletin préparée.")}><Printer size={15} /> Imprimer</button> : <button className="primary-button" onClick={() => validate(s.id, s.name)}><Check size={15} /> Valider</button>}</td></tr>; })}</tbody>
            </table></div></section>
          </>}

          {section === "messages" && <>
            <Intro eyebrow="Parents & direction" title="Messages" description="Échangez avec les familles et la direction de l’école." />
            <section className="panel"><div className="priority-list">
              {messages.map((m) => <button key={m.from} className="priority-item" onClick={() => toast.info("Réponse : fonctionnalité du pilote.")}><div className={cx("priority-icon", m.unread ? "icon-orange" : "icon-teal")}><MessageSquare size={17} /></div><div><b>{m.from}</b><span>{m.text} · {m.time}</span></div><ChevronRight size={16} /></button>)}
            </div></section>
          </>}
        </div>
      </main>
    </div>
  );
}
