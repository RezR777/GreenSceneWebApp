import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

const app = express();
// Middleware
app.use(cors());
app.use(express.json());

// API Status check
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the GreenScene API"
    });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

export default app;
