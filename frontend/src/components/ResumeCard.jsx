import React from 'react';

const ResumeCard = ({ title, date, status, score }) => {
  return (
    <div className="bg-white/5 text-white shadow-xl rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all group backdrop-blur-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold mb-1 text-gray-100 group-hover:text-purple-300 transition-colors">{title || "Untitled Resume"}</h3>
          <p className="text-xs text-gray-400">Uploaded: {date || "Unknown date"}</p>
        </div>
        {score && (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0B1120] border border-white/10 shadow-inner">
            <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{score}</span>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-end mt-6">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status === 'analyzed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
          {status === 'analyzed' ? 'Analyzed' : 'Pending'}
        </span>
        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">View Report &rarr;</button>
      </div>
    </div>
  );
};

export default ResumeCard;
