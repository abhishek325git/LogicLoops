import React, { useEffect, useState } from "react";
import { wellnessAPI, bookingAPI } from "../../services/api";
import WellnessSummary from "./WellnessSummary";
import Reminders from "./Reminders";
import DailyTips from "./DailyTips";
import BookAppointment from "./BookAppointment";
import Sidebar from "../Layout/Sidebar";
import { WellnessLog, Reminder, Booking } from "../../types";

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
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-5">
        <Sidebar />
        <div className="flex-1">
          <div className="flex flex-col gap-2 mb-6">
            <p className="text-sm uppercase tracking-wide text-indigo-600 font-semibold">
              Welcome back
            </p>
            <h1 className="text-3xl font-bold text-slate-900">
              Patient Dashboard
            </h1>
            <p className="text-slate-500">
              Review your wellness stats, reminders, and upcoming appointments.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="card p-4">
              <WellnessSummary logs={logs} />
            </div>
            <div className="card p-4">
              <Reminders reminders={reminders} />
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2 mt-4">
            <DailyTips />
            <div className="card p-4">
              <BookAppointment />
            </div>
          </div>
          <section className="card p-4 mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <h2 className="text-xl font-semibold text-slate-900">
                Confirmed Appointments
              </h2>
              <button
                onClick={loadBookings}
                className="btn-secondary text-sm"
                type="button"
              >
                Refresh list
              </button>
            </div>
            {loadingBookings && <p>Loading appointments...</p>}
            {!loadingBookings && confirmedBookings.length === 0 && (
              <p className="text-gray-500">
                No confirmed appointments yet. Once a doctor approves your
                booking, it will appear here.
              </p>
            )}
            <div className="space-y-3">
              {confirmedBookings.map((booking) => {
                const doctor =
                  (booking.doctorId as unknown as { name?: string; contact?: string }) || {};
                return (
                  <div
                    key={booking._id}
                    className="border border-slate-100 rounded-xl p-3 shadow-sm bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                  >
                    <div>
                      <p className="font-medium text-slate-900">
                        {doctor.name || "Assigned Doctor"}
                      </p>
                      <p className="text-sm text-gray-600">{booking.category}</p>
                    </div>
                    <div className="text-sm text-slate-600">
                      <p>
                        {booking.date} at {booking.time}
                      </p>
                      {doctor.contact && (
                        <p className="text-slate-500">Contact: {doctor.contact}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;