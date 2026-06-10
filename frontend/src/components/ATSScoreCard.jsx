import React from 'react';

const ATSScoreCard = ({ score }) => {
  let scoreColorClass = 'text-red-400';
  let strokeColor = 'stroke-red-400';
  let bgGradient = 'from-red-500/10 to-transparent';
  
  if (score >= 90) {
    scoreColorClass = 'text-green-400';
    strokeColor = 'stroke-green-400';
    bgGradient = 'from-green-500/10 to-transparent';
  } else if (score >= 70) {
    scoreColorClass = 'text-yellow-400';
    strokeColor = 'stroke-yellow-400';
    bgGradient = 'from-yellow-500/10 to-transparent';
  }

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`bg-gradient-to-br ${bgGradient} bg-[#111827] border border-white/5 p-8 md:p-10 rounded-3xl shadow-2xl mb-8 flex flex-col md:flex-row items-center justify-between gap-10 transition-all hover:border-white/10`}>
      <div className="text-center md:text-left flex-1 max-w-2xl">
        <div className="inline-flex items-center space-x-2 bg-white/5 rounded-full px-4 py-1.5 border border-white/10 mb-6">
          <span className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current ${scoreColorClass}`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 bg-current ${scoreColorClass}`}></span>
          </span>
          <span className="text-xs font-semibold tracking-wider uppercase text-gray-300">Analysis Complete</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">ATS Compatibility Score</h2>
        <p className="text-gray-400 text-lg leading-relaxed">
          Your resume has been parsed and scored against modern Applicant Tracking Systems. This reflects your keyword density, section structure, and machine readability.
        </p>
      </div>
      
      <div className="relative flex items-center justify-center shrink-0">
        {/* SVG Circular Progress */}
        <svg className="w-56 h-56 transform -rotate-90 drop-shadow-2xl">
          {/* Background circle */}
          <circle
            className="stroke-gray-800"
            strokeWidth="14"
            fill="transparent"
            r={radius}
            cx="112"
            cy="112"
          />
          {/* Progress circle */}
          <circle
            className={`${strokeColor} transition-all duration-1500 ease-out`}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            fill="transparent"
            r={radius}
            cx="112"
            cy="112"
            style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className={`text-6xl font-black tracking-tighter ${scoreColorClass}`}>
            {score}
          </span>
          <span className="text-base font-medium text-gray-500 mt-1 tracking-widest uppercase">Out of 100</span>
        </div>
      </div>
    </div>
  );
};

export default ATSScoreCard;
