"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────
export type KbdVariant = "default" | "outline" | "flat" | "elevated";
export type KbdSize    = "xs" | "sm" | "md" | "lg";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  variant?: KbdVariant;
  size?:    KbdSize;
}

// ─── Styles ───────────────────────────────────────────────
const VARIANTS: Record<KbdVariant, string> = {
  default: [
    "border border-b-2 bg-muted text-muted-foreground",
    "border-border/70 border-b-border/90",
    "dark:bg-zinc-800 dark:border-zinc-600/70 dark:border-b-zinc-500 dark:text-zinc-300",
  ].join(" "),

  outline: [
    "border-2 border-border bg-transparent text-foreground",
    "dark:border-zinc-600 dark:text-zinc-200",
  ].join(" "),

  flat: [
    "bg-muted/80 text-muted-foreground",
    "dark:bg-zinc-800/80 dark:text-zinc-400",
  ].join(" "),

  elevated: [
    "bg-background text-foreground",
    "border border-border/70",
    "shadow-[0_2px_0_0_hsl(var(--border))]",
    "dark:bg-zinc-900 dark:border-zinc-700",
    "dark:shadow-[0_2px_0_0_rgb(63_63_70)]",
    "dark:text-zinc-200",
  ].join(" "),
};

const SIZES: Record<KbdSize, string> = {
  xs: "h-4   min-w-4   px-1   text-[9px]  rounded",
  sm: "h-5   min-w-5   px-1.5 text-[10px] rounded",
  md: "h-6   min-w-6   px-2   text-xs     rounded-md",
  lg: "h-7   min-w-7   px-2.5 text-sm     rounded-md",
};

// ─── Kbd ──────────────────────────────────────────────────
export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => (
    <kbd
      ref={ref as React.Ref<HTMLElement>}
      className={cn(
        "inline-flex items-center justify-center",
        "font-mono font-medium leading-none select-none whitespace-nowrap",
        "transition-colors duration-150",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  )
);
Kbd.displayName = "Kbd";

// ─── KbdShortcut — renders a key combination ──────────────
export interface KbdShortcutProps {
  /** Ordered key labels, e.g. ["⌘", "Shift", "P"] */
  keys:       string[];
  /** Node rendered between keys. Default "+" */
  separator?: React.ReactNode;
  variant?:   KbdVariant;
  size?:      KbdSize;
  className?: string;
}

export function KbdShortcut({
  keys,
  separator = "+",
  variant   = "default",
  size      = "md",
  className,
}: KbdShortcutProps) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      {keys.map((key, i) => (
        <React.Fragment key={`${key}-${i}`}>
          {i > 0 && separator !== null && (
            <span className="text-[10px] text-muted-foreground/50 select-none leading-none font-sans">
              {separator}
            </span>
          )}
          <Kbd variant={variant} size={size}>{key}</Kbd>
        </React.Fragment>
      ))}
    </span>
  );
}

// ─── Common key symbols (convenience export) ──────────────
export const Keys = {
  // Modifiers
  Command:    "⌘",
  Ctrl:       "Ctrl",
  Alt:        "⌥",
  Option:     "⌥",
  Shift:      "⇧",
  Win:        "⊞",
  // Actions
  Enter:      "↵",
  Return:     "⏎",
  Backspace:  "⌫",
  Delete:     "⌦",
  Escape:     "Esc",
  Tab:        "⇥",
  Space:      "Space",
  CapsLock:   "⇪",
  // Navigation
  Up:         "↑",
  Down:       "↓",
  Left:       "←",
  Right:      "→",
  Home:       "⇱",
  End:        "⇲",
  PageUp:     "⇞",
  PageDown:   "⇟",
} as const;
