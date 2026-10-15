import mongoose from "mongoose";

const citizenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    complaints: [{ type: mongoose.Schema.Types.ObjectId, ref: "Complaint" }],
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Complaint" }],
  },
  { timestamps: true }
);

export default mongoose.model("Citizen", citizenSchema);
