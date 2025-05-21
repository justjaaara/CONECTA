"use client";

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
  Cell,
} from "recharts";
import { DailyConsumptionData } from "@/types/types";

interface DailyConsumptionChartProps {
  data: DailyConsumptionData[];
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
        <p className="font-semibold">Día {label}</p>
        <p>
          Consumo: <span className="font-bold">{payload[0].value} kWh</span>
        </p>
      </div>
    );
  }
  return null;
};

const DailyConsumptionChartComponent: React.FC<DailyConsumptionChartProps> = ({
  data,
  customTooltip,
  title = "Consumo Diario",
  color = "#c1ff00",
  height = 250,
  dataKey = "total_power",
}) => {
  const TooltipComponent = customTooltip || DefaultTooltip;

  const chartData = data.map((item) => ({
    name: item.day_number.toString(),
    total_power: item.total_power,
  }));

  // Determinar el valor máximo para resaltarlo
  const maxValue = Math.max(...chartData.map((item) => item.total_power));

  return (
    <Card className="w-full mx-auto bg-transparent border-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl font-semibold text-white">
          {title}
        </CardTitle>
        <p className="text-sm text-gray-400">Detalle de consumo por día</p>
      </CardHeader>
      <CardContent className="p-0">
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 0, left: -20, bottom: 5 }}
          >
            <CartesianGrid
              stroke="#333"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke={color}
              tick={{ fill: "white", fontSize: 10 }}
              axisLine={{ stroke: color }}
              tickLine={{ stroke: color }}
            />
            <YAxis
              stroke={color}
              tick={{ fill: "white", fontSize: 10 }}
              axisLine={{ stroke: color }}
              tickLine={{ stroke: color }}
            />
            <Tooltip content={<TooltipComponent />} />
            <Bar
              dataKey={dataKey}
              // Usar un color base en lugar de una función
              fill="#374151"
              radius={[4, 4, 0, 0]}
            >
              {/* Usar Cells para asignar colores individualmente a cada barra */}
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.total_power === maxValue ? color : "#374151"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DailyConsumptionChartComponent;
