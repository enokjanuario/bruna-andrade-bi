// Mata Atlântica RJ — desmatamento anual (MapBiomas Coleção de Transições)
export type AnoTransicao = {
  ano: string;
  "Plantação Florestal": number;
  "Cana-de-açúcar": number;
  Soja: number;
  "Outras Lavouras Temporárias": number;
};

export const desmatamentoAnual: AnoTransicao[] = [
  { ano: "2010/2011", "Plantação Florestal": 60.56, "Cana-de-açúcar": 0, Soja: 0, "Outras Lavouras Temporárias": 14.04 },
  { ano: "2011/2012", "Plantação Florestal": 69.07, "Cana-de-açúcar": 0, Soja: 0, "Outras Lavouras Temporárias": 1.16 },
  { ano: "2012/2013", "Plantação Florestal": 72.58, "Cana-de-açúcar": 0, Soja: 0, "Outras Lavouras Temporárias": 0.17 },
  { ano: "2013/2014", "Plantação Florestal": 145.5, "Cana-de-açúcar": 0, Soja: 0, "Outras Lavouras Temporárias": 0.17 },
  { ano: "2014/2015", "Plantação Florestal": 66.5, "Cana-de-açúcar": 0, Soja: 0, "Outras Lavouras Temporárias": 7.22 },
  { ano: "2015/2016", "Plantação Florestal": 49.99, "Cana-de-açúcar": 0, Soja: 0, "Outras Lavouras Temporárias": 1.58 },
  { ano: "2016/2017", "Plantação Florestal": 33.9, "Cana-de-açúcar": 0, Soja: 0, "Outras Lavouras Temporárias": 0 },
  { ano: "2017/2018", "Plantação Florestal": 74.67, "Cana-de-açúcar": 0, Soja: 0, "Outras Lavouras Temporárias": 0.08 },
  { ano: "2018/2019", "Plantação Florestal": 342.51, "Cana-de-açúcar": 0, Soja: 0, "Outras Lavouras Temporárias": 0.08 },
  { ano: "2019/2020", "Plantação Florestal": 107.26, "Cana-de-açúcar": 0, Soja: 0, "Outras Lavouras Temporárias": 0 },
  { ano: "2020/2021", "Plantação Florestal": 22.34, "Cana-de-açúcar": 0, Soja: 0, "Outras Lavouras Temporárias": 0.17 },
  { ano: "2021/2022", "Plantação Florestal": 18.16, "Cana-de-açúcar": 0, Soja: 0, "Outras Lavouras Temporárias": 0 },
  { ano: "2022/2023", "Plantação Florestal": 9.7, "Cana-de-açúcar": 0, Soja: 0, "Outras Lavouras Temporárias": 0 },
  { ano: "2023/2024", "Plantação Florestal": 15.26, "Cana-de-açúcar": 0, Soja: 0, "Outras Lavouras Temporárias": 0 },
];

export const cultivos = [
  "Plantação Florestal",
  "Cana-de-açúcar",
  "Soja",
  "Outras Lavouras Temporárias",
] as const;

export const cultivoCor: Record<string, string> = {
  "Plantação Florestal": "#2d6a3e",
  "Cana-de-açúcar": "#d4a843",
  Soja: "#b8543c",
  "Outras Lavouras Temporárias": "#8b6914",
};

// Municípios RJ — valor positivo = perda florestal; negativo = avanço agrícola
export type Municipio = { m: string; v: number };

