import React from 'react';
import { useShop } from '../context/ShopContext';
import { Star, Heart, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';

const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const CustomerReviewsWall = () => {
  const { navigateToCategory } = useShop();

  const testimonials = [
    {
      id: 1,
      name: 'هانیه رضوانی',
      city: 'تهران',
      product: 'کراپ تاپ بند ماکارونی صورتی',
      comment: 'بندهای ماکارونیش انقدر ظریف و در عین حال محکمه که عاشقش شدم! پدش اصلاً جابجا نمیشه و تنخورش فوق‌العاده‌ست.',
      rating: 5,
      date: 'دیروز',
      avatar: '🎀'
    },
    {
      id: 2,
      name: 'مهدیه خسروی',
      city: 'اصفهان',
      product: 'پک ۳ عددی شورت لیزری بدون درز',
      comment: 'واقعاً زیر شلوارهای جذب خط نمی‌اندازه و جنس فاق پنبه‌ایش عالیه. بسته‌بندی محرمانه و عطر اسطوخودوس عالی بود.',
      rating: 5,
      date: '۳ روز پیش',
      avatar: '🌸'
    },
    {
      id: 3,
      name: 'سمیرا نوری',
      city: 'شیراز',
      product: 'ست اسکرانچی ابریشم خالص و مینی اسکارف',
      comment: 'اسکرانچی ابریشمی موهام رو اصلاً نمی‌کشه و مینی اسکارفش جنس ژاکارد بسیار شیکی داره. از خریدم خیلی راضیم.',
      rating: 5,
      date: '۵ روز پیش',
      avatar: '✨'
    }
  ];

  const instagramPosts = [
    { img: '/images/products/crop-macaron-1.jpg', likes: '1.8k', tag: 'کراپ بند ماکارون' },
    { img: '/images/products/panties-seamless-1.jpg', likes: '2.4k', tag: 'شورت لیزری' },
    { img: '/images/products/socks-bear-1.jpg', likes: '1.2k', tag: 'جوراب تدی' },
    { img: '/images/products/scrunchie-silk-1.jpg', likes: '3.1k', tag: 'اسکرانچی ابریشم' },
    { img: '/images/products/miniscarf-silk-1.jpg', likes: '2.9k', tag: 'مینی اسکارف ژاکارد' },
    { img: '/images/products/crop-macaron-set-1.jpg', likes: '4.5k', tag: 'پک پاستلی' }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white via-pink-50/30 to-white text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 font-bold px-3.5 py-1 rounded-full text-xs mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>باشگاه مشتریان و جامعه خریداران</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            تجربه خریداران بوتیک «ابر صورتی»
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            بیش از ۱۲,۵۰۰ سفارش موفق با رضایت ۹۹٪ در سراسر شهرهای کشور
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map(t => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm hover:shadow-xl hover:shadow-pink-100 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-2xl bg-pink-100 text-base flex items-center justify-center">
                      {t.avatar}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{t.name}</h4>
                      <span className="text-[10px] text-slate-400">{t.city} • {t.date}</span>
                    </div>
                  </div>
                  <div className="flex text-amber-400 text-xs">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  «{t.comment}»
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-pink-50 flex items-center justify-between text-[11px] text-pink-600 font-medium">
                <span>محصول: {t.product}</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>تایید شده</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Visual Gallery Strip */}
        <div className="bg-gradient-to-r from-pink-50/60 to-rose-50/40 rounded-3xl p-6 sm:p-8 border border-pink-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-600 text-white flex items-center justify-center">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-800">
                  ما را در اینستاگرام دنبال کنید: <span className="font-mono text-pink-600">@abrsorati.ir</span>
                </h3>
                <p className="text-xs text-slate-500">
                  ویدیوهای معرفی محصولات، رضایت خریداران و آنباکسینگ بسته‌های ارسالی
                </p>
              </div>
            </div>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="bg-white hover:bg-pink-50 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl border border-pink-200 shadow-2xs transition self-start sm:self-auto cursor-pointer"
            >
              عضویت در اینستاگرام ←
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {instagramPosts.map((post, idx) => (
              <div
                key={idx}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-white border border-pink-100 cursor-pointer"
              >
                <img
                  src={post.img}
                  alt={post.tag}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-bold gap-1">
                  <Heart className="w-4 h-4 fill-white" />
                  <span>{post.likes}</span>
                  <span className="text-[10px] text-pink-200">{post.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
