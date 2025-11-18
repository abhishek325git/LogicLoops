import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import authMiddleware from '../middleware/authMiddleware';
import { AuthRequest } from '../types';

const router = express.Router();

// Register
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role } = req.body;
  try {
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    const token = jwt.sign({ id: user._id.toString(), role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Protected route
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  const user = await User.findById(req.user!.id);
  res.json(user);
});

export default router;