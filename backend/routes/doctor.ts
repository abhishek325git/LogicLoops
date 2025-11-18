import express, { Response } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { AuthRequest } from '../types';
import DoctorProfile from '../models/DoctorProfile';
import PatientProfile from '../models/PatientProfile';
import User from '../models/User';

const router = express.Router();

router.use(authMiddleware);

const ensureDoctor = (handler: (req: AuthRequest, res: Response) => Promise<void>) => {
  return async (req: AuthRequest, res: Response) => {
    if (req.user?.role !== 'doctor') {
      res.status(403).json({ message: 'Doctor access only' });
      return;
    }
    await handler(req, res);
  };
};

router.get('/patients', ensureDoctor(async (req, res) => {
  const profile = await DoctorProfile.findOne({ userId: req.user!.id }).populate({
    path: 'patients',
    select: 'name email',
  });
  const patients = profile?.patients ?? [];
  res.json(patients);
}));

router.get('/patients/:patientId/profile', ensureDoctor(async (req, res) => {
  const patientUser = await User.findById(req.params.patientId).select('name email role');
  if (!patientUser) {
    res.status(404).json({ message: 'Patient not found' });
    return;
  }
  const patientProfile = await PatientProfile.findOne({ userId: patientUser._id });
  res.json({ user: patientUser, profile: patientProfile });
}));

export default router;

