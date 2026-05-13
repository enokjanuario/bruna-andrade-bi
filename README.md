# Observatório ESG & Território

BI editorial cruzando **auditoria ESG da cadeia FORTRATEST** e **geografia do desmatamento da Mata Atlântica fluminense**.

> Autoria · **Bruna Andrade** · 2026

## Páginas

| Rota | Conteúdo |
|---|---|
| `/` | Visão executiva — KPIs cruzados, radar ESG, gauges de maturidade |
| `/esg` | Auditoria ESG FORTRATEST — 5 fornecedores, 450 requisitos, 3 pilares |
| `/geografia` | Desmatamento Mata Atlântica RJ · 2010–2024 |
| `/municipios` | Ranking dos 91 municípios fluminenses |
| `/riscos` | Mapa cross-dataset de riscos & oportunidades |

## Fontes de dados

- **MapBiomas** — Coleção de Transições do Uso da Terra (Mata Atlântica)
- **Greenlegis · FORTRATEST** — Auditoria ESG 2026 (5 fornecedores, 3 pilares E/S/G)

## Stack

- **Next.js 16** (App Router, Turbopack) · **TypeScript**
- **Tailwind CSS v4** com design tokens editoriais
- **Recharts** para visualizações
- Fonts: **Fraunces** (serif) + **Inter** (sans)

## Desenvolvimento local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Build de produção

```bash
npm run build
npm start
```

## Deploy no Vercel

1. Importar este repositório em [vercel.com/new](https://vercel.com/new)
2. Vercel autodetecta Next.js · nenhuma config extra
3. Sugestão de domínio: `bruna-andrade-bi.vercel.app` ou domínio próprio

Alternativa via CLI:

```bash
npm i -g vercel
vercel --prod
```
