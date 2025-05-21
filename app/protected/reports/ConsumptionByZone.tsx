"use client";

import React, { useEffect, useState } from "react";
import { getUserZoneConsumption } from "@/app/actions";
import { ZoneConsumption, ZoneConsumptionSummary } from "@/types/types";

const ConsumptionByZone = () => {
  const [loading, setLoading] = useState(true);
  const [zoneData, setZoneData] = useState<ZoneConsumptionSummary | null>(null);

  useEffect(() => {
    const fetchZoneConsumption = async () => {
      setLoading(true);
      try {
        const data = await getUserZoneConsumption();
        setZoneData(data);
      } catch (error) {
        console.error("Error fetching zone consumption data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchZoneConsumption();
  }, []);

  return (
    <div className="bg-[#c1ff00]/5 border border-gray-700 rounded-2xl p-6 md:col-span-1 text-white shadow-xl">
      <h2 className="text-xl font-semibold mb-4">Consumo por Zona</h2>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="h-5 w-24 bg-gray-700/50 animate-pulse rounded"></div>
                <div className="h-5 w-10 bg-gray-700/50 animate-pulse rounded"></div>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-gray-700/50 animate-pulse h-2 rounded-full w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {zoneData && zoneData.zones.length > 0 ? (
            zoneData.zones.map((zone) => (
              <div key={zone.zone_name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>{zone.zone_name}</span>
                  <span className="text-[#c1ff00]">
                    {Math.round(zone.percentage)}%
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-[#c1ff00] h-2 rounded-full"
                    style={{ width: `${zone.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-400">
                No hay datos de consumo por zona para este período
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConsumptionByZone;
