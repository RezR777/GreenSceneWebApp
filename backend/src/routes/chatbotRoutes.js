import express from "express";
import {
    sendMessage,
    getChatHistory
} from "../controllers/chatbotController.js";

const router = express.Router();

router.post("/message", sendMessage);
router.get("/history/:userId", getChatHistory);

export default router;