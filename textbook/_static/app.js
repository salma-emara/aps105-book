let currentQuestionIndex = 0;

document.addEventListener("submit", function (e) {
    e.preventDefault(); 
  });

function startQuiz() {

    const filename = window.quizFilename || "unknown";

    const key = `startClickCount_${filename}`;
    let startClickCount = parseInt(localStorage.getItem(key) || "0");

    startClickCount++;
    localStorage.setItem(key, startClickCount);

    const userID = getOrCreateUserID();
    // Send event to Google Analytics
    gtag('event', 'start_quiz_click', {
        event_category: 'Quiz Interaction',
        event_label: `Start Button Clicked - ${filename}`,
        value: startClickCount,
        quiz_user_id: userID  
    });

    console.log(`Start button clicked ${startClickCount} times for ${filename}`);

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
    const radioButtons = document.querySelectorAll('input[type="radio"][id^="choice"]');
    const checkboxes = document.querySelectorAll('input[type="checkbox"][id^="choice"]');

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

window.addEventListener("load", () => {
    if (localStorage.getItem("formsLocked") === "true") {
        const quizForms = document.querySelectorAll("[id^='quizForm']");

        for (let i = 0; i < quizForms.length; i++) {
            const form = quizForms[i];
            
            // lock the user's code editor
            const textArea = form.querySelector("#codetorun .ace_text-input");
            if (textArea) textArea.setAttribute("readonly", "");
            const editorContainer = form.querySelector("#codetorun");
            if (editorContainer) editorContainer.style.backgroundColor = "var(--bg, #edebeb)";

            // locks input
            const inputArea = form.querySelector("#input_section > textarea");
            if (textArea) { 
                textArea.setAttribute("readonly", "");
                inputArea.style.backgroundColor = "var(--bg, #edebeb)";
            }        
        }
    }
  });

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
        const radioButtons = document.querySelectorAll('input[type="radio"][id^="choice"]');
        const checkboxes = document.querySelectorAll('input[type="checkbox"][id^="choice"]');


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

        for (let i = 0; i < quizForms.length; i++) {
            const form = quizForms[i];
            
            // lock the user's code editor
            const textArea = form.querySelector("#codetorun .ace_text-input");
            if (textArea) textArea.setAttribute("readonly", "");
            const editorContainer = form.querySelector("#codetorun");
            if (editorContainer) editorContainer.style.backgroundColor = "var(--bg, #edebeb)";

            // locks input
            const inputArea = form.querySelector("#input_section > textarea");
            if (inputArea) { 
                textArea.setAttribute("readonly", "");
                inputArea.style.backgroundColor = "var(--bg, #edebeb)";
            }

            const traceTextarea = form.querySelector(".trace-textarea");
            if (traceTextarea) {
                traceTextarea.style.backgroundColor = "#edebeb";
                traceTextarea.setAttribute("readonly", "");
            }
            
            localStorage.setItem("formsLocked", "true");
            
            localStorage.setItem("displayTestcases", "true");
        
        }
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

    window.addEventListener("load", () => {

        if (localStorage.getItem("displayTestcases") === "true" && localStorage.getItem("formsLocked") === "true"){

            const quizForms = document.querySelectorAll("[id^='quizForm']");
            for (let i = 0; i < quizForms.length; i++) {
                const formId = "quizForm" + (i + 1);
                const form = document.getElementById(formId);

                let savedData = JSON.parse(localStorage.getItem(fileName + formId + "_programming"));                
                if (savedData) displayTestcaseResults(form, savedData.inputArray, savedData.outputArray, savedData.actualOutput);

                savedData = JSON.parse(localStorage.getItem(fileName + "quizForm" + (i + 1) + "_tracing"));
                if (savedData) {

                    const messageElement = form.querySelector("#message" + (i + 1));
                    const traceTextarea = form.querySelector(".trace-textarea");

                    traceTextarea.value = savedData.userOutput;
                }
            }
        }

    });

    const doc = document.getElementById("fullscreen-form");

    //add reset quiz option
    const resetButton = document.createElement('button');
    resetButton.type = "button";
    resetButton.id = "reset-button";
    resetButton.innerHTML = "Reset Quiz";
    resetButton.classList.add("reset-quiz-button");
    resetButton.classList.add("hidden");
    resetButton.addEventListener("click", () => {
        resetQuiz(fileName);
    });
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

        let isProgrammingQuestion = questions[i].programming;
        let actualCode = "";
        let outputArray = [];
        let inputArray = [];

        let isTracingQuestion = questions[i].tracing;
        let answer = "";

        if (isProgrammingQuestion){
            
            let rawCode = questions[i].code || "";
            actualCode = rawCode
                .replace(/&#35;/g, '#')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/<br>/g, '\n')
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, '&');

            // Collect all testcases for this question
            const questionTestcases = questions[i].testcases;

            for (let j = 0; j < questionTestcases.length; j++) {
                inputArray.push(questionTestcases[j].input || []);
                outputArray.push(questionTestcases[j].output || []);
            } 

            console.log("Inputs:", inputArray);
            console.log("Outputs:", outputArray);
        } else if (isTracingQuestion){
            
            let rawCode = questions[i].code || "";
            actualCode = rawCode
                .replace(/&#35;/g, '#')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/<br>/g, '\n')
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, '&');

            answer = questions[i].answer || "";

            console.log(actualCode);
            console.log("Answer: ", answer);
        } else {
            answer = questions[i].answer || [];
        }

        const choices = questions[i].distractors;
        const hint = questions[i].explainations;

        var isSingleCorrect = false;
        if (!isTracingQuestion && answer.length == 1) {
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

        // code runner 
    
        // create pre class element 
        const pre = document.createElement("pre");
        pre.classList.add("code-runner-quizzes");
          
        // creating <code-runner language="c" output="Hello World!"> 
        const codeRunner = document.createElement("code-runner");

        codeRunner.setAttribute("language", "c");
        codeRunner.setAttribute("output", "");
        codeRunner.setAttribute("inputTestcase", "");
            
        codeRunner.textContent = actualCode;

        // tracing block

        ace.config.set('basePath', 'https://cdn.jsdelivr.net/npm/ace-min-noconflict@1.1.9/');

        const editorContainer = document.createElement("div");
        editorContainer.classList.add("ace-editor-tracing");

        const traceLabel = document.createElement("label");
        traceLabel.textContent = "Your Output:";
        traceLabel.classList.add("trace-label");

        const traceTextarea = document.createElement("textarea");
        traceTextarea.classList.add("trace-textarea");
        traceTextarea.rows = 6;
        traceTextarea.placeholder = "Write your expected output here...";

        if (isProgrammingQuestion) {

            pre.appendChild(codeRunner);
            form.appendChild(pre);       
            
        } else if (isTracingQuestion){

            form.appendChild(editorContainer);
            form.appendChild(traceLabel);
            form.appendChild(traceTextarea);

            const editor = ace.edit(editorContainer);
            editor.session.setMode("ace/mode/c_cpp");
            editor.setTheme("ace/theme/tomorrow");
            editor.setValue(actualCode, 1); // 1 moves cursor to end

            editor.setOptions({
                readOnly: true,
                showGutter: true,
                wrap: true,
                maxLines: Infinity,
                fontSize: "14px",
                fontFamily: "'Menlo', 'Roboto Mono', 'Courier New', Courier, monospace"
            });

        } else {

            choicesElement.id = "choices" + (i + 1);
            form.appendChild(choicesElement);

        }

        const buttonRow = document.createElement("div");
        buttonRow.classList.add("button-row");
      
        //add submit button
        const submitButton = document.createElement("button");
        submitButton.type = "button";
        submitButton.id = "submit-button" + (i + 1);
        submitButton.innerHTML = "Submit";
        submitButton.classList.add("submit-button");
        submitButton.addEventListener("click", async function () {

            let actualOutput;

            if (isProgrammingQuestion) {
                const codeRunner = form.querySelector("code-runner");
                

                const existingTestcaseContainer = form.querySelector(".testcase-container");
                if (existingTestcaseContainer) {
                    existingTestcaseContainer.remove();
                    // hide the next buttons
                    var nextButtons = document.getElementsByClassName("next-button");
                    for (var i = 0; i < nextButtons.length; i++) {
                        var nextButton = nextButtons[i];
                        nextButton.classList.add("hidden");
                    }
                }

                // check if hints already exists
                const existingHintContainer = form.querySelector(".hint-container");
                if (existingHintContainer) existingHintContainer.remove();
                const existingHintHeader = form.querySelector(".hint-header");
                if (existingHintHeader) existingHintHeader.remove();

                actualOutput = await runTestCases(codeRunner, inputArray, messageElement, null);

                if (actualOutput.includes("Please try again")){
                    displayTestcaseSummary(messageElement, false, true, 0, 0);
                    return;
                }
            }
                
            handle_submission(form.id, answer, hint, fileName, outputArray, isProgrammingQuestion, actualCode, actualOutput, inputArray, question, isTracingQuestion);
        });

        buttonRow.appendChild(submitButton);

        // Add next button
        if ((i + 1) !== questions.length) {
            const nextButton = document.createElement("button");
            nextButton.type = "button";
            nextButton.id = "next-button" + (i + 1);
            nextButton.innerHTML = "Next";
            nextButton.classList.add("next-button");
            nextButton.classList.add("hidden");
            nextButton.addEventListener("click", () => {
                const existingHintContainer = form.querySelector(".hint-container");
                if (existingHintContainer) existingHintContainer.remove();
                showNextQuestion();
            });

            buttonRow.appendChild(nextButton);
            form.appendChild(buttonRow);
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

            buttonRow.appendChild(finishButton);
            form.appendChild(buttonRow);
        }

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


        if (isProgrammingQuestion) {

            const progData = JSON.parse(localStorage.getItem(fileName + "quizForm" + (i + 1) + "_programming"));

            if (progData && typeof progData.totalTestcases !== "undefined") {

                displayTestcaseSummary(messageElement, false, false, progData.numTestcasesPassed, progData.totalTestcases);
                codeRunner.textContent = progData.userCode;

                codeRunner.setAttribute("output", progData.outputUI);  
                                
            }

        } else if (isTracingQuestion){

            const progData = JSON.parse(localStorage.getItem(fileName + "quizForm" + (i + 1) + "_tracing"));

            if (progData && typeof progData.isCorrect !== "undefined") {
                updateMessageElement(messageElement, progData.isCorrect, "", [], answer, false, false, isTracingQuestion);
                traceTextarea.value = progData.userOutput;
            }

        } else {

            // Check if there are stored values for the current form
            const selectedIndices = JSON.parse(localStorage.getItem(fileName + "quizForm" + (i + 1) + "_choices"));
            if (selectedIndices && selectedIndices.length !== 0) {
                const choiceInputs = selectedIndices.map(index => 
                    document.getElementById("choice" + (i + 1) + "-" + (index + 1)));
                choiceInputs.forEach(choiceInput => {
                    choiceInput.checked = true;
                });

                //const explainIndex = selectedIndices[0]; // Get the first selected index
                const isCorrect = answer.length === selectedIndices.length &&
                    answer.every(correctIndex => selectedIndices.includes(correctIndex));

                updateMessageElement(messageElement, isCorrect, hint, selectedIndices, answer, isSingleCorrect, isProgrammingQuestion, isTracingQuestion);
            }
        }

    }

    closeFullscreenForm();
}

