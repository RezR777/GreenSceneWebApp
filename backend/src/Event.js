<<<<<<< HEAD
import mongoose from "mongoose";

/*
For Event Model:
  - Campus events will be stored by the event organizers
  - Admin approval is required before publishing
*/

const EventSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        date: Date,
        location: String,

        // provided Google Map link for navigation
        googleMapsLink: String,

        tags: [String],

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        },

        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
);

export default mongoose.model("Event", EventSchema);
=======
import mongoose from "mongoose";

/*
For Event Model:
  - Campus events will be stored by the event organizers
  - Admin approval is required before publishing
*/

const EventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: Date,
    location: String,

    // provided Google Map link for navigation
    googleMapsLink: String,

    tags: [String],

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
  );

export default mongoose.model("Event", EventSchema);
>>>>>>> f76540c1203a0cbd6d3bfece25190ea9f10794b4
