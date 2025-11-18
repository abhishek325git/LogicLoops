import React, { useEffect, useState } from 'react';
import { wellnessAPI, bookingAPI } from '../../services/api';
import WellnessSummary from './WellnessSummary';
import Reminders from './Reminders';
import DailyTips from './DailyTips';
import BookAppointment from './BookAppointment';
import Sidebar from '../Layout/Sidebar';
import { WellnessLog, Reminder } from '../../types';

const PatientDashboard: React.FC = () => {
  const [logs, setLogs] = useState<WellnessLog[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [logsRes, remindersRes] = await Promise.all([
          wellnessAPI.getLogs(),
          wellnessAPI.getReminders(),
        ]);
        setLogs(logsRes.data);
        setReminders(remindersRes.data);
      } catch (err) {
        alert('Error fetching data');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Patient Dashboard</h1>
        <WellnessSummary logs={logs} />
        <Reminders reminders={reminders} />
        <DailyTips />
        <BookAppointment />
      </div>
    </div>
  );
};

export default PatientDashboard;