export const municipios: Municipio[] = [
  { m: "Rio de Janeiro", v: 174.0 },
  { m: "São José do Vale do Rio Preto", v: 167.78 },
  { m: "São Pedro da Aldeia", v: 152.79 },
  { m: "Paty do Alferes", v: 141.0 },
  { m: "Armação dos Búzios", v: 102.25 },
  { m: "Rio Claro", v: 11.84 },
  { m: "São Gonçalo", v: 10.83 },
  { m: "Mesquita", v: 8.09 },
  { m: "Nilópolis", v: 1.4 },
  { m: "São João de Meriti", v: 0.0 },
  { m: "Niterói", v: -2.57 },
  { m: "Aperibé", v: -22.81 },
  { m: "Varre-Sai", v: -25.94 },
  { m: "Iguaba Grande", v: -26.01 },
  { m: "Arraial do Cabo", v: -30.68 },
  { m: "Itaocara", v: -39.08 },
  { m: "Quissamã", v: -40.33 },
  { m: "Macuco", v: -56.13 },
  { m: "Porto Real", v: -66.57 },
  { m: "São Francisco de Itabapoana", v: -70.91 },
  { m: "Maricá", v: -76.98 },
  { m: "Cabo Frio", v: -77.41 },
  { m: "Belford Roxo", v: -81.15 },
  { m: "Bom Jardim", v: -97.51 },
  { m: "Queimados", v: -121.12 },
  { m: "Comendador Levy Gasparian", v: -121.95 },
  { m: "São Sebastião do Alto", v: -133.71 },
  { m: "Angra dos Reis", v: -137.68 },
  { m: "Mangaratiba", v: -146.28 },
  { m: "Engenheiro Paulo de Frontin", v: -159.8 },
  { m: "Mendes", v: -181.53 },
  { m: "Carapebus", v: -182.14 },
  { m: "Porciúncula", v: -211.68 },
  { m: "Saquarema", v: -213.41 },
  { m: "Volta Redonda", v: -233.69 },
  { m: "Pinheiral", v: -245.8 },
  { m: "São José de Ubá", v: -255.81 },
  { m: "Sumidouro", v: -257.47 },
  { m: "Trajano de Moraes", v: -284.64 },
  { m: "Duque de Caxias", v: -288.9 },
  { m: "Japeri", v: -321.96 },
  { m: "Tanguá", v: -328.45 },
  { m: "Natividade", v: -337.63 },
  { m: "Areal", v: -344.28 },
  { m: "Itatiaia", v: -387.51 },
  { m: "Cordeiro", v: -393.12 },
  { m: "Cardoso Moreira", v: -405.04 },
  { m: "Carmo", v: -406.45 },
  { m: "Paraty", v: -420.86 },
  { m: "Itaguaí", v: -424.99 },
  { m: "Conceição de Macabu", v: -452.17 },
  { m: "Nova Iguaçu", v: -463.77 },
  { m: "Paracambi", v: -492.99 },
  { m: "Rio das Ostras", v: -499.18 },
  { m: "Duas Barras", v: -504.44 },
  { m: "Guapimirim", v: -523.98 },
  { m: "Seropédica", v: -529.1 },
  { m: "Sapucaia", v: -534.83 },
  { m: "Italva", v: -539.44 },
  { m: "Laje do Muriaé", v: -635.73 },
  { m: "Magé", v: -684.39 },
  { m: "Quatis", v: -707.97 },
  { m: "Bom Jesus do Itabapoana", v: -727.2 },
  { m: "Piraí", v: -763.77 },
  { m: "Cambuci", v: -826.27 },
  { m: "Araruama", v: -852.63 },
  { m: "Miracema", v: -864.62 },
  { m: "Três Rios", v: -892.69 },
  { m: "Itaboraí", v: -930.68 },
  { m: "Vassouras", v: -945.86 },
  { m: "Barra do Piraí", v: -946.49 },
  { m: "Miguel Pereira", v: -980.07 },
  { m: "Santo Antônio de Pádua", v: -995.33 },
  { m: "São Fidélis", v: -1039.43 },
  { m: "Nova Friburgo", v: -1052.87 },
  { m: "Santa Maria Madalena", v: -1079.88 },
  { m: "Casimiro de Abreu", v: -1121.89 },
  { m: "Barra Mansa", v: -1174.96 },
  { m: "Petrópolis", v: -1265.78 },
  { m: "Itaperuna", v: -1272.5 },
  { m: "Cantagalo", v: -1301.51 },
  { m: "Rio Bonito", v: -1433.87 },
  { m: "Macaé", v: -1561.81 },
  { m: "Resende", v: -1697.3 },
  { m: "Rio das Flores", v: -1731.85 },
  { m: "Campos dos Goytacazes", v: -1779.99 },
  { m: "Valença", v: -1909.63 },
  { m: "Silva Jardim", v: -2067.72 },
  { m: "Teresópolis", v: -2069.31 },
  { m: "Paraíba do Sul", v: -2087.1 },
  { m: "Cachoeiras de Macacu", v: -2405.5 },
];

export function geografiaResumo() {
  const totalDesmatamento = desmatamentoAnual.reduce(
    (s, d) => s + d["Plantação Florestal"] + d["Outras Lavouras Temporárias"],
    0,
  );
  const perdaFlorestal = municipios.filter((m) => m.v > 0);
  const avancoAgricola = municipios.filter((m) => m.v < 0);
  const totalPerda = perdaFlorestal.reduce((s, m) => s + m.v, 0);
  const totalAvanco = Math.abs(avancoAgricola.reduce((s, m) => s + m.v, 0));
  const top10Avanco = [...avancoAgricola]
    .sort((a, b) => a.v - b.v)
    .slice(0, 10);
  const top10Avancosum = top10Avanco.reduce((s, m) => s + Math.abs(m.v), 0);
  return {
    totalDesmatamento,
    perdaFlorestalCount: perdaFlorestal.length,
    avancoAgricolaCount: avancoAgricola.length,
    totalPerda,
    totalAvanco,
    totalTransformacao: totalPerda + totalAvanco,
    top10Avanco,
    top10Concentracao: top10Avancosum / (totalPerda + totalAvanco),
    picoAno: "2018/2019",
    picoValor: 342.6,
    quedaPos2020: 0.89,
  };
}
