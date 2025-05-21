"use client";

import { ChevronUp, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { getUserMonthlyConsumptionCached } from "@/app/actions";
import type { MonthlyConsumption } from "@/types/types";

const MonthlySummary = () => {
  const [consumption, setConsumption] = useState<MonthlyConsumption | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  // Obtener fecha actual para mostrar el mes y año
  const currentDate = new Date();
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const currentMonth = months[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    const fetchConsumption = async () => {
      setLoading(true);
      try {
        const data = await getUserMonthlyConsumptionCached();
        setConsumption(data);
      } catch (error) {
        console.error("Error fetching consumption data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsumption();
  }, []);

  return (
    <div className="bg-gradient-to-b from-black to-[#c1ff00]/40 border border-gray-700 rounded-2xl p-6 md:row-span-1 text-white shadow-xl">
      <h2 className="text-xl font-semibold mb-4">Resumen Mensual</h2>
      <p className="text-sm text-gray-400 mb-6">{`${currentMonth} ${currentYear}`}</p>

      {loading ? (
        <div className="flex flex-col gap-2">
          <div className="h-16 w-32 bg-gray-700/50 animate-pulse rounded"></div>
          <div className="h-6 w-48 bg-gray-700/50 animate-pulse rounded"></div>
        </div>
      ) : (
        <>
          <div className="flex items-end">
            <div className="text-8xl font-bold">
              {consumption?.currentConsumption.toFixed(0) || "0"}
            </div>
            <div className="text-xl ml-2 mb-2 text-gray-400">kWh</div>
          </div>

          {consumption && consumption.percentageChange > 0 && (
            <div
              className={`mt-4 flex items-center ${consumption.isIncrease ? "text-red-400 font-bold" : "text-[#c1ff00]"}`}
            >
              {consumption.isIncrease ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  <span>{`${consumption.percentageChange}% más que el mes anterior`}</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  <span>{`${consumption.percentageChange}% menos que el mes anterior`}</span>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MonthlySummary;
