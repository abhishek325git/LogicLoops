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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await bookingAPI.getDoctorsByCategory(category);
        setDoctors(res.data);
      } catch (err) {
        alert('Error fetching doctors');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [category]);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Doctors in {category}</h3>
      {loading && <p>Loading doctors...</p>}
      {!loading && doctors.length === 0 && <p>No doctors available for this category yet.</p>}
      <ul>
        {doctors.map(d => {
          const doctorId = d.id || d._id || d.email;
          return (
            <li
              key={doctorId}
              className="border p-2 mb-2 cursor-pointer hover:bg-blue-50"
              onClick={() => setSelectedDoctor(d)}
            >
              <p className="font-medium">{d.name}</p>
              {d.specialty && <p className="text-sm text-gray-600">{d.specialty}</p>}
              {d.contact && <p className="text-sm text-gray-500">{d.contact}</p>}
            </li>
          );
        })}
      </ul>
      {selectedDoctor && <SlotBooking category={category} doctor={selectedDoctor} onClose={onClose} />}
    </div>
  );
};

export default DoctorList;