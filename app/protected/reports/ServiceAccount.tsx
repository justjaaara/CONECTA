"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, RotateCcw, Loader2 } from "lucide-react";
import { toast } from "sonner";
// Importamos nuestra utilidad para extraer datos del PDF
import { extractEnergyConsumptionFromFile } from "@/utils/pdfParser";
// Mantenemos PDF.js para visualización si es necesario
import * as pdfjsLib from "pdfjs-dist";
import { Card, CardContent } from "@/components/ui/card";

const ServiceAccount = () => {
  const [isPdfUploaded, setIsPdfUploaded] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<{
    energia: string;
    fecha: string;
    textoCompleto?: string;
  } | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [processingPdf, setProcessingPdf] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Configuración de PDF.js al cargar el componente
  useEffect(() => {
    // Usar la versión CDN del worker que coincide con nuestra versión instalada
    const workerSrc = `https://unpkg.com/pdfjs-dist@5.2.133/build/pdf.worker.min.mjs`;
    pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];

    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
      setIsPdfUploaded(true);
      setProcessingPdf(true);
      setError(null);

      try {
        const data = await extractDataFromPdf(uploadedFile);
        setExtractedData(data);
        toast.success("PDF procesado exitosamente", {
          description: `Se encontraron datos: Energía: ${data.energia} kWh, Fecha: ${data.fecha}`,
        });
        console.log(
          "Texto completo extraído:",
          data.textoCompleto || "No disponible"
        );
      } catch (err) {
        console.error("Error al procesar el PDF:", err);
        setError(
          "No se pudieron extraer los datos del PDF. Por favor, asegúrate de subir una cuenta de servicios válida."
        );
        toast.error("Error al procesar el PDF", {
          description:
            "No se pudieron extraer los datos necesarios. Intenta con otro archivo.",
        });
      } finally {
        setProcessingPdf(false);
      }
    } else if (uploadedFile) {
      setError("Por favor sube un archivo PDF válido");
      toast.error("Formato incorrecto", {
        description: "Por favor sube un archivo PDF válido",
      });
    }
  };

  const extractDataFromPdf = async (
    pdfFile: File
  ): Promise<{ energia: string; fecha: string; textoCompleto?: string }> => {
    try {
      // Usamos nuestra función de utilidad que ahora usa PDF.js directamente
      const result = await extractEnergyConsumptionFromFile(pdfFile);

      // Imprimimos el texto completo por consola
      console.log("Texto extraído del PDF:", result.textoCompleto);

      if (!result.energia || !result.fechaTexto) {
        throw new Error("No se encontraron los datos necesarios en el PDF");
      }

      return {
        energia: result.energia,
        fecha: result.fechaTexto,
        textoCompleto: result.textoCompleto,
      };
    } catch (error) {
      console.error("Error al extraer datos con nuestra utilidad:", error);
      console.log("Utilizando método alternativo con PDF.js");
      // Intentamos con el método alternativo
      return await extractWithPdfJs(pdfFile);
    }
  };

  // Mantenemos la función original como método de respaldo
  const extractWithPdfJs = async (
    pdfFile: File
  ): Promise<{ energia: string; fecha: string }> => {
    // Cargar el PDF usando PDF.js
    const fileData = new Uint8Array(await pdfFile.arrayBuffer());
    const pdf = await pdfjsLib.getDocument({ data: fileData }).promise;

    // Extraemos texto de todas las páginas para mayor robustez
    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(" ");
      fullText += pageText + " ";

      // Imprimimos el texto de cada página
      console.log(`Texto extraído de la página ${i}:`, pageText);
    }

    // Extraer la información de energía usando expresiones regulares
    const energiaMatch = fullText.match(/(\d+(?:\.\d+)?)\s*k[wW]h/i);
    // Buscar fecha (formato: mes de año, ej: "julio de 2024")
    const fechaMatch = fullText.match(/([a-zA-ZáéíóúÁÉÍÓÚ]+)\s+de\s+(\d{4})/);

    if (!energiaMatch || !fechaMatch) {
      throw new Error("No se encontraron los datos necesarios en el PDF");
    }

    return {
      energia: energiaMatch[1],
      fecha: `${fechaMatch[1]} de ${fechaMatch[2]}`,
    };
  };

  const resetForm = () => {
    setIsPdfUploaded(false);
    setFile(null);
    setExtractedData(null);
    setAiResponse(null);
    setError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const analyzeWithAI = async () => {
    if (!extractedData) return;

    setLoading(true);
    try {
      // Implementamos una solución más simple que evita Promise.withResolvers
      const response = await fetch("/api/analyze-consumption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          energia: extractedData.energia,
          fecha: extractedData.fecha,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al consultar la IA");
      }

      const data = await response.json();
      setAiResponse(data.analysis);
      toast.success("Análisis completado", {
        description: "Se ha completado el análisis de tu consumo energético",
      });
    } catch (err) {
      console.error("Error al analizar con IA:", err);
      setError(
        "No se pudo completar el análisis. Por favor intenta nuevamente."
      );
      toast.error("Error en el análisis", {
        description: "Hubo un problema al procesar tu solicitud con la IA",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#c1ff00]/5 border border-gray-700 rounded-2xl p-6 md:col-span-3 text-white shadow-xl">
      <h2 className="text-xl font-semibold mb-4">
        Análisis de cuenta de servicios
      </h2>
      <p className="text-gray-400 mb-6">
        Sube tu cuenta de servicios de energía para obtener un análisis
        personalizado y recomendaciones sobre tu consumo energético
      </p>

      {!isPdfUploaded ? (
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-600 rounded-lg hover:border-[#c1ff00]/50 transition-colors">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />
          <FileText size={48} className="text-gray-500 mb-4" />
          <p className="text-gray-300 mb-3 text-center">
            Arrastra y suelta tu archivo PDF o haz clic para seleccionarlo
          </p>
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="bg-transparent border border-[#c1ff00]/70 hover:bg-[#c1ff00]/20 text-white"
          >
            <Upload className="mr-2 h-4 w-4" /> Seleccionar PDF
          </Button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-black/50 p-4 rounded-lg">
            <div className="flex items-center">
              <FileText className="text-[#c1ff00] mr-3" size={24} />
              <div>
                <p className="font-medium">{file?.name}</p>
                <p className="text-sm text-gray-400">
                  {processingPdf
                    ? "Procesando documento..."
                    : extractedData
                      ? `Energía: ${extractedData.energia} kWh · Fecha: ${extractedData.fecha}`
                      : "Error al procesar el documento"}
                </p>
                {extractedData?.textoCompleto && (
                  <p className="text-xs text-gray-500 mt-1">
                    Texto extraído correctamente (ver consola para detalles)
                  </p>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetForm}
              className="hover:bg-red-900/20 hover:text-red-400"
            >
              <RotateCcw size={16} className="mr-1" /> Cambiar
            </Button>
          </div>

          {extractedData && !aiResponse && !loading && (
            <Button
              onClick={analyzeWithAI}
              className="bg-[#c1ff00] text-black hover:bg-[#a0cc00] w-full py-6"
            >
              Analizar mi consumo energético
            </Button>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 size={40} className="animate-spin text-[#c1ff00] mb-4" />
              <p>Analizando tu consumo energético...</p>
            </div>
          )}

          {aiResponse && (
            <Card className="border-[#c1ff00]/30 bg-black/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-3 text-[#c1ff00]">
                  Análisis de tu consumo
                </h3>
                <div className="prose prose-invert max-w-none">
                  {aiResponse.split("\n").map((paragraph, idx) => (
                    <p key={idx} className="mb-2 text-gray-200">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <Button
                  onClick={resetForm}
                  className="mt-6 bg-[#c1ff00]/20 hover:bg-[#c1ff00]/30 border border-[#c1ff00]/50"
                >
                  <RotateCcw size={16} className="mr-2" /> Analizar otra cuenta
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceAccount;
