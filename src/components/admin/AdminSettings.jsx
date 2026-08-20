import React, { useState, useRef } from 'react';
import { useShop } from '../../context/ShopContext';
import { Settings, Save, Sparkles, Phone, MapPin, Globe, Image as ImageIcon, Truck, Lock, Download, Upload, ShieldCheck, KeyRound, Eye, EyeOff } from 'lucide-react';

export const AdminSettings = () => {
  const { storeSettings, updateStoreSettings, formatPrice, changeAdminPassword, exportDatabase, importDatabase, adminUser, showToast } = useShop();

  const [formData, setFormData] = useState({ ...storeSettings });

  const [pwdCurrent, setPwdCurrent] = useState('');
  const [pwdNew, setPwdNew] = useState('');
  const [pwdConfirm, setPwdConfirm] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [pwdSaving, setPwdSaving] = useState(false);

  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStoreSettings(formData);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (pwdNew.length < 6) {
      showToast('رمز جدید باید حداقل ۶ کاراکتر باشد', 'warning');
      return;
    }
    if (pwdNew !== pwdConfirm) {
      showToast('تکرار رمز جدید مطابقت ندارد', 'warning');
      return;
    }
    setPwdSaving(true);
    const ok = await changeAdminPassword(pwdCurrent, pwdNew);
    setPwdSaving(false);
    if (ok) {
      setPwdCurrent(''); setPwdNew(''); setPwdConfirm('');
    }
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!window.confirm('توجه: بازیابی پشتیبان، تمام داده‌های فعلی را جایگزین می‌کند. ادامه می‌دهید؟')) {
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        await importDatabase(data);
      } catch (err) {
        showToast('فایل پشتیبان معتبر نیست', 'error');
      }
      e.target.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 text-right">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 border border-pink-100/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-black text-slate-900">تنظیمات، بنرها و اطلاعات هویتی فروشگاه</h3>
          <p className="text-xs text-slate-500 mt-0.5">تغییر متون بنرها، شماره تماس، سقف ارسال رایگان و آدرس شبکه اجتماعی</p>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs font-black px-6 py-2.5 rounded-2xl shadow-md shadow-pink-200 transition flex items-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>ذخیره تغییرات فروشگاه</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        
        {/* 1. Identity & Domain */}
        <div className="bg-white rounded-3xl p-6 border border-pink-100/90 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-pink-50">
            <Globe className="w-4 h-4 text-pink-600" />
            <span>اطلاعات پایه و برندینگ</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">نام فروشگاه</label>
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">دامنه سایت</label>
              <input
                type="text"
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300 font-mono dir-ltr text-left"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">حداقل مبلغ ارسال رایگان (تومان)</label>
              <input
                type="number"
                value={formData.freeShippingThreshold}
                onChange={(e) => setFormData({ ...formData, freeShippingThreshold: Number(e.target.value) })}
                className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">شعار و عنوان فرعی هدر</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300"
            />
          </div>
        </div>

        {/* 2. Top Announcement & Hero Texts */}
        <div className="bg-white rounded-3xl p-6 border border-pink-100/90 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-pink-50">
            <Sparkles className="w-4 h-4 text-pink-600" />
            <span>متون نوار اعلان بالا و بنر هیرو</span>
          </h4>

          <div>
            <label className="block font-bold text-slate-700 mb-1">متن نوار اعلان صورتی بالای سایت (Ticker)</label>
            <input
              type="text"
              value={formData.announcementText}
              onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
              className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">تیتر اصلی بنر هیرو (Headline)</label>
            <input
              type="text"
              value={formData.heroHeadline}
              onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
              className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300 font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">توضیحات تکمیلی هیرو</label>
            <textarea
              rows="3"
              value={formData.heroSubtext}
              onChange={(e) => setFormData({ ...formData, heroSubtext: e.target.value })}
              className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300 leading-relaxed"
            />
          </div>
        </div>

        {/* 3. Contact & Support Info */}
        <div className="bg-white rounded-3xl p-6 border border-pink-100/90 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-pink-50">
            <Phone className="w-4 h-4 text-pink-600" />
            <span>اطلاعات تماس، ساعات پاسخگویی و شبکه‌های اجتماعی</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">شماره تماس پشتیبانی</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300 font-mono dir-ltr text-left"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">ساعات کاری و پاسخگویی</label>
              <input
                type="text"
                value={formData.supportHours}
                onChange={(e) => setFormData({ ...formData, supportHours: e.target.value })}
                className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">آیدی اینستاگرام</label>
              <input
                type="text"
                value={formData.instagramHandle}
                onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300 font-mono dir-ltr text-left"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">آدرس دفتر مرکزی و انبار</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300"
            />
          </div>
        </div>

        {/* 4. Images URLs */}
        <div className="bg-white rounded-3xl p-6 border border-pink-100/90 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-pink-50">
            <ImageIcon className="w-4 h-4 text-pink-600" />
            <span>آدرس لوگو و بنرهای تصویری</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">آدرس لوگوی رسمی</label>
              <input
                type="text"
                value={formData.logoUrl}
                onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300 font-mono dir-ltr text-left"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">آدرس بنر اصلی هیرو</label>
              <input
                type="text"
                value={formData.heroImageUrl}
                onChange={(e) => setFormData({ ...formData, heroImageUrl: e.target.value })}
                className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300 font-mono dir-ltr text-left"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs font-black px-8 py-3.5 rounded-2xl shadow-lg shadow-pink-300/50 transition flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>ذخیره نهایی تمامی تنظیمات</span>
          </button>
        </div>

      </form>

      {/* ============= SECURITY & BACKUP ============= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">

        {/* Change Password */}
        <form onSubmit={handlePasswordChange} className="bg-white rounded-3xl p-6 border border-pink-100/90 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-pink-50">
            <KeyRound className="w-4 h-4 text-pink-600" />
            <span>تغییر رمز عبور مدیر</span>
          </h4>

          {adminUser && (
            <p className="text-[11px] text-slate-500">
              حساب فعلی: <span className="font-mono font-bold text-slate-700 dir-ltr">{adminUser.email}</span>
            </p>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1">رمز عبور فعلی</label>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                value={pwdCurrent}
                onChange={(e) => setPwdCurrent(e.target.value)}
                className="w-full bg-slate-50 rounded-xl p-3 pl-10 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300"
                required
                autoComplete="current-password"
              />
              <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">رمز جدید (حداقل ۶ کاراکتر)</label>
              <input
                type={showPwd ? 'text' : 'password'}
                value={pwdNew}
                onChange={(e) => setPwdNew(e.target.value)}
                className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300"
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">تکرار رمز جدید</label>
              <input
                type={showPwd ? 'text' : 'password'}
                value={pwdConfirm}
                onChange={(e) => setPwdConfirm(e.target.value)}
                className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300"
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={pwdSaving}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white text-xs font-bold px-6 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-md transition"
          >
            <Lock className="w-4 h-4" />
            <span>{pwdSaving ? 'در حال ذخیره...' : 'تغییر رمز عبور'}</span>
          </button>
        </form>

        {/* Backup & Restore */}
        <div className="bg-white rounded-3xl p-6 border border-pink-100/90 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-pink-50">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>پشتیبان‌گیری از دیتابیس</span>
          </h4>

          <p className="text-slate-600 leading-relaxed">
            تمام محصولات، دسته‌ها، سفارشات، کدهای تخفیف، تنظیمات و کاربران به صورت یک فایل JSON قابل خروجی گرفتن و بازیابی هستند.
            توصیه می‌شود هفتگی یک نسخه پشتیبان دانلود کنید.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={exportDatabase}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition"
            >
              <Download className="w-4 h-4" />
              <span>دانلود فایل پشتیبان</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition"
            >
              <Upload className="w-4 h-4" />
              <span>بازیابی از فایل</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleImportFile}
              className="hidden"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed">
            💾 داده‌ها روی سرور Netlify Blobs ذخیره می‌شوند (به صورت JSON key-value). فایل خروجی یک اسنپ‌شات کامل از دیتابیس است.
          </div>
        </div>

      </div>

    </div>
  );
};
