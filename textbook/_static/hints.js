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


async function generate_hints(questionID, form, originalCode, outputArray, actualOutput, questionPrompt, previousHints) {

    console.log("question-id: ", questionID);
    // check if hints already exists
    let hintContainer = form.querySelector(".hint-container");
    let hintInfoContainer, anotherHint;

    let quizUserID;

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
        
        quizUserID = getOrCreateUserID();

        // set user id properties
        gtag('set', {
            user_properties: {
                user_id_property: quizUserID
            }
        });

    } else {
        hintInfoContainer = hintContainer.querySelector(".hint-info-container");
        anotherHint = hintContainer.querySelector(".another-hint");
    }

    const hintKey = `hint-clicked-${questionID}`;
    let countdown = parseInt(localStorage.getItem(hintKey) || "0");

    anotherHint.onclick = async () => {

        countdown++;
        localStorage.setItem(hintKey, countdown);

        gtag('event', 'testing_hint_requests', {
            event_category: 'Quiz Interaction',
            event_label: `hint-${questionID}`,
            quiz_user_id: quizUserID,
            debug_mode: true
        });
        console.log(`Hint count for ${hintKey}:`, countdown);

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

        const loadingContainer = document.createElement("div");
        loadingContainer.classList.add("hint-loading");
        loadingContainer.appendChild(loaderAnimation);
        loadingContainer.appendChild(loadingText);

        hintDiv.appendChild(loadingContainer);
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
        let hint = match ? match[1].trim() : "No hint available. Please try again!";
        hintDiv.innerText = hint;
        previousHints.push(hint);

        hintInfoContainer.appendChild(hintDiv);
    };

    return hintContainer;

}

