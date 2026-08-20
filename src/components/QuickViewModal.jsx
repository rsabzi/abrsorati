import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Star, ShoppingBag, Heart, ArrowLeft, Check, Sparkles } from 'lucide-react';

export const QuickViewModal = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    navigateToProduct
  } = useShop();

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedColor(quickViewProduct.colors?.[0] || null);
      setSelectedSize(quickViewProduct.sizes?.[0] || null);
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const effectivePrice = (quickViewProduct.price || 0) + (selectedSize?.priceModifier || 0);
  const isSaved = isInWishlist(quickViewProduct.id);

  const handleAdd = () => {
    addToCart(quickViewProduct, {
      color: selectedColor,
      size: selectedSize,
      quantity,
      openDrawer: true
    });
    setQuickViewProduct(null);
  };

  const handleFullView = () => {
    navigateToProduct(quickViewProduct.id);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 text-right animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-pink-100 max-w-2xl w-full overflow-hidden relative">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 left-4 z-10 p-2 text-slate-400 hover:text-slate-700 bg-white/80 backdrop-blur-md rounded-full shadow-xs hover:bg-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
          
          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-pink-50/50 border border-pink-100">
            <img
              src={quickViewProduct.primaryImage}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
            {quickViewProduct.badge && (
              <span className="absolute top-3 right-3 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
                {quickViewProduct.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md">
                {quickViewProduct.categoryName}
              </span>

              <h3 className="text-base font-black text-slate-900 mt-2 mb-1 leading-snug">
                {quickViewProduct.name}
              </h3>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-amber-400 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </div>
                <span className="text-xs font-bold text-slate-700">{quickViewProduct.rating}</span>
                <span className="text-xs text-slate-400">({quickViewProduct.reviewsCount} نظر)</span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                {quickViewProduct.shortDescription}
              </p>

              {/* Colors */}
              {quickViewProduct.colors && (
                <div className="mb-3">
                  <span className="text-xs font-bold text-slate-700 block mb-1.5">رنگ: {selectedColor?.name}</span>
                  <div className="flex gap-2">
                    {quickViewProduct.colors.map(col => (
                      <button
                        key={col.id}
                        onClick={() => setSelectedColor(col)}
                        style={{ backgroundColor: col.hex }}
                        className={`w-6 h-6 rounded-full border-2 transition ${
                          selectedColor?.id === col.id ? 'border-pink-600 ring-2 ring-pink-200' : 'border-white'
                        }`}
                        title={col.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="mb-4">
                <span className="text-xl font-black text-rose-600">
                  {formatPrice(effectivePrice)}{' '}
                  <span className="text-xs font-normal text-slate-600">تومان</span>
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-2.5 px-4 rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>افزودن به سبد</span>
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-2.5 rounded-xl border transition ${
                    isSaved ? 'bg-rose-500 text-white border-rose-500' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                  title="علاقه‌مندی"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleFullView}
                className="w-full text-center text-[11px] font-bold text-pink-600 hover:underline py-1"
              >
                مشاهده صفحه کامل و مشخصات فنی محصول ←
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
