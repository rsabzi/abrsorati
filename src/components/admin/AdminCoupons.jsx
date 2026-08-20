import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Tag, Plus, Trash2, X, Check, Copy } from 'lucide-react';

export const AdminCoupons = () => {
  const { coupons, addCoupon, deleteCoupon, formatPrice, showToast } = useShop();

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    discountType: 'percent', // 'percent' or 'fixed'
    value: 15,
    minCart: 0,
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.code.trim()) return;

    const success = addCoupon(formData);
    if (success) {
      setModalOpen(false);
      setFormData({
        code: '',
        title: '',
        discountType: 'percent',
        value: 15,
        minCart: 0,
        description: ''
      });
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    showToast(`کد تخفیف ${code} کپی شد!`, 'success');
  };

  return (
    <div className="space-y-6 text-right">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 border border-pink-100/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-black text-slate-900">مدیریت کدهای تخفیف و جشنواره‌ها ({coupons.length} کد فعال)</h3>
          <p className="text-xs text-slate-500 mt-0.5">تعریف کدهای تخفیف درصدی و مبلغی، سقف خرید و مناسبت‌ها</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs font-black px-5 py-2.5 rounded-2xl shadow-md shadow-pink-200 transition flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>تعریف کد تخفیف جدید</span>
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {coupons.map(coupon => (
          <div
            key={coupon.code}
            className="bg-white rounded-3xl p-5 border border-pink-100/90 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="bg-pink-100 text-pink-700 font-mono font-black text-xs px-3 py-1 rounded-xl flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{coupon.code}</span>
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className="p-1.5 text-slate-400 hover:text-pink-600 bg-slate-50 hover:bg-pink-50 rounded-lg transition cursor-pointer"
                    title="کپی کد"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`آیا از حذف کد تخفیف ${coupon.code} اطمینان دارید؟`)) {
                        deleteCoupon(coupon.code);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                    title="حذف کد"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-900 mb-1">{coupon.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">{coupon.description}</p>
            </div>

            <div className="pt-3 border-t border-pink-50 flex items-center justify-between text-xs font-bold">
              <span className="text-rose-600 font-black text-sm">
                {coupon.discountType === 'percent' ? `٪${coupon.value} تخفیف` : `${formatPrice(coupon.value)} ت تخفیف`}
              </span>
              <span className="text-[10px] text-slate-400 font-normal">
                {coupon.minCart ? `حداقل سبد: ${formatPrice(coupon.minCart)} ت` : 'بدون سقف خرید'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Coupon Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 text-right animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-pink-100 max-w-md w-full p-6 sm:p-8">
            
            <div className="flex items-center justify-between pb-4 border-b border-pink-100 mb-5">
              <h3 className="text-base font-black text-slate-900">تعریف کد تخفیف جدید</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">کد لاتین (بدون فاصله) *</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="مثلاً: SUMMER25"
                  className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300 font-mono uppercase dir-ltr text-left"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">عنوان فارسی جشنواره *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="جشنواره تابستانه ابر صورتی"
                  className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">نوع تخفیف</label>
                  <select
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                    className="w-full bg-slate-50 rounded-xl p-2.5 border border-slate-200 outline-none font-bold"
                  >
                    <option value="percent">درصدی (٪)</option>
                    <option value="fixed">مبلغ ثابت (تومان)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {formData.discountType === 'percent' ? 'درصد تخفیف (۱ تا ۱۰۰)' : 'مبلغ تخفیف (تومان)'}
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                    className="w-full bg-slate-50 rounded-xl p-2.5 border border-slate-200 outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">حداقل مبلغ کل سبد خرید (تومان)</label>
                <input
                  type="number"
                  value={formData.minCart}
                  onChange={(e) => setFormData({ ...formData, minCart: Number(e.target.value) })}
                  placeholder="0 برای بدون محدودیت"
                  className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-pink-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black shadow-md cursor-pointer"
                >
                  ایجاد کد تخفیف
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
