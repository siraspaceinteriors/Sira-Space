import React, { useState } from 'react';
import { 
  Calculator as CalcIcon, 
  Check, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Send, 
  PhoneCall, 
  CheckCircle2, 
  Building,
  Home as HomeIcon,
  Layers,
  Zap,
  Printer,
  Download,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Calculator() {
  const [projectType, setProjectType] = useState('residential'); // 'residential' | 'commercial'
  const [bhk, setBhk] = useState('3bhk');
  const [sqFt, setSqFt] = useState(1500);
  const [city, setCity] = useState('Bengaluru');
  const [selectedTier, setSelectedTier] = useState('standard'); // 'essential' | 'standard' | 'premium'

  // Room selections
  const [rooms, setRooms] = useState({
    kitchen: true,
    masterBedroom: true,
    secondBedroom: true,
    livingTvUnit: true,
    falseCeiling: true,
    civilPainting: true,
    poojaFoyer: true,
  });

  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleRoom = (roomKey) => {
    setRooms(prev => ({ ...prev, [roomKey]: !prev[roomKey] }));
  };

  // Base pricing rate multipliers per sq ft
  const tierRates = {
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

  // Room scope factor calculation
  const roomWeights = {
    kitchen: 0.22,
    masterBedroom: 0.20,
    secondBedroom: 0.16,
    livingTvUnit: 0.18,
    falseCeiling: 0.10,
    civilPainting: 0.08,
    poojaFoyer: 0.06
  };

  let scopeMultiplier = 0;
  Object.keys(rooms).forEach(k => {
    if (rooms[k]) {
      scopeMultiplier += roomWeights[k] || 0.1;
    }
  });
  if (scopeMultiplier === 0) scopeMultiplier = 0.2;

  // Calculate pricing estimates in INR Lakhs
  const calculateEstimate = (tier) => {
    const rate = tierRates[projectType][tier];
    const rawCost = sqFt * rate * scopeMultiplier;
    const inLakhs = rawCost / 100000;
    return {
      min: (inLakhs * 0.95).toFixed(1),
      max: (inLakhs * 1.08).toFixed(1),
      exact: inLakhs.toFixed(1),
      totalValue: rawCost
    };
  };

  const essentialEstimate = calculateEstimate('essential');
  const standardEstimate = calculateEstimate('standard');
  const premiumEstimate = calculateEstimate('premium');

  const currentTierEstimate = 
    selectedTier === 'essential' ? essentialEstimate :
    selectedTier === 'standard' ? standardEstimate : premiumEstimate;

  const totalRaw = currentTierEstimate.totalValue;
  const breakdown = {
    modularWoodwork: (totalRaw * 0.58 / 100000).toFixed(1),
    falseCeilingLighting: (totalRaw * 0.16 / 100000).toFixed(1),
    countertopsSurfaces: (totalRaw * 0.14 / 100000).toFixed(1),
    civilPainting: (totalRaw * 0.12 / 100000).toFixed(1),
  };

  const getBhkLabel = () => {
    if (projectType === 'commercial') {
      if (bhk === 'office') return 'Corporate Office';
      if (bhk === 'clinic') return 'Healthcare / Clinic';
      if (bhk === 'restaurant') return 'Restaurant / Cafe';
      return 'Retail Showroom';
    }
    if (bhk === '1bhk') return '1 BHK Apartment';
    if (bhk === '2bhk') return '2 BHK Apartment';
    if (bhk === '3bhk') return '3 BHK Apartment / Duplex';
    return '4 BHK / Luxury Villa';
  };

  const handleWhatsAppQuote = () => {
    const tierName = selectedTier.toUpperCase();
    const roomsList = Object.keys(rooms)
      .filter(k => rooms[k])
      .map(k => k.replace(/([A-Z])/g, ' $1').toLowerCase())
      .join(', ');

    const text = encodeURIComponent(
      `Hello SIRA SPACE Team!\n\n` +
      `I calculated an estimate on your website Budget Calculator.\n\n` +
      `📋 *Project Specifications:*\n` +
      `• Sector: ${projectType.toUpperCase()} (${getBhkLabel()})\n` +
      `• Carpet Area: ${sqFt} Sq. Ft\n` +
      `• City: ${city}\n` +
      `• Chosen Tier: ${tierName} PACKAGE\n` +
      `• Investment Estimate: ₹ ${currentTierEstimate.min} - ₹ ${currentTierEstimate.max} Lakhs\n` +
      `• Selected Scope: ${roomsList}\n\n` +
      `Please schedule an architectural floor plan review with Founder Sindhu Jain M S.`
    );
    window.open(`https://wa.me/918618870672?text=${text}`, '_blank');
  };

  const handleSubmitLead = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <div className="bg-[#1C1A17] text-white pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="text-xs tracking-[0.3em] text-[#C5A059] uppercase font-bold block mb-2">
            ACTIVE REAL-TIME COST ESTIMATOR
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium text-white">
            Interior Budget Calculator
          </h1>
          <p className="text-sm text-[#CBCBCB]/80 mt-4 font-light leading-relaxed">
            Get an instant, itemized investment forecast for your home or commercial space based on your exact square footage, floor plan requirements, and factory-engineered material tiers.
          </p>
        </div>

        {/* CALCULATOR MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: CONTROLS (7 COLS) */}
          <div className="lg:col-span-7 bg-[#121212] border border-white/10 rounded-xl p-6 sm:p-8 space-y-8 shadow-2xl">
            
            {/* 1. SECTOR TOGGLE */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold tracking-wider text-[#C5A059] uppercase">
                  1. Select Property Sector
                </label>
                <span className="text-[11px] text-[#CBCBCB]/60 font-light">Residential or Commercial</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setProjectType('residential');
                    setBhk('3bhk');
                  }}
                  className={`py-3.5 px-4 rounded border flex items-center justify-center space-x-2 text-xs font-bold transition-all ${
                    projectType === 'residential'
                      ? 'bg-[#C5A059] text-[#121212] border-[#C5A059]'
                      : 'bg-white/5 text-[#CBCBCB] border-white/10 hover:border-white/30'
                  }`}
                >
                  <HomeIcon className="w-4 h-4" />
                  <span>RESIDENTIAL HOME</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProjectType('commercial');
                    setBhk('office');
                  }}
                  className={`py-3.5 px-4 rounded border flex items-center justify-center space-x-2 text-xs font-bold transition-all ${
                    projectType === 'commercial'
                      ? 'bg-[#C5A059] text-[#121212] border-[#C5A059]'
                      : 'bg-white/5 text-[#CBCBCB] border-white/10 hover:border-white/30'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>COMMERCIAL WORKSPACE</span>
                </button>
              </div>
            </div>

            {/* 2. CONFIGURATION */}
            <div>
              <label className="text-xs font-bold tracking-wider text-[#C5A059] uppercase block mb-3">
                2. Configuration & Space Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {projectType === 'residential' ? (
                  [
                    { id: '1bhk', label: '1 BHK' },
                    { id: '2bhk', label: '2 BHK' },
                    { id: '3bhk', label: '3 BHK' },
                    { id: 'villa', label: '4 BHK / Villa' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setBhk(item.id)}
                      className={`py-3 px-3 rounded text-xs font-semibold border transition-all ${
                        bhk === item.id
                          ? 'bg-white text-[#121212] border-white font-bold shadow'
                          : 'bg-white/5 text-[#CBCBCB] border-white/10 hover:border-white/30'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))
                ) : (
                  [
                    { id: 'office', label: 'Office Space' },
                    { id: 'clinic', label: 'Healthcare/Clinic' },
                    { id: 'restaurant', label: 'Restaurant/Cafe' },
                    { id: 'retail', label: 'Retail Store' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setBhk(item.id)}
                      className={`py-3 px-2 rounded text-[11px] font-semibold border transition-all ${
                        bhk === item.id
                          ? 'bg-white text-[#121212] border-white font-bold shadow'
                          : 'bg-white/5 text-[#CBCBCB] border-white/10 hover:border-white/30'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* 3. AREA SLIDER */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold tracking-wider text-[#C5A059] uppercase">
                  3. Carpet Area (Square Feet)
                </label>
                <span className="font-serif text-lg font-bold text-white bg-white/5 border border-white/10 px-3 py-1 rounded">
                  {sqFt.toLocaleString()} Sq. Ft
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="4500"
                step="50"
                value={sqFt}
                onChange={(e) => setSqFt(Number(e.target.value))}
                className="w-full accent-[#C5A059] cursor-pointer h-2 bg-white/10 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] text-[#CBCBCB]/60 mt-1">
                <span>500 Sq Ft</span>
                <span>1,500 Sq Ft</span>
                <span>3,000 Sq Ft</span>
                <span>4,500+ Sq Ft</span>
              </div>
            </div>

            {/* 4. CITY SELECTOR */}
            <div>
              <label className="text-xs font-bold tracking-wider text-[#C5A059] uppercase block mb-3">
                4. Project City (Karnataka)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {['Bengaluru', 'Mysuru', 'Tumkur', 'Hassan', 'Davangere', 'Other'].map((cityName) => (
                  <button
                    key={cityName}
                    type="button"
                    onClick={() => setCity(cityName)}
                    className={`py-2 px-2 rounded text-xs transition-all border ${
                      city === cityName
                        ? 'bg-[#C5A059] text-[#121212] font-bold border-[#C5A059]'
                        : 'bg-white/5 text-[#CBCBCB] border-white/10 hover:border-white/30'
                    }`}
                  >
                    {cityName}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. SCOPE / ROOM CHECKBOXES */}
            <div>
              <label className="text-xs font-bold tracking-wider text-[#C5A059] uppercase block mb-3">
                5. Scope of Work / Space Requirements
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { key: 'kitchen', label: 'Modular Kitchen (Tandem Drawers & Lofts)' },
                  { key: 'masterBedroom', label: 'Master Bedroom (Wardrobes & Bed Unit)' },
                  { key: 'secondBedroom', label: 'Secondary / Kids Bedroom Storage' },
                  { key: 'livingTvUnit', label: 'Living Room TV Console & Partition' },
                  { key: 'falseCeiling', label: 'Designer False Ceiling & Ambient LED' },
                  { key: 'civilPainting', label: 'Civil Works, Royale Painting & Electrical' },
                  { key: 'poojaFoyer', label: 'Foyer Shoe Cabinet & Custom Pooja Mandir' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => toggleRoom(item.key)}
                    className={`flex items-center space-x-3 p-3 rounded text-left border text-xs transition-all ${
                      rooms[item.key]
                        ? 'bg-white/10 border-[#C5A059] text-white'
                        : 'bg-white/5 border-white/5 text-[#CBCBCB]/60 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                      rooms[item.key] ? 'bg-[#C5A059] border-[#C5A059] text-[#121212]' : 'border-white/20'
                    }`}>
                      {rooms[item.key] && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: RECOMMENDED PLANS BREAKDOWN (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 3-TIER COMPARISON TABS */}
            <div className="bg-[#121212] border border-white/10 rounded-xl p-6 sm:p-8 shadow-2xl">
              <span className="text-[10px] tracking-[0.25em] text-[#C5A059] uppercase font-bold block mb-1">
                RECOMMENDED SIRA PLANS
              </span>
              <h2 className="font-serif text-2xl text-white mb-4">
                Compare Package Estimates
              </h2>

              {/* TABS */}
              <div className="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-md mb-6 border border-white/10">
                {[
                  { id: 'essential', label: 'Essential' },
                  { id: 'standard', label: 'Standard ★' },
                  { id: 'premium', label: 'Premium' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedTier(tier.id)}
                    className={`py-2 text-xs font-bold rounded transition-all ${
                      selectedTier === tier.id
                        ? 'bg-[#C5A059] text-[#121212] shadow'
                        : 'text-[#CBCBCB] hover:text-white'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>

              {/* CURRENT SELECTED PLAN CARD */}
              <div className="border border-[#C5A059]/40 bg-gradient-to-b from-[#C5A059]/10 to-transparent p-5 rounded-lg mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] tracking-widest text-[#C5A059] uppercase font-bold">
                      {selectedTier.toUpperCase()} PACKAGE
                    </span>
                    <h3 className="font-serif text-xl text-white mt-0.5">
                      {selectedTier === 'essential' && 'High-Durability Modular Basics'}
                      {selectedTier === 'standard' && 'Modern Luxury & Ambient Lighting'}
                      {selectedTier === 'premium' && 'Turnkey Bespoke Architectural'}
                    </h3>
                  </div>
                  {selectedTier === 'standard' && (
                    <span className="bg-[#C5A059] text-[#121212] text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                      Most Popular
                    </span>
                  )}
                </div>

                {/* PRICE NUMBER */}
                <div className="my-4 pt-3 border-t border-white/10">
                  <div className="text-[11px] text-[#CBCBCB] uppercase tracking-wider">
                    ESTIMATED INVESTMENT RANGE
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl text-white font-bold my-1 flex items-baseline gap-2">
                    <span>₹ {currentTierEstimate.min} – {currentTierEstimate.max}</span>
                    <span className="text-sm font-sans font-normal text-[#C5A059]">Lakhs*</span>
                  </div>
                  <span className="text-[10px] text-[#CBCBCB]/70 block font-light">
                    *Approx ₹{Math.round((tierRates[projectType][selectedTier] * scopeMultiplier))} / sq.ft based on {sqFt} sq.ft & selected scope.
                  </span>
                </div>

                {/* ITEMIZED BREAKDOWN */}
                <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-bold block mb-1">
                    ITEMIZED COST ESTIMATION:
                  </span>
                  <div className="flex justify-between text-[#CBCBCB]">
                    <span>• Modular Cabinetry & Wardrobes (58%)</span>
                    <span className="font-bold text-white">₹ {breakdown.modularWoodwork} L</span>
                  </div>
                  <div className="flex justify-between text-[#CBCBCB]">
                    <span>• False Ceiling & Ambient Cove (16%)</span>
                    <span className="font-bold text-white">₹ {breakdown.falseCeilingLighting} L</span>
                  </div>
                  <div className="flex justify-between text-[#CBCBCB]">
                    <span>• Countertops, Sinks & Surfaces (14%)</span>
                    <span className="font-bold text-white">₹ {breakdown.countertopsSurfaces} L</span>
                  </div>
                  <div className="flex justify-between text-[#CBCBCB]">
                    <span>• Painting, Civil & Electrical (12%)</span>
                    <span className="font-bold text-white">₹ {breakdown.civilPainting} L</span>
                  </div>
                  <div className="flex justify-between text-[#C5A059] pt-1 border-t border-white/10 font-bold">
                    <span>• Turnkey PM & 3D Walkthrough Fee</span>
                    <span>100% INCLUDED (FREE)</span>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleWhatsAppQuote}
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-4 rounded font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>RECEIVE DETAILED QUOTE ON WHATSAPP</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrintSummary}
                  className="w-full border border-white/20 hover:border-white text-white py-2.5 px-4 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
                >
                  <Printer className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>PRINT / SAVE SUMMARY SHEET</span>
                </button>

                <p className="text-[11px] text-[#CBCBCB]/60 text-center font-light">
                  Pre-fills your exact {sqFt} sq.ft {getBhkLabel()} configuration and connects directly to Founder Sindhu Jain.
                </p>
              </div>

            </div>

            {/* INSTANT BOOKING MINI FORM */}
            <div className="bg-[#121212] border border-white/10 rounded-xl p-6 shadow-2xl">
              <h3 className="font-serif text-lg text-white mb-1">Prefer an Email / Site Visit?</h3>
              <p className="text-xs text-[#CBCBCB]/70 mb-4 font-light">
                Submit your contact details and our design studio will share a customized 3D floor plan proposal.
              </p>

              {submitted ? (
                <div className="bg-white/5 border border-[#C5A059]/40 p-4 rounded text-center space-y-2">
                  <CheckCircle2 className="w-6 h-6 text-[#C5A059] mx-auto" />
                  <div className="text-xs font-bold text-white">Details Received!</div>
                  <p className="text-[11px] text-[#CBCBCB]">
                    Our team will contact you at <strong>{contactData.phone}</strong> shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitLead} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp / Mobile Number"
                    value={contactData.phone}
                    onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#C5A059] hover:bg-[#C5A059]/90 text-[#121212] py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    REQUEST CALL BACK
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
