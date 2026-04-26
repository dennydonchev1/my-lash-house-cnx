import { MessageCircle, Check } from "lucide-react";
import { LASH_SERVICES, LASH_ADDON, BUSINESS } from "@/lib/constants";

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="animate-on-scroll text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-rose-dark">
            Pricing
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
            Transparent <span className="italic text-plum">Pricing</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-charcoal-light">
            Prices vary by lash length and style. All sets include a
            consultation and aftercare guidance.
          </p>
        </div>

        {/* Pricing Table */}
        <div className="animate-on-scroll mx-auto mt-14 max-w-3xl overflow-hidden rounded-2xl border border-cream-dark bg-cream shadow-lg">
          {/* Header row */}
          <div className="grid grid-cols-2 bg-plum px-6 py-4 text-sm font-semibold text-white">
            <span>Style</span>
            <span className="text-right">Price (THB)</span>
          </div>

          {/* Rows */}
          {LASH_SERVICES.map((service, i) => (
            <div
              key={service.name}
              className={`grid grid-cols-2 items-center px-6 py-4 ${
                i % 2 === 0 ? "bg-cream" : "bg-white"
              } border-b border-cream-dark`}
            >
              <div>
                <span className="font-semibold">{service.name}</span>
                <span className="ml-2 text-xs text-charcoal-light">
                  {service.thai}
                </span>
              </div>
              <p className="text-right text-lg font-bold text-plum">
                ฿{service.price}
              </p>
            </div>
          ))}

          {/* Add-on row */}
          <div className="grid grid-cols-2 items-center bg-rose/10 px-6 py-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-dark">
                Add-on
              </span>
              <div>
                <span className="font-semibold">{LASH_ADDON.name}</span>
                <span className="ml-2 text-xs text-charcoal-light">
                  {LASH_ADDON.thai}
                </span>
              </div>
            </div>
            <p className="text-right text-lg font-bold text-plum">
              ฿{LASH_ADDON.price}
            </p>
          </div>
        </div>

        {/* Included with every set */}
        <div className="animate-on-scroll mx-auto mt-8 max-w-3xl">
          <p className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-charcoal-light">
            Included with Every Set
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-charcoal-light">
            {[
              "Personal consultation",
              "Custom style design",
              "100% handmade fans",
              "Aftercare guidance",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-plum" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="animate-on-scroll mt-10 text-center">
          <a
            href={BUSINESS.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-plum px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-plum-light hover:shadow-xl"
          >
            <MessageCircle className="h-5 w-5" />
            Book Your Appointment
          </a>
        </div>
      </div>
    </section>
  );
}
