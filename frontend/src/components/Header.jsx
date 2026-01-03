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
        <header className={`header-container ${scrolled ? 'header-scrolled' : ''}`}>
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
