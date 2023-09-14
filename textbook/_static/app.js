let currentQuestionIndex = 0;

function startQuiz() {

    currentQuestionIndex = 0;

    const quizForms = document.querySelectorAll("[id^='quizForm']");

    for (let i = 1; i < quizForms.length; i++) {
        quizForms[i].style.display = "none";
        quizForms[i].style.border = "1px solid black";
        quizForms[i].style.borderRadius = "5px";
    }

    var fullscreenForm = document.getElementById("fullscreen-form");
    fullscreenForm.classList.add("active");
    fullscreenForm.classList.remove("mini");

    const currentForm = quizForms[currentQuestionIndex];
    currentForm.style.display = "block";
    var submitButton = document.getElementById("submit-button1");
    submitButton.classList.remove("hidden");
    currentForm.style.border = "1px solid black";
    currentForm.style.borderRadius = "5px";

    const containerheader = document.getElementById("container-header");
    containerheader.classList.add("hidden-imp");

    if (quizForms.length === 1) {

        //hide the next buttons
        var nextButtons = document.getElementsByClassName("next-button");

        for (var i = 0; i < nextButtons.length; i++) {
            var nextButton = nextButtons[i];
            nextButton.classList.add("hidden");
        }
    }

    var closeButton = document.getElementById("close-button");
    closeButton.classList.remove("hidden");

    // Get the radio buttons and checkboxes
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Clear pre-selected options and enable radio buttons
    radioButtons.forEach((radioButton) => {
        radioButton.checked = false;
        radioButton.disabled = false;
    });

    // Clear pre-selected options and enable checkboxes
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
        checkbox.disabled = false;
    });

    // Loop through each message element and make it empty
    const messageElements = document.querySelectorAll("[id^='message']");

    messageElements.forEach(element => {
        element.innerHTML = "";
    });

    // Get all the <hr> elements
    const hrElements = document.querySelectorAll("[id^='hr-element']");

    // Remove each <hr> element
    for (let i = 0; i < hrElements.length; i++) {
        hrElements[i].classList.add("hidden");
    }

}

function closeFullscreenForm() {

    var forms = document.querySelectorAll("[id^='quizForm']");
    var lastForm = forms[forms.length - 1];
    var messageElement = lastForm.querySelector("p[id^='message']");

    if (messageElement && (messageElement.textContent !== "" && messageElement.textContent !== "Please make a selection.")) {
        var fullscreenForm = document.getElementById("fullscreen-form");

        fullscreenForm.classList.remove("active");
        fullscreenForm.classList.add("mini");

        const counters = document.querySelectorAll("[id^='counter']");
        counters.forEach(counter => {
            counter.classList.add("hidden");
        });

        const containerheader = document.getElementById("container-header");
        containerheader.classList.add("hidden-imp");

        // Show all questions
        const quizForms = document.querySelectorAll("[id^='quizForm']");
        for (let i = 0; i < quizForms.length; i++) {
            quizForms[i].style.display = "block";
            quizForms[i].style.border = "none";

            if (i !== quizForms.length - 1) {
                var hrElement = document.getElementById('hr-element' + (i + 1));
                hrElement.classList.remove("hidden");
            }
        }

        //hide buttons
        var startButton = document.getElementById("start-button");
        startButton.classList.add("hidden");

        var finishButton = document.getElementById("finish-button");
        finishButton.classList.add("hidden");

        var closeButton = document.getElementById("close-button");
        closeButton.classList.add("hidden");

        var submitButtons = document.getElementsByClassName("submit-button");

        for (var i = 0; i < submitButtons.length; i++) {
            var submitButton = submitButtons[i];
            submitButton.classList.add("hidden");
        }

        //hide title
        var quizTitles = document.getElementsByClassName("quiz-title");

        for (var i = 0; i < quizTitles.length; i++) {
            var quizTitle = quizTitles[i];
            quizTitle.classList.add("hidden");
        }

        //hide the next buttons
        var nextButtons = document.getElementsByClassName("next-button");

        for (var i = 0; i < nextButtons.length; i++) {
            var nextButton = nextButtons[i];
            nextButton.classList.add("hidden");
        }

        // Get the radio buttons and checkboxes
        const radioButtons = document.querySelectorAll('input[type="radio"]');
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');

        // Disable the radio buttons
        radioButtons.forEach((radioButton) => {
            radioButton.disabled = true;
        });

        // Disable the checkboxes
        checkboxes.forEach((checkbox) => {
            checkbox.disabled = true;
        });

        //reset button
        const resetButton = document.getElementById("reset-button");
        resetButton.classList.remove("hidden");

    }
    else {
        var fullscreenForms = document.getElementById("fullscreen-form");

        fullscreenForms.classList.remove("active");
        fullscreenForms.classList.remove("mini");
        fullscreenForms.classList.add("hidden");
        const containerheader = document.getElementById("container-header");
        containerheader.classList.remove("hidden-imp");

        //hide the next buttons
        var nextButtons = document.getElementsByClassName("next-button");

        for (var i = 0; i < nextButtons.length; i++) {
            var nextButton = nextButtons[i];
            nextButton.classList.add("hidden");
        }
    }
}

