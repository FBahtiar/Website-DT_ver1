import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            borderTop: '1px solid #1e3a8a',
            padding: '4rem 0 2rem 0',
            backgroundColor: 'rgba(2, 6, 23, 0.9)'
        }}>
            <div className="container">
                <div className="grid-3" style={{ marginBottom: '4rem' }}>
                    <div>
                        <h4 style={{ marginBottom: '1.5rem' }}>D/ΔT</h4>
                        <p style={{ fontSize: '0.9rem' }}>
                            Sistem Deteksi AIGC (AI Generated Contents) dengan LightGBM Melalui Ekstraksi Fitur Orde Kedua Berbasis Website.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: '1.5rem' }}>Contact</h4>
                        <p style={{ fontSize: '0.9rem' }}>
                            Email: dhairyoarka@gmail.com<br />
                            Phone: +62 812-9393-3313<br />
                            Lokasi: Malang, Indonesia
                        </p>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: '1.5rem' }}>Team Info</h4>
                        <p style={{ fontSize: '0.9rem' }}>
                            Name: FICTIONOLOGIST<br />
                            School: MAN 2 Kota Malang<br />
                            Team Code: ISPO-2026-COM-11134256
                        </p>
                    </div>
                </div>
                <div className="text-center" style={{ paddingTop: '2rem', borderTop: '1px solid #1e3a8a', color: '#64748b', fontSize: '0.8rem' }}>
                    MAN 2 Kota Malang | Juara Prima | ISPO 2026
                </div>
            </div>
        </footer>
    );
};

export default Footer;
