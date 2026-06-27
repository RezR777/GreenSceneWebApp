import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

function ChatWindow({ messages, onSendMessage }) {
  return (
    <section className="chat-window">
      <div className="chat-header">
        <div>
          <h1>Scrappy AI</h1>
          <p>Your GreenScene event assistant</p>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            sender={message.sender}
            text={message.text}
          />
        ))}
      </div>

      <ChatInput onSendMessage={onSendMessage} />
    </section>
  );
}

export default ChatWindow;
