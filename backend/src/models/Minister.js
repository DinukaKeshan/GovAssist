import mongoose from "mongoose";

const ministerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    complaints: [{ type: mongoose.Schema.Types.ObjectId, ref: "Complaint" }],
  },
  { timestamps: true }
);

export default mongoose.model("Minister", ministerSchema);