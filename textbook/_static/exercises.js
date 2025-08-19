


function createTitle(form, ex) {
	const title = document.createElement('h5');
	title.textContent = `${ex.title} [${ex.difficulty}]`;
	title.style.fontWeight = "bold";
	title.style.color = "#4f4f4f";  
	form.appendChild(title);
}


function generate_exercises(filename) {
	const container = document.currentScript.parentElement;
	container.innerHTML = '';

	const exercises = parsedObject.exercises;

	let inMultipart = false;
	let currentMultipartForm = null;
	let multipartCount = 0;

	for (let i = 0; i < exercises.length; i++) {
		const ex = exercises[i];

		let form;
		let storageKey;

		if (!ex.multipart) {
			inMultipart = false;
			multipartCount = 0;

			form = document.createElement('div');
			form.className = 'exercise-card';
			form.id = `exercise-${i}`;
			storageKey = `${filename}-${form.id}`;

			createTitle(form, ex);
			container.appendChild(form);

		} else {

			multipartCount++;

			if (!inMultipart) {
				// first part of multipart questions
				inMultipart = true;
				currentMultipartForm = document.createElement('div');
				currentMultipartForm.className = 'exercise-card';
				currentMultipartForm.id = `exercise-multipart-${i}`;

				createTitle(currentMultipartForm, ex);
				container.appendChild(currentMultipartForm);
			}

			form = currentMultipartForm;

			// each subquestion gets its own unique storageKey
			storageKey = `${filename}-${form.id}-part-${multipartCount}`;

			// Add divider between multipart sub-questions
			if (i > 0 && exercises[i - 1].multipart) {
				const divider = document.createElement("div");
				divider.className = "multipart-divider";
				form.appendChild(divider);
			}
		}

        const md = window.markdownit({ html: true, linkify: true, typographer: true });

        const question = document.createElement('div');
        const questionHTML = md.render(ex.question);
        question.innerHTML = questionHTML;

		const questionContentBox = document.createElement("div");
		questionContentBox.className = "question-content-box";
        questionContentBox.appendChild(question);
		
        if (window.MathJax) MathJax.typesetPromise([question]);

		const type = ex.type;
		const isProgrammingQuestion = type === "programming" || type === "function programming";
		const isTracingQuestion = type === "tracing";
		const isExplainationQuestion = type === "textbox" || type === "explaination";
		const isMultipleChoice = type === "multiple-choice";
		const isSingleCorrect = Array.isArray(ex.answer) && ex.answer.length === 1;

		let userInputElement = null;

		if (ex["question-code"]) {
			const questionCode = ex["question-code"].trim();
			ace.config.set('basePath', 'https://cdn.jsdelivr.net/npm/ace-min-noconflict@1.1.9/');
			const pre = document.createElement("pre");

			const editorContainer = document.createElement("div");
			editorContainer.classList.add("ace-editor-tracing");

			pre.appendChild(editorContainer);
			questionContentBox.appendChild(pre);

			const editor = ace.edit(editorContainer);
			editor.session.setMode("ace/mode/c_cpp");
			editor.setTheme("ace/theme/tomorrow");
			editor.setValue(questionCode, 1);

			const lineCount = Math.max(questionCode.split('\n').length, 1);
		
			editor.setOptions({
				readOnly: true,
				showGutter: lineCount > 5,
				wrap: true,
				maxLines: Infinity,
				fontSize: "14px",
				fontFamily: "'Menlo', 'Roboto Mono', 'Courier New', Courier, monospace"
			});
		}

		if (isMultipleChoice && ex.choices) {
			const choicesElement = document.createElement("div");
			choicesElement.classList.add("multiple-choice-container");

			choicesElement.style.display = 'flex';
			choicesElement.style.flexDirection = 'column';
			choicesElement.style.gap = '8px';

			for (let j = 0; j < ex.choices.length; j++) {
				let choiceText = ex.choices[j];

				const input = document.createElement("input");
				input.type = isSingleCorrect ? "radio" : "checkbox";
				input.name = `choice-${i}`;
				input.id = `choice-${i}-${j + 1}`;
				input.value = j;

				const label = document.createElement("label");
				label.setAttribute("for", input.id);
				// label.innerHTML = `${String.fromCharCode(65 + j)}) ${choiceText}`;
				label.innerHTML = `${choiceText}`;

				const container = document.createElement("div");
				container.classList.add("choicesContainer");
				container.appendChild(input);
				container.appendChild(label);

				choicesElement.appendChild(container);
			}

			questionContentBox.appendChild(choicesElement);

		} else if (type === "explaination" && ex.table) {
			const table = document.createElement("table");
			table.classList.add("exercise-table");

			const tableHeader = document.createElement("thead");
			const headerRow = document.createElement("tr");
			
			for (const header of ex.headers) {
				const th = document.createElement("th");
				th.textContent = header;
				headerRow.appendChild(th);
			}

			tableHeader.appendChild(headerRow);
			table.appendChild(tableHeader);

			const tableBody = document.createElement("tbody");

			for (let rowIndex = 0; rowIndex < ex.rows.length; rowIndex++) {
				const row = ex.rows[rowIndex];
				const tr = document.createElement("tr");

				for (let colIndex = 0; colIndex < row.length; colIndex++) {
					const cell = row[colIndex];
					const td = document.createElement("td");

					if (cell === "") {
						const input = document.createElement("input");
						input.type = "text";
						input.dataset.row = rowIndex;
						input.dataset.col = colIndex;
						input.classList.add("table-input");

						// restore saved data
						let savedTable = JSON.parse(localStorage.getItem(`${storageKey}-table`) || "[]");
						
						if (savedTable[rowIndex] && savedTable[rowIndex][colIndex] !== undefined) 
							input.value = savedTable[rowIndex][colIndex];

						// save 
						input.addEventListener("input", () => {
							let currentData = JSON.parse(localStorage.getItem(`${storageKey}-table`) || "[]");

							if (!Array.isArray(currentData[rowIndex])) {
								currentData[rowIndex] = [];
							}

							currentData[rowIndex][colIndex] = input.value;
							localStorage.setItem(`${storageKey}-table`, JSON.stringify(currentData));
						});

						td.appendChild(input);
					}

					
					else {
						td.textContent = cell;
					}

					tr.appendChild(td);
				}

				tableBody.appendChild(tr);
			}

			table.appendChild(tableBody);
			questionContentBox.appendChild(table);

		}

		else if (isProgrammingQuestion) {
			const starterCode = ex["starter-code"] ? ex["starter-code"].trim() : '';
			const pre = document.createElement("pre");
			pre.classList.add("code-runner-quizzes");

			const codeRunner = document.createElement("code-runner");
			codeRunner.setAttribute("language", "c");
			codeRunner.setAttribute("output", "");
			codeRunner.setAttribute("inputTestcase", "");

			// saved answer
			let progData = JSON.parse(localStorage.getItem(`${storageKey}-programming`));

			if (progData) {
				codeRunner.textContent = progData.userCode; 
			} else {
				codeRunner.textContent = starterCode;
			}

			pre.appendChild(codeRunner);
			questionContentBox.appendChild(pre);

			codeRunner.addEventListener('input', () => {
				const closest = codeRunner.closest('.exercise-card');
				const editorContainer = closest.querySelector("#codetorun"); 
				const editor = ace.edit(editorContainer); 
				const code = editor.getValue();
			    localStorage.setItem(`${storageKey}-programming`, JSON.stringify({ userCode: code }));
			    console.log("Code saved");
			});

		} else if (isTracingQuestion) {

			const traceTextarea = document.createElement("textarea");
			traceTextarea.classList.add("trace-textarea");
			traceTextarea.rows = 6;
			traceTextarea.placeholder = "Write your expected output here...";

			// saved answer
			traceTextarea.value = localStorage.getItem(`${storageKey}-trace`) || "";

			traceTextarea.addEventListener("input", () => {
				localStorage.setItem(`${storageKey}-trace`, traceTextarea.value);
			});

			questionContentBox.appendChild(traceTextarea);
			userInputElement = traceTextarea;

		} else if (isExplainationQuestion) {
			const textbox = document.createElement("textarea");
			textbox.classList.add("explaination-textarea");
			textbox.rows = 3;
			textbox.placeholder = "Type your answer here...";

			// saved answer
			textbox.value = localStorage.getItem(`${storageKey}-explaination`) || "";

			textbox.addEventListener("input", () => {
				localStorage.setItem(`${storageKey}-explaination`, textbox.value);
			});

			questionContentBox.appendChild(textbox);
			userInputElement = textbox;
		}

		const submitButton = document.createElement("button");
		// submitButton.type = "button";
		submitButton.innerHTML = "Evaluate Answer";
		submitButton.classList.add("submit-exercises-button");

		const resetButton = document.createElement("button");
		// resetButton.type = "button";
		resetButton.textContent = "Start Fresh";
		resetButton.classList.add("reset-exercises-button");

		const resultMessage = document.createElement("div");
		resultMessage.innerHTML = "";
		resultMessage.style.display = "none";
		resultMessage.style.marginTop = "10px";

		// footer box (submit + reset + result)
		const footerBox = document.createElement("div");
		footerBox.className = "question-footer-box";

		// submit + reset container
		const buttonContainer = document.createElement("div");
		buttonContainer.style.display = "flex";
		buttonContainer.style.justifyContent = "space-between";
		buttonContainer.style.alignItems = "center";
		buttonContainer.appendChild(submitButton);
		buttonContainer.appendChild(resetButton);

		footerBox.appendChild(buttonContainer);
		footerBox.appendChild(resultMessage);
		questionContentBox.appendChild(footerBox);

		resetButton.addEventListener("click", () => {
			if (isProgrammingQuestion){

				localStorage.removeItem(`${storageKey}-programming`);

				const closest = resetButton.closest('.exercise-card');
				const editorContainer = closest.querySelector("#codetorun"); 
				const editor = ace.edit(editorContainer);

				const starterCode = ex["starter-code"] ? ex["starter-code"].trim() : '';
				editor.setValue(starterCode, 1);  

				console.log("Code cleared");

			} else if (isTracingQuestion) {

				localStorage.removeItem(`${storageKey}-trace`);
				if (userInputElement) userInputElement.value = '';

			} else if (ex.table) {

				localStorage.removeItem(`${storageKey}-table`);
				const inputs = form.querySelectorAll(".table-input");
				inputs.forEach(input => input.value = "");

			} else if (isExplainationQuestion) {

				localStorage.removeItem(`${storageKey}-explaination`);
				if (userInputElement) userInputElement.value = '';

			}

			// reset the result message
			// resultMessage.innerHTML = "<em>Your result will appear here.</em>";
			resultMessage.style.display = "none";
			resultMessage.innerHTML = "";

		});

		submitButton.addEventListener("click", async function () {

			resultMessage.style.display = "block";

			if (isMultipleChoice && Array.isArray(ex.answer)) {
				const selectedChoices = form.querySelectorAll(`input[name="choice-${i}"]:checked`);
				const selectedIndices = Array.from(selectedChoices).map(input => parseInt(input.value));

				if (selectedIndices.length === 0) {
					resultMessage.innerHTML = `<span style="color: red;">Please select an option before submitting.</span>`;
					return;
				}

				const correctIndices = ex.answer;
				const isCorrect =
					selectedIndices.length === correctIndices.length &&
					correctIndices.every(idx => selectedIndices.includes(idx));

				if (ex.explanations && ex.explanations.length > 0) {
					const explanationHTML = `
					<details style="margin-top: 10px;">
						<summary style="cursor: pointer;">Show Explanation</summary>
						<div style="margin-top: 5px;">
							${ex.explanations[0]}
						</div>
					</details>
					`;
					
					resultMessage.innerHTML = isCorrect
						? `<span style="color: green;">Correct!</span><br>${explanationHTML}`
						: `<span style="color: red;">Incorrect.</span><br>${explanationHTML}`;
				} else {
					resultMessage.innerHTML = isCorrect
						? `<span style="color: green;">Correct!</span>`
						: `<span style="color: red;">Incorrect.</span>`;
				}

				return; 
			}

			let correctAnswerRaw = ex.answer || "";

			const correctAnswer =  correctAnswerRaw;

			if (isProgrammingQuestion) {

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

				const codeRunner = form.querySelector('code-runner');
				let studentCode = null;

				// append main-function for function programming type
				if (type === "function programming" && ex["main-function"]) {

					const rawCode = codeRunner.querySelector('.ace_content').innerText;
					const studentOnlyCode = removeMainFunction(rawCode).trim();

					studentCode =
					"// Student Code\n" +
					studentOnlyCode +
					"\n\n// Appended main function used for testcases\n" +
					ex["main-function"].trim();

				} else {
					const rawCode = codeRunner.querySelector('.ace_content').innerText;
					studentCode = rawCode;

				}

				let actualOutput = await runTestCases(codeRunner, inputArray, resultMessage, studentCode);

				if (actualOutput.includes("Please try again")) {

                    resultMessage.innerHTML = "Please try submitting again";
                    resultMessage.style.color = "red";
                    resultMessage.style.fontWeight = "bold";

					return;
				}

				let hintContainer = await generate_hints(form, studentCode, expectedOutput, actualOutput, ex.question, []);
				handle_prog_submission(form, resultMessage, inputArray, expectedOutput, actualOutput, correctAnswer, type, hintContainer, studentCode);

			} else if (type === "explaination" && ex.table){
				
				handle_output_submission(form, resultMessage, type, correctAnswer, ex, storageKey);

			} else {
				handle_output_submission(form, resultMessage, type, correctAnswer, ex, storageKey);
			}
		});

		form.appendChild(questionContentBox);
		container.appendChild(form);
	}
}

