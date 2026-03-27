"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────
export type SpinnerVariant = "ring" | "dual" | "dots" | "pulse" | "bars";
export type SpinnerSize    = "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerSpeed   = "slow" | "normal" | "fast";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:    SpinnerVariant;
  size?:       SpinnerSize;
  speed?:      SpinnerSpeed;
  /** Accessible label read by screen readers. Default "Loading…" */
  label?:      string;
  /** Show label text visually beside the spinner */
  showLabel?:  boolean;
}

// ─── Self-contained CSS keyframes ─────────────────────────
// Prefixed with _sp- to avoid Tailwind conflicts
const KEYFRAMES = `
  @keyframes _sp-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes _sp-spin-rev {
    to { transform: rotate(-360deg); }
  }
  @keyframes _sp-bounce {
    0%, 60%, 100% { transform: translateY(0);    opacity: 1;   }
    30%           { transform: translateY(-45%); opacity: 0.6; }
  }
  @keyframes _sp-ping {
    0%        { transform: scale(0.85); opacity: 0.9; }
    75%, 100% { transform: scale(2.2);  opacity: 0;   }
  }
  @keyframes _sp-bar {
    0%, 40%, 100% { transform: scaleY(0.35); }
    20%           { transform: scaleY(1.0);  }
  }
`;

// ─── Size maps ────────────────────────────────────────────
const RING_BOX: Record<SpinnerSize, string> = {
  xs: "w-3.5  h-3.5  border-2",
  sm: "w-4    h-4    border-2",
  md: "w-6    h-6    border-[3px]",
  lg: "w-8    h-8    border-[3px]",
  xl: "w-12   h-12   border-4",
};

const DOT_GAP:  Record<SpinnerSize, string> = { xs:"gap-0.5", sm:"gap-0.5", md:"gap-1", lg:"gap-1.5", xl:"gap-2" };
const DOT_SIZE: Record<SpinnerSize, string> = { xs:"w-1 h-1", sm:"w-1.5 h-1.5", md:"w-2 h-2", lg:"w-2.5 h-2.5", xl:"w-3.5 h-3.5" };

const PULSE_BOX: Record<SpinnerSize, string> = { xs:"w-3 h-3", sm:"w-4 h-4", md:"w-5 h-5", lg:"w-7 h-7", xl:"w-10 h-10" };
const PULSE_DOT: Record<SpinnerSize, string> = { xs:"w-1.5 h-1.5", sm:"w-2 h-2", md:"w-2.5 h-2.5", lg:"w-3.5 h-3.5", xl:"w-5 h-5" };

const BAR_H:    Record<SpinnerSize, string> = { xs:"h-2.5", sm:"h-3", md:"h-4", lg:"h-5", xl:"h-7" };
const BAR_W:    Record<SpinnerSize, string> = { xs:"w-0.5", sm:"w-0.5", md:"w-[3px]", lg:"w-1", xl:"w-1.5" };
const BAR_GAP:  Record<SpinnerSize, string> = { xs:"gap-0.5", sm:"gap-0.5", md:"gap-[3px]", lg:"gap-1", xl:"gap-1.5" };

const LABEL_TEXT: Record<SpinnerSize, string> = { xs:"text-[10px]", sm:"text-xs", md:"text-sm", lg:"text-base", xl:"text-lg" };

const SPEED_DUR: Record<SpinnerSpeed, string> = { slow: "1.1s", normal: "0.65s", fast: "0.38s" };

// ─── Sub-spinners ─────────────────────────────────────────
function RingSpinner({ size }: { size: SpinnerSize }) {
  return (
    <span
      className={cn(
        "block rounded-full",
        "border-current/20 border-t-current",
        RING_BOX[size]
      )}
      style={{ animation: "_sp-spin var(--sp-dur) linear infinite" }}
    />
  );
}

function DualSpinner({ size }: { size: SpinnerSize }) {
  const [box] = RING_BOX[size].split(" border");
  return (
    <span className={cn("relative block", box)}>
      {/* Outer ring */}
      <span
        className={cn(
          "absolute inset-0 block rounded-full",
          "border-current/20 border-t-current",
          RING_BOX[size]
        )}
        style={{ animation: "_sp-spin var(--sp-dur) linear infinite" }}
      />
      {/* Inner ring — reversed */}
      <span
        className={cn(
          "absolute inset-[22%] block rounded-full",
          "border-current/25 border-b-current",
          size === "xs" || size === "sm" ? "border-[1.5px]" :
          size === "md" ? "border-2" :
          size === "lg" ? "border-[2.5px]" : "border-[3px]"
        )}
        style={{ animation: "_sp-spin-rev var(--sp-dur) linear infinite" }}
      />
    </span>
  );
}

