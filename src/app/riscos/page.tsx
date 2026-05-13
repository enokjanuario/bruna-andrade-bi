import { Card, InsightList, Kpi, KpiGrid, PageHeader, SectionHeader, StatusPill } from "../../components/ui";
import { MaturityGauge } from "../../components/charts/MaturityGauge";
import {
  executivoKpis,
  gestaoLabel,
  oportunidades,
  pilarCor,
  topRiscos,
  resultados,
} from "../../lib/esg";
import { geografiaResumo, municipios } from "../../lib/geografia";
import { fmtHa, fmtNum, fmtPct } from "../../lib/format";

export default function RiscosPage() {
  const kpi = executivoKpis();
  const riscos = topRiscos(15);
  const op = oportunidades();
  const r = geografiaResumo();
  const top5Avanco = [...municipios]
    .filter((m) => m.v < 0)
    .sort((a, b) => a.v - b.v)
    .slice(0, 5);
  const top5Perda = [...municipios]
    .filter((m) => m.v > 0)
    .sort((a, b) => b.v - a.v)
    .slice(0, 5);

  return (
    <>
      <PageHeader
        eyebrow="Síntese · Cross-dataset"
        title="O que vigiar,"
        italic="o que destravar."
        subtitle="Dois mapas de risco no mesmo plano: o passivo de auditoria que tira fornecedores de RFPs e o passivo territorial que cobra de cidades. Acompanhados pelas oportunidades — geralmente mais próximas do que parecem."
        meta={[
          { label: "Riscos ESG mapeados", value: String(riscos.length) },
          { label: "Hotspots territoriais", value: "5 municípios" },
          { label: "Quick wins", value: fmtNum(kpi.naoEnviados) },
          { label: "Atualizado", value: "Maio · 2026" },
        ]}
      />

      <KpiGrid>
        <Kpi label="Requisitos em risco" value={fmtNum(kpi.naoConformes + kpi.naoEnviados)} unit="não conformes + não enviados" accent="rust" />
        <Kpi label="Fornecedores críticos" value={fmtNum(kpi.criticos)} unit="abaixo de 40% de maturidade" accent="rust" />
        <Kpi label="Quick wins documentais" value={fmtNum(kpi.naoEnviados)} unit="basta enviar para subir o score" accent="gold" />
        <Kpi label="Pressão territorial" value={fmtHa(r.totalAvanco)} unit="avanço agrícola · 81 municípios" accent="moss" />
      </KpiGrid>

      <section className="grid lg:grid-cols-2 gap-8 mb-16">
        <div>
          <SectionHeader
            title="Mapa de riscos · ESG"
            desc="Requisitos com falha sistêmica — recorrentes em múltiplos fornecedores."
          />
          <Card className="p-0 overflow-hidden">
            <div className="bg-rust/15 px-5 py-3 border-b border-rust/30 text-[11px] tracking-[0.15em] uppercase text-rust-deep font-semibold">
              ⚠ Maior recorrência = maior risco sistêmico
            </div>
            <ul className="divide-y divide-canopy/10">
              {riscos.map((r) => (
                <li key={r.requisito} className="px-5 py-3.5 hover:bg-cream/60">
                  <div className="flex justify-between gap-3 items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex gap-2 mb-1 items-center flex-wrap">
                        <span
                          className="inline-block px-2 py-0.5 text-[10px] uppercase tracking-[0.08em]"
                          style={{
                            background: `${pilarCor[r.pilar] ?? "#6b4423"}22`,
                            color: pilarCor[r.pilar] ?? "#6b4423",
                          }}
                        >
                          {r.pilar}
                        </span>
                        <span className="font-mono text-[10px] text-soil">
                          {(r.gestao ?? "").split(",")[0]} · {gestaoLabel[(r.gestao ?? "").split(",")[0]] ?? "—"}
                        </span>
                      </div>
                      <div className="text-[13px] text-bark leading-snug line-clamp-2">
                        {r.requisito}
                      </div>
                      <div className="text-[11px] text-soil mt-1">
                        Afeta: {r.fornecedores.slice(0, 3).join(" · ")}
                        {r.fornecedores.length > 3 && ` +${r.fornecedores.length - 3}`}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="editorial font-serif text-3xl text-rust-deep leading-none">
                        {r.ocorrencias}
                      </div>
                      <div className="text-[10px] tracking-[0.15em] uppercase text-soil mt-1">
                        ocorrências
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div>
          <SectionHeader
            title="Mapa de riscos · Territorial"
            desc="Municípios sob maior pressão — onde a expansão agrícola se sobrepõe à floresta nativa."
          />
          <Card className="p-0 overflow-hidden">
            <div className="bg-moss/15 px-5 py-3 border-b border-moss/30 text-[11px] tracking-[0.15em] uppercase text-moss font-semibold">
              🌿 Hotspots de avanço agrícola
            </div>
            <ul className="divide-y divide-canopy/10">
              {top5Avanco.map((m, i) => (
                <li key={m.m} className="px-5 py-4 hover:bg-cream/60 flex items-center gap-4">
                  <div className="font-serif text-4xl text-soil/60 tabular-nums w-10">
                    0{i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-serif text-xl text-canopy">{m.m}</div>
                    <div className="text-[12px] text-bark/80">
                      Pressão agrícola consolidada — região serrana / centro-norte
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="editorial font-serif text-2xl text-moss leading-none">
                      {fmtNum(Math.abs(m.v), 0)}
                    </div>
                    <div className="text-[10px] tracking-[0.15em] uppercase text-soil">ha</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="bg-rust/10 px-5 py-3 border-t border-rust/30 text-[11px] tracking-[0.15em] uppercase text-rust-deep font-semibold">
              🔥 Hotspots de perda florestal
            </div>
            <ul className="divide-y divide-canopy/10">
              {top5Perda.map((m, i) => (
                <li key={m.m} className="px-5 py-4 hover:bg-cream/60 flex items-center gap-4">
                  <div className="font-serif text-4xl text-soil/60 tabular-nums w-10">
                    0{i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-serif text-xl text-canopy">{m.m}</div>
                    <div className="text-[12px] text-bark/80">
                      Desmatamento líquido — atenção à fiscalização ambiental
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="editorial font-serif text-2xl text-rust-deep leading-none">
                      +{fmtNum(m.v, 0)}
                    </div>
                    <div className="text-[10px] tracking-[0.15em] uppercase text-soil">ha</div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <section className="mb-16">
        <SectionHeader
          title="Oportunidades por fornecedor"
          desc="Para cada fornecedor: distância até a próxima faixa de maturidade, quick wins documentais (não enviados) e gaps de adequação (não conformes). O caminho mais curto para subir de nível."
        />
        <div className="grid gap-4">
          {op.map((o) => (
            <Card key={o.fornecedor} className="grid grid-cols-1 md:grid-cols-[200px_1fr_240px] gap-6 items-center">
              <div className="flex flex-col items-center">
                <MaturityGauge value={o.maturidade} label={`Nível ${o.nivelAtual}`} size={140} />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] tracking-[0.18em] uppercase text-soil mb-1">{o.classificacao}</div>
                <div className="editorial font-serif text-2xl text-canopy leading-tight">{o.fornecedor}</div>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-[12px]">
                  <div className="bg-cream/60 border border-canopy/10 px-3 py-2">
                    <div className="text-[10px] tracking-[0.15em] uppercase text-soil">Gap até próxima faixa</div>
                    <div className="editorial font-serif text-xl text-canopy mt-1">{fmtPct(o.gap, 1)}</div>
                  </div>
                  <div className="bg-gold/15 border border-gold/40 px-3 py-2">
                    <div className="text-[10px] tracking-[0.15em] uppercase text-soil">Quick wins (não enviados)</div>
                    <div className="editorial font-serif text-xl text-canopy mt-1">{o.naoEnviados}</div>
                  </div>
                  <div className="bg-rust/10 border border-rust/30 px-3 py-2">
                    <div className="text-[10px] tracking-[0.15em] uppercase text-soil">Não conformes</div>
                    <div className="editorial font-serif text-xl text-rust-deep mt-1">{o.naoConformes}</div>
                  </div>
                </div>
              </div>
              <div className="text-[13px] text-bark/85 leading-snug border-l border-canopy/15 pl-5">
                {o.naoEnviados > 0 && (
                  <p>
                    <strong className="text-canopy">Plano #1 · Documental.</strong>{" "}
                    Submeter os {o.naoEnviados} requisitos pendentes. Cada item enviado entra no score sem
                    necessidade de adequação técnica.
                  </p>
                )}
                {o.naoConformes > 0 && (
                  <p className="mt-3">
                    <strong className="text-canopy">Plano #2 · Adequação.</strong>{" "}
                    {o.naoConformes} requisitos exigem ação corretiva. Priorizar SSO e Trabalhista — maior peso.
                  </p>
                )}
                {o.naoEnviados === 0 && o.naoConformes === 0 && (
                  <p>
                    <strong className="text-moss">Excelência.</strong> Fornecedor pronto para fitar com selos de mercado (B-Corp, ISO 14001, RFP ESG).
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-16 grid lg:grid-cols-2 gap-8">
        <Card className="bg-canopy text-cream border-canopy">
          <div className="eyebrow text-gold-soft">Risco corporativo</div>
          <h3 className="editorial font-serif text-3xl mt-3 mb-4 text-cream leading-tight">
            Exposição reputacional & regulatória
          </h3>
          <ul className="space-y-3 text-cream/85 text-[14px]">
            <li className="flex gap-3">
              <span className="text-gold font-serif text-xl">·</span>
              <span><strong>{fmtNum(kpi.criticos)} fornecedores</strong> abaixo de 40% expõem a cadeia FORTRATEST a inadequação em rotinas de RFP / due diligence ESG.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-gold font-serif text-xl">·</span>
              <span>Documentação <strong>não enviada</strong> ({fmtNum(kpi.naoEnviados)} requisitos) pode ser interpretada como ausência de controle interno — efeito materialidade em rating.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-gold font-serif text-xl">·</span>
              <span>SSO (Saúde & Segurança) lidera o passivo — risco de autuação trabalhista, multa CIPA / NR e responsabilidade solidária do contratante.</span>
            </li>
          </ul>
        </Card>

        <Card className="bg-moss text-cream border-moss">
          <div className="eyebrow text-gold-soft">Oportunidade</div>
          <h3 className="editorial font-serif text-3xl mt-3 mb-4 text-cream leading-tight">
            Caminho curto até a próxima maturidade
          </h3>
          <ul className="space-y-3 text-cream/90 text-[14px]">
            <li className="flex gap-3">
              <span className="text-gold font-serif text-xl">·</span>
              <span><strong>86 quick wins</strong> documentais — só enviar a evidência move o ponteiro do score sem custo de processo.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-gold font-serif text-xl">·</span>
              <span>Queda de <strong>−89%</strong> na conversão da Mata Atlântica fluminense pós-2020 abre espaço para storytelling de recuperação na ESG de marca.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-gold font-serif text-xl">·</span>
              <span>Dois fornecedores em <strong>Excelência</strong> servem como benchmark interno — replicar templates documentais para a base inteira.</span>
            </li>
          </ul>
        </Card>
      </section>

      <InsightList
        items={[
          <>
            <strong>Conformidade não é causa, é efeito</strong> — fornecedores que enviam tudo costumam ter governança consolidada. A ausência de papel sinaliza ausência de processo.
          </>,
          <>
            A <strong>geografia do risco</strong> (Cachoeiras, Paraíba do Sul, Teresópolis, Silva Jardim, Valença) e a geografia da auditoria não conversam — abre flanco para mapear os fornecedores que operam nesses municípios e cruzar exposição.
          </>,
          <>
            Em uma cadeia de 5 fornecedores, <strong>3 estão expostos</strong>. A pergunta operacional é: quanto custa elevar cada um deles para o nível 4?
          </>,
          <>
            A queda pós-2020 no desmatamento sugere efeito de <strong>política pública + fiscalização</strong> — replicar a lógica para o universo ESG corporativo é o próximo movimento natural.
          </>,
          <>
            O dado mais subutilizado deste BI é a <strong>matriz cruzada Status × Pilar × Gestão</strong> — entrar nela com plano de ação por trimestre é o que separa relatório de transformação real.
          </>,
        ]}
      />
    </>
  );
}
