import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { type EmergencyService } from '@shared/schema';
import { Layout } from '@/components/ui/layout';
import { MapPin, Phone, Clock, AlertTriangle, Ambulance, Flame, Shield, Building } from 'lucide-react';

export default function EmergencyServices() {
  const [selectedFilter, setSelectedFilter] = useState<string>('الكل');

  const { data: emergencyServices, isLoading, error } = useQuery<EmergencyService[]>({
    queryKey: ['/api/emergency-services'],
  });

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'ambulance':
        return <Ambulance className="h-6 w-6 text-red-600" />;
      case 'fire':
        return <Flame className="h-6 w-6 text-orange-600" />;
      case 'police':
        return <Shield className="h-6 w-6 text-blue-600" />;
      case 'hospital':
        return <Building className="h-6 w-6 text-green-600" />;
      default:
        return <AlertTriangle className="h-6 w-6 text-gray-600" />;
    }
  };

  const getServiceColor = (type: string) => {
    switch (type) {
      case 'ambulance':
        return 'bg-red-50 border-red-200';
      case 'fire':
        return 'bg-orange-50 border-orange-200';
      case 'police':
        return 'bg-blue-50 border-blue-200';
      case 'hospital':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const filteredServices = emergencyServices?.filter(service => 
    selectedFilter === 'الكل' || service.type === selectedFilter
  ) || [];

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-900"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">حدث خطأ في تحميل البيانات</h2>
            <p className="text-gray-600">يرجى المحاولة مرة أخرى لاحقاً</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Emergency Alert Banner */}
      <section className="bg-red-600 text-white rounded-xl p-6 mb-8">
        <div className="flex items-center justify-center text-center">
          <AlertTriangle className="h-8 w-8 ml-4" />
          <div>
            <h2 className="text-2xl font-bold mb-2">في حالات الطوارئ</h2>
            <p className="text-red-100">اتصل فوراً على الأرقام التالية للحصول على المساعدة الطارئة</p>
          </div>
        </div>
      </section>

      {/* Quick Emergency Numbers */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <a 
          href="tel:123" 
          className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-xl text-center transition-colors group"
          data-testid="button-call-ambulance"
        >
          <Ambulance className="h-8 w-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="font-bold">الإسعاف</p>
          <p className="text-red-100">123</p>
        </a>
        
        <a 
          href="tel:180" 
          className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-xl text-center transition-colors group"
          data-testid="button-call-fire"
        >
          <Flame className="h-8 w-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="font-bold">الدفاع المدني</p>
          <p className="text-orange-100">180</p>
        </a>
        
        <a 
          href="tel:122" 
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl text-center transition-colors group"
          data-testid="button-call-police"
        >
          <Shield className="h-8 w-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="font-bold">شرطة النجدة</p>
          <p className="text-blue-100">122</p>
        </a>
        
        <a 
          href="tel:16000" 
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl text-center transition-colors group"
          data-testid="button-call-hotline"
        >
          <Phone className="h-8 w-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="font-bold">الخط الساخن</p>
          <p className="text-green-100">16000</p>
        </a>
      </section>

      {/* Filter Section */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Results Counter */}
          <div className="flex items-center text-sm">
            <span className="text-gray-700">إجمالي</span>
            <span className="text-rose-600 font-bold mx-2 text-lg" data-testid="emergency-services-count">
              {filteredServices.length}
            </span>
            <span className="text-gray-700">خدمة طوارئ</span>
          </div>
          
          {/* Filter Controls */}
          <div className="flex items-center gap-3">
            <span className="text-gray-700 text-sm">تصفية حسب النوع:</span>
            <select 
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md text-sm bg-white text-gray-900 focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              data-testid="filter-select"
            >
              <option value="الكل">جميع الخدمات</option>
              <option value="ambulance">الإسعاف</option>
              <option value="fire">الدفاع المدني</option>
              <option value="police">الشرطة</option>
              <option value="hospital">المستشفيات</option>
            </select>
          </div>
        </div>
      </section>

      {/* Emergency Services List */}
      <section className="space-y-6">
        {filteredServices.map((service) => (
          <div 
            key={service.id} 
            className={`bg-white rounded-xl shadow-md p-6 border-2 ${getServiceColor(service.type)} hover:shadow-lg transition-shadow duration-300`}
            data-testid={`card-emergency-service-${service.id}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Service Info */}
              <div className="lg:col-span-2">
                <div className="flex items-center mb-4">
                  <div className="bg-white p-3 rounded-full shadow-md ml-4">
                    {getServiceIcon(service.type)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {service.type === 'ambulance' && 'خدمات الإسعاف'}
                      {service.type === 'fire' && 'خدمات الإطفاء والإنقاذ'}
                      {service.type === 'police' && 'خدمات الشرطة'}
                      {service.type === 'hospital' && 'خدمات المستشفى'}
                    </p>
                  </div>
                </div>

                {/* City */}
                <div className="flex items-start mb-3">
                  <MapPin className="h-5 w-5 text-rose-500 mt-0.5 ml-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">
                    المدينة: {service.city}
                  </span>
                </div>

                {/* Availability */}
                <div className="flex items-center mb-3">
                  <Clock className="h-5 w-5 text-green-600 ml-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">
                    {service.available24h === 1 ? 'متاح 24/7' : 'متاح خلال ساعات العمل'}
                  </span>
                </div>

                {/* Vehicles */}
                {service.vehicles && (
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-600 ml-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">
                      عدد المركبات: {service.vehicles}
                    </span>
                  </div>
                )}
              </div>

              {/* Emergency Contact */}
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <h4 className="text-lg font-bold text-gray-900 mb-4">للتواصل الفوري</h4>
                
                <a 
                  href={`tel:${service.phone}`}
                  className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 px-4 rounded-lg font-bold text-lg mb-3 transition-colors"
                  data-testid={`button-emergency-call-${service.id}`}
                >
                  <Phone className="h-5 w-5 inline ml-2" />
                  {service.phone}
                </a>

                <p className="text-xs text-gray-600">
                  اضغط للاتصال الفوري
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Emergency Tips */}
      <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mt-8">
        <h2 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
          <AlertTriangle className="h-6 w-6 ml-2" />
          نصائح مهمة في حالات الطوارئ
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-bold text-yellow-800 mb-2">قبل الاتصال:</h3>
            <ul className="list-disc list-inside text-yellow-700 space-y-1">
              <li>حافظ على هدوئك</li>
              <li>تأكد من أنك في مكان آمن</li>
              <li>اجمع المعلومات الضرورية</li>
              <li>حدد موقعك بدقة</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-yellow-800 mb-2">أثناء المكالمة:</h3>
            <ul className="list-disc list-inside text-yellow-700 space-y-1">
              <li>اذكر نوع الطارئة بوضوح</li>
              <li>قدم الموقع المحدد</li>
              <li>صف الحالة باختصار</li>
              <li>لا تقفل الخط حتى يطلب منك</li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}