import {LettaClient} from "@letta-ai/letta-client"

const client = new LettaClient({"token": "sk-let-ZDAzNGJlMTEtYWYzNy00Y2UwLWJhM2YtMzhhZTI2ZmY4ZjE2Ojk0OGYzYmFlLTc5NzktNDdhOS1hYTk4LWJjN2Y5YjU3OTA4OQ=="})

export const sendToLettaAgent = async (
  message: string,
  userId: string 
): Promise<string> => {
  const response = client.agents.messages.create("agent-ab760a64-5d75-4140-8fe4-29570ef5f79f", {
    messages: [
        {role: "user", content: message},
        {role: "system", content: "Briefly summarize (less than 200 characters) new thoughts and append this to core memory in suggestion_context. Additionally, if restaurants are provided, ensure that they are valid by using the web search tool."}
    ]
  });

  for (let i = 0; i < response.length; i++) {
    if (response[i].message_type == "assistant_message") {
        return response[i].content;
    } 
  }
};
