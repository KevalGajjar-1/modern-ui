"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

// ─── Types ────────────────────────────────────────────────
export type NativeSelectVariant = "default" | "outline" | "filled" | "ghost" | "underline";
export type NativeSelectSize    = "xs" | "sm" | "md" | "lg" | "xl";

export interface NativeSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  variant?:     NativeSelectVariant;
  size?:        NativeSelectSize;
  /** Error state — red border */
  error?:       boolean;
  /** Success state — green border */
  success?:     boolean;
  /** Icon shown on the left side */
  leftIcon?:    React.ReactNode;
  /** Override the default ChevronDown icon */
  rightIcon?:   React.ReactNode;
  /** Hide the caret icon entirely */
  hideIcon?:    boolean;
  placeholder?: string;
  /** Wrapper className */
  wrapperClassName?: string;
}

// ─── Styles ───────────────────────────────────────────────
const VARIANTS: Record<NativeSelectVariant, string> = {
  default: [
    "border border-input bg-background text-foreground",
    "hover:border-ring/60",
    "focus:border-ring focus:outline-2 focus:outline-ring/25",
    "dark:bg-background dark:border-input",
  ].join(" "),

  outline: [
    "border-2 border-input bg-transparent text-foreground",
    "hover:border-foreground/40",
    "focus:border-primary focus:outline-0",
  ].join(" "),

  filled: [
    "border border-transparent bg-muted text-foreground",
    "hover:bg-muted/70",
    "focus:bg-background focus:border-ring focus:outline-2 focus:outline-ring/25",
    "dark:bg-muted/60",
  ].join(" "),

  ghost: [
    "border border-transparent bg-transparent text-foreground",
    "hover:bg-muted/60",
    "focus:bg-muted/40 focus:border-transparent focus:outline-0",
  ].join(" "),

  underline: [
    "border-0 border-b-2 border-input bg-transparent text-foreground",
    "rounded-none px-0",
    "hover:border-foreground/40",
    "focus:border-primary focus:outline-0",
  ].join(" "),
};

const SIZES: Record<NativeSelectSize, { wrapper: string; select: string; icon: string; left: string }> = {
  xs: { wrapper: "h-7",  select: "text-xs  px-2.5 py-1",   icon: "h-3 w-3",   left: "pl-7"   },
  sm: { wrapper: "h-8",  select: "text-sm  px-3   py-1.5", icon: "h-3.5 w-3.5",left: "pl-8"  },
  md: { wrapper: "h-10", select: "text-sm  px-3.5 py-2",   icon: "h-4 w-4",   left: "pl-9"   },
  lg: { wrapper: "h-11", select: "text-base px-4  py-2.5", icon: "h-4.5 w-4.5",left: "pl-11" },
  xl: { wrapper: "h-12", select: "text-base px-4.5 py-3",  icon: "h-5 w-5",   left: "pl-12"  },
};

const CARET_OFFSET: Record<NativeSelectSize, string> = {
  xs: "pr-6",
  sm: "pr-7",
  md: "pr-9",
  lg: "pr-10",
  xl: "pr-11",
};

// ─── NativeSelect ─────────────────────────────────────────
export const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    {
      className,
      wrapperClassName,
      variant       = "default",
      size          = "md",
      error         = false,
      success       = false,
      leftIcon,
      rightIcon,
      hideIcon      = false,
      placeholder,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const s = SIZES[size];

    const stateClass = error
      ? "border-red-500 focus:border-red-500 focus:outline-red-500/25 dark:border-red-500"
      : success
      ? "border-emerald-500 focus:border-emerald-500 "
      : "";

    return (
      <div
        data-variant={variant}
        data-size={size}
        className={cn(
          "relative flex items-center w-full",
          s.wrapper,
          disabled && "opacity-50 cursor-not-allowed",
          wrapperClassName
        )}
      >
        {/* Left icon */}
        {leftIcon && (
          <span
            className={cn(
              "pointer-events-none absolute left-3 flex items-center justify-center text-muted-foreground",
              s.icon
            )}
          >
            {leftIcon}
          </span>
        )}

        <select
          ref={ref}
          disabled={disabled}
          className={cn(
            // Reset
            "w-full appearance-none outline-none cursor-pointer",
            "transition-all duration-150",
            "rounded-xl",
            // Disabled
            "disabled:cursor-not-allowed",
            // Placeholder color
            "[&>option:disabled]:text-muted-foreground",
            // Variant
            VARIANTS[variant],
            // Size
            s.select,
            // Left icon pad
            leftIcon && s.left,
            // Right icon pad
            !hideIcon && CARET_OFFSET[size],
            // State
            stateClass,
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {children}
        </select>

        {/* Right caret icon */}
        {!hideIcon && (
          <span
            className={cn(
              "pointer-events-none absolute right-2.5 flex items-center justify-center",
              "text-muted-foreground transition-transform duration-150",
              s.icon
            )}
            aria-hidden
          >
            {rightIcon ?? <ChevronDown className={s.icon} />}
          </span>
        )}
      </div>
    );
  }
);
NativeSelect.displayName = "NativeSelect";

// ─── NativeSelectOption ───────────────────────────────────
export function NativeSelectOption({
  className,
  ...props
}: React.OptionHTMLAttributes<HTMLOptionElement>) {
  return (
    <option
      className={cn("bg-background text-foreground", className)}
      {...props}
    />
  );
}

// ─── NativeSelectGroup ────────────────────────────────────
export function NativeSelectGroup({
  className,
  ...props
}: React.OptgroupHTMLAttributes<HTMLOptGroupElement>) {
  return (
    <optgroup
      className={cn(
        "font-semibold text-muted-foreground bg-muted/40",
        className
      )}
      {...props}
    />
  );
}
