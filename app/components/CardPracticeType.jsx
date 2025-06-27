import { FaLock } from "react-icons/fa";

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function CardPracticeType({ title, progress, questionTypes }) {
  return (
    <div
      className={`relative bg-white rounded-3xl p-6 w-full min-w-[320px] max-w-md transition-all duration-300 border border-gray-200 shadow-md flex flex-col group  hover:-translate-y-2 hover:shadow-2xl hover:bg-[#1D5554] hover:border-[#1D5554] hover:text-white`}
    >
      {/* Title and progress */}
      <div className="flex items-center justify-between mb-2">
        <h3
          className="text-2xl font-extrabold text-gray-900 truncate pr-2 transition-all duration-200 group-hover:whitespace-normal group-hover:text-clip-unset group-hover:overflow-visible group-hover:truncate-none group-hover:text-white"
          title={title}
        >
          {title}
        </h3>
        <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-200 bg-white transition-all duration-300 group-hover:bg-white group-hover:text-[#1D5554] group-hover:border-white">
          <span className="text-sm font-bold">{progress}</span>
        </span>
      </div>
      <hr className="border-gray-200 mb-3 group-hover:border-white transition-all duration-300" />
      {/* Question types */}
      <div className="flex flex-wrap gap-2">
        {questionTypes.map((type) => (
          <span
            key={type}
            className="bg-gray-100 px-4 py-1 rounded-full text-base font-bold transition-all duration-300 group-hover:text-[#1D5554] text-gray-600"
          >
            {capitalizeFirst(type)}
          </span>
        ))}
      </div>
    </div>
  );
}

export default CardPracticeType;
