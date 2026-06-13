import express from "express";

import {
    createEvent,
    getEvents,
    getEventById
} from "../controllers/eventController.js";

const router = express.Router();

router.post("/", getEvents);
router.get("/:id", getEventById);
router.post("/create", createEvent);

export default router;