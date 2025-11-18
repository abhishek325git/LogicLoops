import React, { useState } from 'react';
import CategorySelect from '../Booking/CategorySelect';

const BookAppointment: React.FC = () => {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="mb-4">
      <button onClick={() => setShowBooking(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
        Book Appointment
      </button>
      {showBooking && <CategorySelect onClose={() => setShowBooking(false)} />}
    </div>
  );
};

export default BookAppointment;