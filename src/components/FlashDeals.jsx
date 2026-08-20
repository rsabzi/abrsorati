import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { Flame, Clock, ShoppingBag, Eye, Heart, ArrowLeft, Check } from 'lucide-react';

export const FlashDeals = () => {
  const { 
    products,
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct, 
    navigateToProduct,
    navigateToCategory 
  } = useShop();

  // 8-hour live countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 7,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashProducts = (products || []).filter(p => p.isFlashDeal).slice(0, 4);

  return (
    <section id="flash-deals-section" className="py-12 bg-gradient-to-b from-rose-50/50 via-pink-50/30 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Container */}
        <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-pink-300/40 relative overflow-hidden mb-8">
          
          {/* Background decorative circles */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-right">
            
            {/* Right: Title & description */}
            <div className="flex flex-col items-center md:items-start text-center md:text-right">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-yellow-200 mb-3 border border-white/20">
                <Flame className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                <span>فرصت محدود — تخفیف‌های شگفت‌انگیز روزانه</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                پیشنهادهای شگفت‌انگیز ابر صورتی 🎀
              </h2>
              <p className="text-pink-100 text-xs sm:text-sm mt-2 max-w-lg">
                تعداد محدودی از پرطرفدارترین دست‌بافت‌ها با تخفیف ویژه فقط تا پایان تایمر زیر!
              </p>
            </div>

            {/* Left: Countdown Boxes */}
            <div className="flex items-center gap-3 bg-black/25 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/20">
              <div className="text-center px-3 py-1 bg-white/20 rounded-xl min-w-[54px]">
                <span className="font-mono text-xl sm:text-2xl font-black text-white">
                  {String(timeLeft.seconds).padStart(2, '۰')}
                </span>
                <span className="block text-[10px] text-pink-200 mt-0.5">ثانیه</span>
              </div>
              <span className="font-mono text-xl font-bold text-yellow-300">:</span>
              <div className="text-center px-3 py-1 bg-white/20 rounded-xl min-w-[54px]">
                <span className="font-mono text-xl sm:text-2xl font-black text-white">
                  {String(timeLeft.minutes).padStart(2, '۰')}
                </span>
                <span className="block text-[10px] text-pink-200 mt-0.5">دقیقه</span>
              </div>
              <span className="font-mono text-xl font-bold text-yellow-300">:</span>
              <div className="text-center px-3 py-1 bg-white/20 rounded-xl min-w-[54px]">
                <span className="font-mono text-xl sm:text-2xl font-black text-yellow-300">
                  {String(timeLeft.hours).padStart(2, '۰')}
                </span>
                <span className="block text-[10px] text-pink-200 mt-0.5">ساعت</span>
              </div>
            </div>

          </div>
        </div>

        {/* Flash Deal Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashProducts.map((product) => {
            const isSaved = isInWishlist(product.id);
            const stockRemaining = product.stockCount || 5;

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-pink-100/90 shadow-sm hover:shadow-xl hover:shadow-pink-200/50 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col group"
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-pink-50/50 cursor-pointer">
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    onClick={() => navigateToProduct(product.id)}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />

                  {/* Discount Badge */}
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-black px-2.5 py-1 rounded-xl shadow-md flex items-center gap-1">
                    <span>٪{product.discountPercent}</span>
                    <span className="text-[10px] font-medium">تخفیف</span>
                  </div>

                  {/* Top Left Action Buttons: Wishlist & Quick View */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-sm ${
                        isSaved 
                          ? 'bg-rose-500 text-white' 
                          : 'bg-white/90 text-slate-700 hover:bg-rose-50 hover:text-rose-600'
                      }`}
                      title="علاقه‌مندی‌ها"
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="p-2 rounded-xl bg-white/90 backdrop-blur-md text-slate-700 hover:bg-pink-50 hover:text-pink-600 transition shadow-sm"
                      title="مشاهده سریع"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Inventory Warning Badge */}
                  <div className="absolute bottom-3 right-3 left-3">
                    <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-pink-100 shadow-xs">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1">
                        <span className="text-rose-600">تنها {stockRemaining} عدد باقیست!</span>
                        <span className="text-slate-400 font-normal text-[10px]">فروش بالا 🔥</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-yellow-400 to-rose-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, (10 - stockRemaining) * 12 + 40)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between text-right">
                  <div>
                    <span className="text-[11px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md">
                      {product.categoryName}
                    </span>
                    <h3 
                      onClick={() => navigateToProduct(product.id)}
                      className="text-sm font-bold text-slate-800 hover:text-pink-600 transition-colors mt-2 cursor-pointer line-clamp-2 leading-relaxed"
                    >
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-pink-50 flex items-center justify-between gap-2">
                    {/* Price Block */}
                    <div className="flex flex-col">
                      {product.originalPrice && (
                        <span className="text-[11px] text-slate-400 line-through font-mono">
                          {formatPrice(product.originalPrice)} تومان
                        </span>
                      )}
                      <span className="text-sm sm:text-base font-black text-rose-600">
                        {formatPrice(product.price)}{' '}
                        <span className="text-xs font-normal text-slate-600">تومان</span>
                      </span>
                    </div>

                    {/* Quick Add To Cart Button */}
                    <button
                      onClick={() => addToCart(product)}
                      className="p-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-xl shadow-md shadow-pink-200 transition-all transform active:scale-95 flex items-center gap-1.5 text-xs font-bold"
                      title="افزودن به سبد خرید"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span className="hidden sm:inline">خرید</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
