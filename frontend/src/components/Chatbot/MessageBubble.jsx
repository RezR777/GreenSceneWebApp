import GreenSceneAIBot from "../../assets/icons/GreenSceneAIBot.png";

function MessageBubble({ sender, text }) {
  const isBot = sender === "bot";

  return (
    <div className={`message-row ${isBot ? "bot-row" : "user-row"}`}>
      {isBot && (
        <img
          src={GreenSceneAIBot}
          alt="GreenScene AI Bot"
          className="chatbot-avatar"
        />
      )}

      <div className={`message-bubble ${isBot ? "bot-message" : "user-message"}`}>
        {text}
      </div>
    </div>
  );
}

export default MessageBubble;
