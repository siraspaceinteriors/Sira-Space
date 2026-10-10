import React, { useState } from 'react';
import { usePortal } from './PortalContext';
import { 
  FolderOpen, 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  FileSpreadsheet, 
  Camera, 
  Layers, 
  Trash2, 
  ExternalLink, 
  Download, 
  Copy, 
  Check, 
  Eye, 
  Search, 
  Plus, 
  HardDrive,
  FolderGit2
} from 'lucide-react';

export default function DocumentVault() {
  const { activeProject, addDocument, deleteDocument } = usePortal();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [newDocData, setNewDocData] = useState({
    title: '',
    category: 'drawings',
    filename: '',
    fileSize: '3.5 MB',
    previewUrl: ''
  });

  const categories = [
    { id: 'all', label: 'All Assets', icon: FolderGit2 },
    { id: 'drawings', label: '2D CAD & Drawings', icon: Layers },
    { id: 'renders', label: '3D Visual Renders', icon: ImageIcon },
    { id: 'site_photos', label: 'Site Inspection Photos', icon: Camera },
    { id: 'contracts', label: 'Contracts & Invoices', icon: FileText },
  ];

  const documents = activeProject.documents || [];

  const filteredDocs = documents.filter(doc => {
    const matchesCat = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.filename.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopyPath = (doc) => {
    const fullPath = `F:\\SIRA SPACE\\${doc.localPath.replace(/\//g, '\\')}`;
    navigator.clipboard.writeText(fullPath);
    setCopiedId(doc.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!newDocData.title || !newDocData.filename) return;

    const docId = 'doc-' + Date.now().toString().slice(-4);
    const localPath = `storage/projects/${activeProject.id}/${newDocData.category}/${newDocData.filename}`;

    addDocument(activeProject.id, {
      id: docId,
      title: newDocData.title,
      category: newDocData.category,
      filename: newDocData.filename,
      fileSize: newDocData.fileSize || '2.4 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      localPath,
      previewUrl: newDocData.previewUrl || ''
    });

    setShowUploadModal(false);
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'drawings': return <Layers className="w-5 h-5 text-blue-400" />;
      case 'renders': return <ImageIcon className="w-5 h-5 text-purple-400" />;
      case 'site_photos': return <Camera className="w-5 h-5 text-amber-400" />;
      case 'contracts': return <FileText className="w-5 h-5 text-emerald-400" />;
      default: return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* LOCAL VAULT HEADER */}
      <div className="p-6 rounded-2xl bg-[#22201D] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center space-x-2 text-[#C5A059] text-xs font-bold uppercase tracking-wider mb-2">
            <HardDrive className="w-4 h-4" />
            <span>Local Disk Architecture Storage</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-white">
            Project Document & Drawing Vault
          </h1>
          <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
            <span>Root Directory:</span>
            <code className="text-[#C5A059] bg-[#1C1A17] px-2 py-0.5 rounded font-mono text-[11px]">
              F:\SIRA SPACE\storage\projects\{activeProject.id}\
            </code>
          </div>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-[#C5A059] hover:bg-[#b08e4d] text-[#121212] px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-lg"
        >
          <Upload className="w-4 h-4" />
          <span>Upload File to Local Disk</span>
        </button>
      </div>

      {/* CATEGORY TABS & SEARCH */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count = cat.id === 'all' 
              ? documents.length 
              : documents.filter(d => d.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#C5A059] text-[#121212] font-bold shadow'
                    : 'bg-[#22201D] text-gray-300 hover:text-white border border-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isSelected ? 'bg-[#121212]/20 text-[#121212]' : 'bg-white/10 text-gray-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documents or CAD..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#22201D] border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#C5A059] w-full sm:w-64"
          />
        </div>
      </div>

      {/* DOCUMENTS GRID */}
      {filteredDocs.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#22201D] border border-white/5 space-y-3">
          <FolderOpen className="w-10 h-10 text-gray-500 mx-auto" />
          <h3 className="text-sm font-semibold text-gray-300">No documents found in this category</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Upload CAD drawings, 3D renders, or site photos to store them locally inside this project folder.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="group p-5 rounded-2xl bg-[#22201D] border border-white/5 hover:border-[#C5A059]/40 transition-all shadow-lg flex flex-col justify-between"
            >
              <div>
                {/* Visual Thumbnail if render/drawing preview exists */}
                {doc.previewUrl && (
                  <div 
                    onClick={() => setPreviewImage(doc.previewUrl)}
                    className="relative w-full h-40 rounded-xl overflow-hidden mb-4 bg-black/40 cursor-pointer group/img"
                  >
                    <img 
                      src={doc.previewUrl} 
                      alt={doc.title} 
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-[#1C1A17]/80 backdrop-blur text-white text-xs px-3 py-1.5 rounded-full flex items-center space-x-1.5">
                        <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>View Preview</span>
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 rounded-xl bg-[#1C1A17] border border-white/5">
                      {getCategoryIcon(doc.category)}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                        {doc.category.replace('_', ' ')}
                      </span>
                      <h3 className="text-sm font-semibold text-white leading-snug">
                        {doc.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="mt-3 p-3 rounded-xl bg-[#1C1A17] border border-white/5 space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-400">File:</span>
                    <span className="text-gray-200 font-mono truncate max-w-[160px]">{doc.filename}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-400">Size:</span>
                    <span className="text-gray-300">{doc.fileSize}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-400">Uploaded:</span>
                    <span className="text-gray-300">{doc.uploadDate}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleCopyPath(doc)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white py-2 px-3 rounded-xl text-xs font-medium flex items-center justify-center space-x-1.5 transition-all"
                  title="Copy path for AutoCAD / Windows Explorer"
                >
                  {copiedId === doc.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Copy Disk Path</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => deleteDocument(activeProject.id, doc.id)}
                  className="p-2 rounded-xl hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                  title="Remove Document"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* UPLOAD MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#22201D] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-xl font-serif font-bold text-white mb-1">Add Document to Local Vault</h3>
            <p className="text-xs text-gray-400 mb-5">
              Register files stored in <code className="text-[#C5A059]">F:\SIRA SPACE\storage\</code>
            </p>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-gray-300 block mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Bedroom 3D Concept Rev 2"
                  value={newDocData.title}
                  onChange={(e) => setNewDocData({ ...newDocData, title: e.target.value })}
                  className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Category</label>
                <select
                  value={newDocData.category}
                  onChange={(e) => setNewDocData({ ...newDocData, category: e.target.value })}
                  className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="drawings">2D CAD & Architectural Layouts</option>
                  <option value="renders">3D Photorealistic Renders</option>
                  <option value="site_photos">Site Photos & Survey Logs</option>
                  <option value="contracts">Contracts, Invoices & BOQ</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Filename on Disk *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master_Bed_Elevation.dwg or photo.jpg"
                  value={newDocData.filename}
                  onChange={(e) => setNewDocData({ ...newDocData, filename: e.target.value })}
                  className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Preview Image URL (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. /bedroom.jpg, /kitchen.jpg"
                  value={newDocData.previewUrl}
                  onChange={(e) => setNewDocData({ ...newDocData, previewUrl: e.target.value })}
                  className="w-full bg-[#1C1A17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#C5A059] hover:bg-[#b08e4d] text-[#121212] px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Save to Vault
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
