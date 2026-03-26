"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────
export type AspectRatioPreset =
  | "square"       // 1:1
  | "video"        // 16:9
  | "video-vertical" // 9:16
  | "photo"        // 4:3
  | "photo-wide"   // 3:2
  | "ultrawide"    // 21:9
  | "portrait"     // 2:3
  | "golden"       // 1.618:1
  | "cinema"       // 2.39:1
  | "auto";        // no forced ratio

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Named preset OR a custom numeric ratio (width / height).
   * e.g. ratio={16/9} or ratio="video"
   */
  ratio?:    number | AspectRatioPreset;
  /** Object-fit applied to direct img/video children */
  fit?:      "cover" | "contain" | "fill" | "none" | "scale-down";
  /** Object-position for img/video children */
  position?: string;
}

// ─── Preset map ───────────────────────────────────────────
const PRESETS: Record<Exclude<AspectRatioPreset, "auto">, number> = {
  "square":          1,
  "video":           16 / 9,
  "video-vertical":  9 / 16,
  "photo":           4 / 3,
  "photo-wide":      3 / 2,
  "ultrawide":       21 / 9,
  "portrait":        2 / 3,
  "golden":          1.618,
  "cinema":          2.39,
};

function resolveRatio(ratio: number | AspectRatioPreset | undefined): number | undefined {
  if (ratio === undefined || ratio === "auto") return undefined;
  if (typeof ratio === "number") return ratio;
  return PRESETS[ratio];
}

// ─── AspectRatio ──────────────────────────────────────────
export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  (
    {
      className,
      ratio     = "video",
      fit       = "cover",
      position  = "center",
      style,
      children,
      ...props
    },
    ref
  ) => {
    const resolvedRatio = resolveRatio(ratio);

    return (
      <div
        ref={ref}
        data-ratio={typeof ratio === "string" ? ratio : "custom"}
        className={cn("relative w-full overflow-hidden", className)}
        style={{
          // Use CSS aspect-ratio (modern browsers) with padding-top fallback
          aspectRatio: resolvedRatio ? `${resolvedRatio}` : undefined,
          ...style,
        }}
        {...props}
      >
        {/* Inject fit + position styles into direct img/video children */}
        {React.Children.map(children, child => {
          if (!React.isValidElement(child)) return child;
          const el = child as React.ReactElement<React.HTMLAttributes<HTMLElement>>;
          if (
            typeof el.type === "string" &&
            (el.type === "img" || el.type === "video" || el.type === "iframe")
          ) {
            return React.cloneElement(el, {
              style: {
                position:   "absolute",
                inset:      0,
                width:      "100%",
                height:     "100%",
                objectFit:  fit,
                objectPosition: position,
                ...(el.props.style ?? {}),
              },
            } as React.HTMLAttributes<HTMLElement>);
          }
          return child;
        })}
      </div>
    );
  }
);
AspectRatio.displayName = "AspectRatio";
