import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Heart, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';

export const WishlistModal = () => {
  const {
    products,
    wishlist,
    toggleWishlist,
    formatPrice,
    navigateToProduct,
    navigateToCategory,
    addToCart,
    setCurrentView
  } = useShop();

  const savedProducts = (products || []).filter(p => wishlist.includes(p.id));

  return (
    <div className="py-8 bg-slate-50/50 min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 text-right">
          <div>
            <div className="flex items-center gap-2 text-rose-600 font-bold text-xs mb-1">
              <Heart className="w-4 h-4 fill-rose-500" />
              <span>کالکشن شخصی شما</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              لیست علاقه‌مندی‌ها و یادداشت‌های خرید
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              محصولات مورد علاقه خود را ذخیره کنید تا در زمان مناسب با یک کلیک سفارش دهید
            </p>
          </div>

          <span className="text-xs font-bold bg-pink-100 text-pink-700 px-3 py-1.5 rounded-full self-start sm:self-auto">
            {savedProducts.length} اثر ذخیره شده
          </span>
        </div>

        {/* Products Grid or Empty */}
        {savedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-pink-100 shadow-xs max-w-md mx-auto">
            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 animate-pulse">
              🤍
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">
              هنوز اثری به لیست علاقه‌مندی‌ها اضافه نکرده‌اید
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              با کلیک روی آیکون قلب روی هر اثر، می‌توانید دست‌بافت‌های دلخواهتان را اینجا جمع‌آوری کنید.
            </p>
            <button
              onClick={() => navigateToCategory('all')}
              className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold px-6 py-3 rounded-2xl shadow-md transition"
            >
              <span>مشاهده محصولات ویترین</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
