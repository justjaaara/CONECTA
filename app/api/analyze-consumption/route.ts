import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const bodyData = await request.json();
    const { energia, fecha, prompt } = bodyData;

    if (!energia || !fecha) {
      return NextResponse.json(
        { error: "Datos de energía o fecha no proporcionados" },
        { status: 400 }
      );
    }

    // Construir el prompt para el modelo (usar el personalizado si existe)
    const userPrompt =
      prompt ||
      `
      De acuerdo a estos datos que tengo de mi cuenta de servicios en Colombia:
      - Consumo de energía: ${energia} kWh
      - Período: ${fecha}
      
      Dame exactamente 2 consejos específicos y concretos para reducir mi consumo de energía en mi hogar.
      Responde con formato de lista numerada. Sé breve y directo.
    `;

    // Si tienes el token de Hugging Face configurado, usa esta implementación:
    if (process.env.HUGGINGFACE_API_KEY) {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          },
          body: JSON.stringify({
            inputs: userPrompt,
            parameters: {
              max_new_tokens: 250, // Limitamos la respuesta para que sea concisa
              temperature: 0.7,
              top_p: 0.9,
              do_sample: true,
              return_full_text: false,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Error en la API de Hugging Face: ${response.statusText}`
        );
      }

      const data = await response.json();

      // Extraer la respuesta del modelo
      let analysis = data[0]?.generated_text || "";

      // Limpiar la respuesta
      analysis = analysis
        .replace(userPrompt, "")
        .trim()
        .replace(/^(\s*[\n\r]+)+/, "");

      return NextResponse.json({ analysis });
    } else {
      // Simulación de respuesta si no está configurada la API key
      const simulatedResponse = {
        analysis: `Para reducir el consumo de estos dispositivos, te recomiendo:

1. Configura tus electrodomésticos en modo de ahorro de energía y desenchúfalos cuando no los uses para evitar el consumo fantasma.

2. Utiliza temporizadores para los dispositivos de mayor consumo, programándolos para que funcionen durante horas de menor tarifa eléctrica.`,
      };

      return NextResponse.json({ analysis: simulatedResponse.analysis });
    }
  } catch (error) {
    console.error("Error al analizar consumo:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
