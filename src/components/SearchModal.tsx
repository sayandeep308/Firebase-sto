import React, { useState, useMemo } from 'react';
import { Search, X, Sparkles, ArrowRight, Layers, BookOpen } from 'lucide-react';
import { Product, Category, BlogPost } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  categories: Category[];
  blogPosts: BlogPost[];
  onNavigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  categories,
  blogPosts,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return { products: [], categories: [], blogPosts: [] };
    const q = query.toLowerCase().trim();

    return {
      products: products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.shortDescription?.toLowerCase().includes(q)
      ),
      categories: categories.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.subcategories.some((s) => s.toLowerCase().includes(q))
      ),
      blogPosts: blogPosts.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.summary.toLowerCase().includes(q) ||
          b.keywords.some((k) => k.toLowerCase().includes(q))
      ),
    };
  }, [query, products, categories, blogPosts]);

  if (!isOpen) return null;

  const handleSelect = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FAF6F0] rounded-2xl shadow-2xl border border-[#F4D9A0] overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 bg-[#5B4632] text-white flex items-center gap-3 border-b border-[#F4D9A0]/30">
          <Search className="w-5 h-5 text-[#F4D9A0] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search mandirs, live-edge dining, PVD rose gold, rafters, articles..."
            className="w-full bg-transparent border-none text-[#FAF6F0] placeholder-[#FAF6F0]/60 focus:outline-hidden text-sm sm:text-base"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1 rounded-md text-[#F4D9A0] hover:bg-[#6B523B]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto space-y-6">
          {!query.trim() ? (
            <div className="text-center py-8 text-xs text-[#5A4E46]">
              <Sparkles className="w-6 h-6 text-[#C8792C] mx-auto mb-2" />
              <p>Type keywords to search across products, categories, or craft blog articles.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['Teak Mandir', 'PVD Gold Partition', 'Ceiling Rafters', 'Dining Table', 'Acoustic Slat'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-3 py-1 rounded-full bg-white border border-[#E8DFD5] text-[#5B4632] hover:border-[#C8792C] text-xs transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Product Matches */}
              {filtered.products.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B4632] mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C8792C]" />
                    Matching Products ({filtered.products.length})
                  </h4>
                  <div className="space-y-2">
                    {filtered.products.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleSelect(`/product/${p.slug}`)}
                        className="p-3 bg-white rounded-lg border border-[#E8DFD5] hover:border-[#F4D9A0] flex items-center gap-3 cursor-pointer group transition-all"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-semibold text-[#2C221E] group-hover:text-[#5B4632] truncate">
                            {p.title}
                          </h5>
                          <span className="text-[11px] text-[#C8792C] font-medium">
                            {p.categoryName} &bull; {p.subcategory}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#F4D9A0] group-hover:translate-x-1 transition-transform shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Category Matches */}
              {filtered.categories.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B4632] mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#C8792C]" />
                    Matching Categories ({filtered.categories.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filtered.categories.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => handleSelect(`/products?category=${c.slug}`)}
                        className="p-3 bg-white rounded-lg border border-[#E8DFD5] hover:border-[#F4D9A0] flex items-center justify-between cursor-pointer group"
                      >
                        <span className="text-xs font-semibold text-[#2C221E] group-hover:text-[#5B4632]">
                          {c.name}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#F4D9A0]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Blog Post Matches */}
              {filtered.blogPosts.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B4632] mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#C8792C]" />
                    Journal &amp; SEO Articles ({filtered.blogPosts.length})
                  </h4>
                  <div className="space-y-2">
                    {filtered.blogPosts.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => handleSelect(`/blog/${b.slug}`)}
                        className="p-3 bg-white rounded-lg border border-[#E8DFD5] hover:border-[#F4D9A0] cursor-pointer group"
                      >
                        <h5 className="text-xs font-semibold text-[#2C221E] group-hover:text-[#5B4632]">
                          {b.title}
                        </h5>
                        <p className="text-[11px] text-[#5A4E46] line-clamp-1 mt-0.5">
                          {b.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filtered.products.length === 0 &&
                filtered.categories.length === 0 &&
                filtered.blogPosts.length === 0 && (
                  <div className="text-center py-8 text-xs text-[#5A4E46]">
                    No exact results found for "{query}". You can request a custom commission directly!
                    <div className="mt-3">
                      <button
                        onClick={() => handleSelect('/contact')}
                        className="btn-wood text-xs px-4 py-2"
                      >
                        Request Custom Project
                      </button>
                    </div>
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
