import { useState } from "react";

import ChatWindow from "./ChatWindow";
import { sendMessage } from "../../services/chatbotService";
import aiBotIcon from "../../assets/icons/GreenSceneAIBot.png";

import "./Chatbot.css";

const initialMessages = [
  {
    sender: "bot",
    text:
      "Hi! I’m Scrappy, your GreenScene assistant. " +
      "I can help you find campus events, understand event details, and navigate GreenScene.",
  },
];

function ChatWidget({ events = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (userText) => {
    if (isLoading) {
      return;
    }

    const userMessage = {
      sender: "user",
      text: userText,
    };

    const updatedConversation = [...messages, userMessage];

    setMessages(updatedConversation);
    setIsLoading(true);

    try {
      const response = await sendMessage(updatedConversation, events);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          sender: "bot",
          text: response.reply,
        },
      ]);
    } catch (error) {
      console.error("Scrappy AI error:", error);

      const status = error.response?.status;

      let errorMessage =
        "I’m having trouble connecting right now. Please try again in a moment.";

      if (status === 401) {
        errorMessage =
          "Your login session may have expired. Please log in again before using Scrappy.";
      }

      if (status === 429) {
        errorMessage =
          "I’m receiving a lot of questions right now. Please try again shortly.";
      }

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          sender: "bot",
          text: errorMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-widget-wrapper">
      {isOpen ? (
        <ChatWindow
          messages={messages}
          onSendMessage={handleSendMessage}
          onClose={() => setIsOpen(false)}
          isLoading={isLoading}
        />
      ) : (
        <button
          type="button"
          className="chatbot-launcher"
          onClick={() => setIsOpen(true)}
          aria-label="Open Scrappy AI assistant"
        >
          <img src={aiBotIcon} alt="" />
          <span className="chatbot-launcher-label">Ask Scrappy</span>
        </button>
      )}
    </div>
  );
}

export default ChatWidget;