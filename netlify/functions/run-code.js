export async function handler(event) {
  try {
    const body = JSON.parse(event.body || "{}");
    
    const { language, version, files, stdin } = body;

    if (!language || !version || !files) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: "Missing fields", 
          received: { language: !!language, version: !!version, files: !!files } 
        }),
      };
    }

    const apiKey = process.env.PISTON_API; 

    const pistonUrl = "https://emkc.org/api/v2/piston/execute";
    const headers = { 
      "Content-Type": "application/json",
      "Authorization": apiKey
    };

    const response = await fetch(pistonUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({ language, version, files, stdin: stdin || "" }),
    });

    const result = await response.json();
    return {
        statusCode: response.status,
        body: JSON.stringify(result),
    };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }

}