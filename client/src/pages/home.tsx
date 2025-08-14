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
      bgImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
    },
    {
      href: "/emergency",
      titleKey: "services.emergency",
      descKey: "services.emergency.desc",
      linkKey: "services.emergency.link",
      icon: Shield,
      bgImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
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
