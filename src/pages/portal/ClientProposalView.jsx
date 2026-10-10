import React, { useState } from 'react';
import { usePortal } from './PortalContext';
import { 
  CheckCircle2, 
  Printer, 
  Share2, 
  Download, 
  Sparkles, 
  Building, 
  ShieldCheck, 
  FileCheck, 
  Calendar, 
  MapPin, 
  User, 
  Mail, 
  Phone,
  ArrowLeft,
  Check,
  Eye
} from 'lucide-react';

export default function ClientProposalView() {
  const { activeProject, updateStatus, setActiveTab } = usePortal();
  const [clientSignName, setClientSignName] = useState('');
  const [showSignModal, setShowSignModal] = useState(false);
  const [approvedRooms, setApprovedRooms] = useState({});
  const [lightboxImg, setLightboxImg] = useState(null);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  const handleApproveProject = (e) => {
    e.preventDefault();
    if (!clientSignName) return;
    updateStatus(activeProject.id, 'Approved');
    setShowSignModal(false);
  };

  const toggleRoomApproval = (roomKey) => {
    setApprovedRooms(prev => ({
      ...prev,
      [roomKey]: !prev[roomKey]
    }));
  };

  if (!activeProject) {
    return (
      <div className="p-12 text-center text-gray-400 space-y-4">
        <p className="text-base font-serif text-white">No active project loaded.</p>
        <button
          onClick={() => setActiveTab('quotation')}
          className="px-5 py-2.5 bg-[#C5A059] text-[#121212] rounded-xl text-xs font-bold uppercase tracking-wider"
        >
          Return to BOQ Studio
        </button>
      </div>
    );
  }

  const isFullyApproved = activeProject?.status === 'Approved' || activeProject?.status === 'In Execution';

  return (
    <div className="space-y-8 animate-fadeIn pb-20 print:p-0 print:space-y-6">
      {/* ACTION BAR (Hidden when printing) */}
      <div className="print:hidden p-4 rounded-2xl bg-[#22201D] border border-white/5 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <button
          onClick={() => setActiveTab('quotation')}
          className="text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4 text-[#C5A059]" />
          <span>Back to BOQ Studio</span>
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => window.print()}
            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all"
          >
            <Printer className="w-4 h-4 text-[#C5A059]" />
            <span>Print / Save as PDF</span>
          </button>

          {!isFullyApproved ? (
            <button
              onClick={() => setShowSignModal(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-lg shadow-emerald-900/30"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Digital Client Approval</span>
            </button>
          ) : (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2">
              <Check className="w-4 h-4" />
              <span>Proposal Approved by Client</span>
            </div>
          )}
        </div>
      </div>

      {/* PROPOSAL DOCUMENT CONTAINER */}
      <div className="bg-[#FAF7F2] text-[#1C1A17] rounded-3xl p-8 lg:p-14 shadow-2xl border border-black/10 print:shadow-none print:border-none print:p-0">
        
        {/* DOCUMENT HEADER */}
        <div className="flex flex-col md:flex-row md:items-start justify-between border-b-2 border-[#1C1A17]/10 pb-10 gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-9 h-9 rounded bg-[#1C1A17] text-[#C5A059] font-serif font-bold text-lg flex items-center justify-center">
                S
              </div>
              <div>
                <span className="font-serif tracking-[0.25em] font-bold text-lg text-[#1C1A17] block leading-none">
                  SIRA SPACE
                </span>
                <span className="text-[9px] tracking-[0.25em] text-[#C5A059] uppercase font-bold block mt-1">
                  INTERIOR ARCHITECTURE & DESIGN STUDIO
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-600 max-w-sm mt-2">
              Bespoke residential & commercial interior architecture, turnkey manufacturing, and spatial craftsmanship.
            </p>
          </div>

          <div className="text-left md:text-right">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C5A059]/15 text-[#8c6c2e] border border-[#C5A059]/30 mb-2">
              Client Quotation & Specification
            </span>
            <div className="text-xs text-gray-500 space-y-1">
              <div><strong className="text-gray-800">Proposal ID:</strong> {activeProject.id.toUpperCase()}</div>
              <div><strong className="text-gray-800">Date:</strong> {activeProject.date}</div>
              <div><strong className="text-gray-800">Valid Until:</strong> 30 Days from issue</div>
            </div>
          </div>
        </div>

        {/* CLIENT & PROJECT PROFILE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8 border-b border-[#1C1A17]/10">
          <div className="p-5 rounded-2xl bg-[#F0EDE6] border border-black/5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] block mb-2">
              Client Details
            </span>
            <h3 className="text-lg font-serif font-bold text-[#1C1A17]">{activeProject.clientName}</h3>
            <div className="text-xs text-gray-600 mt-2 space-y-1">
              {activeProject.clientPhone && <div>Phone: {activeProject.clientPhone}</div>}
              {activeProject.clientEmail && <div>Email: {activeProject.clientEmail}</div>}
              <div>Site Location: {activeProject.location}</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#F0EDE6] border border-black/5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] block mb-2">
                Project Scope
              </span>
              <h3 className="text-lg font-serif font-bold text-[#1C1A17]">{activeProject.title}</h3>
              <p className="text-xs text-gray-600 mt-1">
                {(activeProject.floors || []).length} Floors • Turnkey Carpentry, False Ceiling, Modular Units & Polish
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-700">Total Project Value:</span>
              <span className="text-xl font-serif font-bold text-[#1C1A17]">
                {formatCurrency(activeProject.grandTotal || activeProject.subtotalAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* ROOM-BY-ROOM PRESENTATION CARDS */}
        <div className="py-8 space-y-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#1C1A17]">
                Room-by-Room Spatial Breakdown & Specifications
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Detailed scope, materials, dimensions, and investment per area.
              </p>
            </div>
            <span className="text-xs font-bold text-[#C5A059] uppercase tracking-wider">
              {(activeProject.floors || []).length} Floors
            </span>
          </div>

          {(activeProject.floors || []).map((floor, fIdx) => (
            <div key={fIdx} className="space-y-6">
              <div className="flex items-center justify-between border-b-2 border-[#1C1A17] pb-2">
                <h3 className="text-lg font-serif font-bold text-[#1C1A17] flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-[#1C1A17] text-[#C5A059] text-xs flex items-center justify-center font-sans">
                    {fIdx + 1}
                  </span>
                  <span>{floor.name}</span>
                </h3>
                <span className="text-sm font-serif font-bold text-[#1C1A17]">
                  Floor Subtotal: {formatCurrency(floor.floorTotal)}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {(floor.areas || []).map((area, aIdx) => {
                  const roomKey = `${fIdx}-${aIdx}`;
                  const isApproved = approvedRooms[roomKey] || isFullyApproved;
                  const areaSum = (area.items || []).reduce((sum, i) => sum + (i.total || 0), 0);

                  return (
                    <div 
                      key={aIdx} 
                      className="p-6 rounded-2xl bg-white border border-black/10 shadow-sm print:break-inside-avoid space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-base font-serif font-bold text-[#1C1A17]">{area.name}</h4>
                          <span className="text-xs text-gray-500">{(area.items || []).length} Custom Elements</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-base font-serif font-bold text-[#C5A059]">
                            {formatCurrency(areaSum)}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleRoomApproval(roomKey)}
                            className={`print:hidden px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                              isApproved 
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{isApproved ? 'Room Approved' : 'Approve Area'}</span>
                          </button>
                        </div>
                      </div>

                      {/* 3D Reference Render Visual Banner */}
                      {(area.coverImage || (area.items || []).find(i => i.referenceImage)?.referenceImage) && (
                        <div className="flex items-center space-x-4 p-3 rounded-xl bg-[#FAF7F2] border border-black/5">
                          <div 
                            onClick={() => setLightboxImg(area.coverImage || (area.items || []).find(i => i.referenceImage)?.referenceImage)}
                            className="relative w-28 h-20 rounded-lg overflow-hidden border border-[#C5A059]/40 cursor-pointer shadow-sm shrink-0 bg-black/10 group/img"
                            title="Click to view 3D reference visual"
                          >
                            <img 
                              src={area.coverImage || (area.items || []).find(i => i.referenceImage)?.referenceImage} 
                              alt={area.name} 
                              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform" 
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                              <Eye className="w-4 h-4 text-white" />
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] block">
                              Image (Only for reference)
                            </span>
                            <h5 className="text-xs font-serif font-bold text-gray-900">{area.name} 3D Architectural Render</h5>
                            <p className="text-[11px] text-gray-500 mt-0.5">Approved aesthetic reference for carcass, shutters, hardware & spatial finish.</p>
                          </div>
                        </div>
                      )}

                      {/* Items table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-[#FAF7F2] text-gray-600 uppercase tracking-wider font-semibold border-y border-black/5">
                            <tr>
                              <th className="py-2.5 px-3">Item</th>
                              <th className="py-2.5 px-3">Material Specification</th>
                              <th className="py-2.5 px-3 text-center min-w-[120px]">Image (Only for reference)</th>
                              <th className="py-2.5 px-3 text-center">Dimensions</th>
                              <th className="py-2.5 px-3 text-right">Sft</th>
                              <th className="py-2.5 px-3 text-right">Rate</th>
                              <th className="py-2.5 px-3 text-right">Total</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-black/5">
                            {(area.items || []).map((item, itemIdx) => (
                              <tr key={itemIdx} className="hover:bg-black/[0.01]">
                                <td className="py-3 px-3 font-semibold text-gray-900">
                                  {item.category}
                                  {item.description && item.description !== item.category && (
                                    <span className="block text-[11px] font-normal text-gray-500">{item.description}</span>
                                  )}
                                </td>
                                <td className="py-3 px-3 text-gray-600 text-[11px] whitespace-pre-line leading-relaxed max-w-xs">
                                  {item.material || 'Studio standard specification'}
                                </td>
                                <td className="py-3 px-3 text-center">
                                  {item.referenceImage ? (
                                    <div 
                                      onClick={() => setLightboxImg(item.referenceImage)}
                                      className="relative w-14 h-11 mx-auto rounded-lg overflow-hidden border border-black/10 cursor-pointer shadow-sm group/thumb bg-gray-100"
                                      title="Click to view reference image"
                                    >
                                      <img 
                                        src={item.referenceImage} 
                                        alt={item.category} 
                                        className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-200" 
                                      />
                                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity">
                                        <Eye className="w-3.5 h-3.5 text-white" />
                                      </div>
                                    </div>
                                  ) : (
                                    <span className="text-gray-400 text-[10px] italic">As per design</span>
                                  )}
                                </td>
                                <td className="py-3 px-3 text-center text-gray-600 font-mono">
                                  {item.width ? `${item.width}" × ${item.height}"` : '-'}
                                </td>
                                <td className="py-3 px-3 text-right text-gray-600 font-mono">
                                  {item.sft ? `${item.sft} sft` : '-'}
                                </td>
                                <td className="py-3 px-3 text-right text-gray-600 font-mono">
                                  {item.rate ? formatCurrency(item.rate) : '-'}
                                </td>
                                <td className="py-3 px-3 text-right font-serif font-bold text-gray-900">
                                  {formatCurrency(item.total)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* PAYMENT TERMS & SIGNATURE SECTION */}
        <div className="pt-8 border-t-2 border-[#1C1A17]/10 space-y-8 print:break-inside-avoid">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#1C1A17] flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>Payment Schedule & Milestones</span>
              </h4>
              <div className="space-y-2 text-xs text-gray-700">
                {(activeProject.terms || []).map((term, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <span className="font-bold text-[#C5A059] shrink-0">Stage 0{idx + 1}:</span>
                    <span>{term}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#F0EDE6] border border-black/5 space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#1C1A17]">Financial Summary</h4>
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Gross Estimate:</span>
                  <span className="font-mono">{formatCurrency(activeProject.subtotalAmount || activeProject.grandTotal)}</span>
                </div>
                {activeProject.discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({activeProject.discountPercent}%):</span>
                    <span>- {formatCurrency(activeProject.discountAmount)}</span>
                  </div>
                )}
                {activeProject.gstAmount > 0 && (
                  <div className="flex justify-between">
                    <span>GST (18%):</span>
                    <span className="font-mono">{formatCurrency(activeProject.gstAmount)}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-black/10 flex justify-between text-base font-serif font-bold text-[#1C1A17]">
                  <span>Total Investment:</span>
                  <span className="text-[#8c6c2e]">{formatCurrency(activeProject.grandTotal || activeProject.subtotalAmount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SIGNATURE / APPROVAL STAMP */}
          <div className="grid grid-cols-2 gap-12 pt-10 border-t border-black/10">
            <div>
              <div className="border-b border-black/30 pb-8 text-center">
                <span className="font-serif italic text-base text-[#C5A059]">Sira Space Studio</span>
              </div>
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mt-2 text-center">
                Authorized Studio Architect
              </span>
            </div>

            <div>
              <div className="border-b border-black/30 pb-8 text-center">
                {isFullyApproved ? (
                  <div className="flex items-center justify-center space-x-1.5 text-emerald-700 font-bold text-xs uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Digitally Signed & Confirmed</span>
                  </div>
                ) : (
                  <span className="text-gray-400 text-xs italic">Awaiting Client Signature</span>
                )}
              </div>
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mt-2 text-center">
                Client Acceptance: {activeProject.clientName}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* DIGITAL APPROVAL MODAL */}
      {showSignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#22201D] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-xl font-serif font-bold text-white mb-2">Sign & Approve Proposal</h3>
            <p className="text-xs text-gray-400 mb-6">
              Confirming approval for <span className="text-white font-bold">{activeProject.title}</span> ({formatCurrency(activeProject.grandTotal || activeProject.subtotalAmount)}).
            </p>

            <form onSubmit={handleApproveProject} className="space-y-4">
              <div>
                <label className="text-xs text-gray-300 block mb-1">Type Your Full Name to Sign *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mr. Marula Siddappa"
                  value={clientSignName}
                  onChange={(e) => setClientSignName(e.target.value)}
                  className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#1C1A17] border border-white/5 text-[11px] text-gray-400 leading-relaxed">
                By clicking Confirm, you accept the itemized scope of work, material grades (BWP/MR Ply, HDHMR, Hettich hardware), and studio payment milestone stages.
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowSignModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-900/30"
                >
                  Confirm & Approve
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3D REFERENCE IMAGE LIGHTBOX MODAL */}
      {lightboxImg && (
        <div 
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6 cursor-pointer animate-fadeIn"
        >
          <div className="max-w-4xl max-h-[90vh] relative flex flex-col items-center">
            <img 
              src={lightboxImg} 
              alt="Design Reference" 
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl border border-white/20"
            />
            <p className="text-center text-xs text-gray-300 mt-3 bg-black/60 px-4 py-1.5 rounded-full border border-white/10">
              Image (Only for reference) • Click anywhere to close
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
