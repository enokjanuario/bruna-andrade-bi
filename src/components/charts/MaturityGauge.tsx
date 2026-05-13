"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export function MaturityGauge({
  value,
  label,
  size = 180,
}: {
  value: number; // 0..1
  label: string;
  size?: number;
}) {
  const pct = Math.max(0, Math.min(1, value));
  const data = [
    { name: "v", value: pct },
    { name: "rest", value: 1 - pct },
  ];
  const colorFor = (p: number) =>
    p >= 0.8 ? "#1f4d2e" : p >= 0.6 ? "#2d6a3e" : p >= 0.4 ? "#d4a843" : "#b8543c";
  return (
    <div className="relative inline-flex flex-col items-center" style={{ width: size }}>
      <ResponsiveContainer width={size} height={size}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={size * 0.35}
            outerRadius={size * 0.48}
            startAngle={90}
            endAngle={-270}
            stroke="none"
          >
            <Cell fill={colorFor(pct)} />
            <Cell fill="rgba(13,40,24,0.08)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ width: size, height: size }}
      >
        <div
          className="editorial font-serif font-extrabold text-canopy leading-none"
          style={{ fontSize: size * 0.22 }}
        >
          {(pct * 100).toFixed(0)}%
        </div>
        <div className="text-[10px] tracking-[0.18em] uppercase text-moss mt-1">
          {label}
        </div>
      </div>
    </div>
  );
}
