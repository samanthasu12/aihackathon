import os
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv

from letta_client import Letta

load_dotenv()

LETTA_API_KEY = os.getenv("LETTA_API_KEY")
LETTA_AGENT_ID = os.getenv("LETTA_AGENT_ID")

client = Letta(token=LETTA_API_KEY)

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return render_template("chat.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")
    
    response = client.agents.messages.create(
        agent_id=LETTA_AGENT_ID,
        messages=[
            {
                "role": "user",
                "content": user_message
            }, 
            {
                "role": "system",
                "content": "Briefly summarize (less than 200 characters) new thoughts and append this to core memory in suggestion_context. Additionally, if restaurants are provided, ensure that they are valid by using the web search tool."
            }
        ]
    )

    letta_reply = []
    for msg in response.messages:
        if msg.message_type == "assistant_message":
            letta_reply.append("RESPONSE: " + msg.content)
        elif msg.message_type == "reasoning_message":
            letta_reply.append("REASON: " + msg.reasoning)
        elif msg.message_type == "tool_call_message":
            letta_reply.append("USE: " + msg.tool_call.name + " : " + msg.tool_call.arguments)
        elif msg.message_type == "tool_return_message":
            letta_reply.append("RETURN: " + msg.tool_return)

    return jsonify({"reply": letta_reply})

if __name__ == "__main__":
    app.run(debug=True)