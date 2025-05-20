"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateReportPDF } from "@/lib/reportGenerator";
import { useDeviceConsumptionData } from "@/hooks/useDeviceConsumptionData";

// Interfaces para tipado
interface MonthOption {
  value: string;
  label: string;
  number: number;
}

const monthOptions: MonthOption[] = [
  { value: "enero", label: "Enero", number: 1 },
  { value: "febrero", label: "Febrero", number: 2 },
  { value: "marzo", label: "Marzo", number: 3 },
  { value: "abril", label: "Abril", number: 4 },
  { value: "mayo", label: "Mayo", number: 5 },
  { value: "junio", label: "Junio", number: 6 },
  { value: "julio", label: "Julio", number: 7 },
  { value: "agosto", label: "Agosto", number: 8 },
  { value: "septiembre", label: "Septiembre", number: 9 },
  { value: "octubre", label: "Octubre", number: 10 },
  { value: "noviembre", label: "Noviembre", number: 11 },
  { value: "diciembre", label: "Diciembre", number: 12 },
];

const ReportPeriodComponent = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const yearOptions = [currentYear - 2, currentYear - 1, currentYear];

  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    monthOptions.find((m) => m.number === currentMonth)?.value || "enero"
  );
  const [availableMonths, setAvailableMonths] =
    useState<MonthOption[]>(monthOptions);

  // Manejar cambios en el año seleccionado
  useEffect(() => {
    if (selectedYear === currentYear) {
      // Si es el año actual, solo mostrar meses hasta el actual
      setAvailableMonths(
        monthOptions.filter((month) => month.number <= currentMonth)
      );
    } else {
      // Si es año pasado, mostrar todos los meses
      setAvailableMonths(monthOptions);
    }
  }, [selectedYear, currentMonth]);

  // Hook para obtener los datos de consumo (implementación después)
  const { data, loading, error, fetchConsumptionData } =
    useDeviceConsumptionData();

  const handleGenerateReport = async () => {
    const monthNumber =
      monthOptions.find((m) => m.value === selectedMonth)?.number || 1;

    try {
      // Obtener datos de consumo
      await fetchConsumptionData(selectedYear, monthNumber);

      if (data) {
        // Generar PDF con los datos obtenidos
        await generateReportPDF({
          period: {
            month: selectedMonth,
            year: selectedYear,
          },
          consumptionData: data,
        });
      }
    } catch (error) {
      console.error("Error al generar el reporte:", error);
    }
  };

  return (
    <div className="bg-[#c1ff00]/5 border border-gray-700 rounded-2xl p-6 mb-6 shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-xl font-semibold mb-4 md:mb-0">
          Período de Reporte
        </h2>
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 w-full md:w-auto">
          <Select
            value={selectedMonth}
            onValueChange={(value) => setSelectedMonth(value)}
          >
            <SelectTrigger className="w-full md:w-[180px] bg-black border-gray-700">
              <SelectValue placeholder="Mes" />
            </SelectTrigger>
            <SelectContent className="bg-black border-gray-700 text-white">
              {availableMonths.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedYear.toString()}
            onValueChange={(value) => setSelectedYear(parseInt(value))}
          >
            <SelectTrigger className="w-full md:w-[180px] bg-black border-gray-700">
              <SelectValue placeholder="Año" />
            </SelectTrigger>
            <SelectContent className="bg-black border-gray-700 text-white">
              {yearOptions.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            className="bg-[#c1ff00] text-black hover:bg-[#a8e600]"
            onClick={handleGenerateReport}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Generar Reporte"}
          </Button>
        </div>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ReportPeriodComponent;
