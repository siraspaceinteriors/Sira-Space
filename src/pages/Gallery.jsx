import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Filter, Sparkles, Building, Home as HomeIcon } from 'lucide-react';
import { projectsData } from '../data/projectsData';

export default function Gallery() {
  const [cityFilter, setCityFilter] = useState('all');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [bhkFilter, setBhkFilter] = useState('all');

  const cities = ['all', 'Bengaluru', 'Mysuru', 'Tumkur', 'Davangere'];
  const sectors = ['all', 'Residential', 'Commercial'];
  const bhkOptions = ['all', '2 BHK', '3 BHK', '4 BHK / Villa', 'Commercial'];

  const filteredProjects = projectsData.filter((project) => {
    const matchesCity = cityFilter === 'all' || project.city.toLowerCase() === cityFilter.toLowerCase();
    const matchesSector = sectorFilter === 'all' || project.type.toLowerCase() === sectorFilter.toLowerCase();
    const matchesBhk = bhkFilter === 'all' || project.bhk.includes(bhkFilter) || (bhkFilter === 'Commercial' && project.type === 'Commercial');
    return matchesCity && matchesSector && matchesBhk;
  });

  return (
    <div className="bg-[#1C1A17] text-white pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="mb-12">
          <span className="text-xs tracking-[0.3em] text-[#C5A059] uppercase font-bold block mb-2">
            02 // CURATED SPATIAL ARCHITECTURE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium text-white">
            Executed Projects & Case Studies
          </h1>
          <p className="text-sm text-[#CBCBCB]/80 max-w-2xl mt-4 font-light leading-relaxed">
            Explore turnkey residential and commercial projects delivered across Karnataka, each designed to narrate the unique lifestyle of its occupants.
          </p>
        </div>

        {/* MULTI-FACET FILTER CONTROLS */}
        <div className="bg-[#121212] border border-white/10 rounded-xl p-6 mb-12 space-y-5 shadow-xl">
          
          {/* SECTOR TABS */}
          <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
            <span className="text-[11px] uppercase tracking-wider text-[#C5A059] font-bold mr-2">Sector:</span>
            {sectors.map(sec => (
              <button
                key={sec}
                onClick={() => setSectorFilter(sec)}
                className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                  sectorFilter === sec
                    ? 'bg-[#C5A059] text-[#121212] font-bold'
                    : 'bg-white/5 text-[#CBCBCB] hover:text-white border border-white/5'
                }`}
              >
                {sec === 'all' ? 'All Sectors' : sec}
              </button>
            ))}
          </div>

          {/* CITY TABS */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-[#CBCBCB] font-semibold mr-2 flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1 text-[#C5A059]" /> City:
            </span>
            {cities.map(cityName => (
              <button
                key={cityName}
                onClick={() => setCityFilter(cityName)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                  cityFilter === cityName
                    ? 'bg-white text-[#121212] font-bold'
                    : 'bg-white/5 text-[#CBCBCB] hover:text-white border border-white/5'
                }`}
              >
                {cityName === 'all' ? 'All Karnataka Cities' : cityName}
              </button>
            ))}
          </div>

        </div>

        {/* PROJECTS GRID */}
        {filteredProjects.length === 0 ? (
          <div className="bg-[#121212] border border-white/10 rounded-xl p-12 text-center text-[#CBCBCB]">
            <p className="text-sm">No projects matching your current filter criteria.</p>
            <button
              onClick={() => { setCityFilter('all'); setSectorFilter('all'); setBhkFilter('all'); }}
              className="mt-4 text-xs font-bold text-[#C5A059] uppercase tracking-wider underline"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className="group bg-[#121212] border border-white/10 rounded-xl overflow-hidden hover:border-[#C5A059] transition-all flex flex-col shadow-xl"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-85" />
                  
                  {/* BADGES */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-[#121212]/90 backdrop-blur-md text-[#C5A059] text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded border border-white/10">
                      {project.packageTier} PLAN
                    </span>
                    <span className="bg-white/10 backdrop-blur-md text-white text-[9px] uppercase tracking-wider font-medium px-2 py-1 rounded border border-white/10">
                      {project.city}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] tracking-widest text-[#C5A059] uppercase font-bold block mb-1">
                      {project.category}
                    </span>
                    <h3 className="font-serif text-xl font-medium text-white group-hover:text-[#C5A059] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-[#CBCBCB]/80 font-light line-clamp-2 leading-relaxed">
                    {project.overview}
                  </p>

                  <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[11px] text-[#CBCBCB]">
                    <span>{project.sqFt} • {project.bhk}</span>
                    <span className="text-[#C5A059] font-bold group-hover:translate-x-1 transition-transform flex items-center">
                      <span>VIEW SPECS</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
