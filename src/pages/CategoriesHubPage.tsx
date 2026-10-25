import React from 'react';
import { Layers, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { Category, Product } from '../types';

interface CategoriesHubPageProps {
  categories: Category[];
  products: Product[];
  onNavigate: (path: string) => void;
}

export const CategoriesHubPage: React.FC<CategoriesHubPageProps> = ({
  categories,
  products,
  onNavigate,
}) => {
  return (
    <div className="py-12 bg-[#FAF6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hub Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5B4632]/10 text-[#5B4632] text-xs font-bold tracking-wide">
            <Layers className="w-3.5 h-3.5 text-[#C8792C]" />
            <span>Master Craftsmanship Directory</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C221E] tracking-tight">
            All Categories &amp; Architectural Specialities
          </h1>

          <p className="text-sm sm:text-base text-[#5A4E46] leading-relaxed">
            Explore our curated catalog across handcrafted woodwork, bespoke puja corners, architectural stainless steel and aluminium partitions, and sculpted ceilings.
          </p>
        </div>

        {/* Categories Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const count = products.filter(
              (p) =>
                p.categoryId === category.id ||
                p.categoryId === category.slug ||
                p.categoryName.toLowerCase() === category.name.toLowerCase()
            ).length;

            return (
              <div
                key={category.id}
                className="group rounded-2xl overflow-hidden bg-white border border-[#E8DFD5] hover:border-[#F4D9A0] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Image Header */}
                <div
                  onClick={() => onNavigate(`/products?category=${category.slug}`)}
                  className="relative aspect-16/10 overflow-hidden cursor-pointer"
                >
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C221E]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#5B4632]/80 backdrop-blur-xs border border-[#F4D9A0]/30 text-[#F4D9A0]">
                      {count} {count === 1 ? 'Design' : 'Designs'} Cataloged
                    </span>
                    <span className="text-xs text-[#FAF6F0]/80 font-medium">
                      Order #{category.displayOrder}
                    </span>
                  </div>
                </div>

                {/* Content & Nested Subcategories */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h2
                      onClick={() => onNavigate(`/products?category=${category.slug}`)}
                      className="font-serif text-xl font-bold text-[#2C221E] group-hover:text-[#5B4632] transition-colors cursor-pointer"
                    >
                      {category.name}
                    </h2>

                    <p className="mt-2 text-xs text-[#5A4E46] leading-relaxed">
                      {category.description}
                    </p>

                    {/* Subcategories Directory */}
                    {category.subcategories && category.subcategories.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-[#FAF6F0]">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#C8792C] block mb-2">
                          Available Subcategories ({category.subcategories.length})
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {category.subcategories.map((sub) => (
                            <button
                              key={sub}
                              onClick={() =>
                                onNavigate(
                                  `/products?category=${category.slug}&subcategory=${encodeURIComponent(
                                    sub
                                  )}`
                                )
                              }
                              className="px-2.5 py-1 rounded-md bg-[#FAF6F0] hover:bg-[#F4D9A0] hover:text-[#2C221E] text-[#5B4632] text-xs font-medium border border-[#E8DFD5] transition-colors cursor-pointer"
                            >
                              {sub}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Explore Action Button */}
                  <div className="mt-6 pt-4 border-t border-[#FAF6F0]">
                    <button
                      onClick={() => onNavigate(`/products?category=${category.slug}`)}
                      className="w-full btn-gold-pill py-2.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Explore {category.name} Catalog</span>
                      <ArrowRight className="w-4 h-4 text-[#241403] group-hover:translate-x-1.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
