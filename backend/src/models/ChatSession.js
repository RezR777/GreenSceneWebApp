import mongoose from "mongoose";

const ChatSessionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        messages: [
            {
                role: String,
                content: String,
                timestamp: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
    },
    {
        timestamps: true
    });

export default mongoose.model("ChatSession", ChatSessionSchema);