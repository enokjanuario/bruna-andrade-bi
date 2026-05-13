import dadosRaw from "../data/dados_tratados.json";
import resultadosRaw from "../data/resultados.json";
import maturidadeRaw from "../data/maturidade.json";

export type LinhaRequisito = {
  "Nome do Fornecedor": string;
  "Nome do Trabalhador": string | null;
  GESTÃO: string | null;
  Requisito: string | null;
  Exigência: string | null;
  Status: string | null;
  "Pilar ESG": string | null;
  Peso: number | null;
  Score: number | null;
  "Pontuação Obtida": number | null;
  "Pontuação Possível": number | null;
  Origem: string | null;
};

export type Resultado = {
  Fornecedor: string;
  "Pont. Obtida Total": number;
  "Pont. Possível Total": number;
  "Maturidade ESG": number;
  "Pont. Obtida (E)": number;
  "Pont. Possível (E)": number;
  "Maturidade (E)": number;
  "Pont. Obtida (S)": number;
  "Pont. Possível (S)": number;
  "Maturidade (S)": number;
  "Pont. Obtida (G)": number;
  "Pont. Possível (G)": number;
  "Maturidade (G)": number;
  "Nível Maturidade": number;
  Classificação: string;
};

export type MaturidadeRow = {
  fornecedor: string;
  maturidade: number;
  nivel: number;
  classificacao: string;
  status: string;
};

export type NivelRef = {
  nivel: number;
  faixa: string;
  classificacao: string;
  descricao: string;
};

const dadosFiltrados = (dadosRaw as LinhaRequisito[]).filter(
  (d) =>
    d["Nome do Fornecedor"] &&
    d["Nome do Fornecedor"] !== "0" &&
    typeof d["Nome do Fornecedor"] === "string",
);

export const dados = dadosFiltrados;
export const resultados = resultadosRaw as Resultado[];
export const niveisRef = (maturidadeRaw as { ref: NivelRef[]; mat: MaturidadeRow[] })
  .ref;
export const maturidadePorFornecedor = (
  maturidadeRaw as { ref: NivelRef[]; mat: MaturidadeRow[] }
).mat;

export const fornecedores = Array.from(
  new Set(dados.map((d) => d["Nome do Fornecedor"])),
).filter(Boolean) as string[];

export const PILARES = ["Ambiental", "Social", "Governança"] as const;
export type Pilar = (typeof PILARES)[number];

export const pilarCor: Record<string, string> = {
  Ambiental: "#2d6a3e",
  Social: "#d4a843",
  Governança: "#b8543c",
};

export const statusCor: Record<string, string> = {
  Conforme: "#2d6a3e",
  "Não conforme": "#b8543c",
  "Não enviado": "#6b4423",
  "Em tratamento": "#d4a843",
  Evidenciado: "#1f4d2e",
  "Não aplicável": "#6b9b7a",
};

export const gestaoLabel: Record<string, string> = {
  SSO: "Saúde & Segurança",
  TP: "Trabalhista",
  FIN: "Financeiro",
  MA: "Meio Ambiente",
  QUA: "Qualidade",
  RS: "Responsabilidade Social",
  EST: "Estratégia",
  COMP: "Compliance",
};

export function statusCounts() {
  const c: Record<string, number> = {};
  for (const d of dados) {
    const s = (d.Status ?? "Desconhecido") as string;
    c[s] = (c[s] ?? 0) + 1;
  }
  return c;
}

export function statusByFornecedor() {
  const r: Record<string, Record<string, number>> = {};
  for (const f of fornecedores) {
    r[f] = {};
  }
  for (const d of dados) {
    const f = d["Nome do Fornecedor"];
    const s = (d.Status ?? "Desconhecido") as string;
    if (!r[f]) r[f] = {};
    r[f][s] = (r[f][s] ?? 0) + 1;
  }
  return r;
}

export function pilarBreakdown() {
  const r: Record<string, Record<string, number>> = {};
  for (const d of dados) {
    const p = d["Pilar ESG"];
    const s = d.Status as string | null;
    if (!p || !s) continue;
    if (!r[p]) r[p] = {};
    r[p][s] = (r[p][s] ?? 0) + 1;
  }
  return r;
}

export function gestaoBreakdown() {
  const r: Record<string, { conforme: number; total: number }> = {};
  for (const d of dados) {
    const g = d.GESTÃO;
    if (!g || g === "0") continue;
    const key = String(g).split(",")[0].trim();
    if (!r[key]) r[key] = { conforme: 0, total: 0 };
    r[key].total++;
    if (d.Status === "Conforme" || d.Status === "Evidenciado") r[key].conforme++;
  }
  return r;
}

export function topRiscos(limit = 12) {
  const counter = new Map<
    string,
    { requisito: string; gestao: string; pilar: string; ocorrencias: number; fornecedores: Set<string> }
  >();
  for (const d of dados) {
    if (d.Status !== "Não conforme" && d.Status !== "Não enviado") continue;
    const key = (d.Requisito ?? "").split("\n")[0].slice(0, 140);
    if (!key) continue;
    const e = counter.get(key) ?? {
      requisito: key,
      gestao: (d.GESTÃO ?? "—") as string,
      pilar: (d["Pilar ESG"] ?? "—") as string,
      ocorrencias: 0,
      fornecedores: new Set<string>(),
    };
    e.ocorrencias++;
    e.fornecedores.add(d["Nome do Fornecedor"]);
    counter.set(key, e);
  }
  return Array.from(counter.values())
    .map((e) => ({ ...e, fornecedores: Array.from(e.fornecedores) }))
    .sort((a, b) => b.ocorrencias - a.ocorrencias)
    .slice(0, limit);
}

export function oportunidades() {
  // gaps to advance to next maturity level — distance × number of items at risk
  return resultados
    .map((r) => {
      const nivel = r["Nível Maturidade"];
      const proxFaixa = Math.min(1, nivel * 0.2 + 0.2);
      const gap = Math.max(0, proxFaixa - r["Maturidade ESG"]);
      const naoEnviados = dados.filter(
        (d) =>
          d["Nome do Fornecedor"] === r.Fornecedor && d.Status === "Não enviado",
      ).length;
      const naoConformes = dados.filter(
        (d) =>
          d["Nome do Fornecedor"] === r.Fornecedor && d.Status === "Não conforme",
      ).length;
      return {
        fornecedor: r.Fornecedor,
        maturidade: r["Maturidade ESG"],
        nivelAtual: nivel,
        classificacao: r.Classificação,
        proximaFaixa: proxFaixa,
        gap,
        naoEnviados,
        naoConformes,
        quickWins: naoEnviados,
      };
    })
    .sort((a, b) => b.quickWins - a.quickWins);
}

export function executivoKpis() {
  const total = dados.length;
  const conformes = dados.filter(
    (d) => d.Status === "Conforme" || d.Status === "Evidenciado",
  ).length;
  const naoConformes = dados.filter((d) => d.Status === "Não conforme").length;
  const naoEnviados = dados.filter((d) => d.Status === "Não enviado").length;
  const matMedia =
    resultados.reduce((s, r) => s + r["Maturidade ESG"], 0) / resultados.length;
  const criticos = resultados.filter((r) => r["Maturidade ESG"] < 0.4).length;
  return {
    total,
    conformes,
    naoConformes,
    naoEnviados,
    conformidade: conformes / total,
    matMedia,
    criticos,
    fornecedoresCount: resultados.length,
  };
}
