import mongoose from "mongoose";

/* For User Model:
  - stores the accounts for students, organizers, and admin accounts
  - Used to authentication and RBA (Role-Based Access Control)
*/

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,

    // The role determines the permissions within the system
    role: {
      type: string,
      enum: ["student", "organizer", "admin"],
      default: "student"
    }
  },
  { timestamp: true }
);

export default mongoose.model("User", UserSchema);

