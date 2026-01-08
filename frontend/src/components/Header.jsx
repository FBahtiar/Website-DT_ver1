import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                <img src="/logo.png" alt="Logo" style={{ height: '40px' }} />
            </div>

            {/* Desktop Navigation */}
            <nav className="desktop-nav" style={{ display: 'flex', gap: '2rem' }}>
                <NavLink to="/" style={navLinkStyles}>Home</NavLink>
                <NavLink to="/edukasi" style={navLinkStyles}>Edukasi</NavLink>
                <NavLink to="/games" style={navLinkStyles}>Games</NavLink>
                <NavLink to="/deteksi" style={navLinkStyles}>Deteksi</NavLink>
            </nav>
        </header>
    );
};

export default Header;
