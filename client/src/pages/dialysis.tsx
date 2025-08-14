import { useQuery } from '@tanstack/react-query';
import { type DialysisCenter } from '@shared/schema';
import { Layout } from '@/components/ui/layout';
import { useI18n } from '@/lib/i18n';
import { MapPin, Phone, Clock, Settings } from 'lucide-react';

export default function Dialysis() {
  const { t, language } = useI18n();

  const { data: dialysisCenters, isLoading, error } = useQuery<DialysisCenter[]>({
    queryKey: ['/api/dialysis-centers'],
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
      <h2 className="text-3xl font-bold mb-8 text-gray-900">{t("services.dialysis")}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dialysisCenters?.map((center) => (
          <div key={center.id} className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              {language === 'ar' ? center.name : center.nameEn}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="text-rose-500 ml-2 h-4 w-4" />
                <span>{language === 'ar' ? center.address : center.addressEn}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="text-blue-600 ml-2 h-4 w-4" />
                <a href={`tel:${center.phone}`} className="hover:text-blue-600">{center.phone}</a>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Settings className="text-amber-600 ml-2 h-4 w-4" />
                <span>{center.machines} {t("common.machines")} غسيل كلي</span>
              </div>
              <div className="flex items-center text-sm text-green-600">
                <Clock className="text-green-600 ml-2 h-4 w-4" />
                <span>{language === 'ar' ? center.workingHours : center.workingHoursEn}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
