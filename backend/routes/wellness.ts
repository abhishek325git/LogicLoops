import express, { Request, Response } from 'express';
import WellnessLog from '../models/WellnessLog';
import Reminder from '../models/Reminder';
import authMiddleware from '../middleware/authMiddleware';
import { AuthRequest } from '../types';

const router = express.Router();

// Get logs
router.get('/logs', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  const logs = await WellnessLog.find({ userId: req.user!.id });
  res.json(logs);
});

// Add log
router.post('/log', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  const log = new WellnessLog({ ...req.body, userId: req.user!.id });
  await log.save();
  res.json(log);
});

// Get reminders
router.get('/reminders', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  const reminders = await Reminder.find({ userId: req.user!.id });
  res.json(reminders);
});

// Add reminder
router.post('/reminder', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  const reminder = new Reminder({ ...req.body, userId: req.user!.id });
  await reminder.save();
  res.json(reminder);
});

export default router;