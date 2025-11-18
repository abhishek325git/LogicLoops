import mongoose, { Schema } from 'mongoose';
import { IBooking } from '../types';

const bookingSchema = new Schema<IBooking>({
  patientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model<IBooking>('Booking', bookingSchema);