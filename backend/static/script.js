document.getElementById("sendBtn").addEventListener("click", async () => {
    const response = await fetch("/api/echo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: "Hello from frontend!" })
    });
    const data = await response.json();
    document.getElementById("output").textContent = JSON.stringify(data, null, 2);
});