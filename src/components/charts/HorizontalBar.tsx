"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";

export function HorizontalBar({
  data,
  xKey,
  yKey,
  height = 520,
  positiveColor = "#8b3a26",
  negativeColor = "#1f4d2e",
  unit = "",
}: {
  data: { [k: string]: string | number }[];
  xKey: string;
  yKey: string;
  height?: number;
  positiveColor?: string;
  negativeColor?: string;
  unit?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 8, right: 24, left: 8, bottom: 8 }}
      >
        <CartesianGrid horizontal={false} />
        <XAxis
          type="number"
          axisLine={{ stroke: "#0d2818" }}
          tickLine={false}
          tickFormatter={(v) => `${v}${unit ? ` ${unit}` : ""}`}
        />
        <YAxis
          dataKey={yKey}
          type="category"
          axisLine={false}
          tickLine={false}
          width={170}
          tick={{ fontSize: 11 }}
        />
        <Tooltip
          formatter={(value) => [
            `${Number(value).toFixed(2)}${unit ? ` ${unit}` : ""}`,
            "Hectares",
          ]}
        />
        <ReferenceLine x={0} stroke="#0d2818" strokeWidth={1.5} />
        <Bar dataKey={xKey}>
          {data.map((d, i) => (
            <Cell
              key={i}
              fill={(d[xKey] as number) >= 0 ? positiveColor : negativeColor}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
