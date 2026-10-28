import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  ArrowRight, 
  Download, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  FileText,
  Sparkles,
  Tag
} from 'lucide-react';
import { blogData } from '../data/siteData';

export default function Blog() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [guideData, setGuideData] = useState({ name: '', phone: '', email: '' });
  const [guideDownloaded, setGuideDownloaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Modular Kitchens',
    'Living Room Design',
    'Wardrobe & Bedroom',
    'Pricing & Budgeting',
    'Vastu & Space Planning',
    'Material Science'
  ];

  const filteredArticles = activeCategory === 'All'
    ? blogData
    : blogData.filter(a => a.category === activeCategory);

  const handleDownload = (e) => {
    e.preventDefault();
    setGuideDownloaded(true);
  };

  return (
    <div className="bg-[#1C1A17] text-white pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <span className="text-xs tracking-[0.3em] text-[#C5A059] uppercase font-bold block mb-2">
            DESIGN INTELLIGENCE & LOOKBOOKS
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium">
            SIRA Knowledge Hub
          </h1>
          <p className="text-sm text-[#CBCBCB]/80 mt-5 font-light leading-relaxed">
            Trending interior design concepts, Livspace design benchmarks, material grading blueprints, and realistic cost breakdowns written by Founder & Civil Engineer <strong>Sindhu Jain M S</strong>.
          </p>
        </div>

        {/* FEATURED LEAD MAGNET BANNER (DOWNLOAD LOOKBOOK) */}
        <div className="bg-[#121212] border border-[#C5A059]/40 rounded-xl p-8 md:p-10 mb-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-4 max-w-2xl">
            <span className="bg-[#C5A059]/20 text-[#C5A059] text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase border border-[#C5A059]/30">
              FREE 2026 HOMEOWNER RESOURCE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white">
              The 2026 SIRA Space Interior Planning Lookbook & Checklist
            </h2>
            <p className="text-xs text-[#CBCBCB]/80 font-light leading-relaxed">
              Includes our 45-point site measurement checklist, kitchen work triangle templates, genuine plywood grade cheat-sheet (BWR vs BWP), Vastu orientation matrices, and realistic budgeting worksheets.
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <button
              onClick={() => setDownloadModalOpen(true)}
              className="w-full md:w-auto bg-[#C5A059] hover:bg-[#C5A059]/90 text-[#121212] px-8 py-4 rounded font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center space-x-2 shadow-xl hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD FREE LOOKBOOK</span>
            </button>
          </div>
        </div>

        {/* CATEGORY FILTER PILLS */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-[#C5A059] text-[#121212] font-bold shadow'
                  : 'bg-white/5 hover:bg-white/10 text-[#CBCBCB] hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ARTICLES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredArticles.map((article) => (
            <Link 
              key={article.id}
              to={`/blog/${article.slug}`}
              className="bg-[#121212] border border-white/10 rounded-xl overflow-hidden hover:border-[#C5A059] transition-all flex flex-col group cursor-pointer shadow-xl hover:-translate-y-1.5"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-85" />
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <span className="bg-[#121212]/90 backdrop-blur-md text-[#C5A059] text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded border border-white/10">
                    {article.category}
                  </span>
                  {article.tag && (
                    <span className="bg-[#C5A059] text-[#121212] text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded">
                      {article.tag}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-3 text-[10px] text-[#CBCBCB]/60 mb-2">
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1 text-[#C5A059]" /> {article.date}</span>
                    <span>•</span>
                    <span className="flex items-center"><Clock className="w-3 h-3 mr-1 text-[#C5A059]" /> {article.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl text-white group-hover:text-[#C5A059] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#CBCBCB]/80 font-light mt-3 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#C5A059] font-bold tracking-wider">
                  <span>READ FULL GUIDE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* DOWNLOAD MODAL */}
        {downloadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
            <div className="bg-[#121212] border border-white/10 text-white w-full max-w-md rounded-xl p-8 relative shadow-2xl">
              <button
                onClick={() => {
                  setDownloadModalOpen(false);
                  setGuideDownloaded(false);
                }}
                className="absolute top-4 right-4 text-[#CBCBCB] hover:text-white text-lg font-bold"
              >
                ✕
              </button>

              {guideDownloaded ? (
                <div className="text-center py-6 space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-[#C5A059] mx-auto" />
                  <h3 className="font-serif text-2xl">Lookbook Sent!</h3>
                  <p className="text-xs text-[#CBCBCB]">
                    We've emailed the <strong>2026 Interior Planning Lookbook & Checklist</strong> directly to {guideData.email}.
                  </p>
                  <button
                    onClick={() => {
                      setDownloadModalOpen(false);
                      setGuideDownloaded(false);
                    }}
                    className="w-full bg-[#C5A059] text-[#121212] py-3 rounded font-bold text-xs uppercase tracking-wider"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div>
                  <span className="text-[10px] tracking-widest text-[#C5A059] uppercase font-bold block mb-1">FREE INSTANT DOWNLOAD</span>
                  <h3 className="font-serif text-2xl mb-2">Get the 2026 Lookbook</h3>
                  <p className="text-xs text-[#CBCBCB] mb-6">Enter your details to receive our 45-point interior inspection guide and pricing sheet.</p>

                  <form onSubmit={handleDownload} className="space-y-4">
                    <div>
                      <label className="text-[10px] text-[#CBCBCB] uppercase font-bold block mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={guideData.name}
                        onChange={(e) => setGuideData({ ...guideData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[#CBCBCB] uppercase font-bold block mb-1">WhatsApp Mobile</label>
                      <input
                        type="tel"
                        required
                        value={guideData.phone}
                        onChange={(e) => setGuideData({ ...guideData, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[#CBCBCB] uppercase font-bold block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={guideData.email}
                        onChange={(e) => setGuideData({ ...guideData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                        placeholder="john@example.com"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#C5A059] text-[#121212] py-3.5 rounded font-bold text-xs uppercase tracking-widest transition-all hover:bg-[#C5A059]/90 mt-2"
                    >
                      SEND LOOKBOOK (PDF)
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
