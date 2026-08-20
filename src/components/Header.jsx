import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Truck, 
  Menu, 
  X, 
  Sparkles, 
  ChevronDown, 
  Copy, 
  Check, 
  Flame,
  Grid,
  Home,
  Info,
  Settings
} from 'lucide-react';

export const Header = () => {
  const {
    products,
    categories,
    storeSettings,
    wishlist,
    getCartItemCount,
    getCartTotal,
    formatPrice,
    setCartDrawerOpen,
    navigateToHome,
    navigateToCategory,
    navigateToProduct,
    navigateToWishlist,
    navigateToAbout,
    navigateToAdmin,
    isAdminAuthenticated,
    navigateToFlashDeals,
    setTrackingModalOpen,
    currentView,
    selectedCategory,
    searchQuery,
    setSearchQuery,
    setCurrentView,
    setMobileMenuOpen,
    showToast
  } = useShop();

  const [searchOpen, setSearchOpen] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const megaMenuRef = useRef(null);

  // Live Search suggestions from dynamic products
  const searchResults = searchQuery.trim().length > 1
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('PINKCLOUD');
    setCopiedCoupon(true);
    showToast('کد تخفیف «PINKCLOUD» کپی شد! در سبد خرید اعمال کنید. 🎉', 'success');
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  // Close search & mega menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target)) {
        setMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalItems = getCartItemCount();
  const cartTotal = getCartTotal();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-pink-100/80 shadow-xs transition-all">
      
      {/* 1. Top Announcement Bar */}
      <div className="bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 text-white text-xs sm:text-sm py-1.5 sm:py-2 px-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Coupon Promotion from settings */}
          <div className="flex items-center gap-1.5 sm:gap-2 mx-auto sm:mx-0 min-w-0">
            <span className="inline-flex items-center justify-center p-1 bg-white/20 rounded-full animate-pulse-subtle shrink-0">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-200" />
            </span>
            <span className="font-medium text-[11px] sm:text-sm truncate">
              <span className="hidden sm:inline">{storeSettings.announcementText || 'جشنواره افتتاحیه: ۱۵٪ تخفیف با کد'}</span>
              <span className="sm:hidden">۱۵٪ تخفیف با کد:</span>
            </span>
            <button
              onClick={handleCopyCoupon}
              className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded-full font-mono text-[10px] sm:text-xs transition border border-white/30 active:scale-95 cursor-pointer shrink-0"
              title="برای کپی کد کلیک کنید"
            >
              <span className="font-bold">PINKCLOUD</span>
              {copiedCoupon ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white/80" />}
            </button>
          </div>
          
          {/* Free Shipping & Admin Shortcuts */}
          <div className="hidden md:flex items-center gap-4 text-xs text-pink-100 font-light">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-pink-200" />
              ارسال رایگان بالای {formatPrice(storeSettings.freeShippingThreshold || 600000)} تومان
            </span>
            <span className="text-pink-300">|</span>
            <button 
              onClick={() => setTrackingModalOpen(true)}
              className="hover:text-white underline underline-offset-2 transition cursor-pointer"
            >
              پیگیری سفارشات
            </button>
            {isAdminAuthenticated && (
              <>
                <span className="text-pink-300">|</span>
                <button
                  onClick={() => navigateToAdmin('overview')}
                  className="hover:text-yellow-200 font-bold flex items-center gap-1 text-white bg-white/20 px-2 py-0.5 rounded-md transition cursor-pointer"
                >
                  <Settings className="w-3 h-3 text-yellow-200" />
                  <span>پنل مدیریت</span>
                </button>
              </>
            )}
          </div>

        </div>
      </div>

      {/* 2. Main Header Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Hamburger Menu & Brand Logo */}
          <div className="flex items-center gap-3">
            
            {/* Hamburger Button for Mobile & Tablet */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -mr-1 text-slate-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition cursor-pointer"
              aria-label="منوی اصلی"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Brand Logo with Official Image */}
            <button
              onClick={navigateToHome}
              className="flex items-center gap-2 sm:gap-3 group text-right focus:outline-none cursor-pointer min-w-0"
            >
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-400 to-pink-300 p-0.5 shadow-md shadow-pink-200 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden p-1">
                  <img
                    src={storeSettings.logoUrl || '/images/logo-icon.png'}
                    alt="ابر صورتی"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-2xl font-black bg-gradient-to-l from-rose-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent truncate">
                    {storeSettings.storeName || 'ابر صورتی'}
                  </span>
                  <span className="hidden sm:inline text-[10px] bg-pink-100 text-pink-700 font-bold px-1.5 py-0.5 rounded-md">
                    {storeSettings.domain || 'abrsorati.ir'}
                  </span>
                </div>
                <span className="hidden sm:block text-[11px] text-slate-500 font-medium tracking-wide truncate">
                  {storeSettings.tagline || 'لباس زیر زنانه، کراپ و اکسسوری فانتزی'}
                </span>
              </div>
            </button>
          </div>

          {/* Search Bar - Center Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-6 relative" ref={searchRef}>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="جستجو میان کراپ بند ماکارون، شورت لیزری، جوراب، کش‌مو..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setCurrentView('catalog');
                    setSearchOpen(false);
                  }
                }}
                className="w-full bg-pink-50/60 hover:bg-pink-50 focus:bg-white text-slate-800 text-sm rounded-2xl pr-11 pl-10 py-3 border border-pink-200/80 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition-all placeholder:text-slate-400 font-normal"
              />
              <Search className="w-5 h-5 text-pink-400 absolute right-3.5 top-3.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3.5 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Live Search Suggestions Dropdown */}
            {searchOpen && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-pink-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                <div className="p-3 bg-pink-50/50 border-b border-pink-100 flex items-center justify-between text-xs text-slate-600 font-medium">
                  <span>پیشنهادهای هوشمند برای «{searchQuery}»</span>
                  <span className="text-pink-600 font-bold">{searchResults.length} محصول یافت شد</span>
                </div>
                <div className="divide-y divide-pink-50 max-h-80 overflow-y-auto">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        navigateToProduct(product.id);
                        setSearchOpen(false);
                      }}
                      className="w-full p-3 flex items-center gap-3 hover:bg-pink-50/60 transition text-right group cursor-pointer"
                    >
                      <img
                        src={product.primaryImage}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-xl border border-pink-100 group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 truncate group-hover:text-pink-600 transition-colors">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] text-pink-500 font-semibold bg-pink-50 px-1.5 py-0.5 rounded">
                            {product.categoryName}
                          </span>
                          <span className="text-xs font-bold text-rose-600">
                            {formatPrice(product.price)} تومان
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setCurrentView('catalog');
                    setSearchOpen(false);
                  }}
                  className="w-full py-2.5 bg-pink-50 text-center text-xs font-bold text-pink-700 hover:bg-pink-100 transition cursor-pointer"
                >
                  مشاهده همه نتایج در فروشگاه ←
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons: Search (mobile), Tracking, Wishlist, Cart */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">

            {/* Mobile search icon (opens mobile menu drawer where full search lives) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2.5 text-slate-700 hover:text-pink-600 hover:bg-pink-50 rounded-2xl transition cursor-pointer"
              aria-label="جستجو"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Tracking Button */}
            <button
              onClick={() => setTrackingModalOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-slate-700 bg-pink-50/80 hover:bg-pink-100/80 rounded-xl transition border border-pink-100 cursor-pointer"
              title="پیگیری مرسولات پستی"
            >
              <Truck className="w-4 h-4 text-pink-600" />
              <span>پیگیری سفارش</span>
            </button>

            {/* Wishlist Button - hidden on mobile (in bottom nav) */}
            <button
              onClick={navigateToWishlist}
              className="hidden md:inline-flex relative p-2.5 text-slate-700 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition border border-transparent hover:border-pink-100 cursor-pointer"
              title="لیست علاقه‌مندی‌ها"
              aria-label="لیست علاقه‌مندی‌ها"
            >
              <Heart className={`w-6 h-6 ${wishlist.length > 0 ? 'text-rose-500 fill-rose-50' : 'text-slate-600'}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-in zoom-in">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-bold shadow-md shadow-pink-200 hover:shadow-lg hover:shadow-pink-300 transition-all duration-300 transform active:scale-95 group cursor-pointer"
              aria-label="سبد خرید"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-300 text-rose-900 text-[10px] font-black min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center shadow-sm border border-white">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-right leading-tight">
                <span className="text-[10px] text-pink-100 font-normal">سبد خرید</span>
                <span className="text-xs font-black tracking-tight">
                  {cartTotal > 0 ? `${formatPrice(cartTotal)} تومان` : 'خالی'}
                </span>
              </div>
            </button>

          </div>
        </div>

        {/* 3. Secondary Interactive Navigation Bar (Desktop) */}
        <div className="hidden lg:flex items-center justify-between border-t border-pink-100/60 py-2.5 text-xs font-semibold text-slate-700">
          
          <nav className="flex items-center gap-1 xl:gap-2">
            
            {/* Home Link */}
            <button
              onClick={navigateToHome}
              className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                currentView === 'home' 
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold shadow-xs' 
                  : 'hover:text-pink-600 hover:bg-pink-50/80 text-slate-700'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>صفحه اصلی</span>
            </button>

            {/* Mega Menu Trigger: "دسته‌بندی‌ها" */}
            <div className="relative" ref={megaMenuRef}>
              <button
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                onMouseEnter={() => setMegaMenuOpen(true)}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  megaMenuOpen || (currentView === 'catalog' && selectedCategory !== 'all')
                    ? 'bg-pink-100 text-pink-700 font-bold'
                    : 'hover:text-pink-600 hover:bg-pink-50/80 text-slate-700'
                }`}
              >
                <Grid className="w-3.5 h-3.5 text-pink-600" />
                <span>دسته‌بندی‌های محصولات</span>
                <ChevronDown className={`w-3 h-3 text-pink-500 transform transition-transform duration-200 ${megaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Dropdown Panel */}
              {megaMenuOpen && (
                <div 
                  onMouseLeave={() => setMegaMenuOpen(false)}
                  className="absolute top-full right-0 mt-2 w-[580px] bg-white rounded-3xl shadow-2xl border border-pink-100 p-5 z-50 animate-in fade-in slide-in-from-top-2 text-right"
                >
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-pink-50">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <Sparkles className="w-4 h-4 text-pink-600" />
                      <span>کالکشن‌های لوکس بوتیک ابر صورتی</span>
                    </div>
                    <button
                      onClick={() => {
                        navigateToCategory('all');
                        setMegaMenuOpen(false);
                      }}
                      className="text-[11px] text-pink-600 hover:underline font-bold cursor-pointer"
                    >
                      مشاهده همه ({products.length} محصول) ←
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {categories.filter(c => c.id !== 'all').map((cat) => {
                      const count = products.filter(p => p.category === cat.id).length;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            navigateToCategory(cat.id);
                            setMegaMenuOpen(false);
                          }}
                          className="flex items-start gap-3 p-3 rounded-2xl hover:bg-pink-50/70 border border-transparent hover:border-pink-100 transition group text-right cursor-pointer"
                        >
                          <span className="text-2xl p-2 bg-pink-50 group-hover:bg-white rounded-2xl group-hover:scale-110 transition-transform">
                            {cat.icon}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-slate-800 group-hover:text-pink-600 transition">
                                {cat.name}
                              </h4>
                              <span className="text-[10px] bg-pink-100 text-pink-700 px-1.5 py-0.2 rounded-full font-bold">
                                {count} کالا
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                              {cat.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-3 pt-3 border-t border-pink-50 bg-gradient-to-r from-pink-50/60 to-rose-50/40 p-3 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-700">
                      <span>🎁</span>
                      <span>بسته‌بندی کادویی با روبان صورتی و ارسال محرمانه</span>
                    </div>
                    <button
                      onClick={() => {
                        navigateToAbout();
                        setMegaMenuOpen(false);
                      }}
                      className="text-xs font-bold text-pink-700 hover:underline cursor-pointer"
                    >
                      درباره ابر صورتی
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Category Links */}
            <button
              onClick={() => navigateToCategory('all')}
              className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                currentView === 'catalog' && selectedCategory === 'all' && searchQuery === ''
                  ? 'bg-pink-100 text-pink-700 font-bold' 
                  : 'hover:text-pink-600 hover:bg-pink-50/80 text-slate-700'
              }`}
            >
              ✨ تمام محصولات
            </button>

            {categories.filter(c => c.id !== 'all').slice(0, 4).map(cat => (
              <button
                key={cat.id}
                onClick={() => navigateToCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  currentView === 'catalog' && selectedCategory === cat.id
                    ? 'bg-pink-100 text-pink-700 font-bold'
                    : 'hover:text-pink-600 hover:bg-pink-50/80 text-slate-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}

            <button
              onClick={navigateToAbout}
              className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                currentView === 'about'
                  ? 'bg-pink-100 text-pink-700 font-bold'
                  : 'hover:text-pink-600 hover:bg-pink-50/80 text-slate-700'
              }`}
            >
              <Info className="w-3.5 h-3.5 text-pink-500" />
              <span>درباره ما</span>
            </button>

          </nav>

          {/* Flash Deals & Admin Portal Direct Links */}
          <div className="flex items-center gap-2">
            <button
              onClick={navigateToFlashDeals}
              className="flex items-center gap-1.5 text-rose-600 hover:text-rose-700 font-bold bg-rose-50 hover:bg-rose-100/80 px-3 py-1.5 rounded-full text-xs transition cursor-pointer animate-pulse"
            >
              <Flame className="w-4 h-4 fill-rose-500" />
              <span>پیشنهادهای شگفت‌انگیز</span>
            </button>
          </div>

        </div>

      </div>

    </header>
  );
};