function removeMainFunction(code) {
	const mainRegex = /int\s+main\s*\([^)]*\)\s*\{(?:[^{}]*|\{[^{}]*\})*\}/g;
	return code.replace(mainRegex, '').trim();
}


async function handle_prog_submission(form, messageElement, inputArray, expectedOutput, actualOutput, correctAnswer, questionType, hintContainer, studentCode) {
    const totalTestcases = actualOutput.length;

    const testcaseResults = actualOutput.map((output, idx) => {
        const expected = (expectedOutput[idx] && expectedOutput[idx][0]) || "";
        const passed = normalizeOutput(expected) === normalizeOutput(output);
        return { expected, actual: output, passed };
    });

    const numTestcasesPassed = testcaseResults.filter(tc => tc.passed).length;
    const isCorrect = numTestcasesPassed === totalTestcases;

    const testcaseContainer = getTestcasesContainer(form, inputArray, expectedOutput, actualOutput, testcaseResults);

	if (isCorrect) hintContainer = null;
    updateResultMessage(messageElement, isCorrect, questionType, correctAnswer, "", numTestcasesPassed, totalTestcases, testcaseContainer, hintContainer, studentCode);
}

async function handle_output_submission(form, messageElement, questionType, correctAnswer, exercise, storageKey) {

	const existingFeedbackContainer = messageElement.querySelector(".hint-container");
	if (existingFeedbackContainer) existingFeedbackContainer.remove();

	if (exercise.table) {

		const rawStudentRows = JSON.parse(localStorage.getItem(`${storageKey}-table`) || "[]");

		const studentRows = rawStudentRows.map((row, index) => {
			const correctMethod = exercise.answer[index]?.[0] || "";
			return [correctMethod, row?.[1] || "", row?.[2] || ""];
		});

		let feedbackContainer = await get_feedback(form, messageElement, exercise, studentRows, "", []);

		const solutionTableHTML = buildFilledTableHTML(exercise.headers, exercise.answer);

		updateResultMessage(
			messageElement,
			false,
			questionType,
			{
				solutionTableHTML
			},
			"", // custom message
			0,  // numPassed
			0,  // total
			null, // testcaseContainer
			feedbackContainer //
		);

		return;
	}

	const traceInput = form.querySelector(".trace-textarea") || form.querySelector(".explaination-textarea");
	const userAnswer = traceInput ? traceInput.value.trim() : "";

	if (!userAnswer) {
		updateResultMessage(messageElement, false, questionType, correctAnswer, "Please enter your answer before submitting.");
		return;
	}

	let isCorrect = false;

	if (questionType === "tracing") isCorrect = normalizeOutput(userAnswer) === normalizeOutput(correctAnswer);

	let feedbackContainer = await get_feedback(form, messageElement, exercise, [], userAnswer, []);

	updateResultMessage(
		messageElement,
		isCorrect,
		questionType,
		correctAnswer, 
		"", // custom message
		0,  // numPassed
		0,  // total
		null, // testcaseContainer
		feedbackContainer 
	);
	return;
}

