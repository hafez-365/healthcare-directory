import { useQuery } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { type DialysisCenter } from '@shared/schema';
import { Layout } from '@/components/ui/layout';
import { MapPin, Phone, Clock, CheckCircle, ArrowRight, Activity, Settings } from 'lucide-react';

export default function DialysisCenterDetails() {
  const [match, params] = useRoute('/dialysis-centers/:id');
  const dialysisCenterId = params?.id;

  const { data: dialysisCenter, isLoading, error } = useQuery<DialysisCenter>({
    queryKey: ['/api/dialysis-centers', dialysisCenterId],
    enabled: !!dialysisCenterId,
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

  if (error || !dialysisCenter) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">لم يتم العثور على مركز غسيل الكلى</h2>
            <Link 
              to="/dialysis-centers" 
              className="text-rose-900 hover:text-rose-700 underline"
              data-testid="link-back-to-dialysis-centers"
            >
              العودة إلى قائمة مراكز غسيل الكلى
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
          to="/dialysis-centers"
          className="inline-flex items-center text-rose-900 hover:text-rose-700 transition-colors"
          data-testid="link-back-navigation"
        >
          <ArrowRight className="h-4 w-4 ml-2" />
          العودة إلى قائمة مراكز غسيل الكلى
        </Link>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="relative h-64 md:h-80 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="w-full h-full bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
            <div className="text-center">
              <div className="bg-rose-900 p-4 rounded-full mx-auto mb-4">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <span className="text-blue-800 font-bold text-lg">صورة {dialysisCenter.name}</span>
            </div>
          </div>
          
          {/* Overlay with center name */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h1 
              className="text-2xl md:text-3xl font-bold text-white mb-2"
              data-testid="text-dialysis-center-name"
            >
              {dialysisCenter.name}
            </h1>
            <div className="flex items-center text-white/90">
              <MapPin className="h-5 w-5 ml-2" />
              <span className="text-sm" data-testid="text-dialysis-center-address">
                {dialysisCenter.address}
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
                <p className="text-sm text-gray-600 font-medium">هاتف المركز</p>
                <a 
                  href={`tel:${dialysisCenter.phone}`}
                  className="text-gray-900 font-semibold hover:text-blue-600 transition-colors"
                  data-testid="link-dialysis-center-phone"
                >
                  {dialysisCenter.phone}
                </a>
              </div>
            </div>
            
            {/* Machines */}
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="bg-purple-100 p-3 rounded-full ml-4">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">عدد الأجهزة</p>
                <p className="text-gray-900 font-semibold" data-testid="text-machines">
                  {dialysisCenter.machines}
                </p>
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
                  {dialysisCenter.workingHours}
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Column: Description and Actions */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">معلومات المركز</h2>
            <p 
              className="text-gray-700 leading-relaxed mb-6"
              data-testid="text-dialysis-center-info"
            >
              مركز {dialysisCenter.name} يوفر خدمات الغسيل الكلوي في {dialysisCenter.city} بسعة {dialysisCenter.machines} جهاز.
            </p>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a 
                href={`tel:${dialysisCenter.phone}`}
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

      {/* Center Information */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">معلومات المركز التفصيلية</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">العنوان والاتصال</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>العنوان: {dialysisCenter.address}</li>
              <li>المدينة: {dialysisCenter.city}</li>
              <li>رقم الهاتف: {dialysisCenter.phone}</li>
              <li>ساعات العمل: {dialysisCenter.workingHours}</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">معلومات الخدمة</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>عدد أجهزة الغسيل الكلوي: {dialysisCenter.machines}</li>
              <li>خدمات الغسيل الكلوي المتخصصة</li>
              <li>متابعة طبية مستمرة</li>
              <li>رعاية طبية متكاملة</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Important Information */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">معلومات مهمة للمرضى</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">قبل جلسة غسيل الكلى</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>تناول وجبة خفيفة قبل الجلسة</li>
              <li>أحضر جميع الأدوية الخاصة بك</li>
              <li>البس ملابس مريحة بأكمام قصيرة</li>
              <li>اشرب كمية معتدلة من الماء</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">بعد جلسة غسيل الكلى</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>استرح لمدة 15-30 دقيقة</li>
              <li>اشرب السوائل تدريجياً</li>
              <li>تجنب الأنشطة المجهدة</li>
              <li>راقب موقع الوصلة الوريدية</li>
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
              <p className="text-gray-700 font-medium mb-4">موقع {dialysisCenter.name}</p>
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