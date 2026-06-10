const analyzeJobMatch = (resumeText, jdText) => {
  const commonSkills = [
    'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 
    'Java', 'Spring Boot', 'Python', 'SQL', 'Git', 'Docker', 'AWS',
    'TypeScript', 'GraphQL', 'Next.js', 'Kubernetes', 'Linux', 'C++', 'C#',
    'Agile', 'Scrum', 'CI/CD', 'Jenkins', 'Terraform', 'Vue.js', 'Angular',
    'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'Azure', 'GCP', 'HTML', 'CSS', 'SASS'
  ];

  const resumeLower = resumeText.toLowerCase();
  const jdLower = jdText.toLowerCase();

  // Find standard skills required in the Job Description
  const requiredSkills = [];
  commonSkills.forEach(skill => {
    const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedSkill}\\b`, 'i');
    if (regex.test(jdLower)) {
      requiredSkills.push(skill);
    }
  });

  const matchingSkills = [];
  const missingSkills = [];

  // Check if those required skills are explicitly mentioned in the resume
  requiredSkills.forEach(skill => {
    const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedSkill}\\b`, 'i');
    if (regex.test(resumeLower)) {
      matchingSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  let matchPercentage = 0;
  if (requiredSkills.length > 0) {
    matchPercentage = Math.round((matchingSkills.length / requiredSkills.length) * 100);
  } else {
    // If no standard skills found in JD, look for generic keywords or default to 50
    matchPercentage = 50; 
  }

  const suggestions = [];
  if (missingSkills.length > 0) {
    suggestions.push(`Consider adding the following skills to your resume if you have experience with them: ${missingSkills.slice(0, 5).join(', ')}.`);
  }

  if (matchPercentage < 50) {
    suggestions.push('Your resume seems to be missing many key requirements from this job description. Consider heavily tailoring your bullet points to match the JD.');
  } else if (matchPercentage >= 80) {
    suggestions.push('Strong match! Your resume aligns very well with the core technical requirements of this role.');
  }

  if (requiredSkills.length === 0) {
    suggestions.push('The job description did not contain many standard technical keywords we recognize. Be sure to manually review for soft skills or domain-specific terms.');
  }

  return {
    matchPercentage,
    matchingSkills,
    missingSkills,
    suggestions
  };
};

module.exports = { analyzeJobMatch };
