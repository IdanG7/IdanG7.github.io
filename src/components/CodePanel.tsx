"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

type CodeTab = {
  label: string;
  language: string;
  code: string;
};

export default function CodePanel({ tabs }: { tabs: CodeTab[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [canScroll, setCanScroll] = useState(false);
  const [dragging, setDragging] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ y: 0, scrollTop: 0 });

  const handleCopy = useCallback(() => {
    const code = tabs[activeTab]?.code ?? "";
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    });
  }, [tabs, activeTab]);

  useEffect(() => {
    const pre = preRef.current;
    if (!pre) return;

    const update = () => {
      const hasOverflow = pre.scrollHeight > pre.clientHeight;
      setCanScroll(hasOverflow);
      if (!hasOverflow) return;
      const ratio = pre.clientHeight / pre.scrollHeight;
      setThumbHeight(Math.max(ratio * 100, 10));
      const scrollRatio = pre.scrollTop / (pre.scrollHeight - pre.clientHeight);
      setThumbTop(scrollRatio * (100 - Math.max(ratio * 100, 10)));
    };

    update();
    pre.addEventListener("scroll", update);
    const ro = new ResizeObserver(update);
    ro.observe(pre);
    return () => {
      pre.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [isOpen, activeTab]);

  const handleThumbMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const pre = preRef.current;
      if (!pre) return;
      setDragging(true);
      dragStartRef.current = { y: e.clientY, scrollTop: pre.scrollTop };

      const onMouseMove = (ev: MouseEvent) => {
        const track = trackRef.current;
        if (!pre || !track) return;
        const trackHeight = track.clientHeight;
        const deltaY = ev.clientY - dragStartRef.current.y;
        const scrollRange = pre.scrollHeight - pre.clientHeight;
        const thumbRatio = thumbHeight / 100;
        const scrollDelta = deltaY / (trackHeight * (1 - thumbRatio)) * scrollRange;
        pre.scrollTop = dragStartRef.current.scrollTop + scrollDelta;
      };

      const onMouseUp = () => {
        setDragging(false);
        setHovered(false);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    },
    [thumbHeight]
  );

  const handleTrackClick = useCallback(
    (e: React.MouseEvent) => {
      const pre = preRef.current;
      const track = trackRef.current;
      if (!pre || !track) return;
      const rect = track.getBoundingClientRect();
      const clickRatio = (e.clientY - rect.top) / rect.height;
      pre.scrollTop = clickRatio * (pre.scrollHeight - pre.clientHeight);
    },
    []
  );

  return (
    <div className="w-full rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50 shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="w-full flex items-center justify-between px-8 md:px-10 py-6 text-left"
      >
        <div className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-neutral-500 dark:text-neutral-400"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-widest font-outfit">
            Code
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "text-neutral-400 dark:text-neutral-500 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-8 md:px-10 pb-8 md:pb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1">
              {tabs.map((tab, i) => (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(i)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium font-outfit transition-colors",
                    i === activeTab
                      ? "bg-neutral-900 dark:bg-white text-white dark:text-black"
                      : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium font-outfit text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {copied ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-emerald-500"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
          <div
            className="relative rounded-2xl bg-neutral-950 border border-neutral-800"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { if (!dragging) setHovered(false); }}
          >
            <pre
              ref={preRef}
              className="p-6 pr-4 overflow-x-auto text-[13px] leading-relaxed font-mono text-neutral-300 max-h-[500px] overflow-y-scroll overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <code>{tabs[activeTab]?.code ?? ""}</code>
            </pre>
            {canScroll && (
              <div
                ref={trackRef}
                onClick={handleTrackClick}
                className={cn(
                  "absolute top-2 right-1.5 bottom-2 w-3 cursor-pointer transition-opacity duration-200 flex justify-center",
                  hovered || dragging ? "opacity-100" : "opacity-0"
                )}
              >
                <div
                  onMouseDown={handleThumbMouseDown}
                  className={cn(
                    "w-1.5 rounded-full transition-colors",
                    dragging ? "bg-neutral-400" : "bg-neutral-600 hover:bg-neutral-500"
                  )}
                  style={{
                    height: `${thumbHeight}%`,
                    transform: `translateY(${(thumbTop / thumbHeight) * 100}%)`,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
