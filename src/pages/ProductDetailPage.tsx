import React, { useState } from 'react';
import {
  Sparkles,
  MessageCircle,
  Flame,
  ArrowLeft,
  Share2,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Maximize2,
} from 'lucide-react';
import { Product, SiteSettings } from '../types';
import { formatPrice } from '../utils/currency';
import { CustomerEnquiryForm } from '../components/CustomerEnquiryForm';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  product: Product;
  relatedProducts: Product[];
  settings?: SiteSettings | null;
  onNavigate: (path: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  relatedProducts,
  settings,
  onNavigate,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const rawNumber = settings?.whatsappNumber || '919382176969';
  const cleanNumber = rawNumber.replace(/[^0-9]/g, '') || '919382176969';

  const whatsappMessage = `Hello Satarupa Steel Enterprise! I am interested in inquiring about "${product.title}" (${product.slug}).\nCategory: ${product.categoryName} (${product.subcategory})\nEstimated Price: ${formatPrice(product.price, product.isPriceOnRequest, settings?.defaultCurrency || 'Rs. ')}\nCould you please share custom dimensions, finishes, and delivery schedules to Madpur Station Bajar?`;
  const directWhatsAppUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const images = product.images?.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80'];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="py-10 bg-[#FAF6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#5B4632] mb-6 flex-wrap">
          <button onClick={() => onNavigate('/')} className="hover:underline">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#5B4632]/50" />
          <button onClick={() => onNavigate('/categories')} className="hover:underline">
            Categories
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#5B4632]/50" />
          <button
            onClick={() => onNavigate(`/products?category=${product.categoryId}`)}
            className="hover:underline font-medium text-[#5B4632]"
          >
            {product.categoryName}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#5B4632]/50" />
          <span className="text-[#C8792C] font-semibold truncate max-w-xs">{product.title}</span>
        </nav>

        {/* Back Button */}
        <button
          onClick={() => onNavigate(`/products?category=${product.categoryId}`)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B4632] hover:text-[#C8792C] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {product.categoryName}</span>
        </button>

        {/* Main Product Showcase Section (Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFD5] shadow-sm">
          {/* Left Column: Multi-Image Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Active Image View */}
            <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-[#FAF6F0] border border-[#E8DFD5]">
              <img
                src={images[selectedImageIndex]}
                alt={`${product.title} view ${selectedImageIndex + 1}`}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* Badges on main image */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                {product.isMostSelling && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#C8792C] text-white text-xs font-bold shadow-md">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    Most Selling
                  </span>
                )}
                <span className="px-2.5 py-1 rounded-md bg-[#5B4632]/85 text-[#F4D9A0] text-xs font-semibold backdrop-blur-xs border border-[#F4D9A0]/30 shadow-xs">
                  {product.subcategory}
                </span>
              </div>
            </div>

            {/* Thumbnail Gallery Strip */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-[#C8792C] ring-2 ring-[#C8792C]/30 scale-102'
                        : 'border-[#E8DFD5] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Atelier Craft Assurance */}
            <div className="rounded-xl p-4 bg-[#FAF6F0] border border-[#E8DFD5] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5A4E46]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>Seasoned Timber / Grade SS 304 Materials</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>10-Year Structural Frame Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>Custom Dimensions &amp; Finish Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>PAN-India White Glove Installation</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Specs & Inquiries (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C8792C]">
                  {product.categoryName} &bull; {product.subcategory}
                </span>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1 text-xs text-[#5B4632] hover:text-[#C8792C] transition-colors p-1"
                  title="Share link"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedLink ? 'Copied Link!' : 'Share'}</span>
                </button>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C221E] leading-snug">
                {product.title}
              </h1>

              {/* Price Display */}
              <div className="mt-4 p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5] flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#5A4E46] block uppercase font-medium">
                    Estimated Atelier Price
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#2C221E]">
                    {formatPrice(product.price, product.isPriceOnRequest, settings?.defaultCurrency || '₹')}
                  </span>
                </div>
                {product.isPriceOnRequest && (
                  <span className="text-[11px] text-[#C8792C] font-semibold bg-[#C8792C]/10 px-2 py-0.5 rounded-sm">
                    Custom Quote on Site Specs
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mt-5 space-y-3">
                <h3 className="font-serif text-sm font-bold text-[#2C221E] uppercase tracking-wide">
                  Craftsmanship &amp; Architectural Details
                </h3>
                <p className="text-sm text-[#5A4E46] leading-relaxed whitespace-pre-line">
                  {product.description || product.shortDescription}
                </p>
              </div>

              {/* Specifications Table */}
              {product.specifications && product.specifications.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-serif text-sm font-bold text-[#2C221E] uppercase tracking-wide mb-3">
                    Technical Specifications
                  </h3>
                  <div className="rounded-xl border border-[#E8DFD5] overflow-hidden text-xs">
                    {product.specifications.map((spec, idx) => (
                      <div
                        key={idx}
                        className={`grid grid-cols-2 p-2.5 ${
                          idx % 2 === 0 ? 'bg-[#FAF6F0]/60' : 'bg-white'
                        } border-b border-[#E8DFD5] last:border-b-0`}
                      >
                        <span className="font-semibold text-[#5B4632]">{spec.key}</span>
                        <span className="text-[#2C221E]">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Direct WhatsApp Instant Action */}
            <div className="pt-4 border-t border-[#E8DFD5] space-y-3">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-wood py-3.5 text-sm sm:text-base font-semibold flex items-center justify-center gap-2 group"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform" />
                <span>Inquire on WhatsApp for Custom Specs</span>
              </a>
              <p className="text-center text-[11px] text-[#5A4E46]">
                Instant response from master artisan with CAD drawings &amp; wood finish samples.
              </p>
            </div>
          </div>
        </div>

        {/* Customer Enquiry Form Section */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-10 border border-[#E8DFD5] shadow-sm max-w-4xl mx-auto">
          <CustomerEnquiryForm
            product={product}
            settings={settings}
            titleOverride={`Commission a Bespoke ${product.title}`}
            subtitleOverride="Fill in your contact details below to receive a formal quotation, customization timeline, and material swatches."
          />
        </div>

        {/* Related Products in this Category */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C8792C]">
                  More In This Category
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#2C221E]">
                  Related {product.categoryName} Masterpieces
                </h2>
              </div>
              <button
                onClick={() => onNavigate(`/products?category=${product.categoryId}`)}
                className="btn-wood text-xs px-4 py-2 font-semibold"
              >
                View Category Hub
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  settings={settings}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
