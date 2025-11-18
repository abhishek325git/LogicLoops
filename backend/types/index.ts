import { Request } from 'express';
import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'patient' | 'doctor';
  specialty?: string;
  age?: number;
  contact?: string;
  profilePic?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IDoctorProfile extends Document {
  userId: string;
  specialty?: string;
  contact?: string;
  patients: string[];
}

export interface IPatientProfile extends Document {
  userId: string;
  age?: number;
  contact?: string;
  profilePic?: string;
  conditions?: string[];
  medications?: string[];
  allergies?: string[];
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