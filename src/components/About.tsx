import { Award, Heart, Shield, Sparkles } from "lucide-react";

const highlights = [
  { icon: Award, label: "Certified Artist" },
  { icon: Sparkles, label: "7+ Years Experience" },
  { icon: Heart, label: "100% Handmade Fans" },
  { icon: Shield, label: "Women-Owned Studio" },
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="animate-on-scroll text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-rose-dark">
              About the Artist
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
              Your Lashes,{" "}
              <span className="italic text-plum">Handcrafted</span>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal-light sm:text-lg">
              <p>
                Welcome to My Lash House — a private lash studio nestled in San
                Kamphaeng, Chiang Mai. Here, every set of lashes is a one-on-one
                experience crafted just for you.
              </p>
              <p>
                With over 7 years of experience and professional certification,
                I specialize in 100% handmade fans — no premade shortcuts. Each
                fan is crafted in real-time during your appointment, ensuring a
                perfectly customized look that suits your eye shape, lifestyle,
                and personality.
              </p>
              <p>
                Whether you want a subtle natural enhancement or dramatic mega
                volume, my studio is your space to relax, recharge, and leave
                feeling your absolute best.
              </p>
            </div>

            {/* Highlight badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {highlights.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl bg-cream-dark/50 px-4 py-3"
                >
                  <Icon className="h-5 w-5 shrink-0 text-plum" />
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
