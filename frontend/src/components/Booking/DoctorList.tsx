import React, { useEffect, useState } from 'react';
import { bookingAPI } from '../../services/api';
import SlotBooking from './SlotBooking';
import { User } from '../../types';

interface DoctorListProps {
  category: string;
  onClose: () => void;
}

const DoctorList: React.FC<DoctorListProps> = ({ category, onClose }) => {
  const [doctors, setDoctors] = useState<User[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<User | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await bookingAPI.getDoctorsByCategory(category);
        setDoctors(res.data);
      } catch (err) {
        alert('Error fetching doctors');
      }
    };
    fetchDoctors();
  }, [category]);

  return (
    <div>
      <h3>Doctors in {category}</h3>
      <ul>
        {doctors.map(d => (
          <li key={d.id} className="border p-2 mb-2 cursor-pointer" onClick={() => setSelectedDoctor(d)}>
            {d.name}
          </li>
        ))}
      </ul>
      {selectedDoctor && <SlotBooking doctor={selectedDoctor} onClose={onClose} />}
    </div>
  );
};

export default DoctorList;