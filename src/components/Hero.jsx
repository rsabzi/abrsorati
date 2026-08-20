import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowLeft, Heart, ShieldCheck, Truck, Star, Award, Gift, Flame } from 'lucide-react';

export const Hero = () => {
  const { navigateToCategory, navigateToProduct, navigateToAbout, navigateToFlashDeals } = useShop();

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:py-12 lg:py-16 bg-gradient-to-b from-pink-50/70 via-rose-50/40 to-transparent">
      {/* Decorative Pastel Background Blobs */}
      <div className="absolute top-10 right-5 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-300/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Right Column: Hero Content */}
          <div className="lg:col-span-7 text-right flex flex-col items-start">
            
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-100 to-pink-100 border border-pink-200/80 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold text-pink-800 shadow-xs mb-5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span>کالکشن جدید لباس زیر زنانه، کراپ و اکسسوری پاستلی</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-slate-900 leading-[1.25] sm:leading-[1.2] tracking-tight mb-6">
              حس لطافت و آرامش با{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-l from-rose-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent">
                  ابر صورتی
                </span>
                <svg className="absolute -bottom-2 right-0 w-full h-3 text-pink-300 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,15 Q50,0 100,15" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                </svg>
              </span>{' '}
              | لباس زیر، کراپ و اکسسوری
            </h1>

            {/* Subtext */}
            <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
              به دنیای اختصاصی «ابر صورتی» (abrsorati.ir) خوش آمدید! برترین مرکز تخصصی کراپ‌های بند ماکارون، شورت‌های لیزری بدون درز فاق پنبه، جوراب‌های فانتزی مچی، اسکرانچی‌های ابریشم خالص و مینی اسکارف‌های ترند با بسته‌بندی معطر روبانی.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => navigateToCategory('all')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-600 hover:from-rose-600 hover:to-fuchsia-700 text-white px-8 py-4 rounded-2xl font-black text-sm sm:text-base shadow-xl shadow-pink-300/50 hover:shadow-2xl hover:shadow-pink-400/60 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer"
              >
                <span>مشاهده ویترین محصولات</span>
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={navigateToFlashDeals}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-pink-50/60 text-slate-700 hover:text-pink-600 px-6 py-4 rounded-2xl font-bold text-sm border border-pink-200/80 shadow-xs transition cursor-pointer"
              >
                <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>تخفیف‌های شگفت‌انگیز روزانه</span>
              </button>
            </div>

            {/* Trust Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-pink-200/60 w-full">
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-rose-600">+۱۲,۵۰۰</span>
                <span className="text-xs text-slate-500 font-medium mt-0.5">سفارش موفق و رضایت‌بخش</span>
              </div>
              <div className="flex flex-col border-r border-pink-200/60 pr-4">
                <div className="flex items-center gap-1">
                  <span className="text-xl sm:text-2xl font-black text-amber-500">۴.۹</span>
                  <div className="flex text-amber-400 text-xs">★★★★★</div>
                </div>
                <span className="text-xs text-slate-500 font-medium mt-0.5">امتیاز خریداران تایید شده</span>
              </div>
              <div className="flex flex-col border-r border-pink-200/60 pr-4">
                <span className="text-xl sm:text-2xl font-black text-pink-600">۱۰۰٪</span>
                <span className="text-xs text-slate-500 font-medium mt-0.5">فاق پنبه ضد حساسیت</span>
              </div>
            </div>
          </div>

          {/* Left Column: Visual Hero Banner with Official Logo Overlay */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-pink-200/60 border-4 border-white bg-white group">
                <img
                  src="/images/hero/hero-lingerie-banner.jpg"
                  alt="بوتیک لباس زیر زنانه و کراپ ابر صورتی"
                  className="w-full h-[380px] sm:h-[460px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Overlay Text Inside Image */}
                <div className="absolute bottom-5 right-5 left-5 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-pink-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
                      abrsorati.ir
                    </span>
                    <span className="text-xs text-pink-200">بسته‌بندی کاملاً بهداشتی و محرمانه</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                    لطیف‌ترین لمس پارچه روی پوست شما 🌸
                  </h3>
                </div>
              </div>

              {/* Floating Badge 1: Top Right - Brand Logo Mini Badge */}
              <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-pink-100 flex items-center gap-3 animate-float">
                <img
                  src="/images/logo.png"
                  alt="لوگوی ابر صورتی"
                  className="w-10 h-10 object-contain rounded-xl"
                />
                <div className="text-right">
                  <p className="text-xs font-black text-slate-900">ابر صورتی</p>
                  <p className="text-[10px] text-pink-600 font-bold">لباس زیر زنانه</p>
                </div>
              </div>

              {/* Floating Badge 2: Bottom Left */}
              <div 
                onClick={() => navigateToProduct('p1')}
                className="cursor-pointer absolute -bottom-6 -left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-pink-100 flex items-center gap-3 hover:border-pink-300 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-rose-100 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  🎀
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-black text-slate-800">کراپ بند ماکارون</span>
                    <span className="text-[10px] bg-rose-50 text-rose-600 font-bold px-1 rounded">ویژه</span>
                  </div>
                  <p className="text-[10px] text-slate-500">پد متحرک + بافت بدون درز</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
