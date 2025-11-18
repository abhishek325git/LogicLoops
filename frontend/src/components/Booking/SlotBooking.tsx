import React, { useState } from 'react';
import { bookingAPI } from '../../services/api';
import { User } from '../../types';

interface SlotBookingProps {
  doctor: User;
  onClose: () => void;
}

const slots = ['10:00 AM', '11:00 AM', '2:00 PM'];

const SlotBooking: React.FC<SlotBookingProps> = ({ doctor, onClose }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleConfirm = async () => {
    try {
      await bookingAPI.createBooking({ doctorId: doctor.id, category: 'General', date, time });
      alert('Booking confirmed!');
      onClose();
    } catch (err) {
      alert('Error booking');
    }
  };

  return (
    <div>
      <h3>Book with {doctor.name}</h3>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <select value={time} onChange={(e) => setTime(e.target.value)} className="border p-2 w-full mb-2">
        <option value="">Select time</option>
        {slots.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <button onClick={handleConfirm} className="bg-green-500 text-white px-4 py-2 rounded">Confirm</button>
    </div>
  );
};

export default SlotBooking;