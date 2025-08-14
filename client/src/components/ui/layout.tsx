import { Link, useLocation } from "wouter";
import { useI18n } from "@/lib/i18n";
import { Hospital, Phone, MapPin, Clock, Shield, Users, Stethoscope } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { t, language, toggleLanguage } = useI18n();
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "nav.home", icon: Hospital },
    { href: "/hospitals", label: "nav.hospitals", icon: Hospital },
    { href: "/health-units", label: "nav.health_units", icon: Stethoscope },
    { href: "/dialysis", label: "nav.dialysis", icon: Users },
    { href: "/emergency", label: "nav.emergency", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-rose-900 text-white shadow-lg">
        {/* Top Header with Logo and Language Toggle */}
        <div className="border-b border-rose-800">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            {/* Logo/Brand */}
            <Link href="/" className="flex items-center space-x-reverse space-x-3">
              <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center">
                <Hospital className="text-rose-900 text-lg" />
              </div>
              <div>
                <h1 className="text-lg font-bold">{t("site.title")}</h1>
                <p className="text-xs text-rose-200">{t("site.subtitle")}</p>
              </div>
            </Link>
            
            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="bg-white text-rose-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-rose-50 transition-colors"
            >
              {language === 'ar' ? 'EN' : 'عربي'}
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="container mx-auto px-4 py-4">
          <ul className="flex flex-wrap justify-center gap-6 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className={`text-white hover:text-rose-200 transition-colors pb-1 ${
                    location === item.href ? 'border-b-2 border-rose-700' : ''
                  }`}
                >
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-rose-900 text-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">{t("footer.contact")}</h3>
              <ul className="space-y-2 text-sm text-rose-100">
                <li className="flex items-center">
                  <Phone className="ml-2 h-4 w-4" />
                  <span>{t("footer.hotline")}</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="ml-2 h-4 w-4" />
                  <span>{t("footer.location")}</span>
                </li>
              </ul>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">{t("footer.quick_links")}</h3>
              <ul className="space-y-2 text-sm text-rose-100">
                {navItems.slice(1).map((item) => (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      className="hover:text-white transition-colors"
                    >
                      {t(item.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* About */}
            <div>
              <h3 className="text-lg font-bold mb-4">{t("footer.about")}</h3>
              <p className="text-sm text-rose-100 leading-relaxed">
                {t("footer.about.desc")}
              </p>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-rose-800 mt-8 pt-6 text-center">
            <p className="text-rose-200 text-sm">
              {t("footer.copyright")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
