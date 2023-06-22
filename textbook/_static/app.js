let currentQuestionIndex = 0;

function startQuiz() {
    currentQuestionIndex = 0;

    const quizForms = document.querySelectorAll("[id^='quizForm']");
    const currentForm = quizForms[currentQuestionIndex];
    currentForm.style.display = "block";

    var fullscreenForm = document.getElementById("fullscreen-form");
    fullscreenForm.classList.add("active");

    const nextButton = document.getElementById("next-button");
    nextButton.classList.remove("hidden");

    if (quizForms.length === 1) {
        nextButton.classList.add("hidden");
    }
}

function closeFullscreenForm() {
    var fullscreenForm = document.getElementById("fullscreen-form");
    fullscreenForm.classList.remove("active");
    fullscreenForm.classList.add("mini");

    // Show all questions
    const quizForms = document.querySelectorAll("[id^='quizForm']");
    for (let i = 0; i < quizForms.length; i++) {
        quizForms[i].style.display = "block";
        quizForms[i].style.border = "none";
    }

    var closeButton = document.getElementById("close-button");
    closeButton.classList.add("hidden");

    var startButton = document.getElementById("start-button");
    startButton.classList.add("hidden");

    var nextButton = document.getElementById("next-button");
    nextButton.classList.add("hidden");
}


function parse_and_generate_form(fileName) {

    const questions = parsedObject.questions;
    //const quizContainer = document.getElementById("quiz-container");

    for (let i = 0; i < questions.length; i++) {
        const question = questions[i].question;
        const choices = questions[i].choices;
        const codeSnippet = questions[i].codeSnippet;
        const answer = questions[i].answer;
        const hint = questions[i].hint;

        //generate the quiz form in HTML
        const form = document.createElement("form");
        form.id = "quizForm" + (i + 1);
        form.classList.add("quiz-form");

        //add question text
        const questionElement = document.createElement("p");
        questionElement.id = "question" + (i + 1);
        questionElement.innerHTML = question;
        questionElement.classList.add("question-box");
        form.appendChild(questionElement);

        // Add code snippet if available
        if (codeSnippet) {
            const codeSnippetContainer = document.createElement("pre");
            codeSnippetContainer.classList.add("code-snippet");

            const codeSnippetLinesContainer = document.createElement("div");
            codeSnippetLinesContainer.classList.add("code-lines");

            const codeSnippetLines = codeSnippet.trim().split("\n");
            for (let j = 0; j < codeSnippetLines.length; j++) {
                const codeLineContainer = document.createElement("div");
                codeLineContainer.classList.add("code-line-container");

                const lineNumberElement = document.createElement("span");
                lineNumberElement.classList.add("line-number");
                lineNumberElement.textContent = j + 1;
                codeLineContainer.appendChild(lineNumberElement);

                const codeLineElement = document.createElement("span");
                codeLineElement.classList.add("code-line");
                codeLineElement.textContent = codeSnippetLines[j];
                codeLineContainer.appendChild(codeLineElement);

                codeSnippetLinesContainer.appendChild(codeLineContainer);
            }

            codeSnippetContainer.appendChild(codeSnippetLinesContainer);
            questionElement.appendChild(codeSnippetContainer);
        }

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

        // Add next button
        const nextButton = document.createElement("button");
        nextButton.type = "button";
        nextButton.innerHTML = "Next";
        nextButton.classList.add("next-button");
        nextButton.addEventListener("click", showNextQuestion);
        form.appendChild(nextButton);

        //add text for after submission
        const messageElement = document.createElement("p");
        messageElement.id = "message" + (i + 1);
        form.appendChild(messageElement);

        document.getElementById("fullscreen-form").appendChild(form);

        console.log(answer.length);
        if (answer.length === 1) {
            // Create a radio button choices
            for (let j = 0; j < choices.length; j++) {

                const choice = choices[j];

                //create radio buttons
                const radioButton = document.createElement("input");
                radioButton.type = "radio";
                radioButton.name = "choice" + (i + 1);
                radioButton.value = choice;
                radioButton.id = "choice" + (i + 1) + "-" + (j + 1);

                //add labels
                const label = document.createElement("label");
                label.textContent = choice;
                label.setAttribute("for", "choice" + (i + 1) + "-" + (j + 1));
                const space = document.createElement("span");
                space.innerHTML = "&nbsp;";

                //append the buttons to Choices element
                choicesElement.appendChild(radioButton);
                choicesElement.appendChild(space);
                choicesElement.appendChild(label);
                choicesElement.appendChild(document.createElement("br"));
            }
        }

        else {
            // Create checkbox choices
            for (let j = 0; j < choices.length; j++) {
                const choice = choices[j];

                // Create checkboxes
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.name = "choice" + (i + 1);
                checkbox.value = choice;
                checkbox.id = "choice" + (i + 1) + "-" + (j + 1);

                // Add labels
                const label = document.createElement("label");
                label.textContent = choice;
                label.setAttribute("for", "choice" + (i + 1) + "-" + (j + 1));
                const space = document.createElement("span");
                space.innerHTML = "&nbsp;";

                // Append the checkboxes to the choices element
                choicesElement.appendChild(checkbox);
                choicesElement.appendChild(space);
                choicesElement.appendChild(label);
                choicesElement.appendChild(document.createElement("br"));
            }

        }


        if (i > 0) {
            form.style.display = "none";
        }
    }

}


function handle_submission(formId, answer, hint) {
    const form = document.getElementById(formId);
    const selectedChoices = form.querySelectorAll("input[name='choice" + formId.slice(8) + "']:checked");

    const messageElement = form.querySelector("#message" + formId.slice(8));

    if (selectedChoices.length > 0) {
        // Convert selected choices to an array of their values
        const selectedValues = Array.from(selectedChoices).map(choice => choice.value);

        if (Array.isArray(answer)) {
            // Check if all selected values are present in the answer array
            const isCorrect = selectedValues.every(value => answer.includes(value));

            if (isCorrect) {
                messageElement.innerHTML = "Correct answer!";
                messageElement.style.color = "green";
            } else {
                messageElement.innerHTML = "Wrong answer" + hint;
                messageElement.style.color = "red";
            }
        } else {
            // Handle case when answer is a single value
            if (selectedValues.includes(answer)) {
                messageElement.innerHTML = "Correct answer!";
                messageElement.style.color = "green";
            } else {
                messageElement.innerHTML = "Wrong answer" + hint;
                messageElement.style.color = "red";
            }
        }
    } else {
        messageElement.innerHTML = "Please select";
        messageElement.style.color = "red";
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

    const nextButton = document.getElementById("next-button");

    if (currentQuestionIndex === quizForms.length - 1) {
        nextButton.classList.add("hidden");
    } else {
        nextButton.classList.remove("hidden");
    }
}


