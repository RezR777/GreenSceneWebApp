import api from "./api";

// Sends a message to Scrappy AI. Pass the previous sessionId (if any) so the
// backend can continue the same conversation and keep event-grounded context.
export const sendMessage = (message, sessionId) =>
  api.post("/chatbot/message", {
    message,
    sessionId,
  });

export const getChatHistory = (userId) =>
  api.get(`/chatbot/history/${userId}`);
