// frontend/src/MainApp.jsx
// Modern Dark/Light Mode UI - Version 10.0
// Timestamp: 2025-07-26T05:00:00Z

import React, { useState, useEffect } from 'react';
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
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const [showDropdown, setShowDropdown] = useState(false);

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

    // Smooth progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 12, 85));
    }, 300);

    try {
      console.log('🚀 MODERN DARK/LIGHT UI VERSION 10.0 DEPLOYED!');
      console.log('API Endpoint:', API_ENDPOINT);
      console.log('Selected File:', selectedFile.name);
      console.log('AI Model:', aiModel);
      
      const apiResponse = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: uploadData,
      });
      
      clearInterval(progressInterval);
      setProgress(100);
      
      if (!apiResponse.ok) {
        const errorDetails = await apiResponse.text();
        throw new Error(`Processing failed: ${errorDetails}`);
      }
      
      const resultData = await apiResponse.json();
      setDownloadUrl(resultData.pdfUrl);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
      clearInterval(progressInterval);
    } finally {
      setIsProcessing(false);
      setTimeout(() => setProgress(0), 3000);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const aiModels = [
    { value: 'gemini-2.0-flash', label: '⚡ Gemini 2.0 Flash', desc: 'Fast processing' },
    { value: 'gemini-2.0-pro', label: '🧠 Gemini 2.0 Pro', desc: 'Deep analysis' }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse ${
          darkMode ? 'bg-blue-500' : 'bg-blue-300'
        }`}></div>
        <div className={`absolute top-1/2 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse ${
          darkMode ? 'bg-purple-500' : 'bg-purple-300'
        }`} style={{animationDelay: '2s'}}></div>
        <div className={`absolute -bottom-40 right-1/3 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse ${
          darkMode ? 'bg-pink-500' : 'bg-pink-300'
        }`} style={{animationDelay: '4s'}}></div>
      </div>

      {/* Blurred Navigation Bar */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-all duration-300 ${
        darkMode 
          ? 'bg-black/20 border-white/10' 
          : 'bg-white/20 border-gray-200/50'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${
                darkMode 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                  : 'bg-gradient-to-r from-blue-400 to-purple-500'
              } shadow-lg transform hover:scale-105 transition-transform`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  ReportExtractor Pro
                </h1>
                <p className={`text-sm ${darkMode ? 'text-blue-200' : 'text-gray-600'}`}>
                  AI-Powered 10-K Analysis Platform
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  darkMode 
                    ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' 
                    : 'bg-gray-700/20 text-gray-700 hover:bg-gray-700/30'
                }`}
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              
              {/* Status Indicator */}
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-full ${
                darkMode 
                  ? 'bg-green-500/20 border border-green-500/30' 
                  : 'bg-green-100 border border-green-200'
              }`}>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className={`text-sm font-medium ${
                  darkMode ? 'text-green-400' : 'text-green-700'
                }`}>Online</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Transform Your{' '}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                10-K Reports
              </span>
            </h1>
            <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Upload any SEC filing and get instant AI-powered analysis with key insights and structured summaries
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['🔒 Secure Processing', '🤖 AI-Powered', '⚡ Instant Results', '📊 Detailed Analysis'].map((feature, index) => (
                <div key={index} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? 'bg-white/10 text-white border border-white/20' 
                    : 'bg-white/80 text-gray-700 border border-gray-200 shadow-sm'
                }`}>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Main Processing Card */}
          <div className={`rounded-3xl shadow-2xl border backdrop-blur-lg transition-all duration-300 ${
            darkMode 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white/70 border-white/50'
          }`}>
            
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Left Column - Upload & Model Selection */}
                <div className="space-y-8">
                  
                  {/* File Upload */}
                  <div>
                    <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      📄 Upload Document
                    </h3>
                    
                    <div
                      className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                        dragOver 
                          ? (darkMode ? 'border-blue-400 bg-blue-400/10' : 'border-blue-500 bg-blue-50')
                          : selectedFile 
                            ? (darkMode ? 'border-green-400 bg-green-400/10' : 'border-green-500 bg-green-50')
                            : (darkMode ? 'border-gray-600 hover:border-gray-500 hover:bg-white/5' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50')
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
                        <div className="space-y-4">
                          <div className={`p-4 rounded-xl ${
                            darkMode ? 'bg-white/10' : 'bg-white/80'
                          }`}>
                            <div className="flex items-center justify-between">
                              <div className="text-left">
                                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                  {selectedFile.name}
                                </p>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {formatFileSize(selectedFile.size)}
                                </p>
                              </div>
                              <div className="text-green-500 text-2xl">✓</div>
                            </div>
                          </div>
                          <p className="text-green-500 font-medium">Ready for processing!</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="text-6xl opacity-50">📄</div>
                          <div>
                            <p className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                              Drop your PDF here
                            </p>
                            <p className={`text-lg mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              or click to browse files
                            </p>
                          </div>
                          <div className={`text-sm p-3 rounded-lg ${
                            darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                          }`}>
                            💡 Supports PDF files up to 50MB
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* AI Model Dropdown */}
                  <div>
                    <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      🤖 AI Model Selection
                    </h3>
                    
                    <div className="relative">
                      <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                          darkMode 
                            ? 'bg-white/5 border-white/20 hover:bg-white/10 text-white' 
                            : 'bg-white border-gray-300 hover:border-gray-400 text-gray-800'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">
                              {aiModels.find(m => m.value === aiModel)?.label}
                            </p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {aiModels.find(m => m.value === aiModel)?.desc}
                            </p>
                          </div>
                          <svg className={`w-5 h-5 transition-transform ${showDropdown ? 'rotate-180' : ''}`} 
                               fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>
                      
                      {showDropdown && (
                        <div className={`absolute top-full left-0 right-0 mt-2 rounded-xl border shadow-lg z-20 ${
                          darkMode 
                            ? 'bg-gray-800 border-white/20' 
                            : 'bg-white border-gray-200'
                        }`}>
                          {aiModels.map((model) => (
                            <button
                              key={model.value}
                              onClick={() => {
                                setAiModel(model.value);
                                setShowDropdown(false);
                              }}
                              className={`w-full p-4 text-left hover:bg-opacity-80 transition-all ${
                                aiModel === model.value 
                                  ? (darkMode ? 'bg-blue-500/20' : 'bg-blue-100')
                                  : (darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50')
                              } ${model.value === aiModels[0].value ? 'rounded-t-xl' : ''} ${
                                model.value === aiModels[aiModels.length - 1].value ? 'rounded-b-xl' : ''
                              }`}
                            >
                              <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                {model.label}
                              </p>
                              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {model.desc}
                              </p>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column - Processing & Results */}
                <div className="space-y-8">
                  
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    ⚡ Process & Download
                  </h3>
                  
                  {/* Process Button */}
                  <button
                    onClick={extractReport}
                    disabled={isProcessing || !selectedFile}
                    className={`w-full py-6 px-8 rounded-2xl font-bold text-lg shadow-xl transform transition-all duration-200 ${
                      isProcessing || !selectedFile
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:scale-105 active:scale-95'
                    } ${
                      darkMode
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                        <span>Processing Report...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Analyze Report</span>
                      </div>
                    )}
                  </button>

                  {/* Progress Bar */}
                  {isProcessing && (
                    <div className="space-y-4">
                      <div className={`h-3 rounded-full overflow-hidden ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {progress < 25 ? '📤 Uploading file...' : 
                         progress < 50 ? '🔍 Analyzing content...' : 
                         progress < 75 ? '🧠 Generating insights...' : 
                         progress < 95 ? '📝 Creating report...' : 
                         '✨ Finalizing...'}
                      </p>
                    </div>
                  )}

                  {/* Error Display */}
                  {errorMessage && (
                    <div className={`p-6 rounded-xl border ${
                      darkMode 
                        ? 'bg-red-500/20 border-red-500/30' 
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <div className="text-red-500 text-2xl">⚠️</div>
                        <div>
                          <h4 className={`font-semibold ${darkMode ? 'text-red-300' : 'text-red-800'}`}>
                            Processing Error
                          </h4>
                          <p className={`text-sm ${darkMode ? 'text-red-200' : 'text-red-700'}`}>
                            {errorMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Success & Download */}
                  {downloadUrl && (
                    <div className={`p-8 rounded-xl border text-center ${
                      darkMode 
                        ? 'bg-green-500/20 border-green-500/30' 
                        : 'bg-green-50 border-green-200'
                    }`}>
                      <div className="text-5xl mb-4">🎉</div>
                      <h4 className={`text-2xl font-bold mb-3 ${
                        darkMode ? 'text-green-300' : 'text-green-800'
                      }`}>
                        Analysis Complete!
                      </h4>
                      <p className={`mb-6 ${darkMode ? 'text-green-200' : 'text-green-700'}`}>
                        Your comprehensive 10-K analysis is ready for download
                      </p>
                      <a
                        href={downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className={`inline-flex items-center space-x-3 px-8 py-4 rounded-xl font-bold shadow-lg transform transition-all duration-200 hover:scale-105 ${
                          darkMode
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                            : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Download PDF Report</span>
                      </a>
                    </div>
                  )}

                  {/* Info Panel */}
                  <div className={`p-6 rounded-xl ${
                    darkMode ? 'bg-white/5' : 'bg-gray-100/80'
                  }`}>
                    <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      ✨ How it works
                    </h4>
                    <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li>• Upload your 10-K SEC filing document</li>
                      <li>• Select your preferred AI analysis model</li>
                      <li>• Get comprehensive insights and key metrics</li>
                      <li>• Download structured, actionable report</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Powered by <span className="font-semibold text-blue-500">Google Generative AI</span> • 
              Built with ❤️ using <span className="font-semibold text-purple-500">FastAPI & React</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainApp;
