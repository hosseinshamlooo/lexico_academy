import React from "react";

export default function Cta() {
  return (
    <section className="w-full py-28 md:py-40 flex justify-center bg-cyan-100/70">
      <div className="max-w-3xl w-full flex flex-col items-center px-7 md:px-0 text-center space-y-7">
        <h2 className="font-extrabold tracking-tight leading-tight text-4xl md:text-5xl text-primary font-[var(--font-body)]">
          Level Up Your IELTS Prep Today.
        </h2>
        <button className="hero-btn hero-btn-primary font-bold py-3 px-10 rounded-full cursor-pointer shadow-lg mt-2 text-lg">
          Get Started
        </button>
      </div>
    </section>
  );
}
