import Citizen from "../models/Citizen.js";
import Complaint from "../models/Complaint.js";
import Department from "../models/Department.js";
import { classifyComplaint } from "../rag/classifier.js";
import { predictPriority } from "../ml/priorityModel.js"; // 🔥 ML function

export const createComplaint = async (req, res) => {
  try {
    // ✅ 1. Get or create citizen
    let citizen = await Citizen.findOne({ user: req.user._id });
    if (!citizen) {
      citizen = await Citizen.create({
        user: req.user._id,
        complaints: [],
        votes: [],
      });
    }

    // ✅ 2. Fetch all departments
    const departments = await Department.find();

    // ✅ 3. AI classify complaint to a department
    const matchedDepartmentName = await classifyComplaint(
      req.body.description,
      departments
    );

    const matchedDepartment = departments.find(
      d => d.name.toLowerCase() === matchedDepartmentName
    );

    console.log("AI matched:", matchedDepartmentName);

    // ✅ 4. Predict priority using ML model
    const priority = await predictPriority(req.body.description);
    console.log("Predicted priority:", priority);

    // ✅ 5. Create complaint with department & priority
    const complaint = await Complaint.create({
      citizen: citizen._id,
      name: req.body.name,
      description: req.body.description,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      department: matchedDepartment ? matchedDepartment._id : null,
      priority: priority || "MEDIUM", // default MEDIUM if prediction fails
      thirdParty: {
        name: req.body.thirdPartyName,
        phoneNumber: req.body.thirdPartyPhoneNumber,
        address: req.body.thirdPartyAddress,
      },
    });

    // ✅ 6. Add complaint to citizen
    citizen.complaints.push(complaint._id);
    await citizen.save();

    // ✅ 7. Send response
    res.status(201).json({
      message: "Complaint created",
      assignedDepartment: matchedDepartment?.name || "Not matched",
      priority: complaint.priority,
      complaint,
    });

  } catch (err) {
    console.error("Create complaint error:", err);
    res.status(500).json({ message: "Failed to create complaint" });
  }
};
