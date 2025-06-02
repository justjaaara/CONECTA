import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const bodyData = await request.json();
    const { energia, fecha, prompt, textoCompleto } = bodyData;

    if (!energia || !fecha) {
      return NextResponse.json(
        { error: "Datos de energía o fecha no proporcionados" },
        { status: 400 }
      );
    }

    // Construir el prompt para el modelo con la información extraída del PDF
    const userPrompt =
      prompt ||
      `
      De acuerdo a estos datos que tengo de mi cuenta de servicios de energía en Colombia:
      - Consumo de energía: ${energia} kWh
      - Período: ${fecha}
      
      Por favor, analiza esta información y proporciona:
      1. Una evaluación de si mi consumo es elevado, normal o bajo para un hogar promedio.
      2. Una explicación clara de las posibles causas de mi nivel de consumo.
      3. Al menos 3 recomendaciones específicas y prácticas para mejorar mi eficiencia energética.
      4. Una estimación de cuánto podría ahorrar en kWh si implemento estas recomendaciones.
      
      ${textoCompleto ? `Información adicional extraída del PDF: ${textoCompleto}` : ""}
      
      Sé detallado pero conciso en tu respuesta, y organiza la información de manera clara.
    `;

    // Usar la API de OpenRouter con Deepseek para el análisis
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost",
          "X-Title": "Conecta Análisis de Consumo",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat:free",
          messages: [
            {
              role: "system",
              content:
                "Eres un asistente experto en análisis de consumo energético. Proporciona respuestas claras, estructuradas y útiles. Organiza tu respuesta en secciones claras con espacios entre párrafos para facilitar la lectura. No utilices formato Markdown complejo, solo texto plano con saltos de línea.",
            },
            { role: "user", content: userPrompt },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error en la API de OpenRouter: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Respuesta completa de OpenRouter:", data);

    // Extraer la respuesta del modelo
    let analysis =
      data.choices?.[0]?.message?.content ||
      "No se pudo obtener una respuesta del modelo. Por favor, intenta nuevamente.";

    // Procesar el formato Markdown para hacerlo más legible
    analysis = analysis
      // Reemplazar los encabezados de Markdown con texto normal
      .replace(/^#+ (.+)$/gm, "$1")
      // Reemplazar negrita
      .replace(/\*\*(.+?)\*\*/g, "$1")
      // Reemplazar cursiva
      .replace(/\*(.+?)\*/g, "$1")
      // Reemplazar listas con viñetas
      .replace(/^\* (.+)$/gm, "• $1")
      // Reemplazar listas numeradas (mantenemos el número)
      .replace(/^(\d+)\. (.+)$/gm, "$1. $2")
      // Asegurar que hay espacios entre párrafos
      .replace(/\n\n+/g, "\n\n")
      // Eliminar enlaces y mantener solo el texto
      .replace(/\[(.+?)\]\(.+?\)/g, "$1");

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Error al analizar consumo:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
