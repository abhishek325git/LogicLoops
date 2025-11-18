import React from "react";
import { Link } from "react-router-dom";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import DailyTips from "../components/Dashboard/DailyTips";
import { User } from "../types";

interface LandingPageProps {
  onLoginSuccess?: (user: User) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLoginSuccess }) => {
  return (
    <div className="px-4 py-10">
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6">
          <p className="inline-flex items-center px-4 py-1 rounded-full bg-white/60 text-indigo-700 text-sm font-semibold shadow-sm">
            Preventive Care · Personalized Journeys
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900">
            Stay ahead of your wellness goals with smart reminders & insights.
          </h1>
          <p className="text-lg text-slate-600">
            Track daily habits, receive preventive care nudges, and give your
            provider a real-time window into compliance.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/dashboard"
              className="btn-primary"
            >
              Go to Dashboard
            </Link>
            <a
              href="#get-started"
              className="btn-secondary"
            >
              Explore Features
            </a>
          </div>
          <DailyTips />
        </div>

        <div
          id="get-started"
          className="grid gap-6 md:grid-cols-2 bg-white/80 backdrop-blur rounded-3xl border border-slate-100 shadow-xl p-6"
        >
          <div className="card-gradient rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold text-lg mb-3">Existing members</h3>
            <p className="text-sm text-slate-500 mb-4">
              Login to access your dashboard.
            </p>
            <Login onSuccess={onLoginSuccess} />
          </div>
          <div className="card rounded-2xl p-5 shadow-sm bg-white">
            <h3 className="font-semibold text-lg mb-3">Join the portal</h3>
            <p className="text-sm text-slate-500 mb-4">
              Create a patient or doctor account.
            </p>
            <Register />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;