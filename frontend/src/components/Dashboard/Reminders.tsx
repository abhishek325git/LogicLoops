import React from 'react';
import { Reminder } from '../../types';

interface RemindersProps {
  reminders: Reminder[];
}

const Reminders: React.FC<RemindersProps> = ({ reminders }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl mb-2">Upcoming Reminders</h2>
      <ul>
        {reminders.map(r => (
          <li key={r._id} className="border p-2 mb-2">
            {r.type} on {new Date(r.date).toLocaleDateString()} - {r.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reminders;