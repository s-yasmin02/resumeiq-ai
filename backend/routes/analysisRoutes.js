const express = require('express');
const router = express.Router();
const { analyzeResume, getAnalysisHistory, matchJobDescription } = require('../controllers/analysisController');
const { protect } = require('../middleware/authMiddleware');

// Protect all analysis routes
router.use(protect);

// Route to get all previous analyses for the user
router.get('/history', getAnalysisHistory);

// Route to trigger an analysis against a job description
router.post('/job-match/:resumeId', matchJobDescription);

// Route to trigger an analysis on a specific resume
router.post('/:resumeId', analyzeResume);

module.exports = router;
