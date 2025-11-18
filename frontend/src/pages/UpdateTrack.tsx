import React, { useState } from 'react';
import { wellnessAPI } from '../services/api';

const UpdateTrack: React.FC = () => {
  const [log, setLog] = useState({ steps: '', sleepHours: '', waterIntake: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await wellnessAPI.addLog({
        steps: Number(log.steps),
        sleepHours: Number(log.sleepHours),
        waterIntake: Number(log.waterIntake),
      });
      alert('Log added!');
      setLog({ steps: '', sleepHours: '', waterIntake: '' });
    } catch (err) {
      alert('Error adding log');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Daily Track</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Steps"
          value={log.steps}
          onChange={(e) => setLog({ ...log, steps: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Sleep Hours"
          value={log.sleepHours}
          onChange={(e) => setLog({ ...log, sleepHours: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Water Intake (glasses)"
          value={log.waterIntake}
          onChange={(e) => setLog({ ...log, waterIntake: e.target.value })}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default UpdateTrack;