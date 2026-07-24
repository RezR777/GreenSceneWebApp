import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

function ChatWindow({
  messages,
  onSendMessage,
  onClose,
  isLoading = false,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  return (
    <section className="chat-window" aria-label="Scrappy AI chat">
      <header className="chat-header">
        <div>
          <h2>Scrappy AI</h2>
          <p>Your GreenScene event assistant</p>
        </div>

        <button
          type="button"
          className="chat-close-button"
          onClick={onClose}
          aria-label="Close Scrappy AI"
        >
          ×
        </button>
      </header>

      <div className="chat-messages" aria-live="polite">
        {messages.map((message, index) => (
          <MessageBubble
            key={`${message.sender}-${index}`}
            sender={message.sender}
            text={message.text}
          />
        ))}

        {isLoading && (
          <div className="message-row bot-row">
            <div className="typing-indicator" aria-label="Scrappy is typing">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <ChatInput
        onSendMessage={onSendMessage}
        disabled={isLoading}
      />
    </section>
  );
}

export default ChatWindow;