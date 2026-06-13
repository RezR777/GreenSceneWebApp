import Event from "../models/Event.js";
import User from "../models/User.js";

export const getPendingEvents = async (req, res) => {
    try {
        const events = await Event.find({ status: "pending" });

        res.json({
            success: true,
            events
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const approveEvent = async (req, res) => {
    try {

        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { status: "approved" },
            { new: true }
        );

        res.json({
            success: true,
            event
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const rejectEvent = async (req, res) => {
    try {

        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { status: "rejected" },
            { new: true }
        );

        res.json({
            success: true,
            event
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getAllUsers = async (req, res) => {
    try {

        const users = await User.find();

        res.json({
            success: true,
            users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};