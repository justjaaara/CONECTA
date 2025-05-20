import { NextRequest, NextResponse } from "next/server";
import { getDeviceConsumptionByPeriod } from "@/app/actions";
import { ConsumptionSummary } from "@/hooks/useDeviceConsumptionData";

export async function GET(request: NextRequest) {
  try {
    // Obtener parámetros de la URL
    const url = new URL(request.url);
    const year = parseInt(url.searchParams.get("year") || "0");
    const month = parseInt(url.searchParams.get("month") || "0");

    if (!year || !month) {
      return NextResponse.json(
        { error: "Año y mes son requeridos" },
        { status: 400 }
      );
    }

    // Consultar datos
    const consumptionData = await getDeviceConsumptionByPeriod(year, month);

    if (!consumptionData) {
      return NextResponse.json(
        { error: "No se encontraron datos" },
        { status: 404 }
      );
    }

    // Procesar datos para el reporte
    let highestConsumption = null;
    let lowestConsumption = null;

    if (consumptionData.deviceConsumption.length > 0) {
      highestConsumption = consumptionData.deviceConsumption.reduce(
        (prev, current) =>
          prev.consumption > current.consumption ? prev : current
      );

      lowestConsumption = consumptionData.deviceConsumption.reduce(
        (prev, current) =>
          prev.consumption < current.consumption ? prev : current
      );
    }

    const result: ConsumptionSummary = {
      ...consumptionData,
      highestConsumption,
      lowestConsumption,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error al obtener datos de consumo:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
