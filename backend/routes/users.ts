import express, { Request, Response } from 'express';
import User from '../models/User';
import DoctorProfile from '../models/DoctorProfile';
import PatientProfile from '../models/PatientProfile';
import authMiddleware from '../middleware/authMiddleware';
import { AuthRequest } from '../types';

const router = express.Router();

// Get profile
router.get('/profile', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  const user = await User.findById(req.user!.id).select('-password');
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  if (user.role === 'doctor') {
    let profile = await DoctorProfile.findOne({ userId: user._id });
    if (!profile) {
      profile = await DoctorProfile.create({ userId: user._id, patients: [] });
    }
    res.json({ user, profile });
    return;
  }

  let profile = await PatientProfile.findOne({ userId: user._id });
  if (!profile) {
    profile = await PatientProfile.create({ userId: user._id });
  }
  res.json({ user, profile });
});

// Update profile
router.put('/profile', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  const user = await User.findById(req.user!.id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const updates = req.body;

  if (user.role === 'doctor') {
    const profile = await DoctorProfile.findOneAndUpdate({ userId: user._id }, updates, { new: true, upsert: true });
    res.json({ user, profile });
    return;
  }

  const profile = await PatientProfile.findOneAndUpdate({ userId: user._id }, updates, { new: true, upsert: true });
  res.json({ user, profile });
});

export default router;