import React, { useEffect, useState } from 'react';
import { wellnessAPI, bookingAPI } from '../../services/api';
import WellnessSummary from './WellnessSummary';
import Reminders from './Reminders';
import DailyTips from './DailyTips';
import BookAppointment from './BookAppointment';
import Sidebar from '../Layout/Sidebar';
import { WellnessLog, Reminder, Booking } from '../../types';

const PatientDashboard: React.FC = () => {
  const [logs, setLogs] = useState<WellnessLog[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  const loadBookings = async () => {
    try {
      setLoadingBookings(true);
      const res = await bookingAPI.getBookings();
      setBookings(res.data);
    } catch (err) {
      alert('Error fetching bookings');
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [logsRes, remindersRes] = await Promise.all([
          wellnessAPI.getLogs(),
          wellnessAPI.getReminders(),
        ]);
        setLogs(logsRes.data);
        setReminders(remindersRes.data);
      } catch (err) {
        alert('Error fetching data');
      }
    };
    fetchData();
    loadBookings();
  }, []);

  const confirmedBookings = bookings.filter((b) => b.status === 'confirmed');

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Patient Dashboard</h1>
        <WellnessSummary logs={logs} />
        <Reminders reminders={reminders} />
        <DailyTips />
        <BookAppointment />
        <section className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Confirmed Appointments</h2>
            <button
              onClick={loadBookings}
              className="text-sm text-blue-600 underline"
              type="button"
            >
              Refresh
            </button>
          </div>
          {loadingBookings && <p>Loading appointments...</p>}
          {!loadingBookings && confirmedBookings.length === 0 && (
            <p className="text-gray-600">No confirmed appointments yet. Once a doctor approves your booking, it will appear here.</p>
          )}
          <div className="space-y-3">
            {confirmedBookings.map((booking) => {
              const doctor = (booking.doctorId as unknown as { name?: string; contact?: string }) || {};
              return (
                <div key={booking._id} className="border rounded p-3 shadow-sm bg-white">
                  <p className="font-medium">{doctor.name || 'Assigned Doctor'}</p>
                  <p className="text-sm text-gray-600">{booking.category}</p>
                  <p className="text-sm">{booking.date} at {booking.time}</p>
                  {doctor.contact && <p className="text-sm text-gray-500">Contact: {doctor.contact}</p>}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PatientDashboard;