export interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor';
  specialty?: string;
  age?: number;
  contact?: string;
  profilePic?: string;
}

export interface DoctorProfile {
  specialty?: string;
  contact?: string;
  patients?: string[];
}

export interface PatientProfileData {
  age?: number;
  contact?: string;
  profilePic?: string;
  conditions?: string[];
  medications?: string[];
  allergies?: string[];
}

export interface DoctorPatientSummary {
  _id: string;
  name: string;
  email: string;
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
  patientId: User | string;
  doctorId: User | string;
  category: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed';
}