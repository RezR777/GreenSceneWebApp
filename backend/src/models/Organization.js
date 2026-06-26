import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        description: String,

        contactEmail: String,

        website: String,

        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        timestamps: true
    });

export default mongoose.model("Organization", OrganizationSchema);