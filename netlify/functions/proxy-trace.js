// This is the serverless function that runs on Netlify's backend

exports.handler = async function(event, context) {
  // 1. We only want to accept POST requests from our frontend
  // In html, GET is retrieving data, and POST is uploading data.
  // In the context of our proxy, we would only want it to receive the POSTed data from python tutor.
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // grab the raw C code that the browser sent over
    const body = JSON.parse(event.body);
    const userCode = body.code;

    // package code
    const params = new URLSearchParams();
    params.append("user_script", userCode);
    params.append("raw_input_json", "");
    params.append("options_json", JSON.stringify({
      cumulative_mode: false,
      heap_primitives: false,
      show_only_outputs: false,
      origin: "opt-frontend.js",
      cpp_version: "c_gcc9.3.0",
      fe_disableHeapNesting: true,
      fe_textualMemoryLabels: false
    }));
    params.append("lang", "c");
    params.append("stdin", "");
    params.append("backend_options_json", "{}");
    params.append("frontend_options_json", "{}");
    params.append("starting_instruction", 0);
    params.append("instruction_limit", 10000);
    params.append("origin", "c");

    // 4. Dial Python Tutor and wait for the response
    const tutorResponse = await fetch("https://pythontutor.com/web_exec_c.py", {
      method: "POST",
      body: params,
      // Note: Netlify will forcefully kill this after 10 seconds anyway
    });

    if (!tutorResponse.ok) {
      throw new Error(`Python Tutor returned status: ${tutorResponse.status}`);
    }

    // Grab the massive JSON trace from Python Tutor
    const traceData = await tutorResponse.json();

    // 5. Send it DIRECTLY back to the browser! 
    // This 'return' statement is what shoots the JSON back down the open connection.
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(traceData) 
    };

  } catch (error) {
    console.error("Proxy error:", error);
    
    // If it takes longer than 10 seconds or Python Tutor crashes, tell the browser
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch trace from Python Tutor." })
    };
  }
};