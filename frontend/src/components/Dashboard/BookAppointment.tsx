import React, { useState } from 'react';
import CategorySelect from '../Booking/CategorySelect';

const BookAppointment: React.FC = () => {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="space-y-2">
      <p className="text-sm text-slate-600">
        Need a preventive check? Pick a specialty and grab a slot.
      </p>
      <button onClick={() => setShowBooking(true)} className="btn-primary w-full justify-center">
        Book Appointment
      </button>
      {showBooking && <CategorySelect onClose={() => setShowBooking(false)} />}
    </div>
  );
};

export default BookAppointment;