import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Filter,
  Flame,
  X,
  Sparkles,
  Layers,
  ChevronDown,
  ArrowUpDown,
} from 'lucide-react';
import { Product, Category, SiteSettings } from '../types';
import { ProductCard } from '../components/ProductCard';
import { filterProducts } from '../utils/filter';

interface ProductsCatalogPageProps {
  products: Product[];
  categories: Category[];
  settings?: SiteSettings | null;
  initialCategory?: string;
  initialSubcategory?: string;
  initialMostSelling?: boolean;
  onNavigate: (path: string) => void;
}

export const ProductsCatalogPage: React.FC<ProductsCatalogPageProps> = ({
  products,
  categories,
  settings,
  initialCategory,
  initialSubcategory,
  initialMostSelling,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || '');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(initialSubcategory || '');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mostSellingOnly, setMostSellingOnly] = useState<boolean>(initialMostSelling || false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (initialCategory !== undefined) setSelectedCategory(initialCategory);
    if (initialSubcategory !== undefined) setSelectedSubcategory(initialSubcategory);
    if (initialMostSelling !== undefined) setMostSellingOnly(initialMostSelling);
  }, [initialCategory, initialSubcategory, initialMostSelling]);

  // Current category object
  const currentCategoryObj = useMemo(() => {
    return categories.find((c) => c.slug === selectedCategory || c.id === selectedCategory);
  }, [categories, selectedCategory]);

  // Subcategories available for active category
  const availableSubcategories = useMemo(() => {
    if (!currentCategoryObj) return [];
    return currentCategoryObj.subcategories || [];
  }, [currentCategoryObj]);

  // Reset subcategory if category changes
  const handleCategoryChange = (catSlug: string) => {
    setSelectedCategory(catSlug);
    setSelectedSubcategory('');
  };

  // Filtered products list
  const filteredList = useMemo(() => {
    let result = filterProducts(products, {
      categorySlug: selectedCategory,
      subcategory: selectedSubcategory,
      searchQuery,
      mostSellingOnly,
    });

    // Sorting
    return result.sort((a, b) => {
      if (sortBy === 'price-asc') {
        return (a.price || 999999) - (b.price || 999999);
      }
      if (sortBy === 'price-desc') {
        return (b.price || 0) - (a.price || 0);
      }
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      return (b.isMostSelling ? 1 : 0) - (a.isMostSelling ? 1 : 0);
    });
  }, [products, selectedCategory, selectedSubcategory, searchQuery, mostSellingOnly, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory('');
    setSelectedSubcategory('');
    setSearchQuery('');
    setMostSellingOnly(false);
  };

  const hasActiveFilters =
    Boolean(selectedCategory) ||
    Boolean(selectedSubcategory) ||
    Boolean(searchQuery) ||
    mostSellingOnly;

  return (
    <div className="py-10 bg-[#FAF6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#5B4632] mb-2 font-medium">
            <button onClick={() => onNavigate('/')} className="hover:underline">
              Home
            </button>
            <span>/</span>
            <button onClick={() => onNavigate('/categories')} className="hover:underline">
              Categories
            </button>
            <span>/</span>
            <span className="text-[#C8792C] font-semibold">
              {currentCategoryObj ? currentCategoryObj.name : 'All Products Catalog'}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C221E] tracking-tight">
                {currentCategoryObj ? currentCategoryObj.name : 'Complete Products Showcase'}
              </h1>
              <p className="mt-1 text-sm text-[#5A4E46]">
                {currentCategoryObj
                  ? currentCategoryObj.description
                  : 'Filter handcrafted items across wood, metal, mandir sanctuaries, and ceiling rafters.'}
              </p>
            </div>

            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden btn-wood text-xs px-4 py-2 flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters &amp; Search ({filteredList.length})</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-xl p-4 border border-[#E8DFD5] shadow-xs mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#5B4632] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, wood, metal..."
              className="w-full pl-9 pr-8 py-2 rounded-lg border border-[#E8DFD5] text-xs sm:text-sm bg-[#FAF6F0]/50 text-[#2C221E] focus:outline-hidden focus:border-[#C8792C]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter Badges */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Most Selling Toggle */}
            <button
              onClick={() => setMostSellingOnly(!mostSellingOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                mostSellingOnly
                  ? 'bg-[#C8792C] text-white border-[#C8792C] shadow-sm'
                  : 'bg-[#FAF6F0] text-[#5B4632] border-[#E8DFD5] hover:border-[#C8792C]'
              }`}
            >
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Most Selling Only</span>
            </button>

            {/* Category Quick Select */}
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-[#E8DFD5] bg-[#FAF6F0] text-xs font-semibold text-[#5B4632] focus:outline-hidden focus:border-[#C8792C]"
            >
              <option value="">All Categories ({products.length})</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Subcategory Select if Category active */}
            {availableSubcategories.length > 0 && (
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-[#E8DFD5] bg-[#FAF6F0] text-xs font-semibold text-[#5B4632] focus:outline-hidden focus:border-[#C8792C]"
              >
                <option value="">All Subcategories</option>
                {availableSubcategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            )}

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg border border-[#E8DFD5] bg-[#FAF6F0] text-xs font-semibold text-[#5B4632] focus:outline-hidden focus:border-[#C8792C]"
            >
              <option value="featured">Sort: Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>

            {/* Clear All button */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Subcategory Pills Row (if category is selected) */}
        {availableSubcategories.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#5B4632]">Subcategories:</span>
            <button
              onClick={() => setSelectedSubcategory('')}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                !selectedSubcategory
                  ? 'bg-[#5B4632] text-[#F4D9A0] border-[#5B4632]'
                  : 'bg-white text-[#5B4632] border-[#E8DFD5] hover:border-[#C8792C]'
              }`}
            >
              All {currentCategoryObj?.name}
            </button>
            {availableSubcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                  selectedSubcategory === sub
                    ? 'bg-[#5B4632] text-[#F4D9A0] border-[#5B4632]'
                    : 'bg-white text-[#5B4632] border-[#E8DFD5] hover:border-[#C8792C]'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Active Filters Pill Summary */}
        {hasActiveFilters && (
          <div className="mb-6 flex items-center gap-2 text-xs text-[#5A4E46]">
            <span>Showing {filteredList.length} results for:</span>
            {selectedCategory && (
              <span className="px-2.5 py-0.5 rounded-md bg-[#5B4632]/10 text-[#5B4632] font-semibold">
                Category: {currentCategoryObj?.name || selectedCategory}
              </span>
            )}
            {selectedSubcategory && (
              <span className="px-2.5 py-0.5 rounded-md bg-[#5B4632]/10 text-[#5B4632] font-semibold">
                Subcategory: {selectedSubcategory}
              </span>
            )}
            {mostSellingOnly && (
              <span className="px-2.5 py-0.5 rounded-md bg-[#C8792C]/10 text-[#C8792C] font-semibold">
                Most Selling
              </span>
            )}
            {searchQuery && (
              <span className="px-2.5 py-0.5 rounded-md bg-gray-200 text-gray-800 font-semibold">
                "{searchQuery}"
              </span>
            )}
          </div>
        )}

        {/* Product Grid */}
        {filteredList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredList.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                settings={settings}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-[#E8DFD5] max-w-lg mx-auto space-y-4">
            <Layers className="w-12 h-12 text-[#5B4632]/40 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-[#2C221E]">
              No Products Matched Your Filter
            </h3>
            <p className="text-xs text-[#5A4E46] leading-relaxed">
              We frequently produce custom commissioned woodwork, metal partitions, and mandirs tailored to individual blueprints.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button onClick={clearAllFilters} className="btn-wood-gold text-xs px-4 py-2">
                Clear Filters
              </button>
              <button onClick={() => onNavigate('/contact')} className="btn-wood text-xs px-4 py-2">
                Request Custom Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
