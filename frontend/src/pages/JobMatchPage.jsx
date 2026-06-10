import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

const JobMatchPage = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loadingResumes, setLoadingResumes] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await api.get('/resumes/my-resumes');
        setResumes(res.data);
        if (res.data.length > 0) {
          setSelectedResume(res.data[0]._id);
        }
      } catch (err) {
        console.error('Failed to fetch resumes:', err);
        setError('Failed to load resumes. Please try again.');
      } finally {
        setLoadingResumes(false);
      }
    };

    fetchResumes();
  }, []);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!selectedResume || !jobDescription.trim()) {
      setError('Please select a resume and provide a job description.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const res = await api.post(`/analysis/job-match/${selectedResume}`, {
        jobDescription,
      });
      setResult(res.data);
    } catch (err) {
      console.error('Analysis failed:', err);
      setError(err.response?.data?.message || 'Failed to analyze job match. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex bg-[#0B1120] min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Job Description Matcher</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md h-fit">
            <h2 className="text-xl font-semibold mb-6 text-gray-200">Analysis Details</h2>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleAnalyze} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Select Resume</label>
                {loadingResumes ? (
                  <div className="text-gray-500 text-sm">Loading resumes...</div>
                ) : (
                  <select
                    value={selectedResume}
                    onChange={(e) => setSelectedResume(e.target.value)}
                    className="w-full bg-[#0B1120] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all appearance-none"
                  >
                    {resumes.length === 0 && <option value="">No resumes found</option>}
                    {resumes.map((resume) => (
                      <option key={resume._id} value={resume._id}>
                        {resume.originalFileName}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Job Description</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here..."
                  rows="8"
                  className="w-full bg-[#0B1120] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isAnalyzing || resumes.length === 0}
                className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex justify-center items-center shadow-lg ${
                  isAnalyzing || resumes.length === 0
                    ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing Match...
                  </>
                ) : (
                  'Analyze Match'
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md min-h-[400px] flex flex-col">
            <h2 className="text-xl font-semibold mb-6 text-gray-200">Match Results</h2>
            
            {!result ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p>Select a resume, paste a job description, and hit Analyze to see the match results here.</p>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in">
                {/* Match Score */}
                <div className="flex items-center justify-between bg-[#0B1120]/50 p-4 rounded-lg border border-white/5">
                  <span className="text-gray-300 font-medium">Match Percentage</span>
                  <span className={`text-3xl font-bold ${
                    result.matchPercentage >= 80 ? 'text-green-400' :
                    result.matchPercentage >= 50 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {result.matchPercentage}%
                  </span>
                </div>

                {/* Matching Skills */}
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Matching Skills
                  </h3>
                  {result.matchingSkills && result.matchingSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {result.matchingSkills.map((skill, index) => (
                        <span key={index} className="bg-green-500/10 border border-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No matching skills found.</p>
                  )}
                </div>

                {/* Missing Skills */}
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    Missing Skills
                  </h3>
                  {result.missingSkills && result.missingSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {result.missingSkills.map((skill, index) => (
                        <span key={index} className="bg-red-500/10 border border-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No missing skills! Great match.</p>
                  )}
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Recommendations
                  </h3>
                  {result.suggestions && result.suggestions.length > 0 ? (
                    <ul className="space-y-2">
                      {result.suggestions.map((suggestion, index) => (
                        <li key={index} className="text-gray-300 text-sm bg-blue-500/5 border border-blue-500/10 p-3 rounded-lg flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">No specific recommendations.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobMatchPage;
