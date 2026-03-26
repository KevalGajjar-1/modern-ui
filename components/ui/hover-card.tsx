"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────
export type HoverCardSide    = "top" | "bottom" | "left" | "right";
export type HoverCardAlign   = "start" | "center" | "end";
export type HoverCardVariant = "default" | "outline" | "elevated" | "glass";

export interface HoverCardProps {
  children:      React.ReactNode;
  openDelay?:    number;
  closeDelay?:   number;
  open?:         boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?:     boolean;
}

export interface HoverCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?:        HoverCardSide;
  align?:       HoverCardAlign;
  sideOffset?:  number;
  alignOffset?: number;
  variant?:     HoverCardVariant;
  width?:       string;
  arrow?:       boolean;
}

export interface HoverCardTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

// ─── Context ──────────────────────────────────────────────
interface HoverCardCtx {
  open:       boolean;
  setOpen:    (v: boolean) => void;
  openDelay:  number;
  closeDelay: number;
  disabled:   boolean;
  triggerId:  string;
  contentId:  string;
  triggerRef: React.RefObject<HTMLElement | null>;
  // Shared close timer so trigger + content share the same delay
  closeTimer: React.MutableRefObject<ReturnType<typeof setTimeout> | null>;
  openTimer:  React.MutableRefObject<ReturnType<typeof setTimeout> | null>;
}

const HoverCardContext = React.createContext<HoverCardCtx | undefined>(undefined);

function useHoverCardCtx(): HoverCardCtx {
  const ctx = React.useContext(HoverCardContext);
  if (ctx === undefined)
    throw new Error("HoverCard sub-components must be used inside <HoverCard>");
  return ctx;
}

// ─── Variant styles ───────────────────────────────────────
const VARIANTS: Record<HoverCardVariant, string> = {
  default: [
    "bg-popover text-popover-foreground",
    "border border-border/70",
    "shadow-lg shadow-black/[0.08] dark:shadow-black/30",
  ].join(" "),
  outline: [
    "bg-background text-foreground",
    "border-2 border-border",
    "shadow-md",
  ].join(" "),
  elevated: [
    "bg-popover text-popover-foreground",
    "border border-border/50",
    "shadow-xl shadow-black/[0.12] dark:shadow-black/40",
  ].join(" "),
  glass: [
    "bg-background/80 text-foreground",
    "border border-white/20 dark:border-white/10",
    "backdrop-blur-xl",
    "shadow-xl shadow-black/10",
  ].join(" "),
};

// ─── Position calculation ─────────────────────────────────
// Uses only viewport-relative coordinates — correct for fixed positioning
function calcPosition(
  triggerRect: DOMRect,
  contentRect: DOMRect,
  side:        HoverCardSide,
  align:       HoverCardAlign,
  sideOffset:  number,
  alignOffset: number
): { top: number; left: number } {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const cw = contentRect.width;
  const ch = contentRect.height;
  const tr = triggerRect;

  let top  = 0;
  let left = 0;

  // Primary axis
  switch (side) {
    case "bottom": top  = tr.bottom + sideOffset;        break;
    case "top":    top  = tr.top    - ch - sideOffset;   break;
    case "right":  left = tr.right  + sideOffset;        break;
    case "left":   left = tr.left   - cw - sideOffset;   break;
  }

  // Cross axis alignment
  if (side === "top" || side === "bottom") {
    switch (align) {
      case "center": left = tr.left + tr.width / 2 - cw / 2;  break;
      case "start":  left = tr.left + alignOffset;             break;
      case "end":    left = tr.right - cw - alignOffset;       break;
    }
  }
  if (side === "left" || side === "right") {
    switch (align) {
      case "center": top = tr.top + tr.height / 2 - ch / 2;   break;
      case "start":  top = tr.top + alignOffset;               break;
      case "end":    top = tr.bottom - ch - alignOffset;       break;
    }
  }

  // Clamp to viewport with 8px padding
  left = Math.max(8, Math.min(left, vw - cw - 8));
  top  = Math.max(8, Math.min(top,  vh - ch - 8));

  return { top, left };
}

// ─── HoverCard Root ───────────────────────────────────────
export function HoverCard({
  children,
  openDelay    = 300,
  closeDelay   = 150,
  open:          controlledOpen,
  onOpenChange,
  disabled     = false,
}: HoverCardProps) {
  const [uncontrolled, setUncontrolled] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const open         = isControlled ? controlledOpen : uncontrolled;

  const setOpen = React.useCallback(
    (v: boolean) => {
      if (!isControlled) setUncontrolled(v);
      onOpenChange?.(v);
    },
    [isControlled, onOpenChange]
  );

  const id         = React.useId();
  const triggerId  = `hc-trigger-${id}`;
  const contentId  = `hc-content-${id}`;
  const triggerRef = React.useRef<HTMLElement | null>(null);

  // Shared timers — both trigger and content cancel the same timer
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const openTimer  = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  return (
    <HoverCardContext.Provider
      value={{
        open, setOpen,
        openDelay, closeDelay,
        disabled,
        triggerId, contentId,
        triggerRef,
        closeTimer, openTimer,
      }}
    >
      {children}
    </HoverCardContext.Provider>
  );
}

