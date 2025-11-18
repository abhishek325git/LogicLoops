import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import DailyTips from '../components/Dashboard/DailyTips';
import { User } from '../types';

interface LandingPageProps {
  onLoginSuccess?: (user: User) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLoginSuccess }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Preventive Healthcare Portal</h1>
      <DailyTips />
      <div className="mt-8">
        <Login onSuccess={onLoginSuccess} />
        <Register />
        <Link to="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded">Get Started</Link>
      </div>
    </div>
  );
};

export default LandingPage;