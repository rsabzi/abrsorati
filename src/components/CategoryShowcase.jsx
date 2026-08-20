import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const CategoryShowcase = () => {
  const { navigateToCategory } = useShop();

  const displayCategories = [
    {
      id: 'crop-tops',
      title: 'کراپ بند ماکارون',
      subtitle: 'کبریتی کاپ‌دار، بدون درز و پاستلی با پد متحرک',
      count: '۳ مدل خاص',
      icon: '🎀',
      badge: 'پرفروش‌ترین',
      img: '/images/products/crop-macaron-1.jpg'
    },
    {
      id: 'panties',
      title: 'شورت زنانه و فانتزی',
      subtitle: 'لیزری بدون درز، فاق دوبل پنبه و نخی ضدحساسیت',
      count: '۳ کالکشن',
      icon: '👙',
      badge: 'فاق ۱۰۰٪ پنبه',
      img: '/images/products/panties-seamless-1.jpg'
    },
    {
      id: 'socks',
      title: 'جوراب‌های فانتزی',
      subtitle: 'جوراب‌های مچی تدی دالبری و توری پاپیونی ترند',
      count: '۲ ست جذاب',
      icon: '🧦',
      badge: 'پنبه شانه شده',
      img: '/images/products/socks-bear-1.jpg'
    },
    {
      id: 'scrunchies',
      title: 'کش مو و اسکرانچی',
      subtitle: 'اسکرانچی ابریشم خالص ضد موخوره و مخمل پاپیونی',
      count: '۲ ست کامل',
      icon: '🌸',
      badge: 'ابریشم خالص',
      img: '/images/products/scrunchie-silk-1.jpg'
    },
    {
      id: 'mini-scarves',
      title: 'مینی اسکارف و باندانا',
      subtitle: 'مینی اسکارف ابریشم ژاکارد قواره ۷۰ و ساتن لوکس',
      count: '۲ کالکشن',
      icon: '🧣',
      badge: 'دور دست‌دوز',
      img: '/images/products/miniscarf-silk-1.jpg'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="text-right">
            <div className="flex items-center gap-2 text-pink-600 font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>مجموعه‌های پرطرفدار بوتیک</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              دسته‌بندی‌های محبوب ابر صورتی
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              کلکسیونی از باکیفیت‌ترین لباس‌های زیر، کراپ‌های ترند و اکسسوری‌های زنانه
            </p>
          </div>

          <button
            onClick={() => navigateToCategory('all')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-pink-600 hover:text-pink-700 group self-start sm:self-auto cursor-pointer"
          >
            <span>مشاهده همه دسته‌بندی‌ها</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {displayCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateToCategory(cat.id)}
              className="cursor-pointer group relative bg-gradient-to-b from-pink-50/40 to-white rounded-3xl p-4 border border-pink-100/90 hover:border-pink-300 shadow-xs hover:shadow-xl hover:shadow-pink-200/50 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
            >
              {/* Top Row: Icon & Badge */}
              <div className="flex items-center justify-between mb-3 z-10">
                <span className="text-2xl p-2 bg-white rounded-2xl shadow-xs border border-pink-100 group-hover:rotate-12 transition-transform">
                  {cat.icon}
                </span>
                <span className="text-[10px] font-bold bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">
                  {cat.badge}
                </span>
              </div>

              {/* Image Preview */}
              <div className="relative h-36 w-full rounded-2xl overflow-hidden mb-3 bg-pink-50 border border-pink-100/60">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                <span className="absolute bottom-2 right-2 text-[10px] font-bold text-white bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
                  {cat.count}
                </span>
              </div>

              {/* Text Info */}
              <div className="text-right z-10">
                <h3 className="text-sm font-bold text-slate-800 group-hover:text-pink-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                  {cat.subtitle}
                </p>
              </div>

              {/* Hover arrow cue */}
              <div className="mt-3 pt-3 border-t border-pink-50 flex items-center justify-between text-[11px] font-bold text-pink-600 opacity-80 group-hover:opacity-100">
                <span>مشاهده محصولات</span>
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
