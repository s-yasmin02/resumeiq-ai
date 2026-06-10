import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ResumeUploadPage from './pages/ResumeUploadPage';
import AnalysisPage from './pages/AnalysisPage';
import AnalysisHistoryPage from './pages/AnalysisHistoryPage';
import JobMatchPage from './pages/JobMatchPage';
import ProfilePage from './pages/ProfilePage';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#0B1120] text-gray-100 font-sans selection:bg-purple-500/30">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/upload" element={
              <ProtectedRoute>
                <ResumeUploadPage />
              </ProtectedRoute>
            } />
            <Route path="/analysis/:resumeId" element={
              <ProtectedRoute>
                <AnalysisPage />
              </ProtectedRoute>
            } />
            <Route path="/history" element={
              <ProtectedRoute>
                <AnalysisHistoryPage />
              </ProtectedRoute>
            } />
            <Route path="/job-match" element={
              <ProtectedRoute>
                <JobMatchPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
