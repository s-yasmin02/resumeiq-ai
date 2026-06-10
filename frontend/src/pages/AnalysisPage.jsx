import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ATSScoreCard from '../components/ATSScoreCard';
import SkillsList from '../components/SkillsList';
import api from '../services/api';

const AnalysisPage = () => {
  const { resumeId } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Job Match State
  const [activeTab, setActiveTab] = useState('ats'); // 'ats' | 'jobMatch'
  const [jdText, setJdText] = useState('');
  const [jobMatch, setJobMatch] = useState(null);
  const [matchLoading, setMatchLoading] = useState(false);
  const [matchError, setMatchError] = useState('');

  useEffect(() => {
    const runAnalysis = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.post(`/analysis/${resumeId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setAnalysis(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to analyze the resume.');
        console.error('Analysis error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (resumeId) {
      runAnalysis();
    } else {
      setError('No resume ID provided.');
      setLoading(false);
    }
  }, [resumeId]);

  const handleJobMatch = async () => {
    if (!jdText.trim()) {
      setMatchError('Please paste a job description to analyze.');
      return;
    }
    setMatchLoading(true);
    setMatchError('');
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(`/analysis/job-match/${resumeId}`, 
        { jobDescription: jdText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJobMatch(response.data);
    } catch (err) {
      setMatchError(err.response?.data?.message || 'Failed to analyze job match.');
    } finally {
      setMatchLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex bg-[#030712] min-h-screen text-gray-100 font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-l-2 border-r-2 border-purple-500 animate-spin opacity-70" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="text-xl font-medium tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse">Running advanced AI analysis...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex bg-[#030712] min-h-screen text-gray-100 font-sans">
        <Sidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl max-w-lg text-center shadow-2xl">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-red-400 mb-3">Analysis Failed</h3>
            <p className="text-gray-300 text-lg leading-relaxed">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="flex bg-[#030712] min-h-screen text-gray-100 font-sans selection:bg-purple-500/30">
      <Sidebar />
      <div className="flex-1 p-4 md:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pt-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
                Analysis Results
              </h1>
              <p className="text-gray-400 text-lg">Review your automated ATS feedback below.</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mb-8 border-b border-white/10 pb-4">
            <button 
              onClick={() => setActiveTab('ats')}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all ${activeTab === 'ats' ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              ATS Score
            </button>
            <button 
              onClick={() => setActiveTab('jobMatch')}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all ${activeTab === 'jobMatch' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              Job Match
            </button>
            <button 
              onClick={() => setActiveTab('ai')}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all ${activeTab === 'ai' ? 'bg-green-500 text-white shadow-lg shadow-green-500/25' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              AI Insights
            </button>
          </div>
          
          {/* ATS Tab Content */}
          {activeTab === 'ats' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ATSScoreCard score={analysis.atsScore} />
              
              <SkillsList skillsFound={analysis.skillsFound} missingSkills={analysis.missingSkills} />

              {/* Suggestions */}
              <div className="bg-[#111827] border border-white/5 p-8 md:p-10 rounded-3xl shadow-2xl mt-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-white/10">
                  <div className="flex items-center">
                    <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 mr-5">
                      <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white tracking-wide">Actionable Insights</h3>
                      <p className="text-gray-400 text-sm mt-1.5 font-medium">Critical recommendations to improve your format.</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-5">
                  {analysis.suggestions && analysis.suggestions.length > 0 ? (
                    analysis.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start bg-[#1F2937] hover:bg-[#374151] transition-all p-6 rounded-2xl border border-white/5 shadow-sm group">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-base mr-6 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all">
                          {index + 1}
                        </div>
                        <p className="text-gray-200 leading-relaxed text-lg pt-1.5 font-medium">{suggestion}</p>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center p-12 border-2 border-dashed border-white/10 rounded-3xl bg-white/5">
                      <p className="text-green-400 font-bold text-xl flex items-center">
                        <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Your resume structure looks perfect! No structural suggestions.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Job Match Tab Content */}
          {activeTab === 'jobMatch' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Job Description Input Area */}
              <div className="bg-[#111827] border border-white/5 p-8 md:p-10 rounded-3xl shadow-2xl mb-8">
                <h3 className="text-2xl font-black text-white mb-3">Paste Job Description</h3>
                <p className="text-gray-400 mb-6">We will compare your uploaded resume against the job description to calculate a match score and identify missing keywords.</p>
                
                <textarea 
                  className="w-full h-48 bg-black/30 border border-white/10 rounded-2xl p-5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all mb-4 resize-none"
                  placeholder="Paste the full job description here..."
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                ></textarea>

                {matchError && (
                  <p className="text-red-400 mb-4 font-medium">{matchError}</p>
                )}

                <button 
                  onClick={handleJobMatch}
                  disabled={matchLoading || !jdText.trim()}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {matchLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing Match...
                    </>
                  ) : (
                    'Analyze Fit'
                  )}
                </button>
              </div>

              {/* Job Match Results */}
              {jobMatch && (
                <div className="animate-in fade-in zoom-in-95 duration-500">
                  <ATSScoreCard score={jobMatch.matchPercentage} />
                  
                  <SkillsList skillsFound={jobMatch.matchingSkills} missingSkills={jobMatch.missingSkills} />

                  {/* Suggestions */}
                  <div className="bg-[#111827] border border-white/5 p-8 md:p-10 rounded-3xl shadow-2xl mt-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-white/10">
                      <div className="flex items-center">
                        <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 mr-5">
                          <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-white tracking-wide">Match Insights</h3>
                          <p className="text-gray-400 text-sm mt-1.5 font-medium">Tips to tailor your resume for this specific role.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-5">
                      {jobMatch.suggestions && jobMatch.suggestions.length > 0 ? (
                        jobMatch.suggestions.map((suggestion, index) => (
                          <div key={index} className="flex items-start bg-[#1F2937] hover:bg-[#374151] transition-all p-6 rounded-2xl border border-white/5 shadow-sm group">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-base mr-6 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all">
                              {index + 1}
                            </div>
                            <p className="text-gray-200 leading-relaxed text-lg pt-1.5 font-medium">{suggestion}</p>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center justify-center p-12 border-2 border-dashed border-white/10 rounded-3xl bg-white/5">
                          <p className="text-green-400 font-bold text-xl flex items-center">
                            <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Perfect match! No suggestions found.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* AI Insights Tab Content */}
          {activeTab === 'ai' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {!analysis.aiFeedback ? (
                <div className="flex items-center justify-center p-12 border border-white/10 rounded-3xl bg-white/5 mt-8">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h3 className="text-xl font-bold text-gray-300 mb-2">No AI Feedback Available</h3>
                    <p className="text-gray-400">This resume was analyzed before the AI Insights feature was enabled, or the API key was not configured.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 mt-4">
                  {/* Summary Section */}
                  <div className="bg-[#111827] border border-white/5 p-8 rounded-3xl shadow-2xl">
                    <h3 className="text-2xl font-black text-white mb-4 flex items-center">
                      <svg className="w-6 h-6 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Executive Summary
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-lg">{analysis.aiFeedback.summary}</p>
                  </div>

                  {/* ATS Feedback Section */}
                  <div className="bg-[#111827] border border-white/5 p-8 rounded-3xl shadow-2xl">
                    <h3 className="text-2xl font-black text-white mb-4 flex items-center">
                      <svg className="w-6 h-6 mr-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      ATS Compatibility
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-lg">{analysis.aiFeedback.atsFeedback}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Missing Sections */}
                    <div className="bg-[#111827] border border-white/5 p-8 rounded-3xl shadow-2xl">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        Missing Sections
                      </h3>
                      {analysis.aiFeedback.missingSections && analysis.aiFeedback.missingSections.length > 0 ? (
                        <ul className="space-y-3">
                          {analysis.aiFeedback.missingSections.map((section, idx) => (
                            <li key={idx} className="text-gray-300 flex items-start">
                              <span className="text-red-400 mr-2 mt-1">•</span> {section}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 italic">No missing sections identified.</p>
                      )}
                    </div>

                    {/* Skill Recommendations */}
                    <div className="bg-[#111827] border border-white/5 p-8 rounded-3xl shadow-2xl">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        Skill Recommendations
                      </h3>
                      {analysis.aiFeedback.skillRecommendations && analysis.aiFeedback.skillRecommendations.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {analysis.aiFeedback.skillRecommendations.map((skill, idx) => (
                            <span key={idx} className="bg-blue-500/10 border border-blue-500/20 text-blue-300 px-3 py-1.5 rounded-full text-sm font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">No additional skills recommended.</p>
                      )}
                    </div>
                  </div>

                  {/* Improvement Suggestions */}
                  <div className="bg-[#111827] border border-white/5 p-8 rounded-3xl shadow-2xl">
                    <h3 className="text-2xl font-black text-white mb-6 flex items-center">
                      <svg className="w-6 h-6 mr-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Actionable Improvements
                    </h3>
                    {analysis.aiFeedback.improvementSuggestions && analysis.aiFeedback.improvementSuggestions.length > 0 ? (
                      <div className="grid grid-cols-1 gap-4">
                        {analysis.aiFeedback.improvementSuggestions.map((suggestion, idx) => (
                          <div key={idx} className="flex items-start bg-white/5 p-5 rounded-2xl border border-white/5">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/10 text-yellow-400 flex items-center justify-center font-bold mr-4">
                              {idx + 1}
                            </div>
                            <p className="text-gray-200 mt-1">{suggestion}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">Your resume looks great! No specific improvements suggested.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
