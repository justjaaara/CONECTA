import { ConsumptionSummary } from "@/hooks/useDeviceConsumptionData";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface ReportData {
  period: {
    month: string;
    year: number;
  };
  consumptionData: ConsumptionSummary;
}

// Colores de la aplicación Conecta
const COLORS = {
  primary: "#c1ff00", // Verde lima característico
  black: "#000000",
  darkGray: "#1e1e1e", // Fondo oscuro
  lightGray: "#a0a0a0",
  white: "#ffffff",
};

export const generateReportPDF = async (data: ReportData) => {
  // Crear documento PDF
  const doc = new jsPDF();

  // Añadir fondo oscuro en la cabecera
  doc.setFillColor(COLORS.darkGray);
  doc.rect(0, 0, 210, 40, "F");

  // Añadir línea decorativa con el color primario
  doc.setFillColor(COLORS.primary);
  doc.rect(0, 40, 210, 3, "F");

  // Añadir logo (versión textual si no tienes una imagen)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(COLORS.primary);
  doc.text("CONECTA", 14, 20);

  // Subtítulo
  doc.setFontSize(14);
  doc.setTextColor(COLORS.white);
  doc.text("Optimización energética para el hogar", 14, 30);

  // Título del reporte
  doc.setFontSize(20);
  doc.setTextColor(COLORS.black);
  doc.text(
    `Reporte de Consumo: ${getMonthName(data.period.month)} ${data.period.year}`,
    14,
    55
  );

  // Información general
  doc.setFontSize(12);
  doc.setTextColor(COLORS.darkGray);
  doc.text(`Fecha de generación: ${new Date().toLocaleDateString()}`, 14, 65);

  // Destacar consumo total con un cuadro
  doc.setFillColor(COLORS.primary);
  doc.setDrawColor(COLORS.primary);
  doc.roundedRect(14, 72, 80, 16, 3, 3, "FD");
  doc.setTextColor(COLORS.black);
  doc.setFontSize(13);
  doc.text(
    `Consumo total: ${data.consumptionData.totalConsumption.toFixed(2)} kWh`,
    17,
    82
  );

  // Dispositivos con mayor y menor consumo
  doc.setTextColor(COLORS.darkGray);
  let yPosition = 100;

  // Dispositivo con mayor consumo
  if (data.consumptionData.highestConsumption) {
    const highest = data.consumptionData.highestConsumption;
    doc.setTextColor(COLORS.darkGray);
    doc.setFontSize(12);
    doc.text("Dispositivo con mayor consumo:", 14, yPosition);
    doc.setFontSize(13);
    doc.setTextColor(COLORS.black);
    doc.text(highest.device_name, 14, yPosition + 7);
    doc.setFontSize(15);
    doc.setTextColor(COLORS.primary);
    doc.text(`${highest.consumption.toFixed(2)} kWh`, 70, yPosition + 7);
    yPosition += 20;
  }

  // Dispositivo con menor consumo
  if (data.consumptionData.lowestConsumption) {
    const lowest = data.consumptionData.lowestConsumption;
    doc.setTextColor(COLORS.darkGray);
    doc.setFontSize(12);
    doc.text("Dispositivo con menor consumo:", 14, yPosition);
    doc.setFontSize(13);
    doc.setTextColor(COLORS.black);
    doc.text(lowest.device_name, 14, yPosition + 7);
    doc.setFontSize(15);
    doc.setTextColor(COLORS.primary);
    doc.text(`${lowest.consumption.toFixed(2)} kWh`, 70, yPosition + 7);
    yPosition += 25;
  }

  // Crear tabla con los dispositivos con estilo personalizado
  const tableColumn = ["ID", "Dispositivo", "Ubicación", "Consumo (kWh)"];
  const tableRows = [];

  for (const device of data.consumptionData.deviceConsumption) {
    const deviceData = [
      device.device_id,
      device.device_name,
      device.location,
      device.consumption.toFixed(2),
    ];
    tableRows.push(deviceData);
  }

  // @ts-ignore - jspdf-autotable tiene problemas con TypeScript
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: yPosition,
    theme: "grid",
    styles: {
      fontSize: 10,
      cellPadding: 4,
    },
    headStyles: {
      fillColor: COLORS.darkGray,
      textColor: COLORS.white,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [248, 248, 248],
    },
    columnStyles: {
      3: {
        fontStyle: "bold",
        textColor: [60, 60, 60],
      },
    },
  });

  // Añadir pie de página
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(
      "Conecta - Optimización energética para el hogar",
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: "center" }
    );
    doc.text(
      `Página ${i} de ${pageCount}`,
      doc.internal.pageSize.width - 20,
      doc.internal.pageSize.height - 10
    );
  }

  // Guardar el archivo
  const fileName = `reporte_consumo_${data.period.month}_${data.period.year}.pdf`;
  doc.save(fileName);
};

// Función auxiliar para obtener el nombre del mes en español
function getMonthName(monthValue: string): string {
  const months: Record<string, string> = {
    enero: "Enero",
    febrero: "Febrero",
    marzo: "Marzo",
    abril: "Abril",
    mayo: "Mayo",
    junio: "Junio",
    julio: "Julio",
    agosto: "Agosto",
    septiembre: "Septiembre",
    octubre: "Octubre",
    noviembre: "Noviembre",
    diciembre: "Diciembre",
  };

  return months[monthValue] || monthValue;
}
