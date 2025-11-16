import React from "react";
import Hero from "@/components/Home/Hero";
import Companies from "@/components/Home/Companies";
import Courses from "@/components/Home/Courses";
import Mentor from "@/components/Home/About";
import Testimonial from "@/components/Home/Testimonials";
import Newsletter from "@/components/Home/Contact";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Guide Academy | A guide to your bright future",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Companies />
      <Courses />
      <Mentor />
      <Testimonial />
      <Newsletter />
    </main>
  );
}