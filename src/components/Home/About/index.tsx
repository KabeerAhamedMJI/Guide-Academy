"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { getImagePrefix } from "@/utils/util";

const About = () => {
  const openHeaderForm = React.useCallback(() => {
    const el = document.getElementById("header-form") || document.getElementById("HeaderForm");
    if (el) {
      const dlg = el as unknown as HTMLDialogElement;
      if (typeof (dlg as any).showModal === "function") (dlg as any).showModal();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.dispatchEvent(new CustomEvent("open-header-form"));
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative overflow-hidden bg-primary text-white py-14 md:py-16">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary to-primary/95" />

      {/* Light pattern overlay */}
      <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_30%_30%,white,transparent_60%)]" />

      <div className="container relative z-10 mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left — Visual Story Composition */}
        <div className="relative reveal">
          {/* Glow accent behind */}
          <div className="absolute -z-10 top-20 right-10 w-[480px] h-[480px] bg-accent/25 rounded-full blur-[120px]" />

          <div className="relative w-full max-w-[600px] mx-auto">
            {/* Large hero image */}
            <div className="relative aspect-[4/3] rounded-[36px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)]">
              <Image
                src={`${getImagePrefix()}images/about/hero.jpg`}
                alt="Guide Academy"
                fill
                className="object-cover scale-[1.05] hover:scale-[1.1] transition-transform duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                priority
              />
            </div>

            {/* Floating stat cards */}
            <div className="absolute -top-6 -left-8 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-5 shadow-[0_4px_30px_rgba(255,255,255,0.08)] hover:bg-white/15 transition-all duration-500">
              <h3 className="text-3xl font-bold text-accent">50+</h3>
              <p className="text-xs text-white/80 tracking-wide">Courses Offered</p>
            </div>

            <div className="absolute bottom-6 -right-8 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-5 shadow-[0_4px_30px_rgba(255,255,255,0.08)] hover:bg-white/15 transition-all duration-500">
              <h3 className="text-3xl font-bold text-accent">1000+</h3>
              <p className="text-xs text-white/80 tracking-wide">Students Empowered</p>
            </div>

            {/* Floating smaller image */}
            <div className="absolute -bottom-10 left-10 w-[260px] h-[170px] rounded-[24px] overflow-hidden border border-white/20 shadow-lg bg-white/10 backdrop-blur-sm hover:-translate-y-1 transition-all duration-500">
              <Image
                src={`${getImagePrefix()}images/about/hero2.png`}
                alt="Students learning"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right — Text Content */}
        <div className="reveal space-y-6">
          <h2 className="text-[2.5rem] md:text-[3rem] font-semibold leading-tight max-w-lg">
            Shaping a <span className="text-accent">Smarter Future</span> through modern education.
          </h2>

          <p className="text-[15px] leading-relaxed text-white/85 max-w-lg">
            Guide Academy is a trusted platform for online and offline learning, dedicated to helping individuals achieve self-reliance and success through quality education. Offering courses from top universities and government programs, we make studying and attending exams easy from anywhere, empowering learners to grow and build a better future without limits.
          </p>

          <div className="grid grid-cols-2 gap-5 pt-3">
            {[
              { num: "Global", label: "Access Anywhere" },
              { num: "24/7", label: "Learning Support" },
              { num: "100%", label: "Accredited" },
              { num: "∞", label: "Growth Opportunities" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl p-4 transition-all duration-300 backdrop-blur-sm"
              >
                <h4 className="text-xl font-semibold text-accent">{item.num}</h4>
                <p className="text-sm text-white/75">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="pt-6 flex gap-4">
            <button
              onClick={openHeaderForm}
              className="px-8 py-3 text-sm font-semibold text-primary bg-white rounded-full hover:bg-accent hover:text-white transition"
            >
              Enroll Now
            </button>
            <a
              href="#courses"
              className="px-8 py-3 text-sm font-semibold border border-white/40 rounded-full text-white hover:bg-white/10 transition"
            >
              Explore Courses
            </a>
          </div>
        </div>
      </div>

      {/* Reveal Animation */}
      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
};

export default About;
