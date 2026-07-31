import { useState } from "react";
import ChatWindow from "./ChatWindow";
import { sendMessage } from "../../services/chatbotService";
import "./Chatbot.css";

function ChatWidget({ pageMode = false }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm Scrappy, your GreenScene event assistant. Ask me about upcoming campus events, RSVPs, or student organizations!",
    },
  ]);
  const [sessionId, setSessionId] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async (userText) => {
    const userMessage = { sender: "user", text: userText };
    setMessages((previousMessages) => [...previousMessages, userMessage]);
    setIsSending(true);

    try {
      const response = await sendMessage(userText, sessionId);
      const { botResponse, sessionId: newSessionId } = response.data;

      if (newSessionId) {
        setSessionId(newSessionId);
      }

      setMessages((previousMessages) => [
        ...previousMessages,
        { sender: "bot", text: botResponse },
      ]);
    } catch (error) {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          sender: "bot",
          text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={pageMode ? "chatbot-page-wrapper" : "chatbot-widget-wrapper"}>
      <ChatWindow
        messages={messages}
        onSendMessage={handleSendMessage}
        isSending={isSending}
      />
    </div>
  );
}

export default ChatWidget;
