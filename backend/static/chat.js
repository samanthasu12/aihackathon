const messages = document.getElementById("messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.onclick = async () => {
    const message = userInput.value.trim();
    if (!message) return;

    // Show user message
    addMessage(`You: ${message}`);
    userInput.value = "";

    // Send to backend
    const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
    });
    const data = await res.json();
    addMessage(`Agent: ${data.reply}`);
};

function addMessage(text) {
    const p = document.createElement("p");
    p.textContent = text;
    messages.appendChild(p);
    messages.scrollTop = messages.scrollHeight;
}