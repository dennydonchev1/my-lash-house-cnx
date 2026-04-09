import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Camera,
} from "lucide-react";
import { BUSINESS } from "@/lib/constants";

const contactMethods = [
  {
    icon: MessageCircle,
    label: "LINE",
    value: BUSINESS.line,
    href: BUSINESS.lineUrl,
    primary: true,
  },
  {
    icon: Phone,
    label: "Call / Text",
    value: BUSINESS.phone,
    href: `tel:${BUSINESS.phoneTel}`,
  },
  {
    icon: Camera,
    label: "Instagram",
    value: BUSINESS.instagram,
    href: BUSINESS.instagramUrl,
  },
];

export default function Location() {
  return (
    <section id="contact" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="animate-on-scroll text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-rose-dark">
            Visit Us
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
            Find <span className="italic text-plum">My Lash House</span>
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
                <p className="font-semibold">Studio Location</p>
                <p className="mt-1 text-sm leading-relaxed text-charcoal-light">
                  {BUSINESS.address.full}
                </p>
                <p className="mt-1 text-sm text-charcoal-light">
                  {BUSINESS.address.thai}
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="mt-6 flex gap-4">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-plum" />
              <div>
                <p className="font-semibold">Hours</p>
                <p className="mt-1 text-sm text-charcoal-light">
                  {BUSINESS.hours.days} · {BUSINESS.hours.time}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-cream-dark" />

            {/* Contact Methods */}
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-charcoal-light">
              Book Your Appointment
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
              Get Directions on Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
