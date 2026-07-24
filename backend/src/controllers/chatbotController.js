import { generateChatbotReply } from "../services/chatbotService.js";

function sanitizeMessages(messages) {
  return messages
    .filter((message) => {
      return (
        message &&
        typeof message.text === "string" &&
        ["user", "bot"].includes(message.sender)
      );
    })
    .slice(-14)
    .map((message) => ({
      sender: message.sender,
      text: message.text.trim().slice(0, 1500),
    }))
    .filter((message) => message.text.length > 0);
}

function getErrorStatus(error) {
  const status = Number(error?.status || error?.statusCode);

  return Number.isFinite(status) ? status : null;
}

export async function sendChatMessage(req, res) {
  try {
    const { messages, events = [] } = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).json({
        success: false,
        message: "Messages must be provided as an array.",
      });
    }

    const sanitizedMessages = sanitizeMessages(messages);

    if (sanitizedMessages.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one valid message.",
      });
    }

    const reply = await generateChatbotReply({
      messages: sanitizedMessages,
      events,
    });

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    const status = getErrorStatus(error);
    const errorMessage = String(error?.message || "");
    const upperErrorMessage = errorMessage.toUpperCase();

    console.error("Gemini chatbot request failed:", {
      status,
      message: errorMessage,
    });

    const isRateLimit =
      status === 429 ||
      upperErrorMessage.includes("RESOURCE_EXHAUSTED") ||
      upperErrorMessage.includes("RATE LIMIT");

    if (isRateLimit) {
      return res.status(429).json({
        success: false,
        message:
          "Scrappy has reached the Gemini free-tier limit. Please try again later.",
      });
    }

    const isInvalidKey =
      status === 401 ||
      status === 403 ||
      upperErrorMessage.includes("API_KEY_INVALID") ||
      upperErrorMessage.includes("INVALID API KEY");

    if (isInvalidKey) {
      return res.status(500).json({
        success: false,
        message:
          "The Gemini API key is missing, invalid, or not authorized.",
      });
    }

    if (upperErrorMessage.includes("GEMINI_API_KEY")) {
      return res.status(500).json({
        success: false,
        message:
          "The GEMINI_API_KEY environment variable has not been configured.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Scrappy could not respond right now. Please try again in a moment.",
    });
  }
}