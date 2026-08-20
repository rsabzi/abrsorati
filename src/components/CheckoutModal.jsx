import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { SHIPPING_METHODS } from '../data/products';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle2,
  Truck,
  CreditCard,
  MapPin,
  User,
  Phone,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Printer,
  Copy,
  Check,
  Package,
  Calendar,
  Lock,
  Gift
} from 'lucide-react';

export const CheckoutModal = () => {
  const {
    cart,
    checkoutOpen,
    setCheckoutOpen,
    clearCart,
    giftWrap,
    giftNote,
    appliedCoupon,
    getCartSubtotal,
    getCartDiscount,
    getGiftWrapCost,
    getShippingCost,
    getCartTotal,
    formatPrice,
    setOrders,
    showToast,
    navigateToHome
  } = useShop();

  const [step, setStep] = useState(1); // 1: Address, 2: Shipping & Payment, 3: Processing, 4: Confirmed
  const [formData, setFormData] = useState({
    fullName: 'سارا میرزایی',
    phone: '09123456789',
    province: 'تهران',
    city: 'تهران',
    address: 'خیابان ولیعصر، بالاتر از میدان ونک، کوچه نگار، پلاک ۲۴، واحد ۳',
    postalCode: '1969745123',
    notes: 'لطفاً زنگ واحد ۳ را بزنید یا قبل از رسیدن تماس بگیرید.'
  });

  const [selectedShipping, setSelectedShipping] = useState('post-express');
  const [selectedPayment, setSelectedPayment] = useState('online-gateway');
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!checkoutOpen) return null;

  const subtotal = getCartSubtotal();
  const discount = getCartDiscount();
  const giftCost = getGiftWrapCost();
  const shippingCost = getShippingCost();
  const total = getCartTotal();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProceedToStep2 = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      showToast('لطفاً تمامی فیلدهای الزامی آدرس را تکمیل فرمایید.', 'warning');
      return;
    }
    setStep(2);
  };

  const handleProcessPayment = () => {
    setStep(3); // Show processing spinner

    setTimeout(() => {
      // Generate order record
      const newOrderNumber = 'AS-' + Math.floor(100000 + Math.random() * 900000);
      const postalCodeTracking = '3948' + Math.floor(100000000000 + Math.random() * 900000000000);
      
      const orderRecord = {
        id: newOrderNumber,
        date: new Date().toLocaleDateString('fa-IR'),
        items: [...cart],
        itemsCount: cart.reduce((c, i) => c + i.quantity, 0),
        subtotal,
        discount,
        giftCost,
        shippingCost,
        total,
        customerName: formData.fullName,
        phone: formData.phone,
        address: `${formData.province}، ${formData.city}، ${formData.address}`,
        postalCode: formData.postalCode,
        shippingMethod: SHIPPING_METHODS.find(m => m.id === selectedShipping)?.name || 'پست پیشتاز',
        paymentMethod: selectedPayment === 'online-gateway' ? 'پرداخت آنلاین شاپرک (موفق)' : 'پرداخت در محل',
        trackingCode: postalCodeTracking,
        giftWrap,
        giftNote: giftWrap ? giftNote : null,
        status: 'processing',
        statusLabel: 'در حال بافت و بسته‌بندی معطر'
      };

      setConfirmedOrder(orderRecord);
      setOrders(prev => [orderRecord, ...prev]);
      clearCart();
      setStep(4);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#F472B6', '#FB7185', '#C084FC', '#FBBF24', '#F43F5E']
        });
      } catch (e) {}

    }, 2000);
  };

  const handleCopyTracking = () => {
    if (confirmedOrder) {
      navigator.clipboard.writeText(confirmedOrder.id);
      setCopiedCode(true);
      showToast('شماره سفارش کپی شد!', 'success');
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 text-right animate-in fade-in">
      
      <div className="bg-white rounded-3xl shadow-2xl border border-pink-100 max-w-3xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-pink-100 bg-gradient-to-r from-pink-50/80 to-rose-50/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              ☁️
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-800">
                تسویه حساب و ثبت سفارش ابر صورتی
              </h2>
              <span className="text-xs text-pink-600 font-medium">
                بسته‌بندی کادویی دست‌ساز با ارسال ضد ضربه
              </span>
            </div>
          </div>

          <button
            onClick={() => setCheckoutOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Step Bar (Steps 1 & 2) */}
        {step < 3 && (
          <div className="bg-slate-50 px-6 py-3 border-b border-pink-100 flex items-center justify-center gap-4 text-xs font-bold">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-pink-600' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-pink-500 text-white' : 'bg-slate-200'}`}>
                ۱
              </span>
              <span>مشخصات و آدرس تحویل</span>
            </div>
            <span className="w-8 h-0.5 bg-slate-200" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-pink-600' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-pink-500 text-white' : 'bg-slate-200'}`}>
                ۲
              </span>
              <span>شیوه ارسال و پرداخت</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          
          {/* STEP 1: Address & Receiver Info */}
          {step === 1 && (
            <form onSubmit={handleProceedToStep2} className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-pink-600" />
                <span>اطلاعات تماس و نشانی دقیق گیرنده مرسوله:</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    نام و نام خانوادگی تحویل‌گیرنده <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="مثال: مریم کریمی"
                      className="w-full bg-slate-50 text-xs rounded-xl pr-9 pl-3 py-3 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-pink-300 outline-none"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    شماره موبایل جهت پیامک رهگیری <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="09123456789"
                      className="w-full bg-slate-50 text-xs rounded-xl pr-9 pl-3 py-3 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-pink-300 outline-none font-mono text-left"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">استان</label>
                  <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    placeholder="تهران / فارس / خراسان..."
                    className="w-full bg-slate-50 text-xs rounded-xl p-3 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-pink-300 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">شهر</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="تهران / شیراز / اصفهان..."
                    className="w-full bg-slate-50 text-xs rounded-xl p-3 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-pink-300 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  آدرس دقیق پستی <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows="2"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="نام خیابان، کوچه، پلاک، واحد..."
                  className="w-full bg-slate-50 text-xs rounded-xl p-3 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-pink-300 outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">کد پستی ۱۰ رقمی</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="1234567890"
                    className="w-full bg-slate-50 text-xs rounded-xl p-3 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-pink-300 outline-none font-mono text-left"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">توضیحات و یادداشت تحویل (اختیاری)</label>
                  <input
                    type="text"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="مثلاً تحویل به لابی‌من یا تماس قبل از ارسال..."
                    className="w-full bg-slate-50 text-xs rounded-xl p-3 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-pink-300 outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3.5 rounded-2xl font-black text-xs sm:text-sm shadow-md flex items-center gap-2"
                >
                  <span>مرحله بعد: انتخاب شیوه ارسال و پرداخت</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Shipping & Payment Method */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Shipping Methods */}
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-3">
                  <Truck className="w-4 h-4 text-pink-600" />
                  <span>شیوه ارسال سفارش را انتخاب کنید:</span>
                </h3>
                <div className="space-y-2.5">
                  {SHIPPING_METHODS.map(method => (
                    <label
                      key={method.id}
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition ${
                        selectedShipping === method.id
                          ? 'border-pink-500 bg-pink-50/60 ring-2 ring-pink-200'
                          : 'border-slate-200 hover:border-pink-200 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        checked={selectedShipping === method.id}
                        onChange={() => setSelectedShipping(method.id)}
                        className="mt-1 accent-pink-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                            <span>{method.icon}</span>
                            <span>{method.name}</span>
                          </span>
                          <span className="text-xs font-bold text-rose-600">
                            {shippingCost === 0 ? 'رایگان 🎉' : `${formatPrice(method.price)} تومان`}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                          {method.description} ({method.estimatedDays})
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-3">
                  <CreditCard className="w-4 h-4 text-pink-600" />
                  <span>شیوه پرداخت:</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition ${
                      selectedPayment === 'online-gateway'
                        ? 'border-pink-500 bg-pink-50/60 ring-2 ring-pink-200'
                        : 'border-slate-200 hover:border-pink-200 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={selectedPayment === 'online-gateway'}
                      onChange={() => setSelectedPayment('online-gateway')}
                      className="mt-1 accent-pink-500"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">
                        درگاه پرداخت آنلاین شتابی (شاپرک)
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        متصل به درگاه امن بانکی ملت / زرین‌پال با رمز پویا
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition ${
                      selectedPayment === 'cod'
                        ? 'border-pink-500 bg-pink-50/60 ring-2 ring-pink-200'
                        : 'border-slate-200 hover:border-pink-200 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={selectedPayment === 'cod'}
                      onChange={() => setSelectedPayment('cod')}
                      className="mt-1 accent-pink-500"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">
                        پرداخت کارت به کارت VIP
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        واریز به شماره کارت بانک سامان و ثبت آنی فیش
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>مجموع مبلغ سفارش ({cart.length} کالا):</span>
                  <span className="font-mono font-bold text-slate-800">{formatPrice(subtotal)} تومان</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>تخفیف اعمال شده:</span>
                    <span className="font-mono font-bold">-{formatPrice(discount)} تومان</span>
                  </div>
                )}
                {giftCost > 0 && (
                  <div className="flex justify-between text-pink-600 font-medium">
                    <span>بسته‌بندی کادویی اختصاصی:</span>
                    <span className="font-mono font-bold">+{formatPrice(giftCost)} تومان</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>هزینه حمل و نقل:</span>
                  <span className="font-mono font-bold">
                    {shippingCost === 0 ? 'رایگان 🎉' : `${formatPrice(shippingCost)} تومان`}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm font-black text-slate-900">
                  <span>مبلغ کل پرداختی:</span>
                  <span className="text-base sm:text-lg font-black text-rose-600">
                    {formatPrice(total)} تومان
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>ویرایش آدرس</span>
                </button>

                <button
                  type="button"
                  onClick={handleProcessPayment}
                  className="bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-600 hover:from-rose-600 hover:to-fuchsia-700 text-white px-8 py-3.5 rounded-2xl font-black text-xs sm:text-sm shadow-lg shadow-pink-300/50 flex items-center gap-2 transform active:scale-98"
                >
                  <Lock className="w-4 h-4" />
                  <span>پرداخت امن و ثبت نهایی ({formatPrice(total)} تومان)</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Processing Simulation */}
          {step === 3 && (
            <div className="py-12 text-center space-y-4">
              <div className="relative w-20 h-20 mx-auto">
                <div className="w-20 h-20 rounded-full border-4 border-pink-100 border-t-pink-600 animate-spin" />
                <span className="absolute inset-0 flex items-center justify-center text-2xl">
                  🔒
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900">
                در حال برقراری ارتباط با درگاه پرداخت شاپرک...
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                لطفاً شکیبا باشید. تراکنش شما به صورت رمزنگاری شده ۲۵۶ بیتی در حال تایید است.
              </p>
            </div>
          )}

          {/* STEP 4: Confirmed & Celebration */}
          {step === 4 && confirmedOrder && (
            <div className="space-y-6 text-right animate-in zoom-in-95 duration-300">
              
              {/* Success Banner */}
              <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 p-6 rounded-3xl text-center space-y-2">
                <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center text-3xl mx-auto shadow-md shadow-emerald-200 animate-bounce">
                  ✓
                </div>
                <h3 className="text-lg sm:text-xl font-black text-emerald-900">
                  سفارش شما با موفقیت ثبت و تایید شد! 🎉
                </h3>
                <p className="text-xs text-emerald-700 max-w-md mx-auto leading-relaxed">
                  از اینکه «ابر صورتی» را برای زیبایی لحظات خود یا عزیزانتان انتخاب کردید بسیار سپاسگزاریم. بافندگان ما با عشق آماده‌سازی بسته شما را آغاز کرده‌اند.
                </p>
              </div>

              {/* Order Tracking & Meta Card */}
              <div className="bg-pink-50/50 p-4 sm:p-5 rounded-3xl border border-pink-100 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-pink-100">
                  <div>
                    <span className="text-xs text-slate-500 block">شماره اختصاصی سفارش شما:</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-base sm:text-lg font-mono font-black text-pink-700">
                        {confirmedOrder.id}
                      </span>
                      <button
                        onClick={handleCopyTracking}
                        className="text-pink-600 hover:text-pink-800 p-1 rounded-md hover:bg-pink-100 transition"
                        title="کپی شماره سفارش"
                      >
                        {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="text-left">
                    <span className="text-xs text-slate-500 block">کد رهگیری پیامکی پستی:</span>
                    <span className="text-xs font-mono font-bold text-slate-700 mt-0.5 block dir-ltr text-right">
                      {confirmedOrder.trackingCode}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">تحویل‌گیرنده:</span>
                    <span className="font-bold text-slate-800 mt-0.5 block">{confirmedOrder.customerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">شماره تماس:</span>
                    <span className="font-bold text-slate-800 mt-0.5 block font-mono">{confirmedOrder.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">شیوه ارسال:</span>
                    <span className="font-bold text-slate-800 mt-0.5 block">{confirmedOrder.shippingMethod}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">مبلغ پرداخت شده:</span>
                    <span className="font-bold text-rose-600 mt-0.5 block font-mono">
                      {formatPrice(confirmedOrder.total)} ت
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-pink-100 text-xs text-slate-600">
                  <span className="text-slate-400 block text-[11px] mb-0.5">آدرس ارسال:</span>
                  <span>{confirmedOrder.address}</span>
                </div>
              </div>

              {/* Items Purchased List */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">اقلام سفارش داده شده:</h4>
                <div className="space-y-2">
                  {confirmedOrder.items.map(item => (
                    <div key={item.key} className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs">
                      <div className="flex items-center gap-2">
                        <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg border border-pink-100" />
                        <div>
                          <p className="font-bold text-slate-800">{item.name}</p>
                          <span className="text-[10px] text-slate-400">{item.selectedColor?.name} • {item.quantity} عدد</span>
                        </div>
                      </div>
                      <span className="font-bold text-rose-600 font-mono">
                        {formatPrice(item.price * item.quantity)} تومان
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>چاپ / ذخیره فاکتور</span>
                </button>

                <button
                  onClick={() => {
                    setCheckoutOpen(false);
                    navigateToHome();
                  }}
                  className="bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition"
                >
                  بازگشت به صفحه اصلی ابر صورتی
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
