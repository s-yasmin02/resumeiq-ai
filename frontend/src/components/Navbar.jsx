import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav className="sticky top-0 z-50 bg-[#0B1120]/80 backdrop-blur-md border-b border-white/10 p-4 text-white flex justify-between items-center transition-all">
      <div className="font-extrabold text-2xl tracking-tight">
        <Link to="/" className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-300 hover:to-purple-400 transition-all">
          ResumeIQ
        </Link>
      </div>
      <div className="space-x-6 flex items-center text-sm font-medium">
        <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
        {token ? (
          <>
            <Link to="/dashboard" className="text-gray-300 hover:text-white transition">Dashboard</Link>
            <button onClick={logout} className="text-gray-300 hover:text-white transition cursor-pointer">Logout</button>
            <Link to="/upload" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-5 py-2 rounded-full shadow-lg shadow-purple-500/25 transition-all transform hover:-translate-y-0.5">
              Upload Resume
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-300 hover:text-white transition">Login</Link>
            <Link to="/register" className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-5 py-2 rounded-full backdrop-blur-sm transition-all">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
