import React from 'react';
import { CheckCircle, Award, Shield, Cpu, Clock, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Studio() {
  const careerTimeline = [
    {
      period: "April 2023 – Present",
      role: "Founder & Principal Architect",
      company: "SIRA SPACE, Bengaluru",
      desc: "Founded SIRA Space to revolutionize interior architecture through narrative spatial flow, factory modular precision, and 100% material transparency. Delivered 25+ execution projects and 50+ design projects across Karnataka."
    },
    {
      period: "Nov 2021 – Mar 2023",
      role: "Lead - Design & Development (Modular Furniture)",
      company: "CREATOMY BUILD, Bengaluru",
      desc: "Headed all modular furniture projects full-time. Handled site laser measurements, 2D/3D conversions, technical site problem solving, factory production oversight, and on-time site dispatch."
    },
    {
      period: "Mar 2021 – Nov 2021",
      role: "Interior Designer",
      company: "buildAhome, Bengaluru",
      desc: "Managed estimation, on-site project visits, sales, and client/vendor coordination. Generated detailed production drawings and worked closely with management, structural engineers, and field staff."
    },
    {
      period: "Aug 2020 – Mar 2021",
      role: "Interior Designer",
      company: "CREATIVE FUSION, Mysuru",
      desc: "Designed interior spaces, permanent architectural details, and temporary styling elements. Created moodboards, CAD floor plans, and 3D Sketchup visual concepts."
    },
    {
      period: "June 2020 – Sep 2020",
      role: "Design Partner (Freelance)",
      company: "HOMZINTERIO, Bengaluru",
      desc: "Provided end-to-end interior design concepts, client requirement audits, and detailed architectural execution drawings."
    },
    {
      period: "Oct 2018 – May 2020",
      role: "Design Associate",
      company: "CREATOMY INTERIOR DESIGNS, Bengaluru",
      desc: "Gained comprehensive expertise in site analysis, concept development, estimation, 2D/3D schematics, and vendor management."
    },
    {
      period: "Sept 2017 – Sep 2018",
      role: "Graduate Engineering Trainee",
      company: "BEML Limited, Mysuru",
      desc: "Civil Engineering background. Formulated AutoCAD 2D drawings of shop floors & machine foundations, rate estimation, and SAP purchase requisitions."
    }
  ];

  return (
    <div className="bg-[#1C1A17] text-white pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="mb-16">
          <span className="text-xs tracking-[0.3em] text-[#C5A059] uppercase font-bold">
            01 // ABOUT OUR STUDIO & FOUNDER
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl mt-2 font-medium text-white">
            Leadership, Track Record & Ethos
          </h1>
        </div>

        {/* FOUNDER PROFILE SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* FOUNDER PHOTO CARD (FROM PDF PAGE 2) */}
          <div className="lg:col-span-4">
            <div className="aspect-[4/5] rounded-xl overflow-hidden border border-[#C5A059]/40 bg-gradient-to-b from-[#25221E] to-[#121212] shadow-2xl relative flex items-end justify-center group">
              <img
                src="/founder_sindhu_jain.png"
                alt="Sindhu Jain M S - Founder SIRA SPACE"
                className="h-[95%] object-contain filter drop-shadow-2xl group-hover:scale-105 transition-all duration-700"
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
                  Civil Engineer • Lead Modular Specialist
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <span className="text-xs tracking-[0.2em] text-[#C5A059] uppercase font-semibold block">
              CIVIL ENGINEER & INTERIOR ARCHITECT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold">
              Sindhu Jain M S
            </h2>
            <p className="text-sm text-[#CBCBCB] leading-relaxed font-light">
              Founded by Civil Engineer and Interior Architect <strong>Sindhu Jain M S</strong> in April 2023, <strong>SIRA SPACE</strong> was established out of a deep-seated passion to eliminate common industry pain points—sluggish execution timelines, poor site workmanship, hidden material specifications, and lack of client education.
            </p>

            <p className="text-sm text-[#CBCBCB] leading-relaxed font-light">
              With a strong engineering background starting at <strong>BEML Limited</strong> and years of leadership across premier firms like <strong>Creatomy Build</strong>, <strong>buildAhome</strong>, and <strong>Creatomy Interior Designs</strong>, Sindhu brings rigorous technical discipline, factory modular expertise, and precise CAD/3D modeling to every project.
            </p>

            {/* TRACK RECORD STATS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-white/10 my-6">
              <div>
                <div className="font-serif text-3xl text-[#C5A059] font-bold">8+ Yrs</div>
                <div className="text-[10px] uppercase text-[#CBCBCB] tracking-wider mt-1">Industrial Experience</div>
              </div>
              <div>
                <div className="font-serif text-3xl text-[#C5A059] font-bold">25+</div>
                <div className="text-[10px] uppercase text-[#CBCBCB] tracking-wider mt-1">Turnkey Projects</div>
              </div>
              <div>
                <div className="font-serif text-3xl text-[#C5A059] font-bold">50+</div>
                <div className="text-[10px] uppercase text-[#CBCBCB] tracking-wider mt-1">Design Projects</div>
              </div>
              <div>
                <div className="font-serif text-3xl text-[#C5A059] font-bold">100%</div>
                <div className="text-[10px] uppercase text-[#CBCBCB] tracking-wider mt-1">Material Clarity</div>
              </div>
            </div>

            <div className="bg-white/5 border-l-2 border-[#C5A059] p-5 rounded-r">
              <p className="font-serif italic text-base text-white">
                "We don't just decorate rooms; we engineer spatial flow. SIRA Space was born to bring complete material transparency, reduced lead times, and uncompromised quality to every home."
              </p>
              <span className="text-xs text-[#C5A059] font-bold block mt-2">— Sindhu Jain M S, Founder</span>
            </div>
          </div>

        </div>

        {/* PROBLEM-SOLVING & VALUE PROPOSITION */}
        <div className="bg-[#121212] p-8 md:p-10 rounded-xl border border-white/10 space-y-6 mb-20 shadow-2xl">
          <h3 className="font-serif text-2xl text-white border-b border-white/10 pb-3">
            How Sira Space Solves Traditional Interior Delays & Compromises
          </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">1. Better Quality Interior Solutions</span>
                  <p className="text-[#CBCBCB]/80 mt-0.5">Strict engineering standards, factory modular fittings, and zero-defect checks.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">2. Reduced Production Lead Time</span>
                  <p className="text-[#CBCBCB]/80 mt-0.5">Streamlined factory joinery manufacturing eliminating sluggish on-site delays.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Cpu className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">3. 100% Material & Process Transparency</span>
                  <p className="text-[#CBCBCB]/80 mt-0.5">Full disclosure on plywood grades, laminates, factory machinery & workmanship.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Layers className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">4. Client Material Education</span>
                  <p className="text-[#CBCBCB]/80 mt-0.5">Educating clients on finishes, hardware options, and long-term durability choices.</p>
                </div>
              </div>
            </div>
          </div>

        {/* CAREER TIMELINE */}
        <div className="mb-20">
          <h2 className="font-serif text-3xl text-white mb-8">Founder's Professional Experience Journey</h2>
          
          <div className="space-y-6">
            {careerTimeline.map((item, index) => (
              <div key={index} className="bg-[#121212] p-6 rounded border border-white/10 grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                <div>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#C5A059] uppercase block">{item.period}</span>
                  <h4 className="font-serif text-lg text-white font-bold mt-1">{item.company}</h4>
                </div>
                <div className="md:col-span-3">
                  <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-1">{item.role}</span>
                  <p className="text-xs text-[#CBCBCB]/80 leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CORE BRAND MEANING */}
        <div className="bg-[#121212] p-10 rounded border border-white/10">
          <h2 className="font-serif text-3xl mb-8 text-center text-white">
            Brand Identity & Meaning of "SIRA SPACE"
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-6 rounded border border-white/5">
              <span className="text-[10px] text-[#C5A059] tracking-widest uppercase font-bold block mb-1">THE NARRATIVE / FLOW</span>
              <h3 className="font-serif text-xl text-white mb-2">SIRA</h3>
              <p className="text-xs text-[#CBCBCB]/80 leading-relaxed">
                Derived from linguistic roots meaning "order," "sequence," or "living story." Interior floor plans transition logically into the next room with seamless visual continuity.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded border border-white/5">
              <span className="text-[10px] text-[#C5A059] tracking-widest uppercase font-bold block mb-1">THE CANVAS / FUNCTION</span>
              <h3 className="font-serif text-xl text-white mb-2">SPACE</h3>
              <p className="text-xs text-[#CBCBCB]/80 leading-relaxed">
                Represents physical property geometry. Focuses on balancing human ergonomics with built forms—transforming raw spatial volumes into highly usable areas.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded border border-white/5">
              <span className="text-[10px] text-[#C5A059] tracking-widest uppercase font-bold block mb-1">THE COMBINED MISSION</span>
              <h3 className="font-serif text-xl text-white mb-2">SIRA SPACE</h3>
              <p className="text-xs text-[#CBCBCB]/80 leading-relaxed">
                Transforming raw environments into customized, highly engineered spaces that visually reflect the client's unique identity, history, and daily lifestyle.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
