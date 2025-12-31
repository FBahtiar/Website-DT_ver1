import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, AlertTriangle, FileVideo, X } from 'lucide-react';
import axios from 'axios';

const Classifier = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const droppedFile = e.dataTransfer.files[0];
        validateAndSetFile(droppedFile);
    };

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        validateAndSetFile(selectedFile);
    };

    const validateAndSetFile = (f) => {
        setError(null);
        setResult(null);
        if (!f) return;

        if (f.type !== 'video/mp4') {
            setError('Format file harus .mp4');
            return;
        }

        // Check duration (needs video element to check duration, simpler check is size for now or mock duration check)
        // For specific duration check we need to load metadata.
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = function () {
            window.URL.revokeObjectURL(video.src);
            if (video.duration > 30) {
                setError('Durasi video maksimal 30 detik');
                setFile(null);
            } else {
                setFile(f);
            }
        }
        video.src = URL.createObjectURL(f);
    };

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            // Replace with your actual backend URL or localhost
            const response = await axios.post('http://localhost:8000/classify', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResult(response.data);
        } catch (err) {
            console.error(err);
            // Fallback for demo if backend is offline to show UI
            // Remove this in production and show real error
            if (!err.response) {
                setError("Gagal menghubungi server. Pastikan backend berjalan.");
            } else {
                setError('Terjadi kesalahan saat memproses video.');
            }
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setFile(null);
        setResult(null);
        setError(null);
    };

    return (
        <section id="classify" className="section">
            <div className="container">
                <h2 className="text-center" style={{ marginBottom: '2rem' }}>Upload Video</h2>
                <div className="grid-2">
                    {/* Upload Area */}
                    <div className="flex-column" style={{ height: 'fit-content' }}>
                        <div
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current.click()}
                            style={{
                                border: '2px dashed #1e40af',
                                borderRadius: '20px',
                                padding: '4rem 2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                backgroundColor: 'rgba(2, 6, 23, 0.5)',
                                minHeight: '300px',
                                boxShadow: '0 0 20px rgba(30, 64, 175, 0.1)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#60a5fa';
                                e.currentTarget.style.backgroundColor = 'rgba(2, 6, 23, 0.7)';
                                e.currentTarget.style.boxShadow = '0 0 30px rgba(96, 165, 250, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#1e40af';
                                e.currentTarget.style.backgroundColor = 'rgba(2, 6, 23, 0.5)';
                                e.currentTarget.style.boxShadow = '0 0 20px rgba(30, 64, 175, 0.1)';
                            }}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                accept="video/mp4"
                                style={{ display: 'none' }}
                            />

                            {!file ? (
                                <>
                                    <Upload size={48} style={{ marginBottom: '1rem', opacity: 0.7 }} />
                                    <p className="text-center" style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                                        Letakkan video di sini atau klik untuk mengunggah
                                    </p>
                                    <p className="text-center" style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
                                        Mendukung format .Mp4, maksimal berdurasi 30 detik
                                    </p>
                                </>
                            ) : (
                                <div className="flex-column items-center">
                                    <FileVideo size={48} style={{ marginBottom: '1rem' }} />
                                    <p>{file.name}</p>
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleUpload(); }}
                                            className="btn"
                                            disabled={loading}
                                        >
                                            {loading ? 'Processing...' : 'Analyze Video'}
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); reset(); }}
                                            className="btn-outline"
                                            style={{ padding: '0.5rem 1rem' }}
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {error && (
                            <div style={{ color: '#ff4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <AlertTriangle size={20} />
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Result Area */}
                    <div className="flex-column">
                        {result ? (
                            <div style={{
                                border: '1px solid #1e40af',
                                padding: '3rem',
                                borderRadius: '20px',
                                backgroundColor: 'rgba(2, 6, 23, 0.5)',
                                boxShadow: '0 0 30px rgba(30, 64, 175, 0.15)'
                            }}>
                                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: result.class_name.includes('Real') ? '#4ade80' : '#f87171' }}>
                                    {result.class_name}
                                </h3>
                                <p style={{ marginBottom: '2rem' }}>{result.description}</p>

                                <div style={{ marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span>Confidence</span>
                                        <span>{(result.confidence * 100).toFixed(1)}%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '4px', background: '#1e293b', borderRadius: '2px' }}>
                                        <div style={{
                                            width: `${result.confidence * 100}%`,
                                            height: '100%',
                                            background: '#60a5fa',
                                            borderRadius: '2px',
                                            transition: 'width 1s ease-out',
                                            boxShadow: '0 0 10px rgba(96, 165, 250, 0.5)'
                                        }} />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div style={{
                                minHeight: '300px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid #1e40af',
                                borderRadius: '20px',
                                color: '#94a3b8',
                                backgroundColor: 'rgba(2, 6, 23, 0.5)'
                            }}>
                                <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>Hasil klasifikasi akan muncul di sini</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Classifier;
