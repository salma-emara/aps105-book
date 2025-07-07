function generate_exercises(filename) {
	const container = document.currentScript.parentElement;
	container.innerHTML = '';

	const exercises = parsedObject.exercises;

	for (let i = 0; i < exercises.length; i++) {
		const ex = exercises[i];

		const form = document.createElement('div');
		form.className = 'exercise-card';

		const title = document.createElement('h6');
		title.textContent = `${ex.title} [${ex.difficulty}]`;
		title.style.marginTop = "10px";
		title.style.fontWeight = "bold";
		form.appendChild(title);

        const md = window.markdownit({ html: true, linkify: true, typographer: true });

        const question = document.createElement('div');
        const questionHTML = md.render(ex.question);
        question.innerHTML = questionHTML;
        form.appendChild(question);

        if (window.MathJax) MathJax.typesetPromise([question]);

		const type = ex.type;
		const isProgrammingQuestion = type === "programming" || type === "function programming";
		const isTracingQuestion = type === "tracing";
		const isExplainationQuestion = type === "textbox" || type === "explaination";

		if (ex["question-code"]) {
			const questionCode = ex["question-code"].trim();
			ace.config.set('basePath', 'https://cdn.jsdelivr.net/npm/ace-min-noconflict@1.1.9/');
			const pre = document.createElement("pre");

			const editorContainer = document.createElement("div");
			editorContainer.classList.add("ace-editor-tracing");

			pre.appendChild(editorContainer);
			form.appendChild(pre);

			const editor = ace.edit(editorContainer);
			editor.session.setMode("ace/mode/c_cpp");
			editor.setTheme("ace/theme/tomorrow");
			editor.setValue(questionCode, 1);

			editor.setOptions({
				readOnly: true,
				showGutter: true,
				wrap: true,
				maxLines: Infinity,
				fontSize: "14px",
				fontFamily: "'Menlo', 'Roboto Mono', 'Courier New', Courier, monospace"
			});
		}

		if (isProgrammingQuestion) {
			const starterCode = ex["starter-code"] ? ex["starter-code"].trim() : '';
			const pre = document.createElement("pre");
			pre.classList.add("code-runner-quizzes");

			const codeRunner = document.createElement("code-runner");
			codeRunner.setAttribute("language", "c");
			codeRunner.setAttribute("output", "");
			codeRunner.setAttribute("inputTestcase", "");
			codeRunner.textContent = starterCode;

			pre.appendChild(codeRunner);
			form.appendChild(pre);

		} else if (isTracingQuestion) {

			const traceTextarea = document.createElement("textarea");
			traceTextarea.classList.add("trace-textarea");
			traceTextarea.rows = 6;
			traceTextarea.placeholder = "Write your expected output here...";
			form.appendChild(traceTextarea);

		} else if (isExplainationQuestion) {
			const textbox = document.createElement("textarea");
			textbox.classList.add("explaination-textarea");
			textbox.rows = 3;
			textbox.placeholder = "Type your answer here...";
			form.appendChild(textbox);
		}

		const submitButton = document.createElement("button");
		submitButton.type = "button";
		submitButton.innerHTML = "Submit";
		submitButton.classList.add("submit-button");

		const resultMessage = document.createElement("div");
		resultMessage.style.marginTop = "10px";
		resultMessage.style.marginBottom = "20px";
		resultMessage.style.padding = "10px";
		resultMessage.style.border = "1px dashed #999";
		resultMessage.style.borderRadius = "5px";
		resultMessage.style.backgroundColor = "#fafafa";
		resultMessage.innerHTML = "<em>Your result will appear here.</em>";

		form.appendChild(submitButton);
		form.appendChild(resultMessage);

		submitButton.addEventListener("click", async function () {
			const correctAnswer = (ex.answer || ex["answer-code"] || "").trim();

			if (isProgrammingQuestion) {
				const codeRunner = form.querySelector("code-runner");

				const existingTestcaseContainer = form.querySelector(".testcase-container");
				if (existingTestcaseContainer) existingTestcaseContainer.remove();

				const existingHintContainer = form.querySelector(".hint-container");
				if (existingHintContainer) existingHintContainer.remove();

				// Gather testcases
				const exerciseTestcases = ex.testcases || [];
				let inputArray = [];
				let expectedOutput = [];

				for (let j = 0; j < exerciseTestcases.length; j++) {
					inputArray.push(exerciseTestcases[j].input || []);
					expectedOutput.push(exerciseTestcases[j].output || []);
				}

				let actualOutput = await runTestCases(codeRunner, inputArray, resultMessage);

				if (actualOutput.includes("Please try again")) {

                    resultMessage.innerHTML = "Please try submitting again";
                    resultMessage.style.color = "red";
                    resultMessage.style.fontWeight = "bold";

					return;
				}

				handle_prog_submission(form, resultMessage, inputArray, expectedOutput, actualOutput, correctAnswer, type);

			} else {
				handle_submission(form, resultMessage, type, correctAnswer);
			}
		});

		container.appendChild(form);
	}
}


function handle_prog_submission(form, messageElement, inputArray, expectedOutput, actualOutput, correctAnswer, questionType) {
    const totalTestcases = actualOutput.length;

    const testcaseResults = actualOutput.map((output, idx) => {
        const expected = (expectedOutput[idx] && expectedOutput[idx][0]) || "";
        const passed = normalizeOutput(expected) === normalizeOutput(output);
        return { expected, actual: output, passed };
    });

    const numTestcasesPassed = testcaseResults.filter(tc => tc.passed).length;
    const isCorrect = numTestcasesPassed === totalTestcases;

    const testcaseContainer = displayTestcaseResults(form, inputArray, expectedOutput, actualOutput, testcaseResults);

    updateResultMessage(messageElement, isCorrect, questionType, correctAnswer, "", numTestcasesPassed, totalTestcases, testcaseContainer);
}



