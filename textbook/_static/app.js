function startQuiz() {
    var fullscreenForm = document.getElementById("fullscreen-form");
    fullscreenForm.classList.add("active");
}



function closeFullscreenForm() {
    var fullscreenForm = document.getElementById("fullscreen-form");
    fullscreenForm.classList.remove("active");
    fullscreenForm.classList.add("mini");

    var closeButton = document.getElementById("close-button");
    closeButton.classList.add("hidden");

    var startButton = document.getElementById("start-button");
    startButton.classList.add("hidden");
}



function parse_and_generate_form(fileName) {
    const question = parsedObject.question;
    const choices = parsedObject.choices;

    //generate the quiz form in HTML
    const form = document.getElementById("quizForm");
    document.getElementById("question").innerHTML = question;
    const choicesElement = document.getElementById("choices");


    // Create a radio button choices
    for (let i = 0; i < choices.length; i++) {

        const choice = choices[i];

        //create radio buttons
        const radioButton = document.createElement("input");
        radioButton.type = "radio";
        radioButton.name = "choice";
        radioButton.value = choice;
        radioButton.id = "choice" + (i + 1);

        //add labels
        const label = document.createElement("label");
        label.textContent = choice;
        label.setAttribute("for", "choice" + (i + 1));
        const space = document.createElement("span");
        space.innerHTML = "&nbsp;";

        //append the buttons to Choices element
        choicesElement.appendChild(radioButton);
        choicesElement.appendChild(space);
        choicesElement.appendChild(label);
        choicesElement.appendChild(document.createElement("br"));
    }
}


function handle_submission() {
    const answer = parsedObject.answer;
    const hint = parsedObject.hint;
    const selectedChoice = document.querySelector("input[name='choice']:checked");


    if (selectedChoice) {
        if (answer.trim() === selectedChoice.value) {
            document.getElementById("message").innerHTML = "correct answer!";
        }
        else {
            document.getElementById("message").innerHTML = "wrong answer" + hint;
        }
    }
    else {
        document.getElementById("message").innerHTML = "please make a selection";
    }
}


//for (let i = 0; i < parsedObject.questions.length; i++)