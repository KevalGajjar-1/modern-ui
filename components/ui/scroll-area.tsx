"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────
export type ScrollAreaOrientation = "vertical" | "horizontal" | "both";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?:    ScrollAreaOrientation;
  /** Scrollbar size in px */
  scrollbarSize?:  number;
  /** Always show scrollbar, or only on hover/scroll */
  scrollbarVisibility?: "always" | "hover" | "scroll";
  /** Max height for vertical scroll areas */
  maxHeight?:      string | number;
  /** Max width for horizontal scroll areas */
  maxWidth?:       string | number;
}

export interface ScrollAreaScrollbarProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal";
  size?:        number;
  visibility?:  "always" | "hover" | "scroll";
}

// ─── Internal styles ──────────────────────────────────────
const SCROLLBAR_STYLE = `
  .sa-root {
    position: relative;
    overflow: hidden;
  }
  .sa-viewport {
    width: 100%;
    height: 100%;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .sa-viewport::-webkit-scrollbar {
    display: none;
  }
  /* Custom scrollbar track */
  .sa-track {
    position: absolute;
    border-radius: 999px;
    background: transparent;
    transition: background 160ms ease, opacity 160ms ease;
    z-index: 10;
  }
  .sa-track-v { right: 2px; top: 2px; bottom: 2px; width: var(--sa-size); }
  .sa-track-h { bottom: 2px; left: 2px; right: 2px; height: var(--sa-size); }

  /* Thumb */
  .sa-thumb {
    border-radius: 999px;
    background: hsl(var(--border));
    opacity: 0;
    transition: opacity 160ms ease, background 160ms ease;
    position: absolute;
    cursor: grab;
  }
  .sa-thumb:active { cursor: grabbing; background: hsl(var(--foreground) / 0.25); }

  /* Visibility modes */
  .sa-vis-always .sa-thumb       { opacity: 1; }
  .sa-vis-hover .sa-root:hover .sa-thumb,
  .sa-vis-hover .sa-thumb:hover,
  .sa-vis-hover .sa-thumb:active { opacity: 1; }
  .sa-vis-scroll .sa-thumb--scrolling { opacity: 1; }

  /* Dark mode */
  .dark .sa-thumb { background: hsl(var(--border)); }
  .dark .sa-thumb:active { background: hsl(var(--foreground) / 0.3); }
`;

