import React, { useState } from 'react';
import { usePortal } from './PortalContext';
import defaultLibrary from '../../data/productLibraryData.json';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Layers, 
  Eye, 
  Copy, 
  Check, 
  Sparkles, 
  Filter, 
  ArrowRight, 
  Image as ImageIcon,
  DollarSign
} from 'lucide-react';

export default function ProductLibrary() {
  const { activeProject, addItemToArea, setActiveTab } = usePortal();
  const [library, setLibrary] = useState(() => {
    try {
      const saved = localStorage.getItem('sira_product_library_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return defaultLibrary;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Insert modal state
  const [insertModalItem, setInsertModalItem] = useState(null);
  const [targetFloorIdx, setTargetFloorIdx] = useState(0);
  const [targetAreaIdx, setTargetAreaIdx] = useState(0);

  // New item modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLibItem, setNewLibItem] = useState({
    roomType: 'Living',
    category: 'Wall Panelling',
    name: 'Fluted Oak Veneer Panelling',
    description: 'Feature accent wall with natural white oak veneer and PU polish',
    material: 'BWP Marine Ply + Natural White Oak Veneer + PU Polish',
    rate: 2100,
    unit: 'Sft',
    defaultDimensions: { w: 120, d: 4, h: 108, sft: 90 },
    referenceImage: '/reference_images/image12.png'
  });

  const floors = activeProject?.floors || [];

  // Extract unique room types and categories
  const roomTypes = ['All', ...new Set(library.map(i => i.roomType).filter(Boolean))];
  const categories = ['All', ...new Set(library.map(i => i.category).filter(Boolean))];

  const filteredItems = library.filter(item => {
    const matchesRoom = selectedRoomType === 'All' || item.roomType === selectedRoomType;
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      (item.name || '').toLowerCase().includes(q) ||
      (item.material || '').toLowerCase().includes(q) ||
      (item.category || '').toLowerCase().includes(q) ||
      (item.roomType || '').toLowerCase().includes(q);
    return matchesRoom && matchesCat && matchesSearch;
  });

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  const handleInsertSubmit = (e) => {
    e.preventDefault();
    if (!insertModalItem || !floors[targetFloorIdx]) return;

    const dim = insertModalItem.defaultDimensions || {};
    addItemToArea(activeProject.id, targetFloorIdx, targetAreaIdx, {
      category: insertModalItem.category || 'Millwork',
      description: insertModalItem.name || insertModalItem.description || insertModalItem.category,
      material: insertModalItem.material || '',
      width: dim.w || null,
      depth: dim.d || null,
      height: dim.h || null,
      sft: dim.sft || null,
      rate: insertModalItem.rate || 0,
      qty: 1,
      unit: insertModalItem.unit || 'No',
      referenceImage: insertModalItem.referenceImage || null
    });

    setInsertModalItem(null);
    setActiveTab('quotation');
  };

  const handleAddNewLibraryItem = (e) => {
    e.preventDefault();
    const newItem = {
      ...newLibItem,
      id: `lib-${Date.now().toString().slice(-4)}`
    };
    const updated = [newItem, ...library];
    setLibrary(updated);
    try {
      localStorage.setItem('sira_product_library_v1', JSON.stringify(updated));
    } catch (err) {}
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* HEADER */}
      <div className="p-6 rounded-2xl bg-[#22201D] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center space-x-2 text-[#C5A059] text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Studio Master Specifications Catalog</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-white">
            Interior Architecture Product Library
          </h1>
          <p className="text-xs text-gray-400 mt-1 max-w-2xl leading-relaxed">
            Centralized library of standardized interior millwork, carpentry, hardware, and finishes. Quickly insert pre-calculated items directly into client BOQs.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#C5A059] hover:bg-[#b08e4d] text-[#121212] px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>New Catalog Item</span>
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="p-4 rounded-xl bg-[#1C1A17] border border-white/5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Room filter */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-gray-400 font-semibold">Spatial Room:</span>
            <select
              value={selectedRoomType}
              onChange={(e) => setSelectedRoomType(e.target.value)}
              className="bg-[#22201D] text-white border border-white/10 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#C5A059]"
            >
              {roomTypes.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {/* Category filter */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-gray-400 font-semibold">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#22201D] text-white border border-white/10 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#C5A059]"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search material, veneer, rate..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#22201D] border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#C5A059] w-64"
          />
        </div>
      </div>

      {/* PRODUCT LIBRARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => {
          const dim = item.defaultDimensions || {};
          return (
            <div
              key={item.id}
              className="group p-5 rounded-2xl bg-[#22201D] border border-white/5 hover:border-[#C5A059]/40 transition-all shadow-lg flex flex-col justify-between"
            >
              <div>
                {/* 3D Reference Image */}
                {item.referenceImage && (
                  <div 
                    onClick={() => setPreviewImage(item.referenceImage)}
                    className="relative w-full h-36 rounded-xl overflow-hidden mb-3.5 bg-black/40 cursor-pointer group/img"
                  >
                    <img 
                      src={item.referenceImage} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-[#1C1A17]/80 backdrop-blur text-white text-[11px] px-3 py-1 rounded-full flex items-center space-x-1">
                        <Eye className="w-3 h-3 text-[#C5A059]" />
                        <span>View 3D Render</span>
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-400">{item.roomType}</span>
                </div>

                <h3 className="text-base font-serif font-bold text-white group-hover:text-[#C5A059] transition-colors leading-snug">
                  {item.name}
                </h3>

                <div className="mt-3 p-3 rounded-xl bg-[#1C1A17] border border-white/5 space-y-2">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">
                      Material Specification
                    </span>
                    <p className="text-xs text-gray-300 whitespace-pre-line leading-relaxed">
                      {item.material}
                    </p>
                  </div>

                  {dim.w && dim.h && (
                    <div className="flex justify-between text-[11px] pt-1.5 border-t border-white/5">
                      <span className="text-gray-400">Dimensions:</span>
                      <span className="text-gray-200 font-mono">
                        {dim.w}" × {dim.d ? `${dim.d}" × ` : ''}{dim.h}" ({dim.sft} sft)
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-baseline pt-1.5 border-t border-white/5">
                    <span className="text-[11px] text-gray-400 font-medium">Standard Rate:</span>
                    <span className="text-sm font-serif font-bold text-[#C5A059]">
                      {formatCurrency(item.rate)} <span className="text-[10px] text-gray-400 font-sans font-normal">/ {item.unit || 'No'}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2">
                <button
                  onClick={() => setInsertModalItem(item)}
                  className="w-full bg-[#C5A059]/15 hover:bg-[#C5A059] text-[#C5A059] hover:text-[#121212] py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Insert into Active BOQ</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* INSERT MODAL */}
      {insertModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#22201D] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-xl font-serif font-bold text-white mb-1">Insert into Project BOQ</h3>
            <p className="text-xs text-gray-400 mb-5">
              Insert <strong className="text-white">{insertModalItem.name}</strong> into <strong>{activeProject.title}</strong>
            </p>

            <form onSubmit={handleInsertSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-gray-300 block mb-1">Select Floor</label>
                <select
                  value={targetFloorIdx}
                  onChange={(e) => {
                    setTargetFloorIdx(Number(e.target.value));
                    setTargetAreaIdx(0);
                  }}
                  className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                >
                  {floors.map((f, idx) => (
                    <option key={idx} value={idx}>{f.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Select Spatial Area / Room</label>
                <select
                  value={targetAreaIdx}
                  onChange={(e) => setTargetAreaIdx(Number(e.target.value))}
                  className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                >
                  {(floors[targetFloorIdx]?.areas || []).map((a, idx) => (
                    <option key={idx} value={idx}>{a.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setInsertModalItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#C5A059] hover:bg-[#b08e4d] text-[#121212] px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Confirm & Insert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* IMAGE PREVIEW LIGHTBOX */}
      {previewImage && (
        <div 
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6 cursor-pointer"
        >
          <div className="max-w-4xl max-h-[90vh] relative">
            <img 
              src={previewImage} 
              alt="Visual Preview" 
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl border border-white/20"
            />
            <p className="text-center text-xs text-gray-400 mt-3">Click anywhere to close preview</p>
          </div>
        </div>
      )}
    </div>
  );
}
