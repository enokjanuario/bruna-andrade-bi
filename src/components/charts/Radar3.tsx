"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export function Radar3({
  data,
  series,
  height = 300,
}: {
  data: { pilar: string; [k: string]: string | number }[];
  series: { key: string; color: string; label: string }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} outerRadius="72%">
        <PolarGrid stroke="rgba(13,40,24,0.18)" />
        <PolarAngleAxis dataKey="pilar" tick={{ fill: "#0d2818", fontSize: 12 }} />
        <PolarRadiusAxis
          tickFormatter={(v) => `${Math.round(v * 100)}%`}
          domain={[0, 1]}
          tick={{ fill: "#6b4423", fontSize: 10 }}
          stroke="rgba(13,40,24,0.2)"
        />
        {series.map((s) => (
          <Radar
            key={s.key}
            name={s.label}
            dataKey={s.key}
            stroke={s.color}
            fill={s.color}
            fillOpacity={0.25}
            strokeWidth={2}
          />
        ))}
        <Tooltip formatter={(value) => `${(Number(value) * 100).toFixed(1)}%`} />
        <Legend
          iconType="square"
          wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
