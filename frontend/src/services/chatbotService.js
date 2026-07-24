import api from "./api";

export async function sendMessage(messages, events = []) {
  const response = await api.post("/chatbot", {
    messages,
    events,
  });

  return response.data;
}