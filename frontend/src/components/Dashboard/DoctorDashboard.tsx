import React, { useEffect, useState } from 'react';
import { bookingAPI } from '../../services/api';
import Sidebar from '../Layout/Sidebar';
import { Booking } from '../../types';

const DoctorDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await bookingAPI.getBookings();
        setBookings(res.data);
      } catch (err) {
        alert('Error fetching bookings');
      }
    };
    fetchBookings();
  }, []);

  const handleConfirm = async (id: string) => {
    try {
      await bookingAPI.confirmBooking(id);
      setBookings(bookings.map(b => b._id === id ? { ...b, status: 'confirmed' } : b));
    } catch (err) {
      alert('Error confirming booking');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1>
        <h2 className="text-xl mb-2">Scheduled Appointments</h2>
        <ul>
          {bookings.map(b => (
            <li key={b._id} className="border p-2 mb-2">
              {b.patientId.name} - {b.category} - {b.date} {b.time} - {b.status}
              {b.status === 'pending' && (
                <button onClick={() => handleConfirm(b._id)} className="ml-4 bg-blue-500 text-white px-2 py-1 rounded">Confirm</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorDashboard;