import express from "express";
import {
    createRSVP,
    cancelRSVP,
    getEventRSVPs
} from "../controllers/rsvpController.js";

const router = express.Router();

router.post("/", createRSVP);
router.delete("/:id", cancelRSVP);
router.get("/event/:eventId", getEventRSVPs);

export default router;