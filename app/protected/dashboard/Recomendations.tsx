"use client";

import React, { useEffect, useState } from "react";
import { getUserDeviceConsumption } from "@/app/actions";
import { Loader2 } from "lucide-react";

const Recommendations = () => {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [deviceData, setDeviceData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Obtener datos de consumo de dispositivos
        const deviceConsumptionData = await getUserDeviceConsumption();
        setDeviceData(deviceConsumptionData);

        // 2. Construir el prompt basado en los datos de dispositivos
        if (
          deviceConsumptionData &&
          deviceConsumptionData.devices &&
          deviceConsumptionData.devices.length > 0
        ) {
          // Obtener los 3 dispositivos con mayor consumo
          const topDevices = [...deviceConsumptionData.devices]
            .sort((a, b) => b.total_consumption - a.total_consumption)
            .slice(0, 3);

          const deviceInfoText = topDevices
            .map(
              (device) =>
                `${device.device_name}: ${device.total_consumption.toFixed(1)} kWh (${device.percentage.toFixed(1)}% del total)`
            )
            .join(", ");

          // Crear el prompt para Hugging Face
          const promptText = `Tengo los siguientes dispositivos con alto consumo eléctrico: ${deviceInfoText}. 
          Dame exactamente 2 consejos específicos y concretos para reducir el consumo de estos dispositivos. 
          Responde con formato de lista numerada. Sé breve y directo.`;

          // 3. Hacer la petición a la API local que se conecta con Hugging Face
          const response = await fetch("/api/analyze-consumption", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              energia: deviceConsumptionData.totalConsumption.toFixed(1),
              fecha: "este mes",
              prompt: promptText,
            }),
          });

          if (!response.ok) {
            throw new Error("Error al obtener recomendaciones");
          }

          const data = await response.json();

          // Extraer las recomendaciones del texto
          let recommendations = data.analysis;

          // Si la respuesta es muy larga o tiene formato incorrecto, extraer solo los puntos relevantes
          if (recommendations) {
            // Buscar puntos numerados (1. y 2.)
            const regex = /\d+\.\s+([\s\S]*?)(?=\d+\.|$)/g;
            const matches = [...recommendations.matchAll(regex)];

            if (matches.length >= 2) {
              // Extraer los dos primeros consejos
              setRecommendations([matches[0][1].trim(), matches[1][1].trim()]);
            } else {
              // Si no hay formato numerado, dividir por párrafos y tomar los primeros dos
              const paragraphs = recommendations
                .split("\n")
                .filter((p: string) => p.trim().length > 0) // Añadimos el tipo explícito string aquí
                .slice(0, 2);

              setRecommendations(paragraphs);
            }
          } else {
            // Recomendaciones por defecto si no hay respuesta
            setRecommendations([
              "Desconecta los electrodomésticos que no uses regularmente",
              "Aprovecha al máximo la luz natural para reducir el uso de iluminación artificial",
            ]);
          }
        } else {
          // Recomendaciones por defecto si no hay datos de dispositivos
          setRecommendations([
            "Desconecta los electrodomésticos que no uses regularmente",
            "Utiliza electrodomésticos con certificación de eficiencia energética",
          ]);
        }
      } catch (error) {
        console.error("Error al obtener las recomendaciones:", error);
        // Recomendaciones por defecto en caso de error
        setRecommendations([
          "Desconecta los electrodomésticos que no uses",
          "Aprovecha al máximo la luz natural",
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[#c1ff00]/5 border border-gray-700 rounded-2xl p-6 md:row-span-1 text-white shadow-xl">
      <h2 className="text-xl font-semibold mb-2">Recomendaciones</h2>
      <p className="text-sm text-gray-400 mb-4">
        Consejos personalizados para optimizar energía
      </p>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-6">
          <Loader2 className="h-8 w-8 text-[#c1ff00] animate-spin mb-2" />
          <p className="text-sm text-gray-400">Generando recomendaciones...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.length > 0 && (
            <div className="bg-[#c1ff00] text-black p-4 rounded-lg">
              <p className="font-medium">{recommendations[0]}</p>
            </div>
          )}

          {recommendations.length > 1 && (
            <div className="bg-[#c1ff00]/20 border border-gray-800 p-4 rounded-lg">
              <p className="font-medium">{recommendations[1]}</p>
              <p className="text-xs text-gray-400 mt-2">Recomendación de hoy</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
