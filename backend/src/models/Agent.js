import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    agencyName: { type: String, required: true },
    district: { type: String, required: true },
    complaints: [{ type: mongoose.Schema.Types.ObjectId, ref: "Complaint" }],
  },
  { timestamps: true }
);

export default mongoose.model("Agent", agentSchema);