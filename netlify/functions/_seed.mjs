// Seed data for the first-time deploy. These are copied from src/data/*
// so the DB has content when the site launches.
// If the collections already exist in Netlify Blobs, seed data is ignored.

export const CATEGORIES_SEED = [
  { id: 'all',         name: 'همه محصولات',                icon: '✨', description: 'مشاهده تمام کالکشن', color: 'from-pink-400 to-rose-400' },
  { id: 'crop-tops',   name: 'کراپ بند ماکارون',           icon: '🎀', description: 'کراپ کاپ‌دار بندی بدون درز پاستلی', color: 'from-pink-400 to-fuchsia-500' },
  { id: 'panties',     name: 'شورت لیزری بدون درز',        icon: '🌸', description: 'شورت‌های تنفس‌پذیر با فاق پنبه', color: 'from-rose-400 to-pink-500' },
  { id: 'socks',       name: 'جوراب فانتزی مچی',           icon: '🧦', description: 'جوراب‌های پنبه‌ای طرح‌دار', color: 'from-fuchsia-400 to-purple-500' },
  { id: 'scrunchies',  name: 'کش مو ابریشمی',              icon: '🎗️', description: 'اسکرانچی توت طبیعی ضد موخوره', color: 'from-amber-400 to-pink-400' },
  { id: 'miniscarves', name: 'مینی اسکارف ترند',           icon: '🧣', description: 'مینی اسکارف ابریشم و ساتن', color: 'from-purple-400 to-fuchsia-500' },
  { id: 'accessories', name: 'اکسسوری و پک کادویی',        icon: '💝', description: 'پک‌های کادویی و اکسسوری', color: 'from-pink-500 to-rose-500' }
];

