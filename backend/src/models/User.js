import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: String, // empty for Google users
    googleId: String,

    role: {
      type: String,
      enum: ["CITIZEN", "AGENT", "MINISTER"],
      default: null, // Google users select role after login
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