function parse_and_generate_form(fileName) {

    const doc = document.getElementById("fullscreen-form");

    //add reset quiz option
    const resetButton = document.createElement('button');
    resetButton.type = "button";
    resetButton.id = "reset-button";
    resetButton.innerHTML = "Reset Quiz";
    resetButton.classList.add("reset-button");
    resetButton.classList.add("hidden");
    resetButton.addEventListener("click", () => resetQuiz(fileName));
    doc.appendChild(resetButton);

    const questions = parsedObject.questions;

    const questionNumberElement = document.getElementById("question-number");
    if (questions.length === 1) {
        questionNumberElement.innerHTML = questions.length + " Question";
    }
    else if (questions.length > 1) {
        questionNumberElement.innerHTML = questions.length + " Questions";
    }

    for (let i = 0; i < questions.length; i++) {
        let question = questions[i].prompt;
        const choices = questions[i].distractors;
        const codeSnippet = questions[i].codeSnippet;
        const answer = questions[i].answer;
        const hint = questions[i].explainations;

        var isSingleCorrect = false;
        if (answer.length == 1) {
            isSingleCorrect = true;
        }

        //generate the quiz form in HTML
        const form = document.createElement("form");
        form.id = "quizForm" + (i + 1);
        form.classList.add("quiz-form");

        // Create the container div
        const container = document.createElement("div");
        container.classList.add("header");

        // Create the quiz title
        const title = document.createElement("h3");
        title.innerHTML = "Quiz";
        title.classList.add("quiz-title");
        title.id = "quiz-title";
        title.style.fontWeight = "bold";

        // Create the counter
        const counter = document.createElement("p");
        counter.innerHTML = "Question " + (i + 1) + " / " + questions.length;
        counter.id = "counter" + (i + 1);
        counter.style.textAlign = "right";
        counter.classList.remove("hidden");

        // Append the title and counter to the container div
        container.appendChild(title);
        container.appendChild(counter);

        // Append the container div to the form
        form.appendChild(container);

        //add question text
        // Create a container element for the question
        let questionElement = document.createElement("div");
        questionElement.id = "question" + (i + 1);
        questionElement.classList.add("question-box");

        const questionTitle = document.createElement("h4");
        questionTitle.innerHTML = "Question " + (i + 1);

        const regexTripleBackticks = /```([\s\S]*?)```/g;
        const regexSingleBacktick = /`([^`]+)`(?!`)/g;

        let matches;
        let lastIndex = 0;

        while ((matches = regexTripleBackticks.exec(question))) {
            const questionSnippet = question.substring(lastIndex, matches.index);

            // Add the text between code snippets to the question element
            let questionSnippetText = document.createElement("p");
            questionSnippetText.innerHTML = questionSnippet;

            questionElement.appendChild(questionSnippetText);

            // Extract and format the code snippet
            const codeSnippet = matches[1].trim();
            QcodeSnippetFormatting(codeSnippet, questionElement, true);

            lastIndex = regexTripleBackticks.lastIndex;
        }

        // Process single backticks outside the while loop
        const remainingQuestionText = question.substring(lastIndex);

        let remainingQuestionTextElement = document.createElement("p");
        remainingQuestionTextElement.innerHTML = remainingQuestionText;
        questionElement.appendChild(remainingQuestionTextElement);

        // Find and format single backticks
        const singleBacktickMatches = question.match(regexSingleBacktick);
        if (singleBacktickMatches) {
            for (let j = 0; j < singleBacktickMatches.length; j++) {
                const match = singleBacktickMatches[j];
                const codeSnippet = match.slice(1, -1).trim();

                // Create a new <code> element
                const codeSnippetElement = document.createElement("code");
                codeSnippetElement.classList.add("code-snippet-single");
                codeSnippetElement.textContent = codeSnippet;

                questionElement.innerHTML = questionElement.innerHTML.replace(match, codeSnippetElement.outerHTML);
            }
        }

        form.appendChild(questionElement);

        //add choices
        const choicesElement = document.createElement("div");
        choicesElement.id = "choices" + (i + 1);
        form.appendChild(choicesElement);

        //add submit button
        const submitButton = document.createElement("button");
        submitButton.type = "button";
        submitButton.id = "submit-button" + (i + 1);
        submitButton.innerHTML = "Submit";
        submitButton.classList.add("submit-button");
        submitButton.addEventListener("click", function () {
            handle_submission(form.id, answer, hint, fileName);
        });
        form.appendChild(submitButton);

        //add text for after submission
        const messageElement = document.createElement("p");
        messageElement.id = "message" + (i + 1);
        form.appendChild(messageElement);

        //create hr element
        var hrElement = document.createElement('hr');
        hrElement.id = "hr-element" + (i + 1);
        hrElement.style.borderColor = "darkgrey";
        hrElement.classList.add("hidden");
        form.appendChild(hrElement);

        //format code snippet in explainations
        for (let i = 0; i < hint.length; i++) {
            const currentHint = hint[i];
            const codeSnippetMatches = currentHint.match(regexSingleBacktick);
            if (codeSnippetMatches) {
                for (let j = 0; j < codeSnippetMatches.length; j++) {
                    const match = codeSnippetMatches[j];
                    const hintCodeSnippet = match.slice(1, -1).trim();

                    // Create a new <code> element
                    const codeSnippetElement = document.createElement("code");
                    codeSnippetElement.classList.add("code-snippet-single");
                    codeSnippetElement.textContent = hintCodeSnippet;

                    hint[i] = hint[i].replace(match, codeSnippetElement.outerHTML);
                }
            }
        }

        // Add next button
        if ((i + 1) !== questions.length) {
            const nextButton = document.createElement("button");
            nextButton.type = "button";
            nextButton.id = "next-button" + (i + 1);
            nextButton.innerHTML = "Next";
            nextButton.classList.add("next-button");
            nextButton.classList.add("hidden");
            nextButton.addEventListener("click", showNextQuestion);
            form.appendChild(nextButton);
        }
        else {
            //create finish button
            const finishButton = document.createElement('button');
            finishButton.type = "button";
            finishButton.id = "finish-button";
            finishButton.innerHTML = "Finish";
            finishButton.addEventListener("click", closeFullscreenForm);
            form.appendChild(finishButton);
            finishButton.classList.add("hidden");
        }

        document.getElementById("fullscreen-form").appendChild(form);

        if (answer.length === 1) {
            // Create a radio button choices
            for (let j = 0; j < choices.length; j++) {
                let choice = choices[j];

                //format code snippet in single ticks
                const codeSnippetMatches = choice.match(regexSingleBacktick);
                if (codeSnippetMatches) {
                    for (let j = 0; j < codeSnippetMatches.length; j++) {
                        const match = codeSnippetMatches[j];
                        const ansCodeSnippet = match.slice(1, -1).trim();

                        // Create a new <code> element
                        const codeSnippetElement = document.createElement("code");
                        codeSnippetElement.classList.add("code-snippet-single");
                        codeSnippetElement.textContent = ansCodeSnippet;

                        choice = choice.replace(match, codeSnippetElement.outerHTML);
                    }
                }

                //extract code snippet if available
                const regexTripleBackticksAns = /```([\s\S]*?)```/;
                const match_answer = choice.match(regexTripleBackticksAns);
                let answerCodeSnippet = '';

                if (match_answer) {
                    answerCodeSnippet = match_answer[1].trim();
                    choice = choice.replace(match_answer[0], '');
                }

                // Create a container div
                const choiceContainer = document.createElement("div");
                choiceContainer.classList.add("choicesContainer");

                // Create the radio button
                const radioButton = document.createElement("input");
                radioButton.type = "radio";
                radioButton.name = "choice" + (i + 1);
                radioButton.value = choice;
                radioButton.id = "choice" + (i + 1) + "-" + (j + 1);

                // Create the label
                const label = document.createElement("label");
                label.innerHTML = String.fromCharCode(65 + j) + ") " + choice.replace(/\n/g, "<br>");
                label.setAttribute("for", "choice" + (i + 1) + "-" + (j + 1));

                // Append the radio button and label to the container div
                choiceContainer.appendChild(radioButton);
                choiceContainer.appendChild(label);
                if (answerCodeSnippet) {
                    label.innerHTML = String.fromCharCode(65 + j) + ") ";
                    choiceContainer.appendChild(label);
                    AcodeSnippetFormatting(answerCodeSnippet, choiceContainer, radioButton);
                }

                // Append the container div to the choices element
                choicesElement.appendChild(choiceContainer);
                choicesElement.appendChild(document.createElement("br"));
            }

        }

        else {
            // Create checkbox choices
            for (let j = 0; j < choices.length; j++) {
                let choice = choices[j];

                //format code snippet in single ticks
                const codeSnippetMatches = choice.match(regexSingleBacktick);
                if (codeSnippetMatches) {
                    for (let j = 0; j < codeSnippetMatches.length; j++) {
                        const match = codeSnippetMatches[j];
                        const ansCodeSnippet = match.slice(1, -1).trim();

                        // Create a new <code> element
                        const codeSnippetElement = document.createElement("code");
                        codeSnippetElement.classList.add("code-snippet-single");
                        codeSnippetElement.textContent = ansCodeSnippet;

                        choice = choice.replace(match, codeSnippetElement.outerHTML);
                    }
                }

                //extract code snippet if available
                const regexTripleBackticksAns = /```([\s\S]*?)```/;
                const match_answer = choice.match(regexTripleBackticksAns);
                let answerCodeSnippet = '';

                if (match_answer) {
                    answerCodeSnippet = match_answer[1].trim();
                    choice = choice.replace(match_answer[0], '');
                }

                // Create a container div
                const choiceContainer = document.createElement("div");
                choiceContainer.classList.add("choicesContainer");

                // Create the checkbox
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.name = "choice" + (i + 1);
                checkbox.value = choice;
                checkbox.id = "choice" + (i + 1) + "-" + (j + 1);

                // Create the label
                const label = document.createElement("label");
                label.innerHTML = String.fromCharCode(65 + j) + ") " + choice.replace(/\n/g, "<br>");
                label.setAttribute("for", "choice" + (i + 1) + "-" + (j + 1));

                // Append the checkbox and label to the container div
                choiceContainer.appendChild(checkbox);
                choiceContainer.appendChild(label);
                if (answerCodeSnippet) {
                    label.innerHTML = String.fromCharCode(65 + j) + ") ";
                    choiceContainer.appendChild(label);
                    AcodeSnippetFormatting(answerCodeSnippet, choiceContainer, checkbox);
                }

                // Append the container div to the choices element
                choicesElement.appendChild(choiceContainer);
                choicesElement.appendChild(document.createElement("br"));
            }
        }

        if (i > 0) {
            form.style.display = "none";
        }

        // Check if there are stored values for the current form
        const selectedIndices = JSON.parse(localStorage.getItem(fileName + "quizForm" + (i + 1)));
        if (selectedIndices && selectedIndices.length !== 0) {
            const choiceInputs = selectedIndices.map(index => document.getElementById("choice" + (i + 1) + "-" + (index + 1)));
            choiceInputs.forEach(choiceInput => {
                choiceInput.checked = true;
            });

            //const explainIndex = selectedIndices[0]; // Get the first selected index
            const isCorrect = answer.length === selectedIndices.length &&
                answer.every(correctIndex => selectedIndices.includes(correctIndex));

            updateMessageElement(messageElement, isCorrect, hint, selectedIndices, answer, isSingleCorrect);
        }
    }

    closeFullscreenForm();
}

