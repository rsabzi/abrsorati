import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Search, 
  Truck, 
  Package, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  MapPin, 
  Calendar,
  AlertCircle
} from 'lucide-react';

export const OrderTrackingModal = () => {
  const {
    trackingModalOpen,
    setTrackingModalOpen,
    orders,
    formatPrice
  } = useShop();

  const [searchQuery, setSearchQuery] = useState('AS-89421');
  const [activeOrder, setActiveOrder] = useState(orders[0] || null);
  const [searched, setSearched] = useState(true);

  if (!trackingModalOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    const clean = searchQuery.trim().toUpperCase();
    const found = orders.find(o => 
      o.id.toUpperCase() === clean || 
      (o.phone && o.phone.includes(clean)) ||
      (o.trackingCode && o.trackingCode.includes(clean))
    );
    setActiveOrder(found || null);
    setSearched(true);
  };

  const steps = [
    { title: 'ثبت و تایید سفارش', desc: 'سفارش ثبت و فاکتور صادر شد', done: true, time: '۲ روز پیش' },
    { title: 'آماده‌سازی کاموا و بافت', desc: 'توسط هنرمندان بافنده ابر صورتی', done: true, time: 'دیروز' },
    { title: 'کنترل کیفی و بسته‌بندی معطر', desc: 'اسطوخودوس، ربان و شناسنامه اثر', done: true, time: 'امروز صبح' },
    { title: 'تحویل به شرکت پست', desc: 'مرسوله در مرکز تجزیه و مبادلات پستی', done: activeOrder?.status === 'delivered', active: activeOrder?.status !== 'delivered', time: 'امروز ظهر' },
    { title: 'تحویل موفق به گیرنده', desc: 'تحویل درب منزل با امضای دیجیتال', done: activeOrder?.status === 'delivered', time: 'تخمین فردا' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center sm:p-4 text-right animate-in fade-in">
      <div
        className="bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl border border-pink-100 max-w-2xl w-full overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh] animate-slide-up-mobile sm:animate-none"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-pink-100 bg-gradient-to-r from-pink-50/80 to-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-pink-100 text-pink-600 rounded-xl">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-800">سامانه پیگیری مرسولات ابر صورتی</h2>
              <span className="text-xs text-slate-500 font-medium">رهگیری لحظه‌ای بافت، بسته‌بندی و ارسال پستی</span>
            </div>
          </div>

          <button
            onClick={() => setTrackingModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-pink-50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-5 border-b border-pink-50 bg-slate-50/50">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="شماره سفارش (مثلاً AS-89421) یا شماره موبایل..."
                className="w-full bg-white text-xs rounded-xl pr-9 pl-3 py-3 border border-slate-200 focus:ring-2 focus:ring-pink-300 outline-none font-mono"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
            </div>
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold px-5 py-3 rounded-xl transition"
            >
              استعلام
            </button>
          </form>
        </div>

        {/* Result Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {activeOrder ? (
            <div>
              {/* Order Meta Info */}
              <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100 flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">شماره سفارش:</span>
                    <span className="text-sm font-black font-mono text-pink-700">{activeOrder.id}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    ثبت شده در تاریخ {activeOrder.date} • {activeOrder.customerName}
                  </span>
                </div>

                <div className="text-left">
                  <span className="text-xs font-bold text-rose-600 block">
                    {formatPrice(activeOrder.total)} تومان
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full inline-block mt-0.5">
                    {activeOrder.statusLabel || 'در مسیر تحویل'}
                  </span>
                </div>
              </div>

              {/* Progress Stepper Timeline */}
              <div className="space-y-4 pr-2">
                <h4 className="text-xs font-bold text-slate-800 mb-3">مراحل پردازش و ارسال سفارش:</h4>
                {steps.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    {/* Line connector */}
                    {idx < steps.length - 1 && (
                      <div className={`absolute top-6 right-3 w-0.5 h-10 ${step.done ? 'bg-pink-500' : 'bg-slate-200'}`} />
                    )}

                    {/* Step Icon */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 z-10 ${
                      step.done 
                        ? 'bg-pink-500 text-white shadow-sm' 
                        : step.active
                        ? 'bg-pink-100 border-2 border-pink-500 text-pink-600 animate-pulse'
                        : 'bg-slate-100 border border-slate-200 text-slate-400'
                    }`}>
                      {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>

                    {/* Step Text */}
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${step.done || step.active ? 'text-slate-800' : 'text-slate-400'}`}>
                          {step.title}
                        </span>
                        <span className="text-[10px] text-slate-400">{step.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Post Tracking Barcode */}
              {activeOrder.trackingCode && (
                <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 block text-[11px]">کد مرسوله پستی پیشتاز:</span>
                    <span className="font-mono font-bold text-slate-800 block mt-0.5 dir-ltr text-right">
                      {activeOrder.trackingCode}
                    </span>
                  </div>
                  <a
                    href={`https://tracking.post.ir/?id=${activeOrder.trackingCode}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white hover:bg-pink-50 text-pink-700 border border-pink-200 font-bold px-3 py-1.5 rounded-xl transition text-[11px]"
                  >
                    سامانه رهگیری پست ←
                  </a>
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-700">سفارشی با این مشخصات یافت نشد!</p>
              <p className="text-[11px] text-slate-400 mt-1">لطفاً شماره سفارش یا موبایل ثبت شده هنگام خرید را بررسی فرمایید.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-pink-100 bg-slate-50 text-center text-xs text-slate-500">
          نیاز به راهنمایی بیشتر دارید؟ با شماره <strong className="font-mono text-pink-700">۰۲۱-۹۱۰۱۸۷۶۵</strong> تماس بگیرید.
        </div>

      </div>
    </div>
  );
};
