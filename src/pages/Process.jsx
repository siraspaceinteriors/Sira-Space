import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Cpu, Eye, Sparkles, Layers, Clock } from 'lucide-react';

export default function Process() {
  const processSteps = [
    {
      num: "01",
      title: "Consultation & Site Inspection",
      subtitle: "Laser Measurements & Lifestyle Audit",
      desc: "Our journey begins on your site. Principal Architect Sindhu Jain conducts 3D laser leveling, structural checks, window orientation audits, and an in-depth lifestyle interview to uncover how your family lives.",
      deliverable: "As-Built Dimensional CAD & Spatial Feasibility Analysis",
      image: "/pdf_assets/page_6_img_2_X10.jpg"
    },
    {
      num: "02",
      title: "Concept Development",
      subtitle: "Moodboards & Narrative Spatial Flow",
      desc: "Translating your personality into spatial sequences (SIRA). We establish the aesthetic direction with curated material palettes, color psychology, and ergonomic circulation diagrams.",
      deliverable: "Curated Design Moodboards & Initial 2D Spatial Layouts",
      image: "/pdf_assets/page_3_img_4_X26.jpg"
    },
    {
      num: "03",
      title: "Design & Planning",
      subtitle: "Photorealistic 3D Renders & 2D CAD Drawings",
      desc: "Experience your home in high-definition virtual reality before breaking ground. We produce millimeter-accurate photorealistic 3D views with lifelike lighting, textures, and electrical conduit mapping.",
      deliverable: "4K Photorealistic Visualizations & Comprehensive Execution Drawings",
      image: "/pdf_assets/page_5_img_2_X9.jpg"
    },
    {
      num: "04",
      title: "Material Selection & Production",
      subtitle: "Transparent Sourcing & Factory Modular Build",
      desc: "Touch and feel genuine materials at our studio. Once grades are locked, components enter computerized CNC cutting and automated PUR edge-banding at our Bengaluru factory.",
      deliverable: "Itemized BOQ Bill of Quantities & QR Batch Material Certificates",
      image: "/pdf_assets/page_5_img_3_X24.jpg"
    },
    {
      num: "05",
      title: "Execution & Supervision",
      subtitle: "Civil Coordination & On-Site Engineering Control",
      desc: "Civil, electrical, plumbing, and false ceiling works are managed concurrently on site by civil engineers, eliminating delays and ensuring factory modular cabinetry slots in effortlessly.",
      deliverable: "Daily WhatsApp Site Progress Logs & 45-Point Quality Audits",
      image: "/pdf_assets/page_7_img_4_X16.png"
    },
    {
      num: "06",
      title: "Final Styling & Handover",
      subtitle: "Final Decor Styling & Zero-Defect Handover",
      desc: "The story is brought to life. We complete hardware calibration, deep cleaning, sensory fragrance styling, and hand over your keys with an official 10-year warranty card.",
      deliverable: "10-Year Warranty Certificate & Homeowner Maintenance Handbook",
      image: "/hero_bg.jpg"
    }
  ];

  return (
    <div className="bg-[#1C1A17] text-white pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* PAGE HEADER */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <span className="text-xs tracking-[0.3em] text-[#C5A059] uppercase font-bold block mb-2">
            OFFICIAL 6-STAGE METHODOLOGY (FROM SALES SPECIFICATION)
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium text-white">
            Our Turnkey Design Process
          </h1>
          <p className="text-sm text-[#CBCBCB]/80 mt-4 font-light leading-relaxed">
            Engineered by Civil Engineer & Principal Architect <strong>Sindhu Jain M S</strong> to eliminate traditional delays, site mess, and hidden material markups from initial sketch to white-glove key handover.
          </p>
        </div>

        {/* 6-STAGE TIMELINE */}
        <div className="space-y-12 mb-24">
          {processSteps.map((step, idx) => (
            <div 
              key={step.num}
              className={`bg-[#121212] border border-white/10 rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 hover:border-[#C5A059] transition-all shadow-xl ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="lg:col-span-2 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-white/10 pb-4 lg:pb-0 lg:pr-6">
                <span className="font-serif text-5xl sm:text-6xl text-[#C5A059] font-bold block">{step.num}</span>
                <span className="text-[10px] uppercase tracking-widest text-[#CBCBCB] font-bold block mt-1">STAGE {step.num}</span>
              </div>

              <div className="lg:col-span-6 space-y-3">
                <span className="text-xs text-[#C5A059] uppercase tracking-wider font-semibold block">{step.subtitle}</span>
                <h3 className="font-serif text-2xl text-white">{step.title}</h3>
                <p className="text-xs text-[#CBCBCB]/80 leading-relaxed font-light">{step.desc}</p>
                <div className="pt-2 text-xs text-white flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] mr-2 shrink-0" />
                  <span className="font-medium text-[#CBCBCB]">Deliverable: <strong className="text-white">{step.deliverable}</strong></span>
                </div>
              </div>

              <div className="lg:col-span-4 aspect-[16/10] rounded-lg overflow-hidden border border-white/10 shadow-lg">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>

        {/* WHY CHOOSE US 5 PILLARS (PAGE 6 OF PDF) */}
        <div className="bg-[#121212] border border-white/10 rounded-xl p-8 sm:p-12 mb-20 shadow-2xl">
          <div className="text-center mb-10">
            <span className="text-xs tracking-[0.25em] text-[#C5A059] uppercase font-bold block mb-2">
              PILLARS OF EXCELLENCE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white">
              Why Homeowners & Businesses Choose SIRA Space
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
            <div className="bg-white/5 border border-white/5 p-5 rounded-lg space-y-2">
              <span className="font-serif text-2xl text-[#C5A059] font-bold">01</span>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Superior Engineering</h4>
              <p className="text-[11px] text-[#CBCBCB]/70 font-light">Civil engineering precision and zero structural compromises.</p>
            </div>
            <div className="bg-white/5 border border-white/5 p-5 rounded-lg space-y-2">
              <span className="font-serif text-2xl text-[#C5A059] font-bold">02</span>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Reduced Lead Times</h4>
              <p className="text-[11px] text-[#CBCBCB]/70 font-light">In-house Bengaluru modular factory cutting site delays by 40%.</p>
            </div>
            <div className="bg-white/5 border border-white/5 p-5 rounded-lg space-y-2">
              <span className="font-serif text-2xl text-[#C5A059] font-bold">03</span>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">100% Transparency</h4>
              <p className="text-[11px] text-[#CBCBCB]/70 font-light">Zero hidden costs with itemized Bill of Quantities (BOQ).</p>
            </div>
            <div className="bg-white/5 border border-white/5 p-5 rounded-lg space-y-2">
              <span className="font-serif text-2xl text-[#C5A059] font-bold">04</span>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Client Education</h4>
              <p className="text-[11px] text-[#CBCBCB]/70 font-light">Active material guidance on genuine BWR vs BWP plywood grades.</p>
            </div>
            <div className="bg-white/5 border border-white/5 p-5 rounded-lg space-y-2">
              <span className="font-serif text-2xl text-[#C5A059] font-bold">05</span>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Proven Track Record</h4>
              <p className="text-[11px] text-[#CBCBCB]/70 font-light">25+ Turnkey projects and 50+ design blueprints across Karnataka.</p>
            </div>
          </div>
        </div>

        {/* CTA BANNER */}
        <div className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-[#C5A059]/40 rounded-xl p-10 text-center max-w-4xl mx-auto space-y-6 shadow-2xl">
          <span className="text-xs tracking-[0.25em] text-[#C5A059] uppercase font-bold">START YOUR SPATIAL SEQUENCE</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white">
            Ready to Walk Your Floor Plan with Us?
          </h2>
          <p className="text-xs text-[#CBCBCB]/80 max-w-xl mx-auto font-light leading-relaxed">
            Get an instant budget range or book a private site inspection across Bengaluru, Mysuru, Davangere, Tumkur, and Hassan.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/inquire"
              className="w-full sm:w-auto bg-[#C5A059] hover:bg-[#C5A059]/90 text-[#121212] px-8 py-3.5 rounded text-xs font-bold uppercase tracking-widest transition-all"
            >
              GET YOUR FREE QUOTE
            </Link>
            <Link
              to="/inquire"
              className="w-full sm:w-auto border border-white/20 hover:border-white text-white px-8 py-3.5 rounded text-xs font-bold uppercase tracking-widest transition-all"
            >
              BOOK CONSULTATION
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
