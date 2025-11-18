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
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-slate-900">
        Doctors in {category}
      </h3>
      {loading && <p>Loading doctors...</p>}
      {!loading && doctors.length === 0 && (
        <p className="text-sm text-slate-500">
          No doctors available for this category yet.
        </p>
      )}
      <ul className="grid gap-3">
        {doctors.map(d => {
          const doctorId = d.id || d._id || d.email;
          return (
            <li
              key={doctorId}
              className={`border rounded-xl p-3 cursor-pointer transition ${
                selectedDoctor?._id === d._id
                  ? "bg-indigo-50 border-indigo-200"
                  : "hover:bg-slate-50 border-slate-200"
              }`}
              onClick={() => setSelectedDoctor(d)}
            >
              <p className="font-medium text-slate-900">{d.name}</p>
              {d.specialty && <p className="text-sm text-gray-600">{d.specialty}</p>}
              {d.contact && <p className="text-sm text-gray-500">{d.contact}</p>}
            </li>
          );
        })}
      </ul>
      {selectedDoctor && (
        <SlotBooking category={category} doctor={selectedDoctor} onClose={onClose} />
      )}
    </div>
  );
};

export default DoctorList;