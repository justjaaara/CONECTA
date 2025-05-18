"use client";

import { DasboardHeader } from "./DasboardHeader";
import Image from "next/image";
import { ChevronDown, ChevronUp, Utensils } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const data = [
  { name: "Lun", value: 276 },
  { name: "Mar", value: 286 },
  { name: "Mié", value: 298 },
  { name: "Jue", value: 246 },
  { name: "Vie", value: 276 },
  { name: "Sáb", value: 274 },
  { name: "Dom", value: 326 },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-4">
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Current Energy Consumption */}
          <div className="bg-gradient-to-b from-black to-[#c1ff00]/40 border border-gray-700 rounded-2xl p-6 md:row-span-1 text-white shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Seguimiento</h2>
            <p className="text-sm text-gray-400 mb-6">
              Energía consumida hasta ahora
            </p>
            <div className="flex items-end">
              <div className="text-8xl font-bold">5.7</div>
              <div className="text-xl ml-2 mb-2 text-gray-400">kWh</div>
            </div>
          </div>

          {/* Weekly Energy Consumption */}
          <Card className="bg-[#c1ff00]/5 border border-gray-700 rounded-2xl px-1 md:row-span-1 text-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold mb-2">Seguimiento Semanal</CardTitle>
              <p className="text-sm text-gray-400">Gráficas de consumo de energía</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={100}>
                <BarChart accessibilityLayer data={data}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-[#0D0E0A]/30 p-1 rounded shadow text-white text-sm">
                            {payload[0].value} kWh
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.name === "Sáb" ? "#C6FF00" : "#1E2632"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex justify-between text-xs text-muted-foreground">
                {data.map((day, i) => (
                  <div key={i} className="text-center w-full">
                    <div>{day.value} kWh</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Total Energy Consumption */}
          <div className="bg-[#c1ff00]/5 border border-gray-700 rounded-2xl p-6 md:row-span-1 text-white shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              Consumo de Energía Total
            </h2>

            <div className="grid grid-cols-3 gap-4 text-sm text-gray-300 mb-6 text-center">
              {/* Microondas */}
              <div>
                <div className="flex items-center justify-center font-semibold mb-2">
                  Microondas <ChevronUp className="ml-1 h-3 w-3" />
                </div>
                <div className="text-3xl font-semibold">5-6</div>
                <div className="text-sm text-gray-400">Kwh por mes</div>
              </div>

              {/* Nevera */}
              <div>
                <div className="flex items-center justify-center font-semibold mb-2">
                  Nevera <ChevronDown className="ml-1 h-3 w-3" />
                </div>
                <div className="text-3xl font-semibold">29-71</div>
                <div className="text-sm text-gray-400">Kwh por mes</div>
              </div>

              {/* Aire AC */}
              <div>
                <div className="flex items-center justify-center font-semibold mb-2">
                  Aire AC <ChevronUp className="ml-1 h-3 w-3" />
                </div>
                <div className="text-3xl font-semibold">37-63</div>
                <div className="text-sm text-gray-400">Kwh por mes</div>
              </div>  
            </div>

            {/* Tabs */}
            <Tabs defaultValue="cocina">
              <TabsList className="flex justify-between gap-1 bg-[#c1ff00]/20 border border-white/10 rounded-full p-1 text-white text-sm">
                {["Cocina", "Sala", "Dormitorio 1", "Baño"].map((label) => (
                  <TabsTrigger
                    key={label}
                    value={label.toLowerCase().replace(" ", "")}
                    className="data-[state=active]:bg-white/10 data-[state=active]:text-white px-4 py-1 rounded-full transition-all"
                  >
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Zone with Highest Consumption */}
          <div className="bg-[#c1ff00]/5 border border-gray-700 rounded-2xl p-6 md:row-span-1 text-white shadow-xl">
            <h2 className="text-xl font-semibold mb-2">
              Zona con Mayor Consumo de Energía
            </h2>

            <div className="flex items-center justify-center mt-6">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 rounded-full border-8 border-gray-800"></div>
                <div
                  className="absolute inset-0 rounded-full border-8 border-[#c1ff00]"
                  style={{
                    clipPath:
                      "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)",
                    transform: "rotate(90deg)",
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Utensils className="h-16 w-16 text-[#c1ff00]" />
                </div>
              </div>
              <div className="text-6xl font-bold text-[#c1ff00] ml-6">50%</div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-[#c1ff00]/5 border border-gray-700 rounded-2xl p-6 md:row-span-1 text-white shadow-xl">
            <h2 className="text-xl font-semibold mb-2">Recomendaciones</h2>
            <p className="text-sm text-gray-400 mb-4">
              Consejos personalizados para optimizar energía
            </p>

            <div className="space-y-4">
              <div className="bg-[#c1ff00] text-black p-4 rounded-lg">
                <p className="font-medium">
                  Desconecta los electrodomésticos que no uses
                </p>
              </div>

              <div className="bg-[#c1ff00]/20 border border-gray-800 p-4 rounded-lg">
                <p className="font-medium">
                  Aprovecha al máximo la luz natural
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Recomendación de hoy
                </p>
              </div>
            </div>
          </div>

          {/* Cost Evolution */}
          <div className="bg-[#c1ff00]/5 border border-gray-700 rounded-2xl p-6 md:col-span-2 text-white shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              Evolución del costo $
            </h2>

            <div className="flex items-end justify-around h-32 mb-4">
              <div className="flex flex-col items-center">
                <div
                  className="bg-[#c1ff00]/40 w-10 rounded-full"
                  style={{ height: "80px" }}
                ></div>
                <div className="text-xs text-gray-400 mt-2">Ene</div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="bg-[#c1ff00]/60 w-10 rounded-full"
                  style={{ height: "100px" }}
                ></div>
                <div className="text-xs text-gray-400 mt-2">Feb</div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="bg-[#c1ff00]/80 w-10 rounded-full"
                  style={{ height: "70px" }}
                ></div>
                <div className="text-xs text-gray-400 mt-2">Mar</div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="bg-[#c1ff00] w-10 rounded-full"
                  style={{ height: "120px" }}
                ></div>
                <div className="text-xs text-gray-400 mt-2">Abr</div>
              </div>

              <div className="ml-6 text-xs">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center">
                    <div className="w-2 h-6 bg-[#c1ff00]/40 mr-2"></div>
                    <div>Ene | 1576 kWh</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-6 bg-[#c1ff00]/60 mr-2"></div>
                    <div>Feb | 1420 kWh</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-6 bg-[#c1ff00]/80 mr-2"></div>
                    <div>Mar | 1380 kWh</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-6 bg-[#c1ff00] mr-2"></div>
                    <div>Abr | 1400 kWh</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black border border-gray-800 p-4 rounded-lg">
              <p>
                Superaste el consumo del mes de{" "}
                <span className="text-[#c1ff00]">Marzo</span>, por lo que para{" "}
                <span className="text-[#c1ff00]">Abril</span> vas a pagar más de{" "}
                <span className="text-[#c1ff00]">$108.587</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
