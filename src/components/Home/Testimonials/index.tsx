"use client";

import Slider from "react-slick";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
export const getImagePrefix = () => "/";
const Testimonial = () => {
  const settings = {
    dots: true,
    dotsClass: "slick-dots",
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 800, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const testimonials = [
    {
      name: "Athira M.",
      profession: "MTTC Student",
      comment:
        "Teachers here explain things simply and are always ready to help. I enjoyed the classes.",
      imgSrc: "/images/testimonial/user3.png",
      gender: "female",
    },
    {
      name: "Hasna",
      profession: "Arabic TTC Student",
      comment:
        "Good practical classes and friendly staff. I learned useful skills and felt supported throughout.",
      imgSrc: "/images/testimonial/user2.png",
      gender: "female",
    },
    {
      name: "Shabeer Ali",
      profession: "BA Psychology Student",
      comment:
        "Nice course, helpful mentors and real projects. I feel more confident applying for jobs now.",
      imgSrc: "/images/testimonial/user1.png",
      gender: "male",
    },
    {
      name: "Neha",
      profession: "Counselling Psychology Student",
      comment:
        "The sessions were very interactive. Teachers are patient and explain concepts clearly with real-life examples.",
      imgSrc: "/images/testimonial/user4.png",
      gender: "female",
    },
    {
      name: "Faris Rahman",
      profession: "Hospital Administration Student",
      comment:
        "The course gave me a clear idea about hospital management. The faculty and support team were really good.",
      imgSrc: "/images/testimonial/user5.png",
      gender: "male",
    },
        {
      name: "Nimisha",
      profession: "Accounting Student",
      comment:
        "Very good teaching and easy to understand. The practical examples helped me a lot in learning accounting basics.",
      imgSrc: "/images/testimonial/user6.png",
      gender: "female",
    },
  ];

  const renderAvatar = (imgSrc: string, name: string, gender: string) => {
    if (!imgSrc) {
      const placeholder =
        gender === "female"
          ? `${getImagePrefix()}images/placeholders/female-avatar.png`
          : `${getImagePrefix()}images/placeholders/male-avatar.png`;
      return (
        <Image
          src={placeholder}
          alt={name}
          width={72}
          height={72}
          className="rounded-full object-cover"
        />
      );
    }
    return (
      <Image
        src={`${getImagePrefix()}${imgSrc}`}
        alt={name}
        width={72}
        height={72}
        className="rounded-full object-cover"
      />
    );
  };

  const truncateText = (text: string, limit = 15) => {
    const words = text.split(" ");
    return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
  };

  const renderStars = (count = 5) => (
    <div className="flex items-center justify-center gap-1 mt-2">
      {[...Array(count)].map((_, i) => (
        <Icon key={i} icon="mdi:star" className="text-yellow-400 text-sm" />
      ))}
    </div>
  );

  return (
    <section id="testimonial" className="py-14 bg-gradient-to-b from-white to-gray-50 relative">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="sm:flex justify-between items-center mb-16">
          <h2 className="text-primary text-4xl lg:text-5xl font-semibold mb-5 sm:mb-0">
            Student <span className="text-accent">Feedback</span>
          </h2>
          <Link
            href={"/"}
            className="text-primary text-lg font-medium hover:tracking-widest duration-500"
          ></Link>
        </div>

        <Slider {...settings}>
          {testimonials.map((items, i) => (
            <div key={i} className="px-3">
              <div
                className={`bg-white rounded-2xl border border-gray-100
                min-h-[360px] max-w-[520px] mx-auto flex flex-col transition-all duration-300
                hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(24,87,134,0.08)] 
                shadow-[0_2px_15px_rgba(0,0,0,0.04)]`}
              >
                {/* Avatar */}
                <div className="flex justify-center mt-6">
                  <div className="w-18 h-18 rounded-full bg-white flex items-center justify-center border border-gray-100 shadow-sm overflow-hidden">
                    {renderAvatar(items.imgSrc, items.name, items.gender)}
                  </div>
                </div>

                {/* Quote */}
                <div className="flex-1 flex flex-col justify-center items-center px-4 mt-4">
                  <div className="text-primary/20 mb-2">
                    <Icon icon="fa-solid:quote-left" width="26" height="26" />
                  </div>
                  <p className="text-gray-700 text-center italic text-sm md:text-base leading-relaxed">
                    “{truncateText(items.comment, 15)}”
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 mx-8 my-4" />

                {/* Footer */}
                <div className="flex flex-col items-center pb-6">
                  <h3 className="text-base font-semibold text-gray-800">
                    {items.name}
                  </h3>
                  <p className="text-sm text-gray-500">{items.profession}</p>

                  {renderStars(5)}

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      className="w-9 h-9 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] 
                      flex items-center justify-center hover:scale-105 transition"
                      aria-label="Like"
                    >
                      <Icon
                        icon="mdi:heart-outline"
                        className="text-rose-500 w-4 h-4"
                      />
                    </button>

                    <button
                      className="w-9 h-9 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] 
                      flex items-center justify-center hover:scale-105 transition"
                      aria-label="Share"
                    >
                      <Icon
                        icon="mdi:share-variant"
                        className="text-primary w-4 h-4"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Slick dots */}
      <style jsx>{`
        :global(.slick-dots) {
          bottom: -28px;
        }
        :global(.slick-dots li button:before) {
          color: #cbd5e1;
          opacity: 1;
          font-size: 12px;
        }
        :global(.slick-dots li.slick-active button:before) {
          color: #185786;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default Testimonial;
