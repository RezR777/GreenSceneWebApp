import environment from "../config/environment.js";

/*
  aiService.js

  Provider-agnostic wrapper around LLM chat completion APIs.
  Switch providers by setting AI_PROVIDER=claude or AI_PROVIDER=openai
  in your .env file (defaults to "claude").

  Both provider functions normalize their output to a plain string
  so the rest of the app (chatbotController) never needs to know
  which provider is in use.
*/

// ---- Claude (Anthropic) ----
async function callClaude({ systemPrompt, messages }) {
  if (!environment.ANTHROPIC_API_KEY) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Add it to your backend .env file."
    );
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": environment.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: environment.ANTHROPIC_MODEL,
      max_tokens: 500,
      system: systemPrompt,
      messages: messages.map((m) => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: m.content,
      })),
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Claude API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const textBlock = data.content?.find((block) => block.type === "text");
  return textBlock?.text?.trim() || "Sorry, I couldn't generate a response.";
}

// ---- OpenAI ----
async function callOpenAI({ systemPrompt, messages }) {
  if (!environment.OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY is not set. Add it to your backend .env file."
    );
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${environment.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: environment.OPENAI_MODEL,
      max_tokens: 500,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({
          role: m.role === "bot" ? "assistant" : "user",
          content: m.content,
        })),
      ],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  return (
    data.choices?.[0]?.message?.content?.trim() ||
    "Sorry, I couldn't generate a response."
  );
}

/**
 * Generate a chat response using whichever provider is configured.
 *
 * @param {Object} params
 * @param {string} params.systemPrompt - System/context instructions (e.g. event data, persona).
 * @param {Array<{role: "user"|"bot", content: string}>} params.messages - Conversation history, oldest first.
 * @returns {Promise<string>} The assistant's reply text.
 */
export async function generateChatResponse({ systemPrompt, messages }) {
  const provider = environment.AI_PROVIDER.toLowerCase();

  if (provider === "openai") {
    return callOpenAI({ systemPrompt, messages });
  }

  // default to claude
  return callClaude({ systemPrompt, messages });
}
