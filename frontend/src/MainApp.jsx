// frontend/src/MainApp.jsx
// Version: FINAL

import React, { useState } from 'react';
import './index.css';

const API_ENDPOINT = 'https://one0-k-reportscraper.onrender.com/extract';

const MainApp = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [aiModel, setAiModel] = useState('gemini-2.0-flash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [progress, setProgress] = useState(0);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setErrorMessage('');
      setDownloadUrl('');
    } else {
      setErrorMessage('Please select a valid PDF file');
    }
  };

  const processReport = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    setProgress(0);
    setErrorMessage('');
    
    const formData = new FormData();
    formData.append('report', selectedFile);
    formData.append('model', aiModel);

    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 90));
    }, 500);

    try {
      console.log('🚀 FINAL CLEAN WEBSITE DEPLOYED!');
      
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: formData,
      });
      
      clearInterval(progressInterval);
      setProgress(100);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Processing failed: ${errorText}`);
      }
      
      const result = await response.json();
      setDownloadUrl(result.pdfUrl);
      
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.message);
      clearInterval(progressInterval);
    } finally {
      setIsProcessing(false);
      setTimeout(() => setProgress(0), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      
      {/* Header */}
      <header className="bg-black bg-opacity-30 backdrop-blur-md border-b border-white border-opacity-20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">ReportExtractor</h1>
                <p className="text-sm text-blue-200">AI Analysis Platform</p>
              </div>
            </div>
            <div className="bg-green-500 bg-opacity-20 px-3 py-1 rounded-full border border-green-500 border-opacity-30">
              <span className="text-green-300 text-sm font-medium">• Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">ReportExtractor Pro</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Upload SEC filings and get instant AI-powered analysis with comprehensive insights
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-4xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl border border-white border-opacity-20 overflow-hidden">
          
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Left Column */}
              <div className="space-y-8">
                
                {/* File Upload */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Upload Document</h3>
                  <div className="border-2 border-dashed border-gray-400 border-opacity-50 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      {selectedFile ? (
                        <div className="space-y-3">
                          <div className="bg-white bg-opacity-20 rounded-lg p-4">
                            <p className="text-white font-medium">{selectedFile.name}</p>
                            <p className="text-gray-300 text-sm">{Math.round(selectedFile.size / 1024)} KB</p>
                          </div>
                          <p className="text-green-400">✓ Ready to process</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="text-5xl text-gray-400">📄</div>
                          <div>
                            <p className="text-lg text-white font-medium">Choose PDF File</p>
                            <p className="text-gray-400">Click here to browse</p>
                          </div>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* AI Model Selection */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Select AI Model</h3>
                  <div className="space-y-3">
                    <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      aiModel === 'gemini-2.0-flash' 
                        ? 'border-blue-500 bg-blue-500 bg-opacity-20' 
                        : 'border-gray-500 border-opacity-30 hover:border-gray-400'
                    }`}>
                      <input
                        type="radio"
                        name="aiModel"
                        value="gemini-2.0-flash"
                        checked={aiModel === 'gemini-2.0-flash'}
                        onChange={(e) => setAiModel(e.target.value)}
                        className="w-4 h-4 text-blue-600 mr-3"
                      />
                      <div>
                        <p className="text-white font-medium">⚡ Gemini 2.0 Flash</p>
                        <p className="text-gray-400 text-sm">Fast processing • Quick insights</p>
                      </div>
                    </label>
                    
                    <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      aiModel === 'gemini-2.0-pro' 
                        ? 'border-blue-500 bg-blue-500 bg-opacity-20' 
                        : 'border-gray-500 border-opacity-30 hover:border-gray-400'
                    }`}>
                      <input
                        type="radio"
                        name="aiModel"
                        value="gemini-2.0-pro"
                        checked={aiModel === 'gemini-2.0-pro'}
                        onChange={(e) => setAiModel(e.target.value)}
                        className="w-4 h-4 text-blue-600 mr-3"
                      />
                      <div>
                        <p className="text-white font-medium">🧠 Gemini 2.0 Pro</p>
                        <p className="text-gray-400 text-sm">Deep analysis • Detailed insights</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                
                {/* Process Button */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Process Report</h3>
                  <button
                    onClick={processReport}
                    disabled={!selectedFile || isProcessing}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      'Analyze Report'
                    )}
                  </button>
                </div>

                {/* Progress Bar */}
                {isProcessing && (
                  <div className="space-y-2">
                    <div className="bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-300 text-sm text-center">
                      {progress < 30 ? 'Uploading...' : 
                       progress < 60 ? 'Analyzing...' : 
                       progress < 90 ? 'Generating report...' : 
                       'Finalizing...'}
                    </p>
                  </div>
                )}

                {/* Error Message */}
                {errorMessage && (
                  <div className="bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 rounded-lg p-4">
                    <p className="text-red-300">{errorMessage}</p>
                  </div>
                )}

                {/* Download Section */}
                {downloadUrl && (
                  <div className="bg-green-500 bg-opacity-20 border border-green-500 border-opacity-30 rounded-lg p-6 text-center">
                    <div className="text-4xl mb-3">🎉</div>
                    <h4 className="text-lg font-semibold text-white mb-2">Report Ready!</h4>
                    <p className="text-gray-300 mb-4">Your analysis is complete</p>
                    <a
                      href={downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all"
                    >
                      Download PDF
                    </a>
                  </div>
                )}

                {/* Info */}
                <div className="bg-white bg-opacity-5 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">How it works:</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>1. Upload your 10-K PDF file</li>
                    <li>2. Choose AI model preference</li>
                    <li>3. Click analyze and wait</li>
                    <li>4. Download your report</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-400">
            Powered by Google AI • Built with FastAPI & React
          </p>
        </div>
      </main>
    </div>
  );
};

export default MainApp;
