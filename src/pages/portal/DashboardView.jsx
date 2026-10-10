import React, { useState } from 'react';
import { usePortal } from './PortalContext';
import { 
  Building2, 
  FileText, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Layers, 
  FolderGit2, 
  Plus, 
  ArrowRight, 
  MapPin, 
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function DashboardView() {
  const { projects, setActiveProjectId, setActiveTab, createNewProject } = usePortal();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectForm, setNewProjectForm] = useState({
    title: '',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    location: '',
    projectType: 'Luxury Villa Interiors'
  });

  // Calculate metrics
  const safeProjects = Array.isArray(projects) ? projects : [];

  const getProjectTotal = (p) => {
    if (!p) return 0;
    if (p.grandTotal && p.grandTotal > 0) return p.grandTotal;
    if (p.subtotalAmount && p.subtotalAmount > 0) return p.subtotalAmount;
    return (p.floors || []).reduce((acc, f) => {
      if (f.floorTotal && f.floorTotal > 0) return acc + f.floorTotal;
      return acc + (f.areas || []).reduce((aAcc, a) => {
        return aAcc + (a.items || []).reduce((iAcc, i) => iAcc + (i.total || 0), 0);
      }, 0);
    }, 0);
  };

  const totalPipeline = safeProjects.reduce((acc, p) => acc + getProjectTotal(p), 0);
  const approvedTotal = safeProjects
    .filter(p => p?.status === 'Approved' || p?.status === 'In Execution')
    .reduce((acc, p) => acc + getProjectTotal(p), 0);
  
  const totalItemsCount = safeProjects.reduce((acc, p) => {
    return acc + (p?.floors || []).reduce((fAcc, f) => {
      return fAcc + (f?.areas || []).reduce((aAcc, a) => aAcc + (a?.items || []).length, 0);
    }, 0);
  }, 0);

  const totalDocsCount = safeProjects.reduce((acc, p) => acc + (p?.documents || []).length, 0);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newProjectForm.title || !newProjectForm.clientName) return;
    createNewProject(newProjectForm);
    setShowCreateModal(false);
    setActiveTab('quotation');
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* HEADER BANNER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#24211D] via-[#1C1A17] to-[#121212] p-8 border border-white/10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#C5A059] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Practice Operations</span>
            </div>
            <h1 className="text-3xl font-serif font-bold text-white tracking-wide">
              Interior Architecture & Quotations Hub
            </h1>
            <p className="text-sm text-gray-400 mt-1 max-w-2xl">
              Automate multi-floor interior estimates, synchronize drawing revisions, and present high-converting proposals to clients with local file storage.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-[#C5A059] hover:bg-[#b08e4d] text-[#121212] px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-[#C5A059]/20 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Client Project</span>
            </button>
            <button
              onClick={() => setActiveTab('importer')}
              className="bg-white/10 hover:bg-white/15 text-white border border-white/20 px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-2"
            >
              <span>Import Google Sheet</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-[#22201D] border border-white/5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">Total Quoted Pipeline</span>
            <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold font-serif text-white">{formatCurrency(totalPipeline)}</div>
            <p className="text-xs text-gray-400 mt-1 flex items-center space-x-1">
              <span>Across {projects.length} active studio projects</span>
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#22201D] border border-white/5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">Approved Bookings</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold font-serif text-emerald-400">{formatCurrency(approvedTotal)}</div>
            <p className="text-xs text-gray-400 mt-1">In procurement & site execution</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#22201D] border border-white/5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">BOQ Items Managed</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold font-serif text-white">{totalItemsCount} Custom Specs</div>
            <p className="text-xs text-gray-400 mt-1">Wardrobes, kitchens & panelling</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#22201D] border border-white/5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">Local Document Vault</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <FolderGit2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold font-serif text-white">{totalDocsCount} Local Assets</div>
            <p className="text-xs text-gray-400 mt-1">CAD, 3D Renders & Site photos</p>
          </div>
        </div>
      </div>

      {/* DESIGNFILES WORKFLOW PIPELINE */}
      <div className="p-6 rounded-2xl bg-[#22201D] border border-white/5 shadow-lg">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4 flex items-center space-x-2">
          <span>Studio Practice Workflow Pipeline</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { step: '01', title: 'Site Survey & CAD', desc: 'Measurement & MEP layouts', count: 1 },
            { step: '02', title: 'Interactive BOQ', desc: 'W×D×H auto Sft pricing', count: 2 },
            { step: '03', title: 'Client Proposal', desc: '1-Click digital signoff', count: 1 },
            { step: '04', title: 'Procurement', desc: 'BWP ply & Hettich orders', count: 1 },
            { step: '05', title: 'Site Handover', desc: 'QC & snag completion', count: 0 },
          ].map((phase, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#1C1A17] border border-white/5 relative group hover:border-[#C5A059]/40 transition-all">
              <span className="text-[10px] font-bold text-[#C5A059] tracking-wider block">{phase.step}</span>
              <h4 className="text-xs font-bold text-white mt-1">{phase.title}</h4>
              <p className="text-[11px] text-gray-400 mt-1 leading-snug">{phase.desc}</p>
              {phase.count > 0 && (
                <div className="mt-3 inline-block px-2 py-0.5 rounded-full bg-[#C5A059]/10 text-[#C5A059] text-[10px] font-semibold">
                  {phase.count} Project{phase.count > 1 ? 's' : ''}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ACTIVE CLIENT PROJECTS LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif font-bold text-white tracking-wide">
            Active Client Projects & Quotations
          </h2>
          <span className="text-xs text-gray-400">Click any project to view or edit full BOQ</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {safeProjects.map((proj) => {
            const floorCount = (proj.floors || []).length;
            const itemsCount = (proj.floors || []).reduce((fAcc, f) => {
              return fAcc + (f.areas || []).reduce((aAcc, a) => aAcc + (a.items || []).length, 0);
            }, 0);
            const total = getProjectTotal(proj);

            const statusColors = {
              'Draft': 'bg-gray-500/10 text-gray-400 border-gray-500/30',
              'Quotation Sent': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
              'Under Review': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
              'Approved': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
              'In Execution': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
            };

            return (
              <div 
                key={proj.id}
                className="group p-6 rounded-2xl bg-[#22201D] border border-white/5 hover:border-[#C5A059]/50 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColors[proj.status] || 'bg-gray-500/10 text-gray-300 border-gray-500/30'}`}>
                      {proj.status}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-[#C5A059]" />
                      <span>{proj.date}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#C5A059] transition-colors">
                    {proj.title}
                  </h3>
                  <div className="flex items-center space-x-1.5 text-xs text-gray-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{proj.location}</span>
                  </div>

                  <div className="mt-5 p-3.5 rounded-xl bg-[#1C1A17] border border-white/5 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Client:</span>
                      <span className="text-white font-medium">{proj.clientName}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Scope:</span>
                      <span className="text-gray-300">{floorCount} Floors • {itemsCount} BOQ Items</span>
                    </div>
                    <div className="flex justify-between text-xs pt-1 border-t border-white/5">
                      <span className="text-gray-400">Total Estimate:</span>
                      <span className="text-[#C5A059] font-bold font-serif text-sm">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setActiveProjectId(proj.id);
                      setActiveTab('quotation');
                    }}
                    className="flex-1 bg-[#C5A059]/10 hover:bg-[#C5A059] text-[#C5A059] hover:text-[#121212] py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5"
                  >
                    <span>Edit BOQ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      setActiveProjectId(proj.id);
                      setActiveTab('proposal');
                    }}
                    className="bg-white/5 hover:bg-white/10 text-white p-2.5 rounded-xl text-xs transition-all"
                    title="View Client Proposal"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setActiveProjectId(proj.id);
                      setActiveTab('vault');
                    }}
                    className="bg-white/5 hover:bg-white/10 text-white p-2.5 rounded-xl text-xs transition-all"
                    title="Local Document Vault"
                  >
                    <FolderGit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CREATE PROJECT MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#22201D] border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-scaleUp">
            <h3 className="text-xl font-serif font-bold text-white mb-2">Create New Client Project</h3>
            <p className="text-xs text-gray-400 mb-6">Set up project profile to start preparing BOQ quotations and document folders.</p>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mr. Sharma Luxury Penthouse"
                  value={newProjectForm.title}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, title: e.target.value })}
                  className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mr. Rajesh Sharma"
                    value={newProjectForm.clientName}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, clientName: e.target.value })}
                    className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Indiranagar, Bengaluru"
                    value={newProjectForm.location}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, location: e.target.value })}
                    className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 98450 00000"
                    value={newProjectForm.clientPhone}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, clientPhone: e.target.value })}
                    className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="client@gmail.com"
                    value={newProjectForm.clientEmail}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, clientEmail: e.target.value })}
                    className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Project Type</label>
                <select
                  value={newProjectForm.projectType}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, projectType: e.target.value })}
                  className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="Luxury Villa Interiors">Luxury Villa Interiors</option>
                  <option value="Duplex Apartment">Duplex Apartment</option>
                  <option value="Boutique Penthouse">Boutique Penthouse</option>
                  <option value="Commercial Studio / Office">Commercial Studio / Office</option>
                  <option value="Turnkey Architectural Renovation">Turnkey Architectural Renovation</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#C5A059] hover:bg-[#b08e4d] text-[#121212] px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Create & Launch BOQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
