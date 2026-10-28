import React, { useState } from 'react';
import { MapPin, Phone, Mail, Instagram, CheckCircle2, ArrowRight, Globe } from 'lucide-react';

export default function Inquire() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    bhk: '3 BHK',
    city: 'Bengaluru',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#1C1A17] text-white pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* PAGE HEADER */}
        <div className="mb-16">
          <span className="text-xs tracking-[0.3em] text-[#C5A059] uppercase font-bold">
            04 // INQUIRE & CONSULTATION
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl mt-2 font-medium">
            Book a Design Consultation
          </h1>
          <p className="text-sm text-[#CBCBCB]/80 max-w-2xl mt-4 font-light leading-relaxed">
            Schedule a site walkthrough or project consultation with Founder <strong>Sindhu Jain M S</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* OFFICIAL STUDIO DETAILS */}
          <div className="space-y-8 bg-[#121212] p-8 md:p-10 rounded border border-white/10">
            <h2 className="font-serif text-3xl text-[#C5A059]">Official Studio Contact</h2>

            <div className="space-y-6 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#C5A059] shrink-0 mt-1" />
                <div>
                  <span className="text-[10px] tracking-[0.2em] text-[#CBCBCB] uppercase block font-bold">STUDIO ADDRESS</span>
                  <p className="text-white font-medium mt-1">344, 1st Cross Rd, Talacauvery Layout, Amrutahalli, Byatarayanapura, Bengaluru, Karnataka 560092</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[#C5A059] shrink-0 mt-1" />
                <div>
                  <span className="text-[10px] tracking-[0.2em] text-[#CBCBCB] uppercase block font-bold">PHONE / WHATSAPP</span>
                  <p className="text-white font-medium mt-1">+91 86188 70672 / +91 73538 23487</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-[#C5A059] shrink-0 mt-1" />
                <div>
                  <span className="text-[10px] tracking-[0.2em] text-[#CBCBCB] uppercase block font-bold">EMAIL ADDRESS</span>
                  <a href="mailto:siraspaceinteriors@gmail.com" className="text-white font-medium mt-1 hover:text-[#C5A059] block">
                    siraspaceinteriors@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Globe className="w-5 h-5 text-[#C5A059] shrink-0 mt-1" />
                <div>
                  <span className="text-[10px] tracking-[0.2em] text-[#CBCBCB] uppercase block font-bold">OFFICIAL WEBSITE</span>
                  <a href="http://www.siraspaceinteriors.com" target="_blank" rel="noreferrer" className="text-white font-medium mt-1 hover:text-[#C5A059] block">
                    www.siraspaceinteriors.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Instagram className="w-5 h-5 text-[#C5A059] shrink-0 mt-1" />
                <div>
                  <span className="text-[10px] tracking-[0.2em] text-[#CBCBCB] uppercase block font-bold">INSTAGRAM PORTFOLIO</span>
                  <a href="https://www.instagram.com/sira_space/" target="_blank" rel="noreferrer" className="text-white font-medium mt-1 hover:text-[#C5A059] block">
                    @sira_space
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <span className="text-[10px] tracking-[0.2em] text-[#C5A059] uppercase block font-bold mb-1">CITIES SERVED IN KARNATAKA</span>
              <p className="text-xs text-[#CBCBCB]">Bengaluru, Mysuru, Hassan, Tumkur, Davangere, and surrounding regions.</p>
            </div>
          </div>

          {/* INQUIRY FORM */}
          <div className="bg-white/5 p-8 md:p-10 rounded border border-white/10 shadow-2xl">
            <h2 className="font-serif text-3xl mb-2 text-white">Request a Consultation</h2>
            <p className="text-xs text-[#CBCBCB]/80 mb-6">Fill in your project details below to schedule a one-on-one session with Sindhu Jain M S.</p>

            {submitted ? (
              <div className="bg-white/10 border border-[#C5A059]/40 p-6 rounded text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#C5A059] mx-auto" />
                <h3 className="font-serif text-2xl text-white">Consultation Requested</h3>
                <p className="text-xs text-[#CBCBCB] font-light">
                  Thank you, <strong>{formData.name}</strong>. Founder Sindhu Jain M S will review your requirements and get back to you via phone or email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] tracking-[0.15em] text-[#CBCBCB] uppercase font-bold block mb-1">YOUR FULL NAME</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#121212] border border-white/10 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] tracking-[0.15em] text-[#CBCBCB] uppercase font-bold block mb-1">PHONE NUMBER</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#121212] border border-white/10 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                      placeholder="+91 Mobile number"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-[0.15em] text-[#CBCBCB] uppercase font-bold block mb-1">PROJECT TYPE</label>
                    <select
                      value={formData.bhk}
                      onChange={e => setFormData({ ...formData, bhk: e.target.value })}
                      className="w-full bg-[#121212] border border-white/10 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    >
                      <option value="2 BHK">2 BHK Apartment</option>
                      <option value="3 BHK">3 BHK Apartment / Duplex</option>
                      <option value="Villa">Independent Villa</option>
                      <option value="Commercial">Commercial / Corporate Office</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] tracking-[0.15em] text-[#CBCBCB] uppercase font-bold block mb-1">LOCATION / CITY</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#121212] border border-white/10 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    placeholder="e.g. Bengaluru, Mysuru, Hassan, Tumkur, Davangere"
                  />
                </div>

                <div>
                  <label className="text-[10px] tracking-[0.15em] text-[#CBCBCB] uppercase font-bold block mb-1">PROJECT REQUIREMENTS</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#121212] border border-white/10 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    placeholder="Describe your space layout, floor plan dimensions, or specific design ideas..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C5A059] hover:bg-[#C5A059]/90 text-[#121212] font-bold text-xs py-3.5 rounded uppercase tracking-[0.2em] transition-all"
                >
                  BOOK CONSULTATION SESSION
                </button>
              </form>
            )}

          </div>

        </div>

        {/* GOOGLE MAP & REVIEWS EMBED SECTION */}
        <div className="mt-16 bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-4">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-[#C5A059] uppercase font-bold block mb-1">
                GOOGLE BUSINESS LOCATION
              </span>
              <h3 className="font-serif text-2xl text-white">Find Us on Google Maps</h3>
              <p className="text-xs text-[#CBCBCB]/70 mt-1">344, 1st Cross Rd, Talacauvery Layout, Amrutahalli, Bengaluru, Karnataka 560092</p>
            </div>
            <a
              href="https://www.google.com/search?q=sira+space+interior+designers"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-[#C5A059]/40 text-[#C5A059] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>4.9★ Google Business Reviews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="aspect-[16/9] md:aspect-[21/9] w-full rounded-xl overflow-hidden border border-white/10 relative">
            <iframe
              title="SIRA SPACE Studio Location Google Maps"
              src="https://maps.google.com/maps?q=344+1st+Cross+Rd+Talacauvery+Layout+Amrutahalli+Byatarayanapura+Bengaluru+Karnataka+560092&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter invert-[0.9] hue-rotate-180 contrast-125"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
