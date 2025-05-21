"use client";

import React, { useEffect, useState } from "react";
import { getUserDeviceConsumption } from "@/app/actions";
import { DeviceConsumptionSummary } from "@/types/types";

const ConsumptionByDevice = () => {
  const [loading, setLoading] = useState(true);
  const [deviceData, setDeviceData] = useState<DeviceConsumptionSummary | null>(
    null
  );

  useEffect(() => {
    const fetchDeviceConsumption = async () => {
      setLoading(true);
      try {
        const data = await getUserDeviceConsumption();
        setDeviceData(data);
      } catch (error) {
        console.error("Error fetching device consumption data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceConsumption();
  }, []);

  // Función para dividir los dispositivos en dos columnas equilibradas
  const getDevicesInColumns = () => {
    if (!deviceData || !deviceData.devices.length) return [[], []];

    const midpoint = Math.ceil(deviceData.devices.length / 2);
    const leftColumn = deviceData.devices.slice(0, midpoint);
    const rightColumn = deviceData.devices.slice(midpoint);

    return [leftColumn, rightColumn];
  };

  const [leftColumnDevices, rightColumnDevices] = getDevicesInColumns();

  return (
    <div className="bg-[#c1ff00]/5 border border-gray-700 rounded-2xl p-6 md:col-span-2 text-white shadow-xl">
      <h2 className="text-xl font-semibold mb-4">Consumo por Dispositivo</h2>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((col) => (
            <div key={col} className="space-y-4">
              {[1, 2, 3].map((row) => (
                <div key={`${col}-${row}`} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="h-5 w-32 bg-gray-700/50 animate-pulse rounded"></div>
                    <div className="h-5 w-12 bg-gray-700/50 animate-pulse rounded"></div>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-gray-700/50 animate-pulse h-2 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deviceData && deviceData.devices.length > 0 ? (
            <>
              {/* Columna izquierda */}
              <div className="space-y-4">
                {leftColumnDevices.map((device) => (
                  <div key={device.device_id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>{device.device_name}</span>
                      <span className="text-[#c1ff00]">
                        {Math.round(device.percentage)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-[#c1ff00] h-2 rounded-full"
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Columna derecha */}
              <div className="space-y-4">
                {rightColumnDevices.map((device) => (
                  <div key={device.device_id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>{device.device_name}</span>
                      <span className="text-[#c1ff00]">
                        {Math.round(device.percentage)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-[#c1ff00] h-2 rounded-full"
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="col-span-2 flex flex-col items-center justify-center py-12">
              <p className="text-gray-400">
                No hay datos de consumo por dispositivo para este período
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConsumptionByDevice;
