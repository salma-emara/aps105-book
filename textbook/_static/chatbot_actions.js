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
// Util Functions
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
  sessionStorage.setItem(
    "userData",
    JSON.stringify({ contexts, latest_new_question, messages, sessionID })
  );
}

function wait(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

// Chat Bot Functions
// Render the saved messages
function renderPrevChats() {
  if (!is_pre_chat_rendered) {
    var curr_userData = JSON.parse(sessionStorage.getItem("userData"));
    var messages = curr_userData["messages"];
    for (let i = 0; i < messages.length; i++) {
      if (messages[i]["role"] === "user") {
        createUserMessage(messages[i]["content"]);
      } else if (messages[i]["role"] === "assistant") {
        createBotMessage(messages[i]["content"], true);
      }
      if (i == messages.length - 1 && messages[i]["role"] == "assistant") {
        createChooseButtons();
      }
    }
    is_pre_chat_rendered = true;
  }
}
function pushMessage(message, role) {
  // Push the message to sessionStorage
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
  const url = "https://aps105.ece.utoronto.ca/";
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
      const messages = data.userData.messages;
      const contexts = data.userData.contexts;
      const latest_new_question = data.userData.latest_new_question;
      const new_message = messages[messages.length - 1].content;
      createBotMessage(new_message, true);
      createChooseButtons();
      // update userData
      sessionStorage.setItem(
        "userData",
        JSON.stringify({
          contexts: contexts,
          latest_new_question: latest_new_question,
          messages: messages,
          sessionID: data.userData.sessionID,
        })
      );
    })
    .then(() => {
      scrollToBottom();
    })
    .catch((error) => {
      removeLoading();
      createBotMessage("Something went wrong ...", false);
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
    .catch(console.error);
}

// Chat Front End
function createUserMessage(message) {
  const newDiv = document.createElement("div");
  newDiv.className = "d-flex flex-row justify-content-end mt-0";
  newDiv.id = "user-message";
  newDiv.style.minHeight = "auto";

  const newDiv1 = document.createElement("div");
  newDiv1.innerHTML = `<p class="small p-2 me-0 text-white rounded-3 bg-primary">${message}</p>`;

  newDiv.appendChild(newDiv1);
  document.getElementById("chat").appendChild(newDiv);
}

function createBotMessage(message, is_markdown) {
  var message = message.replaceAll("<", "&lt");
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
    newDiv1.innerHTML = `<md-block>${message}</md-block>`;
  }

  newDiv.appendChild(newDiv1);

  const parent = document.getElementById("chat");
  parent.appendChild(newDiv);
}

function createChooseButtons() {
  // Create New Question and Follow Up question
  const newDiv = document.createElement("div");
  newDiv.className = "d-flex flex-row justify-content-start mt-1";
  newDiv.id = "bot-message-choose";
  newDiv.style.height = "auto";

  const newDiv1 = document.createElement("div");
  newDiv1.className = "d-flex flex-row";
  newDiv1.style.gap = "20px";

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
  document.getElementById("userInput").disabled = true;
}

function handleChooseButtonClick(buttonID) {
  // Handle the click of followup or new question
  const input = document.getElementById("userInput");
  input.disabled = false;

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
  parent.scrollTop = parent.scrollHeight;
}

// Actions
function showChat() {
  const chatBox = document.getElementById("chat-box");
  chatBox.classList.remove("hide");
  chatBox.classList.add("show");
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
  // Input is enabled
  const input = document.getElementById("userInput");
  input.disabled = false;
  // Reset Chat history
  const sessionID = JSON.parse(sessionStorage.getItem("userData"))["sessionID"];
  updateUserDataInSessionStorage([], [], "", sessionID);
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
  // chatBox.style.display = "none";
  chatBox.classList.add("hide");
}
