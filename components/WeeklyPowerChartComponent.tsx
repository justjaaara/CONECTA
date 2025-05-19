"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { measurement } from "@/types/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";

interface WeeklyPowerChartProps {
  data: measurement[];
  customTooltip?: React.FC<TooltipProps<number, string>>;
  title?: string;
  color?: string;
  height?: number;
  width?: number;
  aspectRatio?: string;
  dataKey?: string;
}

const DefaultTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-lime-400 rounded p-2 text-lime-400">
        <p className="font-semibold">{label}</p>
        <p>
          Consumo: <span className="font-bold">{payload[0].value} kWh</span>
        </p>
      </div>
    );
  }
  return null;
};

const WeeklyPowerChart: React.FC<WeeklyPowerChartProps> = ({
  data,
  customTooltip,
  title = "Consumo Semanal",
  color = "#c1ff00",
  height = 300,
  width,
  aspectRatio,
  dataKey = "pv",
}) => {
  const TooltipComponent = customTooltip || DefaultTooltip;

  const chartData = data.map((item) => ({
    name: item.day_name,
    pv: item.total_power,
  }));

  return (
    <Card className="w-full max-w-3xl mx-auto bg-[#c1ff00]/1 border-none">
      <CardHeader>
        <CardTitle className="text-center text-lime-400">{title}</CardTitle>
      </CardHeader>
      <CardContent style={aspectRatio ? { aspectRatio } : {}}>
        <ResponsiveContainer width={width || "100%"} height={height}>
          <BarChart data={chartData}>
            <CartesianGrid stroke="#333" strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              stroke={color}
              tick={{ fill: "white", fontWeight: 600 }}
              axisLine={{ stroke: color }}
            />
            <YAxis
              stroke={color}
              tick={{ fill: "white", fontWeight: 600 }}
              axisLine={{ stroke: color }}
            />
            <Tooltip content={<TooltipComponent />} />
            <Bar dataKey={dataKey} fill="white" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default WeeklyPowerChart;
