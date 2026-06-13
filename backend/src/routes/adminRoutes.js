import express from "express";
import {
    getPendingEvents,
    approveEvent,
    rejectEvent,
    getAllUsers
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/events/pending", getPendingEvents);
router.put("/events/:id/approve", approveEvent);
router.put("/events/:id/reject", rejectEvent);
router.get("/users", getAllUsers);

export default router;