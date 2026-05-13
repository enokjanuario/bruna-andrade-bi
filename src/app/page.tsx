import Link from "next/link";
import { Card, InsightList, Kpi, KpiGrid, PageHeader, SectionHeader } from "../components/ui";
import { LineTrend } from "../components/charts/LineTrend";
import { MaturityGauge } from "../components/charts/MaturityGauge";
import { Radar3 } from "../components/charts/Radar3";
import { desmatamentoAnual, geografiaResumo } from "../lib/geografia";
import { executivoKpis, resultados } from "../lib/esg";
import { fmtNum, fmtPct } from "../lib/format";

export default function HomePage() {
  const kpi = executivoKpis();
  const geo = geografiaResumo();

  const tendencia = desmatamentoAnual.map((d) => ({
    ano: d.ano,
    total:
      d["Plantação Florestal"] +
      d["Outras Lavouras Temporárias"] +
      d["Cana-de-açúcar"] +
      d.Soja,
  }));

  const radarData = ["Ambiental", "Social", "Governança"].map((p, i) => {
    const k = (["Maturidade (E)", "Maturidade (S)", "Maturidade (G)"] as const)[i];
    const obj: { pilar: string; [k: string]: string | number } = { pilar: p };
    for (const r of resultados) {
      obj[r.Fornecedor] = r[k];
    }
    return obj;
  });

  const radarSeries = resultados.map((r, i) => ({
    key: r.Fornecedor,
    label: r.Fornecedor.split(" ")[0],
    color: ["#1f4d2e", "#b8543c", "#d4a843", "#6b4423", "#2d6a3e"][i % 5],
  }));

  return (
    <>
      <PageHeader
        eyebrow="Observatório · 2026"
        title="Geografia da pressão"
        italic="e auditoria da resposta"
        subtitle="Dois retratos complementares — a floresta fluminense sob pressão e os fornecedores da cadeia FORTRATEST sob escrutínio ESG. Onde o território denuncia o passivo ambiental, a auditoria revela quem está pronto para responder."
        meta={[
          { label: "Período", value: "2010 – 2026" },
          { label: "Fontes", value: "MapBiomas · Greenlegis" },
          { label: "Autoria", value: "Bruna Andrade" },
        ]}
      />

      <KpiGrid>
        <Kpi label="Maturidade ESG média" value={fmtPct(kpi.matMedia)} unit={`${kpi.fornecedoresCount} fornecedores avaliados`} accent="gold" />
        <Kpi label="Requisitos avaliados" value={fmtNum(kpi.total)} unit={`${fmtPct(kpi.conformidade)} de conformidade média`} />
        <Kpi label="Fornecedores críticos" value={fmtNum(kpi.criticos)} unit="abaixo de 40% de maturidade" accent="rust" />
        <Kpi label="Floresta convertida (RJ)" value="1.112,7" unit="hectares · 2010–2024" accent="moss" />
      </KpiGrid>

      <section className="grid lg:grid-cols-[1.4fr_1fr] gap-8 mb-16">
        <Card>
          <SectionHeader
            title="Desmatamento da Mata Atlântica fluminense"
            desc={
              <>
                Hectares de floresta nativa convertidos em área agrícola, ano a ano. O pico de{" "}
                <strong className="text-canopy">2018/2019 (342 ha)</strong> permanece como evento-sentinela; após 2020 a queda chega a <strong className="text-canopy">−89%</strong>.
              </>
            }
          />
          <div className="-mx-2">
            <LineTrend data={tendencia} xKey="ano" yKey="total" height={300} unit="ha" />
          </div>
          <div className="pt-4 mt-4 border-t border-canopy/10 flex flex-wrap gap-x-8 gap-y-2 text-[12px] text-bark">
            <span>
              Pico · <strong className="text-canopy">2018/19</strong>
            </span>
            <span>
              Plantação florestal · <strong className="text-canopy">97,8%</strong> do total
            </span>
            <span>
              Cana / soja · <strong className="text-canopy">0 ha</strong>
            </span>
            <Link
              href="/geografia"
              className="ml-auto text-moss underline-offset-4 underline decoration-gold hover:text-canopy"
            >
              ver análise completa →
            </Link>
          </div>
        </Card>

        <Card>
          <SectionHeader
            title="Radar dos fornecedores"
            desc="Maturidade por pilar (Ambiental · Social · Governança) — sobreposição revela quem responde de forma equilibrada e quem é desigual."
          />
          <Radar3 data={radarData} series={radarSeries} height={320} />
          <div className="pt-4 mt-4 border-t border-canopy/10 text-[12px] text-bark">
            <Link
              href="/esg"
              className="text-moss underline-offset-4 underline decoration-gold hover:text-canopy"
            >
              ver auditoria detalhada →
            </Link>
          </div>
        </Card>
      </section>

      <section className="mb-16">
        <SectionHeader
          title="Maturidade ESG por fornecedor"
          desc="Cinco fornecedores. Cinco realidades — da excelência ao colapso documental."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {resultados.map((r) => (
            <Card key={r.Fornecedor} className="text-center">
              <div className="text-[10px] tracking-[0.18em] uppercase text-soil h-8 leading-tight flex items-center justify-center">
                {r.Fornecedor}
              </div>
              <div className="my-4 flex justify-center">
                <MaturityGauge value={r["Maturidade ESG"]} label={r.Classificação.replace(/^Nível \d+ - /, "")} size={150} />
              </div>
              <div className="text-[11px] text-bark/80">{r.Classificação}</div>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-8 mb-16">
        <InsightList
          items={[
            <>
              A <strong>Plantação Florestal</strong> (eucalipto e pinus) responde por <strong>97,8%</strong> de toda a conversão da Mata Atlântica fluminense desde 2010 — vetor único, política única.
            </>,
            <>
              Apenas <strong>2 dos 5 fornecedores</strong> atingem excelência ESG (≥80%); os outros <strong>3</strong> estão em risco — sendo <strong>1 crítico</strong> abaixo de 10%.
            </>,
            <>
              O bloco <strong>2015–2020</strong> concentrou 610 ha perdidos — mais que a soma dos outros dois períodos. A virada de 2020 segura <strong>65 ha</strong> em 4 anos.
            </>,
            <>
              <strong>{fmtNum(kpi.naoConformes)}</strong> requisitos não conformes e <strong>{fmtNum(kpi.naoEnviados)}</strong> não enviados — a falha de evidência é maior que a falha de processo.
            </>,
            <>
              Cachoeiras de Macacu, Paraíba do Sul, Teresópolis, Silva Jardim e Valença concentram <strong>{fmtPct(geo.top10Concentracao)}</strong> da transformação territorial — a pressão tem geografia.
            </>,
          ]}
        />

        <Card className="bg-canopy text-cream border-canopy">
          <div className="eyebrow text-gold-soft">Leitura cruzada</div>
          <h3 className="editorial font-serif text-3xl mt-3 mb-4 text-cream leading-tight">
            Onde o território cobra, a governança responde.
          </h3>
          <p className="text-cream/85 text-[15px]">
            O Rio de Janeiro mostra dois tempos: a floresta nativa que se recupera no ritmo das políticas públicas pós-2020 e uma cadeia produtiva que ainda divide-se entre quem documenta tudo e quem documenta nada. A reputação ESG do estado dependerá menos do que se planta e mais de quem fiscaliza — e do que se prova.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/riscos"
              className="inline-block bg-gold text-canopy px-5 py-2.5 text-[11px] tracking-[0.15em] uppercase font-semibold hover:bg-gold-soft transition-colors"
            >
              Riscos & oportunidades →
            </Link>
            <Link
              href="/esg"
              className="inline-block border border-gold text-gold px-5 py-2.5 text-[11px] tracking-[0.15em] uppercase font-semibold hover:bg-gold/20 transition-colors"
            >
              Ver auditoria
            </Link>
          </div>
        </Card>
      </section>
    </>
  );
}