function handle_submission(formId, answer, hint, filename) {

    var isSingleCorrect = false;
    if (answer.length == 1) {
        isSingleCorrect = true;
    }

    const formNumber = formId.replace("quizForm", "");
    const form = document.getElementById(formId);
    const selectedChoices = form.querySelectorAll("input[name='choice" + formId.slice(8) + "']:checked");

    const messageElement = form.querySelector("#message" + formId.slice(8));

    let selectedIndices = [];

    if (selectedChoices.length > 0) {
        selectedIndices = Array.from(selectedChoices).map(choice => parseInt(choice.id.split('-')[1] - 1, 10));
        const isCorrect = answer.length === selectedIndices.length &&
            answer.every(correctIndex => selectedIndices.includes(correctIndex));

        updateMessageElement(messageElement, isCorrect, hint, selectedIndices, answer, isSingleCorrect);
    } else {
        messageElement.innerHTML = "Please make a selection.";
        messageElement.style.color = "red";
        messageElement.style.fontWeight = "bold";
    }

    if (messageElement.textContent !== "Please make a selection.") {
        const nextButton = document.getElementById("next-button" + formNumber);
        const finishButton = document.getElementById("finish-button");
        if (nextButton) {
            nextButton.classList.remove("hidden");
        }
        else if (finishButton) {
            finishButton.classList.remove("hidden");
        }
    }

    // Store the user's answer in local storage
    const key = filename + formId;
    localStorage.setItem(key, JSON.stringify(selectedIndices));
}


