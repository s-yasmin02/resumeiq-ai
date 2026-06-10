const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    originalFileName: {
      type: String,
      required: true,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    cloudinaryPublicId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
