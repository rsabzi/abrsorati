import React, { useState } from 'react';
import { Lock, Eye, EyeOff, LogOut } from 'lucide-react';

export const AdminLoginModal = ({ onLoginSuccess, isOpen = false, isAuthenticated = false, onLogout }) => {
  const [email, setEmail] = useState('admin@abrsorati.ir');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Default admin credentials
  const ADMIN_CREDENTIALS = {
    email: 'admin@abrsorati.ir',
    password: 'Admin@2024'
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email.trim() === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        onLoginSuccess({ email, role: 'admin' });
        setPassword('');
        setEmail(ADMIN_CREDENTIALS.email);
      } else {
        setError('ایمیل یا رمز عبور اشتباه است. لطفا دوباره سعی کنید.');
      }
      setIsLoading(false);
    }, 600);
  };

  if (isAuthenticated) {
    return null;
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 sm:p-10 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full mb-4">
            <Lock className="w-8 h-8 text-pink-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">پنل مدیریت</h2>
          <p className="text-slate-500 text-sm mt-2">ورود به حساب کاربری مدیر</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">ایمیل مدیر</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@abrsorati.ir"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-pink-500 transition-colors text-right bg-slate-50"
              disabled={isLoading}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">رمز عبور</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور را وارد کنید"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-pink-500 transition-colors text-right bg-slate-50"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 text-sm text-red-700 text-right">
              {error}
            </div>
          )}

          {/* Demo Credentials Info */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-3 text-sm text-blue-700 text-right">
            <p className="font-bold mb-1">اطلاعات دمو:</p>
            <p>ایمیل: admin@abrsorati.ir</p>
            <p>رمز: Admin@2024</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                در حال بررسی...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                ورود به پنل
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          این پنل فقط برای مدیران فروشگاه ابر صورتی است
        </p>
      </div>
    </div>
  );
};
