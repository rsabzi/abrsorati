import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  Copy,
  Check,
  ShoppingBag,
  ArrowLeft,
  Search
} from 'lucide-react';

const STATUS_META = {
  pending:    { label: 'در انتظار پرداخت', color: 'bg-amber-100 text-amber-800 border-amber-200', icon: Clock },
  processing: { label: 'در حال بسته‌بندی',  color: 'bg-pink-100 text-pink-800 border-pink-200',   icon: Package },
  shipped:    { label: 'ارسال شده',         color: 'bg-blue-100 text-blue-800 border-blue-200',    icon: Truck },
  delivered:  { label: 'تحویل شد',          color: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: CheckCircle2 },
  cancelled:  { label: 'لغو شده',           color: 'bg-rose-100 text-rose-800 border-rose-200',    icon: XCircle }
};

export const OrdersPage = () => {
  const { orders, formatPrice, navigateToHome, navigateToCategory, showToast } = useShop();
  const [expandedId, setExpandedId] = useState(orders[0]?.id || null);
  const [filter, setFilter] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const [query, setQuery] = useState('');

  const filtered = orders.filter(o => {
    if (filter !== 'all' && o.status !== filter) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      if (!o.id.toLowerCase().includes(q) && !(o.customerName || '').toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('کد کپی شد', 'success');
    setTimeout(() => setCopiedId(null), 1800);
  };

  const filterOptions = [
    { id: 'all', label: 'همه' },
    { id: 'processing', label: 'در حال آماده‌سازی' },
    { id: 'shipped', label: 'در راه' },
    { id: 'delivered', label: 'تحویل شده' }
  ];

  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-pink-50/40 to-white text-right py-6 sm:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-5 sm:mb-8">
          <div className="flex items-center justify-between gap-3 mb-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <Package className="w-6 h-6 text-pink-600" />
              <span>سفارش‌های من</span>
              <span className="text-xs bg-pink-100 text-pink-700 font-bold px-2 py-0.5 rounded-md">
                {orders.length}
              </span>
            </h1>
            <button
              onClick={navigateToHome}
              className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-pink-600 transition"
            >
              <span>بازگشت به فروشگاه</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-500">مشاهده وضعیت لحظه‌ای همه سفارشات، رهگیری پستی و جزئیات فاکتور</p>
        </div>

        {/* Filters + Search */}
        <div className="bg-white rounded-2xl p-3 border border-pink-100 shadow-sm mb-4 space-y-3">
          <div className="relative">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="جستجو شماره سفارش یا نام..."
              className="w-full bg-pink-50/60 focus:bg-white rounded-xl pr-10 pl-3 py-2.5 text-sm border border-pink-100 focus:ring-2 focus:ring-pink-300 outline-none transition"
            />
            <Search className="w-4 h-4 text-pink-400 absolute right-3 top-3" />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
            {filterOptions.map(o => (
              <button
                key={o.id}
                onClick={() => setFilter(o.id)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                  filter === o.id
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm shadow-pink-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-pink-50'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="bg-white rounded-3xl p-10 border border-pink-100 text-center">
            <div className="w-20 h-20 rounded-full bg-pink-50 mx-auto flex items-center justify-center mb-4">
              <ShoppingBag className="w-10 h-10 text-pink-400" />
            </div>
            <h3 className="font-black text-slate-800 mb-1">سفارشی یافت نشد</h3>
            <p className="text-xs text-slate-500 mb-5">هنوز سفارشی با این فیلتر ثبت نکرده‌اید.</p>
            <button
              onClick={() => navigateToCategory('all')}
              className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md shadow-pink-200 transition"
            >
              <span>مشاهده محصولات فروشگاه</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Orders list */}
        <div className="space-y-3">
          {filtered.map(order => {
            const meta = STATUS_META[order.status] || STATUS_META.processing;
            const StatusIcon = meta.icon;
            const isOpen = expandedId === order.id;

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden transition-all"
              >
                {/* Summary row */}
                <button
                  onClick={() => setExpandedId(isOpen ? null : order.id)}
                  className="w-full text-right p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 active:bg-pink-50/40 transition"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`w-10 h-10 shrink-0 rounded-xl ${meta.color} border flex items-center justify-center`}>
                      <StatusIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-black text-sm text-slate-900">{order.id}</span>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border ${meta.color}`}>
                          {order.statusLabel || meta.label}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2 flex-wrap">
                        <span>{order.date}</span>
                        <span>•</span>
                        <span>{order.itemsCount || order.items?.length || 0} قلم</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 border-t sm:border-t-0 border-pink-50 pt-2 sm:pt-0">
                    <span className="font-mono font-black text-sm text-rose-600 whitespace-nowrap">
                      {formatPrice(order.total)} <span className="text-[10px] text-slate-500">ت</span>
                    </span>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </button>

                {/* Expanded details */}
                {isOpen && (
                  <div className="border-t border-pink-50 p-4 space-y-4 bg-pink-50/20">

                    {/* Tracking */}
                    {order.trackingCode && (
                      <div className="bg-white p-3 rounded-xl border border-pink-100 flex items-center justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] text-slate-500 mb-0.5">کد رهگیری پستی:</p>
                          <p className="font-mono text-xs font-bold text-slate-800 truncate dir-ltr text-left">
                            {order.trackingCode}
                          </p>
                        </div>
                        <button
                          onClick={() => handleCopy(order.trackingCode, order.id)}
                          className="shrink-0 p-2 bg-pink-50 hover:bg-pink-100 text-pink-600 rounded-lg transition"
                        >
                          {copiedId === order.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    )}

                    {/* Address */}
                    {order.address && (
                      <div className="text-xs bg-white p-3 rounded-xl border border-pink-100">
                        <div className="flex items-center gap-1.5 text-pink-600 font-bold mb-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>آدرس تحویل</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{order.address}</p>
                        {order.phone && (
                          <p className="mt-1.5 flex items-center gap-1.5 text-slate-500 font-mono dir-ltr">
                            <Phone className="w-3.5 h-3.5 text-pink-500" /> {order.phone}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Items */}
                    {order.items && order.items.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-[11px] font-bold text-slate-500">اقلام سفارش:</p>
                        {order.items.map(item => (
                          <div key={item.key || item.id} className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-pink-50">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover border border-pink-100 shrink-0"
                              onError={e => { e.currentTarget.style.display='none'; }}
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-slate-800 line-clamp-1">{item.name}</p>
                              <p className="text-[10px] text-slate-500 mt-0.5">
                                {item.selectedColor?.name} • {item.quantity} عدد
                              </p>
                            </div>
                            <span className="text-xs font-mono font-bold text-rose-600 shrink-0">
                              {formatPrice((item.price || 0) * (item.quantity || 1))} ت
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Meta info */}
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="bg-white p-2.5 rounded-xl border border-pink-50">
                        <span className="text-slate-400 block">شیوه ارسال:</span>
                        <span className="font-bold text-slate-700">{order.shippingMethod || 'پست پیشتاز'}</span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-pink-50">
                        <span className="text-slate-400 block">پرداخت:</span>
                        <span className="font-bold text-slate-700">{order.paymentMethod || 'درگاه آنلاین'}</span>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
