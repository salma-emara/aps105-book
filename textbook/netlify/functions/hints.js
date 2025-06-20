const OpenAI = require('openai');

exports.handler = async (event, context) => {

  console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY ? "SET" : "NOT SET");
  
  // import node-fetch
  const fetch = (await import('node-fetch')).default;
  globalThis.fetch = fetch;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const { prompt } = JSON.parse(event.body);

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
