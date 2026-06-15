import mongoose from "mongoose";

/*
  For RSVP model:
      - Tracks which user(s) are attending any event
      - Supports both status for "interested" or "attending"
*/

const RSVPSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },

    stauts: {
      type: String,
      enum: ["attending", "interested"],
      default: "attending"
    }
  },
  { timestamps: true }
  );

export default mongoose.model("RSVP", RSVPSchema);
