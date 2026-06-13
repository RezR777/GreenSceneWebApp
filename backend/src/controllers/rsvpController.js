import RSVP from "../models/RSVP.js";

export const createRSVP = async (req, res) => {

    try {

        const rsvp = await RSVP.create(req.body);

        res.status(201).json({
            success: true,
            rsvp
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const cancelRSVP = async (req, res) => {

    try {

        await RSVP.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "RSVP cancelled"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const getEventRSVPs = async (req, res) => {

    try {

        const rsvps = await RSVP.find({
            event: req.params.eventId
        });

        res.json({
            success: true,
            count: rsvps.length,
            rsvps
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};