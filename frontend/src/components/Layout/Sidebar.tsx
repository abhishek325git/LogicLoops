import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-200 p-4">
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/track">Update Track</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;