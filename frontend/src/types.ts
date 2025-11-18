export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor';
  age?: number;
  contact?: string;
  profilePic?: string;
}

export interface WellnessLog {
  _id: string;
  date: string;
  steps?: number;
  sleepHours?: number;
  waterIntake?: number;
}

export interface Reminder {
  _id: string;
  type: 'blood_test' | 'vaccination';
  date: string;
  description?: string;
}

export interface Booking {
  _id: string;
  patientId: User;
  doctorId: User;
  category: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed';
}