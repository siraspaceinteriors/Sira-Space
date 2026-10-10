import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuotationModal from './components/QuotationModal';

import Home from './pages/Home';
import Studio from './pages/Studio';
import Gallery from './pages/Gallery';
import ProjectDetail from './pages/ProjectDetail';
import Process from './pages/Process';
import Inquire from './pages/Inquire';
import Experience from './pages/Experience';
import Factory from './pages/Factory';
import Commercial from './pages/Commercial';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import StudioOS from './pages/portal/StudioOS';
import { ThemeProvider, useTheme } from './context/ThemeContext';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Studio OS Error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#181614] text-white p-8 flex flex-col items-center justify-center font-sans">
          <div className="max-w-xl p-8 bg-[#22201D] border border-red-500/30 rounded-2xl shadow-2xl space-y-4 text-center">
            <h2 className="text-xl font-serif font-bold text-red-400">Portal Workspace Error</h2>
            <p className="text-xs text-gray-300 font-mono bg-[#161513] p-4 rounded-xl border border-white/5 text-left">
              {this.state.error?.message || 'Unknown error'}
            </p>
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => {
                  try {
                    localStorage.removeItem('sira_studio_projects_v3');
                    localStorage.removeItem('sira_selected_floor_idx');
                    localStorage.removeItem('sira_selected_area_filter');
                  } catch (e) {}
                  window.location.reload();
                }}
                className="px-5 py-2.5 bg-[#C5A059] text-[#121212] text-xs font-bold rounded-xl uppercase tracking-wider hover:bg-[#b08e4d] transition-all"
              >
                Reset Saved State & Reload
              </button>
              <a
                href="/"
                className="px-5 py-2.5 bg-white/10 text-white text-xs font-semibold rounded-xl hover:bg-white/20 transition-all"
              >
                Go to Website
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppContent() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const { theme } = useTheme();
  const location = useLocation();

  const isPortalRoute = location.pathname.startsWith('/portal') || location.pathname.startsWith('/dashboard');

  if (isPortalRoute) {
    return (
      <ErrorBoundary>
        <StudioOS />
      </ErrorBoundary>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-[#1C1A17] text-[#F5F5F5] selection:bg-[#C5A059] selection:text-[#121212]' 
        : 'bg-[#FAF7F2] text-[#1C1A17] selection:bg-[#C5A059] selection:text-white'
    }`}>
      <Navbar onOpenQuote={() => setIsQuoteOpen(true)} />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home onOpenQuote={() => setIsQuoteOpen(true)} />} />
          <Route path="/calculator" element={<Navigate to="/" replace />} />
          <Route path="/experience" element={<Experience onOpenQuote={() => setIsQuoteOpen(true)} />} />
          <Route path="/factory" element={<Factory />} />
          <Route path="/commercial" element={<Commercial />} />
          <Route path="/projects" element={<Gallery />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/process" element={<Process />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/inquire" element={<Inquire />} />
          <Route path="/portal/*" element={<StudioOS />} />
          <Route path="/dashboard/*" element={<StudioOS />} />
        </Routes>
      </main>

      <Footer onOpenQuote={() => setIsQuoteOpen(true)} />

      <QuotationModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
