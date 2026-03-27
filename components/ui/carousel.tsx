"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CarouselOrientation = "horizontal" | "vertical";

export interface CarouselApi {
  scrollTo: (index: number, instant?: boolean) => void;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
  scrollSnapList: number[];
}

export interface CarouselProps {
  orientation?: CarouselOrientation;
  autoPlay?: number;
  loop?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
  dragEnabled?: boolean;
  setApi?: (api: CarouselApi) => void;
  className?: string;
  children: React.ReactNode;
}

export interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
  basis?: string;
  className?: string;
  children: React.ReactNode;
}

interface CarouselCtx {
  orientation: CarouselOrientation;
  selectedIndex: number;
  count: number;
  scrollTo: (i: number) => void;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

const CarouselContext = React.createContext<CarouselCtx>({
  orientation: "horizontal", selectedIndex: 0, count: 0,
  scrollTo: () => { }, scrollPrev: () => { }, scrollNext: () => { },
  canScrollPrev: false, canScrollNext: false,
});

// ─── Smooth scroll helper (replaces scrollIntoView) ──────
function smoothScrollTo(
  el: HTMLElement,
  target: number,
  axis: "scrollLeft" | "scrollTop",
  duration = 350
) {
  const start = el[ axis ];
  const distance = target - start;
  if (distance === 0) return;
  const startTime = performance.now();

  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease in-out cubic
    const ease = progress < 0.5
      ? 4 * progress ** 3
      : 1 - (-2 * progress + 2) ** 3 / 2;
    el[ axis ] = start + distance * ease;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export function Carousel({
  orientation = "horizontal",
  autoPlay = 0,
  loop = false,
  showDots = true,
  showArrows = true,
  dragEnabled = true,
  setApi,
  className,
  children,
}: CarouselProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [ index, setIndex ] = React.useState(0);
  const [ isDragging, setIsDragging ] = React.useState(false);

  const items = React.Children.toArray(children).filter(React.isValidElement);
  const count = items.length;
  const isH = orientation === "horizontal";

  const canPrev = loop ? count > 1 : index > 0;
  const canNext = loop ? count > 1 : index < count - 1;

  // ── Core scroll — uses scrollLeft/scrollTop, NOT scrollIntoView ──
  // Track has overflow:hidden so it's NOT a browser scroll container
  // Browser never routes PageDown/Space to it
  const scrollTo = React.useCallback(
    (i: number, instant = false) => {
      const next = loop
        ? ((i % count) + count) % count
        : Math.min(Math.max(i, 0), count - 1);
      setIndex(next);

      const track = trackRef.current;
      if (!track) return;
      const child = track.children[ next ] as HTMLElement | undefined;
      if (!child) return;

      if (isH) {
        const target = child.offsetLeft;
        if (instant) {
          track.scrollLeft = target;
        } else {
          smoothScrollTo(track, target, "scrollLeft");
        }
      } else {
        const target = child.offsetTop;
        if (instant) {
          track.scrollTop = target;
        } else {
          smoothScrollTo(track, target, "scrollTop");
        }
      }
    },
    [ loop, count, isH ]
  );

  const scrollPrev = React.useCallback(() => scrollTo(index - 1), [ index, scrollTo ]);
  const scrollNext = React.useCallback(() => scrollTo(index + 1), [ index, scrollTo ]);

  // ── Keyboard — on window, only when carousel is hovered ──
  // Never on the carousel element itself — avoids all focus issues
  const isHovered = React.useRef(false);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isHovered.current) return;
      if (isH && e.key === "ArrowLeft") { e.preventDefault(); scrollPrev(); }
      if (isH && e.key === "ArrowRight") { e.preventDefault(); scrollNext(); }
      if (!isH && e.key === "ArrowUp") { e.preventDefault(); scrollPrev(); }
      if (!isH && e.key === "ArrowDown") { e.preventDefault(); scrollNext(); }
      // PageDown / Space / etc — do nothing, let page scroll normally
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [ isH, scrollPrev, scrollNext ]);

  // ── Auto-play ──────────────────────────────────────────
  React.useEffect(() => {
    if (!autoPlay || count <= 1) return;
    const id = setInterval(() => scrollTo(index + 1), autoPlay);
    return () => clearInterval(id);
  }, [ autoPlay, index, scrollTo, count ]);

  // ── Expose API ─────────────────────────────────────────
  React.useEffect(() => {
    if (!setApi) return;
    setApi({
      scrollTo, scrollPrev, scrollNext,
      canScrollPrev: canPrev,
      canScrollNext: canNext,
      selectedIndex: index,
      scrollSnapList: Array.from({ length: count }, (_, i) => i),
    });
  }, [ setApi, scrollTo, scrollPrev, scrollNext, canPrev, canNext, index, count ]);

