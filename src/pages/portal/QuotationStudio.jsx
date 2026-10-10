import React, { useState, useMemo } from 'react';
import { usePortal } from './PortalContext';
import { 
  Layers, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  FileSpreadsheet, 
  Printer, 
  Save, 
  Sparkles, 
  ChevronDown, 
  ChevronRight, 
  Calculator, 
  Search, 
  Filter, 
  CheckCircle, 
  Copy, 
  FolderOpen, 
  ArrowRight,
  Image as ImageIcon,
  Camera,
  BookOpen,
  Home,
  Check,
  Upload,
  Table,
  X
} from 'lucide-react';
import { 
  AREA_CATALOG_PRESETS, 
  getAreaType, 
  getCatalogForArea,
  getMasterLibrary,
  saveToMasterLibrary,
  findMatchingArea,
  getSortedAreas,
  getSortedItemsForArea,
  getSortedDescriptionsForItem,
  getSortedMaterialsForDescription,
  getSpecsForDescription,
  calculateElevationSft,
  convertDimension
} from '../../data/areaCatalogLibrary';

export default function QuotationStudio() {
  const { 
    activeProject, 
    updateProject, 
    addItemToArea, 
    updateItemInArea, 
    deleteItemFromArea, 
    addFloor, 
    addAreaToFloor, 
    updateAreaCoverImage,
    setActiveTab, 
    updateStatus 
  } = usePortal();

  const [selectedFloorIdx, setSelectedFloorIdxState] = useState(() => {
    try {
      const saved = localStorage.getItem('sira_selected_floor_idx');
      if (saved !== null) return Number(saved);
    } catch (e) {}
    return 1; // Default to First Floor (main living & kitchen floor)
  });

  const setSelectedFloorIdx = (idx) => {
    setSelectedFloorIdxState(idx);
    try { localStorage.setItem('sira_selected_floor_idx', String(idx)); } catch (e) {}
  };

  const [selectedAreaFilter, setSelectedAreaFilterState] = useState(() => {
    try {
      return localStorage.getItem('sira_selected_area_filter') || 'Kitchen';
    } catch (e) {
      return 'Kitchen';
    }
  });

  const setSelectedAreaFilter = (filter) => {
    setSelectedAreaFilterState(filter);
    try { localStorage.setItem('sira_selected_area_filter', filter); } catch (e) {}
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxImg, setLightboxImg] = useState(null);
  const [viewLayout, setViewLayoutState] = useState(() => {
    try {
      return localStorage.getItem('sira_view_layout') || 'spatial';
    } catch (e) {
      return 'spatial';
    }
  });

  const setViewLayout = (layout) => {
    setViewLayoutState(layout);
    try { localStorage.setItem('sira_view_layout', layout); } catch (e) {}
  };

  // Floor management modals
  const [showAddFloorModal, setShowAddFloorModal] = useState(false);
  const [newFloorName, setNewFloorName] = useState('');

  // Area management modal
  const [showAddAreaModal, setShowAddAreaModal] = useState(false);
  const [newAreaName, setNewAreaName] = useState('');

  // Item modal & editing states
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [targetAreaForAdd, setTargetAreaForAdd] = useState(null);
  const [editingItemInfo, setEditingItemInfo] = useState(null);

  // Master Library state & Dimension Unit state
  const [masterLib, setMasterLib] = useState(() => getMasterLibrary());
  const [dimUnit, setDimUnit] = useState('in'); // 'in' or 'mm'
  const [editDimUnit, setEditDimUnit] = useState('in'); // 'in' or 'mm' for edit modal

  // Dropdown states for Add Item modal
  const [modalArea, setModalArea] = useState('Living');
  const [isCustomArea, setIsCustomArea] = useState(false);
  const [customAreaText, setCustomAreaText] = useState('');

  const [modalItem, setModalItem] = useState('TV unit');
  const [isCustomItem, setIsCustomItem] = useState(false);
  const [customItemText, setCustomItemText] = useState('');

  const [modalDesc, setModalDesc] = useState('Back panel');
  const [isCustomDesc, setIsCustomDesc] = useState(false);
  const [customDescText, setCustomDescText] = useState('');

  const [modalMat, setModalMat] = useState('MR ply boxing + laminate');
  const [isCustomMat, setIsCustomMat] = useState(false);
  const [customMatText, setCustomMatText] = useState('');

  const [formDims, setFormDims] = useState({
    w: 70,
    d: 0,
    h: 105,
    sft: 51,
    rate: 800,
    qty: 1,
    unit: 'No',
    referenceImage: '/reference_images/image12.png'
  });

  const floors = activeProject?.floors || [];
  const currentFloor = floors[selectedFloorIdx] || floors[0];

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  // Material presets
  const materialPresets = [
    { label: 'Wall Panelling (Oak Veneer + PU Polish)', value: 'BWP Marine Ply + Natural White Oak Veneer + PU Polish' },
    { label: 'Double MR Ply + Laminate (Wardrobe/Shelves)', value: 'Double MR ply + External Laminate' },
    { label: 'BWR/BWP Ply + Acrylic (Premium Modular Kitchen)', value: 'Carcass : BWP ply + internal laminate\nShutter: HDHMR + external acrylic sheet\nHandle : Gola profile' },
    { label: 'MR Ply + Fluted Glass / Aluminium Profile', value: 'Carcass: MR ply + internal laminate\nShutter: Aluminium profile + Fluted Glass' },
    { label: 'MR Ply + Charcoal Panels / Rafters', value: 'MR ply + External laminate + Charcoal panels' },
    { label: 'HDHMR + CNC Carving + PU Paint', value: 'HDHMR board + CNC carving + PU paint' },
    { label: 'Hettich Soft-Close Hardware', value: 'Brand : Hettich soft-close tandems & hinges' }
  ];

  // Quick Floor Count Presets (1 to 5 Floors)
  const handleSetFloorCount = (count) => {
    if (count < 1) return;
    const standardNames = ['Ground Floor', 'First Floor', 'Second Floor', 'Third Floor', 'Terrace / Penthouse'];
    const currentFloors = [...floors];
    
    if (count > currentFloors.length) {
      // Add missing floors
      for (let i = currentFloors.length; i < count; i++) {
        currentFloors.push({
          name: standardNames[i] || `Floor ${i + 1}`,
          floorTotal: 0,
          areas: [{ name: 'Living Hall', items: [], coverImage: null }]
        });
      }
    } else if (count < currentFloors.length) {
      // Prompt before removing if floor has items
      const hasContent = currentFloors.slice(count).some(f => (f.areas || []).some(a => (a.items || []).length > 0));
      if (hasContent && !window.confirm(`Are you sure you want to reduce floors to ${count}? Floors above this will be removed.`)) {
        return;
      }
      currentFloors.splice(count);
    }

    updateProject(activeProject.id, { floors: currentFloors });
    if (selectedFloorIdx >= count) setSelectedFloorIdx(0);
  };

  const handleAddFloorSubmit = (e) => {
    e.preventDefault();
    if (!newFloorName) return;
    addFloor(activeProject.id, newFloorName);
    setNewFloorName('');
    setShowAddFloorModal(false);
    setSelectedFloorIdx(floors.length); // select newly added floor
  };

  const handleAddAreaSubmit = (e) => {
    e.preventDefault();
    if (!newAreaName) return;
    addAreaToFloor(activeProject.id, selectedFloorIdx, newAreaName);
    setSelectedAreaFilter(newAreaName);
    setNewAreaName('');
    setShowAddAreaModal(false);
  };

  const handleOpenAddModal = (floorIdx, areaIdx) => {
    setTargetAreaForAdd({ floorIdx, areaIdx });
    const targetFloor = floors[floorIdx];
    const targetArea = targetFloor?.areas?.[areaIdx];
    const rawAreaName = targetArea?.name || 'Living';

    const matchedArea = findMatchingArea(rawAreaName, masterLib);
    setModalArea(matchedArea);
    setIsCustomArea(false);
    setCustomAreaText('');

    const items = getSortedItemsForArea(matchedArea, masterLib);
    const initialItem = items[0] || 'TV unit';
    setModalItem(initialItem);
    setIsCustomItem(false);
    setCustomItemText('');

    const descs = getSortedDescriptionsForItem(matchedArea, initialItem, masterLib);
    const initialDesc = descs[0] || 'Back panel';
    setModalDesc(initialDesc);
    setIsCustomDesc(false);
    setCustomDescText('');

    const mats = getSortedMaterialsForDescription(matchedArea, initialItem, initialDesc, masterLib);
    const initialMat = mats[0] || 'MR ply boxing + laminate';
    setModalMat(initialMat);
    setIsCustomMat(false);
    setCustomMatText('');

    const specs = getSpecsForDescription(matchedArea, initialItem, initialDesc, masterLib);
    const wVal = specs?.defaultW ?? 70;
    const dVal = specs?.defaultD ?? 0;
    const hVal = specs?.defaultH ?? 105;
    const convertedW = dimUnit === 'mm' ? convertDimension(wVal, 'in', 'mm') : wVal;
    const convertedD = dimUnit === 'mm' ? convertDimension(dVal, 'in', 'mm') : dVal;
    const convertedH = dimUnit === 'mm' ? convertDimension(hVal, 'in', 'mm') : hVal;
    const calc = calculateElevationSft(convertedW, convertedD, convertedH, dimUnit);

    setFormDims({
      w: convertedW,
      d: convertedD,
      h: convertedH,
      sft: calc.sft,
      rate: specs?.defaultRate ?? 800,
      qty: 1,
      unit: specs?.defaultUnit || 'No',
      referenceImage: specs?.referenceImage || '/reference_images/image12.png'
    });

    setShowAddItemModal(true);
  };

  // Dropdown cascading changes
  const handleAreaSelectChange = (newArea) => {
    if (newArea === '__CUSTOM__') {
      setIsCustomArea(true);
      return;
    }
    setIsCustomArea(false);
    setModalArea(newArea);

    const items = getSortedItemsForArea(newArea, masterLib);
    const firstItem = items[0] || '';
    setModalItem(firstItem);
    setIsCustomItem(false);

    const descs = getSortedDescriptionsForItem(newArea, firstItem, masterLib);
    const firstDesc = descs[0] || '';
    setModalDesc(firstDesc);
    setIsCustomDesc(false);

    const mats = getSortedMaterialsForDescription(newArea, firstItem, firstDesc, masterLib);
    const firstMat = mats[0] || '';
    setModalMat(firstMat);
    setIsCustomMat(false);

    const specs = getSpecsForDescription(newArea, firstItem, firstDesc, masterLib);
    if (specs) {
      const wVal = dimUnit === 'mm' ? convertDimension(specs.defaultW, 'in', 'mm') : specs.defaultW;
      const dVal = dimUnit === 'mm' ? convertDimension(specs.defaultD, 'in', 'mm') : specs.defaultD;
      const hVal = dimUnit === 'mm' ? convertDimension(specs.defaultH, 'in', 'mm') : specs.defaultH;
      const calc = calculateElevationSft(wVal, dVal, hVal, dimUnit);
      setFormDims(prev => ({
        ...prev,
        w: wVal,
        d: dVal,
        h: hVal,
        sft: calc.sft,
        rate: specs.defaultRate || prev.rate,
        unit: specs.defaultUnit || prev.unit,
        referenceImage: specs.referenceImage || prev.referenceImage
      }));
    }
  };

  const handleItemSelectChange = (newItem) => {
    if (newItem === '__CUSTOM__') {
      setIsCustomItem(true);
      return;
    }
    setIsCustomItem(false);
    setModalItem(newItem);

    const descs = getSortedDescriptionsForItem(modalArea, newItem, masterLib);
    const firstDesc = descs[0] || '';
    setModalDesc(firstDesc);
    setIsCustomDesc(false);

    const mats = getSortedMaterialsForDescription(modalArea, newItem, firstDesc, masterLib);
    const firstMat = mats[0] || '';
    setModalMat(firstMat);
    setIsCustomMat(false);

    const specs = getSpecsForDescription(modalArea, newItem, firstDesc, masterLib);
    if (specs) {
      const wVal = dimUnit === 'mm' ? convertDimension(specs.defaultW, 'in', 'mm') : specs.defaultW;
      const dVal = dimUnit === 'mm' ? convertDimension(specs.defaultD, 'in', 'mm') : specs.defaultD;
      const hVal = dimUnit === 'mm' ? convertDimension(specs.defaultH, 'in', 'mm') : specs.defaultH;
      const calc = calculateElevationSft(wVal, dVal, hVal, dimUnit);
      setFormDims(prev => ({
        ...prev,
        w: wVal,
        d: dVal,
        h: hVal,
        sft: calc.sft,
        rate: specs.defaultRate || prev.rate,
        unit: specs.defaultUnit || prev.unit,
        referenceImage: specs.referenceImage || prev.referenceImage
      }));
    }
  };

  const handleDescSelectChange = (newDesc) => {
    if (newDesc === '__CUSTOM__') {
      setIsCustomDesc(true);
      return;
    }
    setIsCustomDesc(false);
    setModalDesc(newDesc);

    const mats = getSortedMaterialsForDescription(modalArea, modalItem, newDesc, masterLib);
    const firstMat = mats[0] || '';
    setModalMat(firstMat);
    setIsCustomMat(false);

    const specs = getSpecsForDescription(modalArea, modalItem, newDesc, masterLib);
    if (specs) {
      const wVal = dimUnit === 'mm' ? convertDimension(specs.defaultW, 'in', 'mm') : specs.defaultW;
      const dVal = dimUnit === 'mm' ? convertDimension(specs.defaultD, 'in', 'mm') : specs.defaultD;
      const hVal = dimUnit === 'mm' ? convertDimension(specs.defaultH, 'in', 'mm') : specs.defaultH;
      const calc = calculateElevationSft(wVal, dVal, hVal, dimUnit);
      setFormDims(prev => ({
        ...prev,
        w: wVal,
        d: dVal,
        h: hVal,
        sft: calc.sft,
        rate: specs.defaultRate || prev.rate,
        unit: specs.defaultUnit || prev.unit,
        referenceImage: specs.referenceImage || prev.referenceImage
      }));
    }
  };

  const handleMaterialSelectChange = (newMat) => {
    if (newMat === '__CUSTOM__') {
      setIsCustomMat(true);
      return;
    }
    setIsCustomMat(false);
    setModalMat(newMat);
  };

  // Toggle dimension unit (in <-> mm)
  const handleUnitToggle = (newUnit) => {
    if (newUnit === dimUnit) return;
    const newW = convertDimension(formDims.w, dimUnit, newUnit);
    const newD = convertDimension(formDims.d, dimUnit, newUnit);
    const newH = convertDimension(formDims.h, dimUnit, newUnit);
    setDimUnit(newUnit);
    const calc = calculateElevationSft(newW, newD, newH, newUnit);
    setFormDims(prev => ({
      ...prev,
      w: newW,
      d: newD,
      h: newH,
      sft: calc.sft
    }));
  };

  // Input dimension change
  const handleDimInputChange = (dimKey, val) => {
    const num = parseFloat(val) || 0;
    const nextDims = { ...formDims, [dimKey]: num };
    const calc = calculateElevationSft(
      dimKey === 'w' ? num : formDims.w,
      dimKey === 'd' ? num : formDims.d,
      dimKey === 'h' ? num : formDims.h,
      dimUnit
    );
    nextDims.sft = calc.sft;
    setFormDims(nextDims);
  };

  // Save new item with auto-persist to library
  const handleSaveNewItem = (e) => {
    e.preventDefault();
    const finalArea = isCustomArea ? (customAreaText.trim() || 'Living') : modalArea;
    const finalItem = isCustomItem ? (customItemText.trim() || 'Custom Item') : modalItem;
    const finalDesc = isCustomDesc ? (customDescText.trim() || 'Custom Specification') : modalDesc;
    const finalMat = isCustomMat ? (customMatText.trim() || 'Standard Specification') : modalMat;

    // Convert back to inches for standard storage
    const wInches = dimUnit === 'mm' ? convertDimension(formDims.w, 'mm', 'in') : (parseFloat(formDims.w) || 0);
    const dInches = dimUnit === 'mm' ? convertDimension(formDims.d, 'mm', 'in') : (parseFloat(formDims.d) || 0);
    const hInches = dimUnit === 'mm' ? convertDimension(formDims.h, 'mm', 'in') : (parseFloat(formDims.h) || 0);
    const finalRate = parseFloat(formDims.rate) || 0;
    const finalQty = parseFloat(formDims.qty) || 1;
    const finalUnit = formDims.unit || 'No';

    // Auto-save into persistent Master Library
    const updatedLib = saveToMasterLibrary(finalArea, finalItem, finalDesc, finalMat, {
      width: wInches,
      depth: dInches,
      height: hInches,
      rate: finalRate,
      unit: finalUnit,
      referenceImage: formDims.referenceImage
    });
    setMasterLib(updatedLib);

    // Add item to project area
    addItemToArea(activeProject.id, targetAreaForAdd.floorIdx, targetAreaForAdd.areaIdx, {
      category: finalItem,
      description: finalDesc,
      material: finalMat,
      width: wInches,
      depth: dInches,
      height: hInches,
      sft: parseFloat(formDims.sft) || 0,
      rate: finalRate,
      qty: finalQty,
      unit: finalUnit,
      referenceImage: formDims.referenceImage
    });

    setShowAddItemModal(false);
  };

  // Open edit modal
  const handleOpenEditModal = (floorIdx, areaIdx, itemIdx, item) => {
    setEditDimUnit('in');
    setEditingItemInfo({
      floorIdx,
      areaIdx,
      itemIdx,
      item: { ...item }
    });
  };

  // Edit modal unit toggle
  const handleEditUnitToggle = (newUnit) => {
    if (newUnit === editDimUnit || !editingItemInfo) return;
    const curItem = editingItemInfo.item;
    const newW = convertDimension(curItem.width, editDimUnit, newUnit);
    const newD = convertDimension(curItem.depth, editDimUnit, newUnit);
    const newH = convertDimension(curItem.height, editDimUnit, newUnit);
    setEditDimUnit(newUnit);
    const calc = calculateElevationSft(newW, newD, newH, newUnit);
    setEditingItemInfo({
      ...editingItemInfo,
      item: {
        ...curItem,
        width: newW,
        depth: newD,
        height: newH,
        sft: calc.sft
      }
    });
  };

  const handleSaveEditItem = (e) => {
    e.preventDefault();
    if (!editingItemInfo) return;
    const itemToSave = { ...editingItemInfo.item };
    if (editDimUnit === 'mm') {
      itemToSave.width = convertDimension(itemToSave.width, 'mm', 'in');
      itemToSave.depth = convertDimension(itemToSave.depth, 'mm', 'in');
      itemToSave.height = convertDimension(itemToSave.height, 'mm', 'in');
    }
    const calc = calculateElevationSft(itemToSave.width, itemToSave.depth, itemToSave.height, 'in');
    itemToSave.sft = calc.sft;
    const qty = parseFloat(itemToSave.qty) || 1;
    const rate = parseFloat(itemToSave.rate) || 0;
    itemToSave.total = Math.round((itemToSave.sft > 0 ? itemToSave.sft : 1) * rate * qty);

    updateItemInArea(
      activeProject.id,
      editingItemInfo.floorIdx,
      editingItemInfo.areaIdx,
      editingItemInfo.itemIdx,
      itemToSave
    );
    setEditingItemInfo(null);
  };

  // CSV export formatted identically to Sira Space Google Sheets
  const exportToCSV = () => {
    let csv = "data:text/csv;charset=utf-8,";
    csv += `"SIRA SPACE - Telling your story, in your space!"\n`;
    csv += `"PROJECT : ${activeProject.title}","PLACE : ${activeProject.location}","DATE : ${activeProject.date}"\n\n`;
    csv += `"Sl No","Area","Item","Description","Material/Product","Image (Only for reference)","W (in inches)","D","H","Sft","Rate","Qty","Unit","TOTAL"\n`;

    floors.forEach((f) => {
      csv += `\n"${f.name.toUpperCase()}",,,,,,,,,,,,,\n`;
      let slNo = 1;
      (f.areas || []).forEach((a) => {
        (a.items || []).forEach((item) => {
          const row = [
            slNo++,
            `"${(a.name || '').replace(/"/g, '""')}"`,
            `"${(item.category || '').replace(/"/g, '""')}"`,
            `"${(item.description || '').replace(/"/g, '""')}"`,
            `"${(item.material || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
            `"${item.referenceImage || ''}"`,
            item.width || '',
            item.depth || '',
            item.height || '',
            item.sft || '',
            item.rate || '',
            item.qty || 1,
            `"${item.unit || 'No'}"`,
            item.total || 0
          ].join(",");
          csv += row + "\n";
        });
      });
      csv += `"Total ${f.name}",,,,,,,,,,,,,${f.floorTotal || 0}\n`;
    });

    csv += `\n"Grand Total (All Floors)",,,,,,,,,,,,,${activeProject.grandTotal || activeProject.subtotalAmount || 0}\n`;

    const encodedUri = encodeURI(csv);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${activeProject.title.replace(/\s+/g, '_')}_BOQ_Quotation.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get active areas for current floor
  const currentFloorAreas = currentFloor?.areas || [];

  // Filter areas based on room filter
  const displayedAreas = useMemo(() => {
    if (selectedAreaFilter === 'ALL') return currentFloorAreas;
    return currentFloorAreas.filter(a => a.name.toLowerCase() === selectedAreaFilter.toLowerCase());
  }, [currentFloorAreas, selectedAreaFilter]);

  if (!activeProject) {
    return (
      <div className="p-12 text-center text-gray-400">
        <p>Loading project workspace...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-20">
      {/* 1. TOP HEADER & STUDIO ACTIONS */}
      <div className="p-6 rounded-2xl bg-[#22201D] border border-white/5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059] bg-[#C5A059]/10 border border-[#C5A059]/30 px-3 py-0.5 rounded-full">
              Interactive BOQ & Quotation Studio
            </span>
            <span className="text-xs text-gray-400">Ref: {activeProject.id}</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-white">
            {activeProject.title}
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Client: <span className="text-white font-medium">{activeProject.clientName}</span> • Location: <span className="text-white">{activeProject.location}</span> • Date: <span className="text-white">{activeProject.date}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab('library')}
            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all"
          >
            <BookOpen className="w-4 h-4 text-[#C5A059]" />
            <span>Product Library</span>
          </button>

          <button
            onClick={exportToCSV}
            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setActiveTab('proposal')}
            className="bg-[#C5A059] hover:bg-[#b08e4d] text-[#121212] px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-lg"
          >
            <Eye className="w-4 h-4" />
            <span>Client Proposal Mode</span>
          </button>
        </div>
      </div>

      {/* VIEW SWITCHER TABS: SPATIAL WORKFLOW vs FULL GOOGLE SHEET GRID */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#22201D] border border-white/5 shadow-md">
        <div className="inline-flex rounded-xl bg-[#1C1A17] p-1 border border-white/10 shadow">
          <button
            onClick={() => setViewLayout('spatial')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 ${
              viewLayout === 'spatial'
                ? 'bg-[#C5A059] text-[#121212] shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Spatial BOQ Cards</span>
          </button>
          <button
            onClick={() => setViewLayout('sheet')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 ${
              viewLayout === 'sheet'
                ? 'bg-[#C5A059] text-[#121212] shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Full Sheet Grid (Google Sheets)</span>
          </button>
        </div>

        <div className="text-xs text-gray-400 flex items-center space-x-3">
          <span>Active View: <strong className="text-white">{viewLayout === 'spatial' ? 'Spatial Architecture Workflow' : 'Multi-Floor Spreadsheet Grid'}</strong></span>
          <span className="text-gray-600">•</span>
          <span className="text-[#C5A059] font-semibold">{floors.length} Floors Configured</span>
        </div>
      </div>

      {/* 2. SECTION 1: FLOOR SELECTION WITH MULTI-FLOOR OPTIONS */}
      <div className="p-5 rounded-2xl bg-[#22201D] border border-white/5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-[#C5A059]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">
              Section 1: Floor Selection ({floors.length} Floors Configured)
            </h2>
          </div>

          {/* Quick preset floor selector (1 to 5 floors) */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-gray-400 font-semibold">Select Number of Floors:</span>
            <div className="inline-flex rounded-lg bg-[#1C1A17] p-1 border border-white/10">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => handleSetFloorCount(num)}
                  className={`px-2.5 py-0.5 rounded text-xs font-bold transition-all ${
                    floors.length === num
                      ? 'bg-[#C5A059] text-[#121212]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  title={`Configure project with ${num} Floor${num > 1 ? 's' : ''}`}
                >
                  {num}F
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Floor Selector Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            {floors.map((floor, idx) => {
              const isSelected = selectedFloorIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedFloorIdx(idx);
                    setSelectedAreaFilter('ALL');
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2.5 whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#C5A059] text-[#121212] shadow-lg scale-102'
                      : 'bg-[#1C1A17] text-gray-300 hover:text-white border border-white/5'
                  }`}
                >
                  <span>{floor.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                    isSelected ? 'bg-[#121212]/20 text-[#121212]' : 'bg-white/10 text-gray-400'
                  }`}>
                    {formatCurrency(floor.floorTotal)}
                  </span>
                </button>
              );
            })}

            <button
              onClick={() => setShowAddFloorModal(true)}
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#C5A059] hover:bg-[#C5A059]/10 border border-dashed border-[#C5A059]/30 flex items-center space-x-2 transition-all whitespace-nowrap active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Custom Floor</span>
            </button>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total All Floors</span>
            <span className="text-lg font-serif font-bold text-[#C5A059]">
              {formatCurrency(activeProject.grandTotal || activeProject.subtotalAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* 2. SPATIAL CARDS WORKFLOW OR FULL SPREADSHEET GRID */}
      {viewLayout === 'spatial' ? (
        <>
          {/* 3. SECTION 2: AREA / ROOM SELECTION (Bedroom, Living Hall, Kitchen, etc.) */}
          <div className="p-5 rounded-2xl bg-[#22201D] border border-white/5 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <Home className="w-4 h-4 text-[#C5A059]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">
              Section 2: Area / Room Selection for {currentFloor?.name}
            </h2>
          </div>
          <span className="text-xs text-gray-400">
            {currentFloorAreas.length} Areas • {(currentFloorAreas || []).reduce((a, b) => a + (b.items || []).length, 0)} Items
          </span>
        </div>

        {/* Spatial Room Pills */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedAreaFilter('ALL')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedAreaFilter === 'ALL'
                  ? 'bg-white text-[#121212]'
                  : 'bg-[#1C1A17] text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              All Spatial Areas
            </button>

            {currentFloorAreas.map((area, aIdx) => {
              const isSelected = selectedAreaFilter.toLowerCase() === area.name.toLowerCase();
              const areaSum = (area.items || []).reduce((s, i) => s + (i.total || 0), 0);

              return (
                <button
                  key={aIdx}
                  onClick={() => setSelectedAreaFilter(area.name)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center space-x-2 whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#C5A059] text-[#121212] shadow'
                      : 'bg-[#1C1A17] text-gray-300 hover:text-white border border-white/5'
                  }`}
                >
                  <span>{area.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-[#121212]/20 text-[#121212]' : 'bg-white/10 text-gray-400'
                  }`}>
                    {formatCurrency(areaSum)}
                  </span>
                </button>
              );
            })}

            <button
              onClick={() => setShowAddAreaModal(true)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#C5A059] hover:bg-[#C5A059]/10 border border-dashed border-[#C5A059]/30 flex items-center space-x-1.5 transition-all whitespace-nowrap active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Room</span>
            </button>
          </div>

          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search specifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#1C1A17] border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#C5A059] w-48"
            />
          </div>
        </div>
      </div>

      {/* 4. SECTIONS 3 & 4: FOR EACH DISPLAYED AREA -> 3D REFERENCE RENDER BANNER + ITEM SPECIFICATIONS TABLE */}
      {displayedAreas.map((area, aIdx) => {
        const areaOriginalIdx = currentFloorAreas.indexOf(area);
        const areaTotal = (area.items || []).reduce((sum, item) => sum + (item.total || 0), 0);

        // Find reference render for this area
        const areaImage = area.coverImage || (area.items || []).find(i => i.referenceImage)?.referenceImage;

        // Filter items
        const filteredItems = (area.items || []).filter(item => {
          if (!searchQuery) return true;
          const q = searchQuery.toLowerCase();
          return (
            (item.category || '').toLowerCase().includes(q) ||
            (item.description || '').toLowerCase().includes(q) ||
            (item.material || '').toLowerCase().includes(q) ||
            area.name.toLowerCase().includes(q)
          );
        });

        if (searchQuery && filteredItems.length === 0) return null;

        return (
          <div 
            key={aIdx} 
            className="rounded-2xl bg-[#22201D] border border-white/5 overflow-hidden shadow-xl space-y-0"
          >
            {/* SECTION 3: IMAGE (ONLY FOR REFERENCE) DEDICATED SHOWCASE BANNER */}
            <div className="p-6 bg-gradient-to-r from-[#282521] via-[#22201D] to-[#1C1A17] border-b border-white/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                {/* Visual Image Render Box */}
                <div className="flex items-start sm:items-center space-x-5">
                  {areaImage ? (
                    <div 
                      onClick={() => setLightboxImg(areaImage)}
                      className="relative w-36 h-28 sm:w-44 sm:h-32 rounded-xl overflow-hidden border-2 border-[#C5A059]/40 cursor-pointer group/render shrink-0 bg-black shadow-lg"
                      title="Click to view full-resolution 3D design render"
                    >
                      <img 
                        src={areaImage} 
                        alt={area.name} 
                        className="w-full h-full object-cover group-hover/render:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/render:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-[#1C1A17]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center space-x-1">
                          <Eye className="w-3 h-3 text-[#C5A059]" />
                          <span>Expand 3D</span>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-36 h-28 rounded-xl border border-dashed border-white/15 bg-black/20 flex flex-col items-center justify-center text-gray-500 shrink-0">
                      <ImageIcon className="w-6 h-6 mb-1 text-gray-600" />
                      <span className="text-[10px]">No Reference Image</span>
                    </div>
                  )}

                  <div>
                    <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#C5A059] text-[10px] font-bold uppercase tracking-wider mb-2">
                      <ImageIcon className="w-3 h-3" />
                      <span>Section 3: Image (Only for reference)</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white tracking-wide">
                      {area.name} Design Concept
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 max-w-md leading-relaxed">
                      3D architectural visualization and reference moodboard for custom carpentry, carcass specs, and hardware fittings.
                    </p>
                    <div className="flex items-center space-x-2 mt-2.5 text-xs text-gray-300">
                      <span className="text-[#C5A059] font-bold">{(area.items || []).length} Custom Specs</span>
                      <span>•</span>
                      <span>Floor: <strong className="text-white">{currentFloor?.name}</strong></span>
                    </div>

                    {/* UPLOAD ROOM 3D RENDER BUTTON */}
                    <div className="mt-3">
                      <label className="cursor-pointer bg-white/10 hover:bg-[#C5A059] text-white hover:text-[#121212] px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center space-x-1.5 transition-all border border-white/10 hover:border-[#C5A059] shadow">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Room 3D Render</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                updateAreaCoverImage(activeProject.id, selectedFloorIdx, areaOriginalIdx, ev.target.result);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Subtotal & Quick Add Button */}
                <div className="text-left md:text-right flex md:flex-col justify-between items-center md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Room Subtotal</span>
                    <span className="text-2xl font-serif font-bold text-[#C5A059]">
                      {formatCurrency(areaTotal)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleOpenAddModal(selectedFloorIdx, areaOriginalIdx)}
                    className="bg-[#C5A059] hover:bg-[#b08e4d] text-[#121212] px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md active:scale-95 shrink-0"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Add Item Specification</span>
                  </button>
                </div>
              </div>
            </div>

            {/* DYNAMIC ROOM SPECIFICATIONS & COMPONENTS LIBRARY SHELF */}
            {(() => {
              const catalogForThisArea = getCatalogForArea(area.name);
              return (
                <div className="px-6 py-3.5 bg-[#1C1A17] border-b border-white/5 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-white">
                        {area.name} Specifications Library
                      </span>
                      <span className="text-[10px] text-gray-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                        {catalogForThisArea.categories.length} Categories Ready
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-400">
                      Click any component to instantly add to sheet:
                    </span>
                  </div>

                  {/* Categories & quick-add components scroll */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                    {catalogForThisArea.categories.map((cat, cIdx) => (
                      <div key={cIdx} className="inline-flex items-center space-x-1.5 bg-[#22201D] border border-white/10 rounded-xl p-1.5 shrink-0">
                        <span className="px-2 py-0.5 text-[10px] font-bold text-[#C5A059] uppercase tracking-wider bg-[#C5A059]/10 rounded-md">
                          {cat.name}
                        </span>
                        {cat.items.map((catItem, iIdx) => (
                          <button
                            key={iIdx}
                            type="button"
                            onClick={() => {
                              addItemToArea(activeProject.id, selectedFloorIdx, areaOriginalIdx, {
                                category: catItem.category,
                                description: catItem.description,
                                material: catItem.material,
                                width: catItem.width,
                                depth: catItem.depth,
                                height: catItem.height,
                                rate: catItem.rate,
                                qty: catItem.qty || 1,
                                unit: catItem.unit || 'No',
                                referenceImage: catItem.referenceImage
                              });
                            }}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 hover:bg-[#C5A059] text-gray-200 hover:text-[#121212] transition-all flex items-center space-x-1 border border-white/5 hover:border-[#C5A059]"
                            title={`Add ${catItem.name} (${catItem.rate ? '₹' + catItem.rate + '/' + catItem.unit : 'Complimentary'})`}
                          >
                            <Plus className="w-3.5 h-3.5 text-[#C5A059] stroke-[2.5] shrink-0" />
                            <span>{catItem.name.length > 28 ? catItem.name.slice(0, 26) + '...' : catItem.name}</span>
                            {catItem.rate > 0 && (
                              <span className="text-[10px] opacity-75 font-mono ml-0.5">₹{catItem.rate}</span>
                            )}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* SECTION 4: ITEM SPECIFICATIONS TABLE */}
            <div className="overflow-x-auto">
              <div className="px-5 py-2.5 bg-[#1C1A17] border-b border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-300">
                  Section 4: Item Specifications & BOQ Breakdown
                </span>
                <span className="text-[11px] text-gray-500">Dimensions in Inches • Auto Sft Formula</span>
              </div>

              <table className="w-full text-left text-xs">
                <thead className="bg-[#1A1815] text-gray-400 uppercase tracking-wider font-semibold border-b border-white/5">
                  <tr>
                    <th className="py-3 px-4 w-12 text-center">#</th>
                    <th className="py-3 px-4 min-w-[130px]">Item / Scope</th>
                    <th className="py-3 px-4 min-w-[200px]">Description & Detail</th>
                    <th className="py-3 px-4 min-w-[220px]">Material / Product Specification</th>
                    <th className="py-3 px-4 text-center min-w-[130px]">Image (Only for reference)</th>
                    <th className="py-3 px-4 text-center min-w-[140px]">Dimensions (W × D × H)</th>
                    <th className="py-3 px-4 text-right min-w-[70px]">Sft</th>
                    <th className="py-3 px-4 text-right min-w-[90px]">Rate (₹)</th>
                    <th className="py-3 px-4 text-center min-w-[60px]">Qty</th>
                    <th className="py-3 px-4 text-right min-w-[110px]">TOTAL (₹)</th>
                    <th className="py-3 px-4 text-center w-20">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredItems.map((item, itemIdx) => {
                    const originalItemIdx = (area.items || []).indexOf(item);
                    const isPanelling = (item.category || '').toLowerCase().includes('panelling');

                    return (
                      <tr 
                        key={itemIdx} 
                        className={`hover:bg-white/[0.02] transition-colors group ${
                          isPanelling ? 'bg-[#C5A059]/5' : ''
                        }`}
                      >
                        <td className="py-3.5 px-4 text-center text-gray-400 font-mono">
                          {itemIdx + 1}
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="font-bold text-white block">{item.category}</span>
                          {isPanelling && (
                            <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-[#C5A059]/20 text-[#C5A059]">
                              Oak Veneer Feature
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="text-gray-300 font-medium">{item.description}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="text-[11px] text-gray-300 whitespace-pre-line leading-relaxed">
                            {item.material || 'Studio standard design'}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          {item.referenceImage ? (
                            <div className="relative group/cell inline-block">
                              <div 
                                onClick={() => setLightboxImg(item.referenceImage)}
                                className="relative w-14 h-11 mx-auto rounded-lg overflow-hidden border border-white/10 cursor-pointer group/img hover:border-[#C5A059] transition-all bg-black/40 shadow"
                                title="Click to view 3D reference render"
                              >
                                <img 
                                  src={item.referenceImage} 
                                  alt={item.category} 
                                  className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-200" 
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                                  <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                                </div>
                              </div>
                              <label className="cursor-pointer absolute -bottom-1 -right-1 p-1 rounded-full bg-[#1C1A17] border border-white/20 text-gray-300 hover:text-[#C5A059] shadow opacity-0 group-hover/cell:opacity-100 transition-opacity" title="Replace reference image">
                                <Upload className="w-2.5 h-2.5" />
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (ev) => {
                                        updateItemInArea(activeProject.id, selectedFloorIdx, areaOriginalIdx, originalItemIdx, {
                                          ...item,
                                          referenceImage: ev.target.result
                                        });
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          ) : (
                            <label className="cursor-pointer px-2 py-1 rounded text-[10px] text-gray-500 hover:text-[#C5A059] border border-dashed border-white/10 hover:border-[#C5A059]/40 inline-flex items-center space-x-1 mx-auto transition-colors" title="Upload 3D reference visual from device">
                              <Upload className="w-3 h-3" />
                              <span>+ Img</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => {
                                      updateItemInArea(activeProject.id, selectedFloorIdx, areaOriginalIdx, originalItemIdx, {
                                        ...item,
                                        referenceImage: ev.target.result
                                      });
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          {item.width || item.height ? (
                            <div className="font-mono text-gray-300 text-[11px] bg-[#1C1A17] px-2 py-1 rounded inline-block">
                              {item.width ? `${item.width}"` : '-'} × {item.depth ? `${item.depth}"` : '-'} × {item.height ? `${item.height}"` : '-'}
                            </div>
                          ) : (
                            <span className="text-gray-500 italic">As per site</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right font-mono text-gray-300">
                          {item.sft ? `${item.sft}` : '-'}
                        </td>

                        <td className="py-3.5 px-4 text-right font-mono text-gray-300">
                          {item.rate ? formatCurrency(item.rate) : '-'}
                        </td>

                        <td className="py-3.5 px-4 text-center font-mono text-gray-300">
                          {item.qty || 1} {item.unit || 'No'}
                        </td>

                        <td className="py-3.5 px-4 text-right font-serif font-bold text-white">
                          {formatCurrency(item.total)}
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center space-x-1 opacity-60 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleOpenEditModal(selectedFloorIdx, areaOriginalIdx, originalItemIdx, item)}
                              className="p-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-[#C5A059]"
                              title="Edit Item"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteItemFromArea(activeProject.id, selectedFloorIdx, areaOriginalIdx, originalItemIdx)}
                              className="p-1.5 rounded hover:bg-red-500/20 text-gray-400 hover:text-red-400"
                              title="Delete Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
        </>
      ) : (
        /* FULL MULTI-FLOOR SPREADSHEET GRID VIEW (MATCHING GOOGLE SHEET "QUOTATION - AFTER DESIGN") */
        <div className="rounded-2xl bg-[#22201D] border border-white/5 overflow-hidden shadow-2xl space-y-0">
          
          {/* GOOGLE SHEETS BRANDED HEADER BANNER (MATCHING USER SCREENSHOT) */}
          <div className="bg-[#181614] border-b-2 border-[#C5A059] p-5 sm:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C5A059] to-[#997938] text-[#121212] flex items-center justify-center font-serif font-black text-2xl shadow-lg border border-[#C5A059]">
                  S
                </div>
                <div>
                  <h1 className="text-xl font-serif font-bold text-white tracking-wider flex items-center space-x-2">
                    <span>SIRA SPACE</span>
                    <span className="text-[10px] text-[#C5A059] font-sans font-medium uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30">
                      Telling your story, in your space!
                    </span>
                  </h1>
                  <p className="text-xs text-gray-400 mt-0.5">Turnkey Interior Quotation • Architectural Millwork Specification</p>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <button
                  onClick={exportToCSV}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-semibold flex items-center space-x-2 transition-all border border-white/10 shadow hover:border-emerald-500/40"
                  title="Download CSV spreadsheet formatted for Excel/Google Sheets"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span>Export Excel / CSV</span>
                </button>
                <button
                  onClick={() => handleOpenAddModal(selectedFloorIdx, 0)}
                  className="bg-[#C5A059] hover:bg-[#b08e4d] text-[#121212] px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md active:scale-95 shrink-0"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Add Item Specification</span>
                </button>
              </div>
            </div>

            {/* PROJECT METADATA BAR (MATCHING GOOGLE SHEET ROWS 2-4) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3.5 text-xs">
              <div className="bg-[#22201D] px-4 py-2.5 rounded-xl border border-white/5 flex items-center space-x-2.5 shadow-sm">
                <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">PROJECT :</span>
                <span className="text-white font-semibold">{activeProject.title || "Mr. Chethan's Residence"}</span>
              </div>
              <div className="bg-[#22201D] px-4 py-2.5 rounded-xl border border-white/5 flex items-center space-x-2.5 shadow-sm">
                <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">PLACE :</span>
                <span className="text-white font-semibold">{activeProject.location || "Tumkur"}</span>
              </div>
              <div className="bg-[#22201D] px-4 py-2.5 rounded-xl border border-white/5 flex items-center space-x-2.5 shadow-sm">
                <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">DATE :</span>
                <span className="text-[#C5A059] font-mono font-bold">{activeProject.date || "08.02.2025"}</span>
              </div>
            </div>
          </div>

          {/* Main Sheet Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#181614] text-gray-300 uppercase tracking-wider font-semibold border-b border-white/10 sticky top-0 z-10">
                <tr>
                  <th className="py-2.5 px-3 w-12 text-center" rowSpan={2}>Sl No</th>
                  <th className="py-2.5 px-3 min-w-[110px]" rowSpan={2}>Area</th>
                  <th className="py-2.5 px-3 min-w-[130px]" rowSpan={2}>Item</th>
                  <th className="py-2.5 px-3 min-w-[160px]" rowSpan={2}>Description</th>
                  <th className="py-2.5 px-4 min-w-[220px]" rowSpan={2}>Material / Product</th>
                  <th className="py-2.5 px-3 text-center min-w-[160px] bg-[#C5A059]/10 text-[#C5A059] font-bold" rowSpan={2}>
                    Image (Only for reference)
                  </th>
                  <th className="py-1 px-2 text-center border-b border-white/10 bg-[#141210]" colSpan={3}>
                    W &nbsp; D &nbsp; H
                  </th>
                  <th className="py-2.5 px-3 text-right min-w-[60px]" rowSpan={2}>Sft</th>
                  <th className="py-2.5 px-3 text-right min-w-[80px]" rowSpan={2}>Rate</th>
                  <th className="py-2.5 px-2 text-center min-w-[50px]" rowSpan={2}>Qty</th>
                  <th className="py-2.5 px-2 text-center min-w-[50px]" rowSpan={2}>Unit</th>
                  <th className="py-2.5 px-4 text-right min-w-[110px]" rowSpan={2}>TOTAL</th>
                  <th className="py-2.5 px-2 text-center w-16" rowSpan={2}>Actions</th>
                </tr>
                <tr className="bg-[#151311] text-[10px] text-gray-400 font-mono">
                  <th className="py-1 px-2 text-center text-gray-300">W</th>
                  <th className="py-1 px-2 text-center text-gray-300">D</th>
                  <th className="py-1 px-2 text-center text-gray-300">H</th>
                </tr>
                {/* Sub-header row indicating 'in inches' (matching Google Sheet) */}
                <tr className="bg-[#141210] border-b border-white/10 text-[10px]">
                  <td colSpan={6} className="py-1 px-3 text-gray-500 font-mono text-[9px] uppercase tracking-wider">
                    Specification Library
                  </td>
                  <td colSpan={3} className="py-1 px-2 text-center text-[#C5A059] font-serif italic text-[10px] bg-white/[0.02]">
                    in inches
                  </td>
                  <td colSpan={6} className="py-1 px-3 text-right text-gray-500 font-mono text-[9px]">
                    2 highest dimensions for elevation
                  </td>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {floors.map((floor, fIdx) => {
                  let floorItemCounter = 0;
                  return (
                    <React.Fragment key={fIdx}>
                      {/* Floor Header Banner Row */}
                      <tr className="bg-[#282521] border-y border-white/10">
                        <td colSpan={15} className="py-2.5 px-4">
                          <div className="flex items-center justify-between">
                            <span className="font-serif font-bold text-sm text-[#C5A059] uppercase tracking-wider">
                              {floor.name}
                            </span>
                            <span className="text-xs text-gray-300 font-mono font-semibold">
                              Floor Total: {formatCurrency(floor.floorTotal)}
                            </span>
                          </div>
                        </td>
                      </tr>

                      {/* Floor items */}
                      {(floor.areas || []).map((area, aIdx) => (
                        (area.items || []).map((item, iIdx) => {
                          floorItemCounter++;
                          const isPanelling = (item.category || '').toLowerCase().includes('panelling');

                          return (
                            <tr 
                              key={`${fIdx}-${aIdx}-${iIdx}`}
                              className={`hover:bg-white/[0.03] transition-colors ${isPanelling ? 'bg-[#C5A059]/5' : ''}`}
                            >
                              <td className="py-3 px-3 text-center text-gray-400 font-mono align-middle">
                                {floorItemCounter}
                              </td>
                              <td className="py-3 px-3 font-semibold text-white align-middle">
                                {area.name}
                              </td>
                              <td className="py-3 px-3 font-medium text-gray-200 align-middle">
                                {item.category}
                              </td>
                              <td className="py-3 px-3 text-gray-300 align-middle">
                                {item.description}
                              </td>
                              <td className="py-3 px-4 text-[11px] text-gray-300 whitespace-pre-line leading-relaxed align-middle">
                                {item.material}
                              </td>

                              {/* DEDICATED LARGE IMAGE (ONLY FOR REFERENCE) COLUMN */}
                              <td className="py-3 px-3 text-center bg-[#C5A059]/5 align-middle">
                                {item.referenceImage ? (
                                  <div className="relative group/sheetImg inline-block">
                                    <div 
                                      onClick={() => setLightboxImg(item.referenceImage)}
                                      className="w-32 h-24 sm:w-36 sm:h-28 rounded-xl overflow-hidden border border-white/15 cursor-pointer shadow-lg group-hover/sheetImg:border-[#C5A059] transition-all bg-black/60 mx-auto relative"
                                      title="Click to view full-resolution 3D reference visual"
                                    >
                                      <img 
                                        src={item.referenceImage} 
                                        alt={item.category} 
                                        className="w-full h-full object-cover group-hover/sheetImg:scale-105 transition-transform duration-200" 
                                      />
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/sheetImg:opacity-100 flex items-center justify-center transition-opacity">
                                        <span className="bg-[#1C1A17]/90 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center space-x-1 shadow">
                                          <Eye className="w-3 h-3 text-[#C5A059]" />
                                          <span>Expand</span>
                                        </span>
                                      </div>
                                    </div>
                                    <label className="cursor-pointer absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#1C1A17] border border-white/20 text-gray-300 hover:text-[#C5A059] shadow opacity-0 group-hover/sheetImg:opacity-100 transition-opacity" title="Replace image">
                                      <Upload className="w-3 h-3" />
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            const reader = new FileReader();
                                            reader.onload = (ev) => {
                                              updateItemInArea(activeProject.id, fIdx, aIdx, iIdx, {
                                                ...item,
                                                referenceImage: ev.target.result
                                              });
                                            };
                                            reader.readAsDataURL(file);
                                          }
                                        }}
                                      />
                                    </label>
                                  </div>
                                ) : (
                                  <label className="cursor-pointer w-28 h-20 sm:w-32 sm:h-24 rounded-xl border border-dashed border-white/15 hover:border-[#C5A059]/40 bg-black/20 hover:bg-[#C5A059]/5 flex flex-col items-center justify-center text-gray-500 hover:text-[#C5A059] transition-all mx-auto" title="Upload reference visual">
                                    <Upload className="w-4 h-4 mb-1" />
                                    <span className="text-[10px] font-semibold">+ Upload Image</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          const reader = new FileReader();
                                          reader.onload = (ev) => {
                                            updateItemInArea(activeProject.id, fIdx, aIdx, iIdx, {
                                              ...item,
                                              referenceImage: ev.target.result
                                            });
                                          };
                                          reader.readAsDataURL(file);
                                        }
                                      }}
                                    />
                                  </label>
                                )}
                              </td>

                              <td className="py-3 px-2 text-center font-mono text-gray-300">
                                {item.width || '-'}
                              </td>
                              <td className="py-3 px-2 text-center font-mono text-gray-300">
                                {item.depth || '-'}
                              </td>
                              <td className="py-3 px-2 text-center font-mono text-gray-300">
                                {item.height || '-'}
                              </td>
                              <td className="py-3 px-3 text-right font-mono text-gray-300">
                                {item.sft || '-'}
                              </td>
                              <td className="py-3 px-3 text-right font-mono text-gray-300">
                                {item.rate ? formatCurrency(item.rate) : '-'}
                              </td>
                              <td className="py-3 px-2 text-center font-mono text-gray-300">
                                {item.qty || 1}
                              </td>
                              <td className="py-3 px-2 text-center font-mono text-gray-300">
                                {item.unit || 'No'}
                              </td>
                              <td className="py-3 px-4 text-right font-mono font-bold text-white">
                                {formatCurrency(item.total)}
                              </td>
                              <td className="py-3 px-2 text-center">
                                <div className="flex items-center justify-center space-x-1">
                                  <button
                                    onClick={() => handleOpenEditModal(fIdx, aIdx, iIdx, item)}
                                    className="p-1 rounded hover:bg-white/10 text-gray-300 hover:text-[#C5A059]"
                                    title="Edit Item"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => deleteItemFromArea(activeProject.id, fIdx, aIdx, iIdx)}
                                    className="p-1 rounded hover:bg-red-500/20 text-gray-400 hover:text-red-400"
                                    title="Delete Item"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ))}

                      {/* Floor Subtotal Separator Row (Matching Google Sheet) */}
                      <tr className="bg-[#1C1A17] font-bold border-y-2 border-[#C5A059]/30">
                        <td colSpan={13} className="py-3 px-4 text-right font-serif text-xs text-[#C5A059] uppercase tracking-wider">
                          Total {floor.name}
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-sm text-[#C5A059] font-bold">
                          {formatCurrency(floor.floorTotal)}
                        </td>
                        <td></td>
                      </tr>
                    </React.Fragment>
                  );
                })}

                {/* Grand Total Footer Row */}
                <tr className="bg-[#151311] font-bold border-t-2 border-[#C5A059]">
                  <td colSpan={13} className="py-4 px-4 text-right font-serif text-sm text-white uppercase tracking-wider">
                    Grand Total (All Floors)
                  </td>
                  <td className="py-4 px-4 text-right font-serif text-lg text-[#C5A059] font-bold">
                    {formatCurrency(activeProject.grandTotal || activeProject.subtotalAmount)}
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. SUMMARY, TERMS & PAYMENT SCHEDULE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
        {/* PAYMENT SCHEDULE (10%, 50%, 20%, 15%, 5%) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#22201D] border border-white/5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-serif font-bold text-white flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-[#C5A059]" />
              <span>Studio 5-Stage Payment Schedule</span>
            </h3>
            <span className="text-xs text-[#C5A059] font-bold">Selective Package</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
            {(activeProject.paymentSchedule || [
              { stage: 'Stage 1', percent: 10, title: 'Advance', desc: '10% advance to start the design' },
              { stage: 'Stage 2', percent: 50, title: 'Mobilization', desc: '50% material procurement' },
              { stage: 'Stage 3', percent: 20, title: 'Dispatch', desc: '20% factory material reached site' },
              { stage: 'Stage 4', percent: 15, title: 'Installation', desc: '15% after shutter installation' },
              { stage: 'Stage 5', percent: 5, title: 'Handover', desc: '5% after completion of work' }
            ]).map((ps, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#1C1A17] border border-white/5 text-center flex flex-col justify-between">
                <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-wider">{ps.stage}</span>
                <div className="my-1.5">
                  <span className="text-xl font-serif font-bold text-white">{ps.percent}%</span>
                  <h4 className="text-xs font-semibold text-gray-200 mt-0.5">{ps.title}</h4>
                </div>
                <p className="text-[10px] text-gray-400 leading-snug">{ps.desc}</p>
              </div>
            ))}
          </div>

          {/* Selective Package Highlights */}
          <div className="p-4 rounded-xl bg-[#1C1A17] border border-white/5 space-y-2 text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A059] block">
              Selective Package Inclusions & Warranty
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300 text-[11px]">
              <div>✓ Interior Design & Designer Site Visit fees included</div>
              <div>✓ Complimentary Wallpaper in bedrooms with bed & wardrobe</div>
              <div>✓ Accessory tray & 1 dozen hangers included per wardrobe</div>
              <div>✓ Cutlery tray & plate rack included in kitchen</div>
              <div>✓ 10 Years Product Warranty against woodwork defects</div>
              <div>✓ Factory-made 18mm thick modular units with Century/Green ply</div>
            </div>
          </div>
        </div>

        {/* PRICING TOTAL SUMMARY */}
        <div className="p-6 rounded-2xl bg-[#22201D] border border-white/5 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-serif font-bold text-white flex items-center space-x-2">
              <Calculator className="w-4 h-4 text-[#C5A059]" />
              <span>Quotation Total</span>
            </h3>

            <div className="space-y-3 text-xs pt-4">
              <div className="flex justify-between text-gray-400">
                <span>Total of All Floors:</span>
                <span className="text-white font-mono font-bold">{formatCurrency(activeProject.grandTotal || activeProject.subtotalAmount)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Total Floors:</span>
                <span className="text-gray-200 font-semibold">{floors.length} Floors</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Turnkey Millwork Specs:</span>
                <span className="text-gray-200 font-semibold">
                  {floors.reduce((acc, f) => acc + (f.areas || []).reduce((aAcc, a) => aAcc + (a.items || []).length, 0), 0)} Items
                </span>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white uppercase tracking-wider">Final Estimate:</span>
                <span className="text-2xl font-serif font-bold text-[#C5A059]">
                  {formatCurrency(activeProject.grandTotal || activeProject.subtotalAmount)}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5">
            <button
              onClick={() => setActiveTab('proposal')}
              className="w-full bg-[#C5A059] hover:bg-[#b08e4d] text-[#121212] py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg"
            >
              <span>Present to Client (Proposal Mode)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL: ADD FLOOR */}
      {showAddFloorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#22201D] border border-white/10 rounded-2xl w-full max-w-sm p-6 shadow-2xl">
            <h3 className="text-lg font-serif font-bold text-white mb-1">Add Custom Floor</h3>
            <p className="text-xs text-gray-400 mb-4">Enter floor label to expand project scope.</p>

            <form onSubmit={handleAddFloorSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-gray-300 block mb-1">Floor Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fourth Floor, Terrace, Basement"
                  value={newFloorName}
                  onChange={(e) => setNewFloorName(e.target.value)}
                  className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddFloorModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#C5A059] hover:bg-[#b08e4d] text-[#121212] px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Add Floor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD AREA / ROOM */}
      {showAddAreaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#22201D] border border-white/10 rounded-2xl w-full max-w-sm p-6 shadow-2xl">
            <h3 className="text-lg font-serif font-bold text-white mb-1">Add Area / Room</h3>
            <p className="text-xs text-gray-400 mb-4">
              Adding to <strong className="text-white">{currentFloor?.name}</strong>
            </p>

            <form onSubmit={handleAddAreaSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-gray-300 block mb-1">Area / Room Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Living Hall, Master Bedroom, Kitchen"
                  value={newAreaName}
                  onChange={(e) => setNewAreaName(e.target.value)}
                  className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddAreaModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#C5A059] hover:bg-[#b08e4d] text-[#121212] px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Add Area
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD ITEM SPECIFICATION */}
      {showAddItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-3 sm:p-4">
          <div className="bg-[#22201D] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#22201D]">
              <div>
                <h3 className="text-lg font-serif font-bold text-white mb-0.5 flex items-center space-x-2">
                  <span>Add Item Specification</span>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#C5A059] bg-[#C5A059]/15 px-2 py-0.5 rounded-full border border-[#C5A059]/30">
                    Master Library
                  </span>
                </h3>
                <p className="text-xs text-gray-400">
                  Adding to <strong className="text-[#C5A059]">{currentFloor?.areas[targetAreaForAdd.areaIdx]?.name}</strong> • {currentFloor?.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddItemModal(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form with scrollable body and fixed footer */}
            <form onSubmit={handleSaveNewItem} className="flex-1 flex flex-col min-h-0">
              <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
                
                {/* 1. AREA SELECTION DROPDOWN */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-gray-300">Area / Room *</label>
                    <span className="text-[10px] text-gray-400">Alphabetical Catalog</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <select
                      value={isCustomArea ? '__CUSTOM__' : modalArea}
                      onChange={(e) => handleAreaSelectChange(e.target.value)}
                      className="flex-1 bg-[#1C1A17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    >
                      {getSortedAreas(masterLib).map(aName => (
                        <option key={aName} value={aName}>{aName}</option>
                      ))}
                      <option value="__CUSTOM__">+ Custom Area / Room...</option>
                    </select>
                  </div>
                  {isCustomArea && (
                    <input
                      type="text"
                      required
                      placeholder="Type custom area name (e.g. Master Suite, Home Theatre)"
                      value={customAreaText}
                      onChange={(e) => setCustomAreaText(e.target.value)}
                      className="mt-2 w-full bg-[#1C1A17] border border-[#C5A059]/50 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C5A059]"
                    />
                  )}
                </div>

                {/* 2. ITEM & DESCRIPTION (SUB-ITEM) DROPDOWNS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-gray-300">Item / Category *</label>
                      <span className="text-[10px] text-gray-400">A-Z</span>
                    </div>
                    <select
                      value={isCustomItem ? '__CUSTOM__' : modalItem}
                      onChange={(e) => handleItemSelectChange(e.target.value)}
                      className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    >
                      {getSortedItemsForArea(modalArea, masterLib).map(iName => (
                        <option key={iName} value={iName}>{iName}</option>
                      ))}
                      <option value="__CUSTOM__">+ Custom Item...</option>
                    </select>
                    {isCustomItem && (
                      <input
                        type="text"
                        required
                        placeholder="Type custom item (e.g. Bar Cabinet, Accent Console)"
                        value={customItemText}
                        onChange={(e) => setCustomItemText(e.target.value)}
                        className="mt-2 w-full bg-[#1C1A17] border border-[#C5A059]/50 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C5A059]"
                      />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-gray-300">Description / Sub-item *</label>
                      <span className="text-[10px] text-gray-400">A-Z</span>
                    </div>
                    <select
                      value={isCustomDesc ? '__CUSTOM__' : modalDesc}
                      onChange={(e) => handleDescSelectChange(e.target.value)}
                      className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    >
                      {getSortedDescriptionsForItem(modalArea, modalItem, masterLib).map(dName => (
                        <option key={dName} value={dName}>{dName}</option>
                      ))}
                      <option value="__CUSTOM__">+ Custom Description...</option>
                    </select>
                    {isCustomDesc && (
                      <input
                        type="text"
                        required
                        placeholder="Type custom description (e.g. Fluted oak ledge, Shutter unit)"
                        value={customDescText}
                        onChange={(e) => setCustomDescText(e.target.value)}
                        className="mt-2 w-full bg-[#1C1A17] border border-[#C5A059]/50 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C5A059]"
                      />
                    )}
                  </div>
                </div>

                {/* 3. MATERIAL / PRODUCT SPECIFICATION DROPDOWN */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-gray-300">Material / Product Specification *</label>
                    <span className="text-[10px] text-[#C5A059]">Auto-saved to Library</span>
                  </div>
                  <select
                    value={isCustomMat ? '__CUSTOM__' : modalMat}
                    onChange={(e) => handleMaterialSelectChange(e.target.value)}
                    className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A059] mb-2"
                  >
                    {getSortedMaterialsForDescription(modalArea, modalItem, modalDesc, masterLib).map((mText, mIdx) => (
                      <option key={mIdx} value={mText}>
                        {mText.length > 80 ? mText.replace(/\n/g, ' • ').slice(0, 78) + '...' : mText.replace(/\n/g, ' • ')}
                      </option>
                    ))}
                    <option value="__CUSTOM__">+ Custom Material Specification...</option>
                  </select>

                  {/* Material Details Editor */}
                  <textarea
                    rows={2}
                    value={isCustomMat ? customMatText : modalMat}
                    onChange={(e) => {
                      if (isCustomMat) {
                        setCustomMatText(e.target.value);
                      } else {
                        setModalMat(e.target.value);
                      }
                    }}
                    placeholder="Enter carcass, shutter, hardware details (e.g. Carcass: MR ply + laminate...)"
                    className="w-full bg-[#1C1A17] border border-white/10 rounded-xl p-3 text-xs text-white leading-relaxed focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                {/* 4. DIMENSION UNIT SELECTOR & INPUTS WITH 2-HIGHER DIMENSION CALCULATION */}
                <div className="p-4 rounded-xl bg-[#1C1A17] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calculator className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-white">Dimensions & Area</span>
                    </div>

                    {/* Unit Switcher: Inches vs Millimeters */}
                    <div className="flex items-center bg-[#22201D] p-1 rounded-xl border border-white/10 text-xs">
                      <span className="text-[10px] text-gray-400 mr-2 ml-1">Unit:</span>
                      <button
                        type="button"
                        onClick={() => handleUnitToggle('in')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          dimUnit === 'in' 
                            ? 'bg-[#C5A059] text-[#121212] shadow' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        Inches (in)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUnitToggle('mm')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          dimUnit === 'mm' 
                            ? 'bg-[#C5A059] text-[#121212] shadow' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        Millimeters (mm)
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-gray-300 block mb-1">
                        Width ({dimUnit})
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formDims.w || ''}
                        onChange={(e) => handleDimInputChange('w', e.target.value)}
                        className="w-full bg-[#22201D] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-300 block mb-1">
                        Depth ({dimUnit})
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formDims.d || ''}
                        onChange={(e) => handleDimInputChange('d', e.target.value)}
                        className="w-full bg-[#22201D] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-300 block mb-1">
                        Height ({dimUnit})
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formDims.h || ''}
                        onChange={(e) => handleDimInputChange('h', e.target.value)}
                        className="w-full bg-[#22201D] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                  </div>

                  {/* Two-Highest Dimensions Elevation Formula Banner */}
                  <div className="p-2.5 rounded-lg bg-[#22201D] border border-[#C5A059]/20 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                      <span className="text-gray-300 font-mono text-[11px]">
                        Elevation Formula (2 highest dims): {calculateElevationSft(formDims.w, formDims.d, formDims.h, dimUnit).formula}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1.5 shrink-0 ml-2">
                      <span className="text-gray-400 text-[10px]">Sft:</span>
                      <input
                        type="number"
                        step="0.01"
                        value={formDims.sft || ''}
                        onChange={(e) => setFormDims({ ...formDims, sft: parseFloat(e.target.value) || 0 })}
                        className="w-16 bg-[#1C1A17] border border-[#C5A059]/40 rounded-lg px-2 py-0.5 text-xs text-[#C5A059] font-mono font-bold text-center"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. RATE, QUANTITY & UNIT */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Rate (₹ / Sft or Unit) *</label>
                    <input
                      type="number"
                      required
                      value={formDims.rate || ''}
                      onChange={(e) => setFormDims({ ...formDims, rate: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Quantity</label>
                    <input
                      type="number"
                      value={formDims.qty || 1}
                      onChange={(e) => setFormDims({ ...formDims, qty: parseFloat(e.target.value) || 1 })}
                      className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Unit</label>
                    <select
                      value={formDims.unit || 'No'}
                      onChange={(e) => setFormDims({ ...formDims, unit: e.target.value })}
                      className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#C5A059]"
                    >
                      <option value="No">No</option>
                      <option value="Sft">Sft</option>
                      <option value="Rft">Rft</option>
                      <option value="Sq.m">Sq.m</option>
                    </select>
                  </div>
                </div>

                {/* 6. REFERENCE IMAGE (FOR REFERENCE ONLY) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs text-gray-300 font-semibold">Image (Only for reference)</label>
                    <label className="cursor-pointer text-[11px] text-[#C5A059] hover:underline flex items-center space-x-1">
                      <Upload className="w-3 h-3" />
                      <span>Upload Image from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              setFormDims(prev => ({ ...prev, referenceImage: ev.target.result }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    {formDims.referenceImage && (
                      <img
                        src={formDims.referenceImage}
                        alt="Preview"
                        className="w-16 h-12 rounded-lg object-cover border border-white/10 shrink-0 shadow"
                      />
                    )}
                    <input
                      type="text"
                      placeholder="e.g. /reference_images/image12.png or uploaded image"
                      value={formDims.referenceImage || ''}
                      onChange={(e) => setFormDims({ ...formDims, referenceImage: e.target.value })}
                      className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>

              </div>

              {/* Fixed Footer */}
              <div className="p-4 border-t border-white/10 bg-[#1C1A17] flex items-center justify-between shrink-0">
                <div className="text-left">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Estimated Total:</span>
                  <span className="text-base font-serif font-bold text-[#C5A059]">
                    {formatCurrency(
                      (formDims.rate || 0) * 
                      ((formDims.sft && formDims.sft > 0 && formDims.unit !== 'No') ? formDims.sft : (formDims.qty || 1))
                    )}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddItemModal(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#C5A059] hover:bg-[#b08e4d] text-[#121212] px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-lg transition-all active:scale-95"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Add Item to Sheet</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT ITEM */}
      {editingItemInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-3 sm:p-4">
          <div className="bg-[#22201D] border border-white/10 rounded-2xl w-full max-w-xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#22201D]">
              <div>
                <h3 className="text-lg font-serif font-bold text-white mb-0.5">Edit Item Specification</h3>
                <p className="text-xs text-gray-400">Modify dimensions, materials, or reference image.</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingItemInfo(null)}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditItem} className="flex-1 flex flex-col min-h-0">
              <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Category / Item *</label>
                    <input
                      type="text"
                      required
                      value={editingItemInfo.item.category || ''}
                      onChange={(e) => setEditingItemInfo({
                        ...editingItemInfo,
                        item: { ...editingItemInfo.item, category: e.target.value }
                      })}
                      className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Description / Sub-item</label>
                    <input
                      type="text"
                      value={editingItemInfo.item.description || ''}
                      onChange={(e) => setEditingItemInfo({
                        ...editingItemInfo,
                        item: { ...editingItemInfo.item, description: e.target.value }
                      })}
                      className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-300 block mb-1">Material Specification</label>
                  <textarea
                    rows={2}
                    value={editingItemInfo.item.material || ''}
                    onChange={(e) => setEditingItemInfo({
                      ...editingItemInfo,
                      item: { ...editingItemInfo.item, material: e.target.value }
                    })}
                    className="w-full bg-[#1C1A17] border border-white/10 rounded-xl p-3 text-xs text-white leading-relaxed"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs text-gray-300 block">Reference Image</label>
                    <label className="cursor-pointer text-[11px] text-[#C5A059] hover:underline flex items-center space-x-1">
                      <Upload className="w-3 h-3" />
                      <span>Upload Image from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              setEditingItemInfo({
                                ...editingItemInfo,
                                item: { ...editingItemInfo.item, referenceImage: ev.target.result }
                              });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    {editingItemInfo.item.referenceImage && (
                      <img
                        src={editingItemInfo.item.referenceImage}
                        alt="Preview"
                        className="w-14 h-11 rounded-lg object-cover border border-white/10 shrink-0 shadow"
                      />
                    )}
                    <input
                      type="text"
                      placeholder="e.g. /reference_images/image12.png or uploaded image"
                      value={editingItemInfo.item.referenceImage || ''}
                      onChange={(e) => setEditingItemInfo({
                        ...editingItemInfo,
                        item: { ...editingItemInfo.item, referenceImage: e.target.value }
                      })}
                      className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1C1A17] border border-white/10 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Dimensions ({editDimUnit === 'mm' ? 'Millimeters' : 'Inches'})
                      </span>
                      {/* Unit Toggle Button */}
                      <div className="inline-flex rounded-lg bg-[#22201D] p-0.5 border border-white/10">
                        <button
                          type="button"
                          onClick={() => handleEditUnitToggle('in')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                            editDimUnit === 'in' ? 'bg-[#C5A059] text-[#121212]' : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          IN (Inches)
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEditUnitToggle('mm')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                            editDimUnit === 'mm' ? 'bg-[#C5A059] text-[#121212]' : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          MM (Millimeters)
                        </button>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">
                      Elevation: {calculateElevationSft(editingItemInfo.item.width, editingItemInfo.item.depth, editingItemInfo.item.height, editDimUnit).formula}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-gray-300 block mb-1">Width ({editDimUnit})</label>
                      <input
                        type="number"
                        step="0.01"
                        value={editingItemInfo.item.width || ''}
                        onChange={(e) => {
                          const w = parseFloat(e.target.value) || 0;
                          const calc = calculateElevationSft(w, editingItemInfo.item.depth, editingItemInfo.item.height, editDimUnit);
                          setEditingItemInfo({
                            ...editingItemInfo,
                            item: { ...editingItemInfo.item, width: w, sft: calc.sft }
                          });
                        }}
                        className="w-full bg-[#22201D] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-300 block mb-1">Depth ({editDimUnit})</label>
                      <input
                        type="number"
                        step="0.01"
                        value={editingItemInfo.item.depth || ''}
                        onChange={(e) => {
                          const d = parseFloat(e.target.value) || 0;
                          const calc = calculateElevationSft(editingItemInfo.item.width, d, editingItemInfo.item.height, editDimUnit);
                          setEditingItemInfo({
                            ...editingItemInfo,
                            item: { ...editingItemInfo.item, depth: d, sft: calc.sft }
                          });
                        }}
                        className="w-full bg-[#22201D] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-300 block mb-1">Height ({editDimUnit})</label>
                      <input
                        type="number"
                        step="0.01"
                        value={editingItemInfo.item.height || ''}
                        onChange={(e) => {
                          const h = parseFloat(e.target.value) || 0;
                          const calc = calculateElevationSft(editingItemInfo.item.width, editingItemInfo.item.depth, h, editDimUnit);
                          setEditingItemInfo({
                            ...editingItemInfo,
                            item: { ...editingItemInfo.item, height: h, sft: calc.sft }
                          });
                        }}
                        className="w-full bg-[#22201D] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Sft</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editingItemInfo.item.sft || ''}
                      onChange={(e) => setEditingItemInfo({
                        ...editingItemInfo,
                        item: { ...editingItemInfo.item, sft: parseFloat(e.target.value) || 0 }
                      })}
                      className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Rate (₹)</label>
                    <input
                      type="number"
                      value={editingItemInfo.item.rate || ''}
                      onChange={(e) => setEditingItemInfo({
                        ...editingItemInfo,
                        item: { ...editingItemInfo.item, rate: parseFloat(e.target.value) || 0 }
                      })}
                      className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Qty</label>
                    <input
                      type="number"
                      value={editingItemInfo.item.qty || 1}
                      onChange={(e) => setEditingItemInfo({
                        ...editingItemInfo,
                        item: { ...editingItemInfo.item, qty: parseFloat(e.target.value) || 1 }
                      })}
                      className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Unit</label>
                    <input
                      type="text"
                      value={editingItemInfo.item.unit || 'No'}
                      onChange={(e) => setEditingItemInfo({
                        ...editingItemInfo,
                        item: { ...editingItemInfo.item, unit: e.target.value }
                      })}
                      className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Fixed Footer */}
              <div className="p-4 border-t border-white/10 bg-[#1C1A17] flex items-center justify-end space-x-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingItemInfo(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#C5A059] hover:bg-[#b08e4d] text-[#121212] px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-lg transition-all active:scale-95"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FULL-SCREEN IMAGE LIGHTBOX PREVIEW */}
      {lightboxImg && (
        <div 
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-6 cursor-pointer"
        >
          <div className="max-w-4xl max-h-[90vh] relative flex flex-col items-center">
            <img 
              src={lightboxImg} 
              alt="3D Architectural Reference" 
              className="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl border-2 border-[#C5A059]/40"
            />
            <span className="mt-3 px-4 py-1.5 rounded-full bg-[#1C1A17] text-white text-xs border border-white/10 flex items-center space-x-2">
              <span className="text-[#C5A059] font-bold">Image (Only for reference)</span>
              <span>• Click anywhere to close</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
