"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
export const getImagePrefix = () => "/";


type CourseItem = {
  heading: string;
  name: string;
  img: string;
  students: number;
};

const Courses = () => {
  const courses: CourseItem[] = [
    { heading: "Montessori TTC", name: "Course Duration: 10 Months.", img: "team1.jpg", students: 180 },
    { heading: "Pre-Primary TTC", name: "Course Duration: 10 Months.", img: "team2.jpg", students: 165 },
    { heading: "Arabic TTC", name: "Course Duration: 10 Months.", img: "team20.jpg", students: 140 },
    { heading: "Hindi TTC", name: "Course Duration: 1 Year.", img: "team17.jpg", students: 120 },
    { heading: "IT Primary Teacher", name: "Course Duration: 1 Year.", img: "team18.jpg", students: 95 },
    { heading: "Hospital Administration", name: "Course Duration: 1 Year.", img: "team19.jpg", students: 110 },
    { heading: "Diploma in Fashion Designing", name: "Course Duration: 6 Months.", img: "team3.jpg", students: 150 },
    { heading: "Diploma in Beautician", name: "Course Duration: 6 & 3 Months.", img: "team4.jpg", students: 132 },
    { heading: "Pharmacy Sales Assistant", name: "Course Duration: 8 Months.", img: "team5.jpg", students: 88 },
    { heading: "Accountant", name: "Course Duration: 2 Months.", img: "team6.jpg", students: 76 },
    { heading: "Degree", name: "Course Duration: 1 & 3 Years.", img: "team7.jpg", students: 212 },
    { heading: "PG", name: "Course Duration: 6 Months & 2 Years.", img: "team8.jpg", students: 134 },
    { heading: "SSLC (NIOS)", name: "Course Duration: 6 Months.", img: "team9.jpg", students: 98 },
    { heading: "Plus Two (NIOS)", name: "Course Duration: 6 Months.", img: "team10.jpg", students: 102 },
    { heading: "Spoken English", name: "Course Duration: 2 Months.", img: "team12.jpg", students: 240 },
    { heading: "Happy Kids", name: "Course Duration: 1 Month.", img: "team13.jpg", students: 65 },
    { heading: "Bridal Makeup", name: "Course Duration: 3 Months.", img: "team14.jpg", students: 118 },
    { heading: "Diploma in Acupuncture", name: "Course Duration: 1 Year.", img: "team15.jpg", students: 52 },
    { heading: "Stitching Course", name: "Course Duration: 1 Month.", img: "team16.jpg", students: 90 },
  ];

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    speed: 600,
    cssEase: "ease-in-out",
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

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

  return (
    <section id="courses" className="py-12">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        {/* Section Header */}
        <div className="sm:flex justify-between items-center mb-16">
          <h2 className="text-primary text-4xl lg:text-5xl font-semibold mb-5 sm:mb-0">
            Featured <span className="text-accent">Courses</span>
          </h2>
          <Link
            href={"/"}
            className="text-primary text-lg font-medium hover:tracking-widest duration-500"
          >
            Explore courses&nbsp;&gt;&nbsp;
          </Link>
        </div>

        {/* Slider */}
        <Slider {...settings}>
          {courses.map((items, i) => (
            <div key={i}>
              <div
                className="
                  group bg-white m-3 mb-10 px-3 pt-3 pb-8 rounded-3xl
                  h-full flex flex-col
                  shadow-[0_3px_10px_rgba(0,0,0,0.07)]
                  hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)]
                  transition-all duration-300 hover:-translate-y-2
                "
              >
                {/* Image */}
                <div className="relative rounded-3xl overflow-hidden">
                  <div className="w-full h-[262px]">
                    <Image
                      src={`${getImagePrefix()}images/courses/${items.img}`}
                      alt={items.heading}
                      width={389}
                      height={262}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      priority={i < 3}
                    />
                  </div>

                  {/* Bottom white curve */}
                  <svg
                    className="pointer-events-none absolute bottom-0 right-0 w-[78%] h-[28%]"
                    viewBox="0 0 100 50"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path d="M100 0 L100 50 L0 50 C58 44 80 26 100 0 Z" fill="#ffffff" />
                  </svg>

                  {/* ENROLL NOW button (Rectangular) */}
                  <button
                    onClick={openHeaderForm}
                    aria-label="Enroll now"
                    className="
                      absolute right-5 bottom-4 
                      bg-primary text-white font-semibold text-sm
                      px-6 py-2.5 rounded-xl shadow-md
                      hover:bg-secondary hover:shadow-lg
                      active:scale-[0.97]
                      transition-all duration-300
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/60
                      flex items-center gap-2
                    "
                  >
                    <Icon icon="mdi:book-open-page-variant-outline" className="text-lg text-accent" />
                    ENROLL NOW
                  </button>
                </div>

                {/* Card Content */}
                <div className="px-3 pt-6 flex-1 flex flex-col">
                  <h3
                    className="text-2xl font-bold text-black line-clamp-2 min-h-[64px]"
                    title={items.heading}
                  >
                    {items.heading}
                  </h3>

                  <p
                    className="text-base font-normal pt-3 text-black/70 truncate"
                    title={items.name}
                  >
                    {items.name}
                  </p>

                  {/* Course Info Chips */}
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-sm text-black/75">
                      <Icon icon="solar:clock-circle-linear" className="text-primary text-lg" />
                      {items.name.replace("Course Duration: ", "")}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1.5 text-sm font-medium">
                      <Icon icon="solar:users-group-rounded-linear" className="text-base" />
                      {items.students} students
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Courses;
