import mongoose, { Schema } from 'mongoose';
import { IWellnessLog } from '../types';

const wellnessLogSchema = new Schema<IWellnessLog>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  steps: Number,
  sleepHours: Number,
  waterIntake: Number,
}, { timestamps: true });

export default mongoose.model<IWellnessLog>('WellnessLog', wellnessLogSchema);