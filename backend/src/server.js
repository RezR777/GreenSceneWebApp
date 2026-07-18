import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";
import syncEventsJob from "./jobs/syncEventsJob.js";


dotenv.config();

const PORT = process.env.PORT || 5000;

// Establish connection to MongoDB
connectDB();

syncEventsJob(); // Start event synchronization job

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
