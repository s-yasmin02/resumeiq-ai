import React from 'react';

const SkillsTags = ({ title, skills, type }) => {
  const isFound = type === 'found';
  
  const titleColor = isFound ? 'text-green-400' : 'text-red-400';
  const tagBg = isFound ? 'bg-green-500/10 hover:bg-green-500/20' : 'bg-red-500/10 hover:bg-red-500/20';
  const tagBorder = isFound ? 'border-green-500/20 hover:border-green-500/40' : 'border-red-500/20 hover:border-red-500/40';
  const tagText = isFound ? 'text-green-300' : 'text-red-300';
  const iconBg = isFound ? 'bg-green-500/10' : 'bg-red-500/10';
  
  const iconPath = isFound 
    ? "M5 13l4 4L19 7" 
    : "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z";

  return (
    <div className="bg-[#111827] border border-white/5 p-6 md:p-8 rounded-3xl shadow-xl h-full flex flex-col transition-all hover:border-white/10 group">
      <div className="flex items-center mb-6">
        <div className={`p-2.5 rounded-xl ${iconBg} mr-4 transition-colors group-hover:bg-opacity-20`}>
          <svg className={`w-6 h-6 ${titleColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={iconPath}></path>
          </svg>
        </div>
        <h3 className={`text-2xl font-bold tracking-tight ${titleColor}`}>
          {title}
        </h3>
      </div>
      
      <div className="flex flex-wrap gap-3 mt-auto">
        {skills && skills.length > 0 ? (
          skills.map((skill, index) => (
            <span 
              key={index} 
              className={`px-4 py-2 border rounded-xl text-sm font-semibold tracking-wide transition-colors cursor-default shadow-sm ${tagBg} ${tagBorder} ${tagText}`}
            >
              {skill}
            </span>
          ))
        ) : (
          <div className="w-full py-8 text-center border-2 border-dashed border-white/10 rounded-2xl bg-white/5">
            <p className="text-gray-400 text-sm font-medium">
              {isFound ? "No standard skills detected." : "All standard skills detected!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsTags;
