"use client";

import React, { useEffect, useState } from "react";
import { getUserZoneConsumption } from "@/app/actions";
import { ZoneConsumptionSummary } from "@/types/types";
import {
  Utensils,
  Home,
  Droplets,
  Bed,
  Sofa,
  Car,
  TreePine,
  Briefcase,
  Loader2,
} from "lucide-react";

const ZoneWithHighestConsumption = () => {
  const [loading, setLoading] = useState(true);
  const [zoneData, setZoneData] = useState<ZoneConsumptionSummary | null>(null);
  const [highestZone, setHighestZone] = useState<{
    name: string;
    percentage: number;
  } | null>(null);

  useEffect(() => {
    const fetchZoneConsumption = async () => {
      setLoading(true);
      try {
        const data = await getUserZoneConsumption();
        setZoneData(data);

        // Encontrar la zona con mayor consumo
        if (data && data.zones && data.zones.length > 0) {
          const highest = data.zones.reduce(
            (prev, current) =>
              current.percentage > prev.percentage ? current : prev,
            data.zones[0]
          );

          setHighestZone({
            name: highest.zone_name,
            percentage: highest.percentage,
          });
        }
      } catch (error) {
        console.error("Error fetching zone consumption data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchZoneConsumption();
  }, []);

  // Función para seleccionar el icono según la zona
  const getZoneIcon = (zoneName: string) => {
    switch (zoneName.toLowerCase()) {
      case "cocina":
        return <Utensils className="h-16 w-16 text-[#c1ff00]" />;
      case "balcón":
        return <Home className="h-16 w-16 text-[#c1ff00]" />;
      case "baño":
        return <Droplets className="h-16 w-16 text-[#c1ff00]" />;
      case "dormitorio":
        return <Bed className="h-16 w-16 text-[#c1ff00]" />;
      case "sala":
        return <Sofa className="h-16 w-16 text-[#c1ff00]" />;
      case "garaje":
        return <Car className="h-16 w-16 text-[#c1ff00]" />;
      case "jardín":
        return <TreePine className="h-16 w-16 text-[#c1ff00]" />;
      case "oficina":
        return <Briefcase className="h-16 w-16 text-[#c1ff00]" />;
      default:
        return <Utensils className="h-16 w-16 text-[#c1ff00]" />;
    }
  };

  // Función para calcular el clip path basado en el porcentaje
  const getClipPath = (percentage: number) => {
    // Convertir porcentaje a grados (360 grados = 100%)
    const degrees = (percentage / 100) * 360;

    // Si el porcentaje es muy bajo, mostrar un segmento pequeño
    if (percentage < 1) {
      return "polygon(50% 50%, 50% 0%, 50.1% 0%)";
    }

    // Si el porcentaje es 50% o menos
    if (degrees <= 180) {
      return `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((Math.PI * degrees) / 180)}% ${50 - 50 * Math.cos((Math.PI * degrees) / 180)}%)`;
    }

    // Si el porcentaje es mayor a 50%
    return `polygon(50% 50%, 50% 0%, 100% 0%, 100% ${50 - 50 * Math.sin((Math.PI * (degrees - 180)) / 180)}%, ${50 + 50 * Math.cos((Math.PI * (degrees - 180)) / 180)}% 100%, 0% 100%, 0% 0%, 50% 0%)`;
  };

  return (
    <div className="bg-[#c1ff00]/5 border border-gray-700 rounded-2xl p-4 sm:p-6 md:row-span-1 text-white shadow-xl">
      <h2 className="text-lg sm:text-xl font-semibold mb-2">
        Zona con Mayor Consumo de Energía
      </h2>

      {loading ? (
        <div className="flex items-center justify-center mt-6 h-40">
          <Loader2 className="h-12 w-12 text-[#c1ff00] animate-spin" />
        </div>
      ) : highestZone ? (
        <div className="flex flex-col sm:flex-row items-center justify-center mt-4 sm:mt-6">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40">
            <div className="absolute inset-0 rounded-full border-6 sm:border-8 border-gray-800"></div>
            <div
              className="absolute inset-0 rounded-full border-6 sm:border-8 border-[#c1ff00]"
              style={{
                clipPath: getClipPath(highestZone.percentage),
                transform: "rotate(-90deg)",
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              {getZoneIcon(highestZone.name)}
            </div>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col items-center sm:items-start">
            <div className="text-4xl sm:text-6xl font-bold text-[#c1ff00]">
              {Math.round(highestZone.percentage)}%
            </div>
            <div className="text-base sm:text-lg text-gray-400 mt-1 sm:mt-2">
              {highestZone.name}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-40 text-gray-400">
          No hay datos de consumo por zona disponibles
        </div>
      )}
    </div>
  );
};

export default ZoneWithHighestConsumption;
