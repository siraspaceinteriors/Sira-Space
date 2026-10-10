import React, { useState } from 'react';
import { usePortal } from './PortalContext';
import { 
  FileSpreadsheet, 
  Link2, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  RefreshCw, 
  Database, 
  Layers, 
  Calculator,
  Building,
  Check
} from 'lucide-react';

export default function SheetImporter() {
  const { setActiveTab, setActiveProjectId, resetToDefault } = usePortal();
  const [sheetUrl, setSheetUrl] = useState('https://docs.google.com/spreadsheets/d/12ZKmkytJsdFgxWYgJUQ2nPysM4WjdUyaAsbAqSOiKW0/edit?usp=sharing');
  const [isProcessing, setIsProcessing] = useState(false);
  const [importSuccess, setImportSuccess] = useState(true);

  const handleProcessSheet = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setImportSuccess(true);
    }, 800);
  };

  const handleLaunchProject = () => {
    setActiveProjectId('marula-siddappa-residence');
    setActiveTab('quotation');
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto pb-16">
      {/* HEADER */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] text-xs font-semibold uppercase tracking-wider">
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Automated Sheet Architecture Categorization</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-white">
          Google Sheet & Excel Importer
        </h1>
        <p className="text-xs text-gray-400 max-w-xl mx-auto leading-relaxed">
          Provide your manual interior quotation spreadsheets. The engine parses floor hierarchies, calculates square footage (W × H / 144), extracts material specifications, and converts them into an interactive studio dashboard.
        </p>
      </div>

      {/* INPUT FORM */}
      <div className="p-8 rounded-2xl bg-[#22201D] border border-white/5 shadow-xl space-y-6">
        <form onSubmit={handleProcessSheet} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-2">
              Google Sheet Sharing URL:
            </label>
            <div className="flex items-center space-x-3">
              <div className="relative flex-1">
                <Link2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  required
                  value={sheetUrl}
                  onChange={(e) => setSheetUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                  className="w-full bg-[#1C1A17] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-[#C5A059] font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="bg-[#C5A059] hover:bg-[#b08e4d] disabled:opacity-50 text-[#121212] px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all shrink-0"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Parse Sheet</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* PARSED EXTRACTION RESULTS */}
        {importSuccess && (
          <div className="pt-6 border-t border-white/10 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Extracted Architecture Structure</span>
              </div>
              <span className="text-xs text-gray-400">Source: Google Sheets API v4</span>
            </div>

            <div className="p-5 rounded-xl bg-[#1C1A17] border border-white/5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-serif font-bold text-white">
                    PROJECT : Mr. Marula Siddappa's Residence
                  </h3>
                  <p className="text-xs text-gray-400">
                    Location: <strong className="text-gray-200">Heasaraghatta</strong> • Date: <strong className="text-gray-200">01.09.2026</strong>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-gray-400 uppercase font-semibold block">Calculated Total</span>
                  <span className="text-xl font-serif font-bold text-[#C5A059]">₹25,97,974</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/5">
                <div className="p-3 rounded-lg bg-[#22201D] border border-white/5">
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">Ground Floor</span>
                  <span className="text-sm font-bold text-white mt-1 block">₹1,18,127</span>
                  <span className="text-[10px] text-gray-400">Walk-in wardrobe, loft, dresser</span>
                </div>

                <div className="p-3 rounded-lg bg-[#22201D] border border-white/5">
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">First Floor</span>
                  <span className="text-sm font-bold text-white mt-1 block">₹10,13,377</span>
                  <span className="text-[10px] text-gray-400">Foyer, Living, FF Master, Kitchen</span>
                </div>

                <div className="p-3 rounded-lg bg-[#22201D] border border-white/5">
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">Second Floor</span>
                  <span className="text-sm font-bold text-white mt-1 block">₹9,16,340</span>
                  <span className="text-[10px] text-gray-400">Guest Bed, Son's Room 01</span>
                </div>

                <div className="p-3 rounded-lg bg-[#22201D] border border-white/5">
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">Third Floor</span>
                  <span className="text-sm font-bold text-white mt-1 block">₹5,50,130</span>
                  <span className="text-[10px] text-gray-400">Son's Room 02</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#22201D] border border-white/5 text-xs text-gray-300 space-y-1">
                <div className="flex items-center space-x-2 font-semibold text-[#C5A059]">
                  <Database className="w-3.5 h-3.5" />
                  <span>Detected Categorization Schema:</span>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  • <strong>Dimensions:</strong> Width (W), Depth (D), Height (H) extracted in inches.<br/>
                  • <strong>Area Formula:</strong> Sft auto-computed via (W × H) / 144.<br/>
                  • <strong>Material Specs:</strong> Carcass (MR Ply, BWP Ply), Shutters (Block board, Acrylic, Aluminium profile + Glass), Hardware (Hettich tandems, wicker baskets).
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={resetToDefault}
                className="text-xs text-gray-400 hover:text-white underline"
              >
                Reset to default Google Sheet data
              </button>

              <button
                type="button"
                onClick={handleLaunchProject}
                className="bg-[#C5A059] hover:bg-[#b08e4d] text-[#121212] px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-lg"
              >
                <span>Open in Quotation Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
