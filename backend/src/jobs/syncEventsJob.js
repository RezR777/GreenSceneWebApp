import cron from "node-cron";
import Event from "../models/Event.js";
import { syncEventToGoogleCalendar } from "../services/services.js";

const syncEventJob = () => {

  cron.schedule("0 0 * * *", async () => {

        console.log("GreenScene Event Sync has started...");

        try {

              const events = await Event.find({
                date: { $gte: new Date() }
              });

              for (const event of events) {

                await syncEventToGoogleCalendar(event);

              }

              console.log('Synchronization sucessful $(events.length) events.');
        } catch (error) {

              console.error("Synchronization has failed:", error.message);
        }
  });

};

export default syncEventsJob;
