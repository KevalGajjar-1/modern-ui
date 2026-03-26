"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────
export type OtpVariant = "default" | "outline" | "filled" | "underline";
export type OtpSize = "sm" | "md" | "lg";
export type OtpStatus = "idle" | "loading" | "success" | "error";

export interface InputOTPProps {
  /** Number of OTP slots */
  length?: number;
  /** Controlled value */
  value?: string;
  /** Uncontrolled default value */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Called when all slots are filled */
  onComplete?: (value: string) => void;
  variant?: OtpVariant;
  size?: OtpSize;
  status?: OtpStatus;
  /** Accept only digits, only letters, or any character */
  pattern?: "numeric" | "alpha" | "alphanumeric" | "any";
  /** Visual separator rendered every N slots. 0 = none */
  separatorAt?: number;
  /** Element rendered as separator */
  separator?: React.ReactNode;
  disabled?: boolean;
  autoFocus?: boolean;
  /** Mask input like a password field */
  mask?: boolean;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  "aria-label"?: string;
}

// ─── Styles ───────────────────────────────────────────────
const SIZE_CELL: Record<OtpSize, string> = {
  sm: "w-8  h-10 text-sm  rounded-lg",
  md: "w-11 h-13 text-lg  rounded-xl",
  lg: "w-14 h-16 text-xl  rounded-2xl",
};

const SIZE_GAP: Record<OtpSize, string> = {
  sm: "gap-1.5",
  md: "gap-2.5",
  lg: "gap-3",
};

const VARIANT_CELL: Record<OtpVariant, { base: string; focus: string; active: string }> = {
  default: {
    base: "border border-input bg-background text-foreground",
    focus: "focus:border-ring focus:outline-2 focus:outline-ring/30",
    active: "border-ring ring-2 ring-ring/30",
  },
  outline: {
    base: "border-2 border-input bg-transparent text-foreground",
    focus: "focus:border-primary focus:outline-0",
    active: "border-primary",
  },
  filled: {
    base: "border border-transparent bg-muted text-foreground",
    focus: "focus:bg-background focus:border-ring focus:outline-2 focus:outline-ring/30",
    active: "bg-background border-ring ring-2 ring-ring/30",
  },
  underline: {
    base: "border-b-2 border-input bg-transparent text-foreground rounded-none",
    focus: "focus:border-primary focus:outline-0",
    active: "border-primary",
  },
};

const STATUS_CELL: Record<OtpStatus, string> = {
  idle: "",
  loading: "opacity-60 cursor-wait",
  success: "border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-700 dark:text-emerald-400",
  error: "border-red-500 ring-2 ring-red-500/20 text-red-700 dark:text-red-400",
};

// Pattern validators
const PATTERNS: Record<NonNullable<InputOTPProps[ "pattern" ]>, RegExp> = {
  numeric: /^[0-9]$/,
  alpha: /^[a-zA-Z]$/,
  alphanumeric: /^[a-zA-Z0-9]$/,
  any: /^.$/,
};

