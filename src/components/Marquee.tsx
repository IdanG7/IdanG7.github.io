"use client";

const marqueeItems = [
  "Firmware",
  "C++",
  "Infrastructure",
  "CI/CD",
  "Automation",
  "Real-Time",
  "Distributed",
  "Observability",
  "Reliable",
];

function MarqueeGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row"
      aria-hidden={ariaHidden}
    >
      {marqueeItems.map((item) => (
        <div key={item} className="inline-flex items-center gap-2 lg:gap-4">
          <span className="text-sm leading-6 font-semibold tracking-[0.2em] text-gray-50 uppercase md:text-lg lg:text-xl font-outfit">
            {item}
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="star"
            loading="lazy"
            width="28"
            height="28"
            className="w-5 lg:w-7"
            src="/star.svg"
          />
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="relative w-full z-30 my-20 py-10">
      <div className="z-0 translate-y-10 rotate-6 bg-gradient-to-r from-red-600 to-red-700 py-4 opacity-60 md:rotate-3 lg:translate-y-16 lg:py-8" />
      <div className="z-2 -mx-1 flex -rotate-3 items-center justify-center overflow-x-clip bg-gradient-to-r from-red-600 to-red-700 py-1.5 lg:py-3">
        <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [--duration:30s]">
          <MarqueeGroup />
          <MarqueeGroup ariaHidden />
        </div>
      </div>
    </section>
  );
}
