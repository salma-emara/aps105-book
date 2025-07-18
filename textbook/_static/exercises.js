


function createTitle(form, ex) {
	const title = document.createElement('h6');
	title.textContent = `${ex.title} [${ex.difficulty}]`;
	title.style.marginTop = "10px";
	title.style.fontWeight = "bold";
	form.appendChild(title);
}


function generate_exercises(filename) {
	const container = document.currentScript.parentElement;
	container.innerHTML = '';

	const exercises = parsedObject.exercises;

	let inMultipart = false;

	for (let i = 0; i < exercises.length; i++) {
		const ex = exercises[i];

		const form = document.createElement('div');
		form.className = 'exercise-card';
		form.id = `exercise-${i}`; 
		const storageKey = `${filename}-${form.id}`; 

		if (!ex.multipart) {
			inMultipart = false;

			createTitle(form, ex);
	
		} else if (ex.multipart && !inMultipart){
			// First part of multipart
			inMultipart = true;

			createTitle(form, ex);
			const multipartIndexes = [];
			for (let j = i; j < exercises.length && exercises[j].multipart; j++) {
				multipartIndexes.push(j);
			}
		} 

		const submitButton = document.createElement("button");
		submitButton.type = "button";
		submitButton.innerHTML = "Submit";
		submitButton.classList.add("submit-button");

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
			form.appendChild(pre);

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
				label.innerHTML = `${String.fromCharCode(65 + j)}) ${choiceText}`;

				const container = document.createElement("div");
				container.classList.add("choicesContainer");
				container.appendChild(input);
				container.appendChild(label);

				choicesElement.appendChild(container);
			}

			form.appendChild(choicesElement);

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
			form.appendChild(table);
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

			console.log(`${storageKey}-programming`);

			if (progData) {
				console.log("Found prog", progData.userCode);
				codeRunner.textContent = progData.userCode; 
			} else {
				console.log("could not find prog");
				codeRunner.textContent = starterCode;
			}

			pre.appendChild(codeRunner);
			form.appendChild(pre);

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

			form.appendChild(traceTextarea);
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

			form.appendChild(textbox);
			userInputElement = textbox;
		}

		const resetButton = document.createElement("button");
		resetButton.type = "button";
		resetButton.textContent = "Reset";
		resetButton.classList.add("reset-exercises-button");

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
			resultMessage.innerHTML = "<em>Your result will appear here.</em>";

		});

		const buttonContainer = document.createElement("div");
		buttonContainer.style.display = "flex";
		buttonContainer.style.justifyContent = "space-between";
		buttonContainer.style.alignItems = "center";
		buttonContainer.style.marginTop = "10px";

		buttonContainer.appendChild(submitButton);
		buttonContainer.appendChild(resetButton);
		form.appendChild(buttonContainer);


		const resultMessage = document.createElement("div");
		resultMessage.style.marginTop = "10px";
		resultMessage.style.marginBottom = "20px";
		resultMessage.style.padding = "10px";
		resultMessage.style.border = "1px dashed #999";
		resultMessage.style.borderRadius = "5px";
		resultMessage.style.backgroundColor = "#fafafa";
		resultMessage.innerHTML = "<em>Your result will appear here.</em>";
		form.appendChild(resultMessage);


		submitButton.addEventListener("click", async function () {

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

			let correctAnswerRaw = ex.answer || ex["answer-code"] || "";

			const correctAnswer = (typeof correctAnswerRaw === "string") ? correctAnswerRaw.trim() : correctAnswerRaw;

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

			} else {
				handle_output_submission(form, resultMessage, type, correctAnswer, ex);
			}
		});

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

function handle_output_submission(form, messageElement, questionType, correctAnswer, exercise) {
	const traceInput = form.querySelector(".trace-textarea") || form.querySelector(".explaination-textarea");
	const userAnswer = traceInput ? traceInput.value.trim() : "";

	if (exercise.table) {
		const solutionTableHTML = buildFilledTableHTML(exercise.headers, exercise.answer);

		updateResultMessage(messageElement, true, questionType, {
			solutionTableHTML
		});

		return;
	}

	if (!userAnswer) {
		updateResultMessage(messageElement, false, questionType, correctAnswer, "Please enter your answer before submitting.");
		return;
	}

	let isCorrect = false;

	if (questionType === "tracing") {
		isCorrect = normalizeOutput(userAnswer) === normalizeOutput(correctAnswer);
	}

	updateResultMessage(messageElement, isCorrect, questionType, correctAnswer);
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

        if (questionType === "function programming" && studentCode) {
            const mainInfoTitle = document.createElement("div");
            mainInfoTitle.style.marginTop = "10px";
            mainInfoTitle.style.fontWeight = "bold";
            mainInfoTitle.innerText = "Appended main function to student code:";

            const codeBlock = document.createElement("pre");
            codeBlock.textContent = studentCode;

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
    } else if (questionType === "textbox" || questionType === "explaination") {
		if (correctAnswer && typeof correctAnswer === "object" && correctAnswer.solutionTableHTML) {
			messageElement.innerHTML = `
				<span style="color: #edb313;">Compare your answer with the suggested solution below</span>
				<div style="margin-top: 10px;">
					${correctAnswer.solutionTableHTML}
				</div>
			`;
		} else {
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

