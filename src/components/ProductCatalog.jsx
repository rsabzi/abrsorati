import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES, FABRIC_TYPES, SORT_OPTIONS } from '../data/categories';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { 
  Filter, 
  SlidersHorizontal, 
  X, 
  Sparkles, 
  Grid3X3, 
  LayoutGrid, 
  RotateCcw,
  Search,
  ChevronDown
} from 'lucide-react';

export const ProductCatalog = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    inStockOnly,
    setInStockOnly,
    selectedFabric,
    setSelectedFabric,
    formatPrice
  } = useShop();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [gridCols, setGridCols] = useState('grid-4');

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setPriceRange([50000, 600000]);
    setInStockOnly(false);
    setSelectedFabric('');
  };

  // Filter & Sort Engine
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // 1. Category Filter
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // 2. Live Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        (p.shortDescription && p.shortDescription.toLowerCase().includes(q))
      );
    }

    // 3. Price Range Filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // 4. In Stock Filter
    if (inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    // 5. Fabric Filter
    if (selectedFabric) {
      result = result.filter(p => p.specs?.fabric?.includes(selectedFabric) || p.tags.includes(selectedFabric));
    }

    // 6. Sorting Engine
    if (sortBy === 'bestselling') {
      result.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.id.localeCompare(a.id));
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'discount') {
      result.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy, priceRange, inStockOnly, selectedFabric]);

  const activeFiltersCount = (
    (selectedCategory !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0) +
    (priceRange[0] > 50000 || priceRange[1] < 600000 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (selectedFabric ? 1 : 0)
  );

  return (
    <section className="py-8 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Top Title */}
        <div className="mb-6 text-right">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1.5">
            <span>صفحه اصلی</span>
            <span>/</span>
            <span>ویترین فروشگاه ابر صورتی</span>
            {selectedCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="text-pink-600 font-bold">
                  {CATEGORIES.find(c => c.id === selectedCategory)?.name}
                </span>
              </>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {selectedCategory === 'all' 
              ? 'ویترین کراپ بند ماکارون، شورت، جوراب، کش مو و مینی اسکارف' 
              : CATEGORIES.find(c => c.id === selectedCategory)?.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            تمامی سفارش‌ها با بسته‌بندی کاملاً بهداشتی، محرمانه و جعبه معطر ارسال می‌شوند
          </p>
        </div>

        {/* Category Pills Carousel / Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-2xs cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-pink-200'
                  : 'bg-white text-slate-700 hover:bg-pink-50 border border-pink-100/80 hover:border-pink-200'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                selectedCategory === cat.id ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {cat.id === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* Control Bar: Search input, Sort, Filter Toggle, Layout Switcher */}
        <div className="bg-white rounded-3xl p-4 border border-pink-100/80 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-4">
          
          {/* Left: Mobile Filter Button & Active Filter Tags */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 bg-pink-50 hover:bg-pink-100 text-pink-700 px-4 py-2.5 rounded-2xl text-xs font-bold border border-pink-200 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>فیلترها</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 bg-rose-500 text-white rounded-full text-[10px] flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <div className="text-xs text-slate-500 font-medium">
              نمایش <span className="font-bold text-slate-800">{filteredProducts.length}</span> محصول بوتیک
            </div>
          </div>

          {/* Right: Sort Options & Grid Switcher */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">مرتب‌سازی:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-pink-50/70 hover:bg-pink-50 text-slate-800 text-xs font-bold rounded-2xl pr-3 pl-8 py-2.5 border border-pink-200/80 outline-none focus:ring-2 focus:ring-pink-300 appearance-none cursor-pointer"
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Layout Toggle Desktop */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-2xl">
              <button
                onClick={() => setGridCols('grid-4')}
                className={`p-1.5 rounded-xl transition cursor-pointer ${gridCols === 'grid-4' ? 'bg-white text-pink-600 shadow-2xs' : 'text-slate-500'}`}
                title="۴ ستونه"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols('grid-3')}
                className={`p-1.5 rounded-xl transition cursor-pointer ${gridCols === 'grid-3' ? 'bg-white text-pink-600 shadow-2xs' : 'text-slate-500'}`}
                title="۳ ستونه بزرگ"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Main Content Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Filter Sidebar (3 cols) */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            
            {/* Filter Panel Box */}
            <div className="bg-white rounded-3xl p-5 border border-pink-100/80 shadow-xs text-right space-y-6 sticky top-24">
              
              <div className="flex items-center justify-between pb-4 border-b border-pink-50">
                <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                  <SlidersHorizontal className="w-4 h-4 text-pink-600" />
                  <span>فیلترهای پیشرفته</span>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>پاک‌کردن همه</span>
                  </button>
                )}
              </div>

              {/* Price Range Slider */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-3">محدوده قیمت (تومان)</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="50000"
                    max="600000"
                    step="20000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-pink-500 cursor-pointer"
                  />
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>تا: {formatPrice(priceRange[1])}</span>
                    <span className="text-slate-400 font-normal">از: {formatPrice(priceRange[0])}</span>
                  </div>
                </div>
              </div>

              {/* In-Stock Toggle */}
              <div className="pt-4 border-t border-pink-50">
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-pink-600 transition">
                    فقط کالاهای موجود و آماده ارسال
                  </span>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-pink-600 accent-pink-500 focus:ring-pink-400 cursor-pointer"
                  />
                </label>
              </div>

              {/* Fabric Filter */}
              <div className="pt-4 border-t border-pink-50">
                <h4 className="text-xs font-bold text-slate-800 mb-3">جنس پارچه و الیاف</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs text-slate-600 hover:text-pink-600 cursor-pointer">
                    <input
                      type="radio"
                      name="fabricFilter"
                      checked={selectedFabric === ''}
                      onChange={() => setSelectedFabric('')}
                      className="accent-pink-500"
                    />
                    <span>همه متریال‌ها</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-600 hover:text-pink-600 cursor-pointer">
                    <input
                      type="radio"
                      name="fabricFilter"
                      checked={selectedFabric === 'پنبه'}
                      onChange={() => setSelectedFabric('پنبه')}
                      className="accent-pink-500"
                    />
                    <span>پنبه ارگانیک ضدحساسیت</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-600 hover:text-pink-600 cursor-pointer">
                    <input
                      type="radio"
                      name="fabricFilter"
                      checked={selectedFabric === 'لیزری'}
                      onChange={() => setSelectedFabric('لیزری')}
                      className="accent-pink-500"
                    />
                    <span>بدون درز و لیزری (Seamless)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-600 hover:text-pink-600 cursor-pointer">
                    <input
                      type="radio"
                      name="fabricFilter"
                      checked={selectedFabric === 'ابریشم'}
                      onChange={() => setSelectedFabric('ابریشم')}
                      className="accent-pink-500"
                    />
                    <span>ابریشم خالص طبیعی (Mulberry Silk)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-600 hover:text-pink-600 cursor-pointer">
                    <input
                      type="radio"
                      name="fabricFilter"
                      checked={selectedFabric === 'کبریتی'}
                      onChange={() => setSelectedFabric('کبریتی')}
                      className="accent-pink-500"
                    />
                    <span>کبریتی کشسان لطیف</span>
                  </label>
                </div>
              </div>

              {/* Special Boutique Guarantee Box */}
              <div className="pt-4 border-t border-pink-50 bg-gradient-to-br from-pink-50/50 to-rose-50/30 p-3.5 rounded-2xl border border-pink-100">
                <div className="flex items-center gap-2 text-pink-700 font-bold text-xs mb-1">
                  <span>🌸 فاق دوبل پنبه‌ای و ارسال محرمانه</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  تمامی لباس‌های زیر در بسته‌بندی پلمپ شده ضد نفوذ با ضمانت سلامت و بهداشت پوست ارسال می‌شوند.
                </p>
              </div>

            </div>
          </div>

          {/* Products Grid (9 cols) */}
          <div className="lg:col-span-9">
            
            {/* Active Filters Bar */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs text-slate-400 font-medium">فیلترهای فعال:</span>
                
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 bg-pink-100 text-pink-800 text-xs font-bold px-2.5 py-1 rounded-xl">
                    <span>دسته: {CATEGORIES.find(c => c.id === selectedCategory)?.name}</span>
                    <button onClick={() => setSelectedCategory('all')} className="cursor-pointer"><X className="w-3 h-3" /></button>
                  </span>
                )}

                {searchQuery && (
                  <span className="inline-flex items-center gap-1 bg-pink-100 text-pink-800 text-xs font-bold px-2.5 py-1 rounded-xl">
                    <span>جستجو: «{searchQuery}»</span>
                    <button onClick={() => setSearchQuery('')} className="cursor-pointer"><X className="w-3 h-3" /></button>
                  </span>
                )}

                {inStockOnly && (
                  <span className="inline-flex items-center gap-1 bg-pink-100 text-pink-800 text-xs font-bold px-2.5 py-1 rounded-xl">
                    <span>فقط موجودی انبار</span>
                    <button onClick={() => setInStockOnly(false)} className="cursor-pointer"><X className="w-3 h-3" /></button>
                  </span>
                )}

                {selectedFabric && (
                  <span className="inline-flex items-center gap-1 bg-pink-100 text-pink-800 text-xs font-bold px-2.5 py-1 rounded-xl">
                    <span>جنس: {selectedFabric}</span>
                    <button onClick={() => setSelectedFabric('')} className="cursor-pointer"><X className="w-3 h-3" /></button>
                  </span>
                )}

                <button
                  onClick={handleResetFilters}
                  className="text-xs text-rose-600 hover:underline font-bold mr-2 cursor-pointer"
                >
                  حذف همه فیلترها
                </button>
              </div>
            )}

            {/* Products Grid / Empty Fallback */}
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-5 sm:gap-6 ${
                gridCols === 'grid-3' 
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
              }`}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-pink-100 shadow-xs max-w-lg mx-auto mt-6">
                <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 animate-bounce">
                  🎀
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  محصولی با این مشخصات یافت نشد!
                </h3>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  فیلترهای انتخابی یا عبارت جستجو شده با هیچ‌یک از محصولات موجود مطابقت نداشت.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 bg-pink-600 text-white text-xs font-bold px-6 py-3 rounded-2xl hover:bg-pink-700 shadow-md transition cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>مشاهده تمام محصولات ویترین</span>
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-300 text-right">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-pink-100">
                <span className="font-bold text-base text-slate-800">فیلتر محصولات</span>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Filter Controls */}
              <div className="py-4 space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 mb-2">دسته‌بندی</h4>
                  <div className="space-y-1">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-right p-2 rounded-xl text-xs font-medium flex items-center justify-between cursor-pointer ${
                          selectedCategory === cat.id ? 'bg-pink-100 text-pink-700 font-bold' : 'hover:bg-pink-50 text-slate-700'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span>{cat.icon}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-800 mb-2">حداکثر قیمت</h4>
                  <input
                    type="range"
                    min="50000"
                    max="600000"
                    step="20000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-pink-500"
                  />
                  <div className="text-xs font-bold text-slate-700 mt-1">
                    تا {formatPrice(priceRange[1])} تومان
                  </div>
                </div>

                <div>
                  <label className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>فقط کالاهای آماده ارسال</span>
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="accent-pink-500 w-4 h-4 rounded"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-pink-100 flex gap-2">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 bg-pink-600 text-white font-bold text-xs py-3 rounded-2xl cursor-pointer"
              >
                اعمال فیلترها ({filteredProducts.length})
              </button>
              <button
                onClick={handleResetFilters}
                className="px-4 py-3 bg-pink-50 text-pink-700 font-bold text-xs rounded-2xl cursor-pointer"
              >
                ریست
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
