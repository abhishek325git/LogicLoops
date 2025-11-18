import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Update Track", to: "/track" },
  { label: "Profile", to: "/profile" },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  return (
    <aside className="w-full md:w-64 bg-white/70 backdrop-blur border border-slate-100 shadow-sm p-4 rounded-xl mb-4 md:mb-0">
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`flex items-center justify-between px-4 py-2 rounded-lg transition ${
                    active
                      ? "bg-indigo-100 text-indigo-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;