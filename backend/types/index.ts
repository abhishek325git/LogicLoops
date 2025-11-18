import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'patient' | 'doctor';
  age?: number;
  contact?: string;
  profilePic?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IWellnessLog extends Document {
  userId: string;
  date: Date;
  steps?: number;
  sleepHours?: number;
  waterIntake?: number;
}

export interface IReminder extends Document {
  userId: string;
  type: 'blood_test' | 'vaccination';
  date: Date;
  description?: string;
}

export interface IBooking extends Document {
  patientId: string;
  doctorId: string;
  category: string;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed';
}

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}