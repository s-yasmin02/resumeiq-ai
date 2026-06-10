import React from 'react';

const AnalysisCard = ({ score, feedback }) => {
  return (
    <div className="bg-white text-gray-800 shadow-md rounded-lg p-6 border-l-4 border-blue-500">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Analysis Score</h3>
        <span className="text-2xl font-extrabold text-blue-600">{score || "0"}/100</span>
      </div>
      <p className="text-gray-600">{feedback || "No feedback available."}</p>
    </div>
  );
};

export default AnalysisCard;
