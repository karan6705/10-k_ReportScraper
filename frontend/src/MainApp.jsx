// frontend/src/MainApp.jsx
// Clean Minimal One-Page UI - Version 9.0
// Timestamp: 2025-07-26T04:50:00Z

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
      console.log('🚀 CLEAN MINIMAL UI VERSION 9.0 DEPLOYED!');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Clean Top Bar */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">ReportExtractor</h1>
              <p className="text-sm text-gray-400">AI-Powered 10-K Analysis</p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Transform Your <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">10-K Reports</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Upload any SEC filing and get instant AI-powered analysis with key insights and structured summaries
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Side - Upload */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4">Upload Document</h3>
                
                {/* File Drop Zone */}
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                    dragOver 
                      ? 'border-blue-400 bg-blue-400/5' 
                      : selectedFile 
                        ? 'border-green-400 bg-green-400/5' 
                        : 'border-gray-600 hover:border-gray-500'
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
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-left">
                            <p className="font-medium text-white text-sm">{selectedFile.name}</p>
                            <p className="text-xs text-gray-400">{formatFileSize(selectedFile.size)}</p>
                          </div>
                          <div className="text-green-400 text-lg">✓</div>
                        </div>
                      </div>
                      <p className="text-sm text-green-400">Ready for processing</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-4xl text-gray-500">📄</div>
                      <div>
                        <p className="text-lg text-white font-medium">Drop your PDF here</p>
                        <p className="text-gray-400 text-sm">or click to browse</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Model Selection */}
                <div>
                  <h4 className="text-lg font-medium text-white mb-3">AI Model</h4>
                  <div className="space-y-2">
                    <label className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                      aiModel === 'gemini-2.0-flash' 
                        ? 'bg-blue-500/20 border border-blue-500/30' 
                        : 'bg-white/5 hover:bg-white/10'
                    }`}>
                      <input 
                        type="radio" 
                        value="gemini-2.0-flash"
                        checked={aiModel === 'gemini-2.0-flash'}
                        onChange={(e) => setAiModel(e.target.value)}
                        className="mr-3"
                      />
                      <div>
                        <div className="text-white font-medium">Gemini 2.0 Flash</div>
                        <div className="text-gray-400 text-sm">Fast processing • Quick insights</div>
                      </div>
                    </label>
                    <label className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                      aiModel === 'gemini-2.0-pro' 
                        ? 'bg-blue-500/20 border border-blue-500/30' 
                        : 'bg-white/5 hover:bg-white/10'
                    }`}>
                      <input 
                        type="radio" 
                        value="gemini-2.0-pro"
                        checked={aiModel === 'gemini-2.0-pro'}
                        onChange={(e) => setAiModel(e.target.value)}
                        className="mr-3"
                      />
                      <div>
                        <div className="text-white font-medium">Gemini 2.0 Pro</div>
                        <div className="text-gray-400 text-sm">Deep analysis • Detailed insights</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Side - Process */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4">Process & Download</h3>
                
                <button
                  onClick={extractReport}
                  disabled={isProcessing || !selectedFile}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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

                {/* Progress */}
                {isProcessing && (
                  <div className="space-y-2">
                    <div className="bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-400 text-center">
                      {progress < 30 ? 'Uploading...' : 
                       progress < 60 ? 'Analyzing...' : 
                       progress < 90 ? 'Generating insights...' : 
                       'Finalizing...'}
                    </p>
                  </div>
                )}

                {/* Error */}
                {errorMessage && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                    <p className="text-red-300 text-sm">{errorMessage}</p>
                  </div>
                )}

                {/* Success */}
                {downloadUrl && (
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6 text-center">
                    <div className="text-4xl mb-3">🎉</div>
                    <h4 className="text-lg font-semibold text-white mb-2">Analysis Complete!</h4>
                    <p className="text-gray-300 text-sm mb-4">Your report is ready for download</p>
                    <a
                      href={downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all"
                    >
                      Download Report
                    </a>
                  </div>
                )}

                {/* Info */}
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">How it works</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Upload your 10-K PDF document</li>
                    <li>• Choose your preferred AI model</li>
                    <li>• Get instant analysis and insights</li>
                    <li>• Download structured report</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Powered by Google Generative AI • Built with FastAPI & React
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainApp;
