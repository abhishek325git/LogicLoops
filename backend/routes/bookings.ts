import express, { Request, Response } from 'express';
import Booking from '../models/Booking';
import User from '../models/User';
import DoctorProfile from '../models/DoctorProfile';
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
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'confirmed' }, { new: true });
  if (booking) {
    await DoctorProfile.findOneAndUpdate(
      { userId: booking.doctorId },
      { $addToSet: { patients: booking.patientId } },
      { upsert: true },
    );
  }
  res.json(booking);
});

// Get doctors by category
router.get('/doctors/:category', async (req: Request, res: Response): Promise<void> => {
  const category = req.params.category;
  const doctors = await User.find({
    role: 'doctor',
    ...(category ? { specialty: category } : {}),
  }).select('name email specialty contact');
  res.json(doctors);
});

export default router;