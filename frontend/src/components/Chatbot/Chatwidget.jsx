import { useState } from "react";
import ChatWindow from "./ChatWindow";
import "./Chatbot.css";

function ChatWidget({ pageMode = false }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I’m Scrappy, and I’ll be your guide today. How can I help? (For Demo, choose the following: event, rsvp, club, notification, or help)",
    },
  ]);

  const getDemoReply = (userMessage) => {
    const message = userMessage.toLowerCase();

    if (message.includes("event") || message.includes("events")) {
      return "You can explore UNT events by category, date, location, or student organization.";
    }

    if (message.includes("rsvp")) {
      return "To RSVP, open an event page and click the RSVP button. For now, this is a demo response.";
    }

    if (message.includes("club") || message.includes("organization")) {
      return "Student organizations can create, edit, and manage events through GreenScene.";
    }

    if (message.includes("notification") || message.includes("reminder")) {
      return "GreenScene can help remind students about upcoming events they RSVP to.";
    }

    if (message.includes("help")) {
      return "I can help you find events, explain RSVPs, and guide you around GreenScene.";
    }

    return "Sorry, I don't understand that right now. I can answer basic questions about events, RSVPs, reminders, and student organizations.";
  };

  const handleSendMessage = (userText) => {
    const userMessage = {
      sender: "user",
      text: userText,
    };

    const botMessage = {
      sender: "bot",
      text: getDemoReply(userText),
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
      botMessage,
    ]);
  };

  return (
    <div className={pageMode ? "chatbot-page-wrapper" : "chatbot-widget-wrapper"}>
      <ChatWindow messages={messages} onSendMessage={handleSendMessage} />
    </div>
  );
}

export default ChatWidget;
