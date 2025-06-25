import React from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function Pricing() {
  return (
    <section
      className="w-full py-16 flex flex-col items-center bg-white"
      id="pricing"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-center tracking-tighter mb-2 text-[#1D5554] font-[var(--font-body)]">
        Choose your Plan
      </h2>
      <p className="text-gray-400 text-base md:text-lg text-center max-w-2xl mb-22">
        Explore our prices and see which plan fits you best.
      </p>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl justify-center items-stretch px-4 md:px-0">
        {/* Free Tier */}
        <div className="relative flex flex-col w-[370px] rounded-3xl border-3 border-[#1D5554] bg-white text-[#1D5554] transition-all duration-300 p-8 md:p-10 shadow-[0_8px_0_0_#1D5554]">
          <div className="mb-2 text-xs font-bold uppercase tracking-wider opacity-80">
            FREE TIER
          </div>
          <div className="flex items-end mb-1 mt-2">
            <span className="text-4xl tracking-tighter font-extrabold leading-none text-[#1D5554]">
              0
            </span>
            <span className="text-xs font-medium ml-2 opacity-60 text-[#1D5554] self-center mt-2">
              Toman
            </span>
          </div>
          <div className="text-base font-semibold mb-2 mt-2">
            Dip your toes into IELTS prep — free forever.
          </div>
          <ul className="mb-8 mt-6 space-y-3 text-sm text-left">
            <li className="flex items-start">
              <FaCheckCircle
                className="w-5 h-5 inline-block mr-2 flex-shrink-0"
                color="#1D5554"
              />
              <span>Limited access to video lessons</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle
                className="w-5 h-5 inline-block mr-2 flex-shrink-0"
                color="#1D5554"
              />
              <span>Daily XP cap + basic streak tracking</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle
                className="w-5 h-5 inline-block mr-2 flex-shrink-0"
                color="#1D5554"
              />
              <span>Sample practice questions</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle
                className="w-5 h-5 inline-block mr-2 flex-shrink-0"
                color="#1D5554"
              />
              <span>Access to leaderboard (view-only)</span>
            </li>
          </ul>
          <button className="w-full rounded-full font-bold py-3 px-8 mt-auto transition-colors duration-150 text-base shadow-md bg-[#1D5554] text-white border-2 border-[#1D5554] hover:bg-[#17403f] hover:text-white">
            Get Started
          </button>
        </div>
        {/* Lexico Pro */}
        <div className="relative flex flex-col w-[370px]  rounded-3xl border-3 border-[#1D5554] bg-[#1D5554] text-white transition-all duration-300 p-8 md:p-10 z-10 scale-105 md:-mt-6">
          <span className="absolute top-6 right-6 bg-white text-[#1D5554] text-xs font-bold px-3 py-1 rounded-full border border-[#1D5554] shadow animate-pop">
            Best Seller
          </span>
          <div className="mb-2 text-xs font-bold uppercase tracking-wider opacity-80">
            LEXICO PRO
          </div>
          <div className="flex items-end mb-1 mt-5">
            <span className="text-4xl tracking-tighter font-extrabold leading-none text-white">
              450.000
            </span>
            <span className="text-xs font-medium ml-2 opacity-60 text-white self-center mt-2">
              Toman / month
            </span>
          </div>
          <div className="text-base font-semibold mb-2 mt-4">
            Unlock full IELTS mastery with smart practice, analytics, and
            rewards.
          </div>
          <div className="flex-1" />
          <ul className="mb-12 mt-6 space-y-3 text-sm text-left">
            <li className="flex items-start">
              <FaCheckCircle
                className="w-5 h-5 inline-block mr-2 flex-shrink-0"
                color="#fff"
              />
              <span>Full access to all video lessons</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle
                className="w-5 h-5 inline-block mr-2 flex-shrink-0"
                color="#fff"
              />
              <span>Unlimited mock tests with instant scoring</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle
                className="w-5 h-5 inline-block mr-2 flex-shrink-0"
                color="#fff"
              />
              <span>XP, streaks, and full leaderboard access</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle
                className="w-5 h-5 inline-block mr-2 flex-shrink-0"
                color="#fff"
              />
              <span>Band score prediction + skill analytics</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle
                className="w-5 h-5 inline-block mr-2 flex-shrink-0"
                color="#fff"
              />
              <span>Weekly challenges + badge rewards</span>
            </li>
          </ul>
          <button className="w-full rounded-full font-bold py-3 px-8 mt-auto transition-colors duration-150 text-base shadow-md bg-white text-[#1D5554] border-2 border-[#1D5554] hover:bg-[#D9F061] hover:text-[#1D5554]">
            Subscribe
          </button>
        </div>
        {/* Lifetime Lexico Pass */}
        <div className="relative flex flex-col w-[370px] rounded-3xl border-3 border-[#1D5554] bg-white text-[#1D5554] transition-all duration-300 p-8 md:p-10 shadow-[0_8px_0_0_#1D5554]">
          <div className="mb-2 text-xs font-bold uppercase tracking-wider opacity-80">
            LIFETIME LEXICO PASS
          </div>
          <div className="flex items-end mb-1 mt-2 mb-2">
            <span className="text-4xl font-extrabold leading-none tracking-tighter text-[#1D5554]">
              2.400.000
            </span>
            <span className="text-xs font-medium ml-2 opacity-60 text-[#1D5554] self-center mt-2">
              Toman (one-time)
            </span>
          </div>
          <div className="text-base font-semibold mt-2">
            One payment. Lifetime access. All future updates, forever.
          </div>
          <div className="flex-1" />
          <ul className="mb-8 mt-6 space-y-3 text-sm text-left">
            <li className="flex items-start">
              <FaCheckCircle
                className="w-5 h-5 inline-block mr-2 flex-shrink-0"
                color="#1D5554"
              />
              <span>Everything in Lexico Pro — forever</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle
                className="w-5 h-5 inline-block mr-2 flex-shrink-0"
                color="#1D5554"
              />
              <span>10+ mock tests with deep performance feedback</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle
                className="w-5 h-5 inline-block mr-2 flex-shrink-0"
                color="#1D5554"
              />
              <span>
                Exclusive &quot;Founding Learner&quot; badge + priority support
              </span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle
                className="w-5 h-5 inline-block mr-2 flex-shrink-0"
                color="#1D5554"
              />
              <span>
                Free access to all future course updates and content drops
              </span>
            </li>
          </ul>
          <button className="w-full rounded-full font-bold py-3 px-8 mt-auto transition-colors duration-150 text-base shadow-md bg-[#1D5554] text-white border-2 border-[#1D5554] hover:bg-[#17403f] hover:text-white">
            Buy Lifetime
          </button>
        </div>
      </div>
    </section>
  );
}