export const PRODUCTS_SEED = [
  {
    id: 'p1',
    sku: 'AS-CROP-01',
    name: 'کراپ تاپ کاپ‌دار بند ماکارونی بدون درز پاستلی',
    nameEn: 'Macaron Strap Crop Top',
    category: 'crop-tops',
    categoryName: 'کراپ بند ماکارون',
    price: 185000,
    originalPrice: 235000,
    discountPercent: 21,
    stockCount: 24,
    inStock: true,
    isFlashDeal: true,
    isFeatured: true,
    badge: 'پرفروش',
    badgeColor: 'bg-rose-500',
    rating: 4.9,
    reviewsCount: 214,
    primaryImage: '/images/products/crop-macaron-1.jpg',
    shortDescription: 'کراپ کاپ‌دار با بندهای ماکارونی نازک و پارچه بدون درز، مناسب استفاده روزمره و زیرلباس',
    fabric: 'میکروفایبر پاستلی بدون درز + کاپ ابری قابل جداشدن',
    tags: ['کراپ', 'بند ماکارون', 'بدون درز', 'پاستلی']
  },
  {
    id: 'p2',
    sku: 'AS-PAN-01',
    name: 'پک ۳ عددی شورت بدون درز لیزری تنفس‌پذیر فاق پنبه',
    nameEn: 'Seamless Laser-cut Panties (Pack of 3)',
    category: 'panties',
    categoryName: 'شورت لیزری بدون درز',
    price: 195000,
    originalPrice: 260000,
    discountPercent: 25,
    stockCount: 40,
    inStock: true,
    isFlashDeal: true,
    isFeatured: true,
    badge: 'اورجینال',
    badgeColor: 'bg-pink-500',
    rating: 4.8,
    reviewsCount: 380,
    primaryImage: '/images/products/panties-seamless-1.jpg',
    shortDescription: 'پک ۳ رنگ پاستلی شورت لیزری بدون درز با فاق پنبه ۱۰۰٪',
    fabric: 'میکروفایبر تنفس‌پذیر با فاق پنبه ارگانیک',
    tags: ['شورت', 'بدون درز', 'پک ۳ عددی', 'فاق پنبه']
  },
  {
    id: 'p3',
    sku: 'AS-SCK-01',
    name: 'جوراب فانتزی مچی طرح خرس تدی',
    nameEn: 'Teddy Bear Ankle Socks',
    category: 'socks',
    categoryName: 'جوراب فانتزی مچی',
    price: 65000,
    originalPrice: 85000,
    discountPercent: 24,
    stockCount: 60,
    inStock: true,
    isFeatured: true,
    badge: 'جدید',
    badgeColor: 'bg-fuchsia-500',
    rating: 4.7,
    reviewsCount: 156,
    primaryImage: '/images/products/socks-bear-1.jpg',
    shortDescription: 'جوراب مچی پنبه‌ای با طرح خرس تدی و رنگ‌های پاستلی',
    fabric: 'پنبه ۸۰٪ + الاستان',
    tags: ['جوراب', 'مچی', 'فانتزی', 'خرس']
  },
  {
    id: 'p4',
    sku: 'AS-SCR-01',
    name: 'ست ۳ عددی اسکرانچی ابریشم توت طبیعی ضد موخوره',
    nameEn: 'Silk Scrunchie Set (Pack of 3)',
    category: 'scrunchies',
    categoryName: 'کش مو ابریشمی',
    price: 145000,
    originalPrice: 175000,
    discountPercent: 17,
    stockCount: 35,
    inStock: true,
    isFeatured: true,
    badge: 'ابریشم خالص',
    badgeColor: 'bg-amber-500',
    rating: 4.9,
    reviewsCount: 89,
    primaryImage: '/images/products/scrunchie-silk-1.jpg',
    shortDescription: 'ست اسکرانچی ابریشم توت طبیعی — بی‌ضرر برای مو',
    fabric: 'ابریشم توت ۱۰۰٪',
    tags: ['اسکرانچی', 'کش مو', 'ابریشم']
  },
  {
    id: 'p5',
    sku: 'AS-MSC-01',
    name: 'مینی اسکارف ابریشمی طرح گل رز پاستلی',
    nameEn: 'Silky Mini Scarf',
    category: 'miniscarves',
    categoryName: 'مینی اسکارف ترند',
    price: 125000,
    originalPrice: 165000,
    discountPercent: 24,
    stockCount: 20,
    inStock: true,
    isFeatured: true,
    badge: 'ترند',
    badgeColor: 'bg-purple-500',
    rating: 4.8,
    reviewsCount: 62,
    primaryImage: '/images/products/miniscarf-silk-1.jpg',
    shortDescription: 'مینی اسکارف تزئینی گردن، مو یا کیف',
    fabric: 'ساتن ابریشمی درجه یک',
    tags: ['مینی اسکارف', 'ابریشم', 'گل رز']
  },
  {
    id: 'p6',
    sku: 'AS-SCK-02',
    name: 'جوراب توری لبه دار طرح گل ریز',
    nameEn: 'Lace Ankle Socks',
    category: 'socks',
    categoryName: 'جوراب فانتزی مچی',
    price: 75000,
    originalPrice: 95000,
    discountPercent: 21,
    stockCount: 45,
    inStock: true,
    badge: 'لطیف',
    badgeColor: 'bg-pink-400',
    rating: 4.6,
    reviewsCount: 108,
    primaryImage: '/images/products/socks-lace-1.jpg',
    shortDescription: 'جوراب توری پاستلی با لبه گل ریز — مناسب کفش عروسکی',
    fabric: 'توری نایلون نرم',
    tags: ['جوراب', 'توری', 'لبه‌دار']
  }
];

export const COUPONS_SEED = [
  {
    code: 'PINKCLOUD',
    title: 'جشنواره افتتاحیه بوتیک ابر صورتی (۱۵٪ تخفیف)',
    discountType: 'percent',
    value: 15,
    minCart: 0,
    active: true
  },
  {
    code: 'FREESHIP',
    title: 'ارسال رایگان (بدون حداقل خرید)',
    discountType: 'fixed',
    value: 45000,
    minCart: 200000,
    active: true
  }
];

export const ORDERS_SEED = [];

export const SETTINGS_SEED = {
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
  heroSubtext: 'به دنیای اختصاصی «ابر صورتی» (abrsorati.ir) خوش آمدید!',
  logoUrl: '/images/logo-icon.png',
  heroImageUrl: '/images/hero/hero-lingerie-banner.jpg'
};
