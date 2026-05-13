"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Visão executiva", hint: "Síntese cruzada" },
  { href: "/esg", label: "Auditoria ESG", hint: "5 fornecedores · 450 requisitos" },
  { href: "/geografia", label: "Mata Atlântica", hint: "RJ · 2010–2024" },
  { href: "/municipios", label: "Geografia municipal", hint: "91 municípios" },
  { href: "/riscos", label: "Riscos & Oportunidades", hint: "Cross-dataset" },
];

export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="space-y-1">
      {links.map((l) => {
        const active =
          l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
        return (
          <li key={l.href}>
            <Link
              href={l.href}
              className={`group block px-4 py-3 border-l-2 transition-colors ${
                active
                  ? "border-gold bg-cream/60 text-canopy"
                  : "border-transparent hover:border-sage hover:bg-cream/40 text-bark"
              }`}
            >
              <div className="font-serif text-[17px] leading-tight">
                {l.label}
              </div>
              <div className="text-[10px] tracking-[0.18em] uppercase text-soil mt-1">
                {l.hint}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
