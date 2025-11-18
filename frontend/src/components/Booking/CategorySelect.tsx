import React, { useState } from 'react';
import DoctorList from './DoctorList';

interface CategorySelectProps {
  onClose: () => void;
}

const categories = ['Cardiology', 'Dermatology', 'General'];

const CategorySelect: React.FC<CategorySelectProps> = ({ onClose }) => {
  const [category, setCategory] = useState('');

  const handleNext = () => {
    if (category) {
      // Pass to next step
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <h2>Select Category</h2>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 w-full mb-2">
          <option value="">Choose...</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Next</button>
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Close</button>
        {category && <DoctorList category={category} onClose={onClose} />}
      </div>
    </div>
  );
};

export default CategorySelect;