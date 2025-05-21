import {
  BarChart3,
  ChevronUp,
  Download,
  FileText,
  Filter,
  Printer,
} from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReportPeriodComponent from "./ReportPeriodComponent";
import MonthlySummary from "./MonthlySummary";
import DailyConsumption from "./DailyConsumptionChart";

export default function ReportesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-4">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Reportes</h1>
            <p className="text-gray-400">
              Visualiza y analiza tu consumo de energía
            </p>
          </div>
        </div>

        {/* Report Period Selector */}
        <ReportPeriodComponent />

        {/* Report Types */}
        <Tabs defaultValue="consumo" className="mb-6">
          <TabsList className="flex justify-start gap-1 bg-[#c1ff00]/20 border border-white/10 rounded-full p-1 text-white text-sm w-full md:w-auto">
            <TabsTrigger
              value="consumo"
              className="data-[state=active]:bg-white/10 data-[state=active]:text-white px-4 py-1 rounded-full transition-all"
            >
              Consumo Energético
            </TabsTrigger>
            <TabsTrigger
              value="costos"
              className="data-[state=active]:bg-white/10 data-[state=active]:text-white px-4 py-1 rounded-full transition-all"
            >
              Costos
            </TabsTrigger>
            <TabsTrigger
              value="comparativo"
              className="data-[state=active]:bg-white/10 data-[state=active]:text-white px-4 py-1 rounded-full transition-all"
            >
              Comparativo
            </TabsTrigger>
            <TabsTrigger
              value="dispositivos"
              className="data-[state=active]:bg-white/10 data-[state=active]:text-white px-4 py-1 rounded-full transition-all"
            >
              Dispositivos
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Monthly Summary */}
          <MonthlySummary />

          {/* Daily Consumption */}
          <DailyConsumption />

          {/* Consumption by Zone */}
          <div className="bg-[#c1ff00]/5 border border-gray-700 rounded-2xl p-6 md:col-span-1 text-white shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Consumo por Zona</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Cocina</span>
                  <span className="text-[#c1ff00]">50%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-[#c1ff00] h-2 rounded-full"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Sala</span>
                  <span className="text-[#c1ff00]">25%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-[#c1ff00] h-2 rounded-full"
                    style={{ width: "25%" }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Dormitorio 1</span>
                  <span className="text-[#c1ff00]">15%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-[#c1ff00] h-2 rounded-full"
                    style={{ width: "15%" }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Baño</span>
                  <span className="text-[#c1ff00]">10%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-[#c1ff00] h-2 rounded-full"
                    style={{ width: "10%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Consumption by Device */}
          <div className="bg-[#c1ff00]/5 border border-gray-700 rounded-2xl p-6 md:col-span-2 text-white shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              Consumo por Dispositivo
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Nevera</span>
                    <span className="text-[#c1ff00]">35%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-[#c1ff00] h-2 rounded-full"
                      style={{ width: "35%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Aire Acondicionado</span>
                    <span className="text-[#c1ff00]">30%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-[#c1ff00] h-2 rounded-full"
                      style={{ width: "30%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Lavadora</span>
                    <span className="text-[#c1ff00]">15%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-[#c1ff00] h-2 rounded-full"
                      style={{ width: "15%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Microondas</span>
                    <span className="text-[#c1ff00]">10%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-[#c1ff00] h-2 rounded-full"
                      style={{ width: "10%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Televisor</span>
                    <span className="text-[#c1ff00]">7%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-[#c1ff00] h-2 rounded-full"
                      style={{ width: "7%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Otros</span>
                    <span className="text-[#c1ff00]">3%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-[#c1ff00] h-2 rounded-full"
                      style={{ width: "3%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Reports */}
          <div className="bg-[#c1ff00]/5 border border-gray-700 rounded-2xl p-6 md:col-span-3 text-white shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Reportes Recientes</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4">Nombre</th>
                    <th className="text-left py-3 px-4">Período</th>
                    <th className="text-left py-3 px-4">Consumo Total</th>
                    <th className="text-left py-3 px-4">Costo</th>
                    <th className="text-left py-3 px-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "Reporte Mensual",
                      period: "Abril 2023",
                      consumption: "274 kWh",
                      cost: "$108,587",
                    },
                    {
                      name: "Reporte Mensual",
                      period: "Marzo 2023",
                      consumption: "256 kWh",
                      cost: "$98,450",
                    },
                    {
                      name: "Reporte Mensual",
                      period: "Febrero 2023",
                      consumption: "286 kWh",
                      cost: "$112,340",
                    },
                    {
                      name: "Reporte Trimestral",
                      period: "Ene-Mar 2023",
                      consumption: "816 kWh",
                      cost: "$320,780",
                    },
                  ].map((report, index) => (
                    <tr key={index} className="border-b border-gray-800">
                      <td className="py-3 px-4 flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-[#c1ff00]" />
                        {report.name}
                      </td>
                      <td className="py-3 px-4">{report.period}</td>
                      <td className="py-3 px-4">{report.consumption}</td>
                      <td className="py-3 px-4">{report.cost}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
