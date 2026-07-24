import express from "express";

import { sendChatMessage } from "../controllers/chatbotController.js";
import authMiddleware from "../middleware/authMiddle.js";

const router = express.Router();

router.post("/", authMiddleware, sendChatMessage);

export default router;