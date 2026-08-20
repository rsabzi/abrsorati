import React from 'react';
import { useShop } from '../context/ShopContext';
import { Home, Grid, Heart, ShoppingBag, Truck } from 'lucide-react';

export const MobileBottomNav = () => {
  const {
    currentView,
    navigateToHome,
    navigateToCategory,
    navigateToWishlist,
    setCartDrawerOpen,
    setTrackingModalOpen,
    wishlist,
    getCartItemCount
  } = useShop();

  const cartCount = getCartItemCount();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-pink-100/90 shadow-2xl px-2 py-1.5 flex items-center justify-around">
      
      {/* Home */}
      <button
        onClick={navigateToHome}
        className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition ${
          currentView === 'home' ? 'text-pink-600 font-bold' : 'text-slate-500'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px]">خانه</span>
      </button>

      {/* Catalog */}
      <button
        onClick={() => navigateToCategory('all')}
        className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition ${
          currentView === 'catalog' ? 'text-pink-600 font-bold' : 'text-slate-500'
        }`}
      >
        <Grid className="w-5 h-5" />
        <span className="text-[10px]">فروشگاه</span>
      </button>

      {/* Cart (Center Big Bubble) */}
      <button
        onClick={() => setCartDrawerOpen(true)}
        className="relative -top-3 bg-gradient-to-tr from-pink-500 via-rose-500 to-pink-600 text-white p-3 rounded-full shadow-lg shadow-pink-300 transform active:scale-95 transition"
      >
        <ShoppingBag className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-yellow-300 text-rose-950 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
            {cartCount}
          </span>
        )}
      </button>

      {/* Wishlist */}
      <button
        onClick={navigateToWishlist}
        className={`relative flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition ${
          currentView === 'wishlist' ? 'text-pink-600 font-bold' : 'text-slate-500'
        }`}
      >
        <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-rose-500 fill-rose-50' : ''}`} />
        <span className="text-[10px]">علاقه‌مندی</span>
        {wishlist.length > 0 && (
          <span className="absolute 1 right-2 bg-rose-500 text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
            {wishlist.length}
          </span>
        )}
      </button>

      {/* Tracking */}
      <button
        onClick={() => setTrackingModalOpen(true)}
        className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-slate-500 hover:text-pink-600 transition"
      >
        <Truck className="w-5 h-5" />
        <span className="text-[10px]">پیگیری</span>
      </button>

    </div>
  );
};