// ─── HoverCardTrigger ─────────────────────────────────────
export const HoverCardTrigger = React.forwardRef<HTMLElement, HoverCardTriggerProps>(
  ({ children, asChild = false, ...props }, ref) => {
    const ctx = useHoverCardCtx();

    const setRef = (el: HTMLElement | null) => {
      ctx.triggerRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = el;
    };

    const handleMouseEnter = () => {
      if (ctx.disabled) return;
      // Cancel any pending close
      if (ctx.closeTimer.current) clearTimeout(ctx.closeTimer.current);
      // Schedule open
      ctx.openTimer.current = setTimeout(() => ctx.setOpen(true), ctx.openDelay);
    };

    const handleMouseLeave = () => {
      // Cancel pending open
      if (ctx.openTimer.current) clearTimeout(ctx.openTimer.current);
      // Schedule close — content's onMouseEnter will cancel this if user moves there
      ctx.closeTimer.current = setTimeout(() => ctx.setOpen(false), ctx.closeDelay);
    };

    const handlers = {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus:      () => { if (!ctx.disabled) ctx.setOpen(true); },
      onBlur:       () => ctx.setOpen(false),
      id:           ctx.triggerId,
      "aria-describedby": ctx.open ? ctx.contentId : undefined,
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(
        children as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
        { ref: setRef, ...handlers, ...props } as React.HTMLAttributes<HTMLElement>
      );
    }

    return (
      <span
        ref={setRef as React.Ref<HTMLSpanElement>}
        {...handlers}
        {...props}
      >
        {children}
      </span>
    );
  }
);
HoverCardTrigger.displayName = "HoverCardTrigger";

// ─── HoverCardContent ─────────────────────────────────────
export const HoverCardContent = React.forwardRef<HTMLDivElement, HoverCardContentProps>(
  (
    {
      className,
      side        = "bottom",
      align       = "center",
      sideOffset  = 8,
      alignOffset = 0,
      variant     = "default",
      width       = "320px",
      arrow       = false,
      style,
      onMouseEnter,
      onMouseLeave,
      children,
      ...props
    },
    ref
  ) => {
    const ctx        = useHoverCardCtx();
    const contentRef = React.useRef<HTMLDivElement | null>(null);
    const [mounted,  setMounted]  = React.useState(false);
    const [pos,      setPos]      = React.useState<{ top: number; left: number } | null>(null);

    // Portal mount guard
    React.useEffect(() => { setMounted(true); }, []);

    // Position via fixed coords (no scrollY — fixed elements are viewport-relative)
    const recalculate = React.useCallback(() => {
      const triggerEl = ctx.triggerRef.current;
      const contentEl = contentRef.current;
      if (!triggerEl || !contentEl) return;

      const tRect = triggerEl.getBoundingClientRect();
      const cRect = contentEl.getBoundingClientRect();
      const { top, left } = calcPosition(tRect, cRect, side, align, sideOffset, alignOffset);
      setPos({ top, left });
    }, [ctx.triggerRef, side, align, sideOffset, alignOffset]);

    React.useEffect(() => {
      if (!ctx.open) {
        setPos(null);
        return;
      }
      // Two rAF passes: first renders offscreen to get real size, second positions
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(recalculate)
      );

      window.addEventListener("scroll", recalculate, true);
      window.addEventListener("resize", recalculate);
      return () => {
        cancelAnimationFrame(id);
        window.removeEventListener("scroll", recalculate, true);
        window.removeEventListener("resize", recalculate);
      };
    }, [ctx.open, recalculate]);

    const setRef = (el: HTMLDivElement | null) => {
      contentRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      // Cancel the close timer set by trigger's onMouseLeave
      if (ctx.closeTimer.current) clearTimeout(ctx.closeTimer.current);
      ctx.setOpen(true);
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      ctx.closeTimer.current = setTimeout(() => ctx.setOpen(false), ctx.closeDelay);
      onMouseLeave?.(e);
    };

    // Render offscreen (invisible) to measure before positioned
    const isVisible = ctx.open && pos !== null;

    const node = (
      <div
        ref={setRef}
        id={ctx.contentId}
        role="tooltip"
        data-state={ctx.open ? "open" : "closed"}
        data-side={side}
        data-align={align}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "fixed z-50 rounded-2xl",
          "transition-[opacity,transform] duration-150 origin-top",
          isVisible
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none",
          VARIANTS[variant],
          className
        )}
        style={{
          // Render at (0,0) while measuring, jump to real position once measured
          top:    pos?.top  ?? -9999,
          left:   pos?.left ?? -9999,
          width,
          ...style,
        }}
        {...props}
      >
        {children}
        {arrow && <HoverCardArrow side={side} />}
      </div>
    );

    // Always render (even when closed) so the measurement rAF can read its size
    // but keep it visually hidden via opacity-0 + pointer-events-none
    if (!mounted) return null;
    return createPortal(node, document.body);
  }
);
HoverCardContent.displayName = "HoverCardContent";

// ─── Arrow ────────────────────────────────────────────────
function HoverCardArrow({ side }: { side: HoverCardSide }) {
  const classes = {
    bottom: "top-[-5px]    left-1/2 -translate-x-1/2 border-t-0   border-l-transparent border-r-transparent",
    top:    "bottom-[-5px] left-1/2 -translate-x-1/2 border-b-0   border-l-transparent border-r-transparent",
    right:  "left-[-5px]   top-1/2  -translate-y-1/2 border-r-0   border-t-transparent border-b-transparent",
    left:   "right-[-5px]  top-1/2  -translate-y-1/2 border-l-0   border-t-transparent border-b-transparent",
  }[side];

  return (
    <span
      aria-hidden
      className={cn("absolute w-0 h-0 border-[5px] border-border/70", classes)}
    />
  );
}
