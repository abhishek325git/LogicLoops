import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getToken, getUser } from './utils/auth';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LandingPage from './pages/LandingPage';
import PatientDashboard from './components/Dashboard/PatientDashboard';
import DoctorDashboard from './components/Dashboard/DoctorDashboard';
import UpdateTrack from './pages/UpdateTrack';
import UserProfile from './components/Profile/UserProfile';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    setIsAuthenticated(!!getToken());
    setUser(getUser());
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  user.role === 'patient' ? <PatientDashboard /> : <DoctorDashboard />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/track"
              element={isAuthenticated && user.role === 'patient' ? <UpdateTrack /> : <Navigate to="/" />}
            />
            <Route
              path="/profile"
              element={isAuthenticated ? <UserProfile /> : <Navigate to="/" />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;