async function handle_submission(formId, answer, hint, filename, outputArray, isProgrammingQuestion, originalCode, actualOutput, inputArray, questionPrompt, isTracingQuestion) {

    console.log("-----------NEW SUBMISSION------------");

    let outputUI = "";

    if (isProgrammingQuestion){

        // outputUI text at submission
        const form = document.getElementById(formId);
        let outputElement = form.querySelector("code-runner pre#result");
        outputUI = outputElement?.textContent.trim() || "";

    }
    
    var isSingleCorrect = false;
    if (!isTracingQuestion && answer.length == 1) {
        isSingleCorrect = true;
    }

    const formNumber = formId.replace("quizForm", "");
    const form = document.getElementById(formId);
    const selectedChoices = form.querySelectorAll("input[name='choice" + formId.slice(8) + "']:checked");

    const messageElement = form.querySelector("#message" + formId.slice(8));

    let selectedIndices = [];
    let numTestcasesPassed;
    let totalTestcases;

    if (selectedChoices.length > 0) {

        selectedIndices = Array.from(selectedChoices).map(choice => parseInt(choice.id.split('-')[1] - 1, 10));
        const isCorrect = answer.length === selectedIndices.length && answer.every(correctIndex => selectedIndices.includes(correctIndex));
        updateMessageElement(messageElement, isCorrect, hint, selectedIndices, answer, isSingleCorrect, isProgrammingQuestion, isTracingQuestion);

    } else if (isProgrammingQuestion) {

        totalTestcases = actualOutput.length;
        numTestcasesPassed = displayTestcaseResults(form, inputArray, outputArray, actualOutput);
        displayTestcaseSummary(messageElement, false, false, numTestcasesPassed, totalTestcases, questionPrompt);

        if (totalTestcases != numTestcasesPassed) {
            let previousHints = [];

            let container = document.createElement("div");

            const header = document.createElement("h5");
            header.classList.add("hint-header");
            header.textContent = "Hints";
            container.appendChild(header);

            let hintContainer = await generate_hints(form, originalCode, outputArray, actualOutput, questionPrompt, previousHints);

            container.appendChild(hintContainer);
            form.appendChild(container);
        }

    } else if (isTracingQuestion){
        const traceInput = form.querySelector(".trace-textarea");
        const userOutput = traceInput ? traceInput.value.trim() : "";

        const correctTracingOutput = (Array.isArray(answer) ? answer[0] : answer || "").trim();
        const isCorrect = normalizeOutput(userOutput) === normalizeOutput(correctTracingOutput);

        console.log("User's answer: ", userOutput)

        console.log("tracing question correct: ", isCorrect);
        console.log("messageElement:", messageElement);

        updateMessageElement(messageElement, isCorrect, hint, selectedIndices, answer, isSingleCorrect, isProgrammingQuestion, isTracingQuestion);

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


    const baseKey = filename + formId;

    if (isProgrammingQuestion) {

        const form = document.getElementById(formId);  
        const editorContainer = form.querySelector("#codetorun"); // ace editor container inside that form
        const editor = ace.edit(editorContainer); // ace editor instance for that container
        const code = editor.getValue();            
        
        localStorage.setItem(baseKey + "_programming", JSON.stringify({
            originalCode: originalCode,
            userCode: code,
            outputUI: outputUI,
            actualOutput: actualOutput,
            inputArray: inputArray,
            outputArray: outputArray,
            numTestcasesPassed: numTestcasesPassed,
            totalTestcases: totalTestcases
        }));
    } else if (isTracingQuestion){

        const traceInput = form.querySelector(".trace-textarea");
        const userOutput = traceInput ? traceInput.value.trim() : "";
        const correctTracingOutput = (Array.isArray(answer) ? answer[0] : answer || "").trim();
        const isCorrect = normalizeOutput(userOutput) === normalizeOutput(correctTracingOutput);

        localStorage.setItem(baseKey + "_tracing", JSON.stringify({
            userOutput: userOutput,
            isCorrect: isCorrect
        }));

    } else {
        localStorage.setItem(baseKey + "_choices", JSON.stringify(selectedIndices));
    }

}


function showNextQuestion() {
    const quizForms = document.querySelectorAll("[id^='quizForm']");
    const currentForm = quizForms[currentQuestionIndex];
    currentForm.style.display = "none";

    currentQuestionIndex++;

    var submitButton = document.getElementById("submit-button" + (parseInt(currentQuestionIndex, 10) + 1));
    if (submitButton) submitButton.classList.remove("hidden");

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

function displayTestcaseSummary(messageElement, runningTestcases, error, numTestcasesPassed, totalTestcases){

    if (runningTestcases){
        messageElement.innerHTML = "Testing...";
        messageElement.style.color = "grey";
        messageElement.style.fontWeight = "bold";
    } else if (error){
        messageElement.innerHTML = "Please try submitting again";
        messageElement.style.color = "red";
        messageElement.style.fontWeight = "bold";
    } else if (numTestcasesPassed == totalTestcases){
        messageElement.innerHTML = `Correct! ${numTestcasesPassed}/${totalTestcases} testcases passed`;
        messageElement.style.color = "green";
        messageElement.style.fontWeight = "bold";
    } else {
        messageElement.innerHTML = `${numTestcasesPassed}/${totalTestcases} testcases passed. Please try again!`;
        messageElement.style.color = "red";
        messageElement.style.fontWeight = "bold";
    }

}

function updateMessageElement(messageElement, isCorrect, hint, selectedIndices, answer, isSingleCorrect, isProgrammingQuestion, isTracingQuestion) {
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
        
        } else if (isProgrammingQuestion){
            messageElement.innerHTML = "Correct!";
            messageElement.style.color = "green";
            messageElement.style.fontWeight = "bold";
        } else if (isTracingQuestion){
            messageElement.innerHTML = "Correct!";
            messageElement.style.color = "green";
            messageElement.style.fontWeight = "bold";
        }
        
    } else if (isTracingQuestion){

        messageElement.innerHTML = "Incorrect! Please trace again";
        messageElement.style.color = "red";
        messageElement.style.fontWeight = "bold";

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

function normalizeOutput(str) {
    return str
        .replace(/[^\w]/g, "") // remove all non-alphanumeric (punctuation, spaces)
        .toLowerCase();        // make lowercase
}

function displayTestcaseResults(form, inputArray, outputArray, actualOutput) {
    // remove previous testcase block if exists
    const existingTestcaseContainer = form.querySelector(".testcase-container");
    if (existingTestcaseContainer) existingTestcaseContainer.remove();

    const testcaseContainer = document.createElement("div");
    testcaseContainer.classList.add("testcase-container");

    const header = document.createElement("h5");
    header.textContent = "Testcases";
    testcaseContainer.appendChild(header);

    // container for buttons 
    const testcaseButtonContainer = document.createElement("div");
    testcaseButtonContainer.classList.add("testcase-button-container");
    testcaseContainer.appendChild(testcaseButtonContainer);

    // container for test case info
    const testcaseInfoContainer = document.createElement("div");
    testcaseInfoContainer.classList.add("testcase-info-container");
    testcaseContainer.appendChild(testcaseInfoContainer);

    let numTestcasesPassed = 0;

    for (let i = 0; i < inputArray.length; i++) {
        
        // test case button
        const testcaseButton = document.createElement("button");
        testcaseButton.type = "button";
        testcaseButton.id = "testcase" + (i+1);
        testcaseButton.innerHTML = `Case ${i + 1}`;
        testcaseButton.classList.add("testcase-button");
        testcaseButtonContainer.appendChild(testcaseButton);

        const testcaseDiv = document.createElement("div");
        testcaseDiv.classList.add("testcase");

        testcaseDiv.style.display = "none";

        const expected = (outputArray[i] && outputArray[i][0]) || "";
        const actual = actualOutput[i] || "";
        const passed = (normalizeOutput(expected) == normalizeOutput(actual));

        if (passed) numTestcasesPassed++;

        // input
        if (inputArray[i] != ""){
            const inputPara = document.createElement("p");
            inputPara.innerHTML = `<strong>Input:</strong>`;
            testcaseDiv.appendChild(inputPara);

            const preInput = document.createElement("pre");
            preInput.textContent = inputArray[i].join("\n");
            testcaseDiv.appendChild(preInput);
        }

        const diff = diffCheck(expected, actual);

        // expected output
        const outputPara = document.createElement("p");
        if (outputArray[i].length > 1) outputPara.innerHTML = `<strong>Expected Outputs:</strong>`;
        else outputPara.innerHTML = `<strong>Expected Output:</strong>`;
        testcaseDiv.appendChild(outputPara);

        outputArray[i].forEach((i) => {
            const preExpected = document.createElement("pre");
            if (passed) preExpected.innerHTML = expected;
            else preExpected.innerHTML = diff.expectedResult;
            testcaseDiv.appendChild(preExpected);
        });

        // actual output
        const actualPara = document.createElement("p");
        actualPara.innerHTML = `<strong>Actual Output:</strong>`;
        testcaseDiv.appendChild(actualPara);

        const preActual = document.createElement("pre");
        if (passed) preActual.innerHTML = actual;
        else preActual.innerHTML = diff.actualResult;
        testcaseDiv.appendChild(preActual);

        // results
        const resultPara = document.createElement("p");
        const resultText = passed ? "Passed" : "Failed";
        const resultColor = passed ? "green" : "red";
        resultPara.innerHTML = `
            <strong>Result:</strong> 
            <span style="color: ${resultColor};">
                ${resultText}
            </span>
        `;

        testcaseButton.style.color = passed ? "green" : "red";

        testcaseDiv.appendChild(resultPara);

        testcaseInfoContainer.appendChild(testcaseDiv);

        testcaseButton.addEventListener("click", () => {

            const allInfo = testcaseInfoContainer.children;
            const allInfoArray = Array.from(allInfo);

            allInfoArray.forEach(div => {
                 div.style.display = "none";
            });
            
            testcaseDiv.style.display = "block";

        });
    }

    form.appendChild(testcaseContainer);

    return numTestcasesPassed;
}

function diffCheck(expected, actual) {
    if (expected === actual) return {expectedResult: expected, actualResult: actual};

    let expectedResult = "";
    let actualResult = "";

    const expectedWords = expected.match(/[^\s]+|\s+/g) || [];
    const actualWords = actual.match(/[^\s]+|\s+/g) || [];
    const length = Math.max(expectedWords.length, actualWords.length);

    for (let i = 0; i < length; i++) {
        const expectedWord = expectedWords[i] || "";
        const actualWord = actualWords[i] || "";

        if (expectedWord === actualWord) {
            expectedResult += expectedWord;
            actualResult += actualWord;
        } else {
            if (expectedWord.trim() === "") {
                expectedResult += expectedWord;
            } else {
                expectedResult += `<span class="highlight-expected">${expectedWord}</span>`;
            }

            if (actualWord.trim() === "") {
                actualResult += actualWord;
            } else {
                actualResult += `<span class="highlight-actual">${actualWord}</span>`;
            }
        }
    }

    return { expectedResult, actualResult };
}

function resetQuiz(fileName) {

    localStorage.removeItem("formsLocked");
    localStorage.removeItem("displayTestcases");

    const quizForms = document.querySelectorAll("[id^='quizForm']");

    for (let i = 0; i < quizForms.length; i++) {
        quizForms[i].style.display = "none";

        const form = quizForms[i];

        // remove previous test case block if exists
        const existingTestcaseContainer = form.querySelector(".testcase-container");
        if (existingTestcaseContainer) existingTestcaseContainer.remove();

        let key = fileName + "quizForm" + (i+1) + "_programming";
        let progData = JSON.parse(localStorage.getItem(key));

        if (progData){ // true if programming question

            // unlock everything 
            const textArea = form.querySelector("#codetorun .ace_text-input");
            if (textArea) textArea.removeAttribute("readonly");
            const editorContainer = form.querySelector("#codetorun");
            if (editorContainer) editorContainer.style.backgroundColor = ""; 

            const inputArea = form.querySelector("#input_section > textarea");
            if (inputArea) {
                inputArea.removeAttribute("readonly");
                inputArea.style.backgroundColor = ""; 
            }

            const oldRunner = form.querySelector("code-runner");
            if (oldRunner) {
                // get original code from localStorage
                defaultCode = progData.originalCode || "";

                // create new code runner with same functionality as original
                const newCodeRunner = document.createElement("code-runner");
                newCodeRunner.setAttribute("language", "c");
                newCodeRunner.setAttribute("output", "");
                newCodeRunner.textContent = defaultCode;

                // get the existing code-runner and replace with new on in DOM
                const codeRunner = form.querySelector("code-runner");
                codeRunner.parentNode.replaceChild(newCodeRunner, codeRunner);
            }

            localStorage.removeItem(key);
        }

        key = fileName + "quizForm" + (i+1) + "_tracing";
        progData = JSON.parse(localStorage.getItem(key));

        if (progData) {
            localStorage.removeItem(key);
            
            const traceTextarea = quizForms[i].querySelector(".trace-textarea");
            if (traceTextarea) {
                traceTextarea.value = "";
                traceTextarea.placeholder = "Write your expected output here...";
                traceTextarea.removeAttribute("readonly");
                traceTextarea.style.backgroundColor = ""; 
            }
        }

    }

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