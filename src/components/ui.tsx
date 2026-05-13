import { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  italic,
  subtitle,
  meta,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  subtitle?: string;
  meta?: { label: string; value: string }[];
}) {
  return (
    <header className="editorial-rule pb-8 mb-12">
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="editorial font-serif font-extrabold text-canopy text-[clamp(34px,5vw,64px)] leading-[1.05] tracking-[-0.02em] mt-4">
        {title}
        {italic && (
          <>
            <br />
            <em className="not-italic font-light text-moss">{italic}</em>
          </>
        )}
      </h1>
      {subtitle && (
        <p className="text-[17px] text-bark max-w-2xl mt-5">{subtitle}</p>
      )}
      {meta && meta.length > 0 && (
        <div className="flex flex-wrap gap-x-8 gap-y-2 mt-6 text-[11px] tracking-[0.1em] uppercase text-moss">
          {meta.map((m) => (
            <span key={m.label}>
              {m.label} · <strong className="text-canopy">{m.value}</strong>
            </span>
          ))}
        </div>
      )}
    </header>
  );
}

export function SectionHeader({
  title,
  desc,
  right,
}: {
  title: string;
  desc?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
      <div className="max-w-2xl">
        <h2 className="editorial font-serif text-canopy text-[clamp(22px,2.6vw,30px)] tracking-[-0.01em]">
          {title}
        </h2>
        {desc && <p className="text-sm text-bark/85 mt-2">{desc}</p>}
      </div>
      {right}
    </div>
  );
}

export function KpiGrid({ children }: { children: ReactNode }) {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-canopy border border-canopy mb-14">
      {children}
    </section>
  );
}

export function Kpi({
  label,
  value,
  unit,
  accent,
}: {
  label: string;
  value: ReactNode;
  unit?: string;
  accent?: "rust" | "gold" | "moss";
}) {
  const accentColor =
    accent === "rust"
      ? "text-rust-deep"
      : accent === "gold"
      ? "text-gold"
      : accent === "moss"
      ? "text-moss"
      : "text-canopy";
  return (
    <div className="bg-paper px-6 py-7 hover:bg-cream/60 transition-colors">
      <div className="text-[10px] tracking-[0.2em] uppercase text-moss font-semibold">
        {label}
      </div>
      <div
        className={`editorial font-serif font-extrabold leading-[1.05] mt-3 text-[clamp(28px,3.2vw,40px)] ${accentColor}`}
      >
        {value}
      </div>
      {unit && (
        <div className="text-[11px] text-bark/80 mt-2 tracking-wide">
          {unit}
        </div>
      )}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const hasBg = /\bbg-/.test(className);
  const hasBorderColor = /\bborder-(canopy|moss|leaf|gold|rust|sage|paper|cream|soil|bark|ink)\b/.test(
    className,
  );
  const base = [
    hasBg ? "" : "bg-paper",
    "border",
    hasBorderColor ? "" : "border-canopy/15",
    "p-6 sm:p-7",
  ]
    .filter(Boolean)
    .join(" ");
  return <div className={`${base} ${className}`}>{children}</div>;
}

export function InsightList({ items }: { items: ReactNode[] }) {
  return (
    <div className="border-l-4 border-gold bg-cream/60 p-6 sm:p-8">
      <h3 className="editorial font-serif text-canopy text-2xl mb-4">
        O que os dados revelam
      </h3>
      <ol className="space-y-3 list-decimal pl-5 text-bark text-[15px] marker:text-gold marker:font-bold">
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ol>
    </div>
  );
}

export function StatusPill({ kind, label }: { kind: string; label?: string }) {
  const map: Record<string, string> = {
    Conforme: "bg-moss/15 text-moss border-moss/40",
    "Não conforme": "bg-rust/15 text-rust-deep border-rust/40",
    "Não enviado": "bg-soil/15 text-soil border-soil/40",
    "Em tratamento": "bg-gold/20 text-bark border-gold/40",
    Evidenciado: "bg-leaf/15 text-leaf border-leaf/40",
    "Não aplicável": "bg-bark/10 text-bark border-bark/30",
  };
  const cls = map[kind] ?? "bg-bark/10 text-bark border-bark/30";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-[11px] uppercase tracking-[0.08em] border ${cls}`}
    >
      {label ?? kind}
    </span>
  );
}
