import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

const ResumeUploadPage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];
  const maxSize = 5 * 1024 * 1024; // 5MB

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const validateAndProcessFile = async (selectedFile) => {
    setError(null);
    setUploadProgress(0);
    setSuccess(false);

    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Invalid file type. Please upload a PDF, DOCX, or TXT file.');
      return;
    }

    if (selectedFile.size > maxSize) {
      setError('File size exceeds 5MB limit.');
      return;
    }

    setFile(selectedFile);
    await uploadFile(selectedFile);
  };

  const uploadFile = async (selectedFile) => {
    setUploading(true);
    
    const formData = new FormData();
    formData.append('resume', selectedFile);

    try {
      // Send the actual file via the api service (which automatically attaches the JWT token)
      await api.post('/resumes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        }
      });

      setSuccess(true);
      
      // Wait briefly so the user can see the 100% success state, then redirect
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (err) {
      console.error("Upload Error:", err);
      setError(err.response?.data?.message || 'Failed to upload the file to the server.');
      setFile(null); // Reset the file so the user can try again
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex bg-[#0B1120] min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-3xl mx-auto mt-10">
          <h1 className="text-3xl font-bold mb-2 text-white">Upload Your Resume</h1>
          <p className="text-gray-400 mb-8">We accept PDF, DOCX, and TXT files up to 5MB.</p>

          <div 
            className={`border-2 rounded-3xl p-16 text-center transition-all duration-300 ease-in-out cursor-pointer relative ${
              isDragging 
                ? 'border-solid border-[#9333EA] bg-[#9333EA]/10 shadow-[0_0_20px_rgba(147,51,234,0.3)]' 
                : 'border-dashed border-white/20 bg-white/5 hover:border-[#9333EA]/50 hover:bg-white/10'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !uploading && fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept=".pdf,.docx,.txt"
            />

            <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-transform duration-300 ease-out ${isDragging ? 'scale-105' : 'scale-100'}`}>
              <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            
            {!file ? (
              <>
                <h3 className="text-xl font-semibold text-gray-200 mb-2">Drag & Drop your file here</h3>
                <p className="text-sm text-gray-500 mb-6">or</p>
                <button 
                  className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-6 py-3 rounded-full backdrop-blur-sm transition-all shadow-lg pointer-events-none"
                >
                  Browse Files
                </button>
              </>
            ) : (
              <div className="max-w-md mx-auto text-left" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-200 font-medium truncate pr-4">{file.name}</span>
                  <span className="text-gray-400 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                
                {/* Progress Bar Container */}
                <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2 overflow-hidden border border-white/10 relative">
                  <div 
                    className={`${success ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-[#9333EA]'} h-2.5 rounded-full transition-all duration-300 ease-out absolute top-0 left-0`} 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                
                <p className={`text-sm text-center mt-4 font-medium transition-colors ${success ? 'text-green-400' : 'text-gray-400'}`}>
                  {success ? (
                    'Upload complete! Redirecting to dashboard...'
                  ) : uploadProgress < 100 ? (
                    `Uploading to server... ${uploadProgress}%`
                  ) : (
                    <span className="text-purple-400 animate-pulse">Processing file...</span>
                  )}
                </p>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-center transition-all font-medium">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeUploadPage;
