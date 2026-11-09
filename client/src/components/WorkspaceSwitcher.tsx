import { useState } from "react";
import { useLocation } from "wouter";
import { Check, ChevronRight, GraduationCap, Landmark } from "lucide-react";

export type Workspace = "admin" | "teacher";

const OPTIONS: Array<{ id: Workspace; initial: string; title: string; role: string; path: string; icon: typeof Landmark }> = [
  { id: "admin", initial: "M", title: "MINEDUB · Pilote", role: "Administrateur", path: "/", icon: Landmark },
  { id: "teacher", initial: "E", title: "Enseignant · CM2 A", role: "Mme Esther Ndongo", path: "/enseignant", icon: GraduationCap },
];

export default function WorkspaceSwitcher({ current, subtitle }: { current: Workspace; subtitle: string }) {
  const [open, setOpen] = useState(false);
  const [, setLocation] = useLocation();
  const active = OPTIONS.find((o) => o.id === current)!;

  return (
    <div style={{ position: "relative", marginBottom: 26 }}>
      <button type="button" className="workspace-switch" style={{ width: "100%", marginBottom: 0, textAlign: "left", cursor: "pointer" }} onClick={() => setOpen((v) => !v)} aria-haspopup="listbox" aria-expanded={open}>
        <div className="workspace-avatar">{active.initial}</div>
        <div><small>ESPACE ACTIF</small><b>{active.title}</b><span className="workspace-subsystem">{subtitle}</span></div>
        <ChevronRight size={15} style={{ transform: open ? "rotate(90deg)" : undefined, transition: ".18s" }} />
      </button>
      {open && (
        <div role="listbox" style={{ position: "absolute", zIndex: 30, left: 0, right: 0, top: "calc(100% + 6px)", padding: 6, borderRadius: 12, background: "#123e3a", border: "1px solid rgba(183,224,215,.22)", boxShadow: "0 12px 30px rgba(0,0,0,.35)" }}>
          {OPTIONS.map((o) => (
            <button key={o.id} type="button" role="option" aria-selected={o.id === current}
              onClick={() => { setOpen(false); if (o.id !== current) setLocation(o.path); }}
              style={{ display: "flex", width: "100%", alignItems: "center", gap: 9, padding: "9px 8px", border: 0, borderRadius: 8, background: o.id === current ? "rgba(255,255,255,.08)" : "transparent", color: "#f1faf7", textAlign: "left", cursor: "pointer" }}>
              <div className="workspace-avatar"><o.icon size={15} /></div>
              <div style={{ flex: 1, minWidth: 0 }}><b style={{ display: "block", fontSize: 11 }}>{o.title}</b><span style={{ fontSize: 9, color: "#8dd8c8" }}>{o.role}</span></div>
              {o.id === current && <Check size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
