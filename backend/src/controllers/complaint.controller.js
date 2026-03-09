import Complaint from "../models/Complaint.js";
import Citizen from "../models/Citizen.js";

// Add a new complaint
export const addComplaint = async (req, res) => {
  const { title, description, phoneNumber, address, district, department, priority } = req.body;

  try {
    // Ensure req.user contains the authenticated citizen
    if (!req.user) {
      return res.status(401).json({ error: "Citizen not authenticated" });
    }

    const citizen = req.user; // citizen data should now be in req.user
    if (!citizen) {
      return res.status(404).json({ error: "Citizen not found" });
    }

    // Create a new complaint using the citizen's details and the title
    const newComplaint = new Complaint({
      citizen: citizen._id,
      name: citizen.name,
      email: citizen.email,
      title,
      description,
      phoneNumber,
      address,
      district,
      department,
      priority,
    });

    await newComplaint.save(); // Save the complaint to the database
    res.status(201).json({ message: "Complaint submitted successfully", complaint: newComplaint });
  } catch (error) {
    console.error("Error:", error); // Log the error for debugging
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a complaint
export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    res.json({ message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update the status of a complaint
export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body; // Get the new status from the request body
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // Return the updated complaint
    );

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    res.json({ message: "Complaint status updated", complaint });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Fetch complaints for the authenticated citizen
export const getComplaintsByCitizen = async (req, res) => {
  try {
    const citizenId = req.user.id;  // Get citizen ID from the request user object
    const complaints = await Complaint.find({ citizen: citizenId })
      .populate('department', 'name') // Populate department name
      .exec();

    if (!complaints || complaints.length === 0) {
      return res.status(404).json({ error: "No complaints found" });
    }

    res.json(complaints);  // Send the complaints back as the response
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Fetch complaints for a specific department
export const getComplaintsByDepartment = async (req, res) => {
  const { departmentId } = req.params; // Get department ID from the URL

  try {
    const complaints = await Complaint.find({ department: departmentId }) // Find all complaints for this department
      .populate("department", "name") // Optionally, populate department name
      .exec();

    if (!complaints || complaints.length === 0) {
      return res.status(404).json({ error: "No complaints found for this department" });
    }

    res.json(complaints); // Send the complaints back as the response
  } catch (error) {
    console.error("Error fetching complaints by department:", error);
    res.status(500).json({ error: "Server error" });
  }
};


// Vote for a complaint
export const voteComplaint = async (req, res) => {
  const { complaintId, voteType } = req.body; // voteType can be "upvote" or "downvote"

  try {
    const citizen = req.user; // The authenticated citizen

    if (!citizen) {
      return res.status(401).json({ error: "Citizen not authenticated" });
    }

    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    // Check if the citizen has already voted
    if (complaint.votes.includes(citizen._id)) {
      return res.status(400).json({ error: "You have already voted on this complaint" });
    }

    // Add the citizen to the list of votes
    complaint.votes.push(citizen._id);

    // Save the updated complaint
    await complaint.save();

    // Respond with a success message
    res.json({ message: `Complaint ${voteType}d successfully`, complaint });
  } catch (error) {
    console.error("Error voting on complaint:", error);
    res.status(500).json({ error: "Server error" });
  }
};