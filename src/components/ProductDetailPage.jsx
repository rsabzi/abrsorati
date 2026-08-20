import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import {
  Star,
  ShoppingBag,
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  Sparkles,
  RotateCcw,
  Check,
  ChevronRight,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  Info,
  CheckCircle2,
  Zap,
  PackageCheck
} from 'lucide-react';

export const ProductDetailPage = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    navigateToCategory,
    navigateToHome,
    setCheckoutOpen,
    showToast
  } = useShop();

  const product = (products || []).find(p => p.id === selectedProductId) || products?.[0] || PRODUCTS[0];

  // Gallery state
  const [activeImage, setActiveImage] = useState(product.primaryImage);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('desc');

  // New review form state
  const [reviewsList, setReviewsList] = useState(product.reviews || []);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewCity, setNewReviewCity] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  // Sync state when product changes
  useEffect(() => {
    setActiveImage(product.primaryImage);
    setSelectedColor(product.colors?.[0] || null);
    setSelectedSize(product.sizes?.[0] || null);
    setQuantity(1);
    setReviewsList(product.reviews || []);
    setActiveTab('desc');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const effectivePrice = (product.price || 0) + (selectedSize?.priceModifier || 0);
  const effectiveOriginalPrice = product.originalPrice 
    ? (product.originalPrice + (selectedSize?.priceModifier || 0)) 
    : null;

  const isSaved = isInWishlist(product.id);

  // Handle Add to cart
  const handleAddToCart = () => {
    addToCart(product, {
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      openDrawer: true
    });
  };

  // Handle Direct Buy
  const handleBuyNow = () => {
    addToCart(product, {
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      openDrawer: false
    });
    setCheckoutOpen(true);
  };

  // Handle Share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('لینک محصول با موفقیت کپی شد!', 'info');
    }
  };

  // Handle Review submission
  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewText.trim()) {
      showToast('لطفاً نام و متن نظر خود را وارد کنید.', 'warning');
      return;
    }

    setSubmittingReview(true);
    setTimeout(() => {
      const reviewObj = {
        id: 'user-rev-' + Date.now(),
        author: newReviewAuthor.trim(),
        city: newReviewCity.trim() || 'تهران',
        rating: newReviewRating,
        date: 'هم‌اکنون',
        verified: true,
        text: newReviewText.trim(),
        helpfulCount: 1
      };
      setReviewsList(prev => [reviewObj, ...prev]);
      setNewReviewAuthor('');
      setNewReviewCity('');
      setNewReviewText('');
      setSubmittingReview(false);
      showToast('نظر ارزشمند شما با موفقیت ثبت شد! سپاسگزاریم 🌸', 'success');
    }, 600);
  };

  const relatedProducts = (products || []).filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
  const fallbackRelated = (products || []).filter(p => p.id !== product.id).slice(0, 4);
  const displayRelated = relatedProducts.length >= 2 ? relatedProducts : fallbackRelated;

  return (
    <div className="py-8 bg-slate-50/40 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6 text-right overflow-x-auto no-scrollbar">
          <button onClick={navigateToHome} className="hover:text-pink-600 transition cursor-pointer">
            صفحه اصلی
          </button>
          <span>/</span>
          <button onClick={() => navigateToCategory(product.category)} className="hover:text-pink-600 transition cursor-pointer">
            {product.categoryName}
          </button>
          <span>/</span>
          <span className="text-slate-800 font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Details Hero Card */}
        <div className="bg-white rounded-3xl border border-pink-100 shadow-sm p-6 sm:p-8 lg:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Gallery Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              {/* Main Active Image with Zoom Frame */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-pink-50/50 border border-pink-100 group">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badge if available */}
                {product.badge && (
                  <div className="absolute top-4 right-4">
                    <span className={`${product.badgeColor || 'bg-rose-500'} text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1 whitespace-nowrap`}>
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate max-w-[8rem]">{product.badge}</span>
                    </span>
                  </div>
                )}

                {/* Flash Deal timer badge */}
                {product.isFlashDeal && (
                  <div className="absolute bottom-4 right-4 left-4 bg-rose-600/90 backdrop-blur-md text-white px-3 py-2 rounded-2xl text-xs font-bold flex items-center justify-between shadow-lg">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 animate-spin text-yellow-300" />
                      <span>پیشنهاد شگفت‌انگیز ابر صورتی</span>
                    </span>
                    <span className="bg-yellow-300 text-rose-950 px-2 py-0.5 rounded-lg text-[11px] font-black">
                      ٪{product.discountPercent} تخفیف
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails Row */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.gallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImage === imgUrl 
                          ? 'border-pink-500 ring-2 ring-pink-200 scale-95' 
                          : 'border-pink-100 hover:border-pink-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`نمای ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Box Under Image */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-pink-50/60 rounded-2xl p-3 border border-pink-100/60 flex items-center gap-2.5 text-right">
                  <div className="p-2 bg-white rounded-xl text-pink-600 shadow-2xs">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">فاق ۱۰۰٪ پنبه ارگانیک</p>
                    <p className="text-[10px] text-slate-500">ضدحساسیت و آنتی‌باکتریال</p>
                  </div>
                </div>

                <div className="bg-pink-50/60 rounded-2xl p-3 border border-pink-100/60 flex items-center gap-2.5 text-right">
                  <div className="p-2 bg-white rounded-xl text-pink-600 shadow-2xs">
                    <PackageCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">ارسال کاملاً محرمانه</p>
                    <p className="text-[10px] text-slate-500">بسته‌بندی مات و پلمپ شده</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Info & Buy Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between text-right">
              
              <div>
                {/* SKU & Category Tag */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-pink-600 bg-pink-100/80 px-2.5 py-1 rounded-xl">
                    {product.categoryName}
                  </span>
                  <span className="text-xs font-mono text-slate-400">کد محصول: {product.sku}</span>
                </div>

                {/* Product Title */}
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-snug mb-2">
                  {product.name}
                </h1>

                {/* English subtitle */}
                <p className="text-xs text-slate-400 font-medium mb-4">
                  {product.nameEn}
                </p>

                {/* Ratings & Stock Row */}
                <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-pink-50 text-xs">
                  <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-100">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="font-bold text-amber-900">{product.rating}</span>
                    <button 
                      onClick={() => setActiveTab('reviews')}
                      className="text-slate-500 hover:text-pink-600 underline mr-1 cursor-pointer"
                    >
                      ({reviewsList.length} دیدگاه خریداران)
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-100 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>موجود در انبار بوتیک (آماده ارسال فوری)</span>
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed my-4">
                  {product.shortDescription}
                </p>

                {/* Color Selector */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2.5">
                      <span>انتخاب رنگ:</span>
                      <span className="text-pink-600 font-medium">{selectedColor?.name}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      {product.colors.map(color => (
                        <button
                          key={color.id}
                          onClick={() => setSelectedColor(color)}
                          className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all border cursor-pointer ${
                            selectedColor?.id === color.id
                              ? 'border-pink-500 bg-pink-50/80 text-pink-900 ring-2 ring-pink-200'
                              : 'border-slate-200 hover:border-pink-200 text-slate-700'
                          }`}
                        >
                          <span
                            style={{ backgroundColor: color.hex }}
                            className="w-4 h-4 rounded-full border border-slate-300 shadow-2xs"
                          />
                          <span>{color.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2.5">
                      <span>انتخاب سایز و اندازه:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {product.sizes.map(size => (
                        <button
                          key={size.id}
                          onClick={() => setSelectedSize(size)}
                          className={`p-3 rounded-2xl text-right text-xs font-bold transition-all border flex items-center justify-between cursor-pointer ${
                            selectedSize?.id === size.id
                              ? 'border-pink-500 bg-pink-50/80 text-pink-900 ring-2 ring-pink-200'
                              : 'border-slate-200 hover:border-pink-200 text-slate-700'
                          }`}
                        >
                          <span>{size.name}</span>
                          {size.priceModifier > 0 && (
                            <span className="text-[11px] text-pink-600 font-mono">
                              +{formatPrice(size.priceModifier)} ت
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Display Section */}
                <div className="bg-gradient-to-r from-pink-50/60 to-rose-50/40 p-4 rounded-3xl border border-pink-100/90 mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 font-medium">قیمت نهایی:</span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-2xl sm:text-3xl font-black text-rose-600 tracking-tight">
                        {formatPrice(effectivePrice)}
                      </span>
                      <span className="text-xs font-bold text-slate-700">تومان</span>
                    </div>
                  </div>

                  {effectiveOriginalPrice && (
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-slate-400 line-through font-mono">
                        {formatPrice(effectiveOriginalPrice)} تومان
                      </span>
                      <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg mt-0.5">
                        سود شما: {formatPrice(effectiveOriginalPrice - effectivePrice)} تومان (٪{product.discountPercent})
                      </span>
                    </div>
                  )}
                </div>

                {/* Quantity, Add to Cart & Buy Now Action Controls */}
                <div className="space-y-3 w-full min-w-0">
                  {/* Row 1: Quantity + Wishlist + Share */}
                  <div className="flex items-center gap-3 w-full min-w-0">
                    
                    {/* Quantity Counter */}
                    <div className="flex items-center bg-slate-100 rounded-2xl p-1 border border-slate-200 shrink-0 min-w-0">
                      <button
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="w-9 h-9 rounded-xl bg-white text-slate-700 font-bold hover:bg-pink-50 hover:text-pink-600 flex items-center justify-center transition cursor-pointer shrink-0"
                        aria-label="کاهش تعداد"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-black text-slate-800 text-sm font-mono">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(q => q + 1)}
                        className="w-9 h-9 rounded-xl bg-white text-slate-700 font-bold hover:bg-pink-50 hover:text-pink-600 flex items-center justify-center transition cursor-pointer shrink-0"
                        aria-label="افزایش تعداد"
                      >
                        +
                      </button>
                    </div>

                    {/* Wishlist Heart Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer shrink-0 min-w-0 ${
                        isSaved
                          ? 'bg-rose-500 text-white border-rose-500'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-pink-50 hover:text-rose-600'
                      }`}
                      title={isSaved ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
                    >
                      <Heart className={`w-5 h-5 shrink-0 ${isSaved ? 'fill-white' : ''}`} />
                    </button>

                    {/* Share Button */}
                    <button
                      onClick={handleShare}
                      className="p-3.5 rounded-2xl bg-white text-slate-700 border border-slate-200 hover:bg-pink-50 hover:text-pink-600 transition cursor-pointer shrink-0 min-w-0"
                      title="اشتراک‌گذاری محصول"
                    >
                      <Share2 className="w-5 h-5 shrink-0" />
                    </button>
                  </div>

                  {/* Row 2: Add to Cart (full width) */}
                  <button
                    onClick={handleAddToCart}
                    className="w-full min-w-0 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white py-3.5 px-6 rounded-2xl font-black text-sm sm:text-base shadow-lg shadow-pink-300/50 hover:shadow-xl hover:shadow-pink-400/60 transition-all flex items-center justify-center gap-2 transform active:scale-98 cursor-pointer"
                  >
                    <ShoppingBag className="w-5 h-5 shrink-0" />
                    <span className="truncate">افزودن به سبد خرید</span>
                  </button>

                  {/* Row 3: Buy Now Direct Button */}
                  <button
                    onClick={handleBuyNow}
                    className="w-full min-w-0 bg-slate-900 hover:bg-slate-800 text-white py-3 px-6 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Zap className="w-4 h-4 shrink-0 text-yellow-400 fill-yellow-400" />
                    <span className="truncate">خرید سریع و آنی (ورود مستقیم به تسویه حساب)</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Detailed Tabs: Description, Specs, Care, Reviews, FAQ */}
        <div className="bg-white rounded-3xl border border-pink-100 shadow-sm p-6 sm:p-8 mb-12 text-right">
          
          {/* Tab Buttons Header */}
          <div className="flex items-center gap-2 border-b border-pink-100 pb-4 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('desc')}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 flex-shrink-0 cursor-pointer ${
                activeTab === 'desc'
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>معرفی و ویژگی‌های تخصصی</span>
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 flex-shrink-0 cursor-pointer ${
                activeTab === 'specs'
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>مشخصات فنی و متریال</span>
            </button>

            <button
              onClick={() => setActiveTab('care')}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 flex-shrink-0 cursor-pointer ${
                activeTab === 'care'
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>راهنمای شستشو و حفظ لطافت</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 flex-shrink-0 cursor-pointer ${
                activeTab === 'reviews'
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>دیدگاه خریداران ({reviewsList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('faq')}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 flex-shrink-0 cursor-pointer ${
                activeTab === 'faq'
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>پرسش‌های متداول</span>
            </button>
          </div>

          {/* Tab Content Panes */}
          <div className="py-6">
            
            {/* Tab 1: Description */}
            {activeTab === 'desc' && (
              <div className="space-y-4 max-w-4xl animate-in fade-in">
                <h3 className="text-lg font-black text-slate-900 mb-2">
                  طراحی ارگونومیک، لطافت ابریشمی و سلامت پوست
                </h3>
                <div className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {product.description}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-pink-50 mt-6">
                  <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100">
                    <h4 className="text-xs font-bold text-pink-700 mb-1">🌸 فاق دوبل پنبه‌ای آنتی‌باکتریال</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      جلوگیری از تجمع باکتری، قارچ و بوی نامطبوع با پارچه‌های تست شده پوستی.
                    </p>
                  </div>
                  <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100">
                    <h4 className="text-xs font-bold text-pink-700 mb-1">🎀 برش لیزری بدون رد دوخت</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      کاملاً محو زیر لباس‌های مجلسی، لگ‌های ورزشی و شلوارهای جذب.
                    </p>
                  </div>
                  <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100">
                    <h4 className="text-xs font-bold text-pink-700 mb-1">📦 بسته‌بندی معطر محرمانه</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      ارسال در کارتن مات بدون درج نام کالاها و همراه با عطر فرانسوی اسطوخودوس.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Specs */}
            {activeTab === 'specs' && (
              <div className="max-w-3xl animate-in fade-in">
                <h3 className="text-lg font-black text-slate-900 mb-4">
                  جدول مشخصات فنی، متریال و استانداردها
                </h3>
                <div className="rounded-2xl border border-pink-100 overflow-hidden divide-y divide-pink-50 text-xs">
                  {Object.entries(product.specs || {}).map(([key, val], idx) => {
                    const labelMap = {
                      fabric: 'جنس و ترکیب پارچه:',
                      cupType: 'نوع کاپ و پد:',
                      cup: 'کاپ و اسفنج:',
                      strapType: 'نوع بند:',
                      sizeFit: 'سایزبندی و تناسب:',
                      gusset: 'جنس فاق داخلی:',
                      cut: 'نوع دوخت و برش:',
                      pack: 'محتویات بسته:',
                      cuff: 'کشبافت و لبه:',
                      embroidery: 'طرح و تزئینات:',
                      season: 'فصل استفاده:',
                      elastic: 'نوع کشسانی:',
                      benefits: 'خواص سلامتی:',
                      edge: 'نوع دوخت لبه:',
                      dimensions: 'ابعاد و قواره:',
                      styling: 'کاربردها و استایل:',
                      heel: 'قسمت پاشنه و کف:',
                      accent: 'تزئینات خاص:',
                      charm: 'پلاک و یراق‌آلات:',
                      tailLength: 'طول دنباله:',
                      contents: 'محتویات باکس:',
                      packaging: 'نوع بسته‌بندی:',
                      fragrance: 'رایحه اختصاصی:',
                      giftCard: 'کارت پستال:',
                      print: 'نوع چاپ و رنگ:',
                      adjuster: 'نوع رگلاژ و سگک:',
                      waist: 'دور کمر و فاق:',
                      washability: 'روش شستشو:'
                    };
                    return (
                      <div key={key} className={`grid grid-cols-3 p-3.5 ${idx % 2 === 0 ? 'bg-pink-50/40' : 'bg-white'}`}>
                        <span className="font-bold text-slate-500">{labelMap[key] || key}:</span>
                        <span className="col-span-2 font-semibold text-slate-800">{val}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 3: Care Guidelines */}
            {activeTab === 'care' && (
              <div className="max-w-3xl space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed animate-in fade-in">
                <h3 className="text-lg font-black text-slate-900 mb-3">
                  دستورالعمل شستشو و نگهداری لباس زیر و اکسسوری‌های ابر صورتی
                </h3>
                <p>
                  برای افزایش طول عمر کشسانی پارچه و حفظ بهداشت کامل پوست، رعایت نکات زیر توصیه می‌شود:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100">
                    <h4 className="font-bold text-slate-800 mb-1 text-xs">۱. دمای آب شستشو</h4>
                    <p className="text-[11px] text-slate-500">حداکثر از آب ولرم مایل به سرد (۳۰ درجه سانتی‌گراد) استفاده کنید تا الیاف الاستین آسیب نبینند.</p>
                  </div>
                  <div className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100">
                    <h4 className="font-bold text-slate-800 mb-1 text-xs">۲. شوینده‌های ملایم</h4>
                    <p className="text-[11px] text-slate-500">از صابون‌های آنتی‌باکتریال یا مایع مخصوص لباس زیر بدون سفیدکننده استفاده نمایید.</p>
                  </div>
                  <div className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100">
                    <h4 className="font-bold text-slate-800 mb-1 text-xs">۳. کیسه مخصوص شستشو</h4>
                    <p className="text-[11px] text-slate-500">در صورت شستشو با ماشین، کراپ‌ها و شورت‌ها را داخل کیسه محافظ توری قرار دهید.</p>
                  </div>
                  <div className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100">
                    <h4 className="font-bold text-slate-800 mb-1 text-xs">۴. خشک کردن در سایه</h4>
                    <p className="text-[11px] text-slate-500">لباس‌ها را در هوای آزاد و در سایه پهن کنید و از اتوکشی مستقیم روی بخش‌های لیزری خودداری فرمایید.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-8 animate-in fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-pink-50/40 p-5 rounded-2xl border border-pink-100">
                  <div>
                    <h3 className="text-base font-bold text-slate-800">نظرات خریداران تایید شده</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      میانگین امتیاز {product.rating} از ۵ ستاره بر اساس {reviewsList.length} دیدگاه واقعی
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-rose-600">{product.rating}</span>
                    <div className="flex text-amber-400">★★★★★</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {reviewsList.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl border border-pink-100 bg-white space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-xs">
                            {rev.author[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-800">{rev.author}</span>
                              {rev.verified && (
                                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 rounded">
                                  خریدار تایید شده ✓
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400">{rev.city} • {rev.date}</span>
                          </div>
                        </div>

                        <div className="flex text-amber-400 text-xs">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed pr-10">
                        {rev.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Add Review Form */}
                <div className="bg-gradient-to-br from-pink-50/60 to-rose-50/40 p-6 rounded-3xl border border-pink-100 max-w-2xl">
                  <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <Send className="w-4 h-4 text-pink-600" />
                    <span>ثبت نظر و تجربه خرید شما</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 mb-4">
                    دیدگاه شما به سایر همراهان ابر صورتی در انتخاب بهتر سایز و مدل کمک می‌کند.
                  </p>

                  <form onSubmit={handleAddReview} className="space-y-4 text-right">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">نام و نام‌خانوادگی</label>
                        <input
                          type="text"
                          required
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          placeholder="مثلاً: نیلوفر رهنما"
                          className="w-full bg-white text-xs rounded-xl p-2.5 border border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">شهر محل سکونت</label>
                        <input
                          type="text"
                          value={newReviewCity}
                          onChange={(e) => setNewReviewCity(e.target.value)}
                          placeholder="مثلاً: اصفهان"
                          className="w-full bg-white text-xs rounded-xl p-2.5 border border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">امتیاز شما</label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewReviewRating(star)}
                            className="p-1 text-lg cursor-pointer"
                          >
                            <Star className={`w-6 h-6 ${star <= newReviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">متن نظر شما</label>
                      <textarea
                        rows="3"
                        required
                        value={newReviewText}
                        onChange={(e) => setNewReviewText(e.target.value)}
                        placeholder="کیفیت پارچه، تنخور، لطافت کش‌ها و بسته‌بندی را بنویسید..."
                        className="w-full bg-white text-xs rounded-xl p-3 border border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submittingReview}
                      className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer"
                    >
                      <span>ثبت دیدگاه</span>
                      {submittingReview ? <Clock className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Tab 5: FAQ */}
            {activeTab === 'faq' && (
              <div className="space-y-3 max-w-3xl animate-in fade-in">
                <h3 className="text-lg font-black text-slate-900 mb-3">
                  سوالات پر تکرار مشتریان
                </h3>
                
                <details className="bg-pink-50/40 p-4 rounded-2xl border border-pink-100 cursor-pointer group" open>
                  <summary className="font-bold text-xs sm:text-sm text-slate-800 list-none flex items-center justify-between">
                    <span>آیا بسته‌بندی ارسالی محرمانه است؟</span>
                    <ChevronRight className="w-4 h-4 text-pink-600 transform group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="text-xs text-slate-600 mt-2 pt-2 border-t border-pink-100/60 leading-relaxed">
                    بله صد در صد! تمامی مرسولات داخل پاکت‌ها و کارتن‌های کاملاً مات و پلمپ شده پستی ارسال می‌شوند و هیچ نامی از لباس زیر روی بسته درج نمی‌شود.
                  </p>
                </details>

                <details className="bg-pink-50/40 p-4 rounded-2xl border border-pink-100 cursor-pointer group">
                  <summary className="font-bold text-xs sm:text-sm text-slate-800 list-none flex items-center justify-between">
                    <span>آیا پدهای کراپ تاپ قابل جدا شدن هستند؟</span>
                    <ChevronRight className="w-4 h-4 text-pink-600 transform group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="text-xs text-slate-600 mt-2 pt-2 border-t border-pink-100/60 leading-relaxed">
                    بله، تمامی کراپ‌های کاپ‌دار دارای شیار مخفی داخلی هستند تا به راحتی بتوانید پدها را هنگام شستشو خارج کرده یا با پد دلخواه تعویض نمایید.
                  </p>
                </details>

                <details className="bg-pink-50/40 p-4 rounded-2xl border border-pink-100 cursor-pointer group">
                  <summary className="font-bold text-xs sm:text-sm text-slate-800 list-none flex items-center justify-between">
                    <span>چطور سایز مناسب را انتخاب کنم؟</span>
                    <ChevronRight className="w-4 h-4 text-pink-600 transform group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="text-xs text-slate-600 mt-2 pt-2 border-t border-pink-100/60 leading-relaxed">
                    کراپ‌ها و جوراب‌ها به دلیل کشسانی ۳۶۰ درجه فری‌سایز استاندارد هستند. برای شورت‌ها نیز محدوده سایز کمر و باسن در جدول مشخصات هر محصول درج شده است.
                  </p>
                </details>
              </div>
            )}

          </div>

        </div>

        {/* Related Products Carousel */}
        {displayRelated.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6 text-right">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  تکمیل ست و پیشنهادات هماهنگ 🎀
                </h3>
                <p className="text-xs text-slate-500 mt-1">محصولات منتخب ست با این کالا</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayRelated.map(item => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
