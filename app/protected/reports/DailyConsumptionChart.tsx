"use client";

import React, { useState, useEffect } from "react";
import { getUserDailyConsumption } from "@/app/actions";
import DailyConsumptionChartComponent from "@/components/DailyConsumptionChartComponent";
import { DailyConsumptionSummary } from "@/types/types";

const DailyConsumption = () => {
  const [loading, setLoading] = useState(true);
  const [consumptionData, setConsumptionData] =
    useState<DailyConsumptionSummary | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getUserDailyConsumption();
        setConsumptionData(data);
      } catch (error) {
        console.error("Error fetching daily consumption:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[#c1ff00]/5 border border-gray-700 rounded-2xl p-6 md:col-span-2 text-white shadow-xl">
      {loading ? (
        <div className="flex flex-col gap-4">
          <div className="h-6 w-48 bg-gray-700/50 animate-pulse rounded"></div>
          <div className="h-40 w-full bg-gray-700/50 animate-pulse rounded"></div>
          <div className="flex justify-between">
            <div className="h-4 w-36 bg-gray-700/50 animate-pulse rounded"></div>
            <div className="h-4 w-36 bg-gray-700/50 animate-pulse rounded"></div>
          </div>
        </div>
      ) : (
        <>
          {consumptionData && consumptionData.dailyData.length > 0 ? (
            <>
              <DailyConsumptionChartComponent
                data={consumptionData.dailyData}
                height={240}
              />
              <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mt-6 gap-4">
                <div className="text-sm text-gray-400">
                  Día con mayor consumo:{" "}
                  <span className="text-white">
                    {consumptionData.highestConsumption.day} de{" "}
                    {consumptionData.highestConsumption.month} (
                    {consumptionData.highestConsumption.power.toFixed(1)} kWh)
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  Día con menor consumo:{" "}
                  <span className="text-white">
                    {consumptionData.lowestConsumption.day} de{" "}
                    {consumptionData.lowestConsumption.month} (
                    {consumptionData.lowestConsumption.power.toFixed(1)} kWh)
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-400">
                No hay datos de consumo para este período
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DailyConsumption;
