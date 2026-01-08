import React from 'react';
import { Target, Eye, Database, Cpu, Zap, Layers, BarChart } from 'lucide-react';

const ModelInfo = () => {
    return (
        <section className="section">
            <div className="container">
                {/* Part A: Metrics */}
                <h2 className="text-center" style={{ marginBottom: '3rem' }}>Kemampuan Model</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    marginBottom: '6rem'
                }}>
                    {[
                        { label: 'Accuracy', val: '94,11%', icon: Target },
                        { label: 'Precision', val: '94,64%', icon: Eye },
                        { label: 'Recall', val: '94,11%', icon: Database },
                        { label: 'F1 Score', val: '94,09%', icon: BarChart }
                    ].map((item, i) => (
                        <div key={i} style={{
                            border: '1px solid #1e3a8a',
                            padding: '2rem',
                            textAlign: 'center',
                            transition: 'transform 0.3s',
                            backgroundColor: 'rgba(2, 6, 23, 0.5)'
                        }}>
                            <item.icon size={32} style={{ marginBottom: '1rem' }} />
                            <div style={{ fontSize: '2.5rem', fontWeight: '700', margin: '0.5rem 0' }}>{item.val}</div>
                            <h4 style={{ fontSize: '1rem', color: '#60a5fa' }}>{item.label}</h4>

                        </div>
                    ))}
                </div>

                {/* Part B: How it Works */}
                <h2 className="text-center" style={{ marginBottom: '3rem' }}>Cara Kerja Sistem</h2>
                <div className="grid-3">
                    {[
                        { title: 'Clip Video Extractor', icon: Layers, desc: 'Ekstraksi Fitur Tahap Awal Dengan Clip Video Extractor.' },
                        { title: '2nd Order Feature Extraction', icon: Cpu, desc: 'Ekstraksi Fitur Tahap Lanjut Dengan Ekstraksi Orde Kedua.' },
                        { title: 'LightGBM', icon: Zap, desc: 'Klasifikasi menggunakan model Light Gradient Boosting Machine.' }
                    ].map((item, i) => (
                        <div key={i} className="flex-column items-center text-center">
                            <div style={{
                                width: '80px', height: '80px',
                                borderRadius: '50%', border: '1px solid #60a5fa',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: '1.5rem',
                                color: '#60a5fa'
                            }}>
                                <item.icon size={32} />
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ModelInfo;
