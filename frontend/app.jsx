FORCE_ERROR_TO_DETECT_CHANGES!!!
// frontend/src/App.jsx
// NUCLEAR REBUILD - Different structure to force cache bust
// Timestamp: 2025-07-25T11:35:00Z

import React, { useState } from 'react';
import './index.css';

const BACKEND_URL = 'https://one0-k-reportscraper.onrender.com/extract';

function App() {
  const [file, setFile] = useState(null);
  const [model, setModel] = useState('gemini-2.0-flash');
  const [loading, setLoading] = useState(false);
  const [outputUrl, setOutputUrl] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setOutputUrl('');
  };

  const processFile = async () => {
    if (!file) return;
    
    setLoading(true);
    const formData = new FormData();
    formData.append('report', file);
    formData.append('model', model);

    try {
      console.log('=== NEW VERSION DEPLOYED ===');
      console.log('Backend URL:', BACKEND_URL);
      console.log('File:', file.name);
      console.log('Model:', model);
      
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        body: formData,
      });
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Server error ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Success response:', data);
      
      setOutputUrl(data.pdfUrl);
      setError('');
    } catch (err) {
      console.error('Error details:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl font-extrabold mb-4">
            Annual Report Extractor v3.0
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Instantly turn any SEC 10-K PDF into a beautifully formatted summary and data model.
            Upload your filing, choose your AI model, and download your report in seconds.
          </p>
          <button
            onClick={() =>
              document.getElementById('upload-zone')
                .scrollIntoView({ behavior: 'smooth' })
            }
            className="px-8 py-3 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload-zone" className="bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Extract Your Report</h2>

          {/* File Upload */}
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
            <p className="text-gray-600">Drag & drop your 10-K PDF here, or</p>
            <label className="mt-2 inline-block px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer hover:bg-indigo-700">
              Choose File
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {file && (
              <p className="mt-2 text-sm text-gray-800">{file.name}</p>
            )}
          </div>

          {/* Model Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Select AI Model
            </label>
            <select
              value={model}
              onChange={e => setModel(e.target.value)}
              className="w-full border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
              <option value="gemini-2.0-pro">Gemini 2.0 Pro</option>
            </select>
          </div>

          {/* Process Button */}
          <button
            onClick={processFile}
            disabled={loading || !file}
            className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            {loading ? 'Processing Report…' : 'Extract & Download'}
          </button>

          {/* Results */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          {outputUrl && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <a
                href={outputUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="text-green-700 font-medium hover:text-green-800 flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Your Extracted PDF
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-500">
          Powered by Google Generative AI • Built with ❤️ using FastAPI & React
        </div>
      </footer>
    </div>
  );
}

export default App;
