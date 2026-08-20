import React, { useState } from 'react';
import { Lock, Eye, EyeOff, X, ShieldCheck } from 'lucide-react';
import * as api from '../lib/api';

export const AdminLoginModal = ({ onLoginSuccess, isOpen = false, isAuthenticated = false, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await api.auth.login(email.trim(), password);
      if (res && res.token) {
        api.setToken(res.token);
        onLoginSuccess(res.user);
        setPassword('');
      } else {
        setError('پاسخ سرور نامعتبر است.');
      }
    } catch (err) {
      setError(err.message || 'خطا در ورود. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated || !isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-3">
      <div
        className="bg-white sm:rounded-2xl rounded-t-3xl shadow-2xl max-w-[360px] w-[calc(100%-1rem)] p-5 sm:p-7 animate-slide-up-mobile sm:animate-none relative"
        style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={() => onClose && onClose()}
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
          aria-label="بستن"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-5 sm:mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl mb-3 shadow-inner">
            <ShieldCheck className="w-7 h-7 text-pink-600" />
          </div>
          <h2 className="text-xl font-black text-slate-900">ورود به پنل مدیریت</h2>
          <p className="text-slate-500 text-xs mt-1">این بخش فقط برای مدیر فروشگاه است</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">ایمیل مدیر</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@abrsorati.ir"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-pink-500 transition-colors text-right bg-slate-50 dir-ltr"
              disabled={isLoading}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">رمز عبور</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور را وارد کنید"
                className="w-full px-4 py-3 pl-11 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-pink-500 transition-colors text-right bg-slate-50"
                disabled={isLoading}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors p-1"
                disabled={isLoading}
                aria-label={showPassword ? 'مخفی کردن رمز' : 'نمایش رمز'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 text-sm text-red-700 text-right">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-md shadow-pink-200"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>در حال بررسی...</span>
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                <span>ورود به پنل مدیریت</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
