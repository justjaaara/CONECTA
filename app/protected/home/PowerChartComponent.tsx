import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
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

const PowerChartComponent = ({ data }: { data: any[] }) => {
  const chartData = data.map((item) => ({
    name: item.month,
    pv: item.total_power,
  }));

  return (
    <Card className="w-full max-w-3xl mx-auto p-4 bg-black border-none">
      <CardHeader>
        <CardTitle className="text-center text-lime-400">
          Consumo Mensual
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid stroke="#333" strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              stroke="#c1ff00"
              tick={{ fill: "white", fontWeight: 600 }}
              axisLine={{ stroke: "#c1ff00" }}
            />
            <YAxis
              stroke="#c1ff00"
              tick={{ fill: "white", fontWeight: 600 }}
              axisLine={{ stroke: "#c1ff00" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="pv" fill="white" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PowerChartComponent;
