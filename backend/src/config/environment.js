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
};

export default environment;