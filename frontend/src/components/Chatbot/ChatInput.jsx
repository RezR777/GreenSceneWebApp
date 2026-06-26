import { useState } from "react";

function ChatInput({ onSendMessage }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.trim() === "") return;

    onSendMessage(input);
    setInput("");
  };

  return (
    <form className="chat-input-area" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write a message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button type="submit" aria-label="Send message">
        ➤
      </button>
    </form>
  );
}

export default ChatInput;
