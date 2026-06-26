import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema( 
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true
        },

        message: {
            type: String,
            required: true
        },

        read: {
            type: Boolean,
            default: false
        },

        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event"
        }
    },
    {
        timestamps: true
    });

export default mongoose.model("Notification", NotificationSchema);
