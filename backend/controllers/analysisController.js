const Resume = require('../models/Resume');
const ResumeAnalysis = require('../models/ResumeAnalysis');
const JobMatch = require('../models/JobMatch');
const { extractTextFromPDF } = require('../utils/pdfParser');
const { analyzeResume: runAnalysis } = require('../utils/resumeAnalyzer');
const { analyzeJobMatch } = require('../utils/jobMatchAnalyzer');
const { analyzeResumeWithAI } = require('../services/openaiService');

// @desc    Analyze an uploaded resume
// @route   POST /api/analysis/:resumeId
// @access  Private
const analyzeResume = async (req, res) => {
  try {
    const { resumeId } = req.params;

    // 1. Find resume in database
    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Ensure the resume belongs to the authenticated user
    if (resume.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to analyze this resume' });
    }

    // 2. Download PDF from resumeUrl using native fetch
    const response = await fetch(resume.resumeUrl);

    console.log("Resume URL:", resume.resumeUrl);
    console.log("Content-Type:", response.headers.get("content-type"));

    if (!response.ok) {
      throw new Error('Failed to fetch resume file from Cloudinary');
    }

    const arrayBuffer = await response.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);

    console.log("Buffer Size:", pdfBuffer.length);

    // 3. Extract text using pdfParser
    const extractedText = await extractTextFromPDF(pdfBuffer);

    // 4. Analyze text using local resumeAnalyzer
    const analysisResult = runAnalysis(extractedText);

    // 4.5. Get AI Feedback from OpenAI
    const aiFeedback = await analyzeResumeWithAI(extractedText);

    // 5. Save result in ResumeAnalysis collection
    const savedAnalysis = await ResumeAnalysis.create({
      user: req.user.id,
      resume: resume._id,
      atsScore: analysisResult.atsScore,
      skillsFound: analysisResult.skillsFound,
      missingSkills: analysisResult.missingSkills,
      suggestions: analysisResult.suggestions,
      aiFeedback: aiFeedback,
    });

    // 6. Return analysis result
    res.status(200).json(savedAnalysis);

  } catch (error) {
    console.error('Resume Analysis Error:', error);
    res.status(500).json({ message: 'Failed to analyze resume', error: error.message });
  }
};

// @desc    Get user's previous analyses
// @route   GET /api/analysis/history
// @access  Private
const getAnalysisHistory = async (req, res) => {
  try {
    const history = await ResumeAnalysis.find({ user: req.user.id })
      .populate('resume', 'originalFileName resumeUrl')
      .sort({ createdAt: -1 });

    res.status(200).json(history);
  } catch (error) {
    console.error('Fetch Analysis History Error:', error);
    res.status(500).json({ message: 'Server error fetching history', error: error.message });
  }
};

// @desc    Analyze a resume against a job description
// @route   POST /api/analysis/job-match/:resumeId
// @access  Private
const matchJobDescription = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ message: 'Job description text is required' });
    }

    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (resume.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to analyze this resume' });
    }

    const response = await fetch(resume.resumeUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch resume file from Cloudinary');
    }

    const arrayBuffer = await response.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);
    const extractedText = await extractTextFromPDF(pdfBuffer);

    const matchResult = analyzeJobMatch(extractedText, jobDescription);

    const savedMatch = await JobMatch.create({
      user: req.user.id,
      resume: resume._id,
      jobDescriptionText: jobDescription,
      matchPercentage: matchResult.matchPercentage,
      matchingSkills: matchResult.matchingSkills,
      missingSkills: matchResult.missingSkills,
      suggestions: matchResult.suggestions,
    });

    res.status(200).json(savedMatch);
  } catch (error) {
    console.error('Job Match Analysis Error:', error);
    res.status(500).json({ message: 'Failed to analyze job match', error: error.message });
  }
};

module.exports = {
  analyzeResume,
  getAnalysisHistory,
  matchJobDescription,
};
