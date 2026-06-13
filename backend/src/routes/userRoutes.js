import express from "express";
import {
    getProfile,
    updateProfile,
    getSavedEvents
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", getProfile);
router.put("/:id", updateProfile);
router.get("/:id/saved-events", getSavedEvents);

export default router;