// utils/pdfParser.ts
// Para PDF.js
import * as pdfjsLib from "pdfjs-dist";

// Función para extraer energía desde objeto File (para uso en cliente)
// Usa PDF.js directamente ya que está disponible en el navegador
export async function extractEnergyConsumptionFromFile(pdfFile: File): Promise<{
  energia: string | null;
  fechaTexto: string | null;
  textoCompleto: string;
}> {
  try {
    // Cargar el PDF usando PDF.js
    const arrayBuffer = await pdfFile.arrayBuffer();
    const fileData = new Uint8Array(arrayBuffer);
    const pdf = await pdfjsLib.getDocument({ data: fileData }).promise;

    // Extraemos texto de todas las páginas
    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(" ");
      fullText += pageText + " ";
    }

    // Buscar energía con regex más flexible
    const energiaRegex = /Energía\s+(\d+(?:\.\d+)?)\s*k[wW]h/i;
    const energiaMatch = fullText.match(energiaRegex);

    // Buscar fecha (formato: mes de año, ej: "julio de 2024")
    const fechaRegex = /([a-zA-ZáéíóúÁÉÍÓÚ]+)\s+de\s+(\d{4})/;
    const fechaMatch = fullText.match(fechaRegex);

    return {
      energia: energiaMatch ? energiaMatch[1] : null,
      fechaTexto: fechaMatch ? `${fechaMatch[1]} de ${fechaMatch[2]}` : null,
      textoCompleto: fullText,
    };
  } catch (error) {
    console.error("Error al extraer texto del PDF:", error);
    throw error;
  }
}
