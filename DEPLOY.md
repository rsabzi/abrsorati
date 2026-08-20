# راهنمای دیپلوی روی Netlify

## معماری

```
Frontend (React + Vite)   →   /api/*   →   Netlify Functions   →   Netlify Blobs (key-value store)
```

- **Frontend**: React SPA در پوشه‌ی `dist/`
- **Backend**: یک تابع Netlify در `netlify/functions/db.mjs` که تمام endpointهای `/api/*` را مدیریت می‌کند
- **دیتابیس**: Netlify Blobs — یک key-value store رایگان که مثل فایل JSON کار می‌کند اما persistent روی سرور Netlify است

## دیپلوی سریع (بدون CLI)

1. مخزن گیت را در Netlify متصل کنید:
   - وارد [app.netlify.com](https://app.netlify.com) شوید
   - Add new site → Import an existing project → GitHub → مخزن `abrsorati` را انتخاب کنید

2. Netlify به صورت خودکار تنظیمات را از `netlify.toml` می‌خواند:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`

3. کلیک روی **Deploy site** — تمام!

Netlify Blobs به صورت خودکار فعال است (هیچ setup اضافی نیاز نیست).

## دسترسی به پنل مدیریت

پس از دیپلوی، پنل مدیریت از چند روش قابل دسترسی است:

1. **لینک کوچک در فوتر**: پایین‌ترین قسمت صفحه، دکمه‌ی «· ورود مدیر ·»
2. **URL مستقیم**: `https://your-site.netlify.app/#admin`
3. **همبرگر منوی موبایل**: فقط اگر قبلاً login کرده باشید

### اطلاعات ورود اولیه

```
ایمیل: admin@abrsorati.ir
رمز:   Admin@2024
```

⚠️ **بلافاصله پس از اولین ورود، رمز را از پنل مدیریت → تنظیمات → تغییر رمز عبور، عوض کنید.**

## پشتیبان‌گیری

- **دانلود**: پنل مدیریت → تنظیمات → دانلود فایل پشتیبان → فایل `abrsorati-db-YYYY-MM-DD.json`
- **بازیابی**: پنل مدیریت → تنظیمات → بازیابی از فایل

## Development محلی

```bash
npm install
npm run dev
```

در حالت dev، دیتابیس در فایل `.dev-db.json` در ریشه‌ی پروژه ذخیره می‌شود (این فایل در gitignore است).
یک plugin سفارشی Vite دقیقاً همان endpointهایی که Netlify Function ارائه می‌دهد را شبیه‌سازی می‌کند.

## Endpointها

| متد | مسیر | توضیح | Auth |
|-----|------|-------|------|
| POST | `/api/auth/login` | ورود مدیر | ❌ |
| POST | `/api/auth/logout` | خروج | ✅ |
| GET  | `/api/auth/me` | اطلاعات کاربر فعلی | ✅ |
| POST | `/api/auth/change-password` | تغییر رمز عبور | ✅ |
| GET  | `/api/data/{collection}` | لیست همه (products, categories, coupons, settings, orders, users) | برای orders/users ✅ |
| GET  | `/api/data/{collection}/{id}` | گرفتن یک آیتم | مشابه بالا |
| POST | `/api/data/{collection}` | ایجاد جدید | ✅ (به‌جز `orders` که public است) |
| PUT  | `/api/data/{collection}/{id}` | ویرایش | ✅ |
| DELETE | `/api/data/{collection}/{id}` | حذف | ✅ |
| PATCH | `/api/data/{collection}` | جایگزینی کل مجموعه | ✅ |
| GET | `/api/export` | خروجی کل دیتابیس | ✅ |
| POST | `/api/import` | بازیابی از خروجی | ✅ |

## ذخیره‌سازی

فایل‌های ذخیره‌شده در Netlify Blobs:

- `products.json` — محصولات
- `categories.json` — دسته‌بندی‌ها
- `coupons.json` — کدهای تخفیف
- `orders.json` — سفارشات
- `settings.json` — تنظیمات فروشگاه
- `users.json` — کاربران ادمین (رمزها با bcrypt هش شده)
- `session:{token}` — سشن‌های فعال (خودکار پس از ۱۲ ساعت منقضی می‌شوند)

## سبد خرید و علاقه‌مندی

این دو در `localStorage` مرورگر کاربر ذخیره می‌شوند (نه در سرور)، چون مختص هر مرورگر هستند.
