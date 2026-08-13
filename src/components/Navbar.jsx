import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`mega-nav ${isScrolled ? 'scrolled' : ''}`}>
      <div className="wrap nav-inner">
        <a href="#" className="nav-brand">
          <img src="/logo.png" alt="Logo" style={{ height: '48px' }} />
        </a>
        
        {/* Desktop Nav */}
        <nav className="nav-links">
          <div className="nav-item-wrap" style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            <span className="nav-item">Platform</span> <ChevronDown size={14} className="muted" />
          </div>
          <div className="nav-item-wrap" style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            <span className="nav-item">Solutions</span> <ChevronDown size={14} className="muted" />
          </div>
          <a href="#resources" className="nav-item">Resources</a>
          <a href="#pricing" className="nav-item">Pricing</a>
          <a href="#company" className="nav-item">Company</a>
        </nav>

        <div className="nav-actions">
          <a href="#contact" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            Request Demo
          </a>
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{ position: 'absolute', top: '72px', left: 0, width: '100%', background: 'rgba(10, 11, 15, 0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-dark)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', zIndex: 99 }}>
          <a href="#platform" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Platform</a>
          <a href="#solutions" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Solutions</a>
          <a href="#resources" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Resources</a>
          <a href="#pricing" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <a href="#company" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Company</a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
