"use client";
import { Icon } from "@iconify/react";

const features = [
  {
    icon: "mdi:school-outline",
    title: "Quality Education",
    desc: "Our courses are designed to provide high-quality education that helps students build real-world skills and secure better career opportunities.",
  },
  {
    icon: "mdi:check-decagram-outline",
    title: "Certification",
    desc: "We offer government and university-recognized certifications that add value to your resume and professional journey.",
  },
  {
    icon: "mdi:rocket-launch-outline",
    title: "Career Opportunities",
    desc: "Whether you are learning new skills or upgrading existing ones, our courses open the best career opportunities in various industries.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-5xl font-semibold">
            <span className="text-primary">WHY </span>
            <span className="text-accent">GUIDE ACADEMY?</span>
          </h2>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <article
              key={f.title}
              className="
                group relative rounded-[24px] bg-white
                border border-zinc-300 border-dashed hover:border-solid hover:border-primary/50
                px-6 pt-8 pb-12 text-center
                shadow-[0_6px_18px_rgba(0,0,0,0.06)]
                hover:shadow-[0_14px_32px_rgba(0,0,0,0.08)]
                transition-all duration-300
                animate-fade-up
              "
              style={{ animationDelay: `${i * 90}ms` }}
            >
              {/* Icon with number */}
              <div className="relative mx-auto mb-4 grid h-24 w-24 place-items-center rounded-full bg-black/[0.04]">
                <Icon
                  icon={f.icon}
                  className="text-5xl text-primary transition-transform duration-300 group-hover:-translate-y-0.5"
                />
                <span
                  className="
                    absolute -right-2 -top-2 grid h-8 w-8 place-items-center
                    rounded-full bg-primary text-white text-xs font-bold
                    shadow-[0_4px_14px_rgba(0,0,0,0.15)]
                  "
                >
                  {i + 1}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-extrabold text-black">{f.title}</h3>

              {/* Description */}
              <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">
                {f.desc}
              </p>

              {/* Arrow button */}
              <button
                type="button"
                aria-label="More info"
                className="
                  absolute left-1/2 -bottom-6 -translate-x-1/2
                  grid h-12 w-12 place-items-center rounded-full
                  bg-white text-primary
                  ring-1 ring-zinc-200
                  shadow-[0_10px_24px_rgba(0,0,0,0.12)]
                  transition-all duration-300
                  hover:bg-primary hover:text-white hover:translate-y-[-2px]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60
                "
                onClick={() => window.dispatchEvent(new CustomEvent('open-header-form'))}
              >
                <Icon icon="mdi:arrow-right" className="text-lg" />
              </button>

              {/* Soft inner ring */}
              <span className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-black/5" />
            </article>
          ))}
        </div>
      </div>

      {/* Animation */}
      <style jsx global>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fade-up .55s ease-out both; }
      `}</style>
    </section>
  );
}
