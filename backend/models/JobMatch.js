const mongoose = require('mongoose');

const jobMatchSchema = new mongoose.Schema(
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
    jobDescriptionText: {
      type: String,
      required: true,
    },
    matchPercentage: {
      type: Number,
      required: true,
    },
    matchingSkills: {
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
  },
  {
    timestamps: true,
  }
);

const JobMatch = mongoose.model('JobMatch', jobMatchSchema);

module.exports = JobMatch;
