import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Camera,
} from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { dict, type Lang } from "@/lib/i18n";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const contactMethodLabels = {
  en: { line: "LINE", whatsapp: "WhatsApp", phone: "Call / Text", instagram: "Instagram" },
  th: { line: "LINE", whatsapp: "WhatsApp", phone: "โทร / ข้อความ", instagram: "Instagram" },
};

export default function Location({ lang = "en" }: { lang?: Lang }) {
  const t = dict[lang].location;
  const labels = contactMethodLabels[lang];
  const contactMethods = [
    {
      icon: Camera,
      label: labels.instagram,
      value: BUSINESS.instagram,
      href: BUSINESS.instagramUrl,
      primary: true,
    },
    {
      icon: MessageCircle,
      label: labels.line,
      value: BUSINESS.line,
      href: BUSINESS.lineUrl,
    },
    {
      icon: WhatsAppIcon,
      label: labels.whatsapp,
      value: BUSINESS.whatsapp,
      href: BUSINESS.whatsappUrl,
    },
    {
      icon: Phone,
      label: labels.phone,
      value: BUSINESS.phone,
      href: `tel:${BUSINESS.phoneTel}`,
    },
  ];
  return (
    <section id="contact" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="animate-on-scroll text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-rose-dark">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
            {t.heading}
            <span className="italic text-plum">{t.headingHighlight}</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {/* Map */}
          <div className="animate-on-scroll overflow-hidden rounded-2xl shadow-lg">
            <iframe
              src={BUSINESS.mapEmbedUrl}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="My Lash House Chiang Mai Location"
              className="h-full min-h-[350px] w-full"
            />
          </div>

          {/* Contact Info */}
          <div className="animate-on-scroll-delay flex flex-col justify-center">
            {/* Address */}
            <div className="flex gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-plum" />
              <div>
                <p className="font-semibold">{t.studioLabel}</p>
                <p className="mt-1 text-sm leading-relaxed text-charcoal-light">
                  {lang === "th" ? BUSINESS.address.thai : BUSINESS.address.full}
                </p>
                <p className="mt-1 text-sm text-charcoal-light">
                  {lang === "th" ? BUSINESS.address.full : BUSINESS.address.thai}
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="mt-6 flex gap-4">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-plum" />
              <div>
                <p className="font-semibold">{t.hoursLabel}</p>
                <p className="mt-1 text-sm text-charcoal-light">
                  {lang === "th"
                    ? `เปิดทุกวัน · 10:00–19:00`
                    : `${BUSINESS.hours.days} · ${BUSINESS.hours.time}`}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-cream-dark" />

            {/* Contact Methods */}
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-charcoal-light">
              {t.bookHeading}
            </p>
            <div className="space-y-3">
              {contactMethods.map(({ icon: Icon, label, value, href, primary }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 rounded-xl border p-4 transition-all hover:shadow-md ${
                    primary
                      ? "border-plum/20 bg-plum/5 hover:bg-plum/10"
                      : "border-cream-dark bg-cream hover:border-rose/30"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${primary ? "text-plum" : "text-rose-dark"}`}
                  />
                  <div>
                    <p className="text-sm font-semibold">{label}</p>
                    <p className="text-sm text-charcoal-light">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Directions CTA */}
            <a
              href={BUSINESS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-plum transition-colors hover:text-rose-dark"
            >
              <MapPin className="h-4 w-4" />
              {t.directionsLink}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
