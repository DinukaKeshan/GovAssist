import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Minister from "../models/Minister.js";  // Minister model

// Register Minister
export const registerMinister = async (req, res) => {
  const { name, email, password, department } = req.body;

  try {
    // Check if the minister already exists
    const ministerExists = await Minister.findOne({ email });
    if (ministerExists) {
      return res.status(400).json({ error: "Minister already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new minister
    const newMinister = new Minister({
      name,
      email,
      password: hashedPassword,
      department,
    });

    // Save the new minister to the database
    await newMinister.save();

    // Generate permanent JWT token (no expiration)
    const token = jwt.sign({ id: newMinister._id }, process.env.JWT_SECRET);

    res.status(201).json({ message: "Minister registered successfully", token });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Login Minister
export const loginMinister = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the minister by email
    const minister = await Minister.findOne({ email });
    if (!minister) return res.status(400).json({ error: "Minister not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, minister.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Generate permanent JWT token (no expiration)
    const token = jwt.sign({ id: minister._id }, process.env.JWT_SECRET);

    // Send the token in response
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Fetch Minister Profile
export const getMinisterProfile = async (req, res) => {
  try {
    const minister = await Minister.findById(req.minister.id).populate('department');
    if (!minister) {
      return res.status(404).json({ error: "Minister not found" });
    }
    res.json(minister);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch minister profile" });
  }
};