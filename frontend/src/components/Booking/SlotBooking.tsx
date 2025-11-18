import React, { useState } from "react";
import { bookingAPI } from "../../services/api";
import { User } from "../../types";

interface SlotBookingProps {
  doctor: User;
  category: string;
  onClose: () => void;
}

const slots = ["10:00 AM", "11:00 AM", "2:00 PM"];

const SlotBooking: React.FC<SlotBookingProps> = ({
  doctor,
  category,
  onClose,
}) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleConfirm = async () => {
    try {
      const doctorId = doctor.id || doctor._id || "";
      if (!doctorId) {
        alert("Unable to book: doctor identifier missing.");
        return;
      }
      await bookingAPI.createBooking({ doctorId, category, date, time });
      alert("Booking confirmed!");
      onClose();
    } catch (err) {
      alert("Error booking");
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="font-semibold mb-3">Book with {doctor.name}</h3>
      <div className="space-y-3">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-slate-200 rounded-lg p-2 w-full"
        />
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border border-slate-200 rounded-lg p-2 w-full"
        >
          <option value="">Select time</option>
          {slots.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          onClick={handleConfirm}
          className="btn-primary w-full justify-center"
        >
          Confirm appointment
        </button>
      </div>
    </div>
  );
};

export default SlotBooking;
