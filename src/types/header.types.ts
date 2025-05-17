export interface HeaderProps {
    brand: string;
    category: string;
    priceRange: string;
    brands: string[];
    categories: string[];
    priceRanges: string[];
    onBrandChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onPriceRangeChange: (value: string) => void;
  }
  