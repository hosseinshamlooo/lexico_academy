import React from "react";

function VideoSegment() {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-cyan-100/70 via-cyan-100/70 to-white flex justify-center">
      <div className="max-w-5xl w-full flex flex-col items-center px-7 md:px-0">
        <h2 className="font-extrabold tracking-tight leading-tight text-4xl md:text-5xl text-primary text-center font-[var(--font-body)] mb-6">
          Ditch the fluff and random YouTube hacks.
          <br />
          <span className="text-gray-500 text-base md:text-xl block mt-2 font-semibold mb-10">
            Lexico breaks IELTS down into short, powerful lessons with zero
            guesswork — just progress, rewards, and results.
          </span>
        </h2>
        <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl bg-black flex items-center justify-center">
          <video
            className="w-full h-auto aspect-video"
            controls
            poster="https://dummyimage.com/1200x675/222/fff&text=Video+Preview"
          >
            <source
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}

export default VideoSegment;
