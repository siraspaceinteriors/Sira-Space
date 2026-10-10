import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Layers, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  ShieldCheck, 
  Eye, 
  MessageSquare,
  Award
} from 'lucide-react';

export default function Experience({ onOpenQuote }) {
  const journeySteps = [
    {
      step: "01",
      title: "Laser Site Audit & Lifestyle Immersion",
      desc: "We don't start with catalog templates. Ar. Sindhu Jain visits your raw property to conduct 3D laser measurements, analyze sunlight orientation, wind vectors, and interview your family on daily routines, storage habits, and design aspirations.",
      deliverable: "Spatial Feasibility Report & Laser Measured As-Built Drawings",
      tag: "Site Inspection",
      image: "/pdf_assets/page_6_img_2_X10.jpg"
    },
    {
      step: "02",
      title: "Narrative Space Planning (SIRA & SPACE)",
      desc: "Balancing property geometry with human ergonomics. We craft floor plans that eliminate awkward dead corners, maximize natural ventilation, and ensure every room transitions smoothly like chapters in a story.",
      deliverable: "2D Ergonomic Floor Plan Options with Circulation Maps",
      tag: "Space Planning",
      image: "/pdf_assets/page_3_img_4_X26.jpg"
    },
    {
      step: "03",
      title: "Photorealistic 3D Virtual Walkthrough",
      desc: "See your future home before spending a single rupee on construction. We render millimeter-accurate 3D walkthroughs with realistic material textures, ambient lighting scenes, and bespoke furniture models.",
      deliverable: "Ultra-HD 4K Renders & 360-Degree Virtual Walkthrough",
      tag: "3D Pre-Visualization",
      image: "/pdf_assets/page_5_img_2_X9.jpg"
    },
    {
      step: "04",
      title: "The Tactile Material Library Session",
      desc: "Touch and feel real materials before freezing orders. We guide you through physical swatches of CenturyPly BWP cores, Merino acrylic finishes, natural veneers, Blum lift systems, and Caesarstone quartz slabs.",
      deliverable: "Approved Material Specification Sheet & Grade Certificates",
      tag: "100% Material Clarity",
      image: "/pdf_assets/page_3_img_3_X24.png"
    },
    {
      step: "05",
      title: "German Factory Modular Manufacturing",
      desc: "While electrical and civil works proceed on site, your modular wardrobes, kitchen cabinets, and vanity units are precision-manufactured at our Bengaluru facility using computerized CNC beam saws and PUR edge-banding.",
      deliverable: "Milestone Video Updates Direct from Factory Floor",
      tag: "Precision Joinery",
      image: "/pdf_assets/page_7_img_4_X16.png"
    },
    {
      step: "06",
      title: "White-Glove Styling & Zero-Defect Handover",
      desc: "Our on-site engineering team conducts a 45-point quality checklist. Every drawer channel, sensor light, and soft-close damper is calibrated before white-glove deep cleaning, fragrance styling, and key handover.",
      deliverable: "10-Year Warranty Card & As-Built Maintenance Manual",
      tag: "Turnkey Handover",
      image: "/hero_bg.jpg"
    }
  ];

  return (
    <div className="bg-[#1C1A17] text-white pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HERO SECTION */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <span className="text-xs tracking-[0.3em] text-[#C5A059] uppercase font-bold block mb-2">
            THE SIRA SPACE EXPERIENCE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium">
            Where Civil Engineering Meets Bespoke Artistry
          </h1>
          <p className="text-sm text-[#CBCBCB]/80 mt-5 font-light leading-relaxed">
            Experience an end-to-end interior design and turnkey execution process engineered to eliminate anxiety, hidden costs, and delayed deadlines.
          </p>
        </div>

        {/* 3 CORE PILLARS CARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-[#121212] border border-white/10 p-8 rounded-lg relative overflow-hidden group hover:border-[#C5A059] transition-all">
            <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center mb-6 text-[#C5A059]">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-white mb-2">100% Pre-Visualized</h3>
            <p className="text-xs text-[#CBCBCB]/80 leading-relaxed font-light">
              Experience photorealistic 3D virtual walkthroughs before factory production starts. What you approve on screen is exactly what gets installed in your home.
            </p>
          </div>

          <div className="bg-[#121212] border border-white/10 p-8 rounded-lg relative overflow-hidden group hover:border-[#C5A059] transition-all">
            <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center mb-6 text-[#C5A059]">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-white mb-2">German Factory Precision</h3>
            <p className="text-xs text-[#CBCBCB]/80 leading-relaxed font-light">
              Zero on-site carpentry mess. All modular cabinetry is cut with automated CNC beam saws and sealed with water-resistant PUR edge-banding at our Bengaluru facility.
            </p>
          </div>

          <div className="bg-[#121212] border border-white/10 p-8 rounded-lg relative overflow-hidden group hover:border-[#C5A059] transition-all">
            <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center mb-6 text-[#C5A059]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-white mb-2">Architectural Integrity</h3>
            <p className="text-xs text-[#CBCBCB]/80 leading-relaxed font-light">
              Every project is led by Civil Engineer & Principal Architect <strong>Sindhu Jain M S</strong>, ensuring structural safety, genuine plywood grades, and lifetime peace of mind.
            </p>
          </div>
        </div>

        {/* STEP-BY-STEP JOURNEY */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.25em] text-[#C5A059] uppercase font-bold block mb-2">
              METHODOLOGY & STAGES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white">
              The 6-Stage Homeowner Journey
            </h2>
          </div>

          <div className="space-y-8">
            {journeySteps.map((step, idx) => (
              <div 
                key={step.step} 
                className="bg-[#121212] border border-white/10 rounded-lg p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center hover:border-white/20 transition-all"
              >
                <div className="md:col-span-2 flex flex-col items-start md:items-center text-left md:text-center border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-6">
                  <span className="font-serif text-5xl font-bold text-[#C5A059]">{step.step}</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#CBCBCB] mt-1 font-bold">{step.tag}</span>
                </div>

                <div className="md:col-span-6 space-y-3">
                  <h3 className="font-serif text-2xl text-white">{step.title}</h3>
                  <p className="text-xs text-[#CBCBCB]/80 leading-relaxed font-light">{step.desc}</p>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-md">
                    <span className="text-[9px] uppercase tracking-wider text-[#C5A059] font-bold block mb-0.5">STAGE DELIVERABLE:</span>
                    <p className="text-xs text-white font-medium flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059] mr-2 shrink-0" />
                      <span>{step.deliverable}</span>
                    </p>
                  </div>
                </div>

                <div className="md:col-span-4 aspect-[16/10] rounded-lg overflow-hidden border border-white/10 shadow-lg">
                  <img src={step.image} alt={step.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA BANNER */}
        <div className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-[#C5A059]/40 rounded-xl p-10 text-center max-w-4xl mx-auto space-y-6 shadow-2xl">
          <span className="text-xs tracking-[0.25em] text-[#C5A059] uppercase font-bold">READY TO START YOUR SPATIAL STORY?</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white">
            Schedule a Private Consultation with Ar. Sindhu Jain
          </h2>
          <p className="text-xs text-[#CBCBCB]/80 max-w-xl mx-auto font-light leading-relaxed">
            Bring your floor plan to our studio or request an on-site visit across Bengaluru, Mysuru, Davangere, Tumkur, and Karnataka.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenQuote}
              className="w-full sm:w-auto bg-[#C5A059] hover:bg-[#C5A059]/90 text-[#121212] px-8 py-3.5 rounded text-xs font-bold uppercase tracking-widest transition-all shadow-lg"
            >
              GET YOUR FREE QUOTE
            </button>
            <Link
              to="/inquire"
              className="w-full sm:w-auto border border-white/20 hover:border-white text-white px-8 py-3.5 rounded text-xs font-bold uppercase tracking-widest transition-all"
            >
              BOOK STUDIO VISIT
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
