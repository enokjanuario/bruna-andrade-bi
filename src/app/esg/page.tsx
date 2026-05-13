import { Card, InsightList, Kpi, KpiGrid, PageHeader, SectionHeader, StatusPill } from "../../components/ui";
import { Donut } from "../../components/charts/Donut";
import { Radar3 } from "../../components/charts/Radar3";
import { MaturityGauge } from "../../components/charts/MaturityGauge";
import {
  dados,
  executivoKpis,
  fornecedores,
  gestaoBreakdown,
  gestaoLabel,
  niveisRef,
  pilarBreakdown,
  pilarCor,
  resultados,
  statusByFornecedor,
  statusCor,
  statusCounts,
} from "../../lib/esg";
import { fmtNum, fmtPct } from "../../lib/format";

export default function EsgPage() {
  const kpi = executivoKpis();
  const status = statusCounts();
  const statusF = statusByFornecedor();
  const pilarB = pilarBreakdown();
  const gestao = gestaoBreakdown();

  const statusDonut = Object.entries(status)
    .filter(([k]) => k && k !== "Desconhecido" && k !== "0")
    .map(([name, value]) => ({ name, value }));

  const radarData = ["Ambiental", "Social", "Governança"].map((p, i) => {
    const k = (["Maturidade (E)", "Maturidade (S)", "Maturidade (G)"] as const)[i];
    const obj: { pilar: string; [k: string]: string | number } = { pilar: p };
    for (const r of resultados) obj[r.Fornecedor] = r[k];
    return obj;
  });

  const radarSeries = resultados.map((r, i) => ({
    key: r.Fornecedor,
    label: r.Fornecedor.split(" ")[0],
    color: ["#1f4d2e", "#b8543c", "#d4a843", "#6b4423", "#2d6a3e"][i % 5],
  }));

  const pilarBars = Object.entries(pilarB).map(([pilar, bd]) => {
    const total = Object.values(bd).reduce((s, v) => s + v, 0);
    const conformes = (bd.Conforme ?? 0) + (bd.Evidenciado ?? 0);
    return {
      pilar,
      conformes,
      naoConformes: bd["Não conforme"] ?? 0,
      naoEnviados: bd["Não enviado"] ?? 0,
      total,
      pctConforme: total ? conformes / total : 0,
    };
  });

  const gestaoEntries = Object.entries(gestao)
    .map(([k, v]) => ({
      gestao: k,
      label: gestaoLabel[k] ?? k,
      ...v,
      pct: v.total ? v.conforme / v.total : 0,
    }))
    .sort((a, b) => b.total - a.total);

  return (
    <>
      <PageHeader
        eyebrow="Auditoria ESG · FORTRATEST"
        title="O dossiê de cinco"
        italic="fornecedores"
        subtitle="450 requisitos avaliados em 5 fornecedores, 3 pilares e 9 áreas de gestão. A leitura completa de quem está pronto para a próxima onda regulatória — e quem ainda não juntou os papéis."
        meta={[
          { label: "Fornecedores", value: String(kpi.fornecedoresCount) },
          { label: "Requisitos", value: fmtNum(kpi.total) },
          { label: "Conformidade", value: fmtPct(kpi.conformidade) },
          { label: "Fonte", value: "Greenlegis 2026" },
        ]}
      />

      <KpiGrid>
        <Kpi label="Maturidade média" value={fmtPct(kpi.matMedia)} unit="média ponderada E·S·G" accent="gold" />
        <Kpi label="Conformes + evidenciados" value={fmtNum(kpi.conformes)} unit={`${fmtPct(kpi.conformidade)} do total`} accent="moss" />
        <Kpi label="Não conformes" value={fmtNum(kpi.naoConformes)} unit="requisitos com falha documentada" accent="rust" />
        <Kpi label="Não enviados" value={fmtNum(kpi.naoEnviados)} unit="quick wins de adequação documental" />
      </KpiGrid>

      <section className="grid lg:grid-cols-[1fr_1.2fr] gap-8 mb-16">
        <Card>
          <SectionHeader
            title="Distribuição dos status"
            desc="Como o universo de 450 requisitos se reparte entre conformidade, falha, documentação ausente e exceções."
          />
          <Donut data={statusDonut} colors={statusCor} height={300} inner={66} />
        </Card>

        <Card>
          <SectionHeader
            title="Radar ESG dos fornecedores"
            desc="Sobreposição direta — note como Governança puxa mais que Ambiental & Social para baixo nos casos críticos."
          />
          <Radar3 data={radarData} series={radarSeries} height={320} />
        </Card>
      </section>

      <section className="mb-16">
        <SectionHeader
          title="Painel individual por fornecedor"
          desc="Cinco diagnósticos em painel — comparação direta de maturidade, status e tamanho da amostra."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {resultados.map((r) => {
            const sb = statusF[r.Fornecedor] ?? {};
            const total = Object.values(sb).reduce((s, v) => s + v, 0);
            const conf = (sb.Conforme ?? 0) + (sb.Evidenciado ?? 0);
            return (
              <Card key={r.Fornecedor} className="flex flex-col">
                <div className="text-[10px] tracking-[0.18em] uppercase text-soil leading-tight min-h-[36px]">
                  {r.Fornecedor}
                </div>
                <div className="flex justify-center my-3">
                  <MaturityGauge value={r["Maturidade ESG"]} label={r.Classificação.replace(/^Nível \d+ - /, "")} size={140} />
                </div>
                <div className="mt-2 space-y-1 text-[12px] border-t border-canopy/10 pt-3">
                  <div className="flex justify-between"><span className="text-bark/75">Ambiental (E)</span><strong className="text-canopy">{fmtPct(r["Maturidade (E)"])}</strong></div>
                  <div className="flex justify-between"><span className="text-bark/75">Social (S)</span><strong className="text-canopy">{fmtPct(r["Maturidade (S)"])}</strong></div>
                  <div className="flex justify-between"><span className="text-bark/75">Governança (G)</span><strong className="text-canopy">{fmtPct(r["Maturidade (G)"])}</strong></div>
                </div>
                <div className="mt-3 pt-3 border-t border-canopy/10 text-[11px] text-bark/85">
                  <div className="flex justify-between"><span>Requisitos</span><strong className="text-canopy">{total}</strong></div>
                  <div className="flex justify-between"><span>Conformes</span><strong className="text-moss">{conf}</strong></div>
                  <div className="flex justify-between"><span>Não conformes</span><strong className="text-rust-deep">{sb["Não conforme"] ?? 0}</strong></div>
                  <div className="flex justify-between"><span>Não enviados</span><strong className="text-soil">{sb["Não enviado"] ?? 0}</strong></div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-8 mb-16">
        <Card>
          <SectionHeader
            title="Por pilar ESG"
            desc="Onde a conformidade pesa e onde escorre."
          />
          <div className="space-y-5">
            {pilarBars.map((b) => (
              <div key={b.pilar}>
                <div className="flex justify-between items-baseline mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-3 h-3"
                      style={{ background: pilarCor[b.pilar] }}
                    />
                    <span className="font-serif text-canopy text-lg">{b.pilar}</span>
                  </div>
                  <div className="text-xs text-bark/80">
                    {b.total} req · <strong className="text-canopy">{fmtPct(b.pctConforme)}</strong> conformes
                  </div>
                </div>
                <div className="h-2.5 bg-cream border border-canopy/10 flex overflow-hidden">
                  <div className="h-full bg-moss" style={{ width: `${(b.conformes / b.total) * 100}%` }} />
                  <div className="h-full bg-rust" style={{ width: `${(b.naoConformes / b.total) * 100}%` }} />
                  <div className="h-full bg-soil" style={{ width: `${(b.naoEnviados / b.total) * 100}%` }} />
                </div>
                <div className="flex gap-4 text-[10px] tracking-[0.1em] uppercase text-bark/70 mt-1.5">
                  <span>Conformes {b.conformes}</span>
                  <span>Não conformes {b.naoConformes}</span>
                  <span>Não enviados {b.naoEnviados}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader
            title="Por área de gestão"
            desc="SSO domina o passivo. Trabalhista é o segundo vetor."
          />
          <div className="space-y-3">
            {gestaoEntries.map((g) => (
              <div key={g.gestao} className="grid grid-cols-[140px_1fr_70px] items-center gap-3 text-[12px]">
                <div className="text-bark/85 truncate">
                  <span className="font-mono text-[10px] text-soil mr-1.5">{g.gestao}</span>
                  {g.label}
                </div>
                <div className="h-2 bg-cream border border-canopy/10 overflow-hidden">
                  <div
                    className="h-full"
                    style={{
                      width: `${g.pct * 100}%`,
                      background: g.pct >= 0.7 ? "#2d6a3e" : g.pct >= 0.4 ? "#d4a843" : "#b8543c",
                    }}
                  />
                </div>
                <div className="text-right tabular-nums">
                  <strong className="text-canopy">{fmtPct(g.pct, 0)}</strong>
                  <span className="text-soil text-[10px] ml-1">/{g.total}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mb-16">
        <SectionHeader
          title="Referencial de maturidade"
          desc="Cinco níveis · cinco realidades possíveis. A escala que define quem responde a um RFP ESG e quem fica de fora."
        />
        <div className="grid md:grid-cols-5 gap-0 border border-canopy">
          {niveisRef.map((n) => {
            const colors = ["#b8543c", "#d4a843", "#6b9b7a", "#2d6a3e", "#1f4d2e"];
            return (
              <div key={n.nivel} className="bg-paper p-5 border-r border-canopy/15 last:border-r-0">
                <div className="text-[10px] tracking-[0.18em] uppercase font-semibold" style={{ color: colors[n.nivel - 1] }}>
                  Nível {n.nivel}
                </div>
                <div className="editorial font-serif text-2xl text-canopy mt-1 leading-tight">
                  {n.classificacao}
                </div>
                <div className="text-[11px] text-bark/70 mt-1">{n.faixa}</div>
                <p className="text-[12px] text-bark mt-3 leading-snug">{n.descricao}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-16">
        <SectionHeader
          title="Amostra dos requisitos avaliados"
          desc={`${fmtNum(dados.length)} linhas no total. Abaixo, uma fatia representativa cruzando fornecedor, pilar, área e status.`}
        />
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto max-h-[520px]">
            <table className="w-full text-[13px]">
              <thead className="bg-canopy text-cream sticky top-0">
                <tr>
                  <th className="text-left px-4 py-3 text-[11px] tracking-[0.1em] uppercase font-semibold">Fornecedor</th>
                  <th className="text-left px-4 py-3 text-[11px] tracking-[0.1em] uppercase font-semibold">Pilar</th>
                  <th className="text-left px-4 py-3 text-[11px] tracking-[0.1em] uppercase font-semibold">Área</th>
                  <th className="text-left px-4 py-3 text-[11px] tracking-[0.1em] uppercase font-semibold">Requisito</th>
                  <th className="text-left px-4 py-3 text-[11px] tracking-[0.1em] uppercase font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {dados.slice(0, 200).map((d, i) => (
                  <tr key={i} className="border-b border-canopy/8 hover:bg-cream/60">
                    <td className="px-4 py-2.5 text-bark/85 align-top">{d["Nome do Fornecedor"]}</td>
                    <td className="px-4 py-2.5 align-top">
                      <span
                        className="inline-block px-2 py-0.5 text-[10px] uppercase tracking-[0.08em]"
                        style={{
                          background: `${pilarCor[d["Pilar ESG"] ?? ""] ?? "#6b4423"}22`,
                          color: pilarCor[d["Pilar ESG"] ?? ""] ?? "#6b4423",
                        }}
                      >
                        {d["Pilar ESG"] ?? "—"}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 align-top">
                      <span className="font-mono text-[10px] text-soil">{d.GESTÃO}</span>
                    </td>
                    <td className="px-4 py-2.5 max-w-[420px] text-bark/85 align-top">
                      <span className="line-clamp-2">{(d.Requisito ?? "").split("\n")[0]}</span>
                    </td>
                    <td className="px-4 py-2.5 align-top">
                      {d.Status && <StatusPill kind={d.Status} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2.5 text-[11px] text-soil border-t border-canopy/10">
            Exibindo as primeiras 200 linhas de {fmtNum(dados.length)} requisitos · {fornecedores.length} fornecedores
          </div>
        </Card>
      </section>

      <InsightList
        items={[
          <>
            <strong>SB Locações</strong> e <strong>Vila Serena</strong> são as únicas em <strong>Nível 5 (Excelência)</strong> — ambas com 100% e 91% de cobertura, respectivamente.
          </>,
          <>
            <strong>FAZ TUDO Ambiental</strong> está em colapso documental: apenas <strong>1</strong> dos 67 requisitos foi declarado conforme. Governança a <strong>9%</strong>.
          </>,
          <>
            O pilar <strong>Social</strong> concentra mais da metade dos requisitos (255/450) — reflexo da carga de NR e exigências trabalhistas no escopo.
          </>,
          <>
            <strong>Não enviado</strong> (86 ocorrências) é o segundo passivo do universo: quase um quinto dos requisitos sequer foi submetido — o gargalo é de processo, não de mérito.
          </>,
          <>
            Áreas de <strong>SSO</strong> (Saúde & Segurança) acumulam 172 requisitos — qualquer plano de adequação corporativa começa por aqui.
          </>,
        ]}
      />
    </>
  );
}
