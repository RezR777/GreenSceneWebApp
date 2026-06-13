import User from "../models/User.js";

export const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        res.json({
            success: true,
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const updateProfile = async (req, res) => {

    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            success: true,
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const getSavedEvents = async (req, res) => {

    res.json({
        success: true,
        savedEvents: []
    });

};