function handle_submission(form, messageElement, questionType, correctAnswer) {
	const traceInput = form.querySelector(".trace-textarea") || form.querySelector(".explaination-textarea");
	const userAnswer = traceInput ? traceInput.value.trim() : "";

	if (!userAnswer) {
		updateResultMessage(messageElement, false, questionType, userAnswer, correctAnswer, "Please enter your answer before submitting.");
		return;
	}

	let isCorrect = false;

	if (questionType === "tracing") {
		isCorrect = normalizeOutput(userAnswer) === normalizeOutput(correctAnswer);
	}

	updateResultMessage(messageElement, isCorrect, questionType, correctAnswer);
}


function updateResultMessage(messageElement, isCorrect, questionType, correctAnswer, customMessage = "", numPassed = 0, total = 0, testcaseContainer = null) {
   
    if (customMessage) {
        messageElement.innerHTML = `<span style="color: red;">${customMessage}</span>`;
        return;
    }

    messageElement.innerHTML = "";

    if (questionType === "programming" || questionType === "function programming") {
        const summary = document.createElement("div");
        summary.innerHTML = `<span style="color: ${isCorrect ? "green" : "red"}; font-weight: bold;">
            ${numPassed}/${total} testcases passed.
        </span>`;
        messageElement.appendChild(summary);

        // testcases
        if (testcaseContainer) {
            const testcaseDetails = document.createElement("details");
            testcaseDetails.style.marginTop = "10px";

            const testcaseSummary = document.createElement("summary");
            testcaseSummary.style.cursor = "pointer";
            testcaseSummary.textContent = "Show Testcases";

            testcaseDetails.appendChild(testcaseSummary);
            testcaseDetails.appendChild(testcaseContainer);
            messageElement.appendChild(testcaseDetails);
        }

        // suggested solution 
        const solutionDetails = document.createElement("details");
        solutionDetails.style.marginTop = "10px";

        const solutionSummary = document.createElement("summary");
        solutionSummary.style.cursor = "pointer";
        solutionSummary.textContent = "Show Suggested Solution";

        const solutionContent = document.createElement("div");
        solutionContent.innerHTML = `<pre>${escapeHtml(correctAnswer)}</pre>`;

        solutionDetails.appendChild(solutionSummary);
        solutionDetails.appendChild(solutionContent);
        messageElement.appendChild(solutionDetails);

    } else if (questionType === "tracing") {
        messageElement.innerHTML = isCorrect
            ? `<span style="color: green;"> Output matches! Well done.</span>`
            : `
                <span style="color: red;"> Output does not match.</span>
                <details style="margin-top: 10px;">
                    <summary style="cursor: pointer;">Show Expected Output</summary>
                    <div style="margin-top: 5px;">
                        <pre>${escapeHtml(correctAnswer)}</pre>
                    </div>
                </details>
            `;
    } else if (questionType === "textbox" || questionType === "explaination") {
        messageElement.innerHTML = `
            <span style="color: #edb313;">Compare your answer with the suggested solution below</span>
            <details style="margin-top: 10px;">
                <summary style="cursor: pointer;">Show Suggested Answer</summary>
                <div style="margin-top: 5px;">
                    <pre>${escapeHtml(correctAnswer)}</pre>
                </div>
            </details>
        `;
    }
}


function escapeHtml(text) {
	const div = document.createElement("div");
	div.textContent = text;
	return div.innerHTML;
}

function displayTestcaseResults(form, inputArray, outputArray, actualOutput, ) {
	const existingTestcaseContainer = form.querySelector(".testcase-container");
	if (existingTestcaseContainer) existingTestcaseContainer.remove();

	const testcaseContainer = document.createElement("div");
	testcaseContainer.classList.add("testcase-container");

	const testcaseButtonContainer = document.createElement("div");
	testcaseButtonContainer.classList.add("testcase-button-container");
	testcaseContainer.appendChild(testcaseButtonContainer);

	const testcaseInfoContainer = document.createElement("div");
	testcaseInfoContainer.classList.add("testcase-info-container");
	testcaseContainer.appendChild(testcaseInfoContainer);

	for (let i = 0; i < inputArray.length; i++) {
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

		if (inputArray[i] != ""){
			const inputPara = document.createElement("p");
			inputPara.innerHTML = `<strong>Input:</strong>`;
			testcaseDiv.appendChild(inputPara);

			const preInput = document.createElement("pre");
			preInput.textContent = inputArray[i].join("\n");
			testcaseDiv.appendChild(preInput);
		}

		const diff = diffCheck(expected, actual);

		const outputPara = document.createElement("p");
		if (outputArray[i].length > 1) outputPara.innerHTML = `<strong>Expected Outputs:</strong>`;
		else outputPara.innerHTML = `<strong>Expected Output:</strong>`;
		testcaseDiv.appendChild(outputPara);

		outputArray[i].forEach((i) => {
			const preExpected = document.createElement("pre");
			preExpected.innerHTML = passed ? expected : diff.expectedResult;
			testcaseDiv.appendChild(preExpected);
		});

		const actualPara = document.createElement("p");
		actualPara.innerHTML = `<strong>Actual Output:</strong>`;
		testcaseDiv.appendChild(actualPara);

		const preActual = document.createElement("pre");
		preActual.innerHTML = passed ? actual : diff.actualResult;
		testcaseDiv.appendChild(preActual);

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
			allInfoArray.forEach(div => div.style.display = "none");
			testcaseDiv.style.display = "block";
		});
	}

	return testcaseContainer;
}


function normalizeOutput(str) {
    return str
        .replace(/[^\w]/g, "")
        .toLowerCase();     
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

