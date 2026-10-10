import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, MapPin, Phone, Mail, Send } from 'lucide-react';

export default function Footer({ onOpenQuote }) {
  return (
    <footer className="bg-[#121212] text-white border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* TOP BANNER */}
        <div className="border-b border-white/10 pb-12 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-[#C5A059] uppercase font-bold block mb-1">
              SIRA SPACE INTERIORS • KARNATAKA
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-white">
              Telling your story, in your space!
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onOpenQuote}
              className="bg-[#C5A059] hover:bg-[#C5A059]/90 text-[#121212] px-6 py-3 rounded text-xs font-bold uppercase tracking-widest transition-all shadow-lg hover:scale-105"
            >
              GET YOUR FREE QUOTE
            </button>
          </div>
        </div>

        {/* 4 COLUMNS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16 text-xs">
          
          {/* COL 1: IDENTITY */}
          <div className="space-y-4">
            <span className="font-serif text-xl font-bold tracking-wider text-white block">SIRA SPACE</span>
            <p className="text-[#CBCBCB]/80 font-light leading-relaxed">
              Founded by Civil Engineer & Interior Architect <strong>Sindhu Jain M S</strong>. We craft bespoke residential, commercial, and healthcare interiors with German factory modular precision and 100% material transparency.
            </p>
            <div className="text-[#C5A059] font-medium flex items-center pt-2">
              <MapPin className="w-4 h-4 mr-1.5 shrink-0" />
              <span>Bengaluru, Karnataka, India</span>
            </div>
          </div>

          {/* COL 2: NAVIGATION */}
          <div className="space-y-3">
            <h3 className="font-serif text-base text-white tracking-wider uppercase font-bold">Navigation</h3>
            <ul className="space-y-2 text-[#CBCBCB]">
              <li><Link to="/" className="hover:text-[#C5A059] transition-colors">Home</Link></li>
              <li><Link to="/projects" className="hover:text-[#C5A059] transition-colors">Executed Projects</Link></li>
              <li><Link to="/experience" className="hover:text-[#C5A059] transition-colors">The SIRA Experience</Link></li>
              <li><Link to="/factory" className="hover:text-[#C5A059] transition-colors">Factory Precision</Link></li>
              <li><Link to="/commercial" className="hover:text-[#C5A059] transition-colors">Commercial & Workspaces</Link></li>
              <li><Link to="/blog" className="hover:text-[#C5A059] transition-colors">Knowledge Hub & Guides</Link></li>
              <li><Link to="/studio" className="hover:text-[#C5A059] transition-colors">About Sindhu Jain</Link></li>
            </ul>
          </div>

          {/* COL 3: STUDIO CONTACT & SOCIAL */}
          <div className="space-y-3">
            <h3 className="font-serif text-base text-white tracking-wider uppercase font-bold">Studio Connect</h3>
            <div className="space-y-2.5 text-[#CBCBCB]">
              <div className="flex items-start space-x-2">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+918618870672" className="hover:text-white block">+91 86188 70672</a>
                  <a href="tel:+917353823487" className="hover:text-white block">+91 73538 23487</a>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href="mailto:siraspaceinteriors@gmail.com" className="hover:text-white">siraspaceinteriors@gmail.com</a>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Instagram className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a 
                  href="https://www.instagram.com/sira_space/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-white hover:text-[#C5A059] font-bold flex items-center"
                >
                  <span>@sira_space</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>
          </div>

          {/* COL 4: OFFICE LOCATION */}
          <div className="space-y-3">
            <h3 className="font-serif text-base text-white tracking-wider uppercase font-bold">Registered Studio</h3>
            <p className="text-[#CBCBCB]/80 font-light leading-relaxed">
              344, 1st Cross Rd, Talacauvery Layout, Amrutahalli, Byatarayanapura, Bengaluru, Karnataka 560092
            </p>
            <div className="pt-2 text-[11px] text-[#CBCBCB]/60">
              <span className="block font-semibold text-white">Serving Cities:</span>
              <span>Bengaluru, Mysuru, Tumkur, Davangere, Hassan & surrounding Karnataka districts.</span>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-[#CBCBCB]/60 gap-4">
          <p>© {new Date().getFullYear()} SIRA SPACE Interiors. All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-white transition-colors"
          >
            BACK TO TOP ↑
          </button>
        </div>

      </div>
    </footer>
  );
}
