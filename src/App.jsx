import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AmbientBackdrop from './components/AmbientBackdrop';
import CrystalGlassEffects from './components/CrystalGlassEffects';
import Home from './pages/Home';

// Dedicated Dynamic Public Pages
import ServicesPage from './pages/ServicesPage';
import SolutionsPage from './pages/SolutionsPage';
import TechnologyPage from './pages/TechnologyPage';
import InsightsPage from './pages/InsightsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Module & Auth
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/components/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';
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

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Public Website Layout Shell (with Navbar and Footer)
const PublicLayout = () => {
  return (
    <div className="bg-[#030611] text-slate-200 font-sans antialiased selection:bg-brand-500 selection:text-white min-h-screen relative overflow-x-hidden">
      <AmbientBackdrop />
      <CrystalGlassEffects />
      <Navbar />
      <main className="relative z-10">
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
            
            {/* Services */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServicesPage />} />

            {/* Solutions */}
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/solutions/:slug" element={<SolutionsPage />} />

            {/* Technology & Products */}
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/technology/:slug" element={<TechnologyPage />} />

            {/* Insights & Research & Blog */}
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/insights/:slug" element={<InsightsPage />} />
            <Route path="/blog/:slug" element={<InsightsPage />} />

            {/* About Us */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/:section" element={<AboutPage />} />

            {/* Contact */}
            <Route path="/contact" element={<ContactPage />} />

            {/* 404 Public */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>

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
