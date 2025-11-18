import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken, removeUser } from '../../utils/auth';

interface HeaderProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    removeUser();
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/" className="text-xl font-bold">Healthcare Portal</Link>
      {isAuthenticated ? (
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
      ) : (
        <div>
          <Link to="/" className="mr-4">Login</Link>
          <Link to="/">Register</Link>
        </div>
      )}
    </header>
  );
};

export default Header;