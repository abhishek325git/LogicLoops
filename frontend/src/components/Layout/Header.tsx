import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeToken, removeUser } from "../../utils/auth";

interface HeaderProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  isAuthenticated,
  setIsAuthenticated,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    removeUser();
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <header className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 text-white px-4 md:px-8 py-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Link to="/" className="text-2xl font-semibold tracking-tight">
          Healthcare Portal
        </Link>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-white/20 hover:bg-white/30 transition px-4 py-2 rounded-full text-sm font-medium"
          >
            Logout
          </button>
        ) : (
          <div className="flex items-center gap-4 text-sm">
            <Link to="/" className="hover:underline">
              Login
            </Link>
            <Link
              to="/"
              className="bg-white text-indigo-600 px-4 py-2 rounded-full font-semibold"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;