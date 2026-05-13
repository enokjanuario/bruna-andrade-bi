import { Card, InsightList, Kpi, KpiGrid, PageHeader, SectionHeader } from "../../components/ui";
import { StackedBar } from "../../components/charts/StackedBar";
import { Donut } from "../../components/charts/Donut";
import { LineTrend } from "../../components/charts/LineTrend";
import { cultivoCor, cultivos, desmatamentoAnual } from "../../lib/geografia";
import { fmtHa, fmtNum } from "../../lib/format";

export default function GeografiaPage() {
  const valOf = (
    d: (typeof desmatamentoAnual)[number],
    c: (typeof cultivos)[number],
  ): number => d[c];
  const sumCultivos = (d: (typeof desmatamentoAnual)[number]) =>
    cultivos.reduce((ss, c) => ss + valOf(d, c), 0);

  const totalGeral = desmatamentoAnual.reduce((s, d) => s + sumCultivos(d), 0);

  const totaisPorCultivo = cultivos.map((c) => ({
    name: c,
    value: desmatamentoAnual.reduce((s, d) => s + valOf(d, c), 0),
  }));

  const trienios = [
    { ano: "2010 – 2015", min: 2010, max: 2015 },
    { ano: "2015 – 2020", min: 2015, max: 2020 },
    { ano: "2020 – 2024", min: 2020, max: 2024 },
  ].map((t) => ({
    ano: t.ano,
    total: desmatamentoAnual
      .filter((d) => {
        const a = parseInt(d.ano);
        return a >= t.min && a < t.max;
      })
      .reduce((s, d) => s + sumCultivos(d), 0),
  }));

  return (
    <>
      <PageHeader
        eyebrow="MapBiomas · Mata Atlântica"
        title="A floresta convertida"
        italic="ano a ano"
        subtitle="Quanta floresta nativa virou área agrícola no Rio de Janeiro entre 2010 e 2024. Os números pequenos contam a maior história: 14 anos, um vetor dominante, um pico solitário e uma virada possível."
        meta={[
          { label: "Bioma", value: "Mata Atlântica" },
          { label: "Estado", value: "Rio de Janeiro" },
          { label: "Período", value: "2010 – 2024" },
          { label: "Fonte", value: "MapBiomas" },
        ]}
      />

      <KpiGrid>
        <Kpi label="Área convertida total" value={fmtNum(totalGeral, 1)} unit="hectares · 2010–2024" />
        <Kpi label="Pico de desmatamento" value="2018/19" unit="342,6 ha em um único ano" accent="rust" />
        <Kpi label="Plantação florestal" value="97,8%" unit="de toda a conversão no período" accent="moss" />
        <Kpi label="Queda após 2020" value="−89%" unit="vs. média do bloco anterior" accent="gold" />
      </KpiGrid>

      <section className="mb-16">
        <Card>
          <SectionHeader
            title="Floresta perdida, ano a ano"
            desc={
              <>
                Cada coluna mostra os hectares convertidos por tipo de cultivo. O bloco{" "}
                <strong className="text-canopy">2018/2019</strong> não é exceção — é régua: o pico que define a década.
              </>
            }
          />
          <StackedBar
            data={desmatamentoAnual as unknown as Record<string, string | number>[]}
            keys={[...cultivos]}
            colors={cultivoCor}
            xKey="ano"
            height={420}
            yUnit="ha"
          />
        </Card>
      </section>

      <section className="grid lg:grid-cols-[1fr_1.1fr] gap-8 mb-16">
        <Card>
          <SectionHeader
            title="Por tipo de cultivo"
            desc="Onde a pressão se concentra — a monocultura florestal de eucalipto e pinus domina o cenário."
          />
          <Donut data={totaisPorCultivo} colors={cultivoCor} inner={70} height={320} unit="ha" />
        </Card>

        <Card>
          <SectionHeader
            title="Tendência por triênio"
            desc="Três blocos de 5 anos contam três fases distintas — expansão, pico, desaceleração."
          />
          <LineTrend data={trienios} xKey="ano" yKey="total" height={320} unit="ha" />
          <div className="grid grid-cols-3 mt-5 border-t border-canopy/10 pt-4">
            {trienios.map((t) => (
              <div key={t.ano}>
                <div className="text-[10px] tracking-[0.18em] uppercase text-soil">{t.ano}</div>
                <div className="editorial font-serif text-2xl text-canopy mt-1">{fmtHa(t.total)}</div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <InsightList
        items={[
          <>
            O salto mais brutal aconteceu em <strong>2018/2019</strong>: 342,6 ha em um único ciclo — quase <strong>2,4×</strong> o segundo pior ano (2013/14, 145,7 ha).
          </>,
          <>
            A <strong>plantação florestal</strong> (eucalipto e pinus) é responsável por <strong>97,8%</strong> de toda a conversão registrada nos últimos 14 anos.
          </>,
          <>
            O bloco <strong>2015–2020</strong> concentrou o maior volume de perda: <strong>610 ha</strong> — mais da metade do total do período.
          </>,
          <>
            A conversão para <strong>cana-de-açúcar</strong> e <strong>soja</strong> foi <strong>nula</strong> no período — padrão fluminense distinto de outros estados.
          </>,
          <>
            Após 2020, queda acentuada: apenas <strong>65,6 ha</strong> em 4 anos contra 610 ha no bloco anterior — possível reflexo de fiscalização e recuperação ambiental.
          </>,
        ]}
      />
    </>
  );
}
