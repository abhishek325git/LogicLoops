import React, { useState } from 'react';
import DoctorList from './DoctorList';

interface CategorySelectProps {
  onClose: () => void;
}

const categories = ['Cardiology', 'Dermatology', 'General'];

const CategorySelect: React.FC<CategorySelectProps> = ({ onClose }) => {
  const [category, setCategory] = useState('');

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center px-4 z-50">
      <div className="bg-white w-full max-w-lg p-5 rounded-2xl shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-900">Select Category</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">✕</button>
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border border-slate-200 rounded-lg p-2 w-full mb-3">
          <option value="">Choose...</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {category ? (
          <DoctorList category={category} onClose={onClose} />
        ) : (
          <p className="text-sm text-slate-500">Pick a specialty to view available doctors.</p>
        )}
      </div>
    </div>
  );
};

export default CategorySelect;