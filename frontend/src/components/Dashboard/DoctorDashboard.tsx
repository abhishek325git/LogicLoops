import React, { useEffect, useState } from "react";
import { bookingAPI, doctorAPI } from "../../services/api";
import Sidebar from "../Layout/Sidebar";
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
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1>
        <h2 className="text-xl mb-2">Scheduled Appointments</h2>
        <ul>
          {bookings.map((b) => {
            const patient =
              typeof b.patientId === "string"
                ? undefined
                : (b.patientId as User);
            return (
              <li key={b._id} className="border p-2 mb-2">
                {patient?.name || "N/A"} - {b.category} - {b.date} {b.time} -{" "}
                {b.status}
                {b.status === "pending" && (
                  <button
                    onClick={() => handleConfirm(b._id)}
                    className="ml-4 bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Confirm
                  </button>
                )}
              </li>
            );
          })}
        </ul>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">My Patients</h2>
          {loadingPatients && <p>Loading patients...</p>}
          {!loadingPatients && patients.length === 0 && (
            <p className="text-gray-600">No patients assigned yet.</p>
          )}
          <ul>
            {patients.map((patient) => (
              <li
                key={patient._id}
                className="border p-2 mb-2 cursor-pointer hover:bg-blue-50"
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
