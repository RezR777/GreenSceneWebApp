import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the GreenScene API"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

export default app;
