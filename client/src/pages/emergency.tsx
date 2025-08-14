import { useQuery } from '@tanstack/react-query';
import { type EmergencyService } from '@shared/schema';
import { Layout } from '@/components/ui/layout';
import { useI18n } from '@/lib/i18n';
import { Phone, Clock, Truck } from 'lucide-react';

export default function Emergency() {
  const { t, language } = useI18n();

  const { data: emergencyServices, isLoading, error } = useQuery<EmergencyService[]>({
    queryKey: ['/api/emergency-services'],
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
      <h2 className="text-3xl font-bold mb-8 text-gray-900">{t("services.emergency")}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emergencyServices?.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              {language === 'ar' ? service.name : service.nameEn}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <div className="text-red-500 ml-2 text-lg">
                  {service.type === 'إسعاف' ? '🚑' : service.type === 'دفاع مدني' ? '🚒' : '🚔'}
                </div>
                <span>{service.vehicles} {t("common.vehicles")}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="text-blue-600 ml-2 h-4 w-4" />
                <a href={`tel:${service.phone}`} className="hover:text-blue-600 font-bold">{service.phone}</a>
              </div>
              <div className="flex items-center text-sm text-green-600">
                <Clock className="text-green-600 ml-2 h-4 w-4" />
                <span>{service.available24h ? 'متاح 24/7' : 'ساعات محددة'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
