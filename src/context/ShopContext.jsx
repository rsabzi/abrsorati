import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS, VALID_COUPONS as INITIAL_COUPONS, SHIPPING_METHODS } from '../data/products';
import { CATEGORIES as INITIAL_CATEGORIES } from '../data/categories';

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
      return saved ? JSON.parse(saved) : {
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
        logoUrl: '/images/logo.png',
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

  // Admin Authentication
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      const saved = localStorage.getItem('abr_soorati_admin_auth_v3');
      if (saved) {
        const auth = JSON.parse(saved);
        // Session expires after 12 hours
        if (Date.now() - auth.timestamp < 12 * 60 * 60 * 1000) {
          return true;
        }
        localStorage.removeItem('abr_soorati_admin_auth_v3');
      }
      return false;
    } catch (e) {
      return false;
    }
  });
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('abr_soorati_admin_auth_v3');
      if (saved) {
        const auth = JSON.parse(saved);
        if (Date.now() - auth.timestamp < 12 * 60 * 60 * 1000) {
          return auth.user;
        }
      }
      return null;
    } catch (e) {
      return null;
    }
  });

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

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('abr_soorati_products_v3', JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('abr_soorati_categories_v3', JSON.stringify(categories));
    } catch (e) {}
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('abr_soorati_coupons_v3', JSON.stringify(coupons));
    } catch (e) {}
  }, [coupons]);

  useEffect(() => {
    try {
      localStorage.setItem('abr_soorati_settings_v3', JSON.stringify(storeSettings));
    } catch (e) {}
  }, [storeSettings]);

  useEffect(() => {
    try {
      localStorage.setItem('abr_soorati_cart_v3', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('abr_soorati_wishlist_v3', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('abr_soorati_orders_v3', JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

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
  const addProduct = (newProd) => {
    const id = 'p' + (Date.now() % 100000);
    const sku = 'AS-' + (newProd.category?.toUpperCase() || 'PROD') + '-' + Math.floor(10 + Math.random() * 90);
    const fullProd = {
      ...newProd,
      id,
      sku,
      rating: newProd.rating || 5.0,
      reviewsCount: newProd.reviewsCount || 0,
      salesCount: newProd.salesCount || 0,
      inStock: newProd.inStock !== false,
      gallery: newProd.gallery?.length ? newProd.gallery : [newProd.primaryImage],
      reviews: []
    };
    setProducts(prev => [fullProd, ...prev]);
    showToast(`محصول جدید «${fullProd.name}» با موفقیت افزوده شد! ✨`, 'success');
    return fullProd;
  };

  const updateProduct = (id, updatedData) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
    showToast(`اطلاعات محصول با موفقیت به‌روزرسانی شد. ✓`, 'success');
  };

  const deleteProduct = (id) => {
    const prod = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    // Also remove from cart and wishlist if present
    setCart(prev => prev.filter(item => item.id !== id));
    setWishlist(prev => prev.filter(wId => wId !== id));
    showToast(`محصول «${prod?.name || id}» حذف شد.`, 'info');
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setCoupons(INITIAL_COUPONS);
    showToast('تمامی محصولات و دسته‌بندی‌ها به حالت پیش‌فرض اولیه بازگردانده شدند.', 'info');
  };

  // --- ADMIN CATEGORY CRUD OPERATIONS ---
  const addCategory = (cat) => {
    const id = cat.id || 'cat-' + Date.now();
    const fullCat = { ...cat, id, count: cat.count || 0 };
    setCategories(prev => [...prev, fullCat]);
    showToast(`دسته‌بندی «${fullCat.name}» افزوده شد.`, 'success');
  };

  const updateCategory = (id, updatedData) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
    showToast(`دسته‌بندی با موفقیت ویرایش شد.`, 'success');
  };

  const deleteCategory = (id) => {
    if (id === 'all') {
      showToast('دسته‌بندی پیش‌فرض قابل حذف نیست.', 'error');
      return;
    }
    setCategories(prev => prev.filter(c => c.id !== id));
    showToast('دسته‌بندی با موفقیت حذف شد.', 'info');
  };

  // --- ADMIN ORDER MANAGEMENT ---
  const updateOrderStatus = (orderId, newStatus) => {
    const statusMap = {
      'pending': 'در انتظار بررسی',
      'processing': 'در حال بسته‌بندی معطر',
      'shipped': 'تحویل به اداره پست / در مسیر ارسال',
      'delivered': 'تحویل داده شده درب منزل',
      'cancelled': 'لغو شده / عودت وجه'
    };

    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: newStatus,
          statusLabel: statusMap[newStatus] || newStatus
        };
      }
      return order;
    }));
    showToast(`وضعیت سفارش ${orderId} به «${statusMap[newStatus] || newStatus}» تغییر یافت.`, 'success');
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
    showToast(`سفارش ${orderId} از سوابق حذف شد.`, 'info');
  };

  // --- ADMIN COUPON MANAGEMENT ---
  const addCoupon = (coupon) => {
    const code = coupon.code.trim().toUpperCase();
    if (coupons.some(c => c.code === code)) {
      showToast('این کد تخفیف از قبل وجود دارد.', 'error');
      return false;
    }
    setCoupons(prev => [...prev, { ...coupon, code }]);
    showToast(`کد تخفیف ${code} ایجاد شد.`, 'success');
    return true;
  };

  const deleteCoupon = (code) => {
    setCoupons(prev => prev.filter(c => c.code !== code));
    showToast(`کد تخفیف ${code} حذف شد.`, 'info');
  };

  // --- ADMIN SETTINGS UPDATE ---
  const updateStoreSettings = (newSettings) => {
    setStoreSettings(prev => ({ ...prev, ...newSettings }));
    showToast('تنظیمات و متون فروشگاه با موفقیت ذخیره شدند! 🌸', 'success');
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

  const handleAdminLogin = (adminData) => {
    const authData = {
      user: adminData,
      timestamp: Date.now()
    };
    localStorage.setItem('abr_soorati_admin_auth_v3', JSON.stringify(authData));
    setAdminUser(adminData);
    setIsAdminAuthenticated(true);
    setAdminLoginModalOpen(false);
    setAdminActiveTab('overview');
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`خوش آمدید ${adminData.email}! 👋`, 'success');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('abr_soorati_admin_auth_v3');
    setAdminUser(null);
    setIsAdminAuthenticated(false);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('با موفقیت از حساب خارج شدید.', 'info');
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
        handleAdminLogout
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
