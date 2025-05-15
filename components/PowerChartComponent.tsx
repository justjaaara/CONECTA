import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import React from "react";

export interface ChartData {
  month: string;
  total_power: number;
  device_id?: number;
}

interface PowerChartProps {
  data: ChartData[];
  customTooltip?: React.FC<TooltipProps<number, string>>;
  title?: string;
  color?: string;
  height?: number;
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

const PowerChartComponent: React.FC<PowerChartProps> = ({
  data,
  customTooltip,
  title = "Consumo Mensual",
  color = "#c1ff00",
  height = 300,
  dataKey = "pv",
}) => {
  const TooltipComponent = customTooltip || DefaultTooltip;

  const chartData = data.map((item) => ({
    name: item.month,
    pv: item.total_power,
  }));

  return (
    <Card className="w-full max-w-3xl mx-auto p-4 bg-black border-none">
      <CardHeader>
        <CardTitle className="text-center text-lime-400">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
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

export default PowerChartComponent;
