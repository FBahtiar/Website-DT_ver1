import React from 'react';
import { UploadCloud, Activity } from 'lucide-react';

const HowToUse = () => {
    return (
        <section className="section">
            <div className="container">
                <h2 className="text-center" style={{ marginBottom: '2rem' }}>Cara Menggunakan</h2>

                <div className="grid-2">
                    {/* Step 1 */}
                    <div style={{
                        border: '1px solid #1e3a8a',
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        backgroundColor: 'rgba(2, 6, 23, 0.5)',
                        borderRadius: '8px'
                    }}>
                        <UploadCloud size={48} style={{ marginBottom: '1.5rem', color: '#60a5fa' }} />
                        <h3>1. Unggah Video</h3>
                        <p>
                            Anda dapat mengunggah video dengan format .mp4 dengan durasi video maksimal 30 detik pada bagian "Upload Video".
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div style={{
                        border: '1px solid #1e3a8a',
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        backgroundColor: 'rgba(2, 6, 23, 0.5)',
                        borderRadius: '8px'
                    }}>
                        <Activity size={48} style={{ marginBottom: '1.5rem', color: '#60a5fa' }} />
                        <h3>2. Lihat Hasil</h3>
                        <p>
                            Sistem D/ΔT akan memproses video yang Anda unggah dan memberikan hasil deteksi pada bagian "Hasil Deteksi"
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowToUse;
