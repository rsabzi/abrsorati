import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES } from '../../data/categories';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Sparkles, 
  Image as ImageIcon, 
  X, 
  Check, 
  Filter, 
  Eye, 
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const AdminProducts = () => {
  const { 
    products, 
    categories, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    resetProductsToDefault,
    formatPrice,
    navigateToProduct
  } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null for create, object for edit

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    category: 'crop-tops',
    categoryName: 'کراپ بند ماکارون',
    price: 180000,
    originalPrice: 220000,
    discountPercent: 18,
    stockCount: 10,
    inStock: true,
    isFlashDeal: false,
    badge: 'جدید',
    badgeColor: 'bg-rose-500',
    primaryImage: '/images/products/crop-macaron-1.jpg',
    shortDescription: '',
    description: '',
    fabric: 'کتان ارگانیک و میکروفایبر بدون درز',
    cupType: 'پد متحرک ابری'
  });

  // Filtered list
  const filteredList = products.filter(p => {
    const matchesCat = selectedCat === 'all' || p.category === selectedCat;
    const matchesSearch = !searchQuery.trim() || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.sku?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      nameEn: '',
      category: 'crop-tops',
      categoryName: 'کراپ بند ماکارون',
      price: 180000,
      originalPrice: 220000,
      discountPercent: 18,
      stockCount: 10,
      inStock: true,
      isFlashDeal: false,
      badge: 'جدید',
      badgeColor: 'bg-rose-500',
      primaryImage: '/images/products/crop-macaron-1.jpg',
      shortDescription: 'توضیحات کوتاه محصول...',
      description: 'توضیحات کامل محصول و مشخصات فنی...',
      fabric: 'پنبه ارگانیک ضدحساسیت و میکروفایبر',
      cupType: 'دارای پد متحرک'
    });
    setModalOpen(true);
  };

  const openEditModal = (prod) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name || '',
      nameEn: prod.nameEn || '',
      category: prod.category || 'crop-tops',
      categoryName: prod.categoryName || 'کراپ بند ماکارون',
      price: prod.price || 0,
      originalPrice: prod.originalPrice || 0,
      discountPercent: prod.discountPercent || 0,
      stockCount: prod.stockCount || 10,
      inStock: prod.inStock !== false,
      isFlashDeal: !!prod.isFlashDeal,
      badge: prod.badge || '',
      badgeColor: prod.badgeColor || 'bg-rose-500',
      primaryImage: prod.primaryImage || '/images/products/crop-macaron-1.jpg',
      shortDescription: prod.shortDescription || '',
      description: prod.description || '',
      fabric: prod.specs?.fabric || '',
      cupType: prod.specs?.cupType || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const catObj = categories.find(c => c.id === formData.category);
    const categoryName = catObj ? catObj.name : 'سایر';

    const discount = formData.originalPrice > formData.price 
      ? Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)
      : 0;

    const productPayload = {
      ...formData,
      categoryName,
      discountPercent: discount,
      specs: {
        fabric: formData.fabric,
        cupType: formData.cupType,
        washability: 'شستشو با آب ۳۰ درجه ملایم'
      },
      colors: [
        { id: 'pink', name: 'صورتی پاستلی', hex: '#F9A8D4' },
        { id: 'cream', name: 'شیری صدفی', hex: '#FEF3C7' },
        { id: 'black', name: 'مشکی', hex: '#1E293B' }
      ],
      sizes: [
        { id: 'free-size', name: 'فری‌سایز کشسانی استاندارد', priceModifier: 0 }
      ],
      tags: [formData.category, 'لباس_زیر', 'ابر_صورتی', 'کیوت']
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
    } else {
      addProduct(productPayload);
    }

    setModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`آیا از حذف محصول «${name}» اطمینان دارید؟`)) {
      deleteProduct(id);
    }
  };

  const imagePresets = [
    { label: 'کراپ تک صورتی', url: '/images/products/crop-macaron-1.jpg' },
    { label: 'ست ۳ تایی کراپ', url: '/images/products/crop-macaron-set-1.jpg' },
    { label: 'شورت لیزری پک', url: '/images/products/panties-seamless-1.jpg' },
    { label: 'شورت نخی کبریتی', url: '/images/products/panties-ribbed-1.jpg' },
    { label: 'جوراب تدی', url: '/images/products/socks-bear-1.jpg' },
    { label: 'جوراب توری پاپیونی', url: '/images/products/socks-lace-1.jpg' },
    { label: 'اسکرانچی ابریشم', url: '/images/products/scrunchie-silk-1.jpg' },
    { label: 'کش مو مخمل', url: '/images/products/scrunchie-bow-1.jpg' },
    { label: 'مینی اسکارف ابریشم', url: '/images/products/miniscarf-silk-1.jpg' },
    { label: 'باکس هدیه لوکس', url: '/images/hero/hero-lingerie-banner.jpg' }
  ];

  return (
    <div className="space-y-6 text-right">
      
      {/* 1. Header Toolbar */}
      <div className="bg-white rounded-3xl p-5 border border-pink-100/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-black text-slate-900">مدیریت محصولات بوتیک ({products.length} کالا)</h3>
          <p className="text-xs text-slate-500 mt-0.5">افزودن، ویرایش مشخصات، قیمت‌گذاری و مدیریت موجودی کالاها</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetProductsToDefault}
            className="text-xs text-slate-500 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 px-3.5 py-2.5 rounded-2xl transition flex items-center gap-1.5 cursor-pointer font-bold"
            title="بازنشانی به محصولات اولیه"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>بازنشانی پیش‌فرض</span>
          </button>

          <button
            onClick={openCreateModal}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs font-black px-5 py-2.5 rounded-2xl shadow-md shadow-pink-200 transition flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>افزودن محصول جدید</span>
          </button>
        </div>
      </div>

      {/* 2. Filter & Search Controls */}
      <div className="bg-white rounded-3xl p-4 border border-pink-100/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <input
            type="text"
            placeholder="جستجو در نام یا کد محصول..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-pink-50/70 text-xs rounded-xl pr-9 pl-3 py-2.5 border border-pink-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300"
          />
          <Search className="w-4 h-4 text-pink-400 absolute right-3 top-3" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                selectedCat === cat.id
                  ? 'bg-pink-500 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-pink-50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Products Table (Desktop) */}
      <div className="hidden md:block bg-white rounded-3xl border border-pink-100/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-pink-50/60 text-slate-700 font-bold border-b border-pink-100">
              <tr>
                <th className="p-4">تصویر و نام کالا</th>
                <th className="p-4">دسته‌بندی</th>
                <th className="p-4">قیمت فروش</th>
                <th className="p-4">موجودی انبار</th>
                <th className="p-4">تخفیف ویژه</th>
                <th className="p-4 text-left">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50">
              {filteredList.map(prod => (
                <tr key={prod.id} className="hover:bg-pink-50/30 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.primaryImage}
                        alt={prod.name}
                        className="w-12 h-12 rounded-xl object-cover border border-pink-100 shadow-2xs flex-shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 leading-snug">{prod.name}</h4>
                        <span className="text-[10px] text-slate-400 font-mono">کد: {prod.sku || prod.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="bg-pink-50 text-pink-700 font-bold px-2.5 py-1 rounded-lg border border-pink-200/60">
                      {prod.categoryName}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="font-bold font-mono text-rose-600">
                      {formatPrice(prod.price)} تومان
                    </div>
                    {prod.originalPrice > prod.price && (
                      <span className="text-[10px] text-slate-400 line-through font-mono">
                        {formatPrice(prod.originalPrice)}
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                      prod.stockCount > 5 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : prod.stockCount > 0
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {prod.stockCount > 0 ? `${prod.stockCount} عدد موجود` : 'ناموجود'}
                    </span>
                  </td>

                  <td className="p-4">
                    {prod.isFlashDeal ? (
                      <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md animate-pulse">
                        شگفت‌انگیز (٪{prod.discountPercent})
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">—</span>
                    )}
                  </td>

                  <td className="p-4 text-left">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(prod)}
                        className="p-2 text-slate-600 hover:text-pink-600 bg-slate-50 hover:bg-pink-50 rounded-xl transition cursor-pointer"
                        title="ویرایش محصول"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(prod.id, prod.name)}
                        className="p-2 text-slate-400 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                        title="حذف محصول"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3b. Products Card List (Mobile) */}
      <div className="md:hidden space-y-3">
        {filteredList.length === 0 && (
          <div className="bg-white rounded-2xl p-8 border border-pink-100 text-center text-xs text-slate-500">
            محصولی مطابق فیلترها یافت نشد.
          </div>
        )}
        {filteredList.map(prod => (
          <div key={prod.id} className="bg-white rounded-2xl border border-pink-100 shadow-sm p-3 flex gap-3">
            <img
              src={prod.primaryImage}
              alt={prod.name}
              className="w-20 h-20 rounded-xl object-cover border border-pink-100 shrink-0"
              onError={e => { e.currentTarget.style.opacity = '0.3'; }}
            />
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-xs leading-snug line-clamp-2">{prod.name}</h4>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className="text-[10px] bg-pink-50 text-pink-700 font-bold px-2 py-0.5 rounded-md border border-pink-200/60">
                    {prod.categoryName}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                    prod.stockCount > 5
                      ? 'bg-emerald-100 text-emerald-800'
                      : prod.stockCount > 0
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {prod.stockCount > 0 ? `${prod.stockCount} موجود` : 'ناموجود'}
                  </span>
                  {prod.isFlashDeal && (
                    <span className="bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                      ⚡ ٪{prod.discountPercent}
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-1">SKU: {prod.sku || prod.id}</div>
              </div>
              <div className="flex items-end justify-between gap-2 mt-2">
                <div>
                  <div className="font-mono font-black text-rose-600 text-sm">
                    {formatPrice(prod.price)} <span className="text-[10px] text-slate-500">ت</span>
                  </div>
                  {prod.originalPrice > prod.price && (
                    <div className="text-[10px] text-slate-400 line-through font-mono">
                      {formatPrice(prod.originalPrice)}
                    </div>
                  )}
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => openEditModal(prod)}
                    className="p-2 text-pink-600 bg-pink-50 hover:bg-pink-100 rounded-lg transition"
                    title="ویرایش"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(prod.id, prod.name)}
                    className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition"
                    title="حذف"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center sm:p-4 text-right animate-in fade-in">
          <div
            className="bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl border border-pink-100 max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-5 sm:p-8 animate-slide-up-mobile sm:animate-none"
            style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
          >
            
            <div className="flex items-center justify-between pb-4 border-b border-pink-100 mb-6">
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {editingProduct ? `ویرایش محصول: ${editingProduct.name}` : 'افزودن محصول جدید به ویترین'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              
              {/* Product Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">نام فارسی محصول *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="مثلاً: کراپ تاپ بند ماکارونی صورتی"
                    className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">نام انگلیسی محصول (اختیاری)</label>
                  <input
                    type="text"
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    placeholder="Macaron Spaghetti Strap Crop Top"
                    className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300 font-mono dir-ltr text-left"
                  />
                </div>
              </div>

              {/* Category, Price, Original Price, Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">دسته‌بندی *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300 font-bold"
                  >
                    {categories.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">قیمت نهایی فروش (تومان) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">قیمت اصلی قبل تخفیف (تومان)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">تعداد موجودی در انبار *</label>
                  <input
                    type="number"
                    required
                    value={formData.stockCount}
                    onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })}
                    className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300 font-mono"
                  />
                </div>
              </div>

              {/* Image URL & Quick Presets */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">آدرس تصویر اصلی محصول *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formData.primaryImage}
                    onChange={(e) => setFormData({ ...formData, primaryImage: e.target.value })}
                    className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300 font-mono dir-ltr text-left"
                  />
                </div>

                {/* Quick Presets Grid */}
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 font-bold ml-1">انتخاب از تصاویر آماده:</span>
                  {imagePresets.map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setFormData({ ...formData, primaryImage: preset.url })}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                        formData.primaryImage === preset.url ? 'bg-pink-500 text-white border-pink-500' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-pink-50'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">توضیحات کوتاه محصول</label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="خلاصه ویژگی‌ها در یک یا دو جمله..."
                  className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">توضیحات کامل و داستان محصول</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="توضیحات کامل، خواص و مزایای بهداشتی..."
                  className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300 leading-relaxed"
                />
              </div>

              {/* Specs & Flash Deal Checkbox */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-pink-50">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">جنس پارچه و الیاف</label>
                  <input
                    type="text"
                    value={formData.fabric}
                    onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                    placeholder="فاق ۱۰۰٪ پنبه ارگانیک + میکروفایبر"
                    className="w-full bg-slate-50 rounded-xl p-2.5 border border-slate-200 outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">برچسب ویژه ویترین</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="پرفروش‌ترین ماه / فاق ۱۰۰٪ پنبه"
                    className="w-full bg-slate-50 rounded-xl p-2.5 border border-slate-200 outline-none focus:bg-white"
                  />
                </div>

                <div className="flex items-center justify-between pt-5">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={formData.isFlashDeal}
                      onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
                      className="accent-pink-500 w-4 h-4 rounded"
                    />
                    <span>قرارگیری در پیشنهادهای شگفت‌انگیز 🔥</span>
                  </label>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-pink-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 transition cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black shadow-md transition cursor-pointer"
                >
                  {editingProduct ? 'ذخیره تغییرات محصول' : 'ثبت و انتشار محصول در فروشگاه'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
