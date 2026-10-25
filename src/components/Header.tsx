import React, { useState } from 'react';
import {
  Menu,
  X,
  Search,
  Sparkles,
  Phone,
  Layers,
  ShoppingBag,
  BookOpen,
  Mail,
  MapPin,
  ChevronRight,
  ExternalLink,
  Flame,
  ArrowRight,
  Grid,
} from 'lucide-react';
import { Category, SiteSettings } from '../types';
import { TilakLogo } from './TilakLogo';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  categories: Category[];
  settings?: SiteSettings | null;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  categories,
  settings,
  onOpenSearch,
}) => {
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);

  const handleNav = (path: string) => {
    onNavigate(path);
    setMenuDrawerOpen(false);
  };

  const rawPhone = settings?.phoneNumber || '+91 93821 76969';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '') || '919382176969';
  const mapsUrl = settings?.mapsUrl || 'https://share.google/NJPhQEXIVloDifYAW';
  const addressText = settings?.address || 'Madpur Station Bajar';

  // 5 Core Product Streams for the minimal desktop bar
  const mainStreams = [
    { label: 'Puja Mandirs', slug: 'puja-corner' },
    { label: 'Stainless Steel', slug: 'stainless-steel-items' },
    { label: 'Aluminium', slug: 'aluminium-items' },
    { label: 'Ceilings & Rafters', slug: 'ceiling-customisation' },
    { label: 'Furniture & Wood', slug: 'furniture-and-furnishings' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#251C17] text-[#FAF6F0] border-b border-[#F4D9A0]/20 shadow-md">
      {/* Sleek, Minimal Single-Tier Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 backdrop-blur-md">
        <div className="flex items-center justify-between h-20">
          
          {/* 1. Minimal Brand: Tilak Logo + Just "Satarupa Enterprise" */}
          <div
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <TilakLogo size="md" className="group-hover:scale-105 transition-transform duration-300" />
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#FAF6F0] group-hover:text-[#F4D9A0] transition-colors leading-none">
                Satarupa <span className="text-[#F4D9A0]">Enterprise</span>
              </span>
            </div>
          </div>

          {/* 2. Main Product Streams (Clean, Centered on Desktop) */}
          <nav
            className="hidden lg:flex items-center space-x-1 xl:space-x-2"
            aria-label="Main Product Streams Navigation"
          >
            {mainStreams.map((stream) => {
              const streamPath = `/products?category=${stream.slug}`;
              const isActive = currentPath === streamPath;

              return (
                <button
                  key={stream.slug}
                  onClick={() => handleNav(streamPath)}
                  className={`px-3.5 py-2 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#221302] bg-[#F4D9A0] font-bold shadow-xs'
                      : 'text-[#FAF6F0]/90 hover:text-[#F4D9A0] hover:bg-white/5'
                  }`}
                >
                  {stream.label}
                </button>
              );
            })}
          </nav>

          {/* 3. Controls & "The 3 Lines" (Where anyone can find all sections) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Search Trigger */}
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                aria-label="Search showcase products"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-[#F4D9A0]/30 text-[#F4D9A0] hover:text-white transition-all cursor-pointer"
                title="Search items"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Custom Quote Button with Golden Mirror Finish Edge */}
            <button
              onClick={() => handleNav('/contact')}
              className="hidden sm:inline-flex btn-gold-pill text-xs px-4 py-2 font-bold tracking-wide"
            >
              Get Quote
            </button>

            {/* The 3 Lines Menu Button (All Sections Directory Trigger) */}
            <button
              onClick={() => setMenuDrawerOpen(true)}
              aria-label="Open All Sections Menu"
              className="group flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-full bg-[#3A2D24] hover:bg-[#4E3D31] border border-[#F4D9A0]/40 hover:border-[#F4D9A0] text-[#F4D9A0] transition-all cursor-pointer shadow-sm"
              title="Browse all sections & categories"
            >
              <Menu className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline text-xs font-bold tracking-wider uppercase text-[#FAF6F0] group-hover:text-[#F4D9A0]">
                All Sections
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Comprehensive "All Sections" Slide-Out Directory Drawer */}
      {menuDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMenuDrawerOpen(false)}
          />

          {/* Directory Drawer Panel */}
          <div className="relative w-full max-w-md bg-[#241B17] text-[#FAF6F0] h-screen shadow-2xl flex flex-col z-10 border-l border-[#F4D9A0]/25 overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#F4D9A0]/20 flex items-center justify-between bg-[#2C211C] sticky top-0 z-20">
              <div
                onClick={() => handleNav('/')}
                className="flex items-center gap-3 cursor-pointer group select-none"
              >
                <TilakLogo size="sm" />
                <span className="font-serif font-bold text-lg text-[#FAF6F0] group-hover:text-[#F4D9A0] transition-colors">
                  Satarupa <span className="text-[#F4D9A0]">Enterprise</span>
                </span>
              </div>
              <button
                onClick={() => setMenuDrawerOpen(false)}
                aria-label="Close directory menu"
                className="p-2 rounded-full text-[#F4D9A0] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-7">
              {/* Search Quick Action */}
              {onOpenSearch && (
                <button
                  onClick={() => {
                    setMenuDrawerOpen(false);
                    onOpenSearch();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-[#F4D9A0]/25 text-left text-xs text-[#FAF6F0]/80 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-[#F4D9A0]" />
                    <span>Search Mandirs, Railings, Partitions, Ceilings...</span>
                  </span>
                  <span className="text-[10px] text-[#F4D9A0] uppercase font-semibold">Search</span>
                </button>
              )}

              {/* Section 1: All Product Streams & Categories */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F4D9A0] flex items-center gap-1.5">
                    <Grid className="w-3.5 h-3.5 text-[#C8792C]" />
                    <span>Main Product Streams ({categories.length})</span>
                  </span>
                  <button
                    onClick={() => handleNav('/categories')}
                    className="text-[11px] text-[#F4D9A0]/80 hover:text-[#F4D9A0] underline"
                  >
                    View All Hub
                  </button>
                </div>

                <div className="space-y-1.5">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="rounded-xl p-3 bg-white/5 hover:bg-white/10 border border-[#F4D9A0]/15 hover:border-[#F4D9A0]/40 transition-all"
                    >
                      <button
                        onClick={() => handleNav(`/products?category=${cat.slug}`)}
                        className="w-full flex items-center justify-between text-left group cursor-pointer"
                      >
                        <span className="font-serif font-bold text-sm text-[#FAF6F0] group-hover:text-[#F4D9A0] transition-colors">
                          {cat.name}
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#F4D9A0]/60 group-hover:translate-x-1 transition-transform" />
                      </button>

                      {/* Nested subcategory tags */}
                      {cat.subcategories && cat.subcategories.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                          {cat.subcategories.slice(0, 4).map((sub) => (
                            <button
                              key={sub}
                              onClick={() =>
                                handleNav(
                                  `/products?category=${cat.slug}&subcategory=${encodeURIComponent(
                                    sub
                                  )}`
                                )
                              }
                              className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#3A2D24] hover:bg-[#F4D9A0] text-[#F4D9A0] hover:text-[#221302] transition-colors cursor-pointer"
                            >
                              {sub}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Explore All Sections */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F4D9A0] block mb-3 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#C8792C]" />
                  <span>Key Site Sections</span>
                </span>
                <div className="grid grid-cols-1 gap-1">
                  <button
                    onClick={() => handleNav('/')}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm text-left font-medium hover:bg-white/10 transition-colors cursor-pointer text-[#FAF6F0]"
                  >
                    <Sparkles className="w-4 h-4 text-[#F4D9A0]" />
                    <span>Home Showcase</span>
                  </button>

                  <button
                    onClick={() => handleNav('/products')}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm text-left font-medium hover:bg-white/10 transition-colors cursor-pointer text-[#FAF6F0]"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#F4D9A0]" />
                    <span>Complete Product Catalog &amp; Filter</span>
                  </button>

                  <button
                    onClick={() => handleNav('/products?mostSelling=1')}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm text-left font-medium hover:bg-white/10 transition-colors cursor-pointer text-[#FAF6F0]"
                  >
                    <Flame className="w-4 h-4 text-[#C8792C]" />
                    <span>Most Selling Architectural Pieces</span>
                  </button>

                  <button
                    onClick={() => handleNav('/categories')}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm text-left font-medium hover:bg-white/10 transition-colors cursor-pointer text-[#FAF6F0]"
                  >
                    <Layers className="w-4 h-4 text-[#F4D9A0]" />
                    <span>Categories Overview Hub</span>
                  </button>

                  <button
                    onClick={() => handleNav('/blog')}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm text-left font-medium hover:bg-white/10 transition-colors cursor-pointer text-[#FAF6F0]"
                  >
                    <BookOpen className="w-4 h-4 text-[#F4D9A0]" />
                    <span>Craft Journal &amp; Architectural Blog</span>
                  </button>

                  <button
                    onClick={() => handleNav('/contact')}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm text-left font-medium hover:bg-white/10 transition-colors cursor-pointer text-[#FAF6F0]"
                  >
                    <Mail className="w-4 h-4 text-[#F4D9A0]" />
                    <span>Custom Project Consultation</span>
                  </button>
                </div>
              </div>

              {/* Section 3: Workshop & Direct Concierge */}
              <div className="p-4 rounded-xl bg-white/5 border border-[#F4D9A0]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F4D9A0]">
                    Workshop &amp; Showroom
                  </span>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#F4D9A0] underline flex items-center gap-1"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-[#FAF6F0]/90">
                  <MapPin className="w-4 h-4 text-[#C8792C] shrink-0 mt-0.5" />
                  <span>{addressText}</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-[#FAF6F0]/90">
                  <Phone className="w-4 h-4 text-[#F4D9A0] shrink-0" />
                  <a href={`https://wa.me/${cleanPhone}`} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                    {rawPhone}
                  </a>
                </div>
              </div>

              {/* Direct Quote Action */}
              <div className="pt-2">
                <button
                  onClick={() => handleNav('/contact')}
                  className="w-full btn-gold-pill py-3.5 text-sm font-bold shadow-lg"
                >
                  Request Bespoke Quotation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
