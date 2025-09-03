exports.handler = async (event, context) => {

  const fetchModule = await import('node-fetch');
  globalThis.fetch = fetchModule.default;
  globalThis.Headers = fetchModule.Headers;
  globalThis.Request = fetchModule.Request;
  globalThis.Response = fetchModule.Response;

  const { Blob } = await import('fetch-blob');
  globalThis.Blob = Blob;

  const { FormData } = await import('formdata-node');
  globalThis.FormData = FormData;

  const OpenAI = require('openai');

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    if (!event.body) {
      throw new Error("Missing request body");
    }

    const { prompt } = JSON.parse(event.body);

    if (!prompt) {
      throw new Error("Prompt is empty");
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: completion.choices[0].message.content }),
    };
  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to fetch from OpenAI",
        detail: err.message, // Pass the actual error message to the frontend
      }),
    };
    }
}

