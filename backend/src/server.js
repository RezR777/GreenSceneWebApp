import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";
/* removed 'import syncEventsJob from "./jobs/syncEventsJob.js";' because server would crash
* We can re-add it later when we have a working syncEventsJob.js file.
* This is for the google maps API integration.
*/

dotenv.config();

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();