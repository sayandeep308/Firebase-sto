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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/', icon: Sparkles },
    { label: 'All Categories', path: '/categories', icon: Layers },
    { label: 'Products Catalog', path: '/products', icon: ShoppingBag },
    { label: 'Craft Journal & Blog', path: '/blog', icon: BookOpen },
    { label: 'Custom Enquiry', path: '/contact', icon: Mail },
  ];

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const rawPhone = settings?.phoneNumber || '+91 93821 76969';
  const mapsUrl = settings?.mapsUrl || 'https://share.google/NJPhQEXIVloDifYAW';
  const addressText = settings?.address || 'Madpur Station Bajar';

  return (
    <header className="sticky top-0 z-40 bg-[#5B4632] text-[#FAF6F0] shadow-lg border-b border-[#F4D9A0]/25 transition-all">
      {/* Top micro bar for location, maps & concierge */}
      <div className="bg-[#463525] text-xs py-1.5 px-4 border-b border-[#F4D9A0]/15">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[#F4D9A0]/90">
          <div className="flex items-center gap-4">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              title="Open Google Maps location"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C8792C]" />
              <span className="font-medium underline decoration-dotted">{addressText}</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={`https://wa.me/919382176969`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#F4D9A0]" />
              <span>WhatsApp / Call: {rawPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <TilakLogo size="md" className="group-hover:scale-105 transition-transform duration-300" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#FAF6F0] group-hover:text-[#F4D9A0] transition-colors">
                  Satarupa <span className="text-[#F4D9A0]">Steel Enterprise</span>
                </span>
              </div>
              <p className="text-[10px] tracking-widest uppercase text-[#F4D9A0]/80 font-medium">
                Madpur Station Bajar &bull; Stainless Steel &bull; Aluminium &bull; Interior
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                currentPath === link.path ||
                (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`px-3.5 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#F4D9A0] bg-[#463525] shadow-inner border border-[#F4D9A0]/30 font-semibold'
                      : 'text-[#FAF6F0]/90 hover:text-[#F4D9A0] hover:bg-[#6B523B]/50'
                  }`}
                >
                  <link.icon className={`w-4 h-4 ${isActive ? 'text-[#F4D9A0]' : 'text-[#F4D9A0]/60'}`} />
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                aria-label="Search showcase products"
                className="p-2.5 rounded-lg bg-[#463525] border border-[#F4D9A0]/30 text-[#F4D9A0] hover:border-[#C8792C] hover:text-white transition-all cursor-pointer"
                title="Search showcase items"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => handleNav('/contact')}
              className="hidden sm:inline-flex btn-gold-pill text-xs sm:text-sm px-5 py-2.5 font-bold tracking-wide"
            >
              Get Custom Quote
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="lg:hidden p-2 rounded-lg bg-[#463525] border border-[#F4D9A0]/40 text-[#F4D9A0] hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Slide-out Mobile Drawer (Admin link strictly excluded) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Menu */}
          <div className="relative ml-auto w-full max-w-xs bg-[#5B4632] text-[#FAF6F0] h-full shadow-2xl flex flex-col z-10 border-l border-[#F4D9A0]/30 overflow-y-auto">
            <div className="p-4 border-b border-[#F4D9A0]/20 flex items-center justify-between bg-[#463525]">
              <div className="flex items-center gap-2">
                <TilakLogo size="sm" />
                <span className="font-serif font-bold text-base text-[#F4D9A0]">Satarupa Steel</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-1.5 rounded-md text-[#F4D9A0] hover:bg-[#6B523B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 flex flex-col gap-1">
              <span className="text-[11px] font-bold tracking-wider text-[#F4D9A0]/70 uppercase px-3 py-1">
                Navigation
              </span>
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm text-left font-medium transition-colors ${
                    currentPath === link.path
                      ? 'bg-[#463525] text-[#F4D9A0] font-semibold border border-[#F4D9A0]/30'
                      : 'hover:bg-[#6B523B]/60 text-white'
                  }`}
                >
                  <link.icon className="w-4 h-4 text-[#F4D9A0]" />
                  <span>{link.label}</span>
                </button>
              ))}

              <div className="my-2 border-t border-[#F4D9A0]/20" />

              <span className="text-[11px] font-bold tracking-wider text-[#F4D9A0]/70 uppercase px-3 py-1">
                Browse Categories
              </span>
              <div className="flex flex-col gap-0.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleNav(`/products?category=${cat.slug}`)}
                    className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs text-left hover:bg-[#6B523B]/60 text-[#FAF6F0]/90 hover:text-[#F4D9A0] transition-colors"
                  >
                    <span>{cat.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#F4D9A0]/50" />
                  </button>
                ))}
              </div>

              <div className="my-2 border-t border-[#F4D9A0]/20" />

              {/* Location info */}
              <div className="p-3 rounded-lg bg-[#463525] border border-[#F4D9A0]/20 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#F4D9A0] font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#C8792C]" />
                  <span>{addressText}</span>
                </div>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#FAF6F0]/80 underline flex items-center gap-1 hover:text-[#F4D9A0]"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="mt-4 pt-2">
                <button
                  onClick={() => handleNav('/contact')}
                  className="w-full btn-gold-pill py-3 text-sm font-bold"
                >
                  Custom Project Enquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
