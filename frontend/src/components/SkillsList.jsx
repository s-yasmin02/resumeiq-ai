import React from 'react';
import SkillsTags from './SkillsTags';

const SkillsList = ({ skillsFound, missingSkills }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <SkillsTags title="Skills Found" skills={skillsFound} type="found" />
      <SkillsTags title="Missing Skills" skills={missingSkills} type="missing" />
    </div>
  );
};

export default SkillsList;
