import mongoose, { Schema } from 'mongoose';
import { IDoctorProfile } from '../types';

const doctorProfileSchema = new Schema<IDoctorProfile>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  specialty: { type: String },
  contact: { type: String },
  patients: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

export default mongoose.model<IDoctorProfile>('DoctorProfile', doctorProfileSchema);