  // ── Drag ───────────────────────────────────────────────
  const dragStart = React.useRef<number | null>(null);
  const dragDelta = React.useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!dragEnabled) return;
    if ((e.target as HTMLElement).closest("button")) return;
    dragStart.current = isH ? e.clientX : e.clientY;
    dragDelta.current = 0;
    setIsDragging(false);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const pos = isH ? e.clientX : e.clientY;
    dragDelta.current = pos - dragStart.current;
    if (Math.abs(dragDelta.current) > 5) setIsDragging(true);
  };

  const onPointerUp = () => {
    if (dragStart.current === null) return;
    dragStart.current = null;
    if (Math.abs(dragDelta.current) > 40) {
      dragDelta.current < 0 ? scrollNext() : scrollPrev();
    }
    setTimeout(() => setIsDragging(false), 0);
  };

  const ctx: CarouselCtx = {
    orientation, selectedIndex: index, count,
    scrollTo, scrollPrev, scrollNext,
    canScrollPrev: canPrev, canScrollNext: canNext,
  };

  return (
    <CarouselContext.Provider value={ ctx }>
      <div
        // ✅ NO tabIndex — carousel never receives focus, never hijacks keyboard
        role="region"
        aria-roledescription="carousel"
        aria-label="carousel"
        className={ cn("relative group", className) }
        // Arrow key nav via hover, not focus
        onMouseEnter={ () => { isHovered.current = true; } }
        onMouseLeave={ () => { isHovered.current = false; } }
      >
        {/* ── Track ──
            overflow:hidden = NOT a browser scroll container
            Browser will NEVER route PageDown/Space/wheel to this element
            Scrolling is done manually via scrollLeft/scrollTop
        */}
        <div
          ref={ trackRef }
          aria-live="polite"
          className={ cn(
            "flex",
            // ✅ overflow-hidden — not a scroll container, PageDown never targets it
            isH ? "flex-row overflow-hidden" : "flex-col overflow-hidden",
            isDragging && "cursor-grabbing",
            !isDragging && dragEnabled && "cursor-grab",
          ) }
          onPointerDown={ onPointerDown }
          onPointerMove={ onPointerMove }
          onPointerUp={ onPointerUp }
          onPointerCancel={ onPointerUp }
        >
          { children }
        </div>

        {/* ── Arrows ── */ }
        { showArrows && count > 1 && (
          <>
            <CarouselPrevButton />
            <CarouselNextButton />
          </>
        ) }

        {/* ── Dots ── */ }
        { showDots && count > 1 && (
          <div className={ cn(
            "absolute flex gap-1.5",
            isH
              ? "bottom-3 left-1/2 -translate-x-1/2 flex-row"
              : "right-3  top-1/2  -translate-y-1/2 flex-col"
          ) }>
            { Array.from({ length: count }, (_, i) => (
              <button
                key={ i }
                type="button"
                aria-label={ `Go to slide ${i + 1}` }
                onClick={ () => scrollTo(i) }
                className={ cn(
                  "rounded-full transition-all duration-200",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
                  i === index
                    ? "bg-white w-5 h-2"
                    : "bg-white/50 hover:bg-white/75 w-2 h-2"
                ) }
              />
            )) }
          </div>
        ) }
      </div>
    </CarouselContext.Provider>
  );
}

// ─── CarouselItem ─────────────────────────────────────────
export function CarouselItem({
  basis = "100%",
  className,
  children,
  ...props
}: CarouselItemProps) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      // ✅ shrink-0 + no snap classes needed — we scroll manually
      className={ cn("shrink-0", className) }
      style={ { flexBasis: basis } }
      { ...props }
    >
      { children }
    </div>
  );
}

// ─── CarouselPrevButton ───────────────────────────────────
export function CarouselPrevButton({
  className, ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { scrollPrev, canScrollPrev, orientation } = React.useContext(CarouselContext);
  const isH = orientation === "horizontal";
  return (
    <button
      type="button"
      aria-label="Previous slide"
      disabled={ !canScrollPrev }
      onClick={ scrollPrev }
      className={ cn(
        "absolute z-10 flex h-9 w-9 items-center justify-center rounded-full",
        "bg-background/80 backdrop-blur-sm border border-border/60 text-foreground shadow-md",
        "transition-all duration-150 hover:bg-background hover:scale-105",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:opacity-30 disabled:pointer-events-none",
        "opacity-0 group-hover:opacity-100",
        isH ? "left-3 top-1/2 -translate-y-1/2" : "top-3 left-1/2 -translate-x-1/2",
        className
      ) }
      { ...props }
    >
      { isH ? <ChevronLeft className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4 -rotate-90" /> }
    </button>
  );
}

// ─── CarouselNextButton ───────────────────────────────────
export function CarouselNextButton({
  className, ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { scrollNext, canScrollNext, orientation } = React.useContext(CarouselContext);
  const isH = orientation === "horizontal";
  return (
    <button
      type="button"
      aria-label="Next slide"
      disabled={ !canScrollNext }
      onClick={ scrollNext }
      className={ cn(
        "absolute z-10 flex h-9 w-9 items-center justify-center rounded-full",
        "bg-background/80 backdrop-blur-sm border border-border/60 text-foreground shadow-md",
        "transition-all duration-150 hover:bg-background hover:scale-105",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:opacity-30 disabled:pointer-events-none",
        "opacity-0 group-hover:opacity-100",
        isH ? "right-3 top-1/2 -translate-y-1/2" : "bottom-3 left-1/2 -translate-x-1/2",
        className
      ) }
      { ...props }
    >
      { isH ? <ChevronRight className="h-4 w-4" /> : <ChevronRight className="h-4 w-4 -rotate-90" /> }
    </button>
  );
}
