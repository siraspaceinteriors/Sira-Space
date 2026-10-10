import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  ShieldCheck, 
  Check, 
  X, 
  ArrowRight, 
  Clock, 
  Layers, 
  Award,
  Sparkles,
  Wrench
} from 'lucide-react';
import { brandsData } from '../data/siteData';

export default function Factory() {
  const comparisonItems = [
    {
      feature: "Cutting & Dimensional Tolerance",
      factory: "CNC Computerized Beam Saws with 0.1mm millimeter accuracy",
      carpenter: "Manual hand saw cuts resulting in wavy gaps and crooked shutters",
      status: true
    },
    {
      feature: "Edge-Banding & Water Sealing",
      factory: "Automated German PUR hot-melt edge bander with waterproof seal",
      carpenter: "Hand-glued strips using smelly contact adhesive prone to peeling in 6 months",
      status: true
    },
    {
      feature: "Dust, Noise & Site Disruption",
      factory: "Zero mess in your home. Ready modules assembled in 7-10 days on site",
      carpenter: "Months of choking wood dust, noise complaints from apartment associations",
      status: true
    },
    {
      feature: "Plywood Grade Verification",
      factory: "100% Genuine CenturyPly BWP Calibrated Core with QR batch verification",
      carpenter: "Frequent mixing of cheap commercial MR grade ply with BWP exterior skins",
      status: true
    },
    {
      feature: "Hardware & Concealed Joinery",
      factory: "Minifix & dowel system for rigid structural joints + Blum/Häfele soft-close",
      carpenter: "Crude screw nails that strip and loosen over daily household wear",
      status: true
    },
    {
      feature: "Timeline Guarantee",
      factory: "Strict 45-Day turnaround with factory production schedule tracking",
      carpenter: "Unpredictable 4-6 months with frequent worker absenteeism and delays",
      status: true
    }
  ];

  return (
    <div className="bg-[#1C1A17] text-white pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <span className="text-xs tracking-[0.3em] text-[#C5A059] uppercase font-bold block mb-2">
            IN-HOUSE PRECISION MANUFACTURING
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium">
            The SIRA Factory Advantage
          </h1>
          <p className="text-sm text-[#CBCBCB]/80 mt-5 font-light leading-relaxed">
            Why compromise your home to uncalibrated on-site carpentry? At our dedicated Bengaluru manufacturing facility, modular woodwork is engineered with German automated machinery for lifetime durability.
          </p>
        </div>

        {/* 4 HIGHLIGHT PILLARS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-24">
          <div className="bg-[#121212] border border-white/10 p-6 rounded-lg text-center space-y-3">
            <span className="font-serif text-4xl text-[#C5A059] font-bold">0.1 mm</span>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Millimeter Precision</h4>
            <p className="text-xs text-[#CBCBCB]/70 font-light leading-relaxed">
              Automated computerized beam saws eliminate hand-cut imperfections, ensuring perfect drawer alignments.
            </p>
          </div>

          <div className="bg-[#121212] border border-white/10 p-6 rounded-lg text-center space-y-3">
            <span className="font-serif text-4xl text-[#C5A059] font-bold">PUR</span>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Waterproof Edge Sealing</h4>
            <p className="text-xs text-[#CBCBCB]/70 font-light leading-relaxed">
              Polyurethane reactive hot-melt bonding locks moisture out, preventing kitchen cabinet swelling.
            </p>
          </div>

          <div className="bg-[#121212] border border-white/10 p-6 rounded-lg text-center space-y-3">
            <span className="font-serif text-4xl text-[#C5A059] font-bold">0%</span>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Zero Sub-Contracting</h4>
            <p className="text-xs text-[#CBCBCB]/70 font-light leading-relaxed">
              We never outsource your modular units to third-party workshops. 100% produced in our own factory.
            </p>
          </div>

          <div className="bg-[#121212] border border-white/10 p-6 rounded-lg text-center space-y-3">
            <span className="font-serif text-4xl text-[#C5A059] font-bold">10 Yrs</span>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Structural Warranty</h4>
            <p className="text-xs text-[#CBCBCB]/70 font-light leading-relaxed">
              Comprehensive 10-year warranty covering core joinery, delamination, and hardware mechanisms.
            </p>
          </div>
        </div>

        {/* COMPARISON TABLE: SIRA FACTORY VS CONVENTIONAL CARPENTRY */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <span className="text-xs tracking-[0.25em] text-[#C5A059] uppercase font-bold block mb-2">
              WHY MODULAR FACTORY TRUMPS CARPENTRY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white">
              SIRA Factory Joinery vs. On-Site Carpenters
            </h2>
          </div>

          <div className="bg-[#121212] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-12 bg-white/5 border-b border-white/10 p-5 text-xs font-bold uppercase tracking-wider">
              <div className="col-span-4 text-[#C5A059]">Engineering Aspect</div>
              <div className="col-span-4 text-white">SIRA Space Factory Build ✔</div>
              <div className="col-span-4 text-[#CBCBCB]/60">Traditional Carpenter ✖</div>
            </div>

            <div className="divide-y divide-white/5">
              {comparisonItems.map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 p-5 text-xs items-center gap-4 hover:bg-white/[0.02] transition-colors">
                  <div className="col-span-4 font-bold text-white">
                    {item.feature}
                  </div>
                  <div className="col-span-4 text-[#C5A059] flex items-start space-x-2">
                    <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>{item.factory}</span>
                  </div>
                  <div className="col-span-4 text-[#CBCBCB]/60 flex items-start space-x-2">
                    <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{item.carpenter}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BRAND PARTNER INTEGRATIONS */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <span className="text-xs tracking-[0.25em] text-[#C5A059] uppercase font-bold block mb-2">
              FACTORY HARDWARE & MATERIAL PARTNERS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white">
              Global Brands Integrated into Our Production Line
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {brandsData.map((brand, i) => (
              <div key={i} className="bg-[#121212] border border-white/10 p-6 rounded-lg text-center hover:border-[#C5A059] transition-all">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] block mb-1 font-bold">{brand.badge}</span>
                <h4 className="font-serif text-xl font-bold text-white my-1">{brand.name}</h4>
                <p className="text-[11px] text-[#CBCBCB]/70 font-light mt-1">{brand.tagline}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-[#C5A059]/40 rounded-xl p-10 text-center max-w-4xl mx-auto space-y-6 shadow-2xl">
          <span className="text-xs tracking-[0.25em] text-[#C5A059] uppercase font-bold">VISIT OUR PRODUCTION FACILITY</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white">
            Want to See How Your Furniture is Built?
          </h2>
          <p className="text-xs text-[#CBCBCB]/80 max-w-xl mx-auto font-light leading-relaxed">
            We welcome clients to tour our Bengaluru factory, inspect raw CenturyPly sheets, test Blum lift hardware, and verify edge-banding machines before signing.
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
              SCHEDULE FACTORY VISIT
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
