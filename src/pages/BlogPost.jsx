import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Share2, ArrowRight, CheckCircle2, Send } from 'lucide-react';
import { blogArticles } from '../data/blogData';

export default function BlogPost() {
  const { slug } = useParams();
  const article = blogArticles.find(a => a.slug === slug) || blogArticles[0];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  const handleWhatsAppConsult = () => {
    const text = encodeURIComponent(
      `Hello SIRA SPACE Team!\n\n` +
      `I just read your article "${article.title}". I would like to consult with Ar. Sindhu Jain regarding my home interior requirements.`
    );
    window.open(`https://wa.me/918618870672?text=${text}`, '_blank');
  };

  return (
    <div className="bg-[#1C1A17] dark:bg-[#1C1A17] light:bg-[#FAF7F2] text-white dark:text-white light:text-[#1C1A17] pt-28 pb-24 min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* BACK BUTTON */}
        <Link 
          to="/blog"
          className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-[#C5A059] hover:underline uppercase mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO KNOWLEDGE HUB</span>
        </Link>

        {/* ARTICLE HEADER */}
        <div className="space-y-4 mb-8">
          <span className="bg-[#C5A059]/15 text-[#C5A059] text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded border border-[#C5A059]/30 inline-block">
            {article.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-white dark:text-white light:text-[#1C1A17] leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between text-xs text-[#CBCBCB] dark:text-[#CBCBCB] light:text-[#666666] pt-2 border-b border-white/10 dark:border-white/10 light:border-black/10 pb-6 gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center"><User className="w-4 h-4 mr-1.5 text-[#C5A059]" /> {article.author}</span>
              <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5 text-[#C5A059]" /> {article.date}</span>
              <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5 text-[#C5A059]" /> {article.readTime}</span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center space-x-1.5 text-xs text-[#C5A059] hover:underline"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* FEATURED IMAGE */}
        <div className="aspect-[16/9] rounded-xl overflow-hidden mb-12 border border-white/10 dark:border-white/10 light:border-black/10 shadow-2xl">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* SUMMARY LEAD */}
        <div className="bg-white/5 dark:bg-white/5 light:bg-black/5 border-l-4 border-[#C5A059] p-6 rounded-r-lg mb-12">
          <p className="font-serif italic text-base sm:text-lg text-white dark:text-white light:text-[#1C1A17] leading-relaxed">
            "{article.summary}"
          </p>
        </div>

        {/* ARTICLE BODY SECTIONS */}
        <div className="space-y-10 text-sm leading-relaxed text-[#CBCBCB] dark:text-[#CBCBCB] light:text-[#444444] font-light">
          {article.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="font-serif text-2xl text-white dark:text-white light:text-[#1C1A17] font-medium pt-2">
                {section.heading}
              </h2>
              {section.text && <p>{section.text}</p>}

              {/* TABLE IF PRESENT */}
              {section.table && (
                <div className="overflow-x-auto my-6 border border-white/10 dark:border-white/10 light:border-black/10 rounded-lg">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/5 dark:bg-white/5 light:bg-black/5 text-[#C5A059] uppercase font-bold tracking-wider">
                      <tr>
                        <th className="p-3.5 border-b border-white/10 dark:border-white/10 light:border-black/10">Configuration</th>
                        <th className="p-3.5 border-b border-white/10 dark:border-white/10 light:border-black/10">Essential Plan</th>
                        <th className="p-3.5 border-b border-white/10 dark:border-white/10 light:border-black/10">Standard Plan</th>
                        <th className="p-3.5 border-b border-white/10 dark:border-white/10 light:border-black/10">Premium Plan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 dark:divide-white/5 light:divide-black/5">
                      {section.table.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-white/[0.02]">
                          <td className="p-3.5 font-bold text-white dark:text-white light:text-[#1C1A17]">{row.config}</td>
                          <td className="p-3.5">{row.essential}</td>
                          <td className="p-3.5 text-[#C5A059] font-semibold">{row.standard}</td>
                          <td className="p-3.5 font-bold">{row.premium}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* BULLET POINTS IF PRESENT */}
              {section.points && (
                <div className="space-y-3 pl-2">
                  {section.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start space-x-3">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* BOTTOM ACTION CTA BOX */}
        <div className="mt-16 bg-[#121212] dark:bg-[#121212] light:bg-[#FFFFFF] border border-[#C5A059]/40 p-8 rounded-xl shadow-2xl space-y-6 text-center">
          <span className="text-[10px] tracking-widest text-[#C5A059] uppercase font-bold">
            HAVE QUESTIONS ABOUT YOUR FLOOR PLAN?
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-white dark:text-white light:text-[#1C1A17]">
            Discuss Your Budget with Ar. Sindhu Jain
          </h3>
          <p className="text-xs text-[#CBCBCB] dark:text-[#CBCBCB] light:text-[#666666] max-w-xl mx-auto font-light">
            Get an exact Bill of Quantities (BOQ), material grade verification, and customized 3D design walkthrough.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/inquire"
              className="w-full sm:w-auto bg-[#C5A059] hover:bg-[#C5A059]/90 text-[#121212] px-6 py-3.5 rounded text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-2"
            >
              <ArrowRight className="w-4 h-4" />
              <span>GET YOUR FREE QUOTE</span>
            </Link>
            <button
              onClick={handleWhatsAppConsult}
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3.5 rounded text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>CONSULT VIA WHATSAPP</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