function showNextQuestion() {
    const quizForms = document.querySelectorAll("[id^='quizForm']");
    const currentForm = quizForms[currentQuestionIndex];
    currentForm.style.display = "none";

    currentQuestionIndex++;

    var submitButton = document.getElementById("submit-button" + (parseInt(currentQuestionIndex, 10) + 1));
    submitButton.classList.remove("hidden");

    if (currentQuestionIndex < quizForms.length) {
        const nextForm = quizForms[currentQuestionIndex];
        nextForm.style.display = "block";
    }

    const nextButton = document.getElementById("next-button" + currentQuestionIndex);

    if (currentQuestionIndex === quizForms.length - 1) {
        nextButton.classList.add("hidden");
    } else {
        nextButton.classList.remove("hidden");
    }
}


function QcodeSnippetFormatting(codeSnippet, questionElement, useLineNumbers) {
    const codeSnippetContainer = document.createElement("pre");
    codeSnippetContainer.classList.add("code-snippet");

    const codeSnippetLinesContainer = document.createElement("div");

    const codeSnippetLines = codeSnippet.trim().split("\n");
    for (let j = 0; j < codeSnippetLines.length; j++) {
        const codeLineContainer = document.createElement("div");

        if (useLineNumbers) {
            const lineNumberElement = document.createElement("span");
            lineNumberElement.classList.add("line-number");
            lineNumberElement.textContent = j + 1;
            codeLineContainer.appendChild(lineNumberElement);
        }

        const codeLineElement = document.createElement("span");
        codeLineElement.textContent = codeSnippetLines[j];
        codeLineContainer.appendChild(codeLineElement);

        codeSnippetLinesContainer.appendChild(codeLineContainer);
    }

    codeSnippetContainer.appendChild(codeSnippetLinesContainer);
    questionElement.appendChild(codeSnippetContainer);
}