// ─── InputOTP ─────────────────────────────────────────────
export const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  (
    {
      length = 6,
      value: controlledValue,
      defaultValue = "",
      onValueChange,
      onComplete,
      variant = "default",
      size = "md",
      status = "idle",
      pattern = "numeric",
      separatorAt = 0,
      separator = <span className="text-muted-foreground/50 text-lg select-none">–</span>,
      disabled = false,
      autoFocus = false,
      mask = false,
      placeholder = "○",
      className,
      inputClassName,
      "aria-label": ariaLabel = "OTP input",
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [ uncontrolled, setUncontrolled ] = React.useState(
      (defaultValue ?? "").slice(0, length)
    );
    const rawValue = isControlled ? (controlledValue ?? "") : uncontrolled;
    const value = rawValue.slice(0, length);

    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
    const regex = PATTERNS[ pattern ];

    const setValue = (next: string) => {
      if (!isControlled) setUncontrolled(next);
      onValueChange?.(next);
      if (next.length === length) onComplete?.(next);
    };

    // Focus first empty slot (or last on mount)
    const focusSlot = React.useCallback(
      (index: number) => {
        const clamped = Math.max(0, Math.min(index, length - 1));
        inputRefs.current[ clamped ]?.focus();
      },
      [ length ]
    );

    React.useEffect(() => {
      if (autoFocus) focusSlot(value.length);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const raw = e.target.value;
      const char = raw.slice(-1); // last typed char
      if (!char || !regex.test(char)) return;

      const arr = value.split("");
      arr[ index ] = char;
      const next = arr.join("").slice(0, length);
      setValue(next);

      // Advance focus
      if (index < length - 1) focusSlot(index + 1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        if (value[ index ]) {
          // Clear current slot
          const arr = value.split("");
          arr[ index ] = "";
          setValue(arr.join(""));
        } else if (index > 0) {
          // Move back and clear
          const arr = value.split("");
          arr[ index - 1 ] = "";
          setValue(arr.join(""));
          focusSlot(index - 1);
        }
        return;
      }
      if (e.key === "Delete") {
        e.preventDefault();
        const arr = value.split("");
        arr[ index ] = "";
        setValue(arr.join(""));
        return;
      }
      if (e.key === "ArrowLeft") { e.preventDefault(); focusSlot(index - 1); return; }
      if (e.key === "ArrowRight") { e.preventDefault(); focusSlot(index + 1); return; }
      if (e.key === "Home") { e.preventDefault(); focusSlot(0); return; }
      if (e.key === "End") { e.preventDefault(); focusSlot(length - 1); return; }
    };

    // Handle paste
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").split("").filter(c => regex.test(c));
      const arr = value.split("");
      pasted.forEach((char, i) => { if (index + i < length) arr[ index + i ] = char; });
      const next = arr.join("").slice(0, length);
      setValue(next);
      focusSlot(Math.min(index + pasted.length, length - 1));
    };

    const v = VARIANT_CELL[ variant ];

    return (
      <div
        ref={ ref }
        role="group"
        aria-label={ ariaLabel }
        data-status={ status }
        className={ cn("flex items-center", SIZE_GAP[ size ], className) }
      >
        { Array.from({ length }).map((_, i) => {
          const char = value[ i ] ?? "";
          const isFocus = false; // tracked by browser focus
          const isActive = !!char;

          return (
            <React.Fragment key={ i }>
              { separatorAt > 0 && i > 0 && i % separatorAt === 0 && (
                <span aria-hidden className="flex items-center px-0.5">
                  { separator }
                </span>
              ) }
              <input
                ref={ el => { inputRefs.current[ i ] = el; } }
                type={ mask ? "password" : "text" }
                inputMode={ pattern === "numeric" ? "numeric" : "text" }
                maxLength={ 2 }
                value={ mask ? (char ? "•" : "") : char }
                placeholder={ !char ? placeholder : undefined }
                disabled={ disabled || status === "loading" }
                aria-label={ `Digit ${i + 1} of ${length}` }
                autoComplete="one-time-code"
                onChange={ e => handleChange(e, i) }
                onKeyDown={ e => handleKeyDown(e, i) }
                onPaste={ e => handlePaste(e, i) }
                onFocus={ e => e.target.select() }
                className={ cn(
                  // Base layout
                  "flex items-center justify-center text-center font-semibold",
                  "outline-none transition-all duration-150 caret-transparent",
                  "placeholder:text-muted-foreground/30",
                  // Disabled
                  "disabled:cursor-not-allowed disabled:opacity-40",
                  // Size
                  SIZE_CELL[ size ],
                  // Variant
                  v.base, v.focus,
                  // Active (has value)
                  isActive && v.active,
                  // Status
                  STATUS_CELL[ status ],
                  inputClassName
                ) }
              />
            </React.Fragment>
          );
        }) }
      </div>
    );
  }
);
InputOTP.displayName = "InputOTP";

// ─── InputOTPGroup — convenience wrapper ─────────────────
export function InputOTPGroup({
  className,
  label,
  description,
  status,
  statusMessage,
  children,
}: {
  className?: string;
  label?: string;
  description?: string;
  status?: OtpStatus;
  statusMessage?: string;
  children: React.ReactNode;
}) {
  const statusColor = {
    idle: "text-muted-foreground",
    loading: "text-muted-foreground animate-pulse",
    success: "text-emerald-600 dark:text-emerald-400",
    error: "text-red-600 dark:text-red-400",
  }[ status ?? "idle" ];

  return (
    <div className={ cn("flex flex-col items-center gap-3", className) }>
      { label && (
        <p className="text-sm font-medium text-foreground">{ label }</p>
      ) }
      { description && (
        <p className="text-xs text-muted-foreground text-center max-w-xs">{ description }</p>
      ) }
      { children }
      { statusMessage && (
        <p className={ cn("text-xs font-medium", statusColor) }>{ statusMessage }</p>
      ) }
    </div>
  );
}
