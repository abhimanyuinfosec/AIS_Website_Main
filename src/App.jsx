import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ComingSoon from './pages/ComingSoon';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const routeMap = {
  '/services/security-assessment': 'Security Assessment',
  '/services/web-application-security': 'Web Application Security',
  '/services/network-security': 'Network Security',
  '/services/penetration-testing': 'Penetration Testing',
  '/services/threat-detection': 'Threat Detection',
  '/services/security-hardening': 'Security Hardening',
  '/services/attack-surface-intelligence': 'Attack Surface Intelligence',
  '/services/incident-readiness': 'Incident Readiness',

  '/solutions/website-security': 'Website Security',
  '/solutions/web-application-security': 'Web Application Security',
  '/solutions/network-protection': 'Network Protection',
  '/solutions/attack-surface-visibility': 'Attack Surface Visibility',
  '/solutions/threat-detection': 'Threat Detection',
  '/solutions/incident-readiness': 'Incident Readiness',
  '/solutions/sme-msme-security': 'SME/MSME Security',

  '/technology/hybrid-ids': 'Hybrid IDS',
  '/technology/autored-apt': 'AutoRed APT',
  '/technology/ip-intelligence': 'IP Intelligence',
  '/technology/security-engineering': 'Security Engineering',
  '/technology/research-development': 'Research & Development',

  '/insights/cybersecurity': 'Cybersecurity Insights',
  '/insights/web-security': 'Web Security Insights',
  '/insights/network-security': 'Network Security Insights',
  '/insights/threat-intelligence': 'Threat Intelligence',
  '/insights/sme-security': 'SME Security',
  '/insights/security-research': 'Security Research',

  '/about/our-mission': 'Our Mission',
  '/about/our-approach': 'Our Approach',
  '/about/why-abhimanyu': 'Why Abhimanyu',
  '/about/team': 'Team'
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {Object.entries(routeMap).map(([path, title]) => (
          <Route key={path} path={path} element={<ComingSoon title={title} />} />
        ))}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
