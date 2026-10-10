import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, MapPin, Calendar, Layers, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { projectsData } from '../data/projectsData';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === id) || projectsData[0];
  const [showBefore, setShowBefore] = useState(false);

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello SIRA SPACE Team!\n\n` +
      `I am interested in an interior design similar to *${project.title}* (${project.bhk}, ${project.sqFt}).\n` +
      `Please connect me with Ar. Sindhu Jain to discuss my project.`
    );
    window.open(`https://wa.me/918618870672?text=${text}`, '_blank');
  };

  return (
    <div className="bg-[#1C1A17] text-white pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* BACK BUTTON */}
        <Link 
          to="/gallery"
          className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-[#CBCBCB] hover:text-[#C5A059] uppercase mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO ALL PROJECTS</span>
        </Link>

        {/* HERO TITLE & STATS */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="text-xs tracking-[0.25em] text-[#C5A059] uppercase font-bold">
              {project.category}
            </span>
            <span className="text-white/20">•</span>
            <span className="text-xs text-[#CBCBCB] uppercase tracking-wider">
              {project.city}, KARNATAKA
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-white font-medium">
            {project.title}
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 py-5 border-y border-white/10 text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#CBCBCB]/60 block">CARPET AREA</span>
              <span className="font-bold text-white text-sm mt-0.5 block">{project.sqFt}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#CBCBCB]/60 block">CONFIGURATION</span>
              <span className="font-bold text-white text-sm mt-0.5 block">{project.bhk}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#CBCBCB]/60 block">PACKAGE TIER</span>
              <span className="font-bold text-[#C5A059] text-sm mt-0.5 block">{project.packageTier} Plan</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#CBCBCB]/60 block">TIMELINE</span>
              <span className="font-bold text-white text-sm mt-0.5 block">{project.timeline}</span>
            </div>
          </div>
        </div>

        {/* HERO IMAGE & BEFORE/AFTER TOGGLE */}
        <div className="mb-16">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={showBefore && project.beforeImage ? project.beforeImage : project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-transparent to-transparent" />

            {/* TOGGLE BUTTON */}
            {project.beforeImage && (
              <div className="absolute bottom-6 right-6 flex items-center bg-[#121212]/90 backdrop-blur-md p-1.5 rounded-lg border border-white/10 shadow-lg">
                <button
                  onClick={() => setShowBefore(false)}
                  className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                    !showBefore ? 'bg-[#C5A059] text-[#121212]' : 'text-[#CBCBCB] hover:text-white'
                  }`}
                >
                  Completed Handover
                </button>
                <button
                  onClick={() => setShowBefore(true)}
                  className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                    showBefore ? 'bg-[#C5A059] text-[#121212]' : 'text-[#CBCBCB] hover:text-white'
                  }`}
                >
                  Raw Site (Before)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* LEFT: OVERVIEW & HIGHLIGHTS (7 COLS) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs tracking-[0.25em] text-[#C5A059] uppercase font-bold block mb-2">
                ARCHITECTURAL NARRATIVE
              </span>
              <h2 className="font-serif text-3xl text-white mb-4">
                Design & Spatial Conception
              </h2>
              <p className="text-sm text-[#CBCBCB] leading-relaxed font-light">
                {project.overview}
              </p>
            </div>

            {/* HIGHLIGHTS */}
            <div className="bg-[#121212] border border-white/10 p-6 sm:p-8 rounded-xl space-y-4">
              <h3 className="font-serif text-xl text-white">Execution Highlights</h3>
              <div className="space-y-3">
                {project.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs text-[#CBCBCB]">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* IMAGE GALLERY CAROUSEL/GRID */}
            <div>
              <h3 className="font-serif text-2xl text-white mb-4">Project Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.images.map((imgUrl, i) => (
                  <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden border border-white/10">
                    <img 
                      src={imgUrl} 
                      alt={`${project.title} - ${i}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: SPECIFICATIONS & ACTION (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* SPEC SHEET */}
            {project.specs && (
              <div className="bg-[#121212] border border-white/10 rounded-xl p-6 sm:p-8 space-y-5 shadow-2xl">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h3 className="font-serif text-xl text-[#C5A059]">Material Specifications</h3>
                  <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#CBCBCB]/60 block font-bold">CORE PLYWOOD</span>
                    <p className="text-white font-medium mt-0.5">{project.specs.corePlywood}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#CBCBCB]/60 block font-bold">SURFACE FINISH</span>
                    <p className="text-white font-medium mt-0.5">{project.specs.surfaceFinish}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#CBCBCB]/60 block font-bold">FITTINGS & HARDWARE</span>
                    <p className="text-white font-medium mt-0.5">{project.specs.hardware}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#CBCBCB]/60 block font-bold">COUNTERTOPS</span>
                    <p className="text-white font-medium mt-0.5">{project.specs.countertop}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#CBCBCB]/60 block font-bold">ARCHITECTURAL LIGHTING</span>
                    <p className="text-white font-medium mt-0.5">{project.specs.lighting}</p>
                  </div>
                </div>
              </div>
            )}

            {/* ACTION CARD */}
            <div className="bg-gradient-to-b from-[#C5A059]/15 to-transparent border border-[#C5A059]/40 rounded-xl p-6 sm:p-8 space-y-4 shadow-2xl">
              <h3 className="font-serif text-2xl text-white">Want Similar Interiors?</h3>
              <p className="text-xs text-[#CBCBCB]/80 font-light leading-relaxed">
                Connect directly with Ar. Sindhu Jain to get an exact itemized estimate for your {project.bhk} floor plan.
              </p>

              <div className="space-y-3 pt-2">
                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>INQUIRE VIA WHATSAPP</span>
                </button>

                <Link
                  to="/inquire"
                  className="w-full block text-center bg-[#C5A059] hover:bg-[#C5A059]/90 text-[#121212] py-3 rounded font-bold text-xs uppercase tracking-wider transition-all"
                >
                  GET YOUR FREE QUOTE
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
