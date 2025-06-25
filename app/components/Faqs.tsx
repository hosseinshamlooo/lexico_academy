import React, { useState } from "react";

const faqs = [
  {
    question: "Is Lexico Academy free to use?",
    answer:
      "Yes! You can start practicing for free and access a large set of reading and listening questions. If you want to unlock full mock tests, advanced analytics, and extra XP rewards, you can upgrade to our Premium Plan.",
  },
  {
    question: "What makes Lexico different from other IELTS prep platforms?",
    answer:
      "Lexico is the first IELTS prep platform in Iran that gamifies your learning. You earn XP for every question, see your streaks, compete on leaderboards, and focus on your weak spots. It's practice with purpose — and fun.",
  },
  {
    question: "Can I use Lexico Academy on my phone?",
    answer:
      "Absolutely. Lexico works smoothly on mobile, tablet, and desktop. No app download needed — just open the website and start practicing.",
  },
  {
    question: "What does the Premium Plan include?",
    answer:
      "The Premium Plan gives you access to:\n\nAll 16 Cambridge reading and listening test banks\n\n8 full-length IELTS mock tests\n\nDetailed performance analytics\n\nMore XP and streak multipliers\n\nPriority support and upcoming features",
  },
  {
    question: "Can I track my progress over time?",
    answer:
      "Yes! Your dashboard shows how much XP you've earned, your strong and weak areas, and how you're improving week by week. It's like a report card — but way cooler.",
  },
  {
    question: "Will Lexico Academy help me with speaking and writing too?",
    answer:
      "Our current MVP focuses on Reading and Listening — but we're working on Writing and Speaking modules with AI feedback and expert coaching. Stay tuned!",
  },
  {
    question: "How do I upgrade to Premium?",
    answer:
      'You can upgrade from your dashboard anytime using our secure Zarinpal payment system. Just go to your profile and click "Upgrade to Premium."',
  },
  {
    question: "Is my data and progress saved securely?",
    answer:
      "Yes. We use Firebase for secure login and data storage. Your progress, XP, and personal info are encrypted and stored safely.",
  },
];

function ArrowIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 ml-2 transition-transform duration-300 text-primary ${
        open ? "rotate-180" : "rotate-0"
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(idx: number) {
    setOpenIndex(openIndex === idx ? null : idx);
  }

  return (
    <section className="w-full py-16 flex justify-center bg-white" id="faqs">
      <div className="max-w-4xl w-full flex flex-col items-center px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center tracking-tighter mb-4 text-primary font-[var(--font-body)]">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-500 text-base md:text-lg text-center max-w-2xl mb-10">
          Everything you need to know about Lexico. Can&apos;t find your answer?{" "}
          <a
            href="#contact"
            className="text-primary font-semibold hover:underline"
          >
            Contact us
          </a>
          .
        </p>
        <div className="w-full divide-y divide-gray-200 rounded-2xl bg-white">
          {faqs.map((faq, idx) => (
            <div key={faq.question}>
              <button
                className="w-full flex items-center justify-between py-5 px-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary group"
                aria-expanded={openIndex === idx}
                aria-controls={`faq-panel-${idx}`}
                onClick={() => toggle(idx)}
              >
                <span className="text-lg md:text-xl font-semibold text-gray-800 group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
                <ArrowIcon open={openIndex === idx} />
              </button>
              <div
                id={`faq-panel-${idx}`}
                className={`overflow-hidden transition-all duration-300 px-6 ${
                  openIndex === idx ? "max-h-40 py-2" : "max-h-0 py-0"
                }`}
                style={{
                  transitionProperty: "max-height, padding",
                }}
                aria-hidden={openIndex !== idx}
              >
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
