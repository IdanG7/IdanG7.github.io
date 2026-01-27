"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { gsap } from "gsap";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

type AnimatedItem = {
  link: string;
  text: string;
  image: string;
};

type ColorOption = {
  name: string;
  value: string;
};

const initialItems: AnimatedItem[] = [
  {
    link: "#",
    text: "Hi, I'm Idan",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
  },
  {
    link: "#",
    text: "I Design",
    image:
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=600&h=400&fit=crop",
  },
  {
    link: "#",
    text: "I Develop",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
  },
  {
    link: "#",
    text: "I Create",
    image:
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=600&h=400&fit=crop",
  },
];

const colorOptions: ColorOption[] = [
  { name: "White", value: "#ffffff" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Emerald", value: "#10b981" },
];

const getContrastColor = (hex: string) => {
  const sanitized = hex.replace("#", "");
  const red = parseInt(sanitized.slice(0, 2), 16);
  const green = parseInt(sanitized.slice(2, 4), 16);
  const blue = parseInt(sanitized.slice(4, 6), 16);
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
  return luminance > 0.5 ? "#0A0A0A" : "#ffffff";
};

const getHoverDirection = (
  pointerX: number,
  pointerY: number,
  width: number,
  height: number
) => {
  const distanceTop =
    Math.pow(pointerX - width / 2, 2) + Math.pow(pointerY, 2);
  const distanceBottom =
    Math.pow(pointerX - width / 2, 2) + Math.pow(pointerY - height, 2);
  return distanceTop < distanceBottom ? "top" : "bottom";
};

const AnimatedRow = ({
  item,
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
  isFirst,
  itemHeight,
}: {
  item: AnimatedItem;
  speed: number;
  textColor: string;
  marqueeBgColor: string;
  marqueeTextColor: string;
  borderColor: string;
  isFirst: boolean;
  itemHeight: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [repeatCount, setRepeatCount] = useState(4);

  const updateRepeatCount = useCallback(() => {
    if (!marqueeRef.current) return;
    const marqueePart = marqueeRef.current.querySelector<HTMLElement>(
      ".marquee-part"
    );
    if (!marqueePart) return;
    const partWidth = marqueePart.offsetWidth;
    if (!partWidth) return;
    setRepeatCount(Math.max(4, Math.ceil(window.innerWidth / partWidth) + 2));
  }, []);

  useEffect(() => {
    updateRepeatCount();
    window.addEventListener("resize", updateRepeatCount);
    return () => window.removeEventListener("resize", updateRepeatCount);
  }, [updateRepeatCount, item.image, item.text]);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const marqueePart = marqueeRef.current.querySelector<HTMLElement>(
      ".marquee-part"
    );
    if (!marqueePart) return;
    const partWidth = marqueePart.offsetWidth;
    if (!partWidth) return;
    tweenRef.current?.kill();
    tweenRef.current = gsap.to(marqueeRef.current, {
      x: -partWidth,
      duration: speed,
      ease: "none",
      repeat: -1,
    });
    return () => {
      tweenRef.current?.kill();
    };
  }, [repeatCount, speed, item.image, item.text]);

  const handleEnter = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!containerRef.current || !overlayRef.current || !marqueeRef.current) {
      return;
    }
    const bounds = containerRef.current.getBoundingClientRect();
    const direction = getHoverDirection(
      event.clientX - bounds.left,
      event.clientY - bounds.top,
      bounds.width,
      bounds.height
    );
    gsap
      .timeline({ defaults: { duration: 0.6, ease: "expo" } })
      .set(
        overlayRef.current,
        { y: direction === "top" ? "-101%" : "101%" },
        0
      )
      .set(
        marqueeRef.current,
        { y: direction === "top" ? "101%" : "-101%" },
        0
      )
      .to([overlayRef.current, marqueeRef.current], { y: "0%" }, 0);
  };

  const handleLeave = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!containerRef.current || !overlayRef.current || !marqueeRef.current) {
      return;
    }
    const bounds = containerRef.current.getBoundingClientRect();
    const direction = getHoverDirection(
      event.clientX - bounds.left,
      event.clientY - bounds.top,
      bounds.width,
      bounds.height
    );
    gsap
      .timeline({ defaults: { duration: 0.6, ease: "expo" } })
      .to(
        overlayRef.current,
        { y: direction === "top" ? "-101%" : "101%" },
        0
      )
      .to(
        marqueeRef.current,
        { y: direction === "top" ? "101%" : "-101%" },
        0
      );
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden text-center"
      style={{
        borderTop: isFirst ? "none" : `1px solid ${borderColor}`,
        height: itemHeight,
        minHeight: itemHeight,
      }}
    >
      <a
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-[4vh] font-outfit"
        href={item.link}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{ color: textColor }}
      >
        {item.text}
      </a>
      <div
        ref={overlayRef}
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none translate-y-[101%]"
        style={{ backgroundColor: marqueeBgColor }}
      >
        <div ref={marqueeRef} className="h-full w-fit flex">
          {Array.from({ length: repeatCount }).map((_, index) => (
            <div
              key={`${item.text}-${index}`}
              className="marquee-part flex items-center flex-shrink-0"
              style={{ color: marqueeTextColor }}
            >
              <span className="whitespace-nowrap uppercase font-normal text-[4vh] leading-[1] px-[1vw] font-outfit">
                {item.text}
              </span>
              <div
                className="w-[200px] h-[7vh] my-[2em] mx-[2vw] py-[1em] rounded-[50px] bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AnimatedMarquee = ({
  items,
  speed,
  textColor,
  bgColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
  itemHeight,
}: {
  items: AnimatedItem[];
  speed: number;
  textColor: string;
  bgColor: string;
  marqueeBgColor: string;
  marqueeTextColor: string;
  borderColor: string;
  itemHeight: string;
}) => (
  <div className="w-full h-full overflow-hidden" style={{ backgroundColor: bgColor }}>
    <nav className="flex flex-col h-full m-0 p-0">
      {items.map((item, index) => (
        <AnimatedRow
          key={`${item.text}-${index}`}
          item={item}
          speed={speed}
          textColor={textColor}
          marqueeBgColor={marqueeBgColor}
          marqueeTextColor={marqueeTextColor}
          borderColor={borderColor}
          isFirst={index === 0}
          itemHeight={itemHeight}
        />
      ))}
    </nav>
  </div>
);

export default function AnimatedListPage() {
  const [items, setItems] = useState(initialItems);
  const [hoverColor, setHoverColor] = useState("#ffffff");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draftText, setDraftText] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const marqueeTextColor = useMemo(
    () => getContrastColor(hoverColor),
    [hoverColor]
  );

  const commitEdit = useCallback(() => {
    if (editingIndex === null) {
      setDraftText("");
      return;
    }
    if (!draftText.trim()) {
      setEditingIndex(null);
      setDraftText("");
      return;
    }
    setItems((previous) => {
      const nextItems = [...previous];
      nextItems[editingIndex] = {
        ...nextItems[editingIndex],
        text: draftText.trim(),
      };
      return nextItems;
    });
    setEditingIndex(null);
    setDraftText("");
  }, [draftText, editingIndex]);

  const handleColorChange = useCallback((value: string) => {
    setHoverColor(value);
    if (!panelRef.current) return;
    panelRef.current
      .querySelectorAll(".color-btn")
      .forEach((button) => {
        gsap.to(button, { scale: 1, duration: 0.2, ease: "power2.out" });
      });
    const activeButton = panelRef.current.querySelector(
      `[data-color="${value}"]`
    );
    if (activeButton) {
      gsap.to(activeButton, { scale: 1.15, duration: 0.3, ease: "back.out(1.7)" });
    }
  }, []);

  const handleEditStart = (index: number) => {
    setEditingIndex(index);
    setDraftText(items[index].text);
    setTimeout(() => {
      if (!inputRef.current) return;
      gsap.fromTo(
        inputRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
      );
      inputRef.current.focus();
    }, 10);
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-neutral-50 dark:bg-black pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-32">
          <Link
            href="/labs"
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Back to Labs
          </Link>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12 mb-12 md:mb-20">
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-outfit font-bold text-neutral-900 dark:text-white tracking-tight leading-[1.1]">
                Animated List
              </h1>
              <p className="mt-4 text-lg md:text-xl text-neutral-600 dark:text-white/60 max-w-2xl leading-relaxed">
                A marquee-style list with hover-driven motion, animated
                typography, and editable copy.
              </p>
            </div>
            <div className="hidden md:flex flex-col gap-4 text-right">
              <div>
                <span className="font-outfit text-[10px] font-medium text-neutral-400 dark:text-white/30 uppercase tracking-wider block mb-1">
                  Status
                </span>
                <span className="font-outfit text-sm text-neutral-700 dark:text-white/70">
                  Experimental
                </span>
              </div>
              <div>
                <span className="font-outfit text-[10px] font-medium text-neutral-400 dark:text-white/30 uppercase tracking-wider block mb-1">
                  Category
                </span>
                <span className="font-outfit text-sm text-neutral-700 dark:text-white/70">
                  UI
                </span>
              </div>
              <div>
                <span className="font-outfit text-[10px] font-medium text-neutral-400 dark:text-white/30 uppercase tracking-wider block mb-1">
                  Last Updated
                </span>
                <span className="font-outfit text-sm text-neutral-700 dark:text-white/70">
                  Jan 2026
                </span>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-6 font-outfit">
            <div
              ref={panelRef}
              className="w-full rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50 p-8 md:p-10 shadow-sm"
            >
              <div className="flex items-center justify-between mb-8 border-b border-neutral-200 dark:border-white/5 pb-6">
                <h2 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-widest">
                  Configuration
                </h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Active
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  <label className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-medium">
                    Hover Color
                  </label>
                  <div className="flex items-center gap-3">
                    {colorOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        data-color={option.value}
                        className={`color-btn w-8 h-8 rounded-full border-2 transition-all shadow-sm ${hoverColor === option.value
                            ? "border-neutral-900 dark:border-white scale-110"
                            : "border-neutral-200 dark:border-transparent hover:border-neutral-300 dark:hover:border-white/30"
                          }`}
                        style={{ background: option.value }}
                        onClick={() => handleColorChange(option.value)}
                        title={option.name}
                      />
                    ))}
                    <div className="relative group shrink-0">
                      <div
                        className="w-8 h-8 rounded-full border border-neutral-200 dark:border-white/20 shadow-sm overflow-hidden"
                        style={{ backgroundColor: hoverColor }}
                      >
                        <input
                          type="color"
                          value={hoverColor}
                          onChange={(event) => handleColorChange(event.target.value)}
                          className="w-[150%] h-[150%] -ml-[25%] -mt-[25%] absolute cursor-pointer opacity-0"
                          title="Custom Color"
                        />
                      </div>
                    </div>
                    <span className="text-xs text-neutral-900 dark:text-neutral-200 font-outfit uppercase tracking-wide ml-2">
                      {hoverColor}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-medium">
                    Edit Text
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    {items.map((item, index) => (
                      <div key={item.text}>
                        {editingIndex === index ? (
                          <input
                            ref={inputRef}
                            type="text"
                            value={draftText}
                            onChange={(event) => setDraftText(event.target.value)}
                            onBlur={commitEdit}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") commitEdit();
                              if (event.key === "Escape") {
                                setEditingIndex(null);
                                setDraftText("");
                              }
                            }}
                            className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-white/10 text-neutral-900 dark:text-white text-sm font-outfit border border-neutral-300 dark:border-white/20 outline-none focus:border-neutral-500 dark:focus:border-white/40 w-28"
                          />
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleEditStart(index)}
                            className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-700 dark:text-white/80 text-sm font-outfit transition-colors border border-neutral-200 dark:border-white/10"
                          >
                            {item.text}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="relative w-full overflow-hidden shadow-2xl rounded-3xl border border-neutral-200 dark:border-white/10"
              style={{ height: "500px", background: "#0A0A0A" }}
            >
              <div
                className="absolute inset-0 pointer-events-none z-10 rounded-3xl"
                style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)" }}
              />
              <AnimatedMarquee
                items={items}
                speed={15}
                textColor="#fff"
                bgColor="#0A0A0A"
                marqueeBgColor={hoverColor}
                marqueeTextColor={marqueeTextColor}
                borderColor="rgba(255,255,255,0.15)"
                itemHeight="120px"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
