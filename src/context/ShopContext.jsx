import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS, VALID_COUPONS as INITIAL_COUPONS, SHIPPING_METHODS } from '../data/products';
import { CATEGORIES as INITIAL_CATEGORIES } from '../data/categories';
import * as api from '../lib/api';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // 1. Dynamic Products State (persisted in localStorage)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('abr_soorati_products_v3');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch (e) {
      return INITIAL_PRODUCTS;
    }
  });

  // 2. Dynamic Categories State (persisted in localStorage)
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('abr_soorati_categories_v3');
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch (e) {
      return INITIAL_CATEGORIES;
    }
  });

  // 3. Dynamic Coupons State
  const [coupons, setCoupons] = useState(() => {
    try {
      const saved = localStorage.getItem('abr_soorati_coupons_v3');
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch (e) {
      return INITIAL_COUPONS;
    }
  });

  // 4. Store Settings (announcement, hero, contacts, etc.)
  const [storeSettings, setStoreSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('abr_soorati_settings_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migrate old logo path to new logo icon
        if (parsed.logoUrl === '/images/logo.png') {
          parsed.logoUrl = '/images/logo-icon.png';
        }
        return parsed;
      }
      return {
        storeName: 'ابر صورتی',
        domain: 'abrsorati.ir',
        tagline: 'فروشگاه تخصصی لباس زیر زنانه، کراپ بند ماکارون، شورت، جوراب، کش مو و مینی اسکارف',
        phone: '۰۲۱-۹۱۰۱۸۷۶۵',
        supportHours: 'شنبه تا پنج‌شنبه ۹ صبح الی ۹ شب',
        address: 'تهران، بلوار سعادت‌آباد، پلاک ۴۲',
        instagramHandle: '@abrsorati.ir',
        announcementText: 'جشنواره افتتاحیه بوتیک ابر صورتی: ۱۵٪ تخفیف کل سبد خرید با کد: PINKCLOUD',
        freeShippingThreshold: 600000,
        heroHeadline: 'حس لطافت و آرامش با ابر صورتی | لباس زیر، کراپ و اکسسوری',
        heroSubtext: 'به دنیای اختصاصی «ابر صورتی» (abrsorati.ir) خوش آمدید! برترین مرکز تخصصی کراپ‌های بند ماکارون، شورت‌های لیزری بدون درز فاق پنبه، جوراب‌های فانتزی مچی، اسکرانچی‌های ابریشم خالص و مینی اسکارف‌های ترند با بسته‌بندی معطر روبانی.',
        logoUrl: '/images/logo-icon.png',
        heroImageUrl: '/images/hero/hero-lingerie-banner.jpg'
      };
    } catch (e) {
      return {
        storeName: 'ابر صورتی',
        domain: 'abrsorati.ir',
        tagline: 'لباس زیر زنانه و کراپ بند ماکارون',
        phone: '۰۲۱-۹۱۰۱۸۷۶۵',
        freeShippingThreshold: 600000
      };
    }
  });

  // 5. Cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('abr_soorati_cart_v3');
      return saved ? JSON.parse(saved) : [
        {
          id: 'p1',
          name: 'کراپ تاپ کاپ‌دار بند ماکارونی بدون درز پاستلی',
          price: 185000,
          originalPrice: 235000,
          image: '/images/products/crop-macaron-1.jpg',
          selectedColor: { id: 'baby-pink', name: 'صورتی پاستلی', hex: '#F9A8D4' },
          selectedSize: { id: 'free-size', name: 'فری‌سایز کشسانی بالا (۳۴ تا ۴۲)', priceModifier: 0 },
          quantity: 1,
          key: 'p1-baby-pink-free-size'
        }
      ];
    } catch (e) {
      return [];
    }
  });

  // 6. Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('abr_soorati_wishlist_v3');
      return saved ? JSON.parse(saved) : ['p1', 'p2', 'p4', 'p5'];
    } catch (e) {
      return ['p1', 'p2'];
    }
  });

  // 7. Orders state
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('abr_soorati_orders_v3');
      return saved ? JSON.parse(saved) : [
        {
          id: 'AS-89421',
          date: '۱۴۰۳/۰۵/۲۲',
          status: 'delivered',
          statusLabel: 'تحویل داده شده درب منزل',
          itemsCount: 2,
          total: 380000,
          customerName: 'سارا میرزایی',
          phone: '09123456789',
          address: 'تهران، خیابان ولیعصر، بالاتر از ونک، پلاک ۲۴، واحد ۳',
          shippingMethod: 'پست پیشتاز سراسری (بسته‌بندی محرمانه)',
          paymentMethod: 'درگاه آنلاین شاپرک (موفق)',
          trackingCode: '3948201948572183',
          items: [
            { id: 'p1', name: 'کراپ تاپ کاپ‌دار بند ماکارونی بدون درز پاستلی', price: 185000, quantity: 1, image: '/images/products/crop-macaron-1.jpg', selectedColor: { name: 'صورتی پاستلی' } },
            { id: 'p2', name: 'پک ۳ عددی شورت بدون درز لیزری تنفس‌پذیر فاق پنبه', price: 195000, quantity: 1, image: '/images/products/panties-seamless-1.jpg', selectedColor: { name: 'پک پاستلی' } }
          ]
        },
        {
          id: 'AS-89422',
          date: '۱۴۰۳/۰۵/۲۴',
          status: 'processing',
          statusLabel: 'در حال بسته‌بندی معطر',
          itemsCount: 1,
          total: 145000,
          customerName: 'مهدیه خسروی',
          phone: '09351234567',
          address: 'اصفهان، خیابان چهارباغ بالا، کوچه نگار، پلاک ۱۲',
          shippingMethod: 'تیپاکس اکسپرس هوایی',
          paymentMethod: 'درگاه آنلاین شاپرک (موفق)',
          trackingCode: '3948502918471923',
          items: [
            { id: 'p4', name: 'ست ۳ عددی اسکرانچی ابریشم توت طبیعی ضد موخوره', price: 145000, quantity: 1, image: '/images/products/scrunchie-silk-1.jpg', selectedColor: { name: 'پک ابریشم' } }
          ]
        }
      ];
    } catch (e) {
      return [];
    }
  });

  // UI Navigation & Modals
  const [currentView, setCurrentView] = useState('home'); // 'home', 'catalog', 'product', 'wishlist', 'orders', 'about', 'admin'
  const [adminActiveTab, setAdminActiveTab] = useState('overview'); // 'overview', 'products', 'orders', 'categories', 'coupons', 'settings'
  const [selectedProductId, setSelectedProductId] = useState('p1');
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Admin Authentication — token-based, server-verified
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(!!api.getToken());
  const [adminUser, setAdminUser] = useState(null);

  // Loading state for initial data fetch
  const [isLoading, setIsLoading] = useState(true);
  const [apiOnline, setApiOnline] = useState(true);

  // Filters and search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([50000, 600000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedFabric, setSelectedFabric] = useState('');

  // Cart add-ons
  const [giftWrap, setGiftWrap] = useState(true);
  const [giftNote, setGiftNote] = useState('با آرزوی بهترین‌ها و لحظاتی پر از حس خوب و آرامش 🌸');
  const [selectedShipping, setSelectedShipping] = useState('post-express');
  const [appliedCoupon, setAppliedCoupon] = useState({
    code: 'PINKCLOUD',
    title: 'جشنواره افتتاحیه بوتیک ابر صورتی (۱۵٪ تخفیف)',
    discountType: 'percent',
    value: 15
  });

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  // Persist local-only state (cart, wishlist) to localStorage.
  // Products, categories, coupons, settings and orders live on the server.
  useEffect(() => {
    try { localStorage.setItem('abr_soorati_cart_v3', JSON.stringify(cart)); } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try { localStorage.setItem('abr_soorati_wishlist_v3', JSON.stringify(wishlist)); } catch (e) {}
  }, [wishlist]);

  // ============ INITIAL LOAD FROM API ============
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [p, c, cp, s] = await Promise.all([
          api.db.list('products'),
          api.db.list('categories'),
          api.db.list('coupons'),
          api.db.getSettings()
        ]);
        if (cancelled) return;
        if (Array.isArray(p) && p.length > 0) setProducts(p);
        if (Array.isArray(c) && c.length > 0) setCategories(c);
        if (Array.isArray(cp)) setCoupons(cp);
        if (s && typeof s === 'object') setStoreSettings(prev => ({ ...prev, ...s }));
        setApiOnline(true);
      } catch (err) {
        console.warn('[shop] failed to load from API, using local defaults:', err.message);
        setApiOnline(false);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Verify admin session on mount / when token changes, and load orders when authed.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = api.getToken();
      if (!token) {
        setIsAdminAuthenticated(false);
        setAdminUser(null);
        return;
      }
      try {
        const { user } = await api.auth.me();
        if (cancelled) return;
        if (user) {
          setIsAdminAuthenticated(true);
          setAdminUser(user);
          // Load orders (admin-only)
          try {
            const o = await api.db.list('orders');
            if (Array.isArray(o)) setOrders(o);
          } catch (e) { /* ignore */ }
        } else {
          api.setToken(null);
          setIsAdminAuthenticated(false);
          setAdminUser(null);
        }
      } catch (err) {
        if (err.status === 401) {
          api.setToken(null);
          setIsAdminAuthenticated(false);
          setAdminUser(null);
        }
      }
    })();
    return () => { cancelled = true; };
  }, [isAdminAuthenticated]);

  // Toast Trigger
  const showToast = (message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // --- ADMIN PRODUCT CRUD OPERATIONS ---
  // Helper for API errors
  const handleApiError = (err, defaultMsg) => {
    console.error('[shop] API error:', err);
    showToast(err.message || defaultMsg || 'خطای ارتباط با سرور', 'error');
  };

  const addProduct = async (newProd) => {
    const sku = newProd.sku || ('AS-' + (newProd.category?.toUpperCase() || 'PROD') + '-' + Math.floor(10 + Math.random() * 90));
    const fullProd = {
      ...newProd,
      sku,
      rating: newProd.rating || 5.0,
      reviewsCount: newProd.reviewsCount || 0,
      salesCount: newProd.salesCount || 0,
      inStock: newProd.inStock !== false,
      gallery: newProd.gallery?.length ? newProd.gallery : [newProd.primaryImage],
      reviews: []
    };
    try {
      const created = await api.db.create('products', fullProd);
      setProducts(prev => [created, ...prev]);
      showToast(`محصول جدید «${created.name}» با موفقیت افزوده شد! ✨`, 'success');
      return created;
    } catch (err) {
      handleApiError(err, 'خطا در افزودن محصول');
      return null;
    }
  };

  const updateProduct = async (id, updatedData) => {
    try {
      const updated = await api.db.update('products', id, updatedData);
      setProducts(prev => prev.map(p => p.id === id ? updated : p));
      showToast('اطلاعات محصول با موفقیت به‌روزرسانی شد. ✓', 'success');
    } catch (err) {
      handleApiError(err, 'خطا در به‌روزرسانی محصول');
    }
  };

  const deleteProduct = async (id) => {
    const prod = products.find(p => p.id === id);
    try {
      await api.db.remove('products', id);
      setProducts(prev => prev.filter(p => p.id !== id));
      setCart(prev => prev.filter(item => item.id !== id));
      setWishlist(prev => prev.filter(wId => wId !== id));
      showToast(`محصول «${prod?.name || id}» حذف شد.`, 'info');
    } catch (err) {
      handleApiError(err, 'خطا در حذف محصول');
    }
  };

  const resetProductsToDefault = async () => {
    try {
      const [p, c, cp] = await Promise.all([
        api.db.replaceAll('products', INITIAL_PRODUCTS),
        api.db.replaceAll('categories', INITIAL_CATEGORIES),
        api.db.replaceAll('coupons', INITIAL_COUPONS)
      ]);
      setProducts(p);
      setCategories(c);
      setCoupons(cp);
      showToast('محصولات و دسته‌بندی‌ها به حالت پیش‌فرض بازگردانده شدند.', 'info');
    } catch (err) {
      handleApiError(err, 'خطا در بازنشانی داده‌ها');
    }
  };

  // --- ADMIN CATEGORY CRUD ---
  const addCategory = async (cat) => {
    const id = cat.id || 'cat-' + Date.now();
    const fullCat = { ...cat, id, count: cat.count || 0 };
    try {
      const created = await api.db.create('categories', fullCat);
      setCategories(prev => [...prev, created]);
      showToast(`دسته‌بندی «${created.name}» افزوده شد.`, 'success');
    } catch (err) {
      handleApiError(err, 'خطا در افزودن دسته');
    }
  };

  const updateCategory = async (id, updatedData) => {
    try {
      const updated = await api.db.update('categories', id, updatedData);
      setCategories(prev => prev.map(c => c.id === id ? updated : c));
      showToast('دسته‌بندی با موفقیت ویرایش شد.', 'success');
    } catch (err) {
      handleApiError(err, 'خطا در ویرایش دسته');
    }
  };

  const deleteCategory = async (id) => {
    if (id === 'all') {
      showToast('دسته‌بندی پیش‌فرض قابل حذف نیست.', 'error');
      return;
    }
    try {
      await api.db.remove('categories', id);
      setCategories(prev => prev.filter(c => c.id !== id));
      showToast('دسته‌بندی با موفقیت حذف شد.', 'info');
    } catch (err) {
      handleApiError(err, 'خطا در حذف دسته');
    }
  };

  // --- ADMIN ORDER MANAGEMENT ---
  const updateOrderStatus = async (orderId, newStatus) => {
    const statusMap = {
      'pending': 'در انتظار بررسی',
      'processing': 'در حال بسته‌بندی معطر',
      'shipped': 'تحویل به اداره پست / در مسیر ارسال',
      'delivered': 'تحویل داده شده درب منزل',
      'cancelled': 'لغو شده / عودت وجه'
    };
    try {
      const updated = await api.db.update('orders', orderId, {
        status: newStatus,
        statusLabel: statusMap[newStatus] || newStatus
      });
      setOrders(prev => prev.map(o => o.id === orderId ? updated : o));
      showToast(`وضعیت سفارش ${orderId} به «${statusMap[newStatus] || newStatus}» تغییر یافت.`, 'success');
    } catch (err) {
      handleApiError(err, 'خطا در تغییر وضعیت سفارش');
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await api.db.remove('orders', orderId);
      setOrders(prev => prev.filter(o => o.id !== orderId));
      showToast(`سفارش ${orderId} از سوابق حذف شد.`, 'info');
    } catch (err) {
      handleApiError(err, 'خطا در حذف سفارش');
    }
  };

  // --- ADMIN COUPON MANAGEMENT ---
  const addCoupon = async (coupon) => {
    const code = coupon.code.trim().toUpperCase();
    if (coupons.some(c => c.code === code)) {
      showToast('این کد تخفیف از قبل وجود دارد.', 'error');
      return false;
    }
    try {
      const created = await api.db.create('coupons', { ...coupon, code });
      setCoupons(prev => [...prev, created]);
      showToast(`کد تخفیف ${code} ایجاد شد.`, 'success');
      return true;
    } catch (err) {
      handleApiError(err, 'خطا در ایجاد کد تخفیف');
      return false;
    }
  };

  const deleteCoupon = async (code) => {
    try {
      await api.db.remove('coupons', code);
      setCoupons(prev => prev.filter(c => c.code !== code));
      showToast(`کد تخفیف ${code} حذف شد.`, 'info');
    } catch (err) {
      handleApiError(err, 'خطا در حذف کد تخفیف');
    }
  };

  // --- ADMIN SETTINGS UPDATE ---
  const updateStoreSettings = async (newSettings) => {
    try {
      const updated = await api.db.updateSettings(newSettings);
      setStoreSettings(prev => ({ ...prev, ...updated }));
      showToast('تنظیمات و متون فروشگاه با موفقیت ذخیره شدند! 🌸', 'success');
    } catch (err) {
      handleApiError(err, 'خطا در ذخیره تنظیمات');
    }
  };

  // --- ORDER PLACEMENT (used by CheckoutModal) ---
  const placeOrder = async (orderData) => {
    // orderData must include the fields needed on the server side.
    // The server generates the id if missing.
    try {
      const saved = await api.db.createPublic('orders', orderData);
      setOrders(prev => [saved, ...prev]);
      return saved;
    } catch (err) {
      handleApiError(err, 'خطا در ثبت سفارش');
      throw err;
    }
  };

  // --- CART OPERATIONS ---
  const addToCart = (product, options = {}) => {
    const selectedColor = options.color || product.colors?.[0] || { name: 'استاندارد', hex: '#F9A8D4' };
    const selectedSize = options.size || product.sizes?.[0] || { name: 'فری سایز', priceModifier: 0 };
    const quantity = options.quantity || 1;
    const itemKey = `${product.id}-${selectedColor.id || 'default'}-${selectedSize.id || 'default'}`;

    const effectivePrice = product.price + (selectedSize.priceModifier || 0);

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.key === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            key: itemKey,
            name: product.name,
            price: effectivePrice,
            originalPrice: product.originalPrice ? product.originalPrice + (selectedSize.priceModifier || 0) : effectivePrice,
            image: product.primaryImage,
            selectedColor,
            selectedSize,
            quantity
          }
        ];
      }
    });

    showToast(`«${product.name.slice(0, 24)}...» به سبد خرید اضافه شد! 🛍️`, 'success');
    if (options.openDrawer !== false) {
      setCartDrawerOpen(true);
    }
  };

  const updateCartQty = (key, newQty) => {
    if (newQty <= 0) {
      removeFromCart(key);
      return;
    }
    setCart(prev => prev.map(item => item.key === key ? { ...item, quantity: newQty } : item));
  };

  const removeFromCart = (key) => {
    const item = cart.find(i => i.key === key);
    setCart(prev => prev.filter(i => i.key !== key));
    if (item) {
      showToast(`«${item.name.slice(0, 20)}...» از سبد خرید حذف شد.`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist toggle
  const toggleWishlist = (productId) => {
    const isSaved = wishlist.includes(productId);
    const product = products.find(p => p.id === productId);
    if (isSaved) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast(`از لیست علاقه‌مندی‌ها حذف شد.`, 'info');
    } else {
      setWishlist(prev => [...prev, productId]);
      showToast(`«${product ? product.name.slice(0, 22) : 'محصول'}» به علاقه‌مندی‌ها اضافه شد! ❤️`, 'success');
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Coupon handling
  const applyCoupon = (codeStr) => {
    const cleanCode = codeStr.trim().toUpperCase();
    const found = coupons.find(c => c.code === cleanCode);
    if (!found) {
      showToast('کد تخفیف وارد شده معتبر نیست یا منقضی شده است!', 'error');
      return false;
    }
    const subtotal = getCartSubtotal();
    if (found.minCart && subtotal < found.minCart) {
      showToast(`این کد تخفیف برای سفارش‌های بالای ${formatPrice(found.minCart)} تومان است.`, 'warning');
      return false;
    }
    setAppliedCoupon(found);
    showToast(`کد تخفیف «${found.title}» با موفقیت اعمال شد! 🎉`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('کد تخفیف حذف شد.', 'info');
  };

  // Calculations
  const getCartSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getCartDiscount = () => {
    const subtotal = getCartSubtotal();
    if (!appliedCoupon) return 0;
    if (appliedCoupon.discountType === 'percent') {
      return Math.round((subtotal * appliedCoupon.value) / 100);
    }
    if (appliedCoupon.discountType === 'fixed') {
      return Math.min(subtotal, appliedCoupon.value);
    }
    return 0;
  };

  const getGiftWrapCost = () => {
    return (giftWrap && cart.length > 0) ? 35000 : 0;
  };

  const getShippingCost = () => {
    if (cart.length === 0) return 0;
    const subtotal = getCartSubtotal();
    const freeThreshold = storeSettings.freeShippingThreshold || 600000;
    if (subtotal >= freeThreshold) {
      return 0;
    }
    const method = SHIPPING_METHODS.find(m => m.id === selectedShipping) || SHIPPING_METHODS[0];
    return method.price;
  };

  const getCartTotal = () => {
    const subtotal = getCartSubtotal();
    if (subtotal === 0) return 0;
    const discount = getCartDiscount();
    const shipping = getShippingCost();
    const gift = getGiftWrapCost();
    return Math.max(0, subtotal - discount + shipping + gift);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Format numbers to Persian Toman string
  const formatPrice = (num) => {
    if (num === undefined || num === null) return '۰';
    return Number(num).toLocaleString('fa-IR');
  };

  // Navigation helpers
  const navigateToProduct = (productId) => {
    setSelectedProductId(productId);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (catId) => {
    setSelectedCategory(catId);
    setSearchQuery('');
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setSearchQuery('');
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToWishlist = () => {
    setCurrentView('wishlist');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToOrders = () => {
    setCurrentView('orders');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAbout = () => {
    setCurrentView('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAdmin = (tab = 'overview') => {
    if (!isAdminAuthenticated) {
      setAdminLoginModalOpen(true);
      return;
    }
    setAdminActiveTab(tab);
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogin = async (adminData) => {
    // Token is already saved by AdminLoginModal via api.setToken()
    setAdminUser(adminData);
    setIsAdminAuthenticated(true);
    setAdminLoginModalOpen(false);
    setAdminActiveTab('overview');
    setCurrentView('admin');
    // Load orders (admin-only)
    try {
      const o = await api.db.list('orders');
      if (Array.isArray(o)) setOrders(o);
    } catch (e) { /* ignore */ }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`خوش آمدید ${adminData.name || adminData.email}! 👋`, 'success');
  };

  const handleAdminLogout = async () => {
    try { await api.auth.logout(); } catch (e) { /* ignore */ }
    api.setToken(null);
    // Clear old localStorage key too
    try { localStorage.removeItem('abr_soorati_admin_auth_v3'); } catch (e) {}
    setAdminUser(null);
    setIsAdminAuthenticated(false);
    setOrders([]);  // Clear admin-only data from memory
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('با موفقیت از حساب خارج شدید.', 'info');
  };

  // Change password (used from AdminSettings)
  const changeAdminPassword = async (currentPassword, newPassword) => {
    try {
      await api.auth.changePassword(currentPassword, newPassword);
      showToast('رمز عبور با موفقیت تغییر کرد. 🔐', 'success');
      return true;
    } catch (err) {
      showToast(err.message || 'خطا در تغییر رمز', 'error');
      return false;
    }
  };

  // Backup / restore
  const exportDatabase = async () => {
    try {
      await api.backup.exportUrl();
      showToast('فایل پشتیبان دانلود شد. 📦', 'success');
    } catch (err) {
      handleApiError(err, 'خطا در دانلود فایل پشتیبان');
    }
  };

  const importDatabase = async (data) => {
    try {
      await api.backup.import(data);
      // Reload data
      const [p, c, cp, s, o] = await Promise.all([
        api.db.list('products'),
        api.db.list('categories'),
        api.db.list('coupons'),
        api.db.getSettings(),
        api.db.list('orders').catch(() => [])
      ]);
      setProducts(p); setCategories(c); setCoupons(cp);
      setStoreSettings(prev => ({ ...prev, ...s }));
      if (Array.isArray(o)) setOrders(o);
      showToast('پشتیبان با موفقیت بازیابی شد.', 'success');
    } catch (err) {
      handleApiError(err, 'خطا در بازیابی پشتیبان');
    }
  };

  const navigateToFlashDeals = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
    }
    setTimeout(() => {
      const el = document.getElementById('flash-deals-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 550, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        coupons,
        storeSettings,
        cart,
        wishlist,
        orders,
        setOrders,
        currentView,
        setCurrentView,
        adminActiveTab,
        setAdminActiveTab,
        selectedProductId,
        setSelectedProductId,
        cartDrawerOpen,
        setCartDrawerOpen,
        quickViewProduct,
        setQuickViewProduct,
        checkoutOpen,
        setCheckoutOpen,
        trackingModalOpen,
        setTrackingModalOpen,
        mobileMenuOpen,
        setMobileMenuOpen,
        contactModalOpen,
        setContactModalOpen,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        priceRange,
        setPriceRange,
        inStockOnly,
        setInStockOnly,
        selectedFabric,
        setSelectedFabric,
        giftWrap,
        setGiftWrap,
        giftNote,
        setGiftNote,
        selectedShipping,
        setSelectedShipping,
        appliedCoupon,
        toasts,
        showToast,
        removeToast,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        addCategory,
        updateCategory,
        deleteCategory,
        updateOrderStatus,
        deleteOrder,
        addCoupon,
        deleteCoupon,
        updateStoreSettings,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
        getCartSubtotal,
        getCartDiscount,
        getGiftWrapCost,
        getShippingCost,
        getCartTotal,
        getCartItemCount,
        formatPrice,
        navigateToProduct,
        navigateToCategory,
        navigateToHome,
        navigateToWishlist,
        navigateToOrders,
        navigateToAbout,
        navigateToAdmin,
        navigateToFlashDeals,
        // Admin Authentication
        isAdminAuthenticated,
        adminUser,
        adminLoginModalOpen,
        setAdminLoginModalOpen,
        handleAdminLogin,
        handleAdminLogout,
        changeAdminPassword,
        exportDatabase,
        importDatabase,
        placeOrder,
        isLoading,
        apiOnline
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
