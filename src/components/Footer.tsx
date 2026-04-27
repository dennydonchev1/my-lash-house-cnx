import { Heart, Camera, Globe, MessageCircle, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { dict, NAV_LINKS_BY_LANG, type Lang } from "@/lib/i18n";

export default function Footer({ lang = "en" }: { lang?: Lang }) {
  const t = dict[lang].footer;
  const navLinks = NAV_LINKS_BY_LANG[lang];
  return (
    <footer className="bg-plum py-12 text-white sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src="/images/logo-white.png"
              alt="My Lash House"
              className="h-12 w-auto"
            />
            <p className="mt-2 text-sm text-white/70">
              {dict[lang].hero.tagline}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              {t.tagline}
            </p>
            <div className="mt-4 flex items-center gap-1 text-sm text-white/50">
              <Heart className="h-3.5 w-3.5 fill-rose text-rose" />
              {lang === "th" ? "ธุรกิจที่ผู้หญิงเป็นเจ้าของ" : "Women-owned business"}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white/40">
              {t.navHeading}
            </p>
            <div className="mt-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white/40">
              {t.connectHeading}
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href={BUSINESS.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
                LINE {BUSINESS.line}
              </a>
              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>
              <a
                href={BUSINESS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                <Camera className="h-4 w-4" />
                {BUSINESS.instagram}
              </a>
              <a
                href={BUSINESS.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                <Globe className="h-4 w-4" />
                Facebook
              </a>
              <a
                href={`tel:${BUSINESS.phoneTel}`}
                className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4" />
                {BUSINESS.phone}
              </a>
            </div>
            <p className="mt-4 text-sm text-white/50">
              {lang === "th"
                ? "เปิดทุกวัน · 10:00–19:00"
                : `${BUSINESS.hours.days} · ${BUSINESS.hours.time}`}
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-white/40">
            &copy; {new Date().getFullYear()} {BUSINESS.fullName}. {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
