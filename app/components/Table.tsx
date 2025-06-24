import React from "react";

type Competitor = {
  name: string;
  price: string;
  courseLength: string;
  onlineAccess: boolean;
  practiceQuestions: boolean;
  mockTests: boolean;
  videoLessons: boolean;
  freeTrial: boolean;
  scoreGuarantee: boolean;
  mobileApp: boolean;
  speakingAssessment: boolean;
  writingAssessment: boolean;
  flashcards: boolean;
  moneyBack: boolean;
};

type Feature = {
  key: keyof Competitor;
  label: string;
  bold?: boolean;
};

const competitors: Competitor[] = [
  {
    name: "Lexico",
    price: "2,500,000 T",
    courseLength: "6 Months",
    onlineAccess: true,
    practiceQuestions: true,
    mockTests: true,
    videoLessons: true,
    freeTrial: true,
    scoreGuarantee: true,
    mobileApp: true,
    speakingAssessment: true,
    writingAssessment: true,
    flashcards: true,
    moneyBack: true,
  },
  {
    name: "Safir",
    price: "3,200,000 T",
    courseLength: "4 Months",
    onlineAccess: false,
    practiceQuestions: true,
    mockTests: true,
    videoLessons: false,
    freeTrial: false,
    scoreGuarantee: false,
    mobileApp: false,
    speakingAssessment: true,
    writingAssessment: true,
    flashcards: false,
    moneyBack: false,
  },
  {
    name: "Iranmehr",
    price: "2,900,000 T",
    courseLength: "5 Months",
    onlineAccess: false,
    practiceQuestions: true,
    mockTests: false,
    videoLessons: false,
    freeTrial: false,
    scoreGuarantee: false,
    mobileApp: false,
    speakingAssessment: true,
    writingAssessment: false,
    flashcards: false,
    moneyBack: false,
  },
  {
    name: "Pardisan",
    price: "2,700,000 T",
    courseLength: "4 Months",
    onlineAccess: false,
    practiceQuestions: true,
    mockTests: false,
    videoLessons: false,
    freeTrial: false,
    scoreGuarantee: false,
    mobileApp: false,
    speakingAssessment: false,
    writingAssessment: false,
    flashcards: false,
    moneyBack: false,
  },
  {
    name: "English Turbo",
    price: "3,000,000 T",
    courseLength: "6 Months",
    onlineAccess: true,
    practiceQuestions: true,
    mockTests: true,
    videoLessons: true,
    freeTrial: false,
    scoreGuarantee: false,
    mobileApp: true,
    speakingAssessment: true,
    writingAssessment: true,
    flashcards: true,
    moneyBack: false,
  },
];

const features: Feature[] = [
  { key: "price", label: "Price", bold: true },
  { key: "courseLength", label: "Length of Online Access", bold: true },
  { key: "practiceQuestions", label: "Practice Questions" },
  { key: "mockTests", label: "Mock Tests" },
  { key: "videoLessons", label: "Video Lessons" },
  { key: "freeTrial", label: "Free Trial" },
  { key: "scoreGuarantee", label: "Score Guarantee" },
  { key: "mobileApp", label: "Mobile App" },
  { key: "speakingAssessment", label: "Speaking Assessment" },
  { key: "writingAssessment", label: "Writing Assessment" },
  { key: "flashcards", label: "Flashcards Included" },
  { key: "moneyBack", label: "Money-Back Guarantee" },
];

function getCellIcon(value: boolean | string, bold = false) {
  if (typeof value === "string")
    return (
      <span className={bold ? "font-bold text-[#1D5554]" : "text-[#1D5554]"}>
        {value}
      </span>
    );
  return value ? (
    <span className="inline-block text-[#1D5554] text-lg">✔</span>
  ) : (
    <span className="inline-block text-gray-300 text-lg">—</span>
  );
}

export default function TableComparison() {
  return (
    <section className="w-full flex flex-col items-center py-16 px-2 min-h-screen bg-cyan-100/70">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center tracking-tighter mb-10 text-[#1D5554]">
        Lexico Gives You More
      </h2>
      <div className="overflow-x-auto w-full max-w-6xl">
        <table className="w-full border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-2xl bg-transparent">
          <thead>
            <tr>
              <th
                className="bg-cyan-100/70 !border-transparent p-0 m-0"
                style={{ background: "rgba(207,250,254,0.7)" }}
              ></th>
              <th className="bg-cyan-100/70 !border-transparent p-0 m-0"></th>
              {competitors.map((c, idx) => (
                <th
                  key={c.name}
                  className={`bg-[#1D5554] text-white text-lg font-bold px-6 py-5 text-center align-middle
          ${idx === 0 ? "" : ""}
          ${idx === competitors.length - 1 ? "rounded-tr-2xl" : ""}
        `}
                >
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, rowIdx) => (
              <tr key={feature.key}>
                <th
                  scope="row"
                  className={`bg-[#1D5554] text-white px-6 py-5 text-left align-middle border-b border-white pr-8 font-bold sticky left-0 z-10
          ${rowIdx === 0 ? "rounded-tl-2xl" : ""}
          ${rowIdx === features.length - 1 ? "rounded-bl-2xl" : ""}
        `}
                  style={{ background: "#1D5554" }}
                >
                  {feature.label}
                </th>
                <td className="bg-cyan-100/70 !border-transparent p-0 m-0"></td>
                {competitors.map((c, colIdx) => (
                  <td
                    key={c.name}
                    className={`bg-white text-center px-6 py-5 align-middle border-b border-gray-200 border-l
            ${
              colIdx === competitors.length - 1 &&
              rowIdx === features.length - 1
                ? "rounded-br-2xl"
                : ""
            }
            ${colIdx === competitors.length - 1 ? "" : "border-r"}
            ${colIdx === 0 ? "pl-4" : ""}
          `}
                  >
                    {getCellIcon(c[feature.key], feature.bold)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
