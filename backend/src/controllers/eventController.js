import mongoose from "mongoose";
import Event from "../models/Event.js";

function normalizeList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      durationMinutes,
      location,
      googleMapsLink,
      participants,
      notifyParticipants,
      tags,
      flyerUrl,
    } = req.body;

    if (!title || !description || !date || !location) {
      return res.status(400).json({
        success: false,
        message: "Title, description, date, and location are required.",
      });
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "The supplied event date is invalid.",
      });
    }

    const event = await Event.create({
      title: title.trim(),
      description: description.trim(),
      date: parsedDate,
      durationMinutes: Number(durationMinutes) || 60,
      location: location.trim(),
      googleMapsLink: googleMapsLink?.trim() || "",
      participants: normalizeList(participants),
      notifyParticipants: notifyParticipants === true,
      tags: normalizeList(tags),
      flyerUrl: flyerUrl?.trim() || "",

      /*
       * Temporary demo behavior:
       * Immediately publish newly created events.
       *
       * Change this back to "pending" when admin approval page is connected
       */
      status: "approved",
    });

    return res.status(201).json({
      success: true,
      event,
    });
  } catch (error) {
    console.error("Create event error:", error);

    return res.status(500).json({
      success: false,
      message: "The event could not be created.",
    });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({
      status: "approved",
    }).sort({
      date: 1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    console.error("Get events error:", error);

    return res.status(500).json({
      success: false,
      message: "Events could not be loaded.",
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID.",
      });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    return res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    console.error("Get event error:", error);

    return res.status(500).json({
      success: false,
      message: "The event could not be loaded.",
    });
  }
};