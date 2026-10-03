import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CrystalGlassEffects from './components/CrystalGlassEffects';
import PWAInstallPrompt from './components/PWAInstallPrompt';
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

// Individual Subsection Pages - Insights
import InsightsPage from './pages/insights/InsightsPage';
import BlogPostPage from './pages/insights/BlogPostPage';

// Individual Subsection Pages - Projects
import ProjectsPage from './pages/projects/ProjectsPage';
import ProjectDetailPage from './pages/projects/ProjectDetailPage';

// Individual Subsection Pages - Research
import ResearchPage from './pages/research/ResearchPage';

// Individual Subsection Pages - About
import OurMissionPage from './pages/about/OurMissionPage';
import OurApproachPage from './pages/about/OurApproachPage';
import WhyAisPage from './pages/about/WhyAisPage';
import TeamPage from './pages/about/TeamPage';

// Admin Module & Auth
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
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
import AdminUsers from './admin/pages/AdminUsers';

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
    <div className="public-app-layout bg-[#FAFAFA] text-slate-900 font-sans antialiased selection:bg-brand-crimson selection:text-white min-h-screen relative overflow-x-hidden transition-colors duration-300">
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
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <PWAInstallPrompt />
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

              {/* Products Routes - Accessible only with sign-in */}
              <Route
                path="/technology"
                element={
                  <ProtectedRoute redirectTo="/login">
                    <ProductsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products"
                element={
                  <ProtectedRoute redirectTo="/login">
                    <ProductsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products/:slug"
                element={
                  <ProtectedRoute redirectTo="/login">
                    <ProductDetailPage />
                  </ProtectedRoute>
                }
              />

              {/* Insights Routes - Accessible only with sign-in */}
              <Route
                path="/insights"
                element={
                  <ProtectedRoute redirectTo="/login">
                    <InsightsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/insights/:slug"
                element={
                  <ProtectedRoute redirectTo="/login">
                    <BlogPostPage />
                  </ProtectedRoute>
                }
              />

              {/* Projects Routes - public */}
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />

              {/* Research Routes - public */}
              <Route path="/research" element={<ResearchPage />} />

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

            {/* Protected Admin Dashboard & CMS — admin-level roles only */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin={true} redirectTo="/admin/login">
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
                  <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']} redirectTo="/admin/login">
                    <AdminAuditLogs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="users"
                element={
                  <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']} redirectTo="/admin/login">
                    <AdminUsers />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
