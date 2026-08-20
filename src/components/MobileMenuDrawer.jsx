import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Search, 
  Home, 
  Grid, 
  Flame, 
  Heart, 
  Truck, 
  Info, 
  Tag, 
  Phone, 
  Sparkles,
  Settings
} from 'lucide-react';

export const MobileMenuDrawer = () => {
  const {
    products,
    categories,
    storeSettings,
    mobileMenuOpen,
    setMobileMenuOpen,
    currentView,
    selectedCategory,
    searchQuery,
    setSearchQuery,
    setCurrentView,
    wishlist,
    navigateToHome,
    navigateToCategory,
    navigateToAbout,
    navigateToWishlist,
    navigateToAdmin,
    isAdminAuthenticated,
    navigateToFlashDeals,
    setTrackingModalOpen,
    showToast
  } = useShop();

  if (!mobileMenuOpen) return null;

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('PINKCLOUD');
    showToast('کد تخفیف «PINKCLOUD» کپی شد! در سبد خرید اعمال کنید. 🎉', 'success');
  };

  return (
    <div className="fixed inset-0 z-[100] lg:hidden overflow-hidden">
      
      {/* 1. Full Screen Backdrop Overlay */}
      <div 
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* 2. Slide-out Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-xs sm:max-w-sm w-full bg-white shadow-2xl z-10 flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300 text-right">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-pink-100 bg-gradient-to-r from-pink-50 via-rose-50/40 to-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white p-0.5 shadow-md shadow-pink-200 border border-pink-100 flex items-center justify-center">
              <img
                src={storeSettings.logoUrl || '/images/logo-icon.png'}
                alt="ابر صورتی"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-black text-base text-slate-900">{storeSettings.storeName || 'ابر صورتی'}</h3>
                <span className="text-[10px] bg-pink-100 text-pink-700 font-bold px-1.5 py-0.5 rounded-md">
                  {storeSettings.domain || 'abrsorati.ir'}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">لباس زیر زنانه و اکسسوری</span>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-white transition cursor-pointer border border-transparent hover:border-pink-100"
            aria-label="بستن منو"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          
          {/* Quick Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="جستجو در محصولات (کراپ، شورت، جوراب...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setCurrentView('catalog');
                  setMobileMenuOpen(false);
                }
              }}
              className="w-full bg-pink-50/80 hover:bg-pink-50 text-slate-800 text-xs rounded-2xl pr-9 pl-3 py-3 border border-pink-200/80 outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white transition"
            />
            <Search className="w-4 h-4 text-pink-400 absolute right-3 top-3.5" />
          </div>

          {/* Main Navigation Links */}
          <div className="space-y-1">
            
            {/* Home */}
            <button
              onClick={() => {
                navigateToHome();
                setMobileMenuOpen(false);
              }}
              className={`w-full text-right p-3 rounded-2xl transition flex items-center justify-between text-xs font-bold cursor-pointer ${
                currentView === 'home' 
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-200' 
                  : 'hover:bg-pink-50/80 text-slate-700'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Home className="w-4 h-4" />
                <span>صفحه اصلی فروشگاه</span>
              </span>
              <span>🏠</span>
            </button>

            {/* All Products */}
            <button
              onClick={() => {
                navigateToCategory('all');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-right p-3 rounded-2xl transition flex items-center justify-between text-xs font-bold cursor-pointer ${
                currentView === 'catalog' && selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-200' 
                  : 'hover:bg-pink-50/80 text-pink-600 bg-pink-50/50'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Grid className="w-4 h-4" />
                <span>تمام محصولات بوتیک</span>
              </span>
              <span className="text-[10px] bg-white/40 px-2 py-0.5 rounded-full font-mono">{products.length}</span>
            </button>

            {/* Flash Deals */}
            <button
              onClick={() => {
                navigateToFlashDeals();
                setMobileMenuOpen(false);
              }}
              className="w-full text-right p-3 rounded-2xl hover:bg-rose-50 text-rose-600 transition flex items-center justify-between text-xs font-bold cursor-pointer border border-rose-100 bg-rose-50/30"
            >
              <span className="flex items-center gap-2.5">
                <Flame className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
                <span>پیشنهادهای شگفت‌انگیز امروز</span>
              </span>
              <span className="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-full font-bold">تخفیف‌دار</span>
            </button>

          </div>

          {/* Categories Section */}
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-pink-50 mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                <span>دسته‌بندی‌های موضوعی</span>
              </span>
            </div>

            <div className="space-y-1">
              {categories.filter(c => c.id !== 'all').map((cat) => {
                const count = products.filter(p => p.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      navigateToCategory(cat.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-right p-2.5 rounded-xl transition flex items-center justify-between text-xs cursor-pointer ${
                      currentView === 'catalog' && selectedCategory === cat.id
                        ? 'bg-pink-100 text-pink-700 font-bold'
                        : 'hover:bg-pink-50 text-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base">{cat.icon}</span>
                      <span>{cat.name}</span>
                    </span>
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-mono">
                      {count} کالا
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Admin & Services Links */}
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-pink-50 mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                امکانات و مدیریت
              </span>
            </div>

            <div className="space-y-1">
              {/* Admin Portal Shortcut (only for authenticated admins) */}
              {isAdminAuthenticated && (
                <button
                  onClick={() => {
                    navigateToAdmin('overview');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-right p-3 rounded-2xl bg-slate-900 text-white font-bold transition flex items-center justify-between text-xs cursor-pointer shadow-md"
                >
                  <span className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-pink-400" />
                    <span>ورود به پنل داشبورد مدیریت</span>
                  </span>
                  <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-md font-bold">فعال</span>
                </button>
              )}

              {/* Story */}
              <button
                onClick={() => {
                  navigateToAbout();
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-right p-2.5 rounded-xl transition flex items-center justify-between text-xs cursor-pointer ${
                  currentView === 'about' ? 'bg-pink-100 text-pink-700 font-bold' : 'hover:bg-pink-50 text-slate-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-pink-500" />
                  <span>درباره برند ابر صورتی</span>
                </span>
                <span>🌸</span>
              </button>

              {/* Order Tracking */}
              <button
                onClick={() => {
                  setTrackingModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-right p-2.5 rounded-xl hover:bg-pink-50 text-slate-700 hover:text-pink-600 transition flex items-center justify-between text-xs cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-pink-500" />
                  <span>سامانه رهگیری مرسولات پستی</span>
                </span>
                <span>📦</span>
              </button>

              {/* Wishlist */}
              <button
                onClick={() => {
                  navigateToWishlist();
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-right p-2.5 rounded-xl transition flex items-center justify-between text-xs cursor-pointer ${
                  currentView === 'wishlist' ? 'bg-pink-100 text-pink-700 font-bold' : 'hover:bg-pink-50 text-slate-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>لیست علاقه‌مندی‌ها</span>
                </span>
                <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-bold">
                  {wishlist.length}
                </span>
              </button>
            </div>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-pink-100 bg-pink-50/40 flex-shrink-0 space-y-2.5 text-xs text-slate-600">
          
          <div className="bg-white p-3 rounded-2xl border border-pink-200/80 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-2 text-pink-800 font-bold">
              <Tag className="w-3.5 h-3.5 text-pink-600" />
              <span>کد تخفیف ۱۵٪:</span>
            </div>
            <button
              onClick={handleCopyCoupon}
              className="font-mono font-bold bg-pink-100 hover:bg-pink-200 text-pink-700 px-2.5 py-1 rounded-lg text-xs transition cursor-pointer"
            >
              PINKCLOUD
            </button>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 text-slate-700 font-bold text-xs">
              <Phone className="w-3.5 h-3.5 text-pink-600" />
              <span>مشاوره و پشتیبانی:</span>
            </div>
            <span className="font-mono text-slate-800 font-bold dir-ltr text-xs">
              {storeSettings.phone || '۰۲۱-۹۱۰۱۸۷۶۵'}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
