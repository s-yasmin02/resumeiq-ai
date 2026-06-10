const mongoose = require('mongoose');

const resumeAnalysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Resume',
    },
    atsScore: {
      type: Number,
      required: true,
    },
    skillsFound: {
      type: [String],
      default: [],
    },
    missingSkills: {
      type: [String],
      default: [],
    },
    suggestions: {
      type: [String],
      default: [],
    },
    aiFeedback: {
      type: {
        summary: String,
        atsFeedback: String,
        missingSections: [String],
        improvementSuggestions: [String],
        skillRecommendations: [String],
      },
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const ResumeAnalysis = mongoose.model('ResumeAnalysis', resumeAnalysisSchema);

module.exports = ResumeAnalysis;
