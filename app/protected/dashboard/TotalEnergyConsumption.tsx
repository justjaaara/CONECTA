"use client";

import React, { useEffect, useState } from "react";
import {
  getUserZoneConsumption,
  getUserDeviceConsumption,
  getDevicesByZone,
} from "@/app/actions";
import { DeviceConsumptionItem, ZoneConsumption } from "@/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Definir las posibles zonas
const ZONES = [
  "Cocina",
  "Balcón",
  "Baño",
  "Dormitorio",
  "Sala",
  "Garaje",
  "Jardín",
  "Oficina",
];

const TotalEnergyConsumption = () => {
  const [loading, setLoading] = useState(true);
  const [selectedZone, setSelectedZone] = useState<string>("");
  const [zoneDevices, setZoneDevices] = useState<DeviceConsumptionItem[]>([]);
  const [allDevices, setAllDevices] = useState<DeviceConsumptionItem[]>([]);
  const [availableZones, setAvailableZones] = useState<string[]>([]);
  const [previousMonthData, setPreviousMonthData] = useState<{
    [key: string]: number;
  }>({});

  // Cargar datos cuando el componente se monta
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Obtener todas las zonas con consumo
        const zonesData = await getUserZoneConsumption();

        // 2. Obtener dispositivos con su consumo
        const devicesData = await getUserDeviceConsumption();

        if (devicesData && devicesData.devices) {
          setAllDevices(devicesData.devices);

          // Crear un mapa de dispositivos para el mes anterior (simulado con datos aleatorios)
          // En una implementación real, esto vendría de otro endpoint
          const prevMonthData: { [key: string]: number } = {};
          devicesData.devices.forEach((device) => {
            // Simulamos datos del mes anterior con una variación aleatoria
            const randomFactor =
              Math.random() > 0.5
                ? 0.8 + Math.random() * 0.4 // 80-120% del consumo actual
                : 1.0 + Math.random() * 0.3; // 100-130% del consumo actual

            prevMonthData[device.device_id] =
              device.total_consumption * randomFactor;
          });
          setPreviousMonthData(prevMonthData);
        }

        // 3. Obtener zonas disponibles y establecer la zona por defecto
        if (zonesData && zonesData.zones && zonesData.zones.length > 0) {
          const zoneNames = zonesData.zones.map((zone) => zone.zone_name);
          setAvailableZones(zoneNames);

          // Seleccionar primera zona disponible
          const firstZone = zoneNames[0];
          setSelectedZone(firstZone);

          // Filtrar dispositivos para esta zona
          if (devicesData && devicesData.devices) {
            filterDevicesByZone(firstZone);
          }
        }
      } catch (error) {
        console.error("Error fetching zone and device data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrar dispositivos por zona
  const filterDevicesByZone = async (zone: string) => {
    try {
      setLoading(true);
      // Llamar a la nueva server action para obtener dispositivos por zona
      const zoneDevicesData = await getDevicesByZone(zone);

      if (zoneDevicesData && zoneDevicesData.length > 0) {
        // Ya vienen ordenados por consumo
        setZoneDevices(zoneDevicesData);
      } else {
        setZoneDevices([]);
      }
    } catch (error) {
      console.error(`Error al obtener dispositivos para zona ${zone}:`, error);
      setZoneDevices([]);
    } finally {
      setLoading(false);
    }
  };

  // Y actualizar handleZoneChange para ser async
  const handleZoneChange = async (value: string) => {
    setSelectedZone(value);
    await filterDevicesByZone(value);
  };

  // Determinar si el consumo ha aumentado o disminuido comparado con el mes anterior
  const getTrend = (deviceId: number) => {
    const currentConsumption =
      allDevices.find((d) => d.device_id === deviceId)?.total_consumption || 0;
    const previousConsumption = previousMonthData[deviceId] || 0;

    // Si no hay datos previos, no mostramos tendencia
    if (previousConsumption === 0) return { isIncrease: false, hasData: false };

    return {
      isIncrease: currentConsumption > previousConsumption,
      hasData: true,
    };
  };

  // Formatear un valor numérico para mostrar
  const formatConsumption = (value: number): string => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}`;
    }
    return Math.round(value).toString();
  };

  // Determinar unidades según el valor
  const getUnit = (value: number): string => {
    return value >= 1000 ? "MWh" : "kWh";
  };

  return (
    <div className="bg-[#c1ff00]/5 border border-gray-700 rounded-2xl p-6 md:row-span-1 text-white shadow-xl">
      <h2 className="text-xl font-semibold mb-4">Consumo de Energía Total</h2>

      {/* Selector de zona */}
      <div className="mb-6">
        <Select
          value={selectedZone}
          onValueChange={handleZoneChange}
          disabled={loading || availableZones.length === 0}
        >
          <SelectTrigger className="w-full bg-black border-gray-700 focus:ring-[#c1ff00]">
            <SelectValue placeholder="Selecciona una zona" />
          </SelectTrigger>
          <SelectContent className="bg-black border-gray-700 text-white">
            {availableZones.map((zone) => (
              <SelectItem
                key={zone}
                value={zone}
                className="focus:bg-gray-800 focus:text-white"
              >
                {zone}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        // Estado de carga
        <div className="grid grid-cols-3 gap-4 text-sm text-gray-300 mb-6 text-center">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-6 bg-gray-700/50 rounded mb-2"></div>
              <div className="h-10 w-20 bg-gray-700/50 rounded mx-auto mb-1"></div>
              <div className="h-4 bg-gray-700/50 rounded"></div>
            </div>
          ))}
        </div>
      ) : zoneDevices.length > 0 ? (
        // Mostrar dispositivos de la zona
        <div className="grid grid-cols-3 gap-4 text-sm text-gray-300 mb-6 text-center">
          {zoneDevices.map((device) => {
            const { isIncrease, hasData } = getTrend(device.device_id);
            const consumption = formatConsumption(device.total_consumption);
            const unit = getUnit(device.total_consumption);

            return (
              <div key={device.device_id}>
                <div className="flex items-center justify-center font-semibold mb-2">
                  {device.device_name.length > 12
                    ? `${device.device_name}`
                    : device.device_name}
                </div>
                <div className="text-3xl font-semibold">{consumption}</div>
                <div className="text-sm text-gray-400">{unit} por mes</div>
              </div>
            );
          })}

          {/* Rellenar con espacios vacíos si hay menos de 3 dispositivos */}
          {Array(3 - zoneDevices.length)
            .fill(0)
            .map((_, index) => (
              <div key={`empty-${index}`} className="opacity-50">
                <div className="flex items-center justify-center font-semibold mb-2">
                  Sin dispositivo
                </div>
                <div className="text-3xl font-semibold">--</div>
                <div className="text-sm text-gray-400">kWh por mes</div>
              </div>
            ))}
        </div>
      ) : (
        // No hay dispositivos en la zona seleccionada
        <div className="text-center py-8 text-gray-400">
          No se encontraron dispositivos en {selectedZone}.
        </div>
      )}

      {/* Tabs para selección rápida de zonas populares */}
      <div className="flex overflow-x-auto gap-1 bg-[#c1ff00]/20 border border-white/10 rounded-full p-1 text-white text-sm">
        {availableZones.slice(0, 4).map((zone) => (
          <button
            key={zone}
            onClick={() => handleZoneChange(zone)}
            className={`px-4 py-1 rounded-full whitespace-nowrap transition-all ${
              selectedZone === zone
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {zone}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TotalEnergyConsumption;
