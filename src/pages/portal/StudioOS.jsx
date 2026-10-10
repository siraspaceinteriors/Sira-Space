import React from 'react';
import { Link } from 'react-router-dom';
import { PortalProvider, usePortal } from './PortalContext';
import DashboardView from './DashboardView';
import QuotationStudio from './QuotationStudio';
import ClientProposalView from './ClientProposalView';
import DocumentVault from './DocumentVault';
import SheetImporter from './SheetImporter';
import ProductLibrary from './ProductLibrary';
import { 
  Building2, 
  Layers, 
  FileText, 
  Eye, 
  FolderGit2, 
  FileSpreadsheet, 
  ArrowLeft, 
  ChevronDown, 
  HardDrive,
  Sparkles,
  ExternalLink,
  BookOpen
} from 'lucide-react';

function StudioOSContent() {
  const { 
    projects, 
    activeProjectId, 
    setActiveProjectId, 
    activeTab, 
    setActiveTab, 
    activeProject 
  } = usePortal();

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: Building2 },
    { id: 'quotation', label: 'Quotation & BOQ', icon: Layers, badge: `${(activeProject?.floors || []).length} Floors` },
    { id: 'library', label: 'Product Library', icon: BookOpen },
    { id: 'proposal', label: 'Client Proposal', icon: Eye },
    { id: 'vault', label: 'Document Vault', icon: FolderGit2, badge: `${(activeProject?.documents || []).length}` },
    { id: 'importer', label: 'Sheet Importer', icon: FileSpreadsheet },
  ];

  return (
    <div className="min-h-screen bg-[#181614] text-[#F5F5F5] font-sans flex flex-col selection:bg-[#C5A059] selection:text-[#121212]">
      {/* TOP STUDIO NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#1F1D1A]/95 backdrop-blur-md border-b border-white/10 px-6 py-3.5 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* LOGO & PROJECT SELECTOR */}
          <div className="flex items-center space-x-5">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 rounded-lg border border-[#C5A059] flex items-center justify-center bg-[#C5A059]/15 group-hover:bg-[#C5A059] transition-all">
                <span className="font-serif font-bold text-xs text-[#C5A059] group-hover:text-[#121212]">S</span>
              </div>
              <div>
                <span className="font-serif tracking-widest font-bold text-sm block leading-none text-white">
                  SIRA STUDIO OS
                </span>
                <span className="text-[8px] tracking-widest text-[#C5A059] uppercase block font-semibold mt-0.5">
                  OPERATIONS & QUOTATIONS
                </span>
              </div>
            </Link>

            <div className="h-5 w-px bg-white/10 hidden sm:block"></div>

            {/* PROJECT SELECTOR DROPDOWN */}
            <div className="relative">
              <select
                value={activeProjectId}
                onChange={(e) => setActiveProjectId(e.target.value)}
                className="bg-[#181614] text-xs font-semibold text-white border border-white/15 rounded-xl px-3 py-1.5 pr-8 focus:outline-none focus:border-[#C5A059] appearance-none cursor-pointer max-w-[220px] sm:max-w-xs truncate"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#1C1A17] text-white">
                    {p.title} ({p.status})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* MAIN TAB SWITCHER */}
          <nav className="flex items-center space-x-1 overflow-x-auto pb-1 md:pb-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#C5A059] text-[#121212] font-bold shadow-md'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-[#121212]/20 text-[#121212]' : 'bg-white/10 text-gray-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* RIGHT ACTION: BACK TO WEBSITE */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              to="/"
              className="text-xs font-medium text-gray-400 hover:text-white flex items-center space-x-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Public Website</span>
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN VIEW AREA */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full print:p-0">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'quotation' && <QuotationStudio />}
        {activeTab === 'library' && <ProductLibrary />}
        {activeTab === 'proposal' && <ClientProposalView />}
        {activeTab === 'vault' && <DocumentVault />}
        {activeTab === 'importer' && <SheetImporter />}
      </main>
    </div>
  );
}

export default function StudioOS() {
  return (
    <PortalProvider>
      <StudioOSContent />
    </PortalProvider>
  );
}
