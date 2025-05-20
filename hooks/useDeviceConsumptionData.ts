import { useState } from "react";

export interface DeviceConsumption {
  device_id: number;
  device_name: string;
  consumption: number;
  location: string;
}

export interface ConsumptionSummary {
  totalConsumption: number;
  deviceConsumption: DeviceConsumption[];
  highestConsumption: DeviceConsumption | null;
  lowestConsumption: DeviceConsumption | null;
}

export const useDeviceConsumptionData = () => {
  const [data, setData] = useState<ConsumptionSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConsumptionData = async (year: number, month: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/reports/consumption?year=${year}&month=${month}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los datos de consumo");
      }

      const consumptionData: ConsumptionSummary = await response.json();
      setData(consumptionData);
      return consumptionData;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchConsumptionData,
  };
};
