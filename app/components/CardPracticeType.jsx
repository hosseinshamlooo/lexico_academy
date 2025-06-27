import { FaLock } from "react-icons/fa";

function CardPracticeType({ title, progress, questionTypes, locked }) {
  return (
    <div className={`relative bg-white rounded-3xl p-6 w-full min-w-[320px] max-w-md transition-all duration-200 border border-gray-200 ${locked ? "opacity-60" : "opacity-100"} flex flex-col shadow-none`}>
      {/* Lock overlay */}
      {locked && (
        <div className="absolute inset-0 bg-gray-400 bg-opacity-70 rounded-3xl flex items-center justify-center z-10">
          <FaLock className="text-4xl text-white" />
        </div>
      )}
      {/* Title and progress */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-2xl font-extrabold text-gray-900 truncate pr-2">{title}</h3>
        <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-200 text-lg font-bold text-gray-500 bg-white tracking-tighter">
          {progress}
        </span>
      </div>
      <hr className="border-gray-200 mb-3" />
      {/* Question types */}
      <div className="flex flex-wrap gap-2">
        {questionTypes.map((type) => (
          <span key={type} className="bg-gray-100 text-gray-600 px-4 py-1 rounded-full text-base font-semibold">
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}

export default CardPracticeType;
