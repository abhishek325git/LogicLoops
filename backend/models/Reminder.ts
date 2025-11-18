import mongoose, { Schema } from 'mongoose';
import { IReminder } from '../types';

const reminderSchema = new Schema<IReminder>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['blood_test', 'vaccination'], required: true },
  date: { type: Date, required: true },
  description: String,
}, { timestamps: true });

export default mongoose.model<IReminder>('Reminder', reminderSchema);