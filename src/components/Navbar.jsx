import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navData = [
  {
    name: 'Services',
    links: [
      { name: 'Security Assessment', href: '/services/security-assessment' },
      { name: 'Web Application Security', href: '/services/web-application-security' },
      { name: 'Network Security', href: '/services/network-security' },
      { name: 'Penetration Testing', href: '/services/penetration-testing' },
      { name: 'Threat Detection', href: '/services/threat-detection' },
      { name: 'Security Hardening', href: '/services/security-hardening' },
      { name: 'Attack Surface Intelligence', href: '/services/attack-surface-intelligence' },
      { name: 'Incident Readiness', href: '/services/incident-readiness' }
    ]
  },
  {
    name: 'Solutions',
    links: [
      { name: 'Website Security', href: '/solutions/website-security' },
      { name: 'Web Application Security', href: '/solutions/web-application-security' },
      { name: 'Network Protection', href: '/solutions/network-protection' },
      { name: 'Attack Surface Visibility', href: '/solutions/attack-surface-visibility' },
      { name: 'Threat Detection', href: '/solutions/threat-detection' },
      { name: 'Incident Readiness', href: '/solutions/incident-readiness' },
      { name: 'SME/MSME Security', href: '/solutions/sme-msme-security' }
    ]
  },
  {
    name: 'Technology',
    links: [
      { name: 'Hybrid IDS', href: '/technology/hybrid-ids' },
      { name: 'AutoRed APT', href: '/technology/autored-apt' },
      { name: 'IP Intelligence', href: '/technology/ip-intelligence' },
      { name: 'Security Engineering', href: '/technology/security-engineering' },
      { name: 'Research & Development', href: '/technology/research-development' }
    ]
  },
  {
    name: 'Insights',
    links: [
      { name: 'Cybersecurity', href: '/insights/cybersecurity' },
      { name: 'Web Security', href: '/insights/web-security' },
      { name: 'Network Security', href: '/insights/network-security' },
      { name: 'Threat Intelligence', href: '/insights/threat-intelligence' },
      { name: 'SME Security', href: '/insights/sme-security' },
      { name: 'Security Research', href: '/insights/security-research' }
    ]
  },
  {
    name: 'About',
    links: [
      { name: 'Our Mission', href: '/about/our-mission' },
      { name: 'Our Approach', href: '/about/our-approach' },
      { name: 'Why Abhimanyu', href: '/about/why-abhimanyu' },
      { name: 'Team', href: '/about/team' }
    ]
  }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  return (
    <header 
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        background: isScrolled || mobileMenuOpen ? 'rgba(5, 7, 10, 0.85)' : 'rgba(5, 7, 10, 1)',
        backdropFilter: isScrolled || mobileMenuOpen ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled || mobileMenuOpen ? 'blur(16px)' : 'none',
        borderBottom: isScrolled || mobileMenuOpen ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
        transition: 'all 0.3s ease-in-out'
      }}
    >
      <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', zIndex: 101 }}>
          <img src="/logo.png" alt="Abhimanyu InfoSec" style={{ height: '48px' }} />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="nav-links" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {navData.map((category) => (
            <div 
              key={category.name}
              className="nav-item-dropdown"
              style={{ position: 'relative', height: '80px', display: 'flex', alignItems: 'center' }}
              onMouseEnter={() => setOpenDropdown(category.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <span style={{ 
                color: 'var(--text-light)', 
                fontSize: '0.95rem', 
                fontWeight: 500,
                opacity: openDropdown === category.name ? 1 : 0.8,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'opacity 0.2s ease'
              }}>
                {category.name} <ChevronDown size={14} style={{ opacity: 0.6 }} />
              </span>
              
              {/* Desktop Dropdown Panel */}
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(12, 18, 29, 0.95)', // Deep navy
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--border-dark)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                minWidth: '260px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                opacity: openDropdown === category.name ? 1 : 0,
                visibility: openDropdown === category.name ? 'visible' : 'hidden',
                transition: 'all 0.2s ease-out',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}>
                {category.links.map(link => (
                  <Link 
                    key={link.name} 
                    to={link.href}
                    className="dropdown-link"
                    style={{
                      color: 'var(--text-light-muted)',
                      padding: '0.5rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.9rem',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 101 }}>
          {/* Desktop CTA */}
          <Link 
            to="/services/security-assessment" 
            className="btn btn-primary desktop-nav-cta" 
            style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}
          >
            Get Security Assessment
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div style={{
        position: 'absolute',
        top: '100%', left: 0, right: 0,
        background: 'rgba(5, 7, 10, 0.98)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        padding: mobileMenuOpen ? '1rem 2rem 2rem 2rem' : '0 2rem',
        maxHeight: mobileMenuOpen ? 'calc(100vh - 80px)' : '0',
        opacity: mobileMenuOpen ? 1 : 0,
        visibility: mobileMenuOpen ? 'visible' : 'hidden',
        overflowY: 'auto',
        transition: 'all 0.3s ease-in-out',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {navData.map((category) => (
            <div key={category.name} style={{ borderBottom: '1px solid var(--border-dark)', paddingBottom: '1rem' }}>
              <div 
                style={{ 
                  color: '#fff', 
                  fontSize: '1.1rem', 
                  fontWeight: 600, 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '1rem 0',
                  cursor: 'pointer'
                }}
                onClick={() => setOpenDropdown(openDropdown === category.name ? null : category.name)}
              >
                {category.name}
                <ChevronDown size={18} style={{ transform: openDropdown === category.name ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
              </div>
              
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.75rem',
                maxHeight: openDropdown === category.name ? '500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease-in-out',
                paddingLeft: '1rem'
              }}>
                {category.links.map(link => (
                  <Link 
                    key={link.name}
                    to={link.href} 
                    style={{ color: 'var(--text-light-muted)', fontSize: '0.95rem' }}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          
          <Link 
            to="/services/security-assessment" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '1rem' }}
          >
            Get Security Assessment
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .dropdown-link:hover {
          background: rgba(2, 132, 199, 0.1);
          color: #fff !important;
        }
        @media (max-width: 1024px) {
          .nav-links { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .desktop-nav-cta { display: none !important; }
        }
        @media (min-width: 1025px) {
          .mobile-menu-btn { display: none !important; }
          .desktop-nav-cta { display: inline-flex !important; }
        }
      `}} />
    </header>
  );
};

export default Navbar;
