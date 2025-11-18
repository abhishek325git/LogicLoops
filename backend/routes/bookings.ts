import express, { Request, Response } from 'express';
import Booking from '../models/Booking';
import User from '../models/User';
import authMiddleware from '../middleware/authMiddleware';
import { AuthRequest } from '../types';

const router = express.Router();

// Get bookings
router.get('/', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  const query = req.user!.role === 'doctor' ? { doctorId: req.user!.id } : { patientId: req.user!.id };
  const bookings = await Booking.find(query).populate('patientId doctorId', 'name');
  res.json(bookings);
});

// Create booking
router.post('/', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  const { doctorId, category, date, time } = req.body;
  const booking = new Booking({ patientId: req.user!.id, doctorId, category, date, time });
  await booking.save();
  res.json(booking);
});

// Confirm booking
router.put('/:id/confirm', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  if (req.user!.role !== 'doctor') {
    res.status(403).json({ message: 'Unauthorized' });
    return;
  }
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'confirmed' });
  res.json(booking);
});

// Get doctors by category
router.get('/doctors/:category', async (req: Request, res: Response): Promise<void> => {
  const doctors = await User.find({ role: 'doctor' });
  res.json(doctors);
});

export default router;