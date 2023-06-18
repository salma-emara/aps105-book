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

    for (let i = 0; i < questions.length; i++) {
        const question = questions[i].question;
        const choices = questions[i].choices;
        const answer = questions[i].answer;
        const hint = questions[i].hint;

        //generate the quiz form in HTML
        const form = document.createElement("form");
        form.id = "quizForm" + (i + 1);

        //add question text
        const questionElement = document.createElement("h3");
        questionElement.id = "question" + (i + 1);
        questionElement.innerHTML = question;
        form.appendChild(questionElement);


        //add choices
        const choicesElement = document.createElement("div");
        choicesElement.id = "choices" + (i + 1);
        form.appendChild(choicesElement);

        //add submit button
        const submitButton = document.createElement("button");
        submitButton.type = "button";
        submitButton.innerHTML = "Submit";
        submitButton.addEventListener("click", function () {
            handle_submission(form.id, answer, hint);
        });
        form.appendChild(submitButton);

        //add text for after submission
        const messageElement = document.createElement("p");
        messageElement.id = "message" + (i + 1);
        form.appendChild(messageElement);

        document.getElementById("fullscreen-form").appendChild(form);

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

        if (i > 0) {
            form.style.display = "none";
        }
    }

}


function handle_submission(formId, answer, hint) {
    const form = document.getElementById(formId);
    const selectedChoice = form.querySelector("input[name='choice" + formId.slice(8) + "']:checked");


    const messageElement = form.querySelector("#message" + formId.slice(8));

    if (selectedChoice) {
        if (answer.trim() === selectedChoice.value) {
            messageElement.innerHTML = "Correct answer!";
            messageElement.style.color = "green";
        } else {
            messageElement.innerHTML = "Wrong answer" + hint;
            messageElement.style.color = "red";
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

    const nextForm = quizForms[currentQuestionIndex];
    nextForm.style.display = "block";

    const nextButton = document.getElementById("next-button");

    if (currentQuestionIndex === quizForms.length - 1) {
        nextButton.classList.add("hidden");
    } else {
        nextButton.classList.remove("hidden");
    }
}

