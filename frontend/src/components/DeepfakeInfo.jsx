import React from 'react';
import deepfakeImage from '../assets/deepfake_illustration.png';

const DeepfakeInfo = () => {
    return (
        <section className="section">
            <div className="container">
                <h2 style={{ marginBottom: '2rem' }}>Bahaya Deepfake & AIGC</h2>
                <div className="deepfake-layout">
                    <div>
                        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', textAlign: 'justify' }}>
                            AI Generated Content (AIGC) adalah konten digital seperti teks, gambar, audio, atau video yang dibuat secara otomatis menggunakan teknologi kecerdasan buatan. Salah satu bentuk AIGC yang banyak dikenal adalah deepfake, yaitu konten media hasil manipulasi AI yang menggunakan identitas individu seperti wajah, suara, atau tindakan seseorang secara sangat realistis meskipun tidak pernah terjadi. Namun, penyalahgunaan deepfake dapat menimbulkan berbagai dampak negatif, antara lain:
                        </p>
                        <ul style={{ paddingLeft: '1.5rem', color: '#94a3b8', lineHeight: '2', fontSize: '1.1rem' }}>
                            <li>Potensi penyebaran misinformasi dan hoax</li>
                            <li>Pelanggaran privasi dan pencurian identitas individu</li>
                            <li>Manipulasi opini publik dan penipuan digital</li>
                        </ul>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <img
                            src={deepfakeImage}
                            alt="Deepfake Illustration"
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '20px',
                                border: '1px solid #1e3a8a',
                                boxShadow: '0 0 20px rgba(30, 64, 175, 0.2)'
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DeepfakeInfo;
