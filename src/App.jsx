import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryShowcase } from './components/CategoryShowcase';
import { FlashDeals } from './components/FlashDeals';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailPage } from './components/ProductDetailPage';
import { WishlistModal } from './components/WishlistModal';
import { AboutStory } from './components/AboutStory';
import { CustomerReviewsWall } from './components/CustomerReviewsWall';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { QuickViewModal } from './components/QuickViewModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ToastContainer } from './components/ToastContainer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MobileMenuDrawer } from './components/MobileMenuDrawer';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginModal } from './components/AdminLoginModal';
import { ProductCard } from './components/ProductCard';
import { Sparkles, ArrowLeft, Heart, ShieldCheck, Settings } from 'lucide-react';

const MainShopContent = () => {
  const { 
    currentView, 
    navigateToCategory, 
    navigateToAbout, 
    navigateToAdmin, 
    products,
    isAdminAuthenticated,
    adminLoginModalOpen,
    setAdminLoginModalOpen,
    handleAdminLogin
  } = useShop();

  const featuredBestsellers = products.filter(p => p.isFeatured).slice(0, 4);

  // If in Admin Mode, render the full admin dashboard
  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-slate-100">
        <AdminDashboard />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FFF9FB]">
      <Header />

      <main className="flex-1">
        {/* HOME VIEW */}
        {currentView === 'home' && (
          <div>
            <Hero />
            <CategoryShowcase />
            <FlashDeals />

            {/* Featured Best-sellers Showcase on Home */}
            <section className="py-14 bg-white text-right">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                  <div>
                    <div className="flex items-center gap-2 text-pink-600 font-bold text-xs uppercase tracking-wider mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span>پرفروش‌ترین‌های بوتیک ابر صورتی</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                      محبوب‌ترین کراپ‌ها، شورت‌ها و اکسسوری‌ها 🎀
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1">
                      انتخاب اول مشتریان برای راحتی روزمره، استایل‌های پاستلی و پک‌های کادویی
                    </p>
                  </div>

                  <button
                    onClick={() => navigateToCategory('all')}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-pink-600 hover:text-pink-700 group self-start sm:self-auto cursor-pointer"
                  >
                    <span>مشاهده تمام محصولات</span>
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredBestsellers.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </section>

            {/* Customer Reviews & Instagram Gallery */}
            <CustomerReviewsWall />

            {/* Mini Workshop Story Teaser */}
            <section className="py-14 bg-gradient-to-r from-pink-100/50 via-rose-50/50 to-pink-50/40 text-right">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl p-6 sm:p-10 border border-pink-100/80 shadow-md flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="flex-1 space-y-4">
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                      کیفیت، بهداشت و راحتی شما
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                      فاق دوبل ۱۰۰٪ پنبه ارگانیک و تکنولوژی بدون درز لیزری
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      در بوتیک «ابر صورتی»، ما متعهد به سلامت پوست و ایجاد بیشترین حس آرامش در استفاده روزمره هستیم. تمامی محصولات با بسته‌بندی کاملاً محرمانه، پلمپ شده و معطر به اسطوخودوس فرانسه ارسال می‌شوند.
                    </p>
                    <button
                      onClick={navigateToAbout}
                      className="inline-flex items-center gap-2 text-xs font-bold text-pink-700 hover:text-pink-900 pt-1 underline underline-offset-4 cursor-pointer"
                    >
                      <span>مطالعه کامل درباره برند ابر صورتی</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="w-full lg:w-96 rounded-2xl overflow-hidden shadow-lg border-2 border-pink-100 p-4 bg-pink-50 flex items-center justify-center">
                    <img
                      src="/images/logo.png"
                      alt="لوگوی ابر صورتی"
                      className="w-48 h-48 object-contain"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* CATALOG VIEW */}
        {currentView === 'catalog' && <ProductCatalog />}

        {/* PRODUCT DETAIL VIEW */}
        {currentView === 'product' && <ProductDetailPage />}

        {/* WISHLIST VIEW */}
        {currentView === 'wishlist' && <WishlistModal />}

        {/* ABOUT VIEW */}
        {currentView === 'about' && <AboutStory />}
      </main>

      <Footer />

      {/* Floating Admin Mode Switch Button for Authenticated Store Owner ONLY */}
      {isAdminAuthenticated && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 z-40">
          <button
            onClick={() => navigateToAdmin('overview')}
            className="bg-slate-900/90 hover:bg-slate-900 text-white p-3 sm:px-4 sm:py-2.5 rounded-2xl font-bold text-xs shadow-xl backdrop-blur-md border border-slate-700/80 flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 cursor-pointer group"
            title="ورود به پنل مدیریت فروشگاه"
          >
            <Settings className="w-4 h-4 text-pink-400 group-hover:rotate-90 transition-transform duration-300" />
            <span className="hidden sm:inline">پنل مدیریت</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        </div>
      )}

      {/* Admin Login Modal */}
      <AdminLoginModal 
        isOpen={adminLoginModalOpen}
        isAuthenticated={isAdminAuthenticated}
        onLoginSuccess={handleAdminLogin}
      />

      {/* Global Slide-out Drawers & Modals */}
      <MobileMenuDrawer />
      <CartDrawer />
      <CheckoutModal />
      <QuickViewModal />
      <OrderTrackingModal />
      <ToastContainer />
      <MobileBottomNav />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainShopContent />
    </ShopProvider>
  );
}
