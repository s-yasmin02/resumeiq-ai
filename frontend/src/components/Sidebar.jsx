import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Upload Resume', path: '/upload' },
    { name: 'My Analyses', path: '/history' },
    { name: 'Job Match', path: '/job-match' },
    { name: 'Profile', path: '/profile' },
  ];

  return (
    <aside className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 text-white min-h-[calc(100vh-73px)] p-6 hidden md:block">
      <div className="mb-8">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Main Menu</p>
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`block px-4 py-3 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-purple-500/30 text-purple-300 shadow-inner' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
