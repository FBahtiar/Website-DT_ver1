import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, AlertTriangle, FileVideo, X } from 'lucide-react';
import axios from 'axios';

// EDITABLE TEXTS FOR RESULTS
// Anda dapat mengubah judul dan deskripsi di bawah ini:
const AIGC_TITLE = "AIGC VIDEO";
const REAL_TITLE = "REAL VIDEO";

const AIGC_DESCRIPTION = "Video ini terdeteksi sebagai konten yang dihasilkan atau dimanipulasi oleh kecerdasan buatan (AIGC). Berdasarkan hasil analisis visual dan pola pergerakan temporal, sistem mendeteksi adanya anomali yang tidak lazim pada karakteristik video, yang mengindikasikan kemungkinan penggunaan teknologi AI dalam proses pembuatannya. Sehubungan dengan potensi risiko penyebaran informasi yang tidak akurat, menyesatkan, atau bersifat hoaks, pengguna disarankan untuk berhati-hati dan tidak menyebarluaskan video ini sebelum dilakukan verifikasi lebih lanjut dari sumber tepercaya.";
const REAL_DESCRIPTION = "Video ini terdeteksi sebagai video asli (real). Sistem tidak menemukan indikasi anomali visual maupun pola pergerakan yang signifikan yang umumnya diasosiasikan dengan manipulasi berbasis kecerdasan buatan. Karakteristik video dinilai konsisten dengan konten yang dihasilkan secara alami. Dengan demikian, video ini dapat dibagikan, dengan tetap memperhatikan konteks dan etika penggunaan informasi digital.";

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
            const response = await axios.post('https://a7856c014c9c.ngrok-free.app/classify', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Expecting response: { class_name: "AIGC" | "Real", confidence: 0.85 }
            setResult(response.data);
        } catch (err) {
            console.error(err);
            // Fallback for demo if backend is offline to show UI
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

                {/* Changed from grid-2 to flex-column for vertical stacking */}
                <div className="flex-column" style={{ gap: '3rem', maxWidth: '800px', margin: '0 auto' }}>

                    {/* Upload Area */}
                    <div className="flex-column" style={{ height: 'fit-content', width: '100%' }}>
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
                            <div style={{ color: '#ff4444', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', justifyContent: 'center' }}>
                                <AlertTriangle size={20} />
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Result Area - Now underneath Upload Area */}
                    <div className="flex-column" style={{ width: '100%' }}>
                        {result ? (
                            <div style={{
                                border: '1px solid #1e40af',
                                padding: '3rem',
                                borderRadius: '20px',
                                backgroundColor: 'rgba(2, 6, 23, 0.5)',
                                boxShadow: '0 0 30px rgba(30, 64, 175, 0.15)'
                            }}>
                                <h3 style={{
                                    fontSize: '2rem',
                                    marginBottom: '1rem',
                                    // Logic for Title Color: Real = Green (#4ade80), AIGC = Red (#f87171)
                                    color: result.class_name === 'Real' ? '#4ade80' : '#f87171',
                                    textAlign: 'center'
                                }}>
                                    {/* Logic for Title Text: Uses editable constants */}
                                    {result.class_name === 'Real' ? REAL_TITLE : AIGC_TITLE}
                                </h3>

                                {/* Editable text display based on class_name */}
                                <p style={{ marginBottom: '2rem', textAlign: 'justify', fontSize: '1.1rem' }}>
                                    {result.class_name === 'Real' ? REAL_DESCRIPTION : AIGC_DESCRIPTION}
                                </p>

                                {/* Confidence Bars Section */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                                    {/* Bar for Real Video */}
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span>Kemungkinan Video Asli</span>
                                            {/* Access Real confidence safely, default to 0 if missing. 
                                                Assuming keys in all_predictions are "Real" and "AIGC" or similar. 
                                                Adjusting based on expected backend response. */}
                                            <span>
                                                {result.all_predictions && result.all_predictions['Real']
                                                    ? `${(result.all_predictions['Real'] * 100).toFixed(1)}%`
                                                    : '0.0%'}
                                            </span>
                                        </div>
                                        <div style={{ width: '100%', height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
                                            <div style={{
                                                width: result.all_predictions && result.all_predictions['Real']
                                                    ? `${result.all_predictions['Real'] * 100}%`
                                                    : '0%',
                                                height: '100%',
                                                background: '#4ade80', // Green for Real
                                                borderRadius: '4px',
                                                transition: 'width 1s ease-out',
                                                boxShadow: '0 0 10px rgba(74, 222, 128, 0.3)'
                                            }} />
                                        </div>
                                    </div>

                                    {/* Bar for AIGC Video */}
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span>Kemungkinan Video AIGC</span>
                                            <span>
                                                {result.all_predictions && (result.all_predictions['AIGC'] || result.all_predictions['Fake'] || result.all_predictions['Deepfake'])
                                                    ? `${((result.all_predictions['AIGC'] || result.all_predictions['Fake'] || result.all_predictions['Deepfake']) * 100).toFixed(1)}%`
                                                    : '0.0%'}
                                            </span>
                                        </div>
                                        <div style={{ width: '100%', height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
                                            <div style={{
                                                width: result.all_predictions && (result.all_predictions['AIGC'] || result.all_predictions['Fake'] || result.all_predictions['Deepfake'])
                                                    ? `${(result.all_predictions['AIGC'] || result.all_predictions['Fake'] || result.all_predictions['Deepfake']) * 100}%`
                                                    : '0%',
                                                height: '100%',
                                                background: '#f87171', // Red for AIGC
                                                borderRadius: '4px',
                                                transition: 'width 1s ease-out',
                                                boxShadow: '0 0 10px rgba(248, 113, 113, 0.3)'
                                            }} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ) : (
                            // Helper text indicating where results will appear
                            <div style={{
                                minHeight: '100px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid rgba(30, 58, 138, 0.3)',
                                borderRadius: '20px',
                                color: '#94a3b8',
                                backgroundColor: 'rgba(2, 2, 2, 0.2)',
                                borderStyle: 'dashed'
                            }}>
                                <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
                                    Hasil analisis deteksi akan ditampilkan di area ini
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Classifier;
