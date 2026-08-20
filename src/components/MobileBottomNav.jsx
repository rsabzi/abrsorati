import React from 'react';
import { useShop } from '../context/ShopContext';
import { Home, Grid, Heart, ShoppingBag, Package } from 'lucide-react';

export const MobileBottomNav = () => {
  const {
    currentView,
    navigateToHome,
    navigateToCategory,
    navigateToWishlist,
    navigateToOrders,
    setCartDrawerOpen,
    wishlist,
    getCartItemCount
  } = useShop();

  const cartCount = getCartItemCount();

  // Hide on Admin routes
  if (currentView === 'admin') return null;

  const NavBtn = ({ active, onClick, icon: Icon, label, badge, badgeColor = 'bg-rose-500' }) => (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 py-2 px-1 rounded-xl transition active:scale-95 ${
        active ? 'text-pink-600' : 'text-slate-500'
      }`}
      aria-label={label}
    >
      <div className="relative">
        <Icon className={`w-[22px] h-[22px] ${active ? 'stroke-[2.5]' : ''}`} />
        {badge !== undefined && badge !== null && badge > 0 && (
          <span className={`absolute -top-1.5 -right-2 ${badgeColor} text-white text-[9px] font-black min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center border-2 border-white shadow-sm`}>
            {badge > 99 ? '۹۹+' : badge}
          </span>
        )}
      </div>
      <span className={`text-[10px] leading-tight ${active ? 'font-black' : 'font-medium'}`}>{label}</span>
      {active && (
        <span className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-pink-500" />
      )}
    </button>
  );

  return (
    <>
      {/* Spacer so page content isn't hidden behind the bar */}
      <div className="md:hidden h-[72px]" aria-hidden="true" />

      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-pink-100 shadow-[0_-4px_20px_-4px_rgba(244,114,182,0.25)]"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-stretch justify-around px-1 pt-1">
          <NavBtn
            active={currentView === 'home'}
            onClick={navigateToHome}
            icon={Home}
            label="خانه"
          />
          <NavBtn
            active={currentView === 'catalog'}
            onClick={() => navigateToCategory('all')}
            icon={Grid}
            label="فروشگاه"
          />

          {/* Center Cart FAB */}
          <button
            onClick={() => setCartDrawerOpen(true)}
            className="relative flex flex-col items-center justify-center flex-1 max-w-[80px]"
            aria-label="سبد خرید"
          >
            <div className="relative -mt-6 bg-gradient-to-tr from-pink-500 via-rose-500 to-pink-600 text-white p-3.5 rounded-full shadow-lg shadow-pink-400/40 active:scale-95 transition border-4 border-white">
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-300 text-rose-950 font-black text-[10px] min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {cartCount > 99 ? '۹۹+' : cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold text-pink-600 mt-0.5">سبد خرید</span>
          </button>

          <NavBtn
            active={currentView === 'wishlist'}
            onClick={navigateToWishlist}
            icon={Heart}
            label="علاقه‌مندی"
            badge={wishlist.length}
          />
          <NavBtn
            active={currentView === 'orders'}
            onClick={navigateToOrders}
            icon={Package}
            label="سفارشات"
          />
        </div>
      </nav>
    </>
  );
};
