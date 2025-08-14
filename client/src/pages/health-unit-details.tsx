import { useQuery } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { type HealthUnit } from '@shared/schema';
import { Layout } from '@/components/ui/layout';
import { MapPin, Phone, Clock, User, CheckCircle, ArrowRight, Heart } from 'lucide-react';

export default function HealthUnitDetails() {
  const [match, params] = useRoute('/health-units/:id');
  const healthUnitId = params?.id;

  const { data: healthUnit, isLoading, error } = useQuery<HealthUnit>({
    queryKey: ['/api/health-units', healthUnitId],
    enabled: !!healthUnitId,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-900"></div>
        </div>
      </Layout>
    );
  }

  if (error || !healthUnit) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">لم يتم العثور على الوحدة الصحية</h2>
            <Link 
              to="/health-units" 
              className="text-rose-900 hover:text-rose-700 underline"
              data-testid="link-back-to-health-units"
            >
              العودة إلى قائمة الوحدات الصحية
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Back Navigation */}
      <div className="mb-6">
        <Link 
          to="/health-units"
          className="inline-flex items-center text-rose-900 hover:text-rose-700 transition-colors"
          data-testid="link-back-navigation"
        >
          <ArrowRight className="h-4 w-4 ml-2" />
          العودة إلى قائمة الوحدات الصحية
        </Link>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="relative h-64 md:h-80 bg-gradient-to-br from-green-50 to-green-100">
          <div className="w-full h-full bg-gradient-to-r from-green-100 to-green-200 flex items-center justify-center">
            <div className="text-center">
              <div className="bg-rose-900 p-4 rounded-full mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <span className="text-green-800 font-bold text-lg">صورة {healthUnit.name}</span>
            </div>
          </div>
          
          {/* Overlay with unit name */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h1 
              className="text-2xl md:text-3xl font-bold text-white mb-2"
              data-testid="text-health-unit-name"
            >
              {healthUnit.name}
            </h1>
            <div className="flex items-center text-white/90">
              <MapPin className="h-5 w-5 ml-2" />
              <span className="text-sm" data-testid="text-health-unit-address">
                {healthUnit.address}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Contact Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">معلومات التواصل</h2>
            
            {/* Phone */}
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-3 rounded-full ml-4">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">هاتف الوحدة</p>
                <a 
                  href={`tel:${healthUnit.phone}`}
                  className="text-gray-900 font-semibold hover:text-blue-600 transition-colors"
                  data-testid="link-health-unit-phone"
                >
                  {healthUnit.phone}
                </a>
              </div>
            </div>
            
            {/* Working Hours */}
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="bg-green-100 p-3 rounded-full ml-4">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">ساعات العمل</p>
                <p className="text-gray-900 font-semibold" data-testid="text-working-hours">
                  {healthUnit.workingHours}
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Column: Description and Actions */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">معلومات الوحدة الصحية</h2>
            <p 
              className="text-gray-700 leading-relaxed mb-6"
              data-testid="text-health-unit-info"
            >
              {healthUnit.name} تقدم خدمات صحية أولية في {healthUnit.city} وتعمل {healthUnit.workingHours}.
            </p>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a 
                href={`tel:${healthUnit.phone}`}
                className="bg-green-600 hover:bg-green-700 text-white text-center px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                data-testid="button-call-now"
              >
                <Phone className="h-5 w-5" />
                اتصل الآن
              </a>
              <button 
                className="bg-purple-600 hover:bg-purple-700 text-white text-center px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                data-testid="button-get-directions"
              >
                <MapPin className="h-5 w-5" />
                احصل على الاتجاهات
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">الخدمات المقدمة</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {healthUnit.services.map((service, index) => (
            <div 
              key={index}
              className="flex items-center p-4 bg-green-50 rounded-lg border border-green-100"
              data-testid={`service-item-${index}`}
            >
              <div className="bg-green-200 p-2 rounded-full ml-3">
                <CheckCircle className="h-5 w-5 text-green-800" />
              </div>
              <span className="text-gray-900 font-medium">{service}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Location Information */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">معلومات الموقع</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">العنوان والاتصال</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>العنوان: {healthUnit.address}</li>
              <li>المدينة: {healthUnit.city}</li>
              <li>رقم الهاتف: {healthUnit.phone}</li>
              <li>ساعات العمل: {healthUnit.workingHours}</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">إرشادات الزيارة</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>احضار بطاقة الهوية أو شهادة الميلاد</li>
              <li>الوصول في الوقت المحدد</li>
              <li>اتباع تعليمات الطاقم الطبي</li>
              <li>الحفاظ على النظافة والهدوء</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">معلومات إضافية</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">خدمات التطعيم</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>تطعيمات الأطفال حسب الجدول الزمني</li>
              <li>تطعيمات الكبار (الإنفلونزا، كورونا، إلخ)</li>
              <li>متابعة التطعيمات وتقديم الشهادات</li>
              <li>إرشادات ما بعد التطعيم</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">خدمات رعاية الأمومة</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>فحوصات الحمل الدورية</li>
              <li>متابعة نمو الجنين</li>
              <li>نصائح تغذوية وصحية للحوامل</li>
              <li>خدمات ما بعد الولادة</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">الموقع على الخريطة</h2>
        
        <div className="h-64 md:h-80 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="bg-rose-900 p-4 rounded-full mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <p className="text-gray-700 font-medium mb-4">موقع {healthUnit.name}</p>
              <button 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                data-testid="button-open-map"
              >
                افتح الخريطة التفاعلية
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}