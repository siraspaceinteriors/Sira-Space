import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Check, Send, Sparkles, Building, Home as HomeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QuotationModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Sector & Config, 2: Area & City, 3: Recommended Plans, 4: Contact & Finish
  const [sector, setSector] = useState('residential');
  const [bhk, setBhk] = useState('3bhk');
  const [sqFt, setSqFt] = useState(1500);
  const [city, setCity] = useState('Bengaluru');
  const [selectedPlan, setSelectedPlan] = useState('standard'); // 'essential' | 'standard' | 'premium'
  const [clientInfo, setClientInfo] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const planRates = {
    residential: {
      essential: 1250,
      standard: 1750,
      premium: 2450
    },
    commercial: {
      essential: 1400,
      standard: 1950,
      premium: 2800
    }
  };

  const calculateEstimate = (planKey) => {
    const rate = planRates[sector][planKey];
    const total = (sqFt * rate) / 100000;
    return {
      min: (total * 0.95).toFixed(1),
      max: (total * 1.08).toFixed(1)
    };
  };

  const getBhkTitle = () => {
    if (sector === 'commercial') {
      if (bhk === 'office') return 'Corporate Office';
      if (bhk === 'clinic') return 'Healthcare / Clinic';
      return 'Retail / Hospitality';
    }
    if (bhk === '2bhk') return '2 BHK Apartment';
    if (bhk === '3bhk') return '3 BHK Duplex/Apt';
    return '4 BHK / Luxury Villa';
  };

  const handleWhatsAppLead = () => {
    const est = calculateEstimate(selectedPlan);
    const text = encodeURIComponent(
      `Hello SIRA SPACE Team!\n\n` +
      `I requested a quote from your website.\n` +
      `• Project: ${sector.toUpperCase()} (${getBhkTitle()})\n` +
      `• Carpet Area: ${sqFt} Sq. Ft\n` +
      `• City: ${city}\n` +
      `• Chosen Plan: ${selectedPlan.toUpperCase()} PACKAGE\n` +
      `• Estimated Investment: ₹ ${est.min} - ₹ ${est.max} Lakhs\n\n` +
      `Please schedule a consultation with Ar. Sindhu Jain.`
    );
    window.open(`https://wa.me/918618870672?text=${text}`, '_blank');
    onClose();
  };

  const handleFinish = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="bg-[#121212] border border-white/10 text-white w-full max-w-xl rounded-xl p-6 sm:p-8 relative shadow-2xl overflow-hidden">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#CBCBCB] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HEADER & STEPS INDICATOR */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-[0.25em] text-[#C5A059] uppercase font-bold">
              STEP {step} OF 4 // INSTANT QUOTE ENGINE
            </span>
            <span className="text-xs text-[#CBCBCB]/60">Sira Space</span>
          </div>
          <h3 className="font-serif text-2xl text-white mt-1">
            {step === 1 && "Select Property Type"}
            {step === 2 && "Area & City Details"}
            {step === 3 && "Recommended SIRA Plans"}
            {step === 4 && "Receive Your Detailed BOQ"}
          </h3>
        </div>

        {/* STEP 1: SECTOR & CONFIG */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="text-xs uppercase tracking-wider text-[#CBCBCB] font-semibold block mb-2">
                1. Residential or Commercial
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => { setSector('residential'); setBhk('3bhk'); }}
                  className={`py-3 px-4 rounded border text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                    sector === 'residential' ? 'bg-[#C5A059] text-[#121212] border-[#C5A059]' : 'bg-white/5 border-white/10 text-[#CBCBCB]'
                  }`}
                >
                  <HomeIcon className="w-4 h-4" />
                  <span>RESIDENTIAL HOME</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setSector('commercial'); setBhk('office'); }}
                  className={`py-3 px-4 rounded border text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                    sector === 'commercial' ? 'bg-[#C5A059] text-[#121212] border-[#C5A059]' : 'bg-white/5 border-white/10 text-[#CBCBCB]'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>COMMERCIAL WORKSPACE</span>
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-[#CBCBCB] font-semibold block mb-2">
                2. Configuration
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {sector === 'residential' ? (
                  [
                    { id: '2bhk', label: '2 BHK' },
                    { id: '3bhk', label: '3 BHK' },
                    { id: 'villa', label: 'Villa' },
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setBhk(item.id)}
                      className={`py-3 rounded border text-xs font-bold transition-all ${
                        bhk === item.id ? 'bg-white text-[#121212] border-white' : 'bg-white/5 border-white/10 text-[#CBCBCB]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))
                ) : (
                  [
                    { id: 'office', label: 'Office' },
                    { id: 'clinic', label: 'Clinic/Hospital' },
                    { id: 'retail', label: 'Retail/Cafe' },
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setBhk(item.id)}
                      className={`py-3 rounded border text-xs font-bold transition-all ${
                        bhk === item.id ? 'bg-white text-[#121212] border-white' : 'bg-white/5 border-white/10 text-[#CBCBCB]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))
                )}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-[#C5A059] hover:bg-[#C5A059]/90 text-[#121212] py-3.5 rounded text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center space-x-2 mt-4"
            >
              <span>NEXT: AREA & LOCATION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: AREA & CITY */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-wider text-[#CBCBCB] font-semibold">
                  Carpet Area (Sq. Ft)
                </label>
                <span className="text-sm font-bold text-[#C5A059] bg-white/5 px-3 py-1 rounded border border-white/10">
                  {sqFt} Sq. Ft
                </span>
              </div>
              <input
                type="range"
                min="600"
                max="4000"
                step="50"
                value={sqFt}
                onChange={(e) => setSqFt(Number(e.target.value))}
                className="w-full accent-[#C5A059] cursor-pointer h-2 bg-white/10 rounded-lg"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-[#CBCBCB] font-semibold block mb-2">
                City in Karnataka
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Bengaluru', 'Mysuru', 'Tumkur', 'Davangere', 'Hassan', 'Other'].map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCity(c)}
                    className={`py-2 px-2 rounded border text-xs transition-all ${
                      city === c ? 'bg-[#C5A059] text-[#121212] font-bold border-[#C5A059]' : 'bg-white/5 border-white/10 text-[#CBCBCB]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 border border-white/10 hover:border-white text-white py-3.5 rounded text-xs font-bold tracking-wider uppercase transition-all"
              >
                BACK
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 bg-[#C5A059] hover:bg-[#C5A059]/90 text-[#121212] py-3.5 rounded text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center space-x-2"
              >
                <span>COMPARE PLANS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: RECOMMENDED PLANS */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2.5">
              {[
                { 
                  id: 'essential', 
                  name: 'Essential Plan', 
                  desc: 'IS 303 BWR Hardwood Ply, 0.8mm Laminates, Standard Soft-Close', 
                  est: calculateEstimate('essential') 
                },
                { 
                  id: 'standard', 
                  name: 'Standard Plan (Recommended ★)', 
                  desc: 'IS 710 BWP Marine Ply, 1mm Anti-Fingerprint Acrylic, Full False Ceiling & Profile LED', 
                  est: calculateEstimate('standard') 
                },
                { 
                  id: 'premium', 
                  name: 'Premium Bespoke Plan', 
                  desc: 'CenturyPly Club Prime, Natural Veneers & PU, Blum Aventos, Quartz Monoliths', 
                  est: calculateEstimate('premium') 
                },
              ].map(plan => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? 'bg-gradient-to-r from-[#C5A059]/15 to-white/5 border-[#C5A059]'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-bold text-white flex items-center">
                        <span className={`w-3.5 h-3.5 rounded-full mr-2 border flex items-center justify-center ${
                          selectedPlan === plan.id ? 'bg-[#C5A059] border-[#C5A059]' : 'border-white/30'
                        }`}>
                          {selectedPlan === plan.id && <Check className="w-2.5 h-2.5 text-[#121212] stroke-[3]" />}
                        </span>
                        {plan.name}
                      </div>
                      <p className="text-[10px] text-[#CBCBCB]/70 mt-1 ml-5 font-light">{plan.desc}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-serif text-lg font-bold text-[#C5A059]">
                        ₹ {plan.est.min} – {plan.est.max} L
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-3 pt-3">
              <button
                onClick={() => setStep(2)}
                className="w-1/3 border border-white/10 hover:border-white text-white py-3.5 rounded text-xs font-bold tracking-wider uppercase transition-all"
              >
                BACK
              </button>
              <button
                onClick={() => setStep(4)}
                className="w-2/3 bg-[#C5A059] hover:bg-[#C5A059]/90 text-[#121212] py-3.5 rounded text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center space-x-2"
              >
                <span>PROCEED TO FINALIZE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CONTACT & DISPATCH */}
        {step === 4 && (
          <div className="space-y-4">
            {submitted ? (
              <div className="bg-white/5 border border-[#C5A059]/40 p-6 rounded-lg text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#C5A059] mx-auto" />
                <h4 className="font-serif text-2xl text-white">Quotation Dispatched!</h4>
                <p className="text-xs text-[#CBCBCB] font-light">
                  Thank you <strong>{clientInfo.name}</strong>. Founder Sindhu Jain M S will review your {sqFt} sq ft requirements and connect with you shortly.
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#C5A059] text-[#121212] px-6 py-2.5 rounded font-bold text-xs uppercase tracking-wider mt-2"
                >
                  DONE
                </button>
              </div>
            ) : (
              <form onSubmit={handleFinish} className="space-y-3">
                <div className="bg-white/5 p-3 rounded border border-white/10 flex justify-between items-center text-xs">
                  <span className="text-[#CBCBCB]">{getBhkTitle()} ({sqFt} sq ft) • {city}</span>
                  <span className="text-[#C5A059] font-bold uppercase">{selectedPlan} Plan</span>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#CBCBCB] block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#CBCBCB] block mb-1">WhatsApp / Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 Mobile number"
                    value={clientInfo.phone}
                    onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="button"
                    onClick={handleWhatsAppLead}
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3 rounded text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    <span>GET INSTANT QUOTE ON WHATSAPP</span>
                  </button>

                  <button
                    type="submit"
                    className="w-full border border-white/20 hover:border-white text-white py-2.5 rounded text-xs font-bold tracking-wider uppercase transition-all"
                  >
                    EMAIL ME DETAILED SPECIFICATIONS
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
