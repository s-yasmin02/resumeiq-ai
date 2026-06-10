const Resume = require('../models/Resume');
const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream');

// @desc    Upload a resume
// @route   POST /api/resumes/upload
// @access  Private
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Function to handle stream upload to Cloudinary
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'raw', folder: 'resumeiq_resumes' },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        // Convert memory buffer to readable stream and pipe to cloudinary
        const readableStream = new Readable({
          read() {
            this.push(req.file.buffer);
            this.push(null); // Signifies the end of the stream
          },
        });

        readableStream.pipe(uploadStream);
      });
    };

    // Execute upload
    const result = await streamUpload(req);

    // Save resume document to MongoDB
    const resume = await Resume.create({
      user: req.user.id,
      originalFileName: req.file.originalname,
      resumeUrl: result.secure_url,
      cloudinaryPublicId: result.public_id,
    });

    res.status(201).json(resume);
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Failed to upload resume', error: error.message });
  }
};

// @desc    Get user's resumes
// @route   GET /api/resumes
// @access  Private
const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    console.error('Fetch Resumes Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  uploadResume,
  getMyResumes,
};