function AcodeSnippetFormatting(codeSnippet, choiceContainer, button) {
    const codeSnippetContainer = document.createElement("pre");
    codeSnippetContainer.classList.add("code-snippet");

    const codeSnippetLinesContainer = document.createElement("div");

    const codeSnippetLines = codeSnippet.trim().split("\n");
    for (let j = 0; j < codeSnippetLines.length; j++) {
        const codeLineContainer = document.createElement("div");

        const lineNumberElement = document.createElement("span");
        lineNumberElement.classList.add("line-number");
        lineNumberElement.textContent = j + 1;
        codeLineContainer.appendChild(lineNumberElement);

        const codeLineElement = document.createElement("span");
        codeLineElement.textContent = codeSnippetLines[j];
        codeLineContainer.appendChild(codeLineElement);

        codeSnippetLinesContainer.appendChild(codeLineContainer);
    }

    codeSnippetContainer.appendChild(codeSnippetLinesContainer);
    choiceContainer.appendChild(codeSnippetContainer);

    codeSnippetContainer.addEventListener("click", function () {
        button.checked = true;
    });
}


function updateMessageElement(messageElement, isCorrect, hint, selectedIndices, answer, isSingleCorrect) {
    let message = "";
    if (isCorrect) {
        if (selectedIndices.length > 0) {
            let explanations;
            if (isSingleCorrect) {
                explanations = hint[selectedIndices[0]];
            } else {
                explanations = selectedIndices.map(index => hint[index]).join("<br><br>");
            }
            messageElement.innerHTML = "Correct! <span class='hint-text'>" + explanations.replace(/\n/g, "<br>") + "</span>";
            messageElement.style.color = "green";
            messageElement.style.fontWeight = "bold";
        }
    } else {
        const correctIndices = answer.filter(index => selectedIndices.includes(index));
        const correctExplanations = correctIndices.map(index => hint[index]).join("<br><br>");
        const incorrectExplanations = selectedIndices
            .filter(index => !correctIndices.includes(index))
            .map(index => hint[index])
            .join("<br><br>");


        if (correctExplanations.length > 0 && !incorrectExplanations) {
            if (correctIndices.length !== answer.length) {
                message += "<span style='color: blue;'>There are more correct choices.<br></span>";
                message += "<span class='hint-text'>" + correctExplanations.replace(/\n/g, "<br>") + "</span><br>";
            }
        }
        else if (incorrectExplanations) {
            message += "<span style='color: red;'>Incorrect!</span> <span class='hint-text'>" + incorrectExplanations.replace(/\n/g, "<br>") + "<br><br>" + correctExplanations.replace(/\n/g, "<br>") + "</span>";
        }
        messageElement.innerHTML = message;
        messageElement.style.fontWeight = "bold";
    }

}



function resetQuiz(fileName) {
    const header = document.getElementById("container-header");
    header.classList.remove("hidden-imp");

    var startButton = document.getElementById("start-button");
    startButton.classList.remove("hidden");

    //clear local storage answers
    const prefix = fileName;

    for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);

        if (key && key.startsWith(prefix)) {
            localStorage.removeItem(key);
        }
    }

    const quizForms = document.querySelectorAll("[id^='quizForm']");

    for (let i = 0; i < quizForms.length; i++) {
        quizForms[i].style.display = "none";
    }

    const resetButton = document.getElementById("reset-button");
    resetButton.classList.add("hidden");

    const counters = document.querySelectorAll("[id^='counter']");
    counters.forEach(counter => {
        counter.classList.remove("hidden");
    });

    //add title
    var quizTitles = document.getElementsByClassName("quiz-title");

    for (var i = 0; i < quizTitles.length; i++) {
        var quizTitle = quizTitles[i];
        quizTitle.classList.remove("hidden");
    }

}