export const PRODUCTS = [
  {
    id: 'p1',
    sku: 'AS-CROP-01',
    name: 'کراپ تاپ کاپ‌دار بند ماکارونی بدون درز پاستلی',
    nameEn: 'Seamless Macaron Spaghetti Strap Ribbed Crop Top',
    category: 'crop-tops',
    categoryName: 'کراپ بند ماکارون',
    price: 185000,
    originalPrice: 235000,
    discountPercent: 21,
    rating: 4.96,
    reviewsCount: 142,
    salesCount: 890,
    inStock: true,
    stockCount: 8,
    isFlashDeal: true,
    flashDealEndHours: 6,
    isFeatured: true,
    badge: 'پرفروش‌ترین ماه',
    badgeColor: 'bg-rose-500',
    primaryImage: '/images/products/crop-macaron-1.jpg',
    gallery: [
      '/images/products/crop-macaron-1.jpg',
      '/images/products/crop-macaron-set-1.jpg',
      '/images/hero/hero-lingerie-banner.jpg'
    ],
    colors: [
      { id: 'baby-pink', name: 'صورتی پاستلی', hex: '#F9A8D4' },
      { id: 'ivory-cream', name: 'شیری صدفی', hex: '#FEF3C7' },
      { id: 'sage-mint', name: 'سبز نعنایی پاستلی', hex: '#A7F3D0' },
      { id: 'smoky-black', name: 'مشکی کربنی', hex: '#1E293B' }
    ],
    sizes: [
      { id: 'free-size', name: 'فری‌سایز کشسانی بالا (مناسب سایز ۳۴ تا ۴۲)', priceModifier: 0 },
      { id: 'plus-size', name: 'پلاس سایز (مناسب سایz ۴۲ تا ۴۸)', priceModifier: 25000 }
    ],
    shortDescription: 'کراپ تاپ پنبه‌ای کبریتی بدون درز با بندهای باریک ماکارونی، دارای پد ابری اسفنجی متحرک ضد تعریق و فرم‌دهی طبیعی.',
    description: `این کراپ تاپ ترند و پرطرفدار با تکنولوژی بافت ۳ بعدی بدون درز (Seamless) تولید شده و نهایت نرمی و راحتی را برای استفاده روزمره، زیر مانتو، خانه و باشگاه ارائه می‌دهد.

ویژگی‌های برجسته محصول:
• بندهای نازک ماکارونی الاستیک بدون رد انداختن روی شانه
• دارای پد متحرک پرسی سبک با منافذ تنفس‌پذیر ضد حساسیت
• بافت کشسان ۴ جهته با ایستایی عالی بدون شل شدن
• عدم تغییر فرم و رنگ پس از ده‌ها بار شستشو
• بسته‌بندی کادویی با عطر ملایم اسطوخودوس`,
    specs: {
      fabric: '۹۲٪ نایلون میکروفایبر تنفس‌پذیر + ۸٪ اسپندکس کشسان',
      cupType: 'پد متحرک ابری با قابلیت خروج آسان جهت شستشو',
      strapType: 'بند نازک ماکارونی با کشسانی بالا و دوخت مخفی',
      sizeFit: 'فری‌سایز استاندارد (سایز سینه ۶۵ تا ۸۵)',
      washability: 'شستشو با آب سرد ۳۰ درجه و دور ملایم'
    },
    tags: ['کراپ', 'بند_ماکارون', 'لباس_زیر', 'پاستلی', 'بدون_درز', 'کاپ_دار'],
    reviews: [
      {
        id: 'r1',
        author: 'مهسا رستمی',
        city: 'تهران',
        rating: 5,
        date: 'دیروز',
        verified: true,
        text: 'انقدر تنخورش راحته که اصلاً حس نمی‌کنی تنت هست! پدهاش خیلی فرم قشنگی میده و بندهای ماکارونیش زیر لباس پیدا نیست.',
        helpfulCount: 38
      },
      {
        id: 'r2',
        author: 'پریسا نعمتی',
        city: 'اصفهان',
        rating: 5,
        date: '۳ روز پیش',
        verified: true,
        text: 'رنگ صورتی پاستلیش از نزدیک رویاییه. بسته‌بندی خوشگل و معطر با ربان بود. حتماً رنگ‌های دیگه رو هم سفارش میدم.',
        helpfulCount: 22
      }
    ]
  },
  {
    id: 'p2',
    sku: 'AS-PANTY-02',
    name: 'پک ۳ عددی شورت بدون درز لیزری تنفس‌پذیر فاق پنبه',
    nameEn: 'Set of 3 Laser-Cut Seamless Breathable Briefs',
    category: 'panties',
    categoryName: 'شورت زنانه و فانتزی',
    price: 195000,
    originalPrice: 250000,
    discountPercent: 22,
    rating: 4.98,
    reviewsCount: 185,
    salesCount: 1240,
    inStock: true,
    stockCount: 12,
    isFlashDeal: true,
    flashDealEndHours: 8,
    isFeatured: true,
    badge: 'پرفروش‌ترین پک زیرپوش',
    badgeColor: 'bg-pink-600',
    primaryImage: '/images/products/panties-seamless-1.jpg',
    gallery: [
      '/images/products/panties-seamless-1.jpg',
      '/images/products/panties-ribbed-1.jpg',
      '/images/hero/hero-lingerie-banner.jpg'
    ],
    colors: [
      { id: 'candy-trio', name: 'پک پاستلی (صورتی، یاسی، کرمی)', hex: '#F9A8D4' },
      { id: 'nude-basic', name: 'پک کاربردی (کرم نود، مشکی، سفید)', hex: '#FDE68A' }
    ],
    sizes: [
      { id: 'm-l', name: 'سایز M/L (مناسب سایز ۳۶ تا ۴۰)', priceModifier: 0 },
      { id: 'l-xl', name: 'سایز L/XL (مناسب سایز ۴۲ تا ۴۶)', priceModifier: 15000 }
    ],
    shortDescription: 'پک ۳ عددی شورت لیزری کاملاً بدون خط دوخت (No Show) با فاق دوبل پنبه‌ای صددرصد ضد قارچ و ضد بو.',
    description: `شورت‌های لیزری بدون درز ابر صورتی، بهترین انتخاب برای پوشیدن زیر شلوارهای جذب، لگ‌های ورزشی و پیراهن‌های مجلسی هستند؛ بدون هیچ‌گونه خط دوخت یا برآمدگی روی لباس!

مزایای سلامتی و زیبایی:
• برش لیزری پیشرفته بدون برجستگی و بدون لول شدن لبه‌ها
• فاق داخلی از پنبه ۱۰۰٪ ارگانیک ضد باکتریال و آنتی‌آلرژیک
• پارچه ابریشمی بسیار خنک با تنفس‌پذیری ۲ برابر پارچه‌های معمولی
• دارای کشسانی ۳۶۰ درجه متناسب با فرم بدن`,
    specs: {
      fabric: '۸۶٪ پلی‌آمید ابریشمی الترا سافت + ۱۴٪ الاستین',
      gusset: 'فاق دوبل پنبه ۱۰۰٪ ارگانیک ضد باکتری',
      cut: 'برش لیزری بدون خط دوخت (Seamless Laser Cut)',
      pack: 'بسته ۳ عددی با رنگ‌های هماهنگ',
      washability: 'شستشوی دستی یا با کیسه مخصوص لباس زیر در ماشین'
    },
    tags: ['شورت', 'لیزری', 'فاق_پنبه', 'بدون_درز', 'لباس_زیر', 'پک_اقتصادی'],
    reviews: [
      {
        id: 'r3',
        author: 'سارا ملکی',
        city: 'تهران',
        rating: 5,
        date: '۲ روز پیش',
        verified: true,
        text: 'واقعاً زیر لگ و شلوار سفید هیچی معلوم نیست! کیفیت فاق پنبه‌ایش عالیه و پوست حساس من اصلاً اذیت نشد.',
        helpfulCount: 45
      }
    ]
  },
  {
    id: 'p3',
    sku: 'AS-SOCKS-03',
    name: 'ست ۳ جفتی جوراب مچی لبه دالبری طرح خرس تدی',
    nameEn: 'Kawaii Embroidered Teddy Bear Pastel Ankle Socks (3-Pack)',
    category: 'socks',
    categoryName: 'جوراب‌های فانتزی و مچی',
    price: 135000,
    originalPrice: 175000,
    discountPercent: 23,
    rating: 4.94,
    reviewsCount: 98,
    salesCount: 780,
    inStock: true,
    stockCount: 15,
    isFlashDeal: false,
    isFeatured: true,
    badge: 'بسیار کیوت و ترند',
    badgeColor: 'bg-amber-500',
    primaryImage: '/images/products/socks-bear-1.jpg',
    gallery: [
      '/images/products/socks-bear-1.jpg',
      '/images/products/socks-lace-1.jpg',
      '/images/hero/hero-lingerie-banner.jpg'
    ],
    colors: [
      { id: 'pastel-bear', name: 'پک رنگی پاستلی (صورتی، شیری، کاراملی)', hex: '#FDA4AF' }
    ],
    sizes: [
      { id: 'free-size', name: 'فری‌سایز زنانه و دخترانه (سایز پا ۳۵ تا ۴۱)', priceModifier: 0 }
    ],
    shortDescription: 'ست سه‌تایی جوراب نخی پنبه‌ای مچی با لبه توری چین‌دار دالبری و گلدوزی ظریف خرس تدی.',
    description: `جوراب‌های فوق‌العاده نرم و کیوت با الیاف پنبه شانه شده ترکیه که مانع از تعریق و بوی پا داخل کتانی و کفش می‌شوند. لبه‌های دالبری و گلدوزی برجسته خرس تدی، استایل پاستلی شما را بی‌نهایت جذاب می‌کند.`,
    specs: {
      fabric: '۸۰٪ پنبه ارگانیک شانه شده + ۱۵٪ پلی‌استر + ۵٪ اسپندکس',
      cuff: 'لبه چین‌دار کشبافت ملایم بدون فشار به مچ',
      embroidery: 'طرح گلدوزی متراکم و ضد پرز خرس تدی',
      season: 'چهار فصل با بافت تنفس‌پذیر',
      washability: 'شستشوی آسان بدون رنگ‌دهی'
    },
    tags: ['جوراب', 'تدی', 'مچی', 'دالبری', 'کیوت', 'پاستلی'],
    reviews: [
      {
        id: 'r4',
        author: 'آیدا شمس',
        city: 'شیراز',
        rating: 5,
        date: '۴ روز پیش',
        verified: true,
        text: 'انقدر گوگولی هستن که با کتونی سفید فوق‌العاده میشن. جنس نخش اصلاً پلاستیکی نیست و خنکه.',
        helpfulCount: 19
      }
    ]
  },
  {
    id: 'p4',
    sku: 'AS-SCRUNCHIE-04',
    name: 'ست ۳ عددی اسکرانچی ابریشم توت طبیعی ضد موخوره',
    nameEn: '100% Pure Mulberry Silk Anti-Frizz Scrunchies (Set of 3)',
    category: 'scrunchies',
    categoryName: 'کش مو و اسکرانچی',
    price: 145000,
    originalPrice: 190000,
    discountPercent: 24,
    rating: 4.99,
    reviewsCount: 116,
    salesCount: 920,
    inStock: true,
    stockCount: 10,
    isFlashDeal: true,
    flashDealEndHours: 4,
    isFeatured: true,
    badge: 'محافظ سلامت مو',
    badgeColor: 'bg-emerald-600',
    primaryImage: '/images/products/scrunchie-silk-1.jpg',
    gallery: [
      '/images/products/scrunchie-silk-1.jpg',
      '/images/products/scrunchie-bow-1.jpg',
      '/images/hero/hero-lingerie-banner.jpg'
    ],
    colors: [
      { id: 'silk-pink-trio', name: 'پک ابریشم (صورتی باربی، شامپاینی، یاسی)', hex: '#F472B6' },
      { id: 'silk-classic', name: 'پک ابریشم کلاسیک (مشکی، کرم نود، طوسی)', hex: '#D1D5DB' }
    ],
    sizes: [
      { id: 'medium-fluffy', name: 'سایز مدیوم پفکی ۲ دور پیچ', priceModifier: 0 }
    ],
    shortDescription: 'اسکرانچی با پارچه ۱۰۰٪ ابریشم طبیعی با درخشش ساتنی که مانع از شکنندگی ساقه مو، موخوره و سردرد ناشی از بستن مو می‌شود.',
    description: `اسکرانچی‌های ابریشمی ابر صورتی راز موهای ابریشمی و بدون موخوره هستند! پارچه ابریشم طبیعی مانع از اصطکاک و شکستگی تارهای مو شده و رطوبت طبیعی مو را حفظ می‌کند.`,
    specs: {
      fabric: '۱۰۰٪ ابریشم طبیعی مولبری خالص با گرید 6A',
      elastic: 'کش لاستیکی مرغوب بادوام با طول عمر بالا',
      benefits: 'جلوگیری از ایجاد خط کش، وز شدن و موخوره',
      pack: 'ست ۳ عددی با بسته‌بندی هدیه',
      washability: 'شستشوی دستی با شامپو بچه در آب سرد'
    },
    tags: ['اسکرانچی', 'کش_مو', 'ابریشم', 'ضد_موخوره', 'سلامت_مو', 'هدیه'],
    reviews: [
      {
        id: 'r5',
        author: 'نیلوفر امینی',
        city: 'کرج',
        rating: 5,
        date: '۳ روز پیش',
        verified: true,
        text: 'از وقتی از این اسکرانچی‌ها استفاده می‌کنم موهام اصلاً کشیده نمیشه و سردرد نمی‌گیرم. درخشش ابریشمش محشره.',
        helpfulCount: 31
      }
    ]
  },
  {
    id: 'p5',
    sku: 'AS-MINISCARF-05',
    name: 'مینی اسکارف ابریشم ژاکارد دور دست‌دوز طرح ابر و رز پاستلی',
    nameEn: 'Pastel Cloud & Blossom Silk Jacquard Mini Scarf (70x70)',
    category: 'mini-scarves',
    categoryName: 'مینی اسکارف و باندانا',
    price: 165000,
    originalPrice: 210000,
    discountPercent: 21,
    rating: 4.92,
    reviewsCount: 87,
    salesCount: 640,
    inStock: true,
    stockCount: 7,
    isFlashDeal: true,
    flashDealEndHours: 10,
    isFeatured: true,
    badge: 'ترند استایل دخترانه',
    badgeColor: 'bg-violet-600',
    primaryImage: '/images/products/miniscarf-silk-1.jpg',
    gallery: [
      '/images/products/miniscarf-silk-1.jpg',
      '/images/hero/hero-lingerie-banner.jpg',
      '/images/products/crop-macaron-1.jpg'
    ],
    colors: [
      { id: 'blush-jacquard', name: 'صورتی پنککی با گل‌های یاسی', hex: '#FDA4AF' },
      { id: 'cream-gold', name: 'شیری عاجی با حاشیه طلایی', hex: '#FEF3C7' },
      { id: 'baby-blue', name: 'آبی آسمانی پاستلی', hex: '#BAE6FD' }
    ],
    sizes: [
      { id: 'size-70', name: 'قواره استاندارد ۷۰ در ۷۰ سانتی‌متر', priceModifier: 0 }
    ],
    shortDescription: 'مینی اسکارف ابریشمی ترند با بافت ژاکارد برجسته، لبه‌های دست‌دوز و ایستایی عالی روی سر بدون لیز خوردن.',
    description: `مینی اسکارف‌های ابر صورتی استایل شما را در عین سادگی، فوق‌العاده شیک و اروپایی می‌کنند. بافت ژاکارد برجسته به همراه درخشش مخملی ابریشم، ترکیب بی‌نقصی را ایجاد کرده است.`,
    specs: {
      fabric: 'ابریشم توییل ژاکارد درجه یک ضد چروک',
      edge: 'دور دست‌دوز ظریف و تمیز (Hand-Rolled Hem)',
      dimensions: 'قواره ۷۰ × ۷۰ سانتی‌متر',
      styling: 'قابلیت استفاده به عنوان روسری سر، باندانا، مچ‌بند یا آویز کیف',
      washability: 'شستشوی دستی با آب خنک و اتوکشی ملایم با بخار'
    },
    tags: ['مینی_اسکارف', 'روسری', 'ابریشم', 'ژاکارد', 'باندانا', 'ترند'],
    reviews: [
      {
        id: 'r6',
        author: 'فرناز صبوری',
        city: 'تهران',
        rating: 5,
        date: '۵ روز پیش',
        verified: true,
        text: 'اصلاً روی مو لیز نمی‌خوره! قواره‌ش برای بستن پشت گردن یا زیر چانه بی‌نظیره و رنگش با کراپ ست شد.',
        helpfulCount: 26
      }
    ]
  },
  {
    id: 'p6',
    sku: 'AS-CROP-06',
    name: 'ست ۳ عددی کراپ کبریتی بند ماکارونی در ۳ رنگ پاستلی',
    nameEn: 'Trio Pack Pastel Ribbed Macaron Strap Bralettes',
    category: 'crop-tops',
    categoryName: 'کراپ بند ماکارون',
    price: 495000,
    originalPrice: 650000,
    discountPercent: 24,
    rating: 4.97,
    reviewsCount: 164,
    salesCount: 710,
    inStock: true,
    stockCount: 6,
    isFlashDeal: true,
    flashDealEndHours: 12,
    isFeatured: true,
    badge: 'پک اقتصادی محبوب',
    badgeColor: 'bg-rose-600',
    primaryImage: '/images/products/crop-macaron-set-1.jpg',
    gallery: [
      '/images/products/crop-macaron-set-1.jpg',
      '/images/products/crop-macaron-1.jpg',
      '/images/hero/hero-lingerie-banner.jpg'
    ],
    colors: [
      { id: 'macaron-trio', name: 'پک ماکارون (صورتی، شیری، نعنایی)', hex: '#FBCFE8' },
      { id: 'neutral-trio', name: 'پک خنثی (کرم، مشکی، سفید)', hex: '#E2E8F0' }
    ],
    sizes: [
      { id: 'free-size', name: 'فری‌سایز کشسانی استاندارد (۳۶ تا ۴۲)', priceModifier: 0 }
    ],
    shortDescription: 'پک اقتصادی شامل ۳ عدد کراپ تاپ کبریتی بند ماکارونی با کاپ ابری متحرک، تنخور شیک و بسته‌بندی هدیه روبانی.',
    description: `یک خرید هوشمندانه و جذاب برای تکمیل کمد لباس شما! ۳ عدد کراپ تاپ بند ماکارونی با رنگ‌های پاستلی جذاب که با هر شلوار جین و کتی هماهنگ می‌شوند.`,
    specs: {
      fabric: 'کتان پنبه کبریتی کشسان ریزبافت',
      cup: '۳ جفت پد مجزا و قابل تعویض',
      pack: 'بسته ۳ عددی در جعبه لوکس ابر صورتی',
      washability: 'شستشوی ۳۰ درجه در ماشین لباسشویی'
    },
    tags: ['کراپ', 'پک_اقتصادی', 'بند_ماکارون', 'پاستلی', 'کبریتی'],
    reviews: [
      {
        id: 'r7',
        author: 'غزاله رضوی',
        city: 'تبریز',
        rating: 5,
        date: '۲ روز پیش',
        verified: true,
        text: 'قیمت این پک ۳ تایی نسبت به تک خریدن خیلی عالیه. رنگ‌هاش دقیقاً مثل عکس زنده‌ست و جنسش فوق‌العاده‌ست.',
        helpfulCount: 29
      }
    ]
  },
  {
    id: 'p7',
    sku: 'AS-PANTY-07',
    name: 'شورت نخی ارگانیک کبریتی با لبه توری دالبری فرانسوی',
    nameEn: 'Organic Ribbed Cotton French Briefs with Scalloped Lace',
    category: 'panties',
    categoryName: 'شورت زنانه و فانتزی',
    price: 85000,
    originalPrice: 110000,
    discountPercent: 22,
    rating: 4.91,
    reviewsCount: 79,
    salesCount: 650,
    inStock: true,
    stockCount: 14,
    isFlashDeal: false,
    isFeatured: true,
    badge: 'طراحی رمانتیک',
    badgeColor: 'bg-rose-500',
    primaryImage: '/images/products/panties-ribbed-1.jpg',
    gallery: [
      '/images/products/panties-ribbed-1.jpg',
      '/images/products/panties-seamless-1.jpg',
      '/images/hero/hero-lingerie-banner.jpg'
    ],
    colors: [
      { id: 'dusty-rose', name: 'رز پودری با گیپور شیری', hex: '#FDA4AF' },
      { id: 'peach-blush', name: 'هلویی لطیف', hex: '#FED7AA' },
      { id: 'lavender-dream', name: 'یاسی آسمانی', hex: '#DDD6FE' }
    ],
    sizes: [
      { id: 'size-l', name: 'سایز L (مناسب ۳۶ تا ۴۰)', priceModifier: 0 },
      { id: 'size-xl', name: 'سایز XL (مناسب ۴۰ تا ۴۴)', priceModifier: 10000 }
    ],
    shortDescription: 'شورت فانتزی نخی کبریتی با کشسانی بسیار نرم و حاشیه توری گیپور فرانسوی که هیچ خارشی روی پوست ایجاد نمی‌کند.',
    description: `زیبایی و راحتی در کنار هم! این شورت با پنبه طبیعی و رنگ‌های گیاهی بافته شده و توری دور کمر آن با الیاف نرم ابریشمی تولید شده است.`,
    specs: {
      fabric: '۹۵٪ پنبه ارگانیک + ۵٪ الاستین',
      gusset: 'فاق دوبل پنبه‌ای آنتی‌باکتریال',
      waist: 'کش توری گیپور نرم بدون ایجاد جا روی کمر',
      washability: 'شستشوی ملایم با صابون یا مایع لباس زیر'
    },
    tags: ['شورت', 'کبریتی', 'گیپور', 'نخی', 'ضدحساسیت'],
    reviews: [
      {
        id: 'r8',
        author: 'سمیرا نوری',
        city: 'رشت',
        rating: 5,
        date: '۴ روز پیش',
        verified: true,
        text: 'توری دور کمرش اصلاً زبر نیست و خیلی لطیفه. کشسانی عالی داره.',
        helpfulCount: 14
      }
    ]
  },
  {
    id: 'p8',
    sku: 'AS-SOCKS-08',
    name: 'جوراب ساقدار توری فانتزی با پاپیون ساتن صورتی وارداتی',
    nameEn: 'Kawaii Lolita Sheer Floral Lace Ruffle Crew Socks with Satin Bow',
    category: 'socks',
    categoryName: 'جوراب‌های فانتزی و مچی',
    price: 95000,
    originalPrice: 125000,
    discountPercent: 24,
    rating: 4.95,
    reviewsCount: 92,
    salesCount: 540,
    inStock: true,
    stockCount: 11,
    isFlashDeal: false,
    isFeatured: true,
    badge: 'استایل پرنسسی و مهمانی',
    badgeColor: 'bg-fuchsia-600',
    primaryImage: '/images/products/socks-lace-1.jpg',
    gallery: [
      '/images/products/socks-lace-1.jpg',
      '/images/products/socks-bear-1.jpg',
      '/images/hero/hero-lingerie-banner.jpg'
    ],
    colors: [
      { id: 'white-pink-bow', name: 'تور سفید صدفی با پاپیون صورتی', hex: '#FDF2F8' },
      { id: 'black-pink-bow', name: 'تور مشکی ژاکارد با پاپیون صورتی', hex: '#1E293B' }
    ],
    sizes: [
      { id: 'free-size', name: 'فری‌سایز کشسانی (۳۵ تا ۴۰)', priceModifier: 0 }
    ],
    shortDescription: 'جوراب فانتزی توری با نقش گل‌های برجسته، لبه چین‌دار پروانه‌ای و پاپیون ساتن دست‌دوز پشت ساق پا.',
    description: `جوراب پرنسسی و ترند ژاپنی که استایل شما را با کفش‌های پاشنه‌دار، مری جین، کالج و کفش‌های عروسکی به اوج زیبایی می‌رساند.`,
    specs: {
      fabric: 'تور شیشه‌ای ابریشمی بسیار مقاوم و کشسان',
      heel: 'کف پا پنبه‌ای برای جلوگیری از تعریق داخل کفش',
      accent: 'پاپیون ساتن صورتی دوخته شده با دست',
      washability: 'شستشوی دستی با آب خنک'
    },
    tags: ['جوراب', 'توری', 'پاپیونی', 'فانتزی', 'پرنسسی', 'لولیتا'],
    reviews: [
      {
        id: 'r9',
        author: 'رکسانا حیدری',
        city: 'تهران',
        rating: 5,
        date: '۱ هفته پیش',
        verified: true,
        text: 'با کفش عروسکی پوشیدمش و همه تو جشن تولد تعریف کردن. خیلی باکلاس و تمیز دوخته شده.',
        helpfulCount: 21
      }
    ]
  },
  {
    id: 'p9',
    sku: 'AS-SCRUNCHIE-09',
    name: 'کش موی مخمل اعلا با پاپیون دنباله‌دار و آویز طلایی قلب',
    nameEn: 'Deluxe Pastel Velvet Ribbon Bow Hair Scrunchie with Gold Charm',
    category: 'scrunchies',
    categoryName: 'کش مو و اسکرانچی',
    price: 78000,
    originalPrice: 99000,
    discountPercent: 21,
    rating: 4.89,
    reviewsCount: 65,
    salesCount: 430,
    inStock: true,
    stockCount: 16,
    isFlashDeal: false,
    isFeatured: false,
    badge: 'اکسسوری مو خاص',
    badgeColor: 'bg-rose-500',
    primaryImage: '/images/products/scrunchie-bow-1.jpg',
    gallery: [
      '/images/products/scrunchie-bow-1.jpg',
      '/images/products/scrunchie-silk-1.jpg',
      '/images/hero/hero-lingerie-banner.jpg'
    ],
    colors: [
      { id: 'velvet-pink', name: 'مخمل صورتی تمشکی', hex: '#FB7185' },
      { id: 'velvet-burgundy', name: 'مخمل زرشکی رویایی', hex: '#9F1239' },
      { id: 'velvet-black', name: 'مخمل مشکی شب', hex: '#0F172A' }
    ],
    sizes: [
      { id: 'long-tail', name: 'پاپیون دنباله‌دار بلند (۲۰ سانتی‌متر)', priceModifier: 0 }
    ],
    shortDescription: 'کش موی مخمل لطیف وارداتی با دنباله پاپیونی آویزان و پلاک فلزی طلایی طرح قلب ضد رنگ‌رفتگی.',
    description: `برای یک استایل شیک دم‌اسبی یا موهای نیمه باز! مخمل پرتراکم و کش پرقدرت بدون کشیدن ریشه مو، موهای شما را ساعت‌ها محکم نگه می‌دارد.`,
    specs: {
      fabric: 'مخمل کره‌ای سوپر سافت',
      charm: 'پلاک قلبی استیل آبکاری شده طلایی رنگ ثابت',
      tailLength: 'دنباله پاپیونی ۲۰ سانتی‌متر',
      washability: 'غبارگیری با دستمال مرطوب'
    },
    tags: ['کش_مو', 'پاپیون', 'مخمل', 'اکسسوری_مو', 'کیوت'],
    reviews: [
      {
        id: 'r10',
        author: 'مبینا طاهری',
        city: 'اصفهان',
        rating: 5,
        date: '۶ روز پیش',
        verified: true,
        text: 'دنباله پاپیونش روی موی بلند بی‌نهایت شیک میشه. جنس مخملش خیلی باکیفیته.',
        helpfulCount: 17
      }
    ]
  },
  {
    id: 'p10',
    sku: 'AS-BOX-10',
    name: 'باکس هدیه رویایی پاستلی ابر صورتی (شامل کراپ، شورت، اسکرانچی و جوراب)',
    nameEn: 'Deluxe Abr Soorati Pastel Gift Box (Crop, Panty, Scrunchie & Socks)',
    category: 'crop-tops',
    categoryName: 'کراپ بند ماکارون',
    price: 540000,
    originalPrice: 690000,
    discountPercent: 22,
    rating: 5.0,
    reviewsCount: 128,
    salesCount: 460,
    inStock: true,
    stockCount: 5,
    isFlashDeal: true,
    flashDealEndHours: 14,
    isFeatured: true,
    badge: 'کامل‌ترین ست کادویی',
    badgeColor: 'bg-gradient-to-r from-pink-500 to-rose-600',
    primaryImage: '/images/hero/hero-lingerie-banner.jpg',
    gallery: [
      '/images/hero/hero-lingerie-banner.jpg',
      '/images/products/crop-macaron-1.jpg',
      '/images/products/panties-seamless-1.jpg'
    ],
    colors: [
      { id: 'full-pink-theme', name: 'تم صورتی پرنسسی ابر صورتی', hex: '#F472B6' },
      { id: 'full-lavender-theme', name: 'تم یاسی ابریشمی', hex: '#DDD6FE' }
    ],
    sizes: [
      { id: 'box-standard', name: 'باکس کامل ۴ تکه با هاردباکس لوکس و ربان', priceModifier: 0 }
    ],
    shortDescription: 'پک کادویی کامل شامل یک عدد کراپ تاپ بند ماکارونی، شورت لیزری، یک جفت جوراب تدی، اسکرانچی ابریشم و کارت پستال معطر.',
    description: `بهترین هدیه برای تولد، سالگرد، هدیه به خودتان یا عزیزانتان! این بسته با پوشال‌های صورتی، گل‌های معطر و ربان ساتن اختصاصی برند ابر صورتی تزئین و ارسال می‌شود.`,
    specs: {
      contents: '۱ عدد کراپ ماکارون + ۱ عدد شورت بدون درز + ۱ جفت جوراب تدی + ۱ اسکرانچی ابریشم',
      packaging: 'هاردباکس مات سخت مقاوم با چاپ طلاکوب ابر صورتی',
      fragrance: 'اسانس ملایم آرامش‌بخش اسطوخودوس فرانسه',
      giftCard: 'دارای کارت پستال دست‌نویس با متن دلخواه شما'
    },
    tags: ['باکس_هدیه', 'پک_کادویی', 'کراپ', 'شورت', 'جوراب', 'اسکرانچی', 'هاردباکس'],
    reviews: [
      {
        id: 'r11',
        author: 'فرشته انصاری',
        city: 'تهران',
        rating: 5,
        date: 'دیروز',
        verified: true,
        text: 'دوستم وقتی این کادو رو باز کرد از خوشحالی جیغ کشید! همه چیز تمیز، باکیفیت و با عطر عالی بسته‌بندی شده بود.',
        helpfulCount: 52
      }
    ]
  },
  {
    id: 'p11',
    sku: 'AS-MINISCARF-11',
    name: 'مینی اسکارف ساتن ابریشم طرح والنتینو حاشیه مشکی و صورتی',
    nameEn: 'Valentino Inspired Silk Satin Mini Scarf with Contrasting Border',
    category: 'mini-scarves',
    categoryName: 'مینی اسکارف و باندانا',
    price: 155000,
    originalPrice: 195000,
    discountPercent: 20,
    rating: 4.88,
    reviewsCount: 54,
    salesCount: 390,
    inStock: true,
    stockCount: 9,
    isFlashDeal: false,
    isFeatured: false,
    badge: 'طراحی کلاسیک لوکس',
    badgeColor: 'bg-slate-800',
    primaryImage: '/images/products/miniscarf-silk-1.jpg',
    gallery: [
      '/images/products/miniscarf-silk-1.jpg',
      '/images/hero/hero-lingerie-banner.jpg',
      '/images/products/crop-macaron-1.jpg'
    ],
    colors: [
      { id: 'pink-black-border', name: 'زمینه صورتی با کادر مشکی شیک', hex: '#F9A8D4' },
      { id: 'ivory-pink-border', name: 'زمینه شیری با کادر صورتی باربی', hex: '#FEF3C7' }
    ],
    sizes: [
      { id: 'size-70', name: 'قواره ۷۰ × ۷۰ سانتی‌متر', priceModifier: 0 }
    ],
    shortDescription: 'مینی اسکارف ساتن ابریشم با درخشش ملایم، کادر دوبل کنتراست و لبه‌های رول شده دست‌دوز.',
    description: `طراحی الهام گرفته از برندهای مطرح دنیای فشن! مناسب برای بستن روی سر، دور گردن به عنوان دستمال گردن شیک، یا تزئین بند کیف‌های دستی زنانه.`,
    specs: {
      fabric: 'ساتن سیلک ابریشمی گرم بالا بدون چروک‌پذیری',
      print: 'چاپ دیجیتال با وضوح تصویر بالا و ثبات رنگ تضمینی',
      edge: 'لبه دست‌دوز دست‌ساز',
      washability: 'شستشوی دستی با مایع لباسشویی ملایم'
    },
    tags: ['مینی_اسکارف', 'ساتن', 'ابریشم', 'لوکس', 'والنتینو'],
    reviews: [
      {
        id: 'r12',
        author: 'شیرین کمالی',
        city: 'شیراز',
        rating: 5,
        date: '۱ هفته پیش',
        verified: true,
        text: 'خیلی باکلاسه و درخشش ساتنش چشمنوازه. با کت و شلوار خیلی خوشگل ست میشه.',
        helpfulCount: 15
      }
    ]
  },
  {
    id: 'p12',
    sku: 'AS-PANTY-12',
    name: 'شورت لامبادا توری گیپور فانتزی با پاپیون و بندهای قابل تنظیم',
    nameEn: 'Romantic Floral Lace Thong with Adjustable Straps & Satin Ribbon',
    category: 'panties',
    categoryName: 'شورت زنانه و فانتزی',
    price: 89000,
    originalPrice: 115000,
    discountPercent: 22,
    rating: 4.93,
    reviewsCount: 73,
    salesCount: 510,
    inStock: true,
    stockCount: 12,
    isFlashDeal: false,
    isFeatured: false,
    badge: 'فانتزی و ظریف',
    badgeColor: 'bg-rose-600',
    primaryImage: '/images/products/panties-seamless-1.jpg',
    gallery: [
      '/images/products/panties-seamless-1.jpg',
      '/images/products/panties-ribbed-1.jpg',
      '/images/hero/hero-lingerie-banner.jpg'
    ],
    colors: [
      { id: 'baby-pink', name: 'صورتی ملایم', hex: '#FDA4AF' },
      { id: 'midnight-black', name: 'مشکی جذاب', hex: '#0F172A' },
      { id: 'scarlet-red', name: 'قرمز یاقوتی', hex: '#E11D48' }
    ],
    sizes: [
      { id: 'free-adjustable', name: 'فری‌سایز با سگک‌های تنظیم پهلو (سایز ۳۴ تا ۴۴)', priceModifier: 0 }
    ],
    shortDescription: 'شورت فانتزی گیپور گل‌دار با بندهای باریک مجهز به رگلاژ فلزی طلایی جهت تنظیم دقیق اندازه دور باسن.',
    description: `طراحی بسیار ظریف با گیپور نرم که فاق داخلی آن با پارچه نخی پنبه‌ای پوشانده شده تا سلامتی پوست حفظ شود.`,
    specs: {
      fabric: 'گیپور نرم اروپایی + بندهای الاستیک ضد حساسیت',
      gusset: 'فاق دوبل پنبه‌ای',
      adjuster: 'سگک‌های رگلاژ استیل طلایی رنگ ثابت',
      washability: 'شستشوی دستی در آب سرد'
    },
    tags: ['شورت', 'لامبادا', 'گیپور', 'فانتزی', 'رگلاژ_دار'],
    reviews: [
      {
        id: 'r13',
        author: 'الناز مرادی',
        city: 'تهران',
        rating: 5,
        date: '۳ روز پیش',
        verified: true,
        text: 'بندهای رگلاژدارش باعث میشه دقیقاً اندازه کمر خودتون بشه و اصلاً فشار نمیاره. جنس گیپورش عالیه.',
        helpfulCount: 24
      }
    ]
  }
];

