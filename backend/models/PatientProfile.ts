import mongoose, { Schema } from 'mongoose';
import { IPatientProfile } from '../types';

const patientProfileSchema = new Schema<IPatientProfile>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  age: Number,
  contact: String,
  profilePic: String,
  conditions: [String],
  medications: [String],
  allergies: [String],
}, { timestamps: true });

export default mongoose.model<IPatientProfile>('PatientProfile', patientProfileSchema);

