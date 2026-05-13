import Link from "next/link";
import { NavLinks } from "./NavLinks";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen lg:flex">
      <aside className="lg:w-72 lg:min-h-screen lg:sticky lg:top-0 border-b lg:border-b-0 lg:border-r border-canopy/15 bg-paper-warm/60 backdrop-blur">
        <div className="px-7 py-8 flex flex-col h-full">
          <Link href="/" className="block">
            <span className="eyebrow">Observatório</span>
            <h1 className="editorial font-serif text-3xl text-canopy mt-3 leading-[1.05]">
              ESG <em className="not-italic font-light text-moss">&</em>
              <br />
              Território
            </h1>
            <p className="text-xs text-bark/80 mt-3 leading-relaxed">
              Auditoria de fornecedores e geografia do desmatamento — Rio de
              Janeiro.
            </p>
          </Link>

          <nav className="mt-10">
            <NavLinks />
          </nav>

          <div className="mt-auto pt-10 text-[10px] tracking-[0.18em] uppercase text-soil leading-relaxed">
            <div className="text-canopy font-semibold">Bruna Andrade</div>
            <div>Autora · Analista de dados</div>
            <div className="mt-2 text-bark/60">v1 · 2026</div>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 py-12 lg:py-16">
          {children}
        </div>
        <footer className="border-t border-canopy/15 mt-16">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 py-8 flex flex-wrap gap-4 justify-between text-[11px] tracking-[0.1em] uppercase text-soil">
            <span>
              Fonte ESG · <strong className="text-canopy">FORTRATEST · Greenlegis 2026</strong>
            </span>
            <span>
              Fonte territorial · <strong className="text-canopy">MapBiomas Coleção de Transições</strong>
            </span>
            <span>
              © 2026 · <strong className="text-canopy">Bruna Andrade</strong>
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
