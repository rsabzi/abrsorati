import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { AdminOverview } from './AdminOverview';
import { AdminProducts } from './AdminProducts';
import { AdminOrders } from './AdminOrders';
import { AdminCategories } from './AdminCategories';
import { AdminCoupons } from './AdminCoupons';
import { AdminSettings } from './AdminSettings';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Layers, 
  Tag, 
  Settings, 
  ArrowLeft, 
  Eye, 
  Menu, 
  X, 
  Sparkles, 
  LogOut,
  ShieldCheck
} from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    adminActiveTab, 
    setAdminActiveTab, 
    navigateToHome,
    handleAdminLogout,
    adminUser,
    orders, 
    products, 
    storeSettings 
  } = useShop();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingOrdersCount = orders.filter(o => o.status === 'processing' || o.status === 'pending').length;

  const navItems = [
    { id: 'overview', label: 'داشبورد و آمار فروش', icon: LayoutDashboard },
    { id: 'products', label: 'مدیریت محصولات', icon: Package, badge: products.length },
    { id: 'orders', label: 'مدیریت سفارش‌ها', icon: ShoppingBag, badge: pendingOrdersCount ? `${pendingOrdersCount} جدید` : null, badgeColor: 'bg-rose-500 text-white' },
    { id: 'categories', label: 'دسته‌بندی‌های کالا', icon: Layers },
    { id: 'coupons', label: 'کدهای تخفیف و مناسبت‌ها', icon: Tag },
    { id: 'settings', label: 'تنظیمات، بنرها و متون', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 text-right flex flex-col font-['Vazirmatn',system-ui,sans-serif]">
      
      {/* 1. Admin Top Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Right: Hamburger for mobile + Brand */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-700 hover:text-pink-600 rounded-xl hover:bg-slate-100 cursor-pointer"
              >
                <Menu className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white p-0.5 shadow-sm border border-pink-200 flex items-center justify-center">
                  <img
                    src={storeSettings.logoUrl || '/images/logo.png'}
                    alt="ابر صورتی"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-black text-slate-900">پنل مدیریت ابر صورتی</h2>
                    <span className="text-[10px] bg-pink-100 text-pink-700 font-bold px-2 py-0.5 rounded-md">مدیر ارشد</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">{storeSettings.domain || 'abrsorati.ir'}</span>
                </div>
              </div>
            </div>

            {/* Left: View Store Link & Exit */}
            <div className="flex items-center gap-3">
              <button
                onClick={navigateToHome}
                className="inline-flex items-center gap-2 bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer border border-pink-200/80"
              >
                <Eye className="w-4 h-4" />
                <span>مشاهده سایت فروشگاه</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* 2. Admin Workspace Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Sidebar (3 cols) */}
          <div className="hidden lg:block lg:col-span-3 space-y-4">
            <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs sticky top-24 space-y-1 text-xs font-bold">
              
              <div className="p-3 mb-2 bg-gradient-to-r from-pink-50/70 to-rose-50/40 rounded-2xl border border-pink-100">
                <div className="flex items-center gap-2 text-pink-800 font-black mb-1">
                  <ShieldCheck className="w-4 h-4 text-pink-600" />
                  <span>دسترسی کامل مدیریت</span>
                </div>
                <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
                  تمامی تغییرات اعمال شده بلافاصله در فروشگاه زنده ذخیره و اعمال می‌شوند.
                </p>
              </div>

              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = adminActiveTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setAdminActiveTab(item.id)}
                    className={`w-full text-right p-3.5 rounded-2xl transition flex items-center justify-between cursor-pointer ${
                      isActive 
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-200' 
                        : 'text-slate-700 hover:bg-pink-50/80 hover:text-pink-600'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </span>

                    {item.badge && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-mono ${
                        item.badgeColor || (isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600')
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="pt-4 mt-4 border-t border-slate-100">
                <button
                  onClick={handleAdminLogout}
                  className="w-full text-right p-3 rounded-2xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition flex items-center justify-between text-xs font-bold cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    <span>خروج از پنل مدیریت</span>
                  </span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

          {/* Main Admin Tab Content (9 cols) */}
          <div className="lg:col-span-9">
            {adminActiveTab === 'overview' && <AdminOverview setActiveTab={setAdminActiveTab} />}
            {adminActiveTab === 'products' && <AdminProducts />}
            {adminActiveTab === 'orders' && <AdminOrders />}
            {adminActiveTab === 'categories' && <AdminCategories />}
            {adminActiveTab === 'coupons' && <AdminCoupons />}
            {adminActiveTab === 'settings' && <AdminSettings />}
          </div>

        </div>
      </div>

      {/* 3. Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-300 text-right">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <span className="font-black text-sm text-slate-900">منوی پنل مدیریت</span>
                <button onClick={() => setSidebarOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1 text-xs font-bold">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = adminActiveTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setAdminActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full text-right p-3 rounded-2xl transition flex items-center justify-between cursor-pointer ${
                        isActive 
                          ? 'bg-pink-500 text-white shadow-md' 
                          : 'text-slate-700 hover:bg-pink-50'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => {
                handleAdminLogout();
                setSidebarOpen(false);
              }}
              className="w-full text-center py-3 bg-pink-50 text-pink-700 font-bold text-xs rounded-xl"
            >
              خروج از پنل مدیریت
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
