import { useState } from "react";

function ChatInput({ onSendMessage, disabled = false }) {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedInput = input.trim();

    if (!trimmedInput || disabled) {
      return;
    }

    onSendMessage(trimmedInput);
    setInput("");
  };

  return (
    <form className="chat-input-area" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="scrappy-message">
        Message Scrappy AI
      </label>

      <input
        id="scrappy-message"
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder={disabled ? "Scrappy is thinking..." : "Write a message"}
        maxLength={1000}
        disabled={disabled}
        autoComplete="off"
      />

      <button
        type="submit"
        disabled={disabled || !input.trim()}
        aria-label="Send message"
      >
        ➤
      </button>
    </form>
  );
}

export default ChatInput;