async function get_feedback(questionID, form, messageElement, exercise, studentRows, userAnswer, previousFeedback = []) {
    
    console.log("question-id: ", questionID);

    let question = exercise.question;
    let headers = exercise.headers;
    let answer = exercise.answer;

    // check if feedback already exists
    let feedbackContainer = messageElement.querySelector(".hint-container");
    let feedbackInfoContainer, anotherFeedback;

    let quizUserID;

    if (!feedbackContainer){ // initial setup

        feedbackContainer = document.createElement("div");
        feedbackContainer.classList.add("hint-container");

        // feedback info
        feedbackInfoContainer = document.createElement("div");
        feedbackInfoContainer.classList.add("hint-info-container");
        feedbackContainer.appendChild(feedbackInfoContainer);

        // another feedback button
        anotherFeedback = document.createElement("button");
        anotherFeedback.type = "button";
        anotherFeedback.textContent = "Get Feedback";
        anotherFeedback.classList.add("another-hint");
        feedbackContainer.appendChild(anotherFeedback);
        
        quizUserID = getOrCreateUserID();

        // set user id properties
        gtag('set', {
            user_properties: {
                user_id_property: quizUserID
            }
        });


    } else {
        feedbackInfoContainer = feedbackContainer.querySelector(".hint-info-container");
        anotherFeedback = feedbackContainer.querySelector(".another-hint");
    }

    const hintKey = `hint-clicked-${questionID}`;
    let countdown = parseInt(localStorage.getItem(hintKey) || "0");

    anotherFeedback.onclick = async () => {

        countdown++;
        localStorage.setItem(hintKey, countdown);

        gtag('event', 'testing_hint_requests', {
            event_category: 'Quiz Interaction',
            event_label: `feedback-${questionID}`,
            quiz_user_id: quizUserID,
            debug_mode: true
        });
        console.log(`Hint count for ${hintKey}:`, countdown);

        if (anotherFeedback.textContent === "Get Feedback") {
            anotherFeedback.textContent = "Get More Feedback";
        }

        // disable button and start countdown
        const cooldown = 5;
        let remaining = cooldown;
        anotherFeedback.disabled = true;
        const originalText = "Get More Feedback";
        anotherFeedback.textContent = `Wait ${remaining}s`;

        const intervalId = setInterval(() => {
            
            remaining--;
            anotherFeedback.textContent = `Wait ${remaining}s`;
            
            if (remaining <= 0) {
                clearInterval(intervalId);
                anotherFeedback.disabled = false;
                anotherFeedback.textContent = originalText;
            }

        }, 1000);

        feedbackInfoContainer.innerHTML = "";

        const feedbackDiv = document.createElement("pre");
        feedbackDiv.classList.add("hint");
        feedbackDiv.style.whiteSpace = "pre-wrap";

        const loaderAnimation = document.createElement("div");
        loaderAnimation.classList.add("loader");

        const loadingText = document.createElement("span");
        loadingText.textContent = "Getting feedback...";
        loadingText.style.fontWeight = "bold";

        const loadingContainer = document.createElement("div");
        loadingContainer.classList.add("hint-loading");
        loadingContainer.appendChild(loaderAnimation);
        loadingContainer.appendChild(loadingText);

        feedbackDiv.appendChild(loadingContainer);
        feedbackInfoContainer.appendChild(feedbackDiv);

        let prompt;

        if (exercise.table){

            prompt = `
            You are helping a student fill in a table-based question.

            Below are:
            - A question prompt
            - The table's column headers
            - The student's table rows
            - The correct version of the table (the answer)
            - A list of previously provided feedback messages

            Your task is to:
            1. Compare the student's table with the correct answer and identify any mistakes.
            2. Interpret what logic or rule the student might be missing.
            3. Think of a concise explanation that clarifies the error or misunderstanding.
            4. Generate a new feedback message that:
                - Highlights both what the student did correctly and what needs fixing
                - Is not a repeat of any message in the previous feedback list
                - Is under 50 words
            5. Indicate whether the student's current answer is fully correct.

            Format your output as:
            - Explanation: [your interpretation or clarification]
            - Feedback: [feedback message, max 50 words, not a repeat]
            - isCorrect: [true or false]

            Inputs:
            - Question: ${question}
            - Headers: ${JSON.stringify(headers)}
            - Student Rows: ${JSON.stringify(studentRows)}
            - Correct Answer: ${JSON.stringify(answer)}
            - Previous feedback messages: ${previousFeedback.join(", ")}
            `;

        } else if (exercise.type == "explaination") {

            prompt = `You are helping a student with an explanation problem.

            Below are:
            - A question prompt
            - The student's reasoning 
            - The correct explanation
            - A list of previously provided feedback messages (empty if there is none)

            Your task is to:
            1. Compare the student's reasoning with the correct answer and identify any mistakes.
            2. Interpret what logic or rule the student might be missing.
            3. Think of a concise explanation that clarifies the error or misunderstanding.
            4. Generate a new feedback message that:
                - Highlights both what the student explained correctly and what needs fixing
                - Is not a repeat of any message in the previous feedback list
                - Is under 50 words
            5. Indicate whether the student's current answer is fully correct.

            Format your output as:
            - Explanation: [your interpretation or clarification]
            - Feedback: [feedback message, max 50 words, not a repeat]
            - isCorrect: [true or false]

            Inputs:
            - Question: ${question}
            - Student Reasoning: ${JSON.stringify(userAnswer)}
            - Correct Answer: ${JSON.stringify(answer)}
            - Previous feedback messages: ${previousFeedback.join(", ")}
            `;

        } else if (exercise.type == "tracing"){
            
            prompt = `You are helping a student with tracing a program code.

            Below are:
            - A question prompt
            - The student's traced output 
            - The correct output
            - A list of previously provided feedback messages (empty if there is none)

            Your task is to:
            1. Compare the student's output with the correct output and identify any mistakes.
            2. Interpret what logic or rule the student might be missing.
            3. Think of a concise explanation that clarifies the error or misunderstanding.
            4. Generate a new feedback message that:
                - Highlights both what the student explained correctly and what needs fixing
                - Is not a repeat of any message in the previous feedback list
                - Is under 50 words
            5. Indicate whether the student's traced output is fully correct.

            Format your output as:
            - Explanation: [your interpretation or clarification]
            - Feedback: [feedback message, max 50 words, not a repeat]
            - isCorrect: [true or false]

            Inputs:
            - Question: ${question}
            - Student Reasoning: ${JSON.stringify(userAnswer)}
            - Correct Answer: ${JSON.stringify(answer)}
            - Previous feedback messages: ${previousFeedback.join(", ")}
            `;

        }

        const feedbackText = await getChatCompletion(prompt);

        feedbackDiv.innerHTML = "";

        const feedbackMatch = feedbackText.match(/Feedback\s*:\s*(.+)/i);
        const isCorrectMatch = feedbackText.match(/isCorrect\s*:\s*(true|false)/i);

        const feedback = feedbackMatch ? feedbackMatch[1].trim() : "No feedback available. Please try again!";

        let isCorrect;

        if (exercise.type == "tracing"){
            isCorrect = userAnswer.replace(/[^\w]/g, "").toLowerCase() === answer.replace(/[^\w]/g, "").toLowerCase();   
        } else {
            isCorrect = isCorrectMatch ? isCorrectMatch[1].toLowerCase() === "true" : false;
        } 

        feedbackDiv.innerText = feedback;

        if (isCorrect) anotherFeedback.style.display = "none";  // hides the button

        previousFeedback.push(feedback);
        feedbackInfoContainer.appendChild(feedbackDiv);

    };

    return feedbackContainer;

}
