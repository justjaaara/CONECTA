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
import ConsumptionByZone from "./ConsumptionByZone";
import ConsumptionByDevice from "./ConsumptionByDevice";
import ServiceAccount from "./ServiceAccount";

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

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Monthly Summary */}
          <MonthlySummary />

          {/* Daily Consumption */}
          <DailyConsumption />

          {/* Consumption by Zone */}
          <ConsumptionByZone />

          {/* Consumption by Device */}
          <ConsumptionByDevice />

          {/* Recent Reports */}
          <ServiceAccount />
        </div>
      </div>
    </div>
  );
}
