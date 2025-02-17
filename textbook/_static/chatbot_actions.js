// ################################
// Initlaize Variables
// ################################
var is_followup = false;
var is_pre_chat_rendered = false;
if (sessionStorage.getItem("userData") === null) {
  sessionStorage.setItem(
    "userData",
    JSON.stringify({
      contexts: [],
      latest_new_question: "",
      messages: [],
      sessionID: generateUUID(),
    })
  );
}

// ################################
// Initlaize Variables End
// ################################

// ################################
// Utility Functions
// ################################
function getReferenceHTML(chapterNumber, chapterName, sectionName) {
  const validSections = [
    "pointers-to-data-structure",
    "goldbach-conjecture-example",
    "math-library",
    "what-are-arrays",
    "main-memory",
    "sequential-search",
    "recursion-math",
    "debugging-loops",
    "why-how-dynamic-alloc",
    "exercises",
    "do-while",
    "pass-2d-functions",
    "form-linked-list",
    "what-are-strings",
    "storing-data",
    "scope",
    "bubble-sort",
    "binary-search-trees-functions",
    "recursion-in-patterns",
    "how-to-use-pointers",
    "2d-dynamic-memory-alloc",
    "delete-nodes",
    "why-linked-lists",
    "data-types",
    "nested-loops",
    "array-of-strings",
    "simple-C-code",
    "why-arrays",
    "quick-sort",
    "why-pointers",
    "operations",
    "arrays-functions",
    "what-are-binary-trees",
    "string-functions",
    "variable-scope",
    "what-are-pointers",
    "nested-if",
    "functions",
    "multiple-conditions",
    "basic-structure",
    "binary-search",
    "pass-more-values",
    "why-2d",
    "input-output-strings",
    "insertion-sort",
    "intro",
    "dev-cycle",
    "selection-sort",
    "for-loop",
    "communicate-from-function",
    "while",
    "what-data-structure",
    "random-number",
    "recursion-in-arrays",
    "if-statement",
    "insert-find-observe-into-linkedlist",
  ];
  if (!validSections.includes(sectionName)) {
    return "";
  }
  chapterNumber = validateChapterNum(chapterNumber);
  const baseURL = window.location.origin;
  const url =
    baseURL +
    "/chapters/" +
    chapterNumber +
    "-" +
    chapterName +
    "/" +
    sectionName +
    ".html";
  return `<a href=${url}>${reformatChapterNumber(
    chapterNumber
  )} - ${firstletterUpperCase(chapterName)}: ${firstletterUpperCase(
    sectionName,
    (splitChar = "-")
  )}</a>`;
}

function setLatestReference(chapterNumber, chapterName, sectionName, index) {
  if (sessionStorage.getItem("latestReference") === null) {
    sessionStorage.setItem(
      "latestReference",
      JSON.stringify([{ chapterName, chapterNumber, sectionName, index }])
    );
  } else {
    const latestReference = JSON.parse(
      sessionStorage.getItem("latestReference")
    );
    latestReference.push({ chapterName, chapterNumber, sectionName, index });
    sessionStorage.setItem("latestReference", JSON.stringify(latestReference));
  }
}

function reformatChapterNumber(chapterNumber) {
  // chapterNumber: "chapter01" -> "Chapter 01"
  var chapter = chapterNumber.slice(0, -2);
  var number = chapterNumber.slice(-2);

  chapter = chapter.charAt(0).toUpperCase() + chapter.slice(1);
  return chapter + " " + number;
}

function firstletterUpperCase(string, splitChar = " ") {
  const words = string.split(splitChar);
  words.forEach((word, index) => {
    words[index] = word.charAt(0).toUpperCase() + word.slice(1);
  });
  return words.join(splitChar);
}

function checkIfValidChapter(chapterNumber) {
  const regex = /^chapter\d{2}$/;
  return regex.test(chapterNumber);
}

function validateChapterNum(chapterNum) {
  if (checkIfValidChapter(chapterNum)) {
    return chapterNum;
  } else {
    var number = chapterNum.match(/\d+/);
    number = parseInt(number);
    if (number < 10) {
      return `chapter0${number}`;
    } else {
      return `chapter${number}`;
    }
  }
}

function escapeLatex(latexString) {
  return latexString.replace(/\\/g, "\\\\");
}

function setInputMode(mode) {
  const input = document.getElementById("userInput");
  input.disabled = mode;
}