// ─── ScrollArea ───────────────────────────────────────────
export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      className,
      orientation          = "vertical",
      scrollbarSize        = 6,
      scrollbarVisibility  = "hover",
      maxHeight,
      maxWidth,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const rootRef      = React.useRef<HTMLDivElement>(null);
    const viewportRef  = React.useRef<HTMLDivElement>(null);
    const thumbVRef    = React.useRef<HTMLDivElement>(null);
    const thumbHRef    = React.useRef<HTMLDivElement>(null);
    const scrollTimer  = React.useRef<NodeJS.Timeout | null>(null);

    const setRef = (el: HTMLDivElement | null) => {
      rootRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    };

    // Update thumb position + size
    const updateThumbs = React.useCallback(() => {
      const vp = viewportRef.current;
      if (!vp) return;

      // Vertical
      const thumbV = thumbVRef.current;
      if (thumbV && (orientation === "vertical" || orientation === "both")) {
        const trackH    = vp.clientHeight;
        const contentH  = vp.scrollHeight;
        const ratio     = trackH / contentH;
        const thumbH    = Math.max(ratio * trackH, 24);
        const thumbTop  = (vp.scrollTop / contentH) * trackH;
        thumbV.style.height = `${thumbH}px`;
        thumbV.style.top    = `${thumbTop}px`;
        thumbV.style.display = contentH <= trackH ? "none" : "block";
      }

      // Horizontal
      const thumbH = thumbHRef.current;
      if (thumbH && (orientation === "horizontal" || orientation === "both")) {
        const trackW   = vp.clientWidth;
        const contentW = vp.scrollWidth;
        const ratio    = trackW / contentW;
        const tW       = Math.max(ratio * trackW, 24);
        const tLeft    = (vp.scrollLeft / contentW) * trackW;
        thumbH.style.width  = `${tW}px`;
        thumbH.style.left   = `${tLeft}px`;
        thumbH.style.display = contentW <= trackW ? "none" : "block";
      }
    }, [orientation]);

    // Scroll event
    const handleScroll = React.useCallback(() => {
      updateThumbs();
      if (scrollbarVisibility === "scroll") {
        thumbVRef.current?.classList.add("sa-thumb--scrolling");
        thumbHRef.current?.classList.add("sa-thumb--scrolling");
        scrollTimer.current = setTimeout(() => {
          thumbVRef.current?.classList.remove("sa-thumb--scrolling");
          thumbHRef.current?.classList.remove("sa-thumb--scrolling");
        }, 800);
      }
    }, [updateThumbs, scrollbarVisibility]);

    // Thumb drag logic
    const attachDrag = React.useCallback(
      (thumbEl: HTMLDivElement | null, axis: "v" | "h") => {
        if (!thumbEl) return;
        let startPos   = 0;
        let startScroll = 0;

        const onMove = (e: MouseEvent) => {
          const vp = viewportRef.current;
          if (!vp) return;
          if (axis === "v") {
            const delta  = e.clientY - startPos;
            const ratio  = vp.scrollHeight / vp.clientHeight;
            vp.scrollTop = startScroll + delta * ratio;
          } else {
            const delta    = e.clientX - startPos;
            const ratio    = vp.scrollWidth / vp.clientWidth;
            vp.scrollLeft  = startScroll + delta * ratio;
          }
        };

        const onUp = () => {
          window.removeEventListener("mousemove", onMove);
          window.removeEventListener("mouseup",   onUp);
        };

        thumbEl.addEventListener("mousedown", (e: MouseEvent) => {
          e.preventDefault();
          startPos    = axis === "v" ? e.clientY : e.clientX;
          startScroll = axis === "v" ? viewportRef.current!.scrollTop : viewportRef.current!.scrollLeft;
          window.addEventListener("mousemove", onMove);
          window.addEventListener("mouseup",   onUp);
        });
      },
      []
    );

    React.useEffect(() => {
      updateThumbs();
      attachDrag(thumbVRef.current, "v");
      attachDrag(thumbHRef.current, "h");
      const vp = viewportRef.current;
      const ro = new ResizeObserver(updateThumbs);
      if (vp) { ro.observe(vp); vp.addEventListener("scroll", handleScroll); }
      return () => { ro.disconnect(); vp?.removeEventListener("scroll", handleScroll); };
    }, [updateThumbs, handleScroll, attachDrag]);

    const showV = orientation === "vertical"   || orientation === "both";
    const showH = orientation === "horizontal" || orientation === "both";

    return (
      <>
        <style suppressHydrationWarning>{SCROLLBAR_STYLE}</style>
        <div
          ref={setRef}
          data-orientation={orientation}
          className={cn(
            "sa-root",
            `sa-vis-${scrollbarVisibility}`,
            "group",
            className
          )}
          style={{
            ["--sa-size" as string]: `${scrollbarSize}px`,
            maxHeight: maxHeight
              ? typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight
              : undefined,
            maxWidth: maxWidth
              ? typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth
              : undefined,
            ...style,
          }}
          {...props}
        >
          {/* Viewport */}
          <div
            ref={viewportRef}
            className={cn(
              "sa-viewport",
              showV && "overflow-y-scroll",
              showH && "overflow-x-scroll",
              !showV && "overflow-y-hidden",
              !showH && "overflow-x-hidden",
            )}
            style={{
              maxHeight: maxHeight
                ? typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight
                : undefined,
              maxWidth: maxWidth
                ? typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth
                : undefined,
            }}
          >
            {children}
          </div>

          {/* Vertical scrollbar */}
          {showV && (
            <div className="sa-track sa-track-v" aria-hidden>
              <div ref={thumbVRef} className="sa-thumb" style={{ left: 0, right: 0 }} />
            </div>
          )}

          {/* Horizontal scrollbar */}
          {showH && (
            <div className="sa-track sa-track-h" aria-hidden>
              <div ref={thumbHRef} className="sa-thumb" style={{ top: 0, bottom: 0 }} />
            </div>
          )}
        </div>
      </>
    );
  }
);
ScrollArea.displayName = "ScrollArea";

// ─── ScrollBar — standalone for use inside ScrollArea ─────
export function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { orientation?: "vertical" | "horizontal" }) {
  return (
    <div
      data-orientation={orientation}
      className={cn(
        "flex touch-none select-none transition-colors",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-px",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-px",
        className
      )}
      {...props}
    />
  );
}
