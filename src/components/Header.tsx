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
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  Grid,
} from 'lucide-react';
import { Category, SiteSettings } from '../types';
import { TilakLogo } from './TilakLogo';
import { LuxuryButton } from './LuxuryButton';

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
  const [categoriesAccordionOpen, setCategoriesAccordionOpen] = useState(true);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* 1. Minimal Brand: Tilak Logo + Just "Satarupa Enterprise" */}
          <div
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <TilakLogo size="md" className="group-hover:scale-105 transition-transform duration-300" />
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#FAF6F0] group-hover:text-[#F4D9A0] transition-colors leading-none">
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
                  className={`px-3.5 py-2 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 cursor-pointer min-h-[44px] flex items-center ${
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

          {/* 3. Controls & Global 3-Line Hamburger Menu */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Search Trigger */}
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                aria-label="Search showcase products"
                className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 border border-[#F4D9A0]/30 text-[#F4D9A0] hover:text-white transition-all cursor-pointer flex items-center justify-center min-w-[44px] min-h-[44px]"
                title="Search items"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Custom Quote Button with LuxuryButton */}
            <div className="hidden sm:inline-flex">
              <LuxuryButton
                variant="burnt-amber"
                shape="compact"
                size="sm"
                onClick={() => handleNav('/contact')}
              >
                Get Quote
              </LuxuryButton>
            </div>

            {/* Global 3-Line Hamburger Menu Button (icon-square 3D gold-rimmed style) */}
            <LuxuryButton
              variant="burnt-amber"
              shape="icon-square"
              onClick={() => setMenuDrawerOpen(true)}
              title="Open Navigation Menu"
              ariaLabel="Open Navigation Menu"
              className="shrink-0"
            >
              <Menu className="w-5 h-5 text-[#FFF8EA]" />
            </LuxuryButton>
          </div>
        </div>
      </div>

      {/* Comprehensive "All Sections" Slide-Out Directory Drawer */}
      {menuDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMenuDrawerOpen(false)}
          />

          {/* Directory Drawer Panel */}
          <div className="relative w-full max-w-md bg-[#241B17] text-[#FAF6F0] h-screen shadow-2xl flex flex-col z-10 border-l border-[#F4D9A0]/25 overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-[#F4D9A0]/20 flex items-center justify-between bg-[#2C211C] sticky top-0 z-20">
              <div
                onClick={() => handleNav('/')}
                className="flex items-center gap-3 cursor-pointer group select-none"
              >
                <TilakLogo size="sm" />
                <span className="font-serif font-bold text-lg text-[#FAF6F0] group-hover:text-[#F4D9A0] transition-colors">
                  Satarupa <span className="text-[#F4D9A0]">Enterprise</span>
                </span>
              </div>
              <LuxuryButton
                variant="dark-espresso"
                shape="icon-square"
                onClick={() => setMenuDrawerOpen(false)}
                title="Close directory menu"
                ariaLabel="Close directory menu"
                className="!w-9 !h-9 !min-w-[36px] !min-h-[36px]"
              >
                <X className="w-4 h-4 text-[#F4D9A0]" />
              </LuxuryButton>
            </div>

            <div className="p-4 sm:p-6 space-y-6">
              {/* Search Quick Action */}
              {onOpenSearch && (
                <button
                  onClick={() => {
                    setMenuDrawerOpen(false);
                    onOpenSearch();
                  }}
                  className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-[#F4D9A0]/25 text-left text-xs text-[#FAF6F0]/80 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-[#F4D9A0]" />
                    <span>Search Mandirs, Railings, Partitions, Ceilings...</span>
                  </span>
                  <span className="text-[10px] text-[#F4D9A0] uppercase font-semibold">Search</span>
                </button>
              )}

              {/* Page Links: 1. Home, 2. Products, 4. Blog, 5. Contact */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F4D9A0]/70 block px-2 mb-1.5">
                  Main Navigation
                </span>

                {/* 1. Home */}
                <button
                  onClick={() => handleNav('/')}
                  className={`w-full min-h-[44px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-left font-medium transition-colors cursor-pointer ${
                    currentPath === '/'
                      ? 'bg-[#3A2D24] text-[#F4D9A0] font-semibold border border-[#F4D9A0]/30'
                      : 'hover:bg-white/5 text-[#FAF6F0]'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-[#F4D9A0]" />
                  <span>1. Home Showcase</span>
                </button>

                {/* 2. All Products Catalog */}
                <button
                  onClick={() => handleNav('/products')}
                  className={`w-full min-h-[44px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-left font-medium transition-colors cursor-pointer ${
                    currentPath.startsWith('/products') && !currentPath.includes('category=')
                      ? 'bg-[#3A2D24] text-[#F4D9A0] font-semibold border border-[#F4D9A0]/30'
                      : 'hover:bg-white/5 text-[#FAF6F0]'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 text-[#F4D9A0]" />
                  <span>2. All Products Catalog</span>
                </button>

                {/* 3. Categories Hub with Expandable Accordion */}
                <div className="rounded-xl border border-[#F4D9A0]/20 bg-white/5 overflow-hidden">
                  <div className="flex items-center justify-between p-3.5 min-h-[44px]">
                    <button
                      onClick={() => handleNav('/categories')}
                      className="flex items-center gap-3 text-sm text-left font-medium text-[#FAF6F0] hover:text-[#F4D9A0] transition-colors cursor-pointer flex-1"
                    >
                      <Layers className="w-4 h-4 text-[#F4D9A0]" />
                      <span>3. Categories Hub</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#3A2D24] text-[#F4D9A0] font-bold">
                        {categories.length}
                      </span>
                    </button>
                    <button
                      onClick={() => setCategoriesAccordionOpen(!categoriesAccordionOpen)}
                      aria-label="Toggle categories accordion"
                      className="p-1 rounded-md text-[#F4D9A0] hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      {categoriesAccordionOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Expandable Categories Accordion */}
                  {categoriesAccordionOpen && (
                    <div className="px-3 pb-3 pt-1 border-t border-white/5 space-y-1.5 animate-fadeIn">
                      {categories.map((cat) => (
                        <div
                          key={cat.id}
                          className="rounded-lg p-2.5 bg-[#1F1713] border border-[#F4D9A0]/10 hover:border-[#F4D9A0]/30 transition-all"
                        >
                          <button
                            onClick={() => handleNav(`/products?category=${cat.slug}`)}
                            className="w-full min-h-[36px] flex items-center justify-between text-left group cursor-pointer"
                          >
                            <span className="font-serif font-bold text-xs sm:text-sm text-[#FAF6F0] group-hover:text-[#F4D9A0] transition-colors">
                              {cat.name}
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-[#F4D9A0]/60 group-hover:translate-x-1 transition-transform" />
                          </button>

                          {/* Nested Subcategories */}
                          {cat.subcategories && cat.subcategories.length > 0 && (
                            <div className="mt-1.5 flex flex-wrap gap-1 pt-1.5 border-t border-white/5">
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
                                  className="text-[10px] px-2 py-0.5 rounded-md bg-[#2D211A] hover:bg-[#F4D9A0] text-[#F4D9A0] hover:text-[#221302] transition-colors cursor-pointer"
                                >
                                  {sub}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. SEO Blogs */}
                <button
                  onClick={() => handleNav('/blog')}
                  className={`w-full min-h-[44px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-left font-medium transition-colors cursor-pointer ${
                    currentPath.startsWith('/blog')
                      ? 'bg-[#3A2D24] text-[#F4D9A0] font-semibold border border-[#F4D9A0]/30'
                      : 'hover:bg-white/5 text-[#FAF6F0]'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-[#F4D9A0]" />
                  <span>4. SEO Blogs &amp; Craft Journal</span>
                </button>

                {/* 5. Contact / Custom Enquiry */}
                <button
                  onClick={() => handleNav('/contact')}
                  className={`w-full min-h-[44px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-left font-medium transition-colors cursor-pointer ${
                    currentPath === '/contact'
                      ? 'bg-[#3A2D24] text-[#F4D9A0] font-semibold border border-[#F4D9A0]/30'
                      : 'hover:bg-white/5 text-[#FAF6F0]'
                  }`}
                >
                  <Mail className="w-4 h-4 text-[#F4D9A0]" />
                  <span>5. Contact &amp; Custom Enquiry</span>
                </button>
              </div>

              {/* Workshop & Direct Concierge */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-[#F4D9A0]/20 space-y-2.5">
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

              {/* Bespoke Quote CTA */}
              <div className="pt-1">
                <LuxuryButton
                  variant="burnt-amber"
                  shape="wide"
                  size="md"
                  onClick={() => handleNav('/contact')}
                  className="w-full min-h-[44px]"
                >
                  Request Bespoke Quotation
                </LuxuryButton>
              </div>

              {/* 6. Admin Panel (Clearly visible link/button at the bottom for instant access) */}
              <div className="pt-2 border-t border-[#F4D9A0]/20">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#F4D9A0]/70 mb-2 px-1">
                  Atelier Control
                </div>
                <LuxuryButton
                  variant="dark-espresso"
                  shape="wide"
                  size="md"
                  onClick={() => handleNav('/admin')}
                  className="w-full flex items-center justify-center gap-2 border border-[#D4A359] min-h-[44px]"
                  icon={<ShieldCheck className="w-4 h-4 text-[#F4D9A0]" />}
                >
                  6. Open Admin Panel
                </LuxuryButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