function buildFilledTableHTML(headers, rows) {
	const table = document.createElement("table");
	table.classList.add("exercise-table");

	const thead = document.createElement("thead");
	const headerRow = document.createElement("tr");

	for (const header of headers) {
		const th = document.createElement("th");
		th.textContent = header;
		headerRow.appendChild(th);
	}
	thead.appendChild(headerRow);
	table.appendChild(thead);

	const tbody = document.createElement("tbody");
	for (const row of rows) {
		const tr = document.createElement("tr");
		for (const cell of row) {
			const td = document.createElement("td");
			td.textContent = cell;
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	table.appendChild(tbody);

	return table.outerHTML;
}

function updateResultMessage(messageElement, isCorrect, questionType, correctAnswer, customMessage = "", numPassed = 0, total = 0, testcaseContainer = null, hintContainer = null, studentCode = null) {
   
    if (customMessage) {
        messageElement.innerHTML = `<span style="color: #276be9;">${customMessage}</span>`;
        return;
    }

    messageElement.innerHTML = "";

    if (questionType === "programming" || questionType === "function programming") {
        const summary = document.createElement("div");
        summary.innerHTML = `<span style="color: ${isCorrect ? "green" : "red"}; font-weight: bold;">
            ${numPassed}/${total} testcases passed.
        </span>`;
        messageElement.appendChild(summary);

        if (questionType === "function programming" && studentCode) {
            const mainInfoTitle = document.createElement("div");
            mainInfoTitle.style.marginTop = "10px";
            mainInfoTitle.style.fontWeight = "bold";
            mainInfoTitle.innerText = "Appended main function to student code:";

			// bold comments
			const highlightedCode = studentCode
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/\/\/ Student Code/g, '<span style="font-weight:bold">// Student Code</span>')
				.replace(/\/\/ Appended main function used for testcases/g, '<span style="font-weight:bold">// Appended main function used for testcases</span>');

            const codeBlock = document.createElement("pre");
			codeBlock.innerHTML = highlightedCode;  

            messageElement.appendChild(mainInfoTitle);
            messageElement.appendChild(codeBlock);
        }

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

        if (hintContainer && !isCorrect) {
            const hintDetails = document.createElement('details');
            hintDetails.style.marginTop = '10px';

            const hintSummary = document.createElement('summary');
            hintSummary.textContent = 'Show Hint';
            hintSummary.style.cursor = 'pointer';

            hintDetails.appendChild(hintSummary);
            hintDetails.appendChild(hintContainer);

            messageElement.appendChild(hintDetails);
        }

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

		// feedback container
		if (hintContainer) {
			const hintDetails = document.createElement("details");
			hintDetails.style.marginTop = "10px";

			const hintSummary = document.createElement("summary");
			hintSummary.textContent = "Get Feedback";
			hintSummary.style.cursor = "pointer";

			hintDetails.appendChild(hintSummary);
			hintDetails.appendChild(hintContainer);

			messageElement.appendChild(hintDetails);
		}

    } else if (questionType === "textbox" || questionType === "explaination") {
		messageElement.innerHTML = "";

		const summaryText = `
			<span style="color: #edb313;">
				Compare your answer with the suggested solution below
			</span>
		`;

		const solutionDetails = document.createElement("details");
		solutionDetails.style.marginTop = "10px";

		const solutionSummary = document.createElement("summary");
		solutionSummary.style.cursor = "pointer";
		solutionSummary.textContent = "Show Suggested Solution";

		const solutionContent = document.createElement("div");
		solutionContent.style.marginTop = "10px";

		if (correctAnswer.solutionTableHTML) solutionContent.innerHTML = correctAnswer.solutionTableHTML
		else solutionContent.innerHTML = `<pre>${escapeHtml(correctAnswer)}</pre>`;

		solutionDetails.appendChild(solutionSummary);
		solutionDetails.appendChild(solutionContent);

		messageElement.innerHTML = summaryText;
		messageElement.appendChild(solutionDetails);


		// feedback container
		if (hintContainer) {
			const hintDetails = document.createElement("details");
			hintDetails.style.marginTop = "10px";

			const hintSummary = document.createElement("summary");
			hintSummary.textContent = "Get Feedback";
			hintSummary.style.cursor = "pointer";

			hintDetails.appendChild(hintSummary);
			hintDetails.appendChild(hintContainer);

			messageElement.appendChild(hintDetails);
		}

	}

}


function escapeHtml(text) {
	const div = document.createElement("div");
	div.textContent = text;
	return div.innerHTML;
}

function getTestcasesContainer(form, inputArray, outputArray, actualOutput ) {
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

		const diff = diffCheckExercises(expected, actual);

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

function diffCheckExercises(expected, actual) {
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

