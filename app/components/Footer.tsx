import React from "react";

function Footer() {
  return (
    <footer
      className="pt-12 pb-4 px-4 md:px-0"
      style={{ backgroundColor: "#1D5554" }}
    >
      <div className="max-w-7xl mx-auto text-white">
        {/* Main Columns */}
        <div className="w-full flex flex-col md:flex-row md:items-start gap-10 md:gap-20 pb-8 border-b border-white/10">
          {/* Company */}
          <div className="flex-1 min-w-[160px] md:max-w-xs">
            <h3 className="font-extrabold text-lg mb-3 tracking-tight leading-tight font-[var(--font-body)] text-white">
              Company
            </h3>
            <ul className="space-y-2 text-base">
              <li>
                <a
                  href="#"
                  className="text-white cursor-pointer hover:opacity-80 transition-opacity"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white cursor-pointer hover:opacity-80 transition-opacity"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white cursor-pointer hover:opacity-80 transition-opacity"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white cursor-pointer hover:opacity-80 transition-opacity"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>
          {/* Connect */}
          <div className="flex-1 min-w-[160px] md:max-w-xs">
            <h3 className="font-extrabold text-lg mb-3 tracking-tight leading-tight font-[var(--font-body)] text-white">
              Connect
            </h3>
            <ul className="space-y-2 text-base">
              <li>
                <a
                  href="#"
                  className="text-white cursor-pointer hover:opacity-80 transition-opacity"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white cursor-pointer hover:opacity-80 transition-opacity"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white cursor-pointer hover:opacity-80 transition-opacity"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          {/* Site Languages */}
          <div className="flex-1 min-w-[160px] md:max-w-xs">
            <h3 className="font-extrabold text-lg mb-3 tracking-tight leading-tight font-[var(--font-body)] text-white">
              Site Languages
            </h3>
            <ul className="space-y-2 text-base flex gap-4">
              <li>
                <a
                  href="#"
                  className="text-white cursor-pointer hover:opacity-80 transition-opacity"
                >
                  English
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white cursor-pointer hover:opacity-80 transition-opacity"
                >
                  فارسی
                </a>
              </li>
            </ul>
          </div>
          {/* Newsletter */}
          <div className="flex-1 min-w-[220px] md:max-w-sm">
            <h3 className="font-extrabold text-lg mb-3 tracking-tight leading-tight font-[var(--font-body)] text-white">
              Subscribe to our newsletter
            </h3>
            <p className="text-base text-white mb-3 font-medium whitespace-nowrap">
              The latest news, articles, and resources, sent to your inbox
              weekly.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-[300px] md:w-[340px] rounded-md border border-white/30 bg-[#1D5554] text-white placeholder-white/60 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
                autoComplete="email"
              />
              <button
                type="submit"
                className="w-full sm:w-auto font-bold text-center bg-[#D9F061] text-[#1D5554] rounded-md px-6 py-2 transition-colors duration-150 cursor-pointer"
                style={{ minWidth: "120px" }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        {/* Copyright */}
        <div className="text-center text-sm opacity-70 pt-6 font-medium text-white">
          &copy; {new Date().getFullYear()} Lexico. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
