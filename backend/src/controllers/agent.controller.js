import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Agent from "../models/Agent.js";

// Register Agent
export const registerAgent = async (req, res) => {
  const { name, email, password, department } = req.body;

  try {
    const agentExists = await Agent.findOne({ email });
    if (agentExists) {
      return res.status(400).json({ error: "Agent already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAgent = new Agent({
      name,
      email,
      password: hashedPassword,
      department,
    });

    await newAgent.save();

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
    const agent = await Agent.findOne({ email });
    if (!agent) return res.status(400).json({ error: "Agent not found" });

    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: agent._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Get Agent Profile 👇
export const getAgentProfile = async (req, res) => {
  try {
    const agent = await Agent.findById(req.user._id).populate("department");
    if (!agent) {
      return res.status(404).json({ error: "Agent not found" });
    }
    res.json(agent);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};