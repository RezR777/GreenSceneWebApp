import dotenv from "dotenv";

dotenv.config();

const environment = {
    PORT: process.env.PORT || 5000,

    NODE_ENV:
        process.env.NODE_ENV || "development",

    MONGO_URI:
        process.env.MONGO_URI ||

        "mongodb://localhost:27017/greenscene",

    JWT_SECRET:
        process.env.JWT_SECRET ||

        "greenscene-development-secret",

    FRONTEND_URL:
        process.env.FRONTEND_URL ||

        "http://localhost:5173",

    EMAIL_USER:
        process.env.EMAIL_USER,

    EMAIL_PASSWORD:
        process.env.EMAIL_PASSWORD,

    // AI Assistant ("Scrappy AI") config
    // AI_PROVIDER selects which LLM backend to use: "claude" or "openai"
    AI_PROVIDER:
        process.env.AI_PROVIDER || "claude",

    ANTHROPIC_API_KEY:
        process.env.ANTHROPIC_API_KEY,

    ANTHROPIC_MODEL:
        process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6",

    OPENAI_API_KEY:
        process.env.OPENAI_API_KEY,

    OPENAI_MODEL:
        process.env.OPENAI_MODEL || "gpt-4o-mini",
};

export default environment;
