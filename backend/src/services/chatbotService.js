import { GoogleGenAI } from "@google/genai";

const SCRAPPY_INSTRUCTIONS = `
You are Scrappy AI, the built-in assistant for GreenScene,
a University of North Texas campus event application.

Your responsibilities:

- Help students discover GreenScene events.
- Recommend events using only the event data provided.
- Explain event dates, times, locations, categories, and descriptions.
- Explain how to RSVP, save events, create events, and use GreenScene.
- Respond in a friendly, concise, student-focused tone.
- Never invent an event that is not included in the supplied event data.
- If no matching event exists, say that no matching event is currently listed.
- Do not claim to represent UNT officially.
- Keep most answers between one and four short paragraphs.
`;

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY has not been configured.");
  }

  return new GoogleGenAI({
    apiKey,
  });
}

function createEventContext(events) {
  if (!Array.isArray(events) || events.length === 0) {
    return "No GreenScene event records are currently available.";
  }

  const safeEvents = events.slice(0, 30).map((event) => ({
    title: String(event?.title || "Untitled event").slice(0, 150),
    category: String(event?.category || "Uncategorized").slice(0, 100),
    date: String(event?.date || "Date unavailable").slice(0, 100),
    time: String(event?.time || "Time unavailable").slice(0, 100),
    location: String(event?.location || "Location unavailable").slice(0, 150),
    description: String(event?.description || "").slice(0, 500),
  }));

  return JSON.stringify(safeEvents, null, 2);
}

function createConversationText(messages) {
  return messages
    .slice(-14)
    .map((message) => {
      const speaker = message.sender === "bot" ? "Scrappy" : "Student";

      return `${speaker}: ${message.text}`;
    })
    .join("\n\n");
}

export async function generateChatbotReply({ messages, events }) {
  const ai = getGeminiClient();

  const eventContext = createEventContext(events);
  const conversation = createConversationText(messages);

  const interaction = await ai.interactions.create({
    model: process.env.GEMINI_MODEL || "gemini-3.6-flash",

    system_instruction: SCRAPPY_INSTRUCTIONS,

    input: `
CURRENT GREENSCENE EVENT DATA:

${eventContext}

CURRENT CONVERSATION:

${conversation}

Respond to the student's most recent message as Scrappy AI.
`,

    generation_config: {
      thinking_level: "low",
      temperature: 0.5,
    },
  });

  const reply = interaction.output_text?.trim();

  if (!reply) {
    return "I’m sorry, but I wasn’t able to create a response. Please try asking again.";
  }

  return reply;
}