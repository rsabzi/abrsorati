import React from 'react';
import { useShop } from '../context/ShopContext';
import { GUARANTEES } from '../data/products';
import { Sparkles, Heart, ShieldCheck, ArrowLeft, Award, Feather, Smile, CheckCircle2 } from 'lucide-react';

export const AboutStory = () => {
  const { navigateToCategory } = useShop();

  return (
    <div className="py-12 bg-white text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 bg-pink-100/80 text-pink-700 font-bold px-3.5 py-1 rounded-full text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>داستان برند ابر صورتی (abrsorati.ir)</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
              زیبایی، لطافت و اعتماد به نفس؛{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-rose-600 to-pink-600">
                لباس زیر زنانه و کراپ‌های پاستلی
              </span>
            </h1>

            <p className="text-slate-600 text-xs sm:text-sm sm:leading-relaxed">
              «ابر صورتی» با هدف ارائه لطیف‌ترین و باکیفیت‌ترین لباس‌های زیر زنانه، کراپ‌های ترند بند ماکارون، جوراب‌های فانتزی، کش‌موهای ابریشمی ضد موخوره و مینی‌اسکارف‌های شیک متولد شد. باور ما این است که راحتی و زیبایی از اولین لایه لباس آغاز می‌شود؛ جایی که پوست شما با نرم‌ترین پارچه‌ها در تماس است.
            </p>

            <p className="text-slate-600 text-xs sm:text-sm sm:leading-relaxed">
              تمامی محصولات ما با بالاترین استانداردهای بهداشتی (فاق دوبل ۱۰۰٪ پنبه، رنگ‌های ارگانیک ضد حساسیت، برش‌های لیزری بدون درز) تولید شده و در بسته‌بندی‌های کاملاً محرمانه، بهداشتی و معطر به عصاره آرامش‌بخش اسطوخودوس به دست شما می‌رسند.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100">
                <span className="text-2xl font-black text-pink-600 block">+۱۲,۵۰۰</span>
                <span className="text-xs text-slate-600 font-bold mt-0.5 block">مشتری راضی و وفادار</span>
              </div>
              <div className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100">
                <span className="text-2xl font-black text-rose-600 block">۱۰۰٪</span>
                <span className="text-xs text-slate-600 font-bold mt-0.5 block">فاق پنبه ضد حساسیت</span>
              </div>
              <div className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100 col-span-2 sm:col-span-1">
                <span className="text-2xl font-black text-amber-500 block">۴.۹ ★</span>
                <span className="text-xs text-slate-600 font-bold mt-0.5 block">امتیاز کیفیت کالاها</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-50 bg-white p-6 flex flex-col items-center justify-center text-center">
              <img
                src="/images/logo.png"
                alt="لوگوی رسمی ابر صورتی"
                className="w-48 h-48 object-contain mb-4"
              />
              <h3 className="text-lg font-black text-slate-900">ابر صورتی | abrsorati.ir</h3>
              <p className="text-xs text-pink-600 font-bold mt-1">لباس زیر زنانه، کراپ و اکسسوری فانتزی</p>
              <div className="mt-4 pt-4 border-t border-pink-100 w-full flex items-center justify-center gap-4 text-xs text-slate-500">
                <span>ارسال محرمانه 📦</span>
                <span>•</span>
                <span>بسته‌بندی کادویی 🎁</span>
                <span>•</span>
                <span>ضمانت اصالت 🌸</span>
              </div>
            </div>
          </div>

        </div>

        {/* 5 Guarantees Grid */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
              استانداردهای طلایی بوتیک ابر صورتی
            </h2>
            <p className="text-xs text-slate-500">
              کیفیت، بهداشت و راحتی شما خط قرمز همیشگی ماست
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {GUARANTEES.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-pink-50/40 border border-pink-100 hover:border-pink-300 transition hover:shadow-lg hover:shadow-pink-100 flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl p-2.5 bg-white rounded-2xl inline-block shadow-2xs border border-pink-100 mb-3">
                    {item.icon}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to catalog */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-600 rounded-3xl p-8 sm:p-10 text-white text-center shadow-xl shadow-pink-300/40">
          <h2 className="text-xl sm:text-3xl font-black mb-3">
            آماده‌اید حس لطافت واقعی را تجربه کنید؟ 🎀
          </h2>
          <p className="text-xs sm:text-sm text-pink-100 max-w-xl mx-auto mb-6 leading-relaxed">
            کالکشن جدید کراپ‌های بند ماکارون، شورت‌های لیزری، جوراب‌ها و مینی‌اسکارف‌ها را مشاهده نمایید.
          </p>
          <button
            onClick={() => navigateToCategory('all')}
            className="inline-flex items-center gap-2 bg-white text-pink-700 hover:bg-pink-50 font-black text-xs sm:text-sm px-8 py-3.5 rounded-2xl shadow-lg transition transform active:scale-95 cursor-pointer"
          >
            <span>ورود به فروشگاه و مشاهده محصولات</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
