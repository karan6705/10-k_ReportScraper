// frontend/src/MainApp.jsx
// Compact Single-Page Beautiful UI - Version 8.0
// Timestamp: 2025-07-26T04:40:00Z

import React, { useState } from 'react';
import './index.css';

const API_ENDPOINT = 'https://one0-k-reportscraper.onrender.com/extract';

const MainApp = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [aiModel, setAiModel] = useState('gemini-2.0-flash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);

  const onFileSelect = (event) => {
    const file = event.target.files[0];
    handleFileSelection(file);
  };

  const handleFileSelection = (file) => {
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setErrorMessage('');
      setDownloadUrl('');
    } else {
      setErrorMessage('Please select a valid PDF file');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelection(file);
  };

  const extractReport = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    setProgress(0);
    const uploadData = new FormData();
    uploadData.append('report', selectedFile);
    uploadData.append('model', aiModel);

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 15, 90));
    }, 500);

    try {
      console.log('🚀 COMPACT BEAUTIFUL UI VERSION 8.0 DEPLOYED!');
      console.log('API Endpoint:', API_ENDPOINT);
      console.log('Selected File:', selectedFile.name);
      console.log('AI Model:', aiModel);
      
      const apiResponse = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: uploadData,
      });
      
      clearInterval(progressInterval);
      setProgress(100);
      
      console.log('API Response Status:', apiResponse.status);
      console.log('API Response OK:', apiResponse.ok);
      
      if (!apiResponse.ok) {
        const errorDetails = await apiResponse.text();
        console.error('API Error Details:', errorDetails);
        throw new Error(`Processing failed: ${errorDetails}`);
      }
      
      const resultData = await apiResponse.json();
      console.log('API Success Result:', resultData);
      
      setDownloadUrl(resultData.pdfUrl);
      setErrorMessage('');
    } catch (error) {
      console.error('Extraction Error:', error);
      setErrorMessage(error.message);
      clearInterval(progressInterval);
    } finally {
      setIsProcessing(false);
      setTimeout(() => setProgress(0), 2000);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Blurred Navigation Bar */}
      <nav className="relative z-50 bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-2 rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">ReportExtractor Pro</h1>
                <p className="text-xs text-blue-200">AI-Powered 10-K Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-400/20 text-green-200 border border-green-400/30">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Online
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Single Page */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Transform Your 
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> 10-K Reports</span>
          </h1>
          <p className="text-xl text-blue-200 mb-6 max-w-3xl mx-auto">
            Upload any SEC filing and get instant AI-powered analysis with key insights and structured summaries
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-300">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Secure Processing</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Instant Results</span>
            </div>
          </div>
        </div>

        {/* Main Processing Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column - File Upload */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Upload 10-K Report
                  </h3>
                  
                  {/* File Drop Zone */}
                  <div
                    className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 ${
                      dragOver 
                        ? 'border-cyan-400 bg-cyan-400/10' 
                        : selectedFile 
                          ? 'border-green-400 bg-green-400/10' 
                          : 'border-white/30 hover:border-white/50 hover:bg-white/5'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={onFileSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    
                    {selectedFile ? (
                      <div className="space-y-3">
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                          <div className="flex items-center space-x-3">
                            <div className="bg-red-500/20 p-2 rounded-lg">
                              <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="flex-1 text-left">
                              <p className="font-medium text-white">{selectedFile.name}</p>
                              <p className="text-sm text-blue-200">{formatFileSize(selectedFile.size)}</p>
                            </div>
                            <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <p className="text-sm text-green-400 font-medium">Ready for analysis!</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-lg font-medium text-white">Drop your PDF here</p>
                          <p className="text-blue-200 mt-1">or click to browse files</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Model Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                    AI Model
                  </h3>
                  <div className="space-y-3">
                    <label className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      aiModel === 'gemini-2.0-flash' 
                        ? 'border-cyan-400 bg-cyan-400/10' 
                        : 'border-white/20 hover:border-white/40'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <input 
                          type="radio" 
                          value="gemini-2.0-flash"
                          checked={aiModel === 'gemini-2.0-flash'}
                          onChange={(e) => setAiModel(e.target.value)}
                          className="text-cyan-400"
                        />
                        <div>
                          <h4 className="font-semibold text-white">⚡ Gemini 2.0 Flash</h4>
                          <p className="text-sm text-blue-200">Fast processing • Quick insights</p>
                        </div>
                      </div>
                    </label>
                    <label className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      aiModel === 'gemini-2.0-pro' 
                        ? 'border-cyan-400 bg-cyan-400/10' 
                        : 'border-white/20 hover:border-white/40'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <input 
                          type="radio" 
                          value="gemini-2.0-pro"
                          checked={aiModel === 'gemini-2.0-pro'}
                          onChange={(e) => setAiModel(e.target.value)}
                          className="text-cyan-400"
                        />
                        <div>
                          <h4 className="font-semibold text-white">🧠 Gemini 2.0 Pro</h4>
                          <p className="text-sm text-blue-200">Deep analysis • Detailed insights</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column - Processing & Results */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Process & Download
                  </h3>
                  
                  <button
                    onClick={extractReport}
                    disabled={isProcessing || !selectedFile}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-3 mb-6"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Analyze Report</span>
                      </>
                    )}
                  </button>

                  {/* Progress Bar */}
                  {isProcessing && (
                    <div className="mb-6">
                      <div className="bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                        <div 
                          className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-500 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-blue-200 mt-2 text-center">
                        {progress < 30 ? 'Uploading...' : 
                         progress < 60 ? 'Analyzing...' : 
                         progress < 90 ? 'Generating insights...' : 
                         'Almost done...'}
                      </p>
                    </div>
                  )}

                  {/* Error Message */}
                  {errorMessage && (
                    <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-6 backdrop-blur-sm">
                      <div className="flex items-center space-x-3">
                        <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <h4 className="font-semibold text-red-300">Error</h4>
                          <p className="text-red-200 text-sm">{errorMessage}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Success & Download */}
                  {downloadUrl && (
                    <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6 backdrop-blur-sm text-center">
                      <div className="bg-green-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-green-300 mb-2">Analysis Complete!</h3>
                      <p className="text-green-200 mb-6">Your report is ready for download</p>
                      <a
                        href={downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Download Report</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-blue-200">
          <p className="text-sm">
            Powered by <span className="font-semibold text-cyan-400">Google Generative AI</span> • 
            Built with ❤️ using <span className="font-semibold text-purple-400">FastAPI & React</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default MainApp;
