// frontend/src/MainApp.jsx
// COMPLETELY NEW FILE NAME TO FORCE DETECTION
// Version 5.0 - Different filename approach

import React, { useState } from 'react';
import './index.css';

const API_ENDPOINT = 'https://one0-k-reportscraper.onrender.com/extract';

const MainApp = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [aiModel, setAiModel] = useState('gemini-2.0-flash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    setErrorMessage('');
    setDownloadUrl('');
  };

  const extractReport = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    const uploadData = new FormData();
    uploadData.append('report', selectedFile);
    uploadData.append('model', aiModel);

    try {
      console.log('🚀 MAINAPP VERSION 5.0 DEPLOYED SUCCESSFULLY!');
      console.log('API Endpoint:', API_ENDPOINT);
      console.log('Selected File:', selectedFile.name);
      console.log('AI Model:', aiModel);
      
      const apiResponse = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: uploadData,
      });
      
      console.log('API Response Status:', apiResponse.status);
      console.log('API Response OK:', apiResponse.ok);
      
      if (!apiResponse.ok) {
        const errorDetails = await apiResponse.text();
        console.error('API Error Details:', errorDetails);
        throw new Error(`API Error ${apiResponse.status}: ${errorDetails}`);
      }
      
      const resultData = await apiResponse.json();
      console.log('API Success Result:', resultData);
      
      setDownloadUrl(resultData.pdfUrl);
      setErrorMessage('');
    } catch (error) {
      console.error('Extraction Error:', error);
      setErrorMessage(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Header Section */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl font-extrabold mb-4">
            📊 Annual Report Extractor v5.0 📊
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Transform SEC 10-K PDFs into structured summaries using advanced AI.
            Select your file, choose your model, and get instant results.
          </p>
          <button
            onClick={() =>
              document.getElementById('processing-area')
                .scrollIntoView({ behavior: 'smooth' })
            }
            className="px-8 py-3 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition"
          >
            Start Processing
          </button>
        </div>
      </section>

      {/* Processing Area */}
      <section id="processing-area" className="bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">📄 Extract Your Report</h2>

          {/* File Selection */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-6 hover:border-indigo-400 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-2 h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0-8l-3 3m3-3l3 3M16 5l-4-4m0 0L8 5m4-4v12"
              />
            </svg>
            <p className="text-gray-600">Drop your 10-K PDF here, or</p>
            <label className="mt-2 inline-block px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer hover:bg-indigo-700">
              Select File
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={onFileSelect}
              />
            </label>
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-800">📎 {selectedFile.name}</p>
            )}
          </div>

          {/* Model Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              🤖 AI Model Selection
            </label>
            <select
              value={aiModel}
              onChange={e => setAiModel(e.target.value)}
              className="w-full border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="gemini-2.0-flash">⚡ Gemini 2.0 Flash</option>
              <option value="gemini-2.0-pro">🧠 Gemini 2.0 Pro</option>
            </select>
          </div>

          {/* Process Button */}
          <button
            onClick={extractReport}
            disabled={isProcessing || !selectedFile}
            className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            {isProcessing ? '⏳ Processing Report...' : '🚀 Extract & Download'}
          </button>

          {/* Results Display */}
          {errorMessage && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">❌ {errorMessage}</p>
            </div>
          )}
          {downloadUrl && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="text-green-700 font-medium hover:text-green-800 flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                ✅ Download Your Extracted PDF
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-500">
          🔥 Powered by Google Generative AI • Built with ❤️ using FastAPI & React 🔥
        </div>
      </footer>
    </div>
  );
};

export default MainApp;