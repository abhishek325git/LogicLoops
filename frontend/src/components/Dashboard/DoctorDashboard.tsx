import React, { useEffect, useState } from "react";
import { bookingAPI, doctorAPI } from "../../services/api";
import {
  Booking,
  DoctorPatientSummary,
  PatientProfileData,
  User,
} from "../../types";

const DoctorDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [patients, setPatients] = useState<DoctorPatientSummary[]>([]);
  const [patientModal, setPatientModal] = useState<{
    user: User | null;
    profile: PatientProfileData | null;
  } | null>(null);
  const [loadingPatients, setLoadingPatients] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await bookingAPI.getBookings();
        setBookings(res.data);
      } catch (err) {
        alert("Error fetching bookings");
      }
    };
    fetchBookings();

    const fetchPatients = async () => {
      try {
        const res = await doctorAPI.getPatients();
        setPatients(res.data);
      } catch (err) {
        alert("Error fetching patients");
      } finally {
        setLoadingPatients(false);
      }
    };
    fetchPatients();
  }, []);

  const handleConfirm = async (id: string) => {
    try {
      await bookingAPI.confirmBooking(id);
      setBookings(
        bookings.map((b) => (b._id === id ? { ...b, status: "confirmed" } : b))
      );
    } catch (err) {
      alert("Error confirming booking");
    }
  };

  const viewPatientProfile = async (patientId: string) => {
    try {
      const res = await doctorAPI.getPatientProfile(patientId);
      setPatientModal({ user: res.data.user, profile: res.data.profile });
    } catch (err) {
      alert("Unable to load patient profile");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex flex-col gap-2 mb-6">
        <p className="text-sm uppercase tracking-wide text-indigo-600 font-semibold">
          Provider Workspace
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Doctor Dashboard</h1>
        <p className="text-slate-500">
          Manage appointment requests and review your patient list in one place.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Scheduled Appointments
            </h2>
          </div>
          <div className="space-y-3">
            {bookings.map((b) => {
              const patient =
                typeof b.patientId === "string"
                  ? undefined
                  : (b.patientId as User);
              return (
                <div
                  key={b._id}
                  className="border border-slate-100 rounded-xl p-3 flex flex-col gap-2 bg-white shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium">
                      {patient?.name || "Patient"} ·{" "}
                      <span className="text-sm text-slate-500">
                        {b.category}
                      </span>
                    </p>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        b.status === "confirmed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <div className="text-sm text-slate-600 flex items-center justify-between">
                    <p>
                      {b.date} · {b.time}
                    </p>
                    {b.status === "pending" && (
                      <button
                        onClick={() => handleConfirm(b._id)}
                        className="btn-secondary text-xs"
                      >
                        Confirm
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            {bookings.length === 0 && (
              <p className="text-slate-500 text-sm">
                No bookings yet. Confirmed appointments will appear here.
              </p>
            )}
          </div>
        </div>
        <div className="card p-4">
          <h2 className="text-xl font-semibold mb-3">My Patients</h2>
          {loadingPatients && <p>Loading patients...</p>}
          {!loadingPatients && patients.length === 0 && (
            <p className="text-gray-500 text-sm">
              No patients assigned yet. Confirm bookings to build your panel.
            </p>
          )}
          <ul className="space-y-2">
            {patients.map((patient) => (
              <li
                key={patient._id}
                className="border border-slate-100 rounded-xl p-3 cursor-pointer hover:bg-indigo-50 transition"
                onClick={() => viewPatientProfile(patient._id)}
              >
                <p className="font-medium">{patient.name}</p>
                <p className="text-sm text-gray-600">{patient.email}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {patientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {patientModal.user?.name}
              </h3>
              <button
                onClick={() => setPatientModal(null)}
                className="text-gray-600"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-gray-700">{patientModal.user?.email}</p>
            <div className="mt-4 space-y-2">
              <p>
                <span className="font-semibold">Age:</span>{" "}
                {patientModal.profile?.age ?? "N/A"}
              </p>
              <p>
                <span className="font-semibold">Contact:</span>{" "}
                {patientModal.profile?.contact ?? "N/A"}
              </p>
              <p>
                <span className="font-semibold">Conditions:</span>{" "}
                {patientModal.profile?.conditions?.join(", ") || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Medications:</span>{" "}
                {patientModal.profile?.medications?.join(", ") || "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
