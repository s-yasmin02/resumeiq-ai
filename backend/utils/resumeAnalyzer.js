/**
 * Analyzes extracted resume text to detect skills, sections, and generate a realistic ATS score.
 * 
 * @param {string} text - The raw text extracted from the resume.
 * @returns {Object} { atsScore, skillsFound, missingSkills, suggestions }
 */
const analyzeResume = (text) => {
  const commonSkills = [
    'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 
    'Java', 'Spring Boot', 'Python', 'SQL', 'Git', 'Docker', 'AWS',
    'TypeScript', 'GraphQL', 'Next.js', 'Kubernetes', 'Linux', 'C++', 'C#'
  ];

  const textLower = text.toLowerCase();
  let atsScore = 100; // Start at 100, deduct points for missing elements
  const suggestions = [];

  // 1. Detect Skills
  const skillsFound = [];
  const missingSkills = [];

  commonSkills.forEach(skill => {
    // Regex matches whole words, escaping special chars like ++ or .
    const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedSkill}\\b`, 'i');
    
    if (regex.test(textLower)) {
      skillsFound.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  // 2. Score Contact Information (Regex parsing)
  const hasEmail = /[\\w.-]+@[\\w.-]+\\.\\w+/.test(textLower);
  const hasPhone = /\\b\\d{3}[-.\\s]?\\d{3}[-.\\s]?\\d{4}\\b/.test(textLower);
  const hasLinkedIn = /linkedin\\.com/i.test(textLower);
  
  if (!hasEmail) {
    atsScore -= 10;
    suggestions.push('Critical: Include a professional email address.');
  }
  if (!hasPhone) {
    atsScore -= 10;
    suggestions.push('Critical: Include a valid phone number so recruiters can reach you.');
  }
  if (!hasLinkedIn) {
    atsScore -= 5;
    suggestions.push('Include a link to your LinkedIn profile to boost your professional credibility.');
  }

  // 3. Detect Major Sections
  const hasEducation = /\\b(education|university|college|degree|bachelor|master|phd)\\b/i.test(textLower);
  const hasExperience = /\\b(experience|work history|employment|career|professional)\\b/i.test(textLower);
  const hasProjects = /\\b(projects|portfolio|open source)\\b/i.test(textLower);
  const hasSkillsSection = /\\b(skills|technologies|tools|languages|frameworks)\\b/i.test(textLower);

  if (!hasExperience) {
    atsScore -= 20;
    suggestions.push('Critical: Add an "Experience" section detailing your past roles and achievements.');
  }
  if (!hasEducation) {
    atsScore -= 15;
    suggestions.push('Add an "Education" section outlining your academic background.');
  }
  if (!hasProjects) {
    atsScore -= 10;
    suggestions.push('Consider adding a "Projects" section to showcase practical, hands-on experience.');
  }
  if (!hasSkillsSection) {
    atsScore -= 10;
    suggestions.push('Add a dedicated "Skills" section to help ATS scanners easily index your technical abilities.');
  }

  // 4. Skills Density Weighting
  if (skillsFound.length === 0) {
    atsScore -= 15;
    suggestions.push('No standard technical skills were detected. Ensure you explicitly list your tech stack.');
  } else if (skillsFound.length < 4) {
    atsScore -= 5;
    suggestions.push(`We only detected ${skillsFound.length} standard tech skills. Try to be more comprehensive.`);
  }

  // 5. Length and Content Check
  const wordCount = text.split(/\\s+/).length;
  if (wordCount < 150) {
    atsScore -= 15;
    suggestions.push(`Your resume is very short (approx. ${wordCount} words). Elaborate on your bullet points to provide more context and keywords.`);
  } else if (wordCount > 1200) {
    atsScore -= 10;
    suggestions.push(`Your resume is quite long (approx. ${wordCount} words). Consider trimming it to remain concise and impactful.`);
  }

  // 6. Action Verbs Check
  const actionVerbs = ['developed', 'led', 'managed', 'created', 'designed', 'built', 'implemented', 'optimized', 'increased', 'reduced', 'collaborated'];
  let verbCount = 0;
  actionVerbs.forEach(verb => {
    if (new RegExp(`\\b${verb}\\b`, 'i').test(textLower)) verbCount++;
  });

  if (verbCount < 3) {
    atsScore -= 10;
    suggestions.push('Use strong action verbs (e.g., "developed", "optimized", "led") to start your experience bullet points.');
  }

  // 7. Final Score Normalization
  atsScore = Math.max(0, Math.min(atsScore, 100)); // Cap between 0 and 100

  if (atsScore >= 95 && suggestions.length === 0) {
    suggestions.push("Excellent work! Your resume format looks highly compatible with standard ATS systems and contains strong keyword density.");
  }

  return {
    atsScore,
    skillsFound,
    missingSkills,
    suggestions
  };
};

module.exports = { analyzeResume };
