// frontend/src/MainApp.jsx
// Timestamp: 2025-07-25T12:00:00Z

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
      console.log('🚀 BEAUTIFUL UI VERSION 6.0 DEPLOYED!');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ReportExtractor</h1>
                <p className="text-xs text-gray-500">AI-Powered Analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ✅ System Online
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Your 
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> 10-K Reports</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Upload any SEC 10-K filing and instantly generate intelligent summaries, key insights, and structured data using advanced AI technology.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Secure Processing</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                <span>AI-Powered Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>Instant Download</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Processing Area */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <h2 className="text-2xl font-bold text-white">Upload & Process Your 10-K Report</h2>
              <p className="text-blue-100 mt-2">Select your PDF file and choose an AI model to begin analysis</p>
            </div>

            <div className="p-8">
              {/* File Upload Area */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  📄 Select Your 10-K PDF File
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                    dragOver 
                      ? 'border-blue-400 bg-blue-50' 
                      : selectedFile 
                        ? 'border-green-400 bg-green-50' 
                        : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
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
                      <div className="bg-white rounded-lg p-4 border border-green-200">
                        <div className="flex items-center justify-center space-x-3">
                          <div className="bg-red-100 p-2 rounded">
                            <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-medium text-gray-900">{selectedFile.name}</p>
                            <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                          </div>
                          <div className="text-green-600">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-green-600 font-medium">✅ File ready for processing</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-700">
                          Drag and drop your 10-K PDF here
                        </p>
                        <p className="text-gray-500 mt-1">or click to browse files</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-700">
                        <p>💡 <strong>Tip:</strong> Make sure your file is a valid PDF format and under 50MB</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Model Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  🤖 Choose AI Model
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      aiModel === 'gemini-2.0-flash' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setAiModel('gemini-2.0-flash')}
                  >
                    <div className="flex items-center space-x-3">
                      <input 
                        type="radio" 
                        checked={aiModel === 'gemini-2.0-flash'}
                        onChange={() => setAiModel('gemini-2.0-flash')}
                        className="text-blue-600"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">⚡ Gemini 2.0 Flash</h3>
                        <p className="text-sm text-gray-600">Fast processing • Recommended for quick analysis</p>
                      </div>
                    </div>
                  </div>
                  <div 
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      aiModel === 'gemini-2.0-pro' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setAiModel('gemini-2.0-pro')}
                  >
                    <div className="flex items-center space-x-3">
                      <input 
                        type="radio" 
                        checked={aiModel === 'gemini-2.0-pro'}
                        onChange={() => setAiModel('gemini-2.0-pro')}
                        className="text-blue-600"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">🧠 Gemini 2.0 Pro</h3>
                        <p className="text-sm text-gray-600">Deep analysis • More detailed insights</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Process Button */}
              <div className="mb-8">
                <button
                  onClick={extractReport}
                  disabled={isProcessing || !selectedFile}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-3"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Processing Report...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Extract & Analyze Report</span>
                    </>
                  )}
                </button>
              </div>

              {/* Progress Bar */}
              {isProcessing && (
                <div className="mb-8">
                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    {progress < 30 ? 'Uploading file...' : 
                     progress < 60 ? 'Analyzing content...' : 
                     progress < 90 ? 'Generating insights...' : 
                     'Finalizing report...'}
                  </p>
                </div>
              )}

              {/* Results */}
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-red-800">Processing Error</h3>
                      <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {downloadUrl && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Report Generated Successfully!</h3>
                    <p className="text-green-700 mb-6">Your 10-K analysis is ready for download</p>
                    <a
                      href={downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="inline-flex items-center space-x-3 bg-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-green-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Download Your Report</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-gray-600">Powered by</span>
              <span className="font-semibold text-blue-600">Google Generative AI</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">Built with ❤️ using FastAPI & React</span>
            </div>
            <div className="text-sm text-gray-500">
              © 2025 ReportExtractor. Secure, fast, and reliable.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainApp;