function resetSessionData() {
  const sessionID = JSON.parse(sessionStorage.getItem("userData"))["sessionID"];
  updateUserDataInSessionStorage([], [], "", sessionID);
}
function generateUUID() {
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function updateUserDataInSessionStorage(
  messages,
  contexts,
  latest_new_question,
  sessionID
) {
  const userData = {
    contexts,
    latest_new_question,
    messages,
    sessionID,
  };
  sessionStorage.setItem("userData", JSON.stringify(userData));
}

function wait(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

// ################################
// Utility Functions End
// ################################

// ################################
// Action Functions
// ################################

function renderPrevChats() {
  // Render the saved messages
  if (!is_pre_chat_rendered) {
    var curr_userData = JSON.parse(sessionStorage.getItem("userData"));
    var messages = curr_userData["messages"];
    const references = JSON.parse(sessionStorage.getItem("latestReference"));
    for (let i = 0; i < messages.length; i++) {
      if (messages[i]["role"] === "user") {
        createUserMessage(messages[i]["content"]);
      } else if (messages[i]["role"] === "assistant") {
        createBotMessage(messages[i]["content"], true);
        references.forEach((reference) => {
          if (reference.index === i) {
            createReference(
              reference.chapterName,
              reference.chapterNumber,
              reference.sectionName
            );
          }
        });
      }
      if (i == messages.length - 1 && messages[i]["role"] == "assistant") {
        createChooseButtons();
      } else if (i == messages.length - 1 && messages[i]["role"] == "user") {
        setInputMode(true);
        getResponse();
      }
    }
    is_pre_chat_rendered = true;
  }
  scrollToBottom();
}
function pushMessage(message, role) {
  // Push the message to sessionStorage
  // userData.messages.push({ role: role, content: message });
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  var messages = userData["messages"];
  messages.push({ role: role, content: message });
  updateUserDataInSessionStorage(
    messages,
    userData["contexts"],
    userData["latest_new_question"],
    userData["sessionID"]
  );
}

function submit() {
  // Get input element
  var input = document.getElementById("userInput");
  if (input.value === "") {
    return;
  }
  const user_query = input.value;

  // Reset Input
  input.value = "";
  input.disabled = true;
  // Create user message
  createUserMessage(user_query);

  // Push user message
  pushMessage(user_query, "user");

  // Update the latest question if is not a follow up
  if (!is_followup) {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    updateUserDataInSessionStorage(
      userData["messages"],
      userData["contexts"],
      user_query,
      userData["sessionID"]
    );
  }

  // Fetch message
  getResponse();
}

function getResponse() {
  createLoading();
  scrollToBottom();
  const url = "https://aps105.ece.utoronto.ca";
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  fetchRetry(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userData, message_is_followup: is_followup }),
  })
    .then((response) => response.json())
    .then((data) => {
      removeLoading();
      const { messages, contexts, latest_new_question, sessionID } =
        data.userData;
      const { chapterNumber, chapterName, sectionName } = data.reference;
      const new_message = messages[messages.length - 1].content;
      createBotMessage(new_message, true);
      setLatestReference(
        chapterNumber,
        chapterName,
        sectionName,
        messages.length - 1
      );
      createReference(chapterName, chapterNumber, sectionName);
      createChooseButtons();
      updateUserDataInSessionStorage(
        messages,
        contexts,
        latest_new_question,
        sessionID
      );
    })
    .then(() => {
      scrollToBottom();
    });
}

function fetchRetry(url, options, retries = 3) {
  return fetch(url, options)
    .then((res) => {
      if (res.ok) {
        return res;
      }
      if (retries > 0) {
        return wait(1000).then(() => fetchRetry(url, options, retries - 1));
      } else {
        throw new Error(res);
      }
    })
    .catch((error) => {
      removeLoading();
      createBotMessage("Error: " + error, true);
      scrollToBottom();
      resetSessionData();
      setInputMode(false);
    });
}
// ################################
// Action Functions End
// ################################

// ################################
// Chat
// ################################
function createUserMessage(message) {
  const newDiv = document.createElement("div");
  newDiv.className = "d-flex flex-row justify-content-end mt-3";
  newDiv.id = "user-message";
  newDiv.style.minHeight = "auto";

  const newDiv1 = document.createElement("div");
  newDiv1.innerHTML = `<p class="small p-2 me-0 text-white rounded-3 bg-primary">${message}</p>`;

  newDiv.appendChild(newDiv1);
  document.getElementById("chat").appendChild(newDiv);
}

