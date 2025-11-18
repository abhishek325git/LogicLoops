import React from "react";

const tips = [
  "Drink plenty of water daily.",
  "Aim for 10,000 steps a day.",
  "Get 7-8 hours of sleep.",
  "Eat a balanced diet.",
];

const DailyTips: React.FC = () => {
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="card p-4">
      <p className="text-sm uppercase tracking-wide text-indigo-600 font-semibold">
        Daily Health Tip
      </p>
      <p className="mt-1 text-slate-700">{randomTip}</p>
    </div>
  );
};

export default DailyTips;