import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
    try {

        const event = await Event.create(req.body);

        res.status(201).json({
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

export const getEvents = async (req, res) => {

    try {

        const events = await Event.find();

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

export const getEventById = async (req, res) => {

    try {

        const event = await Event.findById(req.params.id);

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