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
        nextButton.classList.add("hidden");
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
    questionNumberElement.innerHTML = questions.length + " Questions";

    for (let i = 0; i < questions.length; i++) {
        let question = questions[i].prompt;
        const choices = questions[i].distractors;
        const codeSnippet = questions[i].codeSnippet;
        const answer = questions[i].answer;
        const hint = questions[i].explainations;

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
        counter.style.textAlign = "right";

        // Append the title and counter to the container div
        container.appendChild(title);
        container.appendChild(counter);

        // Append the container div to the form
        form.appendChild(container);

        //add question text
        let questionElement = document.createElement("div");
        questionElement.id = "question" + (i + 1);
        questionElement.classList.add("question-box");

        const questionTitle = document.createElement("h4");
        questionTitle.innerHTML = "Question " + (i + 1);

        let questionText = document.createElement("p");
        questionText.innerHTML = question;

        //extract question code snippet if available
        const regexTripleBackticks = /```([\s\S]*?)```/;
        const regexSingleBacktick = /`([\s\S]*?)`/g;

        let match = question.match(regexTripleBackticks);
        let questionCodeSnippet = '';

        questionElement.appendChild(questionTitle);

        if (match) {
            questionCodeSnippet = match[0].trim();
            question = question.replace(match[0], '');
            questionText.innerHTML = question;
            questionElement.appendChild(questionText);
            QcodeSnippetFormatting(questionCodeSnippet, questionElement, true);
        } else {
            codeSnippetMatches = question.match(regexSingleBacktick);
            if (codeSnippetMatches) {
                for (let j = 0; j < codeSnippetMatches.length; j++) {
                    const match = codeSnippetMatches[j];
                    questionText.innerHTML = question;
                    const questionCodeSnippet = match.slice(1, -1).trim();

                    // Create a new <code> element
                    const codeSnippetElement = document.createElement("code");
                    codeSnippetElement.classList.add("code-snippet-single");
                    codeSnippetElement.textContent = questionCodeSnippet;

                    question = question.replace(match, codeSnippetElement.outerHTML);
                }

                questionText.innerHTML = question;
            }

            questionElement.appendChild(questionText);
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

                //extract code snippet if available
                const match_answer = choice.match(regexTripleBackticks);
                let answerCodeSnippet = '';

                if (match_answer) {
                    answerCodeSnippet = match_answer[1].trim();
                    choice = choice.replace(match_answer[0], '');
                }

                // Create a container div
                const choiceContainer = document.createElement("div");
                choiceContainer.classList.add("label");

                // Create the radio button
                const radioButton = document.createElement("input");
                radioButton.type = "radio";
                radioButton.name = "choice" + (i + 1);
                radioButton.value = choice;
                radioButton.id = "choice" + (i + 1) + "-" + (j + 1);

                // Create the label
                const label = document.createElement("label");
                label.innerHTML = choice.replace(/\n/g, "<br>");
                label.setAttribute("for", "choice" + (i + 1) + "-" + (j + 1));

                // Append the radio button and label to the container div
                choiceContainer.appendChild(radioButton);
                if (answerCodeSnippet) {
                    AcodeSnippetFormatting(answerCodeSnippet, choiceContainer, radioButton);
                    label.innerHTML = '';
                }
                choiceContainer.appendChild(label);

                // Append the container div to the choices element
                choicesElement.appendChild(choiceContainer);
                choicesElement.appendChild(document.createElement("br"));
            }

        }

        else {
            // Create checkbox choices
            for (let j = 0; j < choices.length; j++) {
                let choice = choices[j];

                //extract code snippet if available
                const match_answer = choice.match(regexTripleBackticks);
                let answerCodeSnippet = '';

                if (match_answer) {
                    answerCodeSnippet = match_answer[1].trim();
                    choice = choice.replace(match_answer[0], '');
                }

                // Create a container div
                const choiceContainer = document.createElement("div");
                choiceContainer.classList.add("label");

                // Create the checkbox
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.name = "choice" + (i + 1);
                checkbox.value = choice;
                checkbox.id = "choice" + (i + 1) + "-" + (j + 1);

                // Create the label
                const label = document.createElement("label");
                label.innerHTML = choice.replace(/\n/g, "<br>");
                label.setAttribute("for", "choice" + (i + 1) + "-" + (j + 1));

                if (answerCodeSnippet) {
                    AcodeSnippetFormatting(answerCodeSnippet, choiceContainer, checkbox);
                    label.innerHTML = '';
                }

                // Append the checkbox and label to the container div
                choiceContainer.appendChild(checkbox);
                choiceContainer.appendChild(label);

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

            const explainIndex = selectedIndices[0]; // Get the first selected index
            const isCorrect = answer.every(correctIndex => selectedIndices.includes(correctIndex));

            updateMessageElement(messageElement, isCorrect, hint, explainIndex);
        }
    }

    closeFullscreenForm();
}

function handle_submission(formId, answer, hint, filename) {
    const formNumber = formId.replace("quizForm", "");
    const form = document.getElementById(formId);
    const selectedChoices = form.querySelectorAll("input[name='choice" + formId.slice(8) + "']:checked");

    const messageElement = form.querySelector("#message" + formId.slice(8));

    let selectedIndices = [];

    if (selectedChoices.length > 0) {
        selectedIndices = Array.from(selectedChoices).map(choice => parseInt(choice.id.split('-')[1] - 1, 10));
        const isCorrect = answer.every(correctIndex => selectedIndices.includes(correctIndex));
        explainIndex = selectedIndices[0];

        updateMessageElement(messageElement, isCorrect, hint, explainIndex);
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
    console.log("submit-button" + currentQuestionIndex + 1);
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


function updateMessageElement(messageElement, isCorrect, hint, explainIndex) {
    if (isCorrect) {
        messageElement.innerHTML = "Correct! <span class='hint-text'>" + hint[explainIndex].replace(/\n/g, "<br>") + "</span>";
        messageElement.style.color = "green";
        messageElement.style.fontWeight = "bold";
    } else {
        messageElement.innerHTML = "Incorrect! <span class='hint-text'>" + hint[explainIndex].replace(/\n/g, "<br>") + "</span>";
        messageElement.style.color = "red";
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

}