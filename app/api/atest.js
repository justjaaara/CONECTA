async function callOpenRouter() {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost",
        "X-Title": "Mi App Node Simple",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat:free",
        messages: [
          { role: "user", content: "¿Cuál es la capital de Francia?" },
        ],
      }),
    }
  );

  const data = await response.json();
  console.log("Respuesta:", data.choices?.[0]?.message?.content);
}

callOpenRouter();
