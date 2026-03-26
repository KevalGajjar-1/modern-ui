"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────
export type ProgressVariant = "default" | "success" | "error" | "warning" | "info";
export type ProgressSize = "xs" | "sm" | "md" | "lg";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0–100 */
  value?: number;
  /** Show indeterminate animation */
  indeterminate?: boolean;
  variant?: ProgressVariant;
  size?: ProgressSize;
  /** Show percentage label inside/above bar */
  showLabel?: boolean;
  labelPosition?: "inside" | "above" | "right";
  /** Custom label */
  label?: string;
  /** Animate fill on mount */
  animate?: boolean;
  /** Rounded pill ends */
  rounded?: boolean;
  /** Striped pattern */
  striped?: boolean;
  /** Animate stripes */
  animateStripes?: boolean;
  className?: string;
  trackClassName?: string;
  fillClassName?: string;
}

// ─── Constants ────────────────────────────────────────────
const SIZE_CLASSES: Record<ProgressSize, string> = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

const LABEL_TEXT: Record<ProgressSize, string> = {
  xs: "text-[9px]",
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-xs",
};

const FILL_VARIANTS: Record<ProgressVariant, string> = {
  default: "bg-primary",
  success: "bg-emerald-500",
  error: "bg-red-500",
  warning: "bg-amber-500",
  info: "bg-blue-500",
};

// ─── Progress ─────────────────────────────────────────────
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      indeterminate = false,
      variant = "default",
      size = "md",
      showLabel = false,
      labelPosition = "right",
      label,
      animate = true,
      rounded = true,
      striped = false,
      animateStripes = false,
      className,
      trackClassName,
      fillClassName,
      ...props
    },
    ref
  ) => {
    const clamped = Math.min(100, Math.max(0, value));

    // Mount animation — start at 0 then transition to real value
    const [ displayValue, setDisplayValue ] = React.useState(animate ? 0 : clamped);
    React.useEffect(() => {
      if (!animate) { setDisplayValue(clamped); return; }
      const id = requestAnimationFrame(() => setDisplayValue(clamped));
      return () => cancelAnimationFrame(id);
    }, [ clamped, animate ]);

    const labelText = label ?? `${Math.round(clamped)}%`;

    const fillBase = cn(
      "h-full transition-[width] duration-500 ease-out",
      FILL_VARIANTS[ variant ],
      rounded ? "rounded-full" : "",
      // Striped overlay
      striped && [
        "bg-[length:1rem_1rem]",
        "bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)]",
        animateStripes && "animate-[progress-stripes_1s_linear_infinite]",
      ],
      fillClassName
    );

    const trackBase = cn(
      "relative w-full overflow-hidden bg-muted/60",
      SIZE_CLASSES[ size ],
      rounded ? "rounded-full" : "rounded-sm",
      trackClassName
    );

    const bar = (
      <div className={ trackBase }>
        { indeterminate ? (
          <div
            className={ cn(
              fillBase,
              "w-1/3 absolute animate-[progress-indeterminate_1.4s_ease-in-out_infinite]"
            ) }
          />
        ) : (
          <div
            role="progressbar"
            aria-valuenow={ clamped }
            aria-valuemin={ 0 }
            aria-valuemax={ 100 }
            className={ cn(fillBase, size === "lg" && showLabel && labelPosition === "inside" && "flex items-center justify-end pr-2") }
            style={ { width: `${displayValue}%` } }
          >
            {/* Inside label (lg only) */ }
            { showLabel && labelPosition === "inside" && size === "lg" && displayValue > 15 && (
              <span className={ cn("text-white font-semibold leading-none", LABEL_TEXT[ size ]) }>
                { labelText }
              </span>
            ) }
          </div>
        ) }
      </div>
    );

    if (!showLabel || labelPosition === "inside") {
      return (
        <div ref={ ref } className={ cn("w-full", className) } { ...props }>
          { bar }
        </div>
      );
    }

    if (labelPosition === "above") {
      return (
        <div ref={ ref } className={ cn("w-full flex flex-col gap-1.5", className) } { ...props }>
          <div className="flex items-center justify-between">
            <span className={ cn("text-muted-foreground font-medium", LABEL_TEXT[ size ]) }>
              { labelText }
            </span>
          </div>
          { bar }
        </div>
      );
    }

    // right
    return (
      <div ref={ ref } className={ cn("flex items-center gap-3", className) } { ...props }>
        <div className="flex-1">{ bar }</div>
        <span className={ cn(
          "shrink-0 font-medium tabular-nums text-muted-foreground",
          LABEL_TEXT[ size ]
        ) }>
          { labelText }
        </span>
      </div>
    );
  }
);
Progress.displayName = "Progress";
