import React, { useState, useEffect } from 'react';
<<<<<<< HEAD

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
=======
import { NavLink } from 'react-router-dom';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
>>>>>>> Ver4

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

<<<<<<< HEAD
    return (
        <header className={`header-container ${scrolled ? 'header-scrolled' : ''}`}>
            <div style={{ fontWeight: 700, fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}>
                D/ΔT
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                Sistem Deteksi AIGC dan Deepfake
=======
    const navLinkStyles = ({ isActive }) => ({
        textDecoration: 'none',
        color: isActive ? '#60a5fa' : '#f8fafc',
        fontWeight: isActive ? 700 : 500,
        fontSize: '1rem',
        transition: 'color 0.3s ease',
        position: 'relative',
        padding: '0.5rem 0'
    });

    return (
        <header className={`header-container ${scrolled ? 'header-scrolled' : ''}`}>
            <div style={{ fontWeight: 700, fontSize: '1.5rem', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="/Logo White.png" alt="Logo" style={{ height: '40px' }} />
            </div>

            {/* Desktop Navigation */}
            <nav className="desktop-nav" style={{ display: 'flex', gap: '2rem' }}>
                <NavLink to="/" style={navLinkStyles}>Home</NavLink>
                <NavLink to="/edukasi" style={navLinkStyles}>Edukasi</NavLink>
                <NavLink to="/games" style={navLinkStyles}>Game</NavLink>
                <NavLink to="/deteksi" style={navLinkStyles}>Deteksi</NavLink>
            </nav>

            {/* Mobile Navigation Toggle (Hamburger) */}
            <button
                className={`mobile-nav-toggle ${menuOpen ? 'active' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle Navigation"
            >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </button>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}>
                <NavLink to="/" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Home</NavLink>
                <NavLink to="/edukasi" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Edukasi</NavLink>
                <NavLink to="/games" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Games</NavLink>
                <NavLink to="/deteksi" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Deteksi</NavLink>
>>>>>>> Ver4
            </div>
        </header>
    );
};

export default Header;
