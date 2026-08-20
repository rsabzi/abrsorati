import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Heart, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Send, 
  MessageCircle,
  Clock,
  PackageCheck
} from 'lucide-react';

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const Footer = () => {
  const {
    navigateToCategory,
    navigateToHome,
    navigateToAbout,
    setTrackingModalOpen,
    navigateToAdmin,
    isAdminAuthenticated,
    setAdminLoginModalOpen,
    showToast
  } = useShop();

  const [newsletterEmail, setNewsletterEmail] = useState('');

  const openAdmin = () => {
    if (isAdminAuthenticated) {
      navigateToAdmin('overview');
    } else {
      setAdminLoginModalOpen(true);
    }
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    showToast('ایمیل شما ثبت شد! کد تخفیف ۵۰ هزار تومانی: FIRSTBUY برای شما فعال شد 🎉', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 md:pb-12 text-right border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Guarantee Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-pink-500/10 text-pink-400 rounded-2xl border border-pink-500/20">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">ارسال سریع و رایگان</h4>
              <p className="text-xs text-slate-400 mt-0.5">برای سفارش‌های بالای ۶۰۰ هزار تومان</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-pink-500/10 text-pink-400 rounded-2xl border border-pink-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">فاق ۱۰۰٪ پنبه ضد حساسیت</h4>
              <p className="text-xs text-slate-400 mt-0.5">تضمین سلامت، لطافت و بهداشت پوست</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-pink-500/10 text-pink-400 rounded-2xl border border-pink-500/20">
              <PackageCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">بسته‌بندی کاملاً محرمانه</h4>
              <p className="text-xs text-slate-400 mt-0.5">ارسال در کارتن‌های مات و پلمپ شده</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-pink-500/10 text-pink-400 rounded-2xl border border-pink-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">بسته‌بندی کادویی معطر</h4>
              <p className="text-xs text-slate-400 mt-0.5">همراه با اسطوخودوس و روبان صورتی</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 py-12 border-b border-slate-800">
          
          {/* Brand Info & Story (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white p-1 shadow-md flex items-center justify-center">
                <img
                  src="/images/logo-icon.png"
                  alt="ابر صورتی"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-black text-white">ابر صورتی</span>
                <span className="block text-[11px] text-pink-400 font-mono">abrsorati.ir</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              فروشگاه اینترنتی «ابر صورتی»؛ تخصصی‌ترین مرکز خرید کراپ‌های بند ماکارون، شورت‌های بدون درز لیزری فاق پنبه، جوراب‌های فانتزی مچی، کش‌موهای ابریشمی و مینی‌اسکارف‌های ترند دخترانه با ارسال محرمانه و فوری به سراسر کشور.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-pink-400" />
                <span>مشاوره و پشتیبانی تلفنی: <strong className="font-mono text-white">۰۲۱-۹۱۰۱۸۷۶۵</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-pink-400" />
                <span>پاسخگویی: شنبه تا پنج‌شنبه ۹ صبح الی ۹ شب</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pink-400" />
                <span>دفتر مرکزی و انبار توزیع: تهران، بلوار سعادت‌آباد، پلاک ۴۲</span>
              </div>
            </div>
          </div>

          {/* Categories Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white">دسته‌بندی‌های محصولات</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigateToCategory(cat.id)}
                    className="hover:text-pink-400 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Access (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white">دسترسی سریع</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={navigateToHome} className="hover:text-pink-400 transition cursor-pointer">
                  صفحه اصلی
                </button>
              </li>
              <li>
                <button onClick={navigateToAbout} className="hover:text-pink-400 transition cursor-pointer">
                  درباره برند ابر صورتی
                </button>
              </li>
              <li>
                <button onClick={() => setTrackingModalOpen(true)} className="hover:text-pink-400 transition cursor-pointer">
                  رهگیری مرسولات پستی
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('crop-tops')} className="hover:text-pink-400 transition cursor-pointer">
                  کراپ‌های بند ماکارون
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('panties')} className="hover:text-pink-400 transition cursor-pointer">
                  شورت‌های لیزری بدون درز
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Box (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white">عضویت در کلوب ابر صورتی</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              با ثبت ایمیل خود، کد تخفیف ۵۰,۰۰۰ تومانی اولین خرید را فوراً دریافت کنید.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="ایمیل خود را وارد کنید..."
                className="w-full bg-slate-800 text-xs rounded-xl p-3 text-white border border-slate-700 outline-none focus:border-pink-500 dir-ltr text-left"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>دریافت کد تخفیف</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white rounded-xl transition"
                title="اینستاگرام"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white rounded-xl transition"
                title="پشتیبانی واتس‌اپ"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-right">
          <p>
            © تمامی حقوق برای فروشگاه لباس زیر زنانه و اکسسوری «ابر صورتی» (abrsorati.ir) محفوظ است. ۱۴۰۵
          </p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>طراحی شده با</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>برای حس لطافت و زیبایی شما</span>
          </div>
        </div>

        {/* Tiny hidden admin link */}
        <div className="pt-3 text-center">
          <button
            onClick={openAdmin}
            className="text-[10px] text-slate-600 hover:text-pink-400 transition-colors tracking-wide"
            title="ورود مدیر فروشگاه"
          >
            · ورود مدیر ·
          </button>
        </div>

      </div>
    </footer>
  );
};
