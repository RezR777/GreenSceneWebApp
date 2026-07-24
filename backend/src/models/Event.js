import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Contains both the date and start time.
    date: {
      type: Date,
      required: true,
    },

    durationMinutes: {
      type: Number,
      default: 60,
      min: 15,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    googleMapsLink: {
      type: String,
      default: "",
    },

    participants: {
      type: [String],
      default: [],
    },

    notifyParticipants: {
      type: Boolean,
      default: false,
    },

    tags: {
      type: [String],
      default: [],
    },

    // We will use a default picture until real file uploading is added.
    flyerUrl: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Event", eventSchema);