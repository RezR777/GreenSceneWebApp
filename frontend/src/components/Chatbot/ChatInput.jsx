import { useState } from "react";

function ChatInput({ onSendMessage, disabled }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.trim() === "" || disabled) return;

    onSendMessage(input);
    setInput("");
  };

  return (
    <form className="chat-input-area" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={disabled ? "Scrappy is thinking..." : "Write a message"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
      />

      <button type="submit" aria-label="Send message" disabled={disabled}>
        ➤
      </button>
    </form>
  );
}

export default ChatInput;
