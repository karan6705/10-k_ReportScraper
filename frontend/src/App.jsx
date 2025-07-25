import React, { useState } from 'react';
import { Upload, FileText, Zap, Trash2, Download, Moon, Sun, Sparkles, Shield, Clock, Star } from 'lucide-react';

export default function App() {
  const [file, setFile] = useState(null);
  const [model, setModel] = useState('gemini-2.0-flash');
  const [loading, setLoading] = useState(false);
  const [outputUrl, setOutputUrl] = useState('');
  const [error, setError] = useState('');
  const [dark, setDark] = useState(true);
  const [dragOver, setDragOver] = useState(false);

  // Demo PDF simulation - removed since it doesn't work

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setOutputUrl('');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setError('');
      setOutputUrl('');
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

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    const form = new FormData();
    form.append('report', file);
    form.append('model', model);

    try {
      const resp = await fetch('/api/extract', {
        method: 'POST',
        body: form,
      });
      if (!resp.ok) throw new Error(`Server error ${resp.status}`);
      const { pdfUrl } = await resp.json();
      setOutputUrl(pdfUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    background: dark 
      ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative'
  };

  const cardStyle = {
    background: dark 
      ? 'rgba(15, 23, 42, 0.95)' 
      : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(24px)',
    borderRadius: '32px',
    padding: '48px',
    boxShadow: dark
      ? '0 32px 64px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(148, 163, 184, 0.1)'
      : '0 32px 64px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2)',
    border: `1px solid ${dark ? 'rgba(148, 163, 184, 0.1)' : 'rgba(255, 255, 255, 0.2)'}`,
    maxWidth: '680px',
    width: '100%',
    margin: '0 24px',
    position: 'relative'
  };

  const uploadAreaStyle = {
    border: `3px dashed ${
      dragOver 
        ? '#6366f1' 
        : file 
        ? '#10b981' 
        : dark 
        ? '#475569' 
        : '#cbd5e1'
    }`,
    borderRadius: '24px',
    padding: '48px 32px',
    textAlign: 'center',
    background: dragOver 
      ? 'rgba(99, 102, 241, 0.08)' 
      : file 
      ? 'rgba(16, 185, 129, 0.08)' 
      : dark 
      ? 'rgba(51, 65, 85, 0.3)' 
      : 'rgba(248, 250, 252, 0.8)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden'
  };

  const primaryButtonStyle = {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    padding: '18px 36px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    justifyContent: 'center',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 8px 32px rgba(99, 102, 241, 0.35)',
    letterSpacing: '0.025em',
    position: 'relative',
    overflow: 'hidden'
  };

  const secondaryButtonStyle = {
    background: dark 
      ? 'rgba(51, 65, 85, 0.8)' 
      : 'rgba(248, 250, 252, 0.9)',
    color: dark ? '#e2e8f0' : '#1e293b',
    border: `1px solid ${dark ? 'rgba(71, 85, 105, 0.5)' : 'rgba(203, 213, 225, 0.8)'}`,
    borderRadius: '16px',
    padding: '18px 28px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(8px)',
    letterSpacing: '0.025em'
  };

  const features = [
    { icon: Shield, text: 'Enterprise Security' },
    { icon: Clock, text: 'Lightning Fast' },
    { icon: Star, text: 'AI Powered' }
  ];

  return (
    <div style={containerStyle}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '100px',
        height: '100px',
        background: 'rgba(99, 102, 241, 0.1)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '15%',
        width: '80px',
        height: '80px',
        background: 'rgba(139, 92, 246, 0.1)',
        borderRadius: '50%',
        filter: 'blur(30px)',
        animation: 'float 8s ease-in-out infinite reverse'
      }} />

      {/* Header */}
      <div style={{ textAlign: 'center', padding: '80px 24px 40px' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '20px', 
          marginBottom: '32px',
          background: 'rgba(255, 255, 255, 0.15)',
          padding: '20px 40px',
          borderRadius: '24px',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            padding: '16px',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)'
          }}>
            <Sparkles style={{ width: '36px', height: '36px', color: 'white' }} />
          </div>
          <h1 style={{
            fontSize: '56px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            letterSpacing: '-0.02em',
            lineHeight: '1.1'
          }}>
            Annual Report Extractor
          </h1>
        </div>
        
        <p style={{
          fontSize: '22px',
          color: dark ? '#cbd5e1' : 'rgba(255, 255, 255, 0.95)',
          maxWidth: '700px',
          margin: '0 auto 32px',
          lineHeight: '1.6',
          textShadow: '0 2px 8px rgba(0,0,0,0.1)',
          fontWeight: '400'
        }}>
          Transform your SEC 10-K reports into beautiful, digestible summaries using advanced AI technology
        </p>

        {/* Feature badges */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          flexWrap: 'wrap',
          marginTop: '24px'
        }}>
          {features.map((feature, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '12px 20px',
              borderRadius: '12px',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: 'white',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              <feature.icon style={{ width: '16px', height: '16px' }} />
              {feature.text}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'flex-start',
        padding: '0 24px 80px',
        position: 'relative'
      }}>
        <div style={cardStyle}>
          
          {/* Theme Toggle */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
            <button
              onClick={() => setDark(!dark)}
              style={{
                ...secondaryButtonStyle,
                padding: '12px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Toggle theme"
            >
              {dark ? <Sun style={{ width: '20px', height: '20px' }} /> : <Moon style={{ width: '20px', height: '20px' }} />}
            </button>
          </div>

          {/* File Upload Area */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            style={uploadAreaStyle}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              {file ? (
                <>
                  <div style={{
                    padding: '20px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    borderRadius: '50%',
                    border: '2px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    <FileText style={{ width: '40px', height: '40px', color: '#10b981' }} />
                  </div>
                  <div>
                    <p style={{
                      fontWeight: '700',
                      color: dark ? '#10b981' : '#059669',
                      margin: '0 0 8px 0',
                      fontSize: '20px',
                      letterSpacing: '-0.01em'
                    }}>
                      {file.name}
                    </p>
                    <p style={{
                      fontSize: '16px',
                      color: dark ? '#94a3b8' : '#64748b',
                      margin: 0,
                      fontWeight: '500'
                    }}>
                      Ready to process
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div style={{
                    padding: '24px',
                    background: dark ? 'rgba(71, 85, 105, 0.3)' : 'rgba(148, 163, 184, 0.2)',
                    borderRadius: '50%',
                    border: `2px solid ${dark ? 'rgba(71, 85, 105, 0.5)' : 'rgba(148, 163, 184, 0.3)'}`
                  }}>
                    <Upload style={{ 
                      width: '40px', 
                      height: '40px', 
                      color: dark ? '#94a3b8' : '#64748b'
                    }} />
                  </div>
                  <div>
                    <p style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      marginBottom: '8px',
                      color: dark ? '#e2e8f0' : '#1e293b',
                      letterSpacing: '-0.01em'
                    }}>
                      Drop your PDF here
                    </p>
                    <p style={{
                      fontSize: '16px',
                      color: dark ? '#94a3b8' : '#64748b',
                      marginBottom: '24px',
                      fontWeight: '500'
                    }}>
                      or click to browse files
                    </p>
                    <label style={{
                      ...primaryButtonStyle,
                      display: 'inline-flex',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '700'
                    }}>
                      <Upload style={{ width: '18px', height: '18px' }} />
                      Choose File
                      <input
                        type="file"
                        accept="application/pdf"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* File Info */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: '20px',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: dark ? '#94a3b8' : '#64748b',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              <FileText style={{ width: '16px', height: '16px' }} />
              PDF Only
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: dark ? '#94a3b8' : '#64748b',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              <Shield style={{ width: '16px', height: '16px' }} />
              Secure Processing
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: dark ? '#94a3b8' : '#64748b',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              <Zap style={{ width: '16px', height: '16px' }} />
              Max 50MB
            </div>
          </div>

          {/* Model Selection */}
          <div style={{ marginTop: '40px' }}>
            <label style={{
              display: 'block',
              fontSize: '16px',
              fontWeight: '700',
              marginBottom: '16px',
              color: dark ? '#e2e8f0' : '#1e293b',
              letterSpacing: '-0.01em'
            }}>
              AI Model Selection
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: '16px',
                border: `2px solid ${dark ? 'rgba(71, 85, 105, 0.5)' : 'rgba(203, 213, 225, 0.8)'}`,
                background: dark ? 'rgba(51, 65, 85, 0.8)' : '#ffffff',
                color: dark ? '#e2e8f0' : '#1e293b',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(8px)'
              }}
            >
              <option value="gemini-2.0-flash">⚡ Gemini 2.0 Flash - Fast Processing</option>
              <option value="gemini-2.0-pro">🧠 Gemini 2.0 Pro - Advanced Analysis</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
            <button
              onClick={handleSubmit}
              disabled={loading || !file}
              style={{
                ...primaryButtonStyle,
                flex: 1,
                opacity: (loading || !file) ? 0.6 : 1,
                cursor: (loading || !file) ? 'not-allowed' : 'pointer',
                fontSize: '17px',
                fontWeight: '700',
                padding: '20px 36px'
              }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    border: '2px solid white',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Processing...
                </>
              ) : (
                <>
                  <Zap style={{ width: '18px', height: '18px' }} />
                  Extract Summary
                </>
              )}
            </button>
            
            <button
              onClick={() => {
                setFile(null);
                setOutputUrl('');
                setError('');
              }}
              disabled={loading}
              style={{
                ...secondaryButtonStyle,
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
                padding: '20px 24px'
              }}
            >
              <Trash2 style={{ width: '18px', height: '18px' }} />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              marginTop: '32px',
              padding: '20px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '2px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '16px',
              backdropFilter: 'blur(8px)'
            }}>
              <p style={{ 
                color: '#dc2626', 
                fontWeight: '600', 
                margin: 0,
                fontSize: '16px'
              }}>
                ⚠️ {error}
              </p>
            </div>
          )}

          {/* Success/Download */}
          {outputUrl && (
            <div style={{ marginTop: '32px' }}>
              <div style={{
                padding: '20px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '2px solid rgba(16, 185, 129, 0.2)',
                borderRadius: '16px',
                marginBottom: '20px',
                backdropFilter: 'blur(8px)'
              }}>
                <p style={{ 
                  color: '#059669', 
                  fontWeight: '700', 
                  margin: 0,
                  fontSize: '16px',
                  letterSpacing: '-0.01em'
                }}>
                  ✅ Processing complete! Your summary is ready.
                </p>
              </div>
              <button
                onClick={() => window.open(outputUrl, '_blank')}
                style={{
                  ...primaryButtonStyle,
                  width: '100%',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
                  boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)',
                  fontSize: '18px',
                  fontWeight: '700',
                  padding: '22px 36px'
                }}
              >
                <Download style={{ width: '22px', height: '22px' }} />
                Download Extracted PDF
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '40px 24px',
        color: dark ? '#94a3b8' : 'rgba(255, 255, 255, 0.9)',
        borderTop: `1px solid ${dark ? 'rgba(71, 85, 105, 0.3)' : 'rgba(255, 255, 255, 0.2)'}`
      }}>
        <p style={{ 
          fontSize: '15px', 
          margin: 0,
          fontWeight: '500',
          letterSpacing: '0.025em'
        }}>
          Powered by Google Generative AI • Built with ❤️ using FastAPI & React
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}