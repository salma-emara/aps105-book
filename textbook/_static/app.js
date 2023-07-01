let currentQuestionIndex = 0;

function startQuiz() {

    currentQuestionIndex = 0;

    const quizForms = document.querySelectorAll("[id^='quizForm']");

    for (let i = 1; i < quizForms.length; i++) {
        quizForms[i].style.display = "none";
    }

    const currentForm = quizForms[currentQuestionIndex];
    currentForm.style.display = "block";

    var fullscreenForm = document.getElementById("fullscreen-form");
    fullscreenForm.classList.add("active");

    const containerheader = document.getElementById("container-header");
    containerheader.classList.add("hidden");

    if (quizForms.length === 1) {
        nextButton.classList.add("hidden");
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
        containerheader.classList.add("hidden");

        // Show all questions
        const quizForms = document.querySelectorAll("[id^='quizForm']");
        for (let i = 0; i < quizForms.length; i++) {
            quizForms[i].style.display = "block";
            quizForms[i].style.border = "none";

            if (i !== quizForms.length - 1) {
                var hrElement = document.createElement('hr');
                hrElement.style.borderColor = "darkgrey";
                quizForms[i].appendChild(hrElement);
            }
        }

        var startButton = document.getElementById("start-button");
        startButton.classList.add("hidden");

        var closeButton = document.getElementById("close-button");
        closeButton.classList.add("hidden");

        var submitButtons = document.getElementsByClassName("submit-button");

        for (var i = 0; i < submitButtons.length; i++) {
            var submitButton = submitButtons[i];
            submitButton.classList.add("hidden");
        }

        var quizTitles = document.getElementsByClassName("quiz-title");

        for (var i = 0; i < quizTitles.length; i++) {
            var quizTitle = quizTitles[i];
            quizTitle.classList.add("hidden");
        }

        var nextButtons = document.getElementsByClassName("next-button");

        for (var i = 0; i < nextButtons.length; i++) {
            var nextButton = nextButtons[i];
            nextButton.classList.add("hidden");
        }
    }
    else {
        var fullscreenForms = document.getElementById("fullscreen-form");

        fullscreenForms.classList.remove("active");
        fullscreenForms.classList.remove("mini");
        fullscreenForms.classList.add("hidden");
        const containerheader = document.getElementById("container-header");
        containerheader.classList.remove("hidden");
    }
}

function parse_and_generate_form(fileName) {

    const doc = document.getElementById("fullscreen-form");

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
            questionCodeSnippet = match[1].trim();
            question = question.replace(match[1], '');
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
        submitButton.innerHTML = "Submit";
        submitButton.classList.add("submit-button");
        submitButton.addEventListener("click", function () {
            handle_submission(form.id, answer, hint);
        });
        form.appendChild(submitButton);

        //add text for after submission
        const messageElement = document.createElement("p");
        messageElement.id = "message" + (i + 1);
        form.appendChild(messageElement);

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
                    //radioButton.value = choice + answerCodeSnippet;
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
    }
}

function handle_submission(formId, answer, hint) {
    const formNumber = formId.replace("quizForm", "");
    const form = document.getElementById(formId);
    const selectedChoices = form.querySelectorAll("input[name='choice" + formId.slice(8) + "']:checked");

    const messageElement = form.querySelector("#message" + formId.slice(8));

    if (selectedChoices.length > 0) {
        const selectedIndices = Array.from(selectedChoices).map(choice => parseInt(choice.id.split('-')[1] - 1, 10));
        const isCorrect = answer.some(correctIndex => selectedIndices.includes(correctIndex));
        const explainIndex = selectedIndices[0];

        if (isCorrect) {
            messageElement.innerHTML = "Correct! <span class='hint-text'>" + hint[explainIndex].replace(/\n/g, "<br>"); + "</span>";
            messageElement.style.color = "green";
            messageElement.style.fontWeight = "bold";
        } else {
            messageElement.innerHTML = "Inorrect! <span class='hint-text'>" + hint[explainIndex].replace(/\n/g, "<br>"); + "</span>";
            messageElement.style.color = "red";
            messageElement.style.fontWeight = "bold";
        }
    } else {
        messageElement.innerHTML = "Please make a selection.";
        messageElement.style.color = "red";
        messageElement.style.fontWeight = "bold";
    }

    if (messageElement.textContent !== "Please make a selection.") {
        const nextButton = document.getElementById("next-button" + formNumber);
        nextButton.classList.remove("hidden");
    }
}


function showNextQuestion() {
    const quizForms = document.querySelectorAll("[id^='quizForm']");
    const currentForm = quizForms[currentQuestionIndex];
    currentForm.style.display = "none";

    currentQuestionIndex++;

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
