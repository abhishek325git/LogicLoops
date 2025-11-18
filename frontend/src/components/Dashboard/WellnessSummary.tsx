import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { WellnessLog } from '../../types';

interface WellnessSummaryProps {
  logs: WellnessLog[];
}

const WellnessSummary: React.FC<WellnessSummaryProps> = ({ logs }) => {
  const data = logs.map(log => ({
    date: new Date(log.date).toLocaleDateString(),
    steps: log.steps || 0,
    sleep: log.sleepHours || 0,
  }));

  return (
    <div className="mb-4">
      <h2 className="text-xl mb-2">Wellness Summary</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="steps" stroke="#8884d8" />
          <Line type="monotone" dataKey="sleep" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WellnessSummary;