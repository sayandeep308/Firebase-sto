import { Product } from '../types';

export interface FilterOptions {
  categorySlug?: string;
  subcategory?: string;
  searchQuery?: string;
  mostSellingOnly?: boolean;
}

export function filterProducts(products: Product[], options: FilterOptions): Product[] {
  return products.filter((product) => {
    // Most selling filter
    if (options.mostSellingOnly && !product.isMostSelling) {
      return false;
    }

    // Category filter
    if (options.categorySlug) {
      const matchCat =
        product.categoryId === options.categorySlug ||
        product.categoryName.toLowerCase() === options.categorySlug.toLowerCase();
      if (!matchCat) return false;
    }

    // Subcategory filter
    if (options.subcategory && options.subcategory !== 'All') {
      if (product.subcategory.toLowerCase() !== options.subcategory.toLowerCase()) {
        return false;
      }
    }

    // Search query filter
    if (options.searchQuery && options.searchQuery.trim() !== '') {
      const query = options.searchQuery.toLowerCase().trim();
      const matchTitle = product.title.toLowerCase().includes(query);
      const matchCategory = product.categoryName.toLowerCase().includes(query);
      const matchSubcategory = product.subcategory.toLowerCase().includes(query);
      const matchDesc = product.shortDescription?.toLowerCase().includes(query);
      if (!matchTitle && !matchCategory && !matchSubcategory && !matchDesc) {
        return false;
      }
    }

    return true;
  });
}
