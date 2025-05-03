import { DasboardHeader } from "./DasboardHeader";
import Image from "next/image";
import { BedDouble, ChevronDown, ChevronUp } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
          <div className="bg-[#c1ff00]/5 border border-gray-700 rounded-2xl p-6 md:col-span-1 text-white shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Seguimiento Semanal</h2>
            <p className="text-sm text-gray-400 mb-6">
              Gráficas de consumo de energía
            </p>

            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <div className="flex items-center">
                Lun <ChevronDown className="h-3 w-3 ml-1" />
              </div>
              <div className="flex items-center">
                Mar <ChevronDown className="h-3 w-3 ml-1" />
              </div>
              <div className="flex items-center">
                Mié <ChevronDown className="h-3 w-3 ml-1" />
              </div>
              <div className="flex items-center">
                Jue <ChevronDown className="h-3 w-3 ml-1" />
              </div>
              <div className="flex items-center">
                Vie <ChevronDown className="h-3 w-3 ml-1" />
              </div>
              <div className="flex items-center">
                Sáb <ChevronDown className="h-3 w-3 ml-1" />
              </div>
              <div className="flex items-center">
                Dom <ChevronDown className="h-3 w-3 ml-1" />
              </div>
            </div>

            <div className="flex justify-between items-end h-16 mb-2">
              <div className="w-8 bg-gray-800 rounded-sm h-12"></div>
              <div className="w-8 bg-gray-800 rounded-sm h-10"></div>
              <div className="w-8 bg-gray-800 rounded-sm h-14"></div>
              <div className="w-8 bg-gray-800 rounded-sm h-8"></div>
              <div className="w-8 bg-gray-800 rounded-sm h-12"></div>
              <div className="w-8 bg-[#c1ff00] rounded-sm h-10"></div>
              <div className="w-8 bg-gray-800 rounded-sm h-14"></div>
            </div>

            <div className="flex justify-between text-xs text-gray-400">
              <div>
                276
                <br />
                kWh
              </div>
              <div>
                286
                <br />
                kWh
              </div>
              <div>
                298
                <br />
                kWh
              </div>
              <div>
                246
                <br />
                kWh
              </div>
              <div>
                276
                <br />
                kWh
              </div>
              <div>
                274
                <br />
                kWh
              </div>
              <div>
                326
                <br />
                kWh
              </div>
            </div>
          </div>

          {/* Total Energy Consumption */}
          <div className="bg-[#c1ff00]/5 border border-gray-700 rounded-2xl p-6 md:row-span-1 text-white shadow-xl">
            <h2 className="text-2xl font-bold mb-6">
              Consumo de Energía Total
            </h2>

            {/* Labels */}
            <div className="flex justify-between text-sm text-gray-300 mb-4">
              <div className="flex items-center font-semibold">
                Microondas <ChevronUp className="ml-1 h-3 w-3" />
              </div>
              <div className="flex items-center font-semibold">
                Nevera <ChevronDown className="ml-1 h-3 w-3" />
              </div>
              <div className="flex items-center font-semibold">
                Aire AC <ChevronUp className="ml-1 h-3 w-3" />
              </div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-3 text-center mb-6">
              <div>
                <div className="text-3xl font-extrabold">5-6</div>
                <div className="text-sm text-gray-400">Kwh por mes</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold">29-71</div>
                <div className="text-sm text-gray-400">Kwh por mes</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold">37-63</div>
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
                  <BedDouble className="h-16 w-16 text-[#c1ff00]" />
                </div>
              </div>
              <div className="text-6xl font-bold text-[#c1ff00] ml-6">50%</div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-[#c1ff00]/5 border border-gray-700 rounded-2xl p-6 md:row-span-1 text-white shadow-xl">
            <h2 className="text-xl font-semibold mb-2">Recomendaciones</h2>
            <p className="text-sm text-gray-400 mb-4">
              Tips personalizados para optimizar energía
            </p>

            <div className="space-y-4">
              <div className="bg-[#c1ff00] text-black p-4 rounded-lg">
                <p className="font-medium">
                  Desconecta electrodomésticos que no uses
                </p>
              </div>

              <div className="bg-black border border-gray-800 p-4 rounded-lg">
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
