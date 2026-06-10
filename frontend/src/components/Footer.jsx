import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 text-white text-center mt-auto">
      <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} ResumeIQ AI. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
