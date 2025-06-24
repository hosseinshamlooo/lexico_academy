"use client";

import { useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    name: "Alex Kim",
    role: "IELTS Student",
    avatar: "/img/duo-pic1.webp",
    rating: 5,
    review:
      "Lexico made IELTS prep fun and effective. The feedback and analytics helped me improve fast!",
    link: "#",
  },
  {
    name: "Sara Lee",
    role: "University Applicant",
    avatar: "/img/duo-picmain.svg",
    rating: 4,
    review:
      "I loved the bite-sized lessons and the streak system. I felt motivated every day!",
    link: "#",
  },
  {
    name: "Mohammad Reza",
    role: "Working Professional",
    avatar: "/img/duo-pic1.webp",
    rating: 5,
    review:
      "The mock tests and instant feedback were a game changer. Highly recommend Lexico!",
    link: "#",
  },
  {
    name: "Emily Zhang",
    role: "IELTS Coach",
    avatar: "/img/duo-picmain.svg",
    rating: 4,
    review:
      "As a coach, I recommend Lexico to all my students. The analytics and practice sets are top-notch.",
    link: "#",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center mb-2">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < rating ? "text-orange-500" : "text-gray-300"
          }`}
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 20 20"
        >
          <polygon points="10,1 12.59,7.36 19.51,7.36 13.97,11.63 16.56,17.99 10,13.72 3.44,17.99 6.03,11.63 0.49,7.36 7.41,7.36" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const visibleCards = 3;
  const total = testimonials.length;

  function goTo(idx: number) {
    setCurrent((idx + total) % total);
  }

  // For infinite carousel effect
  const getVisible = () => {
    const arr = [];
    for (let i = 0; i < visibleCards; i++) {
      arr.push(testimonials[(current + i) % total]);
    }
    return arr;
  };

  return (
    <section
      className="w-full py-16 flex justify-center bg-white"
      id="testimonials"
    >
      <div className="max-w-6xl w-full flex flex-col items-center px-4 mr-16">
        <h2 className="text-4xl md:text-5xl font-extrabold justify-center tracking-tighter text-primary font-[var(--font-body)]">
          Testimonials
        </h2>
        <p className="text-gray-500 text-base md:text-lg justify-center text-center max-w-2xl mb-10 mt-4">
          Hear from our learners as they share their journeys of transformation,
          success, and how our platform has made a difference in their lives.
        </p>
        <div className="flex w-full items-center justify-center gap-4">
          {/* Left Arrow */}
          <button
            aria-label="Previous"
            onClick={() => goTo(current - 1)}
            className="p-0 m-0 bg-transparent border-none outline-none focus:outline-none hover:scale-110 transition-transform"
            style={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          {/* Cards */}
          <div className="flex gap-6 w-full items-center justify-center">
            {getVisible().map((t) => (
              <div
                key={t.name}
                className="bg-white border border-gray-200 rounded-2xl shadow-lg flex flex-col items-stretch p-6 w-full max-w-xs min-w-[270px] min-h-[320px] max-h-[320px] transition-all duration-300 justify-between"
                style={{ height: 320 }}
              >
                <div className="flex flex-col items-center w-full h-full gap-y-2">
                  {/* Avatar */}
                  <div
                    style={{ height: 56 }}
                    className="flex items-center justify-center w-full"
                  >
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={56}
                      height={56}
                      className="rounded-full object-cover border border-gray-200"
                    />
                  </div>
                  {/* Name, Profession, Stars group with less gap */}
                  <div className="flex flex-col items-center w-full gap-y-0.5">
                    {/* Name */}
                    <div
                      style={{ height: 28 }}
                      className="font-bold text-lg text-gray-800 leading-tight text-center w-full flex items-center justify-center"
                    >
                      {t.name}
                    </div>
                    {/* Profession */}
                    <div
                      style={{ height: 20 }}
                      className="text-sm text-gray-500 text-center w-full flex items-center justify-center"
                    >
                      {t.role}
                    </div>
                    {/* Stars */}
                    <div
                      style={{ height: 28 }}
                      className="flex justify-center items-center w-full"
                    >
                      <StarRating rating={t.rating} />
                    </div>
                  </div>
                  {/* Review */}
                  <div
                    style={{ height: 56 }}
                    className="flex items-center w-full"
                  >
                    <p
                      className="text-gray-600 text-sm text-left w-full overflow-hidden text-ellipsis"
                      style={{ marginBottom: 0 }}
                    >
                      {t.review}
                    </p>
                  </div>
                  {/* Read more */}
                  <div
                    style={{ height: 24 }}
                    className="flex items-center w-full"
                  >
                    <a
                      href={t.link}
                      className="text-blue-600 text-sm font-medium hover:underline w-full text-left"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Right Arrow */}
          <button
            aria-label="Next"
            onClick={() => goTo(current + 1)}
            className="p-0 m-0 bg-transparent border-none outline-none focus:outline-none hover:scale-110 transition-transform"
            style={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={
                "w-4 h-4 rounded-full border border-primary flex items-center justify-center transition-all duration-200 bg-white"
              }
              aria-label={`Go to testimonial ${idx + 1}`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-transform duration-300 ${
                  idx === current ? "animate-pop" : ""
                }`}
                style={
                  idx === current
                    ? {
                        background: "#1D5554",
                        animation: "popIn 0.35s cubic-bezier(0.4,1.4,0.6,1)",
                      }
                    : { background: "transparent" }
                }
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
