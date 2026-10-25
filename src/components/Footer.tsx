import React from 'react';
import { Sparkles, Phone, Mail, MapPin, MessageCircle, ShieldCheck, Heart, ExternalLink } from 'lucide-react';
import { Category, SiteSettings } from '../types';
import { TilakLogo } from './TilakLogo';

interface FooterProps {
  categories: Category[];
  settings?: SiteSettings | null;
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ categories, settings, onNavigate }) => {
  const rawNumber = settings?.whatsappNumber || '+919382176969';
  const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
  const mapsUrl = settings?.mapsUrl || 'https://share.google/NJPhQEXIVloDifYAW';
  const addressText = settings?.address || 'Madpur Station Bajar';

  return (
    <footer className="bg-[#463525] text-[#FAF6F0] border-t border-[#F4D9A0]/25 mt-20">
      {/* Top Value Propositions */}
      <div className="border-b border-[#F4D9A0]/15 bg-[#5B4632]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#463525] border border-[#F4D9A0]/40 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-[#F4D9A0]" />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-[#F4D9A0]">Master Stainless Steel and Woodcraft</h4>
                <p className="text-xs text-[#FAF6F0]/75">SS 304 railings, aluminium glazing &amp; seasoned woodwork.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#463525] border border-[#F4D9A0]/40 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#C8792C]" />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-[#F4D9A0]">Verified Craftsmanship</h4>
                <p className="text-xs text-[#FAF6F0]/75">Structural integrity warranty on fabrication and joinery.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#463525] border border-[#F4D9A0]/40 flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-[#F4D9A0]">Direct WhatsApp Concierge</h4>
                <p className="text-xs text-[#FAF6F0]/75">Quick estimates, CAD sketches &amp; customized fabrications.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#463525] border border-[#F4D9A0]/40 flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 text-[#F4D9A0]" />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-[#F4D9A0]">Bespoke Customisation</h4>
                <p className="text-xs text-[#FAF6F0]/75">Custom sizes, temple carvings, finishes &amp; ceiling rafter grids.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => onNavigate('/')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <TilakLogo size="md" className="group-hover:scale-105 transition-transform duration-300" />
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF6F0]">
                Satarupa <span className="text-[#F4D9A0]">Steel Enterprise</span>
              </span>
            </div>
            <p className="text-sm text-[#FAF6F0]/80 leading-relaxed max-w-sm">
              Satarupa Steel Enterprise is your premier destination for high-grade stainless steel items, aluminium fabrications, bespoke furniture, sacred mandirs, and architectural ceiling customizations at Madpur Station Bajar.
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${cleanNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20bd5a] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Satarupa Steel Enterprise</span>
              </a>
            </div>
          </div>

          {/* 7 Core Categories */}
          <div>
            <h3 className="font-serif text-base font-bold text-[#F4D9A0] mb-4 tracking-wide uppercase text-xs">
              Showcase Categories
            </h3>
            <ul className="space-y-2 text-sm text-[#FAF6F0]/80">
              {categories.slice(0, 7).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate(`/products?category=${cat.slug}`)}
                    className="hover:text-[#F4D9A0] hover:underline transition-colors text-left cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links (No Admin link) */}
          <div>
            <h3 className="font-serif text-base font-bold text-[#F4D9A0] mb-4 tracking-wide uppercase text-xs">
              Quick Directory
            </h3>
            <ul className="space-y-2 text-sm text-[#FAF6F0]/80">
              <li>
                <button onClick={() => onNavigate('/categories')} className="hover:text-[#F4D9A0] transition-colors cursor-pointer">
                  All Categories Hub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/products')} className="hover:text-[#F4D9A0] transition-colors cursor-pointer">
                  Product Catalog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/products?mostSelling=1')} className="hover:text-[#F4D9A0] transition-colors cursor-pointer">
                  Most Selling Products
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/blog')} className="hover:text-[#F4D9A0] transition-colors cursor-pointer">
                  Craft Journal &amp; SEO Blog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-[#F4D9A0] transition-colors cursor-pointer">
                  Custom Project Enquiry
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details & Google Maps */}
          <div>
            <h3 className="font-serif text-base font-bold text-[#F4D9A0] mb-4 tracking-wide uppercase text-xs">
              Workshop &amp; Showroom
            </h3>
            <div className="space-y-3 text-xs text-[#FAF6F0]/80 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F4D9A0] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">{addressText}</span>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#F4D9A0] hover:underline mt-1 font-medium"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F4D9A0] shrink-0" />
                <a href={`tel:${cleanNumber}`} className="hover:text-white transition-colors">
                  {settings?.phoneNumber || '+91 93821 76969'}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F4D9A0] shrink-0" />
                <span>{settings?.email || 'satarupasteelenterprise@gmail.com'}</span>
              </div>
              <div className="pt-2">
                <span className="block text-[11px] text-[#F4D9A0]/70 font-semibold uppercase">Business Hours:</span>
                <span className="block text-xs">Mon &ndash; Sat: 9:00 AM &ndash; 8:30 PM IST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-[#F4D9A0]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF6F0]/60">
          <p>&copy; {new Date().getFullYear()} Satarupa Steel Enterprise. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 text-[11px]">
            Madpur Station Bajar &bull; Stainless Steel &bull; Aluminium Fabrications &bull; Interior Decor
          </p>
        </div>
      </div>
    </footer>
  );
};
