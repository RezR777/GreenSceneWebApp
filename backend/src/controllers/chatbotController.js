import mongoose from "mongoose";
import ChatSession from "../models/ChatSession.js";
import Event from "../models/Event.js";
import { generateChatResponse } from "../services/aiService.js";

const SYSTEM_PERSONA = `You are Scrappy AI, the friendly campus event assistant for GreenScene,
a University of North Texas (UNT) campus event discovery platform. You help
students find events, understand RSVPs, and learn about student organizations.

Guidelines:
- Be concise, warm, and helpful. Keep replies short (2-4 sentences) unless asked for detail.
- Only recommend events from the "Upcoming approved events" list below. Never invent events.
- If nothing in the list matches what the student is asking about, say so honestly and
  suggest they check the Explore Events page for the full list.
- You cannot RSVP on behalf of a student; direct them to the event page's RSVP button.`;

// Build a compact, token-friendly summary of real upcoming events for grounding
async function buildEventContext() {
  const upcomingEvents = await Event.find({
    status: "approved",
    date: { $gte: new Date() },
  })
    .sort({ date: 1 })
    .limit(25)
    .lean();

  if (upcomingEvents.length === 0) {
    return "Upcoming approved events: none currently in the system.";
  }

  const lines = upcomingEvents.map((event) => {
    const dateStr = event.date
      ? new Date(event.date).toLocaleString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })
      : "date TBD";

    const tags = event.tags?.length ? ` [${event.tags.join(", ")}]` : "";

    return `- "${event.title}" — ${dateStr} @ ${event.location || "location TBD"}${tags}: ${
      event.description || "No description provided."
    }`;
  });

  return `Upcoming approved events:\n${lines.join("\n")}`;
}

export const sendMessage = async (req, res) => {
  try {
    const { message, sessionId, userId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message text is required.",
      });
    }

    // Find an existing session, or start a new one
    let session = null;

    if (sessionId && mongoose.Types.ObjectId.isValid(sessionId)) {
      session = await ChatSession.findById(sessionId);
    }

    if (!session) {
      session = new ChatSession({
        user: userId && mongoose.Types.ObjectId.isValid(userId) ? userId : undefined,
        messages: [],
      });
    }

    session.messages.push({ role: "user", content: message });

    const eventContext = await buildEventContext();
    const systemPrompt = `${SYSTEM_PERSONA}\n\n${eventContext}`;

    let botResponse;
    try {
      botResponse = await generateChatResponse({
        systemPrompt,
        messages: session.messages,
      });
    } catch (aiError) {
      console.error("AI provider error:", aiError.message);
      botResponse =
        "I'm having trouble reaching my AI brain right now — please try again in a moment. (If you're the developer: check your AI_PROVIDER and API key setup in the backend .env file.)";
    }

    session.messages.push({ role: "bot", content: botResponse });
    await session.save();

    res.json({
      success: true,
      sessionId: session._id,
      userMessage: message,
      botResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.json({ success: true, messages: [] });
    }

    const session = await ChatSession.findOne({ user: userId }).sort({
      updatedAt: -1,
    });

    res.json({
      success: true,
      sessionId: session?._id || null,
      messages: session?.messages || [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
