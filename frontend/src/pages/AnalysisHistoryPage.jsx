import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

const AnalysisHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/analysis/history');
        setHistory(res.data);
      } catch (err) {
        console.error('Failed to fetch analysis history:', err);
        setError('Failed to load analysis history.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleViewAnalysis = (resumeId) => {
    navigate(`/analysis/${resumeId}`);
  };

  return (
    <div className="flex bg-[#0B1120] min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Analysis History</h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center text-purple-400 animate-pulse">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading history...
          </div>
        ) : history.length === 0 ? (
          <div className="text-gray-400 bg-white/5 border border-white/10 rounded-xl p-8 text-center">
            No analysis history found. Upload and analyze a resume to see it here!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {history.map((item) => (
              <div key={item._id} className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md flex flex-col justify-between hover:bg-white/10 transition duration-300">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white truncate pr-4" title={item.resume?.originalFileName || 'Unknown Resume'}>
                      {item.resume?.originalFileName || 'Unknown Resume'}
                    </h3>
                    <div className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                      {item.atsScore}% ATS
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-400 mb-6">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                <button 
                  onClick={() => handleViewAnalysis(item.resume?._id)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex justify-center items-center shadow-lg"
                >
                  View Analysis
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisHistoryPage;
