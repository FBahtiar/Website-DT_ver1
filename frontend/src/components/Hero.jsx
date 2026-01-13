import React from 'react';
<<<<<<< HEAD
=======
import { Link } from 'react-router-dom';
>>>>>>> Ver4

const Hero = () => {
    return (
        <section className="section" style={{ minHeight: '100vh', textAlign: 'center' }}>
            <div className="container flex-column items-center">
                <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', marginBottom: '2rem' }}>
                    Reveal the Truth<br />
                    <span style={{ color: '#94a3b8' }}>Behind the Pixels</span>
                </h1>
                <p style={{ fontSize: '1.2rem', marginBottom: '3rem' }}>
                    Unggah video Anda dan pastikan keasliannya dengan sistem deteksi berbasis AI yang mampu mengidentifikasi video AIGC dan deepfake secara akurat.
                </p>
<<<<<<< HEAD
                <a href="#classify" className="btn">
                    Mulai Deteksi
                </a>
=======
                <Link to="/deteksi" className="btn">
                    Mulai Deteksi
                </Link>
>>>>>>> Ver4
            </div>
        </section>
    );
};

export default Hero;
