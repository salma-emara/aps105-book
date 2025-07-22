async function getChatCompletion(prompt) {
    console.log("Sending prompt:", prompt);
    try {
        const response = await fetch('/.netlify/functions/hints', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Log error and detail from server response
            console.error("Fetch error:", data.error, data.detail || "(no details)");
            return;
        }

        console.log("Success:", data.reply);
        return data.reply;
    } catch (err) {
        console.error("Network or parsing error:", err);
    }

}

async function generate_hints(form, originalCode, outputArray, actualOutput, questionPrompt, previousHints) {

    // check if hints already exists
    let hintContainer = form.querySelector(".hint-container");
    let hintInfoContainer, anotherHint;

    if (!hintContainer){ // initial setup

        hintContainer = document.createElement("div");
        hintContainer.classList.add("hint-container");

        // hint info
        hintInfoContainer = document.createElement("div");
        hintInfoContainer.classList.add("hint-info-container");
        hintContainer.appendChild(hintInfoContainer);

        // another hint button
        anotherHint = document.createElement("button");
        anotherHint.type = "button";
        anotherHint.textContent = "Get Hint";
        anotherHint.classList.add("another-hint");
        hintContainer.appendChild(anotherHint);

    } else {
        hintInfoContainer = hintContainer.querySelector(".hint-info-container");
        anotherHint = hintContainer.querySelector(".another-hint");
    }

    const filename = window.quizFilename || "unknown";
    const hintKey = `hintClickCount_${filename}_${form.id}`;
    let hintClickCount = parseInt(localStorage.getItem(hintKey) || "0");

    anotherHint.onclick = async () => {

        hintClickCount++;
        localStorage.setItem(hintKey, hintClickCount);

        // gtag('event', 'testing_hint_requests', {
        //     event_category: 'Quiz Interaction',
        //     event_label: `Hint Click - ${filename}_${form.id}`,
        //     value: hintClickCount
        // });

        console.log(`Hint count for ${filename}_${form.id}:`, hintClickCount);

        if (anotherHint.textContent === "Get Hint") {
            anotherHint.textContent = "Get New Hint";
        }

        // disable button and start countdown
        const cooldown = 5;
        let remaining = cooldown;
        anotherHint.disabled = true;
        const originalText = "Get New Hint";
        anotherHint.textContent = `Wait ${remaining}s`;

        const intervalId = setInterval(() => {
            
            remaining--;
            anotherHint.textContent = `Wait ${remaining}s`;
            
            if (remaining <= 0) {
                clearInterval(intervalId);
                anotherHint.disabled = false;
                anotherHint.textContent = originalText;
            }

        }, 1000);

        hintInfoContainer.innerHTML = "";

        const hintDiv = document.createElement("pre");
        hintDiv.classList.add("hint");
        hintDiv.style.whiteSpace = "pre-wrap";

        const loaderAnimation = document.createElement("div");
        loaderAnimation.classList.add("loader");

        const loadingText = document.createElement("span");
        loadingText.textContent = "Generating hint...";
        loadingText.style.fontWeight = "bold";

        const hintLoadingContainer = document.createElement("div");
        hintLoadingContainer.classList.add("hint-loading");
        hintLoadingContainer.appendChild(loaderAnimation);
        hintLoadingContainer.appendChild(loadingText);

        hintDiv.appendChild(hintLoadingContainer);
        hintInfoContainer.appendChild(hintDiv);

        const prompt = `
        You are a teaching assistant helping a student with a programming question.

        You are given:
        - A programming question
        - The student's code
        - The student's actual output
        - The expected output
        - Hints previously given to the student

        Your task:
        1. Analyze the student's code and output in relation to the expected output.
        2. Identify any errors in their code.
        3. Reflect on how the student might be thinking and where they may be going wrong.
        4. Generate a new critical thinking question about the first mistake in their code to guide the 
            student toward understanding their mistake, without directly giving away the solution.
        5. Ensure that your question is not a repeat of any in the previous hints list.
        6. Please make the hint concise to be under 30 words.

        Use the following format in your response:
        Hint: [your critical thinking question here]

        Inputs:
        Question: ${questionPrompt}
        Student code: ${originalCode}
        Student output: ${actualOutput}
        Expected output: ${outputArray.join(", ")}
        Previous provided hints: ${previousHints.join(", ")}
        `;

        const hintsText = await getChatCompletion(prompt);

        hintDiv.innerHTML = "";

        // parser hint
        const match = hintsText.match(/Hint\s*:\s*(.+)/i);
        let hint = match ? match[1].trim() : "No hint available.";
        hintDiv.innerText = hint;
        previousHints.push(hint);

        hintInfoContainer.appendChild(hintDiv);
    };

    return hintContainer;

}



async function testing_table(question, headers, rows, answer) {


    const prompt = `
    You are helping a student fill in a a table-based question.

    Below are:
    - A question prompt
    - The table's column headers
    - The initial table rows (as given to the student, incomplete)
    - The correct version of the table (the answer)

    Your task:
    1. Evaluate the differences between the student's table (rows) and the correct answer.
    2. Interpret what logic or rule the student might be missing.
    3. Generate a thoughtful explanation or guiding question to help the student understand the pattern or correction needed.

    Format your output as:
    - Explanation: [your interpretation or clarification]
    - Hint: [a follow-up question to guide the student]

    Inputs:
    - Question: ${question}
    - Headers: ${JSON.stringify(headers)}
    - Student Rows: ${JSON.stringify(rows)}
    - Correct Answer: ${JSON.stringify(answer)}
    `;

    const hintsText = await getChatCompletion(prompt);

    const match = hintsText.match(/Hint\s*:\s*(.+)/i);


}
