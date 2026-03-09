import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Agent from "../models/Agent.js";  // Import Agent model

// Register Agent
export const registerAgent = async (req, res) => {
  const { name, email, password, department } = req.body;

  try {
    // Check if the agent already exists
    const agentExists = await Agent.findOne({ email });
    if (agentExists) {
      return res.status(400).json({ error: "Agent already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new agent
    const newAgent = new Agent({
      name,
      email,
      password: hashedPassword,
      department,
    });

    // Save the new agent to the database
    await newAgent.save();

    // Generate permanent JWT token (no expiration)
    const token = jwt.sign({ id: newAgent._id }, process.env.JWT_SECRET);

    res.status(201).json({ message: "Agent registered successfully", token });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Login Agent
export const loginAgent = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the agent by email
    const agent = await Agent.findOne({ email });
    if (!agent) return res.status(400).json({ error: "Agent not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Generate permanent JWT token (no expiration)
    const token = jwt.sign({ id: agent._id }, process.env.JWT_SECRET);

    // Send the token in response
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};