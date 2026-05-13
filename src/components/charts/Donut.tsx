"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export function Donut({
  data,
  colors,
  height = 280,
  inner = 60,
  unit = "",
}: {
  data: { name: string; value: number }[];
  colors: Record<string, string>;
  height?: number;
  inner?: number;
  unit?: string;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={inner}
          outerRadius={inner + 50}
          paddingAngle={2}
          stroke="#faf6ed"
          strokeWidth={3}
        >
          {data.map((d) => (
            <Cell key={d.name} fill={colors[d.name] ?? "#1f4d2e"} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => {
            const v = Number(value);
            const pct = total ? (v / total) * 100 : 0;
            return [`${v.toFixed(2)}${unit ? ` ${unit}` : ""} (${pct.toFixed(1)}%)`, String(name)];
          }}
        />
        <Legend
          iconType="circle"
          verticalAlign="bottom"
          wrapperStyle={{ paddingTop: 8, fontSize: 12 }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
