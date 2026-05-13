"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function LineTrend({
  data,
  xKey,
  yKey,
  height = 280,
  unit = "",
}: {
  data: Record<string, string | number>[];
  xKey: string;
  yKey: string;
  height?: number;
  unit?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data} margin={{ top: 12, right: 16, left: 0, bottom: 8 }}>
        <defs>
          <linearGradient id="trendArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2d6a3e" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#2d6a3e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={xKey}
          axisLine={{ stroke: "#0d2818" }}
          tickLine={false}
          tick={{ fontWeight: 600 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}${unit ? ` ${unit}` : ""}`}
        />
        <Tooltip
          formatter={(value) => [
            `${Number(value).toFixed(2)}${unit ? ` ${unit}` : ""}`,
            "Total",
          ]}
        />
        <Area type="monotone" dataKey={yKey} stroke="none" fill="url(#trendArea)" />
        <Line
          type="monotone"
          dataKey={yKey}
          stroke="#0d2818"
          strokeWidth={2.5}
          dot={{ r: 6, fill: "#d4a843", stroke: "#0d2818", strokeWidth: 2 }}
          activeDot={{ r: 9 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
