# دليل المؤسسات الصحية - محافظة البحيرة

دليل إلكتروني شامل للمؤسسات الصحية في محافظة البحيرة مع دعم ثنائي اللغة (العربية/الإنجليزية) ووظائف البحث والفلترة.

## المتطلبات المسبقة

- Node.js 18 أو أحدث
- npm أو yarn
- PostgreSQL (للإنتاج) أو استخدام قاعدة البيانات في الذاكرة للتطوير

## التثبيت والتشغيل المحلي

### 1. تحميل المشروع
```bash
# تحميل المشروع من GitHub أو استخراج ملف ZIP
git clone <repository-url>
cd healthcare-directory

# أو استخراج ملف ZIP
unzip healthcare-directory.zip
cd healthcare-directory
```

### 2. تثبيت المكتبات المطلوبة
```bash
# تثبيت جميع المكتبات
npm install

# في حالة مواجهة مشاكل، جرب:
npm install --legacy-peer-deps

# أو استخدم yarn
yarn install
```

### 3. إعداد متغيرات البيئة (اختياري للتطوير)
```bash
# انشاء ملف .env في المجلد الرئيسي
touch .env

# إضافة متغيرات البيئة للإنتاج (اختياري)
echo "DATABASE_URL=your_postgresql_connection_string" >> .env
echo "NODE_ENV=production" >> .env
```

### 4. تشغيل المشروع محلياً
```bash
# تشغيل الخادم والواجهة الأمامية
npm run dev

# أو
yarn dev
```

المشروع سيعمل على: http://localhost:5000

## هيكل المشروع

```
healthcare-directory/
├── client/                 # الواجهة الأمامية (React + TypeScript)
│   ├── src/
│   │   ├── components/     # مكونات UI
│   │   ├── pages/         # صفحات التطبيق
│   │   ├── lib/           # مكتبات مساعدة
│   │   └── hooks/         # React Hooks
│   └── index.html
├── server/                # الخادم الخلفي (Express.js)
│   ├── index.ts          # نقطة البداية
│   ├── routes.ts         # مسارات API
│   ├── storage.ts        # طبقة تخزين البيانات
│   └── vite.ts           # إعدادات Vite
├── shared/               # أنواع البيانات المشتركة
│   └── schema.ts
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## رفع المشروع على Vercel

### الطريقة الأولى: من خلال GitHub

1. **رفع المشروع على GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **ربط Vercel بـ GitHub:**
   - اذهب إلى [vercel.com](https://vercel.com)
   - سجل دخول أو أنشئ حساب جديد
   - اختر "New Project"
   - اختر repository من GitHub
   - اختر إعدادات النشر

3. **إعدادات Vercel:**
```
Framework Preset: Other
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### الطريقة الثانية: باستخدام Vercel CLI

1. **تثبيت Vercel CLI:**
```bash
npm i -g vercel
```

2. **نشر المشروع:**
```bash
vercel

# اتبع التعليمات:
# - اختر scope (الفريق أو الحساب الشخصي)
# - اربط مع مشروع موجود أو أنشئ جديد
# - اختر الإعدادات المناسبة
```

### إعداد متغيرات البيئة في Vercel

1. اذهب إلى dashboard المشروع في Vercel
2. اختر "Settings" > "Environment Variables"
3. أضف المتغيرات التالية:
```
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=production
```

## إعداد قاعدة البيانات

### للإنتاج (PostgreSQL):
```bash
# تثبيت PostgreSQL محلياً أو استخدام خدمة سحابية مثل:
# - Neon Database
# - Supabase
# - PlanetScale
# - Railway

# تطبيق migrations
npm run db:push
```

### للتطوير (ذاكرة):
المشروع يستخدم تخزين في الذاكرة افتراضياً للتطوير، لا حاجة لإعداد قاعدة بيانات.

## الأوامر المتاحة

```bash
# تشغيل التطوير
npm run dev

# بناء للإنتاج
npm run build

# معاينة البناء
npm run preview

# تطبيق تغييرات قاعدة البيانات
npm run db:push

# إنشاء migration جديد
npm run db:generate
```

## استكشاف الأخطاء

### مشكلة: `Module not found`
```bash
# حذف node_modules وإعادة التثبيت
rm -rf node_modules package-lock.json
npm install
```

### مشكلة: Port already in use
```bash
# تغيير البورت في package.json أو قتل العملية
lsof -ti:5000 | xargs kill -9
```

### مشكلة: Build fails
```bash
# تشغيل TypeScript check
npx tsc --noEmit

# تشغيل ESLint
npx eslint . --ext .ts,.tsx
```

## المساهمة

1. Fork المشروع
2. أنشئ branch جديد (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push للـ branch (`git push origin feature/AmazingFeature`)
5. افتح Pull Request

## المكتبات المستخدمة

### Frontend:
- React 18 + TypeScript
- Vite (أداة البناء)
- Tailwind CSS + shadcn/ui
- TanStack Query (إدارة البيانات)
- Wouter (التنقل)

### Backend:
- Express.js + TypeScript
- Drizzle ORM
- Zod (التحقق من البيانات)

### Database:
- PostgreSQL (الإنتاج)
- In-memory storage (التطوير)

## الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف LICENSE للتفاصيل.