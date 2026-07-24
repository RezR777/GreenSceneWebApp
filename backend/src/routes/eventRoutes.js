import express from "express";

import {
  createEvent,
  getEvents,
  getEventById,
} from "../controllers/eventController.js";

const router = express.Router();

// GET /api/events
router.get("/", getEvents);

// GET /api/events/:id
router.get("/:id", getEventById);

// POST /api/events
router.post("/", createEvent);

router.post("/create", createEvent);

export default router;