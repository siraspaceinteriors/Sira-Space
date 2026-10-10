const fs = require('fs');
const path = require('path');

const homeContent = `import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  Play, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Clock, 
  Instagram, 
  Eye, 
  Award, 
  Building, 
  Home as HomeIcon, 
  Download,
  ThumbsUp,
  ExternalLink,
  Phone,
  Navigation,
  BookOpen
} from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { brandsData, testimonialsData, faqData, blogData, instagramReels, googleBusinessData } from '../data/siteData';

export default function Home({ onOpenQuote }) {
  const [activeTab, setActiveTab] = useState('residential'); // 'residential' | 'commercial'
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [activeBeforeAfter, setActiveBeforeAfter] = useState('after'); // 'before' | 'after'

  const residentialFeatured = projectsData.filter(p => p.type === 'Residential').slice(0, 3);
  const commercialFeatured = projectsData.filter(p => p.type === 'Commercial').slice(0, 2);
  const displayedProjects = activeTab === 'residential' ? residentialFeatured : commercialFeatured;

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  // Duplicate brands array 3 times for continuous left-to-right infinite loop
  const marqueeBrands = [...brandsData, ...brandsData, ...brandsData];

  return (
    <div className="bg-[#1C1A17] text-white selection:bg-[#C5A059] selection:text-[#121212]">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center text-center px-6 pt-28 pb-20 overflow-hidden">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero_bg.jpg"
            alt="SIRA SPACE Interior Luxury"
            className="w-full h-full object-cover scale-105 filter brightness-[0.45] contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C1A17]/80 via-[#1C1A17]/70 to-[#1C1A17]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-6">
          {/* Tagline Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-[#C5A059]/40 px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="text-[11px] tracking-[0.2em] text-[#C5A059] uppercase font-bold">
              Turnkey solution all over karnataka.
            </span>
          </div>

          {/* Slogan Headline from Official SIRA SPACE PDF & Instagram */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight font-normal text-white">
            TELLING YOUR STORY,<br />
            <span className="italic text-[#CBCBCB] font-light">IN YOUR SPACE!</span>
          </h1>

          <p className="text-sm sm:text-base text-[#CBCBCB]/90 max-w-2xl mx-auto font-light leading-relaxed">
            Minimalist Organic Luxury crafted with civil engineering precision. 100% factory-built modular joinery, photorealistic 3D virtual walkthroughs, and zero-defect turnkey delivery across Karnataka.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenQuote}
              className="w-full sm:w-auto bg-[#C5A059] hover:bg-[#C5A059]/90 text-[#121212] px-8 py-4 rounded font-bold text-xs tracking-[0.2em] uppercase transition-all shadow-xl hover:scale-[1.02] flex items-center justify-center space-x-2"
            >
              <span>Get your free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/projects"
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/20 text-white px-8 py-4 rounded font-bold text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center space-x-2 backdrop-blur-sm"
            >
              <span>EXPLORE PORTFOLIO</span>
              <ArrowUpRight className="w-4 h-4 text-[#C5A059]" />
            </Link>
          </div>

          {/* Micro Trust Proof */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-[11px] text-[#CBCBCB]/70 font-light">
            <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] mr-1.5" /> 100% Material Grade Transparency</span>
            <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] mr-1.5" /> In-House Bengaluru Factory</span>
            <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] mr-1.5" /> 10-Year Warranty Guarantee</span>
          </div>
        </div>
      </section>

      {/* 2. WHY HOMEOWNERS CHOOSE SIRA SPACE (KEY STATS BAR - FROM PDF) */}
      <section className="py-12 bg-[#121212] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          <div className="p-4">
            <div className="font-serif text-4xl sm:text-5xl text-[#C5A059] font-bold">8+ Yrs</div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-[#CBCBCB] mt-2 font-semibold">Industrial Experience</div>
            <p className="text-[11px] text-[#CBCBCB]/60 mt-1 font-light">BEML, Creatomy & buildAhome</p>
          </div>
          <div className="p-4">
            <div className="font-serif text-4xl sm:text-5xl text-[#C5A059] font-bold">25+</div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-[#CBCBCB] mt-2 font-semibold">Turnkey Executions</div>
            <p className="text-[11px] text-[#CBCBCB]/60 mt-1 font-light">Across Karnataka since 2023</p>
          </div>
          <div className="p-4">
            <div className="font-serif text-4xl sm:text-5xl text-[#C5A059] font-bold">50+</div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-[#CBCBCB] mt-2 font-semibold">Design Blueprints</div>
            <p className="text-[11px] text-[#CBCBCB]/60 mt-1 font-light">High-precision 3D CAD modeling</p>
          </div>
          <div className="p-4">
            <div className="font-serif text-4xl sm:text-5xl text-[#C5A059] font-bold">10 Yrs</div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-[#CBCBCB] mt-2 font-semibold">Modular Warranty</div>
            <p className="text-[11px] text-[#CBCBCB]/60 mt-1 font-light">Zero-defect factory joinery</p>
          </div>
        </div>
      </section>

      {/* 3. DUAL SECTOR SHOWCASE: RESIDENTIAL VS COMMERCIAL */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs tracking-[0.25em] text-[#C5A059] uppercase font-bold block mb-2">
              CURATED ARCHITECTURAL PORTFOLIO
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white">
              Explore Our Work by Sector
            </h2>
          </div>

          {/* DUAL SECTOR TOGGLE */}
          <div className="mt-6 md:mt-0 inline-flex bg-white/5 border border-white/10 p-1 rounded-full">
            <button
              onClick={() => setActiveTab('residential')}
              className={\`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 \${
                activeTab === 'residential' 
                  ? 'bg-[#C5A059] text-[#121212] shadow' 
                  : 'text-[#CBCBCB] hover:text-white'
              }\`}
            >
              <HomeIcon className="w-3.5 h-3.5" />
              <span>Residential Homes</span>
            </button>
            <button
              onClick={() => setActiveTab('commercial')}
              className={\`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 \${
                activeTab === 'commercial' 
                  ? 'bg-[#C5A059] text-[#121212] shadow' 
                  : 'text-[#CBCBCB] hover:text-white'
              }\`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Commercial & Healthcare</span>
            </button>
          </div>
        </div>

        {/* PROJECTS SHOWCASE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project) => (
            <Link
              key={project.id}
              to={\`/project/\${project.id}\`}
              className="group bg-[#121212] border border-white/10 rounded-xl overflow-hidden hover:border-[#C5A059] transition-all flex flex-col shadow-xl"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] tracking-widest text-[#C5A059] uppercase font-bold block mb-1">
                    {project.location}
                  </span>
                  <h3 className="font-serif text-xl font-medium text-white group-hover:text-[#C5A059] transition-colors">
                    {project.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-[#CBCBCB]/80 font-light line-clamp-2 leading-relaxed">
                  {project.overview}
                </p>
                <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[11px] text-[#CBCBCB]">
                  <span>{project.sqFt} • {project.bhk}</span>
                  <span className="text-[#C5A059] font-bold group-hover:translate-x-1 transition-transform flex items-center">
                    <span>EXPLORE PROJECT</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="inline-flex items-center space-x-2 border border-white/20 hover:border-[#C5A059] hover:text-[#C5A059] text-white px-8 py-3.5 rounded text-xs font-bold uppercase tracking-widest transition-all"
          >
            <span>VIEW ALL 25+ EXECUTED PROJECTS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. ROOM TIME-LAPSE & BUILDING PROCESS (BEFORE / AFTER TRANSFORMATION) */}
      <section className="py-24 bg-[#121212] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs tracking-[0.25em] text-[#C5A059] uppercase font-bold block">
                03 // ROOM TIME-LAPSE & EXECUTION
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-white leading-tight">
                From Raw Concrete to Tactile Luxury
              </h2>
              <p className="text-sm text-[#CBCBCB] font-light leading-relaxed">
                Watch how SIRA Space transforms a bare property shell into a bespoke living sanctuary. Every modular element is manufactured to sub-millimeter precision in our Bengaluru factory before white-glove site installation.
              </p>

              {/* TOGGLE SWITCH */}
              <div className="inline-flex bg-white/5 border border-white/10 p-1.5 rounded-lg">
                <button
                  onClick={() => setActiveBeforeAfter('before')}
                  className={\`px-5 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all \${
                    activeBeforeAfter === 'before' ? 'bg-[#C5A059] text-[#121212]' : 'text-[#CBCBCB]'
                  }\`}
                >
                  Raw Site (Before)
                </button>
                <button
                  onClick={() => setActiveBeforeAfter('after')}
                  className={\`px-5 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all \${
                    activeBeforeAfter === 'after' ? 'bg-[#C5A059] text-[#121212]' : 'text-[#CBCBCB]'
                  }\`}
                >
                  Completed Handover (After)
                </button>
              </div>

              <div className="space-y-3 pt-2 text-xs text-[#CBCBCB]">
                <div className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#C5A059] mr-2 shrink-0" /> Laser site leveling eliminating uneven floor slopes</div>
                <div className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#C5A059] mr-2 shrink-0" /> Hidden conduit wiring & low-voltage ambient profile LED</div>
                <div className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#C5A059] mr-2 shrink-0" /> 100% Calibrated CenturyPly BWP joinery assembly</div>
              </div>
            </div>

            {/* VISUAL TRANSFORM BOX */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={
                    activeBeforeAfter === 'before'
                      ? "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80"
                      : "/kitchen.jpg"
                  }
                  alt="Room Transformation Before After"
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#121212]/90 backdrop-blur-md px-3 py-1.5 rounded text-[10px] uppercase font-bold tracking-widest text-[#C5A059] border border-white/10">
                  {activeBeforeAfter === 'before' ? 'STAGE 01: RAW BARE SITE' : 'STAGE 06: WHITE-GLOVE HANDOVER'}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. BRAND PARTNERS MARQUEE DISPLAY (ANIMATION FROM LEFT TO RIGHT) */}
      <section className="py-20 border-t border-white/10 bg-[#171513] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center mb-10">
          <span className="text-xs tracking-[0.25em] text-[#C5A059] uppercase font-bold block mb-2">
            GLOBAL MATERIAL & HARDWARE PARTNERS
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-white">
            Built with World-Class Architectural Materials
          </h2>
          <p className="text-xs text-[#CBCBCB]/70 max-w-xl mx-auto mt-2 font-light">
            We partner exclusively with globally verified manufacturers to ensure lifetime durability and zero compromises.
          </p>
        </div>

        {/* LEFT TO RIGHT INFINITE ANIMATED MARQUEE */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Subtle side fade vignettes */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#171513] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#171513] to-transparent z-10" />

          <div className="animate-marquee-ltr flex items-center space-x-6">
            {marqueeBrands.map((brand, i) => (
              <div 
                key={i} 
                className="flex-shrink-0 w-56 h-28 bg-[#211E1A] hover:bg-[#282420] border border-white/10 hover:border-[#C5A059] rounded-xl p-4 flex flex-col justify-between items-center transition-all duration-300 shadow-md group"
              >
                <div className="h-12 w-full flex items-center justify-center px-2">
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="max-h-10 max-w-[150px] object-contain filter brightness-110 contrast-125 group-hover:scale-105 transition-transform" 
                  />
                </div>
                <div className="w-full flex items-center justify-between pt-2 border-t border-white/5 text-[10px]">
                  <span className="text-[#CBCBCB] font-medium">{brand.category}</span>
                  <span className="text-[#C5A059] font-bold tracking-wider uppercase text-[9px] bg-[#C5A059]/10 px-2 py-0.5 rounded">
                    {brand.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FOUNDER & ETHOS SPOTLIGHT (AR. SINDHU JAIN M S - FROM PDF PAGE 2) */}
      <section className="py-24 bg-[#121212] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-xl overflow-hidden border border-[#C5A059]/40 bg-gradient-to-b from-[#25221E] to-[#121212] shadow-2xl relative flex items-end justify-center group">
              <img
                src="/founder_sindhu_jain.png"
                alt="Sindhu Jain M S - Founder SIRA SPACE"
                className="h-[92%] object-contain filter drop-shadow-2xl group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-90 pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <span className="text-[10px] tracking-widest text-[#C5A059] uppercase font-bold block">
                  FOUNDER & PRINCIPAL ARCHITECT
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  Sindhu Jain M S
                </h3>
                <p className="text-xs text-[#CBCBCB] mt-1 font-light">
                  Civil Engineer • 8+ Yrs Industrial Experience
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs tracking-[0.25em] text-[#C5A059] uppercase font-bold block">
              LEADERSHIP WITH TECHNICAL RIGOR
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white leading-tight">
              "We Don't Just Decorate Walls; We Engineer Living Narratives."
            </h2>
            <p className="text-sm text-[#CBCBCB] font-light leading-relaxed">
              Founded in April 2023, <strong>SIRA SPACE</strong> was established out of a deep engineering passion to eliminate the traditional pain points of home interiors: sluggish execution timelines, poor site workmanship, hidden material specifications, and unguided clients.
            </p>
            <p className="text-sm text-[#CBCBCB] font-light leading-relaxed">
              With senior leadership experience spanning <strong>BEML Limited</strong>, <strong>Creatomy Build</strong>, and <strong>buildAhome</strong>, Sindhu brings industrial-scale modular manufacturing discipline, 0.1mm CAD precision, and genuine material transparency to every home.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/studio"
                className="bg-[#C5A059] hover:bg-[#C5A059]/90 text-[#121212] px-6 py-3 rounded text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              >
                READ FOUNDER STATEMENT
              </Link>
              <Link
                to="/experience"
                className="border border-white/20 hover:border-white text-white px-6 py-3 rounded text-xs font-bold uppercase tracking-wider transition-all"
              >
                THE SIRA EXPERIENCE
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 7. GOOGLE MY BUSINESS REVIEWS & EMBEDDED LOCATION SECTION */}
      <section className="py-24 bg-[#181614] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Header with Official Google Business Trust Score */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full mb-3">
                {/* Google G Multi-Color Icon */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span className="text-[11px] tracking-wider text-white font-semibold">
                  Google Verified Business Profile
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-white">
                Google Verified Reviews & Studio Location
              </h2>
              <p className="text-xs sm:text-sm text-[#CBCBCB]/80 font-light mt-2 max-w-2xl">
                Read authentic feedback from homeowners and commercial clients across Bengaluru, Mysuru, and Karnataka.
              </p>
            </div>

            {/* Scorecard Box */}
            <div className="flex items-center space-x-4 bg-[#121212] border border-[#C5A059]/40 p-4 rounded-xl shrink-0">
              <div className="text-center pr-4 border-r border-white/10">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#C5A059]">4.9</div>
                <div className="flex items-center space-x-0.5 justify-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                  ))}
                </div>
              </div>
              <div className="text-left space-y-1">
                <span className="text-xs font-bold text-white block">48+ Reviews on Google</span>
                <span className="text-[10px] text-[#CBCBCB]/70 block">100% Verified Clients</span>
                <a
                  href={googleBusinessData.searchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center text-[10px] text-[#C5A059] hover:underline font-semibold"
                >
                  <span>View on Google</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          </div>

          {/* 4 GOOGLE REVIEWS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {googleBusinessData.reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#121212] border border-white/10 rounded-xl p-6 flex flex-col justify-between hover:border-[#C5A059] transition-all shadow-xl group"
              >
                <div className="space-y-3">
                  {/* Review Top Meta */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#C5A059] text-[#121212] font-bold text-xs flex items-center justify-center">
                        {rev.avatarText}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-[#C5A059] transition-colors">{rev.name}</h4>
                        <span className="text-[10px] text-[#CBCBCB]/60 block">{rev.date}</span>
                      </div>
                    </div>
                    {/* Google mini badge */}
                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
                      <svg className="w-3 h-3" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Stars & Project Tag */}
                  <div className="flex items-center space-x-1 pt-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#C5A059] text-[#C5A059]" />
                    ))}
                    <span className="text-[10px] text-[#C5A059] font-semibold ml-1.5">{rev.tag}</span>
                  </div>

                  {/* Quote Body */}
                  <p className="text-xs text-[#CBCBCB]/90 font-light leading-relaxed italic pt-2">
                    "{rev.review}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-[#CBCBCB]/60">
                  <span className="flex items-center text-[#34A853] font-medium">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Verified Review
                  </span>
                  <span className="flex items-center">
                    <ThumbsUp className="w-3 h-3 mr-1" /> {rev.likes}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* GOOGLE MAP & STUDIO EMBED */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
            
            {/* Left: Interactive Embedded Google Map */}
            <div className="lg:col-span-7 aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto w-full min-h-[340px] rounded-xl overflow-hidden border border-white/10 shadow-lg relative">
              <iframe
                title="SIRA SPACE Interior Designers Location Google Maps"
                src={googleBusinessData.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter invert-[0.9] hue-rotate-180 contrast-125"
              />
              <div className="absolute top-3 left-3 bg-[#121212]/95 backdrop-blur-md px-3 py-1.5 rounded-md text-[10px] font-bold text-[#C5A059] border border-white/10 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>SIRA SPACE • AMRUTAHALLI STUDIO</span>
              </div>
            </div>

            {/* Right: Studio Location Info & Action */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.25em] text-[#C5A059] uppercase font-bold block">
                  EXPERIENCE OUR STUDIO
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white">
                  Visit Our Design Studio in Bengaluru
                </h3>
                <p className="text-xs text-[#CBCBCB]/90 font-light leading-relaxed">
                  Walk through physical material samples, live acrylic and laminate boards, Hafele and Blum hardware mocks, and discuss your architectural floor plan directly with Ar. Sindhu Jain.
                </p>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex items-start space-x-3 text-[#CBCBCB]">
                    <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span><strong>Address:</strong> {googleBusinessData.address}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[#CBCBCB]">
                    <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span><strong>Hours:</strong> {googleBusinessData.hours}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[#CBCBCB]">
                    <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span><strong>Phone:</strong> {googleBusinessData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[#CBCBCB]">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span><strong>Serving:</strong> {googleBusinessData.serving}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={googleBusinessData.searchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-[#C5A059] hover:bg-[#C5A059]/90 text-[#121212] py-3.5 px-4 rounded text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center space-x-1.5 shadow-lg"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
                <button
                  onClick={onOpenQuote}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3.5 px-4 rounded text-xs font-bold uppercase tracking-wider text-center transition-all"
                >
                  Book Studio Visit
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 8. TRENDING INTERIOR DESIGN ARTICLES & GUIDES (KNOWLEDGE HUB) */}
      <section className="py-24 bg-[#141210] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center space-x-2 bg-[#C5A059]/10 border border-[#C5A059]/30 px-3.5 py-1 rounded-full mb-3">
                <BookOpen className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="text-[10px] tracking-[0.2em] text-[#C5A059] uppercase font-bold">
                  TRENDING DESIGN ARTICLES & LOOKBOOKS
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-white">
                Trending Interior Design Ideas & Guides
              </h2>
              <p className="text-xs sm:text-sm text-[#CBCBCB]/80 font-light mt-2 max-w-2xl">
                Improvised from leading modern design benchmarks and Livspace trends—tailored specifically for Karnataka homes with civil engineering precision.
              </p>
            </div>

            <Link
              to="/blog"
              className="mt-6 md:mt-0 inline-flex items-center space-x-2 border border-[#C5A059]/50 hover:border-[#C5A059] bg-[#C5A059]/10 hover:bg-[#C5A059] text-[#C5A059] hover:text-[#121212] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
            >
              <span>EXPLORE ALL GUIDES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3 TRENDING ARTICLES CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogData.slice(0, 3).map((article) => (
              <Link
                key={article.id}
                to={\`/blog/\${article.slug}\`}
                className="bg-[#121212] border border-white/10 rounded-xl overflow-hidden hover:border-[#C5A059] transition-all flex flex-col group shadow-xl hover:-translate-y-1.5"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-85" />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <span className="bg-[#121212]/90 backdrop-blur-md text-[#C5A059] text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded border border-white/10">
                      {article.category}
                    </span>
                    {article.tag && (
                      <span className="bg-[#C5A059] text-[#121212] text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded">
                        {article.tag}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center space-x-3 text-[10px] text-[#CBCBCB]/60 mb-2">
                      <span className="flex items-center"><Clock className="w-3 h-3 mr-1 text-[#C5A059]" /> {article.readTime}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="font-serif text-lg font-medium text-white group-hover:text-[#C5A059] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-[#CBCBCB]/70 font-light mt-2 line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[11px] text-[#C5A059] font-bold">
                    <span>READ COMPLETE GUIDE</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 9. INSTAGRAM LIVE REELS & SITE FEED (@sira_space) */}
      <section className="py-24 bg-[#121212] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs tracking-[0.25em] text-[#C5A059] uppercase font-bold block mb-2">
                FOLLOW US @SIRA_SPACE
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-white">
                Live from Site & Factory Reels
              </h2>
            </div>
            <a
              href="https://www.instagram.com/sira_space/"
              target="_blank"
              rel="noreferrer"
              className="mt-4 sm:mt-0 inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#C5A059] hover:text-white"
            >
              <Instagram className="w-4 h-4" />
              <span>FOLLOW ON INSTAGRAM</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {instagramReels.map((reel) => (
              <a
                key={reel.id}
                href={reel.url}
                target="_blank"
                rel="noreferrer"
                className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-[#C5A059] transition-all flex flex-col shadow-lg"
              >
                <div className="aspect-[9/12] overflow-hidden relative">
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] text-white flex items-center space-x-1">
                    <Play className="w-3 h-3 fill-white" />
                    <span>{reel.views}</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] text-[#C5A059] font-bold uppercase tracking-wider block mb-1">
                      {reel.location}
                    </span>
                    <h4 className="font-serif text-base text-white font-medium group-hover:text-[#C5A059] transition-colors line-clamp-2">
                      {reel.title}
                    </h4>
                  </div>
                </div>

                <div className="p-4 bg-[#121212] border-t border-white/5">
                  <p className="text-[11px] text-[#CBCBCB]/70 font-light line-clamp-2 leading-relaxed">
                    {reel.caption}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.25em] text-[#C5A059] uppercase font-bold block mb-2">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white">
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-4">
          {faqData.flatMap(cat => cat.items).map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx} 
                className="bg-[#121212] border border-white/10 rounded-xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex justify-between items-center space-x-4 hover:bg-white/[0.02]"
                >
                  <span className="font-serif text-lg text-white font-medium">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#C5A059] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#CBCBCB] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs text-[#CBCBCB] leading-relaxed font-light border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. FINAL BOTTOM LEAD CONVERSION STRIP */}
      <section className="py-20 bg-gradient-to-b from-[#121212] to-[#1C1A17] border-t border-white/10 text-center px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-xs tracking-[0.3em] text-[#C5A059] uppercase font-bold">
            LET'S SHAPE YOUR STORY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white">
            Ready to Build Your Dream Interior?
          </h2>
          <p className="text-sm text-[#CBCBCB]/80 max-w-xl mx-auto font-light leading-relaxed">
            Get an instant itemized estimate or book a personal architectural walkthrough with Ar. Sindhu Jain.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenQuote}
              className="w-full sm:w-auto bg-[#C5A059] hover:bg-[#C5A059]/90 text-[#121212] px-8 py-4 rounded font-bold text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-105"
            >
              Get your free Quote
            </button>
            <a
              href="https://wa.me/918618870672"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded font-bold text-xs uppercase tracking-widest transition-all"
            >
              WHATSAPP DESIGN CONSULTATION
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
`;

fs.writeFileSync(path.join(__dirname, 'src', 'pages', 'Home.jsx'), homeContent.trim());
console.log('Home.jsx updated with Blog section.');
