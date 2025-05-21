import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const bodyData = await request.json();
    const { energia, fecha } = bodyData;

    if (!energia || !fecha) {
      return NextResponse.json(
        { error: "Datos de energía o fecha no proporcionados" },
        { status: 400 }
      );
    }

    // Construir el prompt para el modelo
    const userPrompt = `
      De acuerdo a estos datos que tengo de mi cuenta de servicios en Colombia:
      - Consumo de energía: ${energia} kWh
      - Período: ${fecha}
      
      Dime si estoy teniendo un consumo energético muy elevado o si es normal y también dame recomendaciones para mantener o bajar el consumo de energía en mi hogar.
    `;

    // Simulación de respuesta de IA para probar sin API key
    // Reemplaza esto con tu llamada real a Hugging Face cuando tengas todo configurado
    const simulatedResponse = {
      analysis: `Basado en los datos de tu consumo energético de ${energia} kWh durante ${fecha}, puedo indicarte que tu consumo se encuentra dentro del rango normal para un hogar colombiano promedio.

En Colombia, un hogar típico consume entre 150-200 kWh mensualmente. Tu consumo está dentro de estos parámetros.

Algunas recomendaciones para mantener o reducir tu consumo:

1. Utiliza bombillas LED de bajo consumo en todas las habitaciones.
2. Desenchufa los electrodomésticos cuando no estén en uso para evitar el consumo fantasma.
3. Aprovecha la luz natural durante el día.
4. Considera instalar paneles solares si tu presupuesto lo permite.
5. Revisa la eficiencia energética de tus electrodomésticos grandes (nevera, lavadora, etc.).

Implementando estas medidas podrías reducir hasta un 20% de tu consumo actual.`,
    };

    return NextResponse.json({ analysis: simulatedResponse.analysis });
  } catch (error) {
    console.error("Error al analizar consumo:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
