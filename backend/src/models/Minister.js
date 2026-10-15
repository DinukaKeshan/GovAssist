import mongoose from "mongoose";

const ministerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    department: { type: String, required: true },
    monitoredComplaints: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Complaint" },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Minister", ministerSchema);
