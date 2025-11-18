import express, { Request, Response } from 'express';
import User from '../models/User';
import authMiddleware from '../middleware/authMiddleware';
import { AuthRequest } from '../types';

const router = express.Router();

// Get profile
router.get('/profile', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  const user = await User.findById(req.user!.id);
  res.json(user);
});

// Update profile
router.put('/profile', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  const updates = req.body;
  const user = await User.findByIdAndUpdate(req.user!.id, updates, { new: true });
  res.json(user);
});

export default router;