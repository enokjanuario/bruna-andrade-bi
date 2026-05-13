export const fmtPct = (n: number, digits = 1) =>
  `${(n * 100).toFixed(digits)}%`;

export const fmtNum = (n: number, digits = 0) =>
  n.toLocaleString("pt-BR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

export const fmtHa = (n: number) => `${fmtNum(Math.abs(n), 1)} ha`;
