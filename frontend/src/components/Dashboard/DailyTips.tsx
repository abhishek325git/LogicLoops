import React from 'react';

const tips = [
  'Drink plenty of water daily.',
  'Aim for 10,000 steps a day.',
  'Get 7-8 hours of sleep.',
  'Eat a balanced diet.',
];

const DailyTips: React.FC = () => {
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="mb-4">
      <h2 className="text-xl mb-2">Daily Health Tip</h2>
      <p className="border p-2">{randomTip}</p>
    </div>
  );
};

export default DailyTips;