import { Card, InsightList, Kpi, KpiGrid, PageHeader, SectionHeader } from "../../components/ui";
import { HorizontalBar } from "../../components/charts/HorizontalBar";
import { geografiaResumo, municipios } from "../../lib/geografia";
import { fmtHa, fmtNum, fmtPct } from "../../lib/format";

export default function MunicipiosPage() {
  const r = geografiaResumo();
  const ordenado = [...municipios].sort((a, b) => Math.abs(b.v) - Math.abs(a.v));
  const top20 = ordenado.slice(0, 20);

  const perdaFlorestal = [...municipios].filter((m) => m.v > 0).sort((a, b) => b.v - a.v);
  const avancoAgricola = [...municipios]
    .filter((m) => m.v < 0)
    .sort((a, b) => a.v - b.v)
    .slice(0, 20);

  return (
    <>
      <PageHeader
        eyebrow="MapBiomas · Município"
        title="Geografia da pressão"
        italic="sobre a floresta"
        subtitle="Ranking dos 91 municípios fluminenses pelo impacto de transição do uso da terra. Valores positivos = perda florestal; negativos = avanço agrícola. Dois lados de uma mesma transformação."
        meta={[
          { label: "Municípios", value: "91" },
          { label: "Movimentação", value: `${fmtNum(r.totalTransformacao, 0)} ha` },
          { label: "Top 10", value: `${fmtPct(r.top10Concentracao)} do total` },
          { label: "Fonte", value: "MapBiomas" },
        ]}
      />

      <Card className="mb-10 bg-cream/70 border-l-4 border-l-gold">
        <p className="text-bark text-[14px]">
          <strong className="text-canopy">Como ler:</strong>{" "}
          <span className="inline-block px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] bg-rust-deep/15 text-rust-deep border border-rust-deep/30 mx-1">
            Positivos
          </span>
          indicam <strong>perda de área florestal</strong> ·{" "}
          <span className="inline-block px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] bg-moss/15 text-moss border border-moss/30 mx-1">
            Negativos
          </span>
          indicam <strong>aumento de área plantada/agrícola</strong>. Ambos são transformações no uso da terra.
        </p>
      </Card>

      <KpiGrid>
        <Kpi label="Total transformado" value={fmtNum(r.totalTransformacao, 0)} unit="hectares movimentados" />
        <Kpi label="Município líder" value="Cachoeiras" unit="2.405 ha de avanço agrícola" accent="moss" />
        <Kpi label="Maior perda florestal" value="Rio de Janeiro" unit="174 ha · capital lidera" accent="rust" />
        <Kpi label="Concentração top 10" value={fmtPct(r.top10Concentracao)} unit="da movimentação total" accent="gold" />
      </KpiGrid>

      <section className="mb-16">
        <Card>
          <SectionHeader
            title="Top 20 — Maior impacto absoluto"
            desc="Os municípios que mais movimentaram floresta ou área plantada, somando perdas e avanços."
          />
          <HorizontalBar
            data={top20 as unknown as Record<string, string | number>[]}
            xKey="v"
            yKey="m"
            unit="ha"
            height={620}
          />
        </Card>
      </section>

      <section className="grid lg:grid-cols-2 gap-8 mb-16">
        <Card>
          <SectionHeader
            title="Perda florestal líquida"
            desc="Os únicos 9 municípios onde, no líquido, a floresta cedeu mais do que cresceu."
          />
          <div className="overflow-hidden border border-canopy/15">
            <table className="w-full text-[13px]">
              <thead className="bg-canopy text-cream">
                <tr>
                  <th className="text-left px-4 py-2.5 text-[11px] tracking-[0.1em] uppercase">#</th>
                  <th className="text-left px-4 py-2.5 text-[11px] tracking-[0.1em] uppercase">Município</th>
                  <th className="text-right px-4 py-2.5 text-[11px] tracking-[0.1em] uppercase">Hectares</th>
                </tr>
              </thead>
              <tbody>
                {perdaFlorestal.map((m, i) => (
                  <tr key={m.m} className="border-b border-canopy/8 hover:bg-cream/60">
                    <td className="px-4 py-2 font-serif text-soil">{i + 1}</td>
                    <td className="px-4 py-2 text-bark">{m.m}</td>
                    <td className="px-4 py-2 text-right tabular-nums">
                      <strong className="text-rust-deep">+{m.v.toFixed(2)}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <SectionHeader
            title="Top 20 — Avanço agrícola"
            desc="Onde a expansão de área plantada foi mais intensa no período."
          />
          <div className="overflow-hidden border border-canopy/15 max-h-[480px] overflow-y-auto">
            <table className="w-full text-[13px]">
              <thead className="bg-canopy text-cream sticky top-0">
                <tr>
                  <th className="text-left px-4 py-2.5 text-[11px] tracking-[0.1em] uppercase">#</th>
                  <th className="text-left px-4 py-2.5 text-[11px] tracking-[0.1em] uppercase">Município</th>
                  <th className="text-right px-4 py-2.5 text-[11px] tracking-[0.1em] uppercase">Hectares</th>
                </tr>
              </thead>
              <tbody>
                {avancoAgricola.map((m, i) => (
                  <tr key={m.m} className="border-b border-canopy/8 hover:bg-cream/60">
                    <td className="px-4 py-2 font-serif text-soil">{i + 1}</td>
                    <td className="px-4 py-2 text-bark">{m.m}</td>
                    <td className="px-4 py-2 text-right tabular-nums">
                      <strong className="text-moss">{Math.abs(m.v).toFixed(2)}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      <section className="mb-16">
        <SectionHeader
          title="Tabela completa — 91 municípios"
          desc="Universo ordenado por impacto absoluto. Role para explorar a cauda."
        />
        <Card className="p-0 overflow-hidden">
          <div className="overflow-y-auto max-h-[560px]">
            <table className="w-full text-[13px]">
              <thead className="bg-canopy text-cream sticky top-0">
                <tr>
                  <th className="text-left px-4 py-2.5 text-[11px] tracking-[0.1em] uppercase">#</th>
                  <th className="text-left px-4 py-2.5 text-[11px] tracking-[0.1em] uppercase">Município</th>
                  <th className="text-right px-4 py-2.5 text-[11px] tracking-[0.1em] uppercase">Hectares</th>
                  <th className="text-left px-4 py-2.5 text-[11px] tracking-[0.1em] uppercase">Tipo</th>
                </tr>
              </thead>
              <tbody>
                {ordenado.map((m, i) => (
                  <tr key={m.m} className="border-b border-canopy/8 hover:bg-cream/60">
                    <td className="px-4 py-2 font-serif text-soil tabular-nums">{i + 1}</td>
                    <td className="px-4 py-2 text-bark">{m.m}</td>
                    <td className="px-4 py-2 text-right tabular-nums">
                      <strong className={m.v > 0 ? "text-rust-deep" : m.v < 0 ? "text-moss" : "text-bark/50"}>
                        {m.v > 0 ? "+" : ""}{m.v.toFixed(2)}
                      </strong>
                    </td>
                    <td className="px-4 py-2 text-[11px] uppercase tracking-[0.08em]">
                      {m.v > 0 ? (
                        <span className="text-rust-deep">perda florestal</span>
                      ) : m.v < 0 ? (
                        <span className="text-moss">avanço agrícola</span>
                      ) : (
                        <span className="text-bark/50">neutro</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      <InsightList
        items={[
          <>
            <strong>Cachoeiras de Macacu</strong> lidera o avanço agrícola com <strong>{fmtHa(2405.5)}</strong> — quase 5% de toda transformação dos 91 municípios.
          </>,
          <>
            A perda florestal é <strong>concentrada</strong>: só <strong>9 municípios</strong> registraram desmatamento líquido positivo, somando 770 ha. A capital lidera com 174 ha.
          </>,
          <>
            O avanço agrícola é massivo em comparação: 81 municípios somam <strong>{fmtHa(52006)}</strong> — quase <strong>67×</strong> a perda florestal direta.
          </>,
          <>
            Top 10 municípios concentram <strong>{fmtPct(r.top10Concentracao)}</strong> do impacto estadual — dinâmica espacial desigual entre regiões.
          </>,
          <>
            Regiões <strong>serrana e centro-norte</strong> (Cachoeiras, Paraíba do Sul, Teresópolis, Silva Jardim, Valença) dominam o topo — onde a pressão de expansão pesa mais.
          </>,
        ]}
      />
    </>
  );
}
