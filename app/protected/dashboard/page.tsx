import { ChevronDown, ChevronUp, Utensils } from "lucide-react";
import { Device } from "@/app/protected/home/Cards";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getCurrentSessionCached,
  getDevicesCached,
  getUserWeeklyMeasurementsCached,
  getUserYearlyMeasurementsCached,
} from "@/app/actions";
import WeeklyPowerChart from "@/components/WeeklyPowerChartComponent";
import { measurement } from "@/types/types";
import ZoneWithHighestConsumption from "./ZoneWithHighestConsumption";
import TotalEnergyConsumption from "./TotalEnergyConsumption";
import Recommendations from "./Recomendations";

async function DashboardPage() {
  let measurements: measurement[] = [];
  let yearlyConsumption = 0;
  const { user } = await getCurrentSessionCached();
  if (user) {
    const userId = user.id;
    const { yearly_consumption, status: yearlyStatus } =
      await getUserYearlyMeasurementsCached(userId);
    if (yearlyStatus && yearly_consumption) {
      yearlyConsumption = yearly_consumption[0].total_consumption;
    }
    const { status, devices } = await getDevicesCached(user);
    if (status && devices) {
      const response = await getUserWeeklyMeasurementsCached(userId);
      measurements = response.measurements;
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-4">
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Current Energy Consumption */}
          <div className="bg-gradient-to-b from-black to-[#c1ff00]/40 border border-gray-700 rounded-2xl p-6 md:row-span-1 text-white shadow-xl text-center justify-center items-center flex flex-col">
            <h2 className="text-3xl font-semibold mb-4">
              Seguimiento Energético Del Año En curso
            </h2>
            <p className="text-lg text-gray-400 mb-6">
              Energía consumida hasta ahora en total:
            </p>
            <div className="flex flex-row items-center justify-center">
              <div className="text-6xl font-bold">{yearlyConsumption}</div>
              <div className="text-xl ml-2 mb-2 text-gray-400">kWh</div>
            </div>
          </div>

          {/* Weekly Energy Consumption */}
          <div className="bg-[#c1ff00]/5 border border-gray-700 rounded-2xl md:col-span-2">
            <WeeklyPowerChart data={measurements} color="#c1ff00" />
          </div>

          {/* Total Energy Consumption */}
          <TotalEnergyConsumption />

          {/* Zone with Highest Consumption */}
          <ZoneWithHighestConsumption />

          {/* Recommendations */}
          <Recommendations />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
