import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm text-slate-300">
        <p>&copy; {new Date().getFullYear()} Preventive Healthcare Portal.</p>
        <p className="mt-1">Built for proactive wellness and smart care.</p>
      </div>
    </footer>
  );
};

export default Footer;