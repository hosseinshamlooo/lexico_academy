"use client";

import React from "react";
import Link from "next/link";

const Navbar = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      className={
        "flex items-center justify-end w-full px-4 sm:px-10 md:px-14 lg:px-36 py-4 bg-cyan-100/70"
      }
    >
      <nav className="">
        <ul id="sidemenu" className="flex gap-10 text-gray-500 mt-3">
          <li className="h-6 flex items-center">
            <button
              onClick={() => scrollToSection("features")}
              className="font-semibold text-sm hover:text-[#1D5554] hover:text-base transition-all duration-200 bg-transparent border-none cursor-pointer"
            >
              Features
            </button>
          </li>
          <li className="h-6 flex items-center">
            <button
              onClick={() => scrollToSection("testimonials")}
              className="font-semibold text-sm hover:text-[#1D5554] hover:text-base transition-all duration-200 bg-transparent border-none cursor-pointer"
            >
              Testimonials
            </button>
          </li>
          <li className="h-6 flex items-center">
            <button
              onClick={() => scrollToSection("pricing")}
              className="font-semibold text-sm hover:text-[#1D5554] hover:text-base transition-all duration-200 bg-transparent border-none cursor-pointer"
            >
              Pricing
            </button>
          </li>
          <li className="h-6 flex items-center">
            <button
              onClick={() => scrollToSection("faqs")}
              className="font-semibold text-sm hover:text-[#1D5554] hover:text-base transition-all duration-200 bg-transparent border-none cursor-pointer"
            >
              FAQs
            </button>
          </li>
        </ul>
      </nav>
      <Link
        href="/signin"
        className="mt-4 ml-8 btn btn-primary bg-[#1D5554] text-white border-none hover:bg-[#17605c] transition-all duration-200 px-6 py-2 rounded-lg shadow-md text-sm font-bold"
      >
        Get Started
      </Link>
    </div>
  );
};

export default Navbar;
