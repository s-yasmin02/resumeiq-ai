import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

const DashboardPage = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await api.get('/resumes/my-resumes');
        setResumes(res.data);
      } catch (error) {
        console.error('Failed to fetch resumes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  const handleAnalyze = (resumeId) => {
    navigate(`/analysis/${resumeId}`);
  };

  return (
    <div className="flex bg-[#0B1120] min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-white">Dashboard Overview</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
            <p className="text-gray-400 text-sm font-medium mb-1">Total Resumes Uploaded</p>
            <p className="text-3xl font-bold text-white">{resumes.length}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
            <p className="text-gray-400 text-sm font-medium mb-1">Average Score</p>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">78%</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
            <p className="text-gray-400 text-sm font-medium mb-1">Interviews Landed</p>
            <p className="text-3xl font-bold text-green-400">2</p>
          </div>
        </div>

        {/* Uploaded Resumes */}
        <h2 className="text-xl font-semibold mb-4 text-gray-200">Your Resumes</h2>
        
        {loading ? (
          <div className="text-purple-400 animate-pulse flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading resumes...
          </div>
        ) : resumes.length === 0 ? (
          <div className="text-gray-400 bg-white/5 border border-white/10 rounded-xl p-8 text-center">
            No resumes uploaded yet. Head over to the Upload page to get started!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {resumes.map(resume => (
              <div key={resume._id} className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md flex flex-col justify-between hover:bg-white/10 transition duration-300">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-white truncate pr-4" title={resume.originalFileName}>
                      {resume.originalFileName}
                    </h3>
                    <svg className="w-6 h-6 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  </div>
                  <p className="text-sm text-gray-400 mb-6">Uploaded: {new Date(resume.createdAt).toLocaleDateString()}</p>
                </div>
                
                <button 
                  onClick={() => handleAnalyze(resume._id)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex justify-center items-center shadow-lg"
                >
                  Analyze Resume
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
