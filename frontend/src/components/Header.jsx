import React, { useState, useEffect } from 'react';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            padding: '1.5rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: scrolled ? 'rgba(2, 6, 23, 0.9)' : 'transparent',
            backdropFilter: scrolled ? 'blur(10px)' : 'none',
            zIndex: 1000,
            transition: 'all 0.3s ease',
            borderBottom: scrolled ? '1px solid #1e3a8a' : 'none'
        }}>
            <div style={{ fontWeight: 700, fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}>
                D/ΔT
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                Sistem Deteksi AIGC dan Deepfake
            </div>
        </header>
    );
};

export default Header;
