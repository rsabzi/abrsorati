import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Heart, Eye, Star, Sparkles } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    navigateToProduct
  } = useShop();

  const isSaved = isInWishlist(product.id);

  return (
    <div className="bg-white rounded-3xl border border-pink-100/80 shadow-xs hover:shadow-xl hover:shadow-pink-200/40 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col group text-right">
      
      {/* Product Image Box */}
      <div 
        onClick={() => navigateToProduct(product.id)}
        className="relative aspect-[4/4] overflow-hidden bg-pink-50/40 cursor-pointer"
      >
        <img
          src={product.primaryImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badge Overlay (Top Right) */}
        {product.badge && (
          <div className="absolute top-3 right-3">
            <span className={`${product.badgeColor || 'bg-rose-500'} text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-xl shadow-md flex items-center gap-1`}>
              <Sparkles className="w-3 h-3" />
              <span>{product.badge}</span>
            </span>
          </div>
        )}

        {/* Top Left Action Buttons: Wishlist & Quick View */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
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
            title={isSaved ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
            aria-label="علاقه‌مندی"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="p-2 rounded-xl bg-white/90 backdrop-blur-md text-slate-700 hover:bg-pink-50 hover:text-pink-600 transition shadow-sm"
            title="مشاهده سریع محصول"
            aria-label="مشاهده سریع"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Color Palette Preview Swatches (Bottom) */}
        {product.colors && product.colors.length > 1 && (
          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full border border-pink-100/60 shadow-2xs">
            {product.colors.map(col => (
              <span
                key={col.id}
                style={{ backgroundColor: col.hex }}
                className="w-2.5 h-2.5 rounded-full border border-slate-300"
                title={col.name}
              />
            ))}
            <span className="text-[9px] text-slate-500 font-bold mr-0.5">
              {product.colors.length} رنگ
            </span>
          </div>
        )}
      </div>

      {/* Product Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-semibold text-pink-500 bg-pink-50 px-2 py-0.5 rounded-md">
              {product.categoryName}
            </span>
            
            <div className="flex items-center gap-1 text-[11px] text-slate-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => navigateToProduct(product.id)}
            className="text-xs sm:text-sm font-bold text-slate-800 hover:text-pink-600 transition-colors line-clamp-2 leading-relaxed cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Short specs highlight */}
          <p className="text-[11px] text-slate-400 line-clamp-1 mt-1 font-light">
            {product.specs?.fabric || product.specs?.yarnType || product.shortDescription?.slice(0, 35)}
          </p>
        </div>

        {/* Price & Add to Cart Footer */}
        <div className="mt-4 pt-3 border-t border-pink-50/80 flex items-center justify-between gap-2">
          
          {/* Price Box */}
          <div className="flex flex-col">
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 rounded">
                  ٪{product.discountPercent}
                </span>
              </div>
            )}
            <span className="text-sm sm:text-base font-black text-rose-600 tracking-tight">
              {formatPrice(product.price)}{' '}
              <span className="text-[11px] font-medium text-slate-600">تومان</span>
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product)}
            className="p-2.5 sm:px-3 sm:py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-xl shadow-sm shadow-pink-200 transition-all duration-200 active:scale-95 flex items-center gap-1.5 text-xs font-bold"
            title="افزودن به سبد خرید"
            aria-label="خرید محصول"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">افزودن</span>
          </button>

        </div>

      </div>
    </div>
  );
};
