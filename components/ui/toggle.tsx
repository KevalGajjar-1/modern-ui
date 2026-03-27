"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────
export type ToggleVariant = "default" | "outline" | "ghost" | "soft" | "solid";
export type ToggleSize    = "xs" | "sm" | "md" | "lg" | "xl";

export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /** Controlled pressed state */
  pressed?: boolean;
  /** Initial pressed state (uncontrolled) */
  defaultPressed?: boolean;
  /** Callback when pressed state changes */
  onPressedChange?: (pressed: boolean) => void;
  variant?: ToggleVariant;
  size?: ToggleSize;
  /** Render as a different element (e.g. span inside a group) */
  asChild?: boolean;
}

// ─── Style definitions ────────────────────────────────────
const BASE = [
  // Layout
  "relative inline-flex items-center justify-center gap-1.5",
  "whitespace-nowrap font-medium select-none cursor-pointer",
  // Transitions
  "transition-all duration-150 ease-in-out",
  // Focus ring
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  // Disabled
  "disabled:pointer-events-none disabled:opacity-40",
  // SVG passthrough
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-none",
].join(" ");

const VARIANTS: Record<ToggleVariant, { base: string; on: string; dark: string; darkOn: string }> = {
  default: {
    base:   "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground rounded-md",
    on:     "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
    dark:   "dark:hover:bg-muted/60",
    darkOn: "dark:data-[state=on]:bg-accent/80",
  },
  outline: {
    base:   "border border-input bg-transparent text-muted-foreground hover:bg-accent/40 hover:text-foreground hover:border-input/80 rounded-md",
    on:     "data-[state=on]:border-primary/50 data-[state=on]:bg-primary/[0.08] data-[state=on]:text-primary",
    dark:   "dark:border-input/70 dark:hover:bg-accent/30",
    darkOn: "dark:data-[state=on]:bg-primary/[0.15] dark:data-[state=on]:text-primary",
  },
  ghost: {
    base:   "bg-transparent text-muted-foreground hover:bg-muted/80 hover:text-foreground rounded-md",
    on:     "data-[state=on]:bg-muted data-[state=on]:text-foreground",
    dark:   "dark:hover:bg-muted/40",
    darkOn: "dark:data-[state=on]:bg-muted/60",
  },
  soft: {
    base:   "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground rounded-md",
    on:     "data-[state=on]:bg-primary/[0.12] data-[state=on]:text-primary",
    dark:   "dark:bg-muted/30 dark:hover:bg-muted/50",
    darkOn: "dark:data-[state=on]:bg-primary/[0.18] dark:data-[state=on]:text-primary",
  },
  solid: {
    base:   "bg-muted text-foreground hover:bg-muted/80 rounded-md shadow-sm",
    on:     "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-md",
    dark:   "dark:bg-muted/40 dark:hover:bg-muted/60",
    darkOn: "dark:data-[state=on]:bg-primary dark:data-[state=on]:text-primary-foreground",
  },
};

const SIZES: Record<ToggleSize, string> = {
  xs: "h-6  min-w-6  px-1.5 text-[11px] rounded-md [&_svg]:h-3   [&_svg]:w-3",
  sm: "h-7  min-w-7  px-2   text-xs     rounded-md [&_svg]:h-3.5 [&_svg]:w-3.5",
  md: "h-9  min-w-9  px-3   text-sm     rounded-md [&_svg]:h-4   [&_svg]:w-4",
  lg: "h-10 min-w-10 px-3.5 text-sm     rounded-md [&_svg]:h-4.5 [&_svg]:w-4.5",
  xl: "h-11 min-w-11 px-4   text-base   rounded-lg [&_svg]:h-5   [&_svg]:w-5",
};

// ─── Component ────────────────────────────────────────────
export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      pressed: controlledPressed,
      defaultPressed = false,
      onPressedChange,
      onClick,
      onKeyDown,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Controlled vs uncontrolled
    const [uncontrolled, setUncontrolled] = React.useState(defaultPressed);
    const isControlled = controlledPressed !== undefined;
    const pressed      = isControlled ? controlledPressed : uncontrolled;

    const toggle = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;
        const next = !pressed;
        if (!isControlled) setUncontrolled(next);
        onPressedChange?.(next);
        if (e.type === "click") onClick?.(e as React.MouseEvent<HTMLButtonElement>);
      },
      [disabled, isControlled, pressed, onPressedChange, onClick]
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        toggle(e);
      }
      onKeyDown?.(e);
    };

    const v = VARIANTS[variant];

    return (
      <button
        ref={ref}
        type="button"
        role="button"
        aria-pressed={pressed}
        data-state={pressed ? "on" : "off"}
        data-variant={variant}
        data-disabled={disabled ? "" : undefined}
        disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={toggle as React.MouseEventHandler<HTMLButtonElement>}
        onKeyDown={handleKeyDown}
        className={cn(
          BASE,
          v.base,
          v.on,
          v.dark,
          v.darkOn,
          SIZES[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Toggle.displayName = "Toggle";
