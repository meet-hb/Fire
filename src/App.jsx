import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Flame } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import HomeV1 from './pages/HomeV1';
import HomeV2 from './pages/HomeV2';
import HomeV3 from './pages/HomeV3';
import ServicePage from './pages/ServicePage';
import AboutPage from './pages/AboutPage';
import BrandsPage from './pages/BrandsPage';
import VideosPage from './pages/VideosPage';
import GalleryPage from './pages/GalleryPage';
import CertificationsPage from './pages/CertificationsPage';
import ClientsPage from './pages/ClientsPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import { content } from './data/content';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

import { getContent } from './api/contentService';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin') || location.pathname.startsWith('/login');
  const [navData, setNavData] = React.useState(content.navigation);
  const [footerData, setFooterData] = React.useState(content.footer);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const nav = await getContent('navigation');
        const footer = await getContent('footer');
        if (nav) setNavData(nav);
        if (footer) setFooterData(footer);
      } catch (err) {
        console.warn("Backend not ready yet, using static content.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchGlobalData();
  }, []);

  if (isLoading && !isAdminPage) {
    return (
      <div className="min-h-screen bg-[#2D1E16] flex flex-col items-center justify-center">
        <div className="bg-primary p-4 rounded-3xl animate-bounce mb-6">
           <Flame className="text-white w-10 h-10" />
        </div>
        <p className="text-white/40 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Initializing Firegard System</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FEF3E2] selection:bg-primary selection:text-white">
      {!isAdminPage && <Navbar data={navData} />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home-1" element={<HomeV1 />} />
          <Route path="/home-2" element={<HomeV2 />} />
          <Route path="/home-3" element={<HomeV3 />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/products" element={<ServicePage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={
            localStorage.getItem('isAdminAuthenticated') === 'true' ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          <Route path="/products/:id" element={<ServicePage />} />
        </Routes>
      </main>
      {!isAdminPage && <Footer data={footerData} />}
    </div>
  );
}

export default App;
