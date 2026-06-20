"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  title?: string;
  data: { date: string; count: number }[];
  color?: string;
};

export function GrowthChart({ title, data, color = "#3b82f6" }: Props) {
  const chartData = data?.map((item) => ({
    date: new Date(item.date).toLocaleDateString(),
    count: item.count,
  }));

  return (
    <div className="w-full h-full bg-white px-4 py-6 rounded-xl shadow text-text-custom">
      <h2 className="text-sm font-semibold mb-3">{title}</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke={color}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}