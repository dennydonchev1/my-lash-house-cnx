import { Heart, Camera, Globe, MessageCircle, Phone } from "lucide-react";
import { BUSINESS, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
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
              Private Lash Studio · Chiang Mai
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Premium eyelash extensions crafted with care. 100% handmade fans
              by a certified artist with 7+ years of experience.
            </p>
            <div className="mt-4 flex items-center gap-1 text-sm text-white/50">
              <Heart className="h-3.5 w-3.5 fill-rose text-rose" />
              Women-owned business
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white/40">
              Quick Links
            </p>
            <div className="mt-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
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
              Connect
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
              {BUSINESS.hours.days} · {BUSINESS.hours.time}
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-white/40">
            &copy; {new Date().getFullYear()} {BUSINESS.fullName}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
