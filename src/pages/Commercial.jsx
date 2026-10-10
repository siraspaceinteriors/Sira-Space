import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Briefcase, 
  Stethoscope, 
  Store, 
  Coffee, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  Compass
} from 'lucide-react';
import { projectsData } from '../data/projectsData';

export default function Commercial() {
  const commercialProjects = projectsData.filter(p => p.type === 'Commercial');

  const commercialSectors = [
    {
      icon: Briefcase,
      title: "Corporate Workspaces & Boardrooms",
      desc: "High-productivity office layouts, executive cabins, acoustic conference rooms, and ergonomic sit-stand workstations engineered for collaboration.",
      highlight: "Circadian Lighting & Sound Dampening"
    },
    {
      icon: Stethoscope,
      title: "Healthcare, Clinics & Hospitals",
      desc: "Specialized clinical environments engineered for patient flow, antimicrobial finishes, sterile consultation rooms, and durable hygiene surfaces (e.g. Global Pet Hospital).",
      highlight: "Antimicrobial & Zero-VOC Surfaces"
    },
    {
      icon: Store,
      title: "Retail Flagships & Showrooms",
      desc: "Brand-defining spatial retail environments with high-traffic durable flooring, architectural display podiums, and accent spotlighting that boosts merchandise appeal.",
      highlight: "High Footfall Durability & Brand Identity"
    },
    {
      icon: Coffee,
      title: "Hospitality, Cafes & Dining",
      desc: "Atmospheric restaurants, bistro lounges, and boutique hotels balancing warm intimate ambient lighting with efficient kitchen service ergonomics.",
      highlight: "Sensory Ambiance & Fast-Track Execution"
    }
  ];

  return (
    <div className="bg-[#1C1A17] text-white pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <span className="text-xs tracking-[0.3em] text-[#C5A059] uppercase font-bold block mb-2">
            TURNKEY COMMERCIAL INTERIOR ARCHITECTURE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium">
            Commercial & Workplace Environments
          </h1>
          <p className="text-sm text-[#CBCBCB]/80 mt-5 font-light leading-relaxed">
            Led by Civil Engineer & Principal Architect <strong>Sindhu Jain M S</strong>, we design and execute high-performance commercial spaces, corporate headquarters, and medical clinics across Karnataka with strict timeline guarantees.
          </p>
        </div>

        {/* 4 SECTORS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {commercialSectors.map((sector, i) => {
            const Icon = sector.icon;
            return (
              <div key={i} className="bg-[#121212] border border-white/10 rounded-xl p-8 hover:border-[#C5A059] transition-all group">
                <div className="w-12 h-12 rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-white mb-2">{sector.title}</h3>
                <p className="text-xs text-[#CBCBCB]/80 leading-relaxed font-light mb-4">
                  {sector.desc}
                </p>
                <div className="flex items-center text-xs font-semibold text-[#C5A059]">
                  <CheckCircle2 className="w-4 h-4 mr-1.5 shrink-0" />
                  <span>{sector.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* FEATURED COMMERCIAL CASE STUDIES */}
        <div className="mb-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs tracking-[0.25em] text-[#C5A059] uppercase font-bold">
                PROVEN TRACK RECORD
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white mt-1">
                Executed Commercial Case Studies
              </h2>
            </div>
            <Link
              to="/gallery"
              className="mt-4 sm:mt-0 text-xs font-bold tracking-widest text-[#CBCBCB] hover:text-[#C5A059] uppercase flex items-center space-x-1"
            >
              <span>VIEW FULL GALLERY</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commercialProjects.map((project) => (
              <div 
                key={project.id}
                className="bg-[#121212] border border-white/10 rounded-xl overflow-hidden hover:border-[#C5A059] transition-all flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block mb-1">
                      {project.category} • {project.city}
                    </span>
                    <h3 className="font-serif text-2xl text-white font-medium">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-[#CBCBCB]/80 font-light leading-relaxed">
                    {project.overview}
                  </p>
                  
                  <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                    <span className="text-[#CBCBCB] font-medium">{project.sqFt}</span>
                    <span className="text-[#C5A059] font-bold">{project.timeline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COMMERCIAL CTA */}
        <div className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-[#C5A059]/40 rounded-xl p-10 text-center max-w-4xl mx-auto space-y-6 shadow-2xl">
          <span className="text-xs tracking-[0.25em] text-[#C5A059] uppercase font-bold">FAST-TRACK TURNKEY COMMERCIAL DELIVERY</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white">
            Planning an Office, Clinic, or Retail Project?
          </h2>
          <p className="text-xs text-[#CBCBCB]/80 max-w-xl mx-auto font-light leading-relaxed">
            Get an exact Bill of Quantities (BOQ), 3D floor plan layout, and milestone delivery timeline from Ar. Sindhu Jain.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/inquire"
              className="w-full sm:w-auto bg-[#C5A059] hover:bg-[#C5A059]/90 text-[#121212] px-8 py-3.5 rounded text-xs font-bold uppercase tracking-widest transition-all"
            >
              GET COMMERCIAL QUOTE
            </Link>
            <a
              href="https://wa.me/918618870672?text=Hello%20SIRA%20Space!%20We%20would%20like%20to%20discuss%20a%20commercial%20interior%20project."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba59] text-white px-8 py-3.5 rounded text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-2"
            >
              <span>CONNECT ON WHATSAPP</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
