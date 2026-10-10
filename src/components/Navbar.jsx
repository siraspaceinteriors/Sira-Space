import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onOpenQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Factory', path: '/factory' },
    { name: 'Commercial', path: '/commercial' },
    { name: 'Guides', path: '/blog' },
    { name: 'Studio', path: '/studio' },
  ];

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? theme === 'dark'
          ? 'py-3 bg-[#1C1A17]/95 backdrop-blur-md border-b border-white/10 shadow-2xl'
          : 'py-3 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-black/10 shadow-lg'
        : 'py-5 bg-gradient-to-b from-[#1C1A17]/80 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 rounded border border-[#C5A059] flex items-center justify-center bg-[#C5A059]/10 group-hover:bg-[#C5A059] transition-all">
            <span className="font-serif font-bold text-sm text-[#C5A059] group-hover:text-[#121212]">S</span>
          </div>
          <div>
            <span className={`font-serif tracking-[0.2em] font-bold text-base block leading-none ${
              theme === 'dark' || !scrolled ? 'text-white' : 'text-[#1C1A17]'
            }`}>
              SIRA SPACE
            </span>
            <span className="text-[8px] tracking-[0.25em] text-[#C5A059] uppercase block font-semibold mt-1">
              INTERIOR ARCHITECTURE
            </span>
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <nav className={`hidden lg:flex items-center space-x-1 border px-4 py-2 rounded-full backdrop-blur-md ${
          theme === 'dark' || !scrolled
            ? 'bg-white/5 border-white/10'
            : 'bg-black/5 border-black/10'
        }`}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path === '/projects' && location.pathname.startsWith('/project/'));
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all flex items-center space-x-1 ${
                  isActive
                    ? 'bg-[#C5A059] text-[#121212] font-bold shadow'
                    : link.highlight
                    ? 'text-[#C5A059] hover:text-[#C5A059]'
                    : theme === 'dark' || !scrolled
                    ? 'text-[#CBCBCB] hover:text-white'
                    : 'text-[#555555] hover:text-black'
                }`}
              >
                {link.highlight && <CalcIcon className="w-3 h-3 mr-0.5" />}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* RIGHT ACTION BUTTONS */}
        <div className="flex items-center space-x-3">
          
          {/* THEME TOGGLE BUTTON */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle light or dark theme"
            className={`p-2 rounded-full border transition-all ${
              theme === 'dark' || !scrolled
                ? 'bg-white/5 border-white/10 text-[#C5A059] hover:bg-white/10'
                : 'bg-black/5 border-black/10 text-[#C5A059] hover:bg-black/10'
            }`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#C5A059]" />
            ) : (
              <Moon className="w-4 h-4 text-[#C5A059]" />
            )}
          </button>

          {/* STUDIO OS PORTAL LINK */}
          <Link
            to="/portal"
            className="hidden md:flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs font-bold tracking-widest uppercase border border-[#C5A059]/40 bg-[#C5A059]/10 text-[#C5A059] hover:bg-[#C5A059] hover:text-[#121212] transition-all"
            title="Open Studio Operations & Quotations Hub"
          >
            <span>STUDIO OS</span>
          </Link>

          {/* QUOTE ACTION BUTTON */}
          <button
            onClick={onOpenQuote}
            className="hidden sm:flex bg-[#C5A059] hover:bg-[#C5A059]/90 text-[#121212] px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all shadow-lg hover:scale-105 items-center space-x-1.5"
          >
            <span>GET QUOTE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg border ${
              theme === 'dark' || !scrolled
                ? 'bg-white/5 border-white/10 text-white hover:text-[#C5A059]'
                : 'bg-black/5 border-black/10 text-black hover:text-[#C5A059]'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* MOBILE DROPDOWN MENU */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-6 py-6 space-y-4 shadow-2xl ${
          theme === 'dark' ? 'bg-[#121212] border-white/10' : 'bg-[#FFFFFF] border-black/10'
        }`}>
          <div className="flex justify-between items-center pb-2 border-b border-white/10">
            <span className="text-xs uppercase tracking-wider text-[#C5A059] font-bold">Theme Mode</span>
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 text-xs font-bold px-3 py-1.5 rounded border border-[#C5A059]/40 text-[#C5A059]"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}</span>
            </button>
          </div>

          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2.5 px-3 rounded text-xs font-semibold uppercase tracking-wider ${
                  location.pathname === link.path
                    ? 'bg-[#C5A059] text-[#121212] font-bold'
                    : theme === 'dark'
                    ? 'text-[#CBCBCB] hover:text-white'
                    : 'text-[#444444] hover:text-black'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQuote();
            }}
            className="w-full bg-[#C5A059] text-[#121212] py-3 rounded text-xs font-bold uppercase tracking-widest text-center shadow-lg"
          >
            GET 3-TIER QUOTATION
          </button>
        </div>
      )}
    </div>
  );
}