function createBotMessage(message, is_markdown) {
  const newDiv = document.createElement("div");
  newDiv.className = "d-flex flex-row justify-content-start mt-0";
  newDiv.id = "bot-message";
  if (is_markdown === false) {
    newDiv.style = "height: auto; width: 50%;";
  } else {
    newDiv.style = "height: auto;";
  }
  const newDiv1 = document.createElement("div");
  newDiv1.style = "width: 100%;";
  if (!is_markdown) {
    const paragraph = document.createElement("p");
    paragraph.textContent = message;
    paragraph.className = "small p-2 me-0 mb-5 rounded-3 bg-body-tertiary";
    newDiv1.appendChild(paragraph);
  } else {
    const markdownBlock = document.createElement("div");
    const htmlContent = marked.parse(message);
    markdownBlock.innerHTML = htmlContent;
    renderMathInElement(markdownBlock, {
      delimiters: [
        { left: "$$", right: "$$", display: true }, // Block math using $$...$$
        { left: "$", right: "$", display: false }, // Inline math using $...$
      ],
      throwOnError: false, // Prevent errors from stopping rendering
    });
    newDiv1.appendChild(markdownBlock);
  }

  newDiv.appendChild(newDiv1);

  const parent = document.getElementById("chat");
  parent.appendChild(newDiv);
}

function createChooseButtons() {
  // Create New Question and Follow Up question
  const newDiv = document.createElement("div");
  newDiv.className = "justify-content-start mt-3";
  newDiv.id = "bot-message-choose";
  newDiv.style.height = "auto";

  const newDiv1 = document.createElement("div");
  newDiv1.className = "d-flex flex-row";
  newDiv1.style.gap = "10px";

  const buttons = [
    { text: "followup", id: "followup-question" },
    { text: "New Question", id: "new-question" },
  ];

  buttons.forEach(({ text, id }) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-primary";
    btn.textContent = text;
    btn.id = id;
    btn.onclick = () => handleChooseButtonClick(id);
    newDiv1.appendChild(btn);
  });

  newDiv.appendChild(newDiv1);
  document.getElementById("chat").appendChild(newDiv);
  setInputMode(true);
}

function createReference(chapterName, chapterNumber, sectionName) {
  const newDiv = document.createElement("div");
  newDiv.className = "justify-content-start mt-0 rounded-3 shadow-2-strong";
  newDiv.style.backgroundColor = "#f8f9fa";
  newDiv.id = "reference";

  var text = "Read more in: <br/>";

  sectionName.forEach((name) => {
    const reference = getReferenceHTML(chapterNumber, chapterName, name);
    if (reference !== "") {
      text += reference + "<br/>";
    }
  });
  if (text === "Read more in: <br/>") {
    return;
  }
  const paragraph = document.createElement("p");
  paragraph.className = "p-2 me-0 justify-content-center";
  paragraph.id = "reference";
  paragraph.innerHTML = text;
  newDiv.appendChild(paragraph);
  document.getElementById("chat").appendChild(newDiv);
}

function handleChooseButtonClick(buttonID) {
  // Handle the click of followup or new question
  setInputMode(false);

  const buttons = document.getElementById("bot-message-choose");
  buttons.remove();
  if (buttonID === "followup-question") {
    is_followup = true;
  } else {
    is_followup = false;
  }
}

function createLoading() {
  // Create loading animation
  const div = document.createElement("div");
  div.className = "loader";
  div.id = "loading";
  const parent = document.getElementById("chat");
  parent.appendChild(div);
}

function removeLoading() {
  // Remove loading animation
  const loadingDiv = document.getElementById("loading");
  loadingDiv.remove();
}

function scrollToBottom() {
  // Scroll to the bottom of the chat
  const parent = document.getElementById("chat");
  setTimeout(() => {
    parent.scrollTop = parent.scrollHeight;
  }, 500);
}

// Actions
function showChat() {
  const chatBox = document.getElementById("chat-box");
  // chatBox.style.display = "block";
  chatBox.classList.remove("hide");
  chatBox.classList.add("show");

  // Hides the button
  const chatBtn = document.getElementById("chat-btn");
  chatBtn.classList.remove("show");
  chatBtn.classList.add("hide");

  var input = document.getElementById("userInput");
  // Add Enter key to submit
  input.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
      event.preventDefault();
      document.getElementById("btn-submit").click();
    }
  });
  renderPrevChats();
}

function clearChat() {
  // Deletes the messages and hide the chat
  const chats = document.getElementById("chat");
  chats.innerHTML = "";
  // Make sure input is enabled
  setInputMode(false);
  // Reset Chat history
  const sessionID = JSON.parse(sessionStorage.getItem("userData"))["sessionID"];
  updateUserDataInSessionStorage([], [], "", sessionID);
  sessionStorage.setItem("latestReference", JSON.stringify([]));
}

function closeChat() {
  // Clear the chatbox
  clearChat();
  // Hide the chatbox
  hideChat();
}

function hideChat() {
  // Hides the chat only
  const chatBox = document.getElementById("chat-box");
  chatBox.classList.add("hide");

  // Show the button
  const chatBtn = document.getElementById("chat-btn");
  chatBtn.classList.remove("hide");
  chatBtn.classList.add("show");
}

// ################################
// Chat
// ################################
