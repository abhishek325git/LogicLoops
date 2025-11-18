import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import DoctorProfile from "../models/DoctorProfile";
import PatientProfile from "../models/PatientProfile";
import authMiddleware from "../middleware/authMiddleware";
import { AuthRequest } from "../types";

const router = express.Router();

// Register
router.post("/register", async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role, specialty, contact } = req.body;
  try {
    const user = new User({ name, email, password, role, specialty, contact });
    await user.save();
    if (role === "doctor") {
      await DoctorProfile.create({
        userId: user._id,
        specialty: specialty || user.specialty,
        contact: contact || user.contact,
        patients: [],
      });
    } else {
      await PatientProfile.create({
        userId: user._id,
        age: user.age,
        contact: user.contact,
        profilePic: user.profilePic,
      });
    }
    res.status(201).json({ message: "User registered" });
  } catch (err: any) {
    if (err.code === 11000) {
      res.status(409).json({ error: "Email already registered" });
      return;
    }
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const token = jwt.sign(
      { id: user._id.toString(), role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    res.json({
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Protected route
router.get(
  "/me",
  authMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    const user = await User.findById(req.user!.id);
    res.json(user);
  }
);

export default router;
