"use client";

import React from "react";

const Navbar = () => {
  return (
    <div
      className={
        "flex items-center justify-end w-full px-4 sm:px-10 md:px-14 lg:px-36 py-4 bg-cyan-100/70"
      }
    >
      <nav className="">
        <ul id="sidemenu" className="flex gap-10 text-gray-500 mt-3">
          <li className="h-6 flex items-center">
            <a
              href="#header"
              className="font-semibold text-sm hover:text-[#1D5554] hover:text-base transition-all duration-200"
            >
              Features
            </a>
          </li>
          <li className="h-6 flex items-center">
            <a
              href="#about"
              className="font-semibold text-sm hover:text-[#1D5554] hover:text-base transition-all duration-200"
            >
              Testimonials
            </a>
          </li>
          <li className="h-6 flex items-center">
            <a
              href="#services"
              className="font-semibold text-sm hover:text-[#1D5554] hover:text-base transition-all duration-200"
            >
              Pricing
            </a>
          </li>
          <li className="h-6 flex items-center">
            <a
              href="#contact"
              className="font-semibold text-sm hover:text-[#1D5554] hover:text-base transition-all duration-200"
            >
              FAQs
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
