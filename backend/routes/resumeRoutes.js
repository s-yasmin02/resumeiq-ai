const express = require('express');
const router = express.Router();
const { uploadResume, getMyResumes } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Route to handle resume uploads (protected and uses multer middleware)
router.post('/upload', protect, upload.single('resume'), uploadResume);

// Route to fetch a user's resumes (protected)
router.get('/my-resumes', protect, getMyResumes);

module.exports = router;
