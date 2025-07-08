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
            Generate a hint that helps a student with a programming question.

            Provide 1 hint that does not give away the solution. Keep the hint limited to one sentence, 
            ensuring it is *different* and *more helpful* than any previously hint given.

            Format your response like:
            Hint: ...

            Question: ${questionPrompt}
            Student code: ${originalCode}
            Expected output: ${outputArray.join(", ")}
            Student output: ${actualOutput}

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
