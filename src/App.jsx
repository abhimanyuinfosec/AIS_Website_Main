import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AmbientBackdrop from './components/AmbientBackdrop';
import CrystalGlassEffects from './components/CrystalGlassEffects';
import Home from './pages/Home';

// Dedicated Dynamic Public Pages
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Individual Subsection Pages - Services
import VulnerabilityAssessmentPage from './pages/services/VulnerabilityAssessmentPage';
import WebSecurityPage from './pages/services/WebSecurityPage';
import NetworkSecurityPage from './pages/services/NetworkSecurityPage';
import PenetrationTestingPage from './pages/services/PenetrationTestingPage';
import ThreatDetectionPage from './pages/services/ThreatDetectionPage';
import SecurityHardeningPage from './pages/services/SecurityHardeningPage';

// Individual Subsection Pages - Products
import ProductsPage from './pages/products/ProductsPage';
import ProductDetailPage from './pages/products/ProductDetailPage';
import AutoRedAptPage from './pages/products/AutoRedAptPage';
import IpIntelligencePage from './pages/products/IpIntelligencePage';
import HybridIdsPage from './pages/products/HybridIdsPage';

// Individual Subsection Pages - Insights
import InsightsPage from './pages/insights/InsightsPage';

// Individual Subsection Pages - About
import OurMissionPage from './pages/about/OurMissionPage';
import OurApproachPage from './pages/about/OurApproachPage';
import WhyAisPage from './pages/about/WhyAisPage';
import TeamPage from './pages/about/TeamPage';

// Admin Module & Auth
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/components/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';
import LoginPage from './pages/LoginPage';
import OAuthCallback from './pages/OAuthCallback';
import UserPortalPage from './pages/UserPortalPage';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminServices from './admin/pages/AdminServices';
import AdminProjects from './admin/pages/AdminProjects';
import AdminProducts from './admin/pages/AdminProducts';
import AdminResearch from './admin/pages/AdminResearch';
import AdminBlog from './admin/pages/AdminBlog';
import AdminInquiries from './admin/pages/AdminInquiries';
import AdminReviews from './admin/pages/AdminReviews';
import AdminTeam from './admin/pages/AdminTeam';
import AdminMedia from './admin/pages/AdminMedia';
import AdminSettings from './admin/pages/AdminSettings';
import AdminAuditLogs from './admin/pages/AdminAuditLogs';

// Scroll to top or anchor on route change
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }, 50);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

// Public Website Layout Shell (with Navbar and Footer)
const PublicLayout = () => {
  return (
    <div className="bg-[#020508] text-slate-200 font-sans antialiased selection:bg-brand-500 selection:text-white min-h-screen relative overflow-x-hidden">
      <AmbientBackdrop />
      <CrystalGlassEffects />
      <Navbar />
      <main className="relative z-10 pt-20 md:pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Website Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            
            {/* Services Routes */}
            <Route path="/services" element={<VulnerabilityAssessmentPage />} />
            <Route path="/services/vulnerability-assessment" element={<VulnerabilityAssessmentPage />} />
            <Route path="/services/web-security" element={<WebSecurityPage />} />
            <Route path="/services/network-security" element={<NetworkSecurityPage />} />
            <Route path="/services/penetration-testing" element={<PenetrationTestingPage />} />
            <Route path="/services/threat-detection" element={<ThreatDetectionPage />} />
            <Route path="/services/security-hardening" element={<SecurityHardeningPage />} />

            {/* Products Routes */}
            <Route path="/technology" element={<ProductsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />

            {/* Insights Routes */}
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/insights/web-security" element={<InsightsPage />} />
            <Route path="/insights/network-security" element={<InsightsPage />} />
            <Route path="/insights/cyber-security" element={<InsightsPage />} />
            <Route path="/insights/threat-intelligence" element={<InsightsPage />} />
            <Route path="/insights/sme-security" element={<InsightsPage />} />

            {/* About Us Routes */}
            <Route path="/about" element={<OurMissionPage />} />
            <Route path="/about/mission" element={<OurMissionPage />} />
            <Route path="/about/approach" element={<OurApproachPage />} />
            <Route path="/about/why-ais" element={<WhyAisPage />} />
            <Route path="/about/team" element={<TeamPage />} />

            {/* Contact / How to Buy */}
            <Route path="/contact" element={<ContactPage />} />

            {/* 404 Public */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Universal Authentication (Email, Google, GitHub) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
          <Route path="/auth/callback" element={<OAuthCallback />} />
          <Route
            path="/portal"
            element={
              <ProtectedRoute>
                <UserPortalPage />
              </ProtectedRoute>
            }
          />

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Dashboard & CMS */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="research" element={<AdminResearch />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="team" element={<AdminTeam />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route
              path="audit-logs"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']}>
                  <AdminAuditLogs />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
