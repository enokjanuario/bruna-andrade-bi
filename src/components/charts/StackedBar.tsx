"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Datum = Record<string, number | string>;

export function StackedBar({
  data,
  keys,
  colors,
  xKey,
  height = 360,
  yUnit = "",
}: {
  data: Datum[];
  keys: string[];
  colors: Record<string, string>;
  xKey: string;
  height?: number;
  yUnit?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 12, right: 16, left: 0, bottom: 8 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={xKey}
          axisLine={{ stroke: "#0d2818" }}
          tickLine={false}
          angle={-35}
          textAnchor="end"
          height={70}
          interval={0}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}${yUnit ? ` ${yUnit}` : ""}`}
        />
        <Tooltip
          formatter={(value, name) => [
            `${Number(value).toFixed(2)}${yUnit ? ` ${yUnit}` : ""}`,
            String(name),
          ]}
        />
        <Legend
          iconType="square"
          wrapperStyle={{ paddingBottom: 12 }}
          verticalAlign="top"
          align="left"
        />
        {keys.map((k) => (
          <Bar
            key={k}
            dataKey={k}
            stackId="a"
            fill={colors[k]}
            radius={[0, 0, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
