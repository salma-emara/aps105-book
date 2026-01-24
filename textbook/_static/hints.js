async function getChatCompletion(prompt) {
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

        return data.reply;
    } catch (err) {
        console.error("Network or parsing error:", err);
    }

}

function getStudentAnswer(storageKey, exercise, partIndex) {

    if (exercise.table) {
        
        let rawStudentRows = JSON.parse(localStorage.getItem(`${storageKey}-table`) || "[]");

		let studentRows = rawStudentRows.map((row, index) => {
			const correctMethod = exercise.answer[index]?.[0] || "";
			return [correctMethod, row?.[1] || "", row?.[2] || ""];
		});
        
        return studentRows;

    } else if (exercise.type == "programming" || exercise.type == "function programming") {
        
        let progData = JSON.parse(localStorage.getItem(`${storageKey}-programming-${partIndex}`));

		if (progData) {
            return progData.userCode; 
        } else {
            return "";
        }

    } else if (exercise.type == "tracing") {
        return localStorage.getItem(`${storageKey}-trace`) || "";
    } else if (exercise.type == "explaination") {
        return localStorage.getItem(`${storageKey}-explaination`) || "";
    } else {
        return "";
    }

}

/* 
TODO: Currently, there is a lot of code in generate_hints and get_feedback that 
is not needed for end-of-chapter exercises logic. Need to confirm if short quizzes
will have any longer questions (programming, tracing, etc.) If not, we can clean 
up generate_hints and get_feedback a lot. 

generate_hints, remove following:
- originalCode (use getStudentAnswer)
- questionPrompt (use exercise.question)
- questionID (use exercise["question-id"])
- partIndex (we don't need that ever so update exercise.js)

get_feedback, remove following:
- form
- studentRows (use getStudentAnswer)
- userAnswer (use getStudentAnswer)
*/


async function generate_hints(questionID, form, originalCode, outputArray, actualOutput, questionPrompt, previousHints, exercise, storageKey, partIndex) {

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

        let lastRunCode = getStudentAnswer(storageKey, exercise, partIndex);
        localStorage.setItem(`${storageKey}-lastRunCode`, JSON.stringify(lastRunCode));

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

        // get student answer from localStorage
        originalCode = getStudentAnswer(storageKey, exercise, partIndex);

        // check if the student code was run on testcases
        let lastRunCode = JSON.parse(localStorage.getItem(`${storageKey}-lastRunCode`) || "");
        let ranTestcases = JSON.stringify(originalCode) === JSON.stringify(lastRunCode);
        
        console.log("ran testcases: ", ranTestcases);

        let prompt;

        if (ranTestcases) {

            prompt = `
            You are a teaching assistant helping a student with a programming question.

            You are given:
            - A programming question
            - The student's code
            - The student's actual outputs
            - The expected outputs
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
            Student outputs: ${actualOutput}
            Expected outputs: ${outputArray.join(", ")}
            Previous provided hints: ${previousHints.join(", ")}
            `;

        } else {

            prompt = `
            You are a teaching assistant helping a student debug a programming question.

            You are given:
            - A programming question
            - The student's code

            Your task:
            1. Carefully trace the student's code line by line using the problem statement.
            2. Determine whether the code is fully correct or contains an error.            
            3. If the code contains an error, do the following:
                a) Reflect on how the student might be thinking and where they may be going wrong.
                b) Generate a new critical thinking question about the first mistake in their code to guide the 
                student toward understanding their mistake, without directly giving away the solution.
                c) Ensure that your question is not a repeat of any in the previous hints list.
            5. If the code is fully correct, do the following:
                a) Do not invent issues.
                b) Generate a hint that encourages the student to run, test, or submit the code as is, without suggesting changes.
            6. Please make the hint concise to be under 30 words.

            Use the following format in your response:
            Hint: [your critical thinking question here]

            Inputs:
            Question: ${questionPrompt}
            Student code: ${originalCode}
            `;

        }

        console.log(prompt);

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

async function get_feedback(questionID, form, messageElement, exercise, studentRows, userAnswer, previousFeedback = [], storageKey) {
    

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

        if (!exercise.table){
            userAnswer = getStudentAnswer(storageKey, exercise, 0);
        }

        let prompt;

        if (exercise.table){

            studentRows = getStudentAnswer(storageKey, exercise, 0);

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
                - Highlight what needs fixing and if the answer is fully correct, you can say so
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
                - Highlight what needs fixing and if the answer is fully correct, you can say so
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
                - Highlight what needs fixing and if the answer is fully correct, you can say so
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

        previousFeedback.push(feedback);
        feedbackInfoContainer.appendChild(feedbackDiv);

    };

    return feedbackContainer;

}
