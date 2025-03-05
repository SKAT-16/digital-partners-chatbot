class Chatbot {
  constructor() {
    this.chatbotWindow = document.getElementById("chatbot-window");
    this.userQueryInput = document.getElementById("userQuery");
    this.chatMessages = document.getElementById("chat-messages");
    this.inputHint = document.getElementById("input-hint");

    this.initEventListeners();
  }

  initEventListeners() {
    this.userQueryInput.addEventListener("focus", () => this.showInputHint());
    this.userQueryInput.addEventListener("blur", () => this.hideInputHint());
    this.userQueryInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.askChatbot();
      }
    });
  }

  toggleChatbot() {
    const isHidden = this.chatbotWindow.classList.contains("hidden");

    if (isHidden) {
      this.chatbotWindow.classList.remove("hidden");
      this.chatbotWindow.classList.add("animate-slide-in");
      document.body.style.overflow = "hidden"; // Prevent body scrolling
    } else {
      this.chatbotWindow.classList.add("hidden");
      this.chatbotWindow.classList.remove("animate-slide-in");
      document.body.style.overflow = ""; // Restore body scrolling
    }
  }

  showInputHint() {
    this.inputHint.classList.remove("opacity-0");
    this.inputHint.classList.add("opacity-100");
  }

  hideInputHint() {
    this.inputHint.classList.remove("opacity-100");
    this.inputHint.classList.add("opacity-0");
  }

  askChatbot() {
    const userQuery = this.userQueryInput.value.trim();
    if (!userQuery) return;

    this.addUserMessage(userQuery);
    this.userQueryInput.value = ""; // Clear input

    // Send request
    fetch("./api/chatbot.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "query=" + encodeURIComponent(userQuery),
    })
      .then((response) => response.json())
      .then((data) => {
        this.addAIMessage(data.response);
      })
      .catch((error) => {
        console.error("Error:", error);
        this.addErrorMessage();
      });
  }

  addUserMessage(message) {
    const userMessageDiv = document.createElement("div");
    userMessageDiv.className = "flex justify-end animate-slide-in";
    userMessageDiv.innerHTML = `
      <div class="bg-primary text-white p-3 rounded-xl rounded-br-none max-w-[80%] shadow-md">
        ${message}
      </div>
    `;
    this.chatMessages.appendChild(userMessageDiv);
    this.scrollToBottom();
  }

  addAIMessage(message) {
    const aiMessageDiv = document.createElement("div");
    aiMessageDiv.className = "flex items-start space-x-3 animate-slide-in";
    aiMessageDiv.innerHTML = `
      <div class="bg-primary-50 text-primary-800 p-3 rounded-xl rounded-tl-none max-w-[80%] shadow-sm">
        ${message}
      </div>
    `;
    this.chatMessages.appendChild(aiMessageDiv);
    this.scrollToBottom();
  }

  addErrorMessage() {
    const errorMessageDiv = document.createElement("div");
    errorMessageDiv.className = "flex items-start space-x-3 animate-slide-in";
    errorMessageDiv.innerHTML = `
      <div class="bg-red-50 text-red-800 p-3 rounded-xl rounded-tl-none max-w-[80%] shadow-sm">
        Sorry, something went wrong. Please try again.
      </div>
    `;
    this.chatMessages.appendChild(errorMessageDiv);
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }
}

// Initialize the chatbot
const chatbot = new Chatbot();