export const VALID_COUPONS = [
  {
    code: 'PINKCLOUD',
    title: 'جشنواره افتتاحیه بوتیک ابر صورتی',
    discountType: 'percent',
    value: 15,
    minCart: 0,
    description: '۱۵٪ تخفیف روی کل سبد خرید'
  },
  {
    code: 'FIRSTBUY',
    title: 'هدیه اولین خرید آنلاین',
    discountType: 'fixed',
    value: 50000,
    minCart: 250000,
    description: '۵۰ هزار تومان تخفیف برای سفارش‌های بالای ۲۵۰ هزار تومان'
  },
  {
    code: 'SOORATI20',
    title: 'تخفیف ویژه خرید پک‌های کادویی و ست‌ها',
    discountType: 'percent',
    value: 20,
    minCart: 500000,
    description: '۲۰٪ تخفیف برای خریدهای بالای ۵۰۰ هزار تومان'
  },
  {
    code: 'NOROOZ',
    title: 'عیدانه ابر صورتی',
    discountType: 'percent',
    value: 10,
    minCart: 150000,
    description: '۱۰٪ تخفیف برای تمامی سفارش‌ها'
  }
];

export const SHIPPING_METHODS = [
  {
    id: 'post-express',
    name: 'پست پیشتاز سراسری (بسته‌بندی محرمانه و ضد ضربه)',
    description: 'تحویل ۲ الی ۴ روز کاری در سراسر کشور با بسته‌بندی مات بدون نمایش محتویات',
    price: 39000,
    estimatedDays: '۲ الی ۴ روز کاری',
    icon: '📦'
  },
  {
    id: 'tipax',
    name: 'تیپاکس اکسپرس هوایی / زمینی فوری',
    description: 'تحویل ۲۴ الی ۴۸ ساعته با پیامک رهگیری لحظه‌ای و بیمه کامل مرسولات',
    price: 58000,
    estimatedDays: '۱ الی ۲ روز کاری',
    icon: '⚡'
  },
  {
    id: 'courier-vip',
    name: 'پیک ویژه اختصاصی (تهران و کرج - تحویل همان‌روز)',
    description: 'تحویل سریع همان‌روز در بازه زمانی انتخابی شما با بسته‌بندی معطر روبانی',
    price: 75000,
    estimatedDays: 'امروز / هماهنگی فوری',
    icon: '🛵'
  }
];

export const GUARANTEES = [
  {
    icon: '🌸',
    title: 'فاق دوبل پنبه ۱۰۰٪ ضدحساسیت',
    desc: 'سلامت پوست شما اولویت اول ماست، تمام زیرپوش‌ها دارای فاق بهداشتی آنتی‌باکتریال هستند'
  },
  {
    icon: '📦',
    title: 'ارسال محرمانه و ضد ضربه',
    desc: 'تمامی سفارش‌ها در کارتن‌های مات بدون درج نام اقلام و به صورت کاملاً بهداشتی ارسال می‌شوند'
  },
  {
    icon: '🎀',
    title: 'بند ماکارونی و پارچه بدون درز',
    desc: 'تکنولوژی برش لیزری بدون خط دوخت با بیشترین کشسانی و لطافت روزمره'
  },
  {
    icon: '🎁',
    title: 'بسته‌بندی کادویی اختصاصی',
    desc: 'معطر به اسانس آرامش‌بخش اسطوخودوس همراه با روبان ساتن صورتی و کارت پستال'
  },
  {
    icon: '🚀',
    title: 'ارسال رایگان بالای ۶۰۰ هزار تومان',
    desc: 'ارسال فوری به تمام شهرها و روستاهای کشور با پست پیشتاز و تیپاکس'
  }
];