function DotsSpinner({ size }: { size: SpinnerSize }) {
  return (
    <span className={cn("flex items-center", DOT_GAP[size])}>
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className={cn("block rounded-full bg-current", DOT_SIZE[size])}
          style={{
            animation: "_sp-bounce var(--sp-dur) ease-in-out infinite",
            animationDelay: `${i * 0.14}s`,
          }}
        />
      ))}
    </span>
  );
}

function PulseSpinner({ size }: { size: SpinnerSize }) {
  return (
    <span className={cn("relative flex items-center justify-center", PULSE_BOX[size])}>
      <span
        className={cn("absolute rounded-full bg-current/35", PULSE_BOX[size])}
        style={{ animation: "_sp-ping var(--sp-dur-pulse) ease-out infinite" }}
      />
      <span className={cn("relative rounded-full bg-current", PULSE_DOT[size])} />
    </span>
  );
}

function BarsSpinner({ size }: { size: SpinnerSize }) {
  return (
    <span className={cn("flex items-end", BAR_GAP[size])}>
      {[0, 1, 2, 3, 4].map(i => (
        <span
          key={i}
          className={cn("block rounded-sm bg-current origin-bottom", BAR_H[size], BAR_W[size])}
          style={{
            animation: "_sp-bar var(--sp-dur) ease-in-out infinite",
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </span>
  );
}

// ─── Spinner ──────────────────────────────────────────────
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  (
    {
      className,
      variant   = "ring",
      size      = "md",
      speed     = "normal",
      label     = "Loading…",
      showLabel = false,
      style,
      ...props
    },
    ref
  ) => {
    const inner = {
      ring:  <RingSpinner  size={size} />,
      dual:  <DualSpinner  size={size} />,
      dots:  <DotsSpinner  size={size} />,
      pulse: <PulseSpinner size={size} />,
      bars:  <BarsSpinner  size={size} />,
    }[variant];

    return (
      <>
        <style suppressHydrationWarning>{KEYFRAMES}</style>
        <span
          ref={ref}
          role="status"
          aria-label={label}
          aria-live="polite"
          className={cn("inline-flex items-center gap-2", className)}
          style={{
            "--sp-dur":       SPEED_DUR[speed],
            "--sp-dur-pulse": speed === "slow" ? "1.8s" : speed === "fast" ? "0.7s" : "1.2s",
            ...style,
          } as React.CSSProperties}
          {...props}
        >
          {inner}
          {showLabel
            ? <span className={cn("text-muted-foreground font-medium", LABEL_TEXT[size])}>{label}</span>
            : <span className="sr-only">{label}</span>
          }
        </span>
      </>
    );
  }
);
Spinner.displayName = "Spinner";

// ─── Overlay spinner (full-page loading state) ────────────
export interface OverlaySpinnerProps {
  visible?:  boolean;
  label?:    string;
  variant?:  SpinnerVariant;
  size?:     SpinnerSize;
  blur?:     boolean;
}

export function OverlaySpinner({
  visible = true,
  label   = "Loading…",
  variant = "ring",
  size    = "xl",
  blur    = true,
}: OverlaySpinnerProps) {
  if (!visible) return null;
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center gap-4",
        "bg-background/75",
        blur && "backdrop-blur-sm"
      )}
      role="dialog"
      aria-modal
      aria-label={label}
    >
      <Spinner variant={variant} size={size} label={label} />
      <p className="text-sm text-muted-foreground animate-pulse">{label}</p>
    </div>
  );
}

// ─── InlineSpinner — drop-in for button loading states ────
export function InlineSpinner({
  size  = "sm",
  speed = "normal",
  className,
}: Pick<SpinnerProps, "size" | "speed" | "className">) {
  return (
    <Spinner
      variant="ring"
      size={size}
      speed={speed}
      label="Loading…"
      className={cn("text-current", className)}
    />
  );
}
