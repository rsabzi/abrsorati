import React from 'react';
import { useShop } from '../../context/ShopContext';
import { 
  TrendingUp, 
  ShoppingBag, 
  Package, 
  Layers, 
  Users, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Settings, 
  Tag, 
  ArrowLeft 
} from 'lucide-react';

export const AdminOverview = ({ setActiveTab }) => {
  const { products, categories, orders, formatPrice, updateOrderStatus } = useShop();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalItemsSold = orders.reduce((sum, o) => sum + (o.itemsCount || 1), 0);
  const pendingOrders = orders.filter(o => o.status === 'processing' || o.status === 'pending');
  const lowStockProducts = products.filter(p => (p.stockCount || 0) < 6);

  return (
    <div className="space-y-8 text-right">
      
      {/* 1. Top KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-3xl border border-pink-100/90 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500">کل درآمد و فروش ثبت شده</span>
            <h3 className="text-xl font-black text-rose-600 tracking-tight font-mono">
              {formatPrice(totalRevenue)}{' '}
              <span className="text-xs font-normal text-slate-600">تومان</span>
            </h3>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+۲۴٪ نسبت به ماه گذشته</span>
            </span>
          </div>
          <div className="p-3.5 bg-rose-50 text-rose-600 rounded-2xl">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-3xl border border-pink-100/90 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500">تعداد کل سفارش‌ها</span>
            <h3 className="text-xl font-black text-slate-900 tracking-tight font-mono">
              {orders.length}{' '}
              <span className="text-xs font-normal text-slate-600">سفارش</span>
            </h3>
            <span className="text-[10px] text-pink-600 font-bold">
              {pendingOrders.length} سفارش نیازمند بسته‌بندی
            </span>
          </div>
          <div className="p-3.5 bg-pink-50 text-pink-600 rounded-2xl">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white p-5 rounded-3xl border border-pink-100/90 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500">کالاهای فعال در ویترین</span>
            <h3 className="text-xl font-black text-slate-900 tracking-tight font-mono">
              {products.length}{' '}
              <span className="text-xs font-normal text-slate-600">محصول</span>
            </h3>
            <span className="text-[10px] text-amber-600 font-bold">
              {lowStockProducts.length} کالا با موجودی محدود
            </span>
          </div>
          <div className="p-3.5 bg-amber-50 text-amber-600 rounded-2xl">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white p-5 rounded-3xl border border-pink-100/90 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500">دسته‌بندی‌های فعال</span>
            <h3 className="text-xl font-black text-slate-900 tracking-tight font-mono">
              {categories.length - 1}{' '}
              <span className="text-xs font-normal text-slate-600">مجموعه</span>
            </h3>
            <span className="text-[10px] text-purple-600 font-bold">
              پوشش کامل ۵ دسته اصلی
            </span>
          </div>
          <div className="p-3.5 bg-purple-50 text-purple-600 rounded-2xl">
            <Layers className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* 2. Quick Action Toolbar */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 rounded-3xl p-6 text-white shadow-xl shadow-pink-300/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black">مدیریت سریع فروشگاه ابر صورتی</h3>
          <p className="text-xs text-pink-100 mt-1">افزودن محصول جدید، تغییر قیمت‌ها، کنترل سفارشات و تنظیمات هدر و بنرها</p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setActiveTab('products')}
            className="bg-white text-pink-700 hover:bg-pink-50 text-xs font-black px-4 py-2.5 rounded-xl shadow-sm transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>افزودن محصول جدید</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/30 transition flex items-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>مدیریت سفارشات ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/30 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Settings className="w-4 h-4" />
            <span>تنظیمات و متون سایت</span>
          </button>
        </div>
      </div>

      {/* 3. Recent Orders & Stock Alert Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Orders (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-pink-100/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-pink-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-pink-600" />
              <h4 className="text-sm font-bold text-slate-800">آخرین سفارش‌های ثبت شده</h4>
            </div>
            <button
              onClick={() => setActiveTab('orders')}
              className="text-xs text-pink-600 hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>مشاهده همه</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-pink-50 max-h-96 overflow-y-auto">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-slate-900">{order.id}</span>
                    <span className="text-[10px] text-slate-400">{order.date}</span>
                  </div>
                  <p className="text-slate-600 font-medium mt-0.5">{order.customerName} ({order.itemsCount || 1} قلم)</p>
                </div>

                <div className="flex items-center gap-3 text-left">
                  <div>
                    <span className="font-bold text-rose-600 block font-mono">
                      {formatPrice(order.total)} تومان
                    </span>
                    <select
                      value={order.status || 'processing'}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="text-[10px] font-bold bg-pink-50 text-pink-700 rounded-lg px-2 py-0.5 border border-pink-200 outline-none cursor-pointer mt-0.5"
                    >
                      <option value="pending">در انتظار بررسی</option>
                      <option value="processing">در حال بسته‌بندی</option>
                      <option value="shipped">ارسال شده (پست)</option>
                      <option value="delivered">تحویل داده شده</option>
                      <option value="cancelled">لغو شده</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Warning & Top Sellers (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-pink-100/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-pink-50">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h4 className="text-sm font-bold text-slate-800">هشدار موجودی انبار</h4>
            </div>
            <button
              onClick={() => setActiveTab('products')}
              className="text-xs text-pink-600 hover:underline font-bold cursor-pointer"
            >
              مدیریت انبار
            </button>
          </div>

          <div className="space-y-3">
            {lowStockProducts.slice(0, 4).map(prod => (
              <div key={prod.id} className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-pink-50/40 border border-pink-100 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img src={prod.primaryImage} alt={prod.name} className="w-10 h-10 rounded-xl object-cover border border-pink-200 flex-shrink-0" />
                  <div className="min-w-0">
                    <h5 className="font-bold text-slate-800 truncate">{prod.name}</h5>
                    <span className="text-[10px] text-pink-600 font-mono">{formatPrice(prod.price)} تومان</span>
                  </div>
                </div>
                <div className="flex-shrink-0 text-left">
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full block">
                    تنها {prod.stockCount || 4} عدد
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
