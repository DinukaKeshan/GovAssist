import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    department: { type: String, required: true },
    assignedComplaints: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Complaint" },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Agent", agentSchema);
