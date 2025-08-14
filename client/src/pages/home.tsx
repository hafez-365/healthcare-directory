import { Link } from "wouter";
import { useI18n } from "@/lib/i18n";
import { Layout } from "@/components/ui/layout";
import { Phone, Hospital, Users, Shield, Stethoscope, ChevronRight } from "lucide-react";

export default function Home() {
  const { t } = useI18n();

  const services = [
    {
      href: "/hospitals",
      titleKey: "services.hospitals",
      descKey: "services.hospitals.desc",
      linkKey: "services.hospitals.link",
      icon: Hospital,
      bgImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
    },
    {
      href: "/health-units",
      titleKey: "services.health_units",
      descKey: "services.health_units.desc",
      linkKey: "services.health_units.link",
      icon: Stethoscope,
      bgImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
    },
    {
      href: "/dialysis",
      titleKey: "services.dialysis",
      descKey: "services.dialysis.desc",
      linkKey: "services.dialysis.link",
      icon: Users,
      bgImage: "data:image/jpeg;base64,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"
    },
    {
      href: "/emergency",
      titleKey: "services.emergency",
      descKey: "services.emergency.desc",
      linkKey: "services.emergency.link",
      icon: Shield,
      bgImage: "data:image/jpeg;base64,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"
    }
  ];

  const emergencyNumbers = [
    { phone: "123", titleKey: "emergency.ambulance", icon: "🚑" },
    { phone: "180", titleKey: "emergency.fire", icon: "🚒" },
    { phone: "122", titleKey: "emergency.police", icon: "🚔" }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="text-center mb-12">
        <div 
          className="relative h-96 rounded-2xl overflow-hidden mb-8"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=800')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-rose-900 bg-opacity-70 flex items-center justify-center">
            <div className="text-white text-center max-w-4xl px-6">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("hero.title")}</h2>
              <h3 className="text-2xl md:text-3xl mb-6 text-rose-200">{t("hero.subtitle")}</h3>
              <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                {t("hero.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="bg-red-50 border border-red-200 rounded-xl p-6 mb-12">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-red-800 mb-2">{t("emergency.title")}</h3>
          <p className="text-red-600">{t("emergency.description")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {emergencyNumbers.map((emergency) => (
            <a 
              key={emergency.phone}
              href={`tel:${emergency.phone}`} 
              className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg text-center transition-colors group"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                {emergency.icon}
              </div>
              <div className="font-bold">{t(emergency.titleKey)}</div>
              <div className="text-2xl font-mono">{emergency.phone}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="mb-12">
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">الخدمات المتاحة</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link 
              key={service.href}
              href={service.href}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
            >
              <div 
                className="h-48 rounded-t-xl overflow-hidden"
                style={{
                  backgroundImage: `url('${service.bgImage}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              ></div>
              <div className="p-6">
                <h4 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-rose-900 transition-colors">
                  {t(service.titleKey)}
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  {t(service.descKey)}
                </p>
                <div className="flex items-center text-rose-600 text-sm font-medium">
                  <span>{t(service.linkKey)}</span>
                  <ChevronRight className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
