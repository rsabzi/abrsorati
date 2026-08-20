import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowLeft, 
  Gift, 
  Sparkles, 
  Truck, 
  Tag, 
  Check, 
  AlertCircle 
} from 'lucide-react';

export const CartDrawer = () => {
  const {
    cart,
    cartDrawerOpen,
    setCartDrawerOpen,
    updateCartQty,
    removeFromCart,
    clearCart,
    giftWrap,
    setGiftWrap,
    giftNote,
    setGiftNote,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    getCartSubtotal,
    getCartDiscount,
    getGiftWrapCost,
    getShippingCost,
    getCartTotal,
    getCartItemCount,
    formatPrice,
    setCheckoutOpen,
    navigateToCategory
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [giftNoteOpen, setGiftNoteOpen] = useState(false);

  if (!cartDrawerOpen) return null;

  const subtotal = getCartSubtotal();
  const discount = getCartDiscount();
  const giftCost = getGiftWrapCost();
  const shippingCost = getShippingCost();
  const total = getCartTotal();
  const itemCount = getCartItemCount();

  const freeShippingThreshold = 600000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setCartDrawerOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={() => setCartDrawerOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300 text-right">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-pink-100 bg-gradient-to-r from-pink-50/70 to-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-pink-100 text-pink-600 rounded-xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-800">سبد خرید شما</h2>
              <span className="text-xs text-slate-500 font-medium">
                {itemCount > 0 ? `${itemCount} قلم بافتنی انتخاب شده` : 'سبد خرید خالی است'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition text-xs font-bold"
                title="خالی کردن سبد"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setCartDrawerOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-pink-50 transition"
              aria-label="بستن سبد"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free Shipping Progress Bar */}
        {cart.length > 0 && (
          <div className="bg-pink-50/70 p-3.5 border-b border-pink-100/80">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <div className="flex items-center gap-1.5 text-pink-700">
                <Truck className="w-4 h-4 text-pink-600" />
                {remainingForFreeShipping === 0 ? (
                  <span className="text-emerald-600 font-bold">🎉 تبریک! ارسال این سفارش رایگان شد!</span>
                ) : (
                  <span>
                    فقط <strong className="text-rose-600 font-black">{formatPrice(remainingForFreeShipping)} تومان</strong> تا ارسال رایگان
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-500 font-mono">
                {Math.round(freeShippingProgress)}٪
              </span>
            </div>
            <div className="w-full bg-pink-200/60 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-pink-500 to-rose-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Items Scrollable List or Empty State */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.key}
                className="flex items-center gap-3 p-3 rounded-2xl border border-pink-100 bg-white shadow-2xs hover:border-pink-200 transition group"
              >
                {/* Thumbnail */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-pink-100 flex-shrink-0"
                />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-pink-600 transition">
                    {item.name}
                  </h4>

                  {/* Options tags */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[11px] text-slate-500 font-medium">
                    {item.selectedColor && (
                      <span className="inline-flex items-center gap-1 bg-pink-50 px-2 py-0.5 rounded-md">
                        <span
                          style={{ backgroundColor: item.selectedColor.hex }}
                          className="w-2 h-2 rounded-full border border-slate-300"
                        />
                        <span>{item.selectedColor.name}</span>
                      </span>
                    )}
                    {item.selectedSize && (
                      <span className="bg-slate-100 px-2 py-0.5 rounded-md">
                        {item.selectedSize.name.split(' ')[0]}
                      </span>
                    )}
                  </div>

                  {/* Price & Quantity Bar */}
                  <div className="flex items-center justify-between gap-2 mt-2">
                    <span className="text-xs sm:text-sm font-black text-rose-600">
                      {formatPrice(item.price * item.quantity)}{' '}
                      <span className="text-[10px] font-normal text-slate-500">تومان</span>
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200">
                      <button
                        onClick={() => updateCartQty(item.key, item.quantity - 1)}
                        className="w-6 h-6 rounded-lg bg-white text-slate-700 hover:text-rose-600 flex items-center justify-center text-xs font-bold transition"
                        title="کم کردن"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center font-bold text-xs font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQty(item.key, item.quantity + 1)}
                        className="w-6 h-6 rounded-lg bg-white text-slate-700 hover:text-pink-600 flex items-center justify-center text-xs font-bold transition"
                        title="اضافه کردن"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.key)}
                  className="p-1.5 text-slate-300 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition self-start"
                  title="حذف از سبد"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 animate-bounce">
                🛍️
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-1">
                سبد خرید شما در حال حاضر خالی است
              </h3>
              <p className="text-xs text-slate-500 mb-6 max-w-xs mx-auto leading-relaxed">
                هنوز هیچ اثر بافتنی به سبد خرید اضافه نکرده‌اید. بافتنی‌های فانتزی ما را بررسی کنید!
              </p>
              <button
                onClick={() => {
                  setCartDrawerOpen(false);
                  navigateToCategory('all');
                }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-6 py-3 rounded-2xl shadow-md transition"
              >
                <span>مشاهده محصولات و شروع خرید</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Gift Wrapping & Notes Section (Only when cart has items) */}
          {cart.length > 0 && (
            <div className="bg-pink-50/50 rounded-2xl p-3.5 border border-pink-100/80 space-y-2">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-pink-600" />
                  <span className="text-xs font-bold text-slate-800">
                    بسته‌بندی کادویی اختصاصی ابر صورتی (+۳۵,۰۰۰ ت)
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="w-4 h-4 rounded accent-pink-500 cursor-pointer"
                />
              </label>
              <p className="text-[10px] text-slate-500 leading-relaxed pr-6">
                جعبه مقاوم، ربان ساتن صورتی، پوشال و معطر با اسانس آرامش‌بخش اسطوخودوس.
              </p>

              {giftWrap && (
                <div className="pt-2">
                  <button
                    onClick={() => setGiftNoteOpen(!giftNoteOpen)}
                    className="text-[11px] font-bold text-pink-600 hover:underline flex items-center gap-1"
                  >
                    <span>{giftNoteOpen ? 'بستن یادداشت هدیه' : 'افزودن متن یادداشت روی کارت کادو ✍️'}</span>
                  </button>
                  {giftNoteOpen && (
                    <textarea
                      rows="2"
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="متن دلخواه خود برای درج روی کارت تبریک دست‌ساز را بنویسید..."
                      className="w-full bg-white text-xs rounded-xl p-2.5 mt-2 border border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {/* Coupon Code Section */}
          {cart.length > 0 && (
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-pink-600" />
                  <span>کد تخفیف دارید؟</span>
                </span>
                {appliedCoupon && (
                  <button
                    onClick={removeCoupon}
                    className="text-[10px] text-rose-600 hover:underline font-bold"
                  >
                    حذف کد
                  </button>
                )}
              </div>

              {appliedCoupon ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-2.5 rounded-xl text-xs flex items-center justify-between font-medium">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>کد <strong>{appliedCoupon.code}</strong> اعمال شد ({appliedCoupon.title})</span>
                  </div>
                  <span className="font-bold text-emerald-700 font-mono">
                    -{formatPrice(discount)} ت
                  </span>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="کد تخفیف: PINKCLOUD"
                    className="flex-1 bg-white text-xs rounded-xl px-3 py-2 border border-slate-200 outline-none uppercase font-mono tracking-wider focus:ring-2 focus:ring-pink-300"
                  />
                  <button
                    type="submit"
                    className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                  >
                    اعمال
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Drawer Footer: Price Summary & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-pink-100 bg-gradient-to-t from-pink-50/50 to-white space-y-3">
            
            {/* Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>مجموع اقلام ({itemCount}):</span>
                <span className="font-mono font-bold text-slate-800">{formatPrice(subtotal)} تومان</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>تخفیف جشنواره:</span>
                  <span className="font-mono font-bold">-{formatPrice(discount)} تومان</span>
                </div>
              )}

              {giftCost > 0 && (
                <div className="flex justify-between text-pink-600 font-medium">
                  <span>بسته‌بندی کادویی معطر:</span>
                  <span className="font-mono font-bold">+{formatPrice(giftCost)} تومان</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>هزینه ارسال پستی:</span>
                <span className="font-mono font-bold">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-600 font-bold">رایگان 🎉</span>
                  ) : (
                    `${formatPrice(shippingCost)} تومان`
                  )}
                </span>
              </div>

              <div className="pt-2 border-t border-pink-100 flex justify-between items-baseline text-sm font-black text-slate-900">
                <span>مبلغ نهایی قابل پرداخت:</span>
                <span className="text-lg font-black text-rose-600 tracking-tight">
                  {formatPrice(total)}{' '}
                  <span className="text-xs font-normal text-slate-600">تومان</span>
                </span>
              </div>
            </div>

            {/* Primary Checkout CTA */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-600 hover:from-rose-600 hover:to-fuchsia-700 text-white py-3.5 px-6 rounded-2xl font-black text-sm shadow-lg shadow-pink-300/50 transition flex items-center justify-center gap-2 transform active:scale-98"
            >
              <span>تکمیل و ثبت نهایی سفارش</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-slate-400 text-center">
              پرداخت امن از طریق تمامی کارت‌های عضو شتاب با ضمانت بازگشت وجه ۷ روزه
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
