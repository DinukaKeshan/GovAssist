import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },  // Agent's name
    email: { type: String, required: true, unique: true },  // Agent's email (unique)
    password: { type: String, required: true },  // Agent's password
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },  // Reference to the department the agent belongs to
    complaints: [{ type: mongoose.Schema.Types.ObjectId, ref: "Complaint" }],  // List of complaints associated with the agent
  },
  { timestamps: true }  // Automatically adds createdAt and updatedAt fields
);

export default mongoose.model("Agent", agentSchema);  // Export the Agent model