"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, X, ChevronDown } from "lucide-react";
import { Calendar, DateRange, CalendarProps } from "@/components/ui/calendar";

// ─── Types ────────────────────────────────────────────────
export type DatePickerMode = "single" | "range" | "multiple";

export interface DatePickerProps
  extends Omit<CalendarProps, "mode" | "selected" | "onSelect" | "inline" | "disabled"> {
  mode?: DatePickerMode;
  value?: Date | Date[] | DateRange;
  onChange?: (value: Date | Date[] | DateRange | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  datesDisabled?: Date[] | ((date: Date) => boolean);
  clearable?: boolean;
  formatDate?: (date: Date) => string;
  formatRange?: (from?: Date, to?: Date) => string;
  align?: "left" | "right" | "center";
  size?: "sm" | "md" | "lg";
  triggerClassName?: string;
  popoverClassName?: string;
  className?: string;
  name?: string;
  required?: boolean;
  error?: boolean;
  "aria-label"?: string;
}

// ─── Helpers ──────────────────────────────────────────────
const DEFAULT_FORMAT = (d: Date) =>
  d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

const DEFAULT_RANGE_FORMAT = (from?: Date, to?: Date) => {
  if (!from && !to) return "";
  if (from && !to) return DEFAULT_FORMAT(from) + " →";
  if (!from && to) return "→ " + DEFAULT_FORMAT(to!);
  return DEFAULT_FORMAT(from!) + " – " + DEFAULT_FORMAT(to!);
};

const SIZE_CLASSES = {
  sm: "h-8  px-3   text-xs  rounded-xl  gap-1.5",
  md: "h-10 px-3.5 text-sm  rounded-xl  gap-2",
  lg: "h-12 px-4   text-base rounded-2xl gap-2.5",
} as const;

const ICON_SIZES = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
} as const;

// ─── DatePicker ───────────────────────────────────────────
export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      mode = "single",
      value,
      onChange,
      placeholder,
      disabled = false,
      clearable = true,
      formatDate = DEFAULT_FORMAT,
      formatRange = DEFAULT_RANGE_FORMAT,
      align = "left",
      size = "md",
      triggerClassName,
      popoverClassName,
      className,
      name,
      required,
      error = false,
      "aria-label": ariaLabel,
      // Calendar passthrough
      fromDate,
      toDate,
      weekStartsOn,
      showWeekNumbers,
      numberOfMonths,
      defaultMonth,
      month,
      onMonthChange,
      renderDay,
      classNames,
      showOutsideDays,
    },
    ref
  ) => {
    const [ open, setOpen ] = React.useState(false);
    const [ popStyle, setPopStyle ] = React.useState<React.CSSProperties>({});
    const [ mounted, setMounted ] = React.useState(false);

    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);
    const popoverRef = React.useRef<HTMLDivElement | null>(null);

    // Portal mount guard
    React.useEffect(() => { setMounted(true); }, []);

    const isDisabled = typeof disabled === "boolean" ? disabled : false;
    const calDisabled = typeof disabled !== "boolean" ? disabled : undefined;

    // ── Display value ──────────────────────────────────────
    const displayValue = React.useMemo(() => {
      if (!value) return "";

      if (mode === "single") {
        const d = value as Date;
        return d instanceof Date && !isNaN(d.getTime()) ? formatDate(d) : "";
      }
      if (mode === "multiple") {
        const arr = value as Date[];
        if (!arr.length) return "";
        return arr.length === 1
          ? formatDate(arr[ 0 ])
          : `${formatDate(arr[ 0 ])} +${arr.length - 1}`;
      }
      if (mode === "range") {
        const { from, to } = value as DateRange;
        return formatRange(from, to);
      }
      return "";
    }, [ value, mode, formatDate, formatRange ]);

    const hasValue = Boolean(
      mode === "single" ? value :
        mode === "multiple" ? (value as Date[] | undefined)?.length :
          (value as DateRange | undefined)?.from
    );

    // ── Position popover via getBoundingClientRect ─────────
    // Uses fixed positioning WITHOUT scrollY — correct for fixed elements
    const positionPopover = React.useCallback(() => {
      const trigger = triggerRef.current;
      if (!trigger) return;

      const rect = trigger.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const spaceBelow = vh - rect.bottom;
      const spaceAbove = rect.top;
      const openAbove = spaceBelow < 340 && spaceAbove > spaceBelow;

      const style: React.CSSProperties = {
        position: "fixed",
        zIndex: 9999,
      };

      // Vertical
      if (openAbove) {
        style.bottom = vh - rect.top + 6;
      } else {
        style.top = rect.bottom + 6;
      }

      // Horizontal
      if (align === "right") {
        style.right = vw - rect.right;
      } else if (align === "center") {
        style.left = rect.left + rect.width / 2;
        style.transform = "translateX(-50%)";
      } else {
        // "left" — clamp so it doesn't overflow viewport right edge
        const left = rect.left;
        style.left = Math.min(left, vw - 320); // 320 = min popover width
      }

      setPopStyle(style);
    }, [ align ]);

    React.useEffect(() => {
      if (!open) return;
      positionPopover();

      // Reposition on scroll or resize
      window.addEventListener("scroll", positionPopover, true);
      window.addEventListener("resize", positionPopover);
      return () => {
        window.removeEventListener("scroll", positionPopover, true);
        window.removeEventListener("resize", positionPopover);
      };
    }, [ open, positionPopover ]);

    // ── Outside click ──────────────────────────────────────
    React.useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          containerRef.current?.contains(target) ||
          popoverRef.current?.contains(target)
        ) return;
        setOpen(false);
      };
      // Use capture so it fires before any stopPropagation inside
      document.addEventListener("mousedown", handler, true);
      return () => document.removeEventListener("mousedown", handler, true);
    }, [ open ]);

    // ── Escape key ─────────────────────────────────────────
    React.useEffect(() => {
      if (!open) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setOpen(false);
          triggerRef.current?.focus();
        }
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [ open ]);

    // ── Selection handler ──────────────────────────────────
    const handleSelect = (val: Date | Date[] | DateRange | undefined) => {
      onChange?.(val);
      if (mode === "single") {
        setOpen(false);
      }
      if (mode === "range") {
        const r = val as DateRange | undefined;
        if (r?.from && r?.to) setOpen(false);
      }
      // multiple: stays open
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(
        mode === "multiple" ? [] :
          mode === "range" ? {} :
            undefined
      );
    };

    // Merge forwarded ref
    const setRef = React.useCallback(
      (el: HTMLDivElement | null) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      },
      [ ref ]
    );

    // ── Popover node ───────────────────────────────────────
    const popoverNode = open && (
      <div
        ref={ popoverRef }
        role="dialog"
        aria-modal={ false }
        aria-label={ ariaLabel ?? "Date picker" }
        style={ popStyle }
        className={ cn(
          "animate-in fade-in zoom-in-95 duration-150 origin-top-left",
          "rounded-2xl border border-border/60 bg-popover shadow-xl shadow-black/10",
          "dark:shadow-black/30",
          popoverClassName
        ) }
        // Prevent mousedown from bubbling to the outside-click handler
        onMouseDown={ e => e.stopPropagation() }
      >
        <Calendar
          mode={ mode }
          selected={ value }
          onSelect={ handleSelect }
          disabled={ calDisabled }
          fromDate={ fromDate }
          toDate={ toDate }
          weekStartsOn={ weekStartsOn }
          showWeekNumbers={ showWeekNumbers }
          numberOfMonths={ numberOfMonths }
          defaultMonth={
            defaultMonth ??
            (value instanceof Date ? value : undefined)
          }
          month={ month }
          onMonthChange={ onMonthChange }
          renderDay={ renderDay }
          classNames={ classNames }
          showOutsideDays={ showOutsideDays }
        />
      </div>
    );

    return (
      <div
        ref={ setRef }
        className={ cn("relative inline-block", className) }
      >
        {/* Hidden form input */ }
        { name && mode === "single" && (
          <input
            type="hidden"
            name={ name }
            value={ (value as Date | undefined)?.toISOString() ?? "" }
            required={ required }
          />
        ) }

        {/* Trigger */ }
        <button
          ref={ triggerRef }
          type="button"
          aria-label={ ariaLabel ?? placeholder ?? "Pick a date" }
          aria-expanded={ open }
          aria-haspopup="dialog"
          disabled={ isDisabled }
          onClick={ () => !isDisabled && setOpen(v => !v) }
          className={ cn(
            "inline-flex items-center border bg-background text-left",
            "font-medium transition-all duration-150 w-full",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
            SIZE_CLASSES[ size ],
            error
              ? "border-red-400 dark:border-red-600 focus-visible:ring-red-400"
              : "border-input hover:border-ring/60",
            open && !error && "border-ring ring-2 ring-ring/25",
            isDisabled && "opacity-50 pointer-events-none cursor-not-allowed",
            triggerClassName
          ) }
        >
          <CalendarIcon
            className={ cn(
              ICON_SIZES[ size ],
              "shrink-0",
              hasValue ? "text-foreground/60" : "text-muted-foreground/50"
            ) }
          />

          <span className={ cn(
            "flex-1 truncate",
            hasValue ? "text-foreground" : "text-muted-foreground/50"
          ) }>
            { hasValue
              ? displayValue
              : placeholder ?? (
                mode === "range" ? "Pick a date range" :
                  mode === "multiple" ? "Pick dates" :
                    "Pick a date"
              )
            }
          </span>

          <div className="flex items-center gap-1 shrink-0 ml-1">
            { clearable && hasValue && (
              <span
                role="button"
                tabIndex={ 0 }
                aria-label="Clear date"
                onMouseDown={ handleClear }
                onKeyDown={ e => e.key === "Enter" && handleClear(e as unknown as React.MouseEvent) }
                className="rounded-md p-0.5 text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted/60 transition-colors"
              >
                <X className={ ICON_SIZES[ size ] } />
              </span>
            ) }
            <ChevronDown
              className={ cn(
                ICON_SIZES[ size ],
                "text-muted-foreground/40 transition-transform duration-200",
                open && "rotate-180"
              ) }
            />
          </div>
        </button>

        {/* Portal — renders outside any overflow:hidden parent */ }
        { mounted && popoverNode
          ? createPortal(popoverNode, document.body)
          : null
        }
      </div>
    );
  }
);
DatePicker.displayName = "DatePicker";
