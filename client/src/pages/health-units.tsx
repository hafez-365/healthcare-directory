import { useQuery } from '@tanstack/react-query';
import { type HealthUnit } from '@shared/schema';
import { Layout } from '@/components/ui/layout';
import { useI18n } from '@/lib/i18n';
import { MapPin, Phone, Clock } from 'lucide-react';

export default function HealthUnits() {
  const { t, language } = useI18n();

  const { data: healthUnits, isLoading, error } = useQuery<HealthUnit[]>({
    queryKey: ['/api/health-units'],
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
      <h2 className="text-3xl font-bold mb-8 text-gray-900">{t("services.health_units")}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {healthUnits?.map((unit) => (
          <div key={unit.id} className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              {language === 'ar' ? unit.name : unit.nameEn}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="text-rose-500 ml-2 h-4 w-4" />
                <span>{language === 'ar' ? unit.address : unit.addressEn}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="text-blue-600 ml-2 h-4 w-4" />
                <a href={`tel:${unit.phone}`} className="hover:text-blue-600">{unit.phone}</a>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="text-amber-600 ml-2 h-4 w-4" />
                <span>{language === 'ar' ? unit.workingHours : unit.workingHoursEn}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              {(language === 'ar' ? unit.services : unit.servicesEn).map((service, index) => (
                <span 
                  key={index}
                  className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full mr-2 mb-2 inline-block"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
