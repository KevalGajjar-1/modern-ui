"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────
export type CalendarMode = "single" | "range" | "multiple";
export type CalendarView = "days" | "months" | "years";

export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface CalendarProps {
  mode?: CalendarMode;
  /** Single date */
  selected?: Date | Date[] | DateRange;
  onSelect?: (value: Date | Date[] | DateRange | undefined) => void;
  /** Disable dates before this */
  fromDate?: Date;
  /** Disable dates after this */
  toDate?: Date;
  /** Disable specific dates */
  disabled?: Date[] | ((date: Date) => boolean);
  /** Show week numbers */
  showWeekNumbers?: boolean;
  /** First day of week: 0=Sun, 1=Mon */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Number of months to show */
  numberOfMonths?: number;
  /** Initial month to show */
  defaultMonth?: Date;
  /** Controlled month */
  month?: Date;
  onMonthChange?: (month: Date) => void;
  /** Custom day renderer */
  renderDay?: (date: Date, props: DayRenderProps) => React.ReactNode;
  /** Extra class names */
  className?: string;
  classNames?: CalendarClassNames;
  /** Show outside days */
  showOutsideDays?: boolean;
  /** Inline (no border) */
  inline?: boolean;
}

export interface DayRenderProps {
  isSelected: boolean;
  isToday: boolean;
  isDisabled: boolean;
  isOutside: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
}

export interface CalendarClassNames {
  root?: string;
  header?: string;
  nav?: string;
  navBtn?: string;
  title?: string;
  weekdays?: string;
  weekday?: string;
  body?: string;
  row?: string;
  cell?: string;
  day?: string;
  daySelected?: string;
  dayToday?: string;
  dayDisabled?: string;
  dayOutside?: string;
  weekNumber?: string;
}

// ─── Helpers ──────────────────────────────────────────────
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS_SHORT = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function isToday(d: Date): boolean {
  return isSameDay(d, new Date());
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getDayGrid(year: number, month: number, weekStart: number): Date[] {
  const first = new Date(year, month, 1).getDay();
  const total = daysInMonth(year, month);
  const offset = (first - weekStart + 7) % 7;
  const cells = Math.ceil((offset + total) / 7) * 7;
  const grid: Date[] = [];
  for (let i = 0; i < cells; i++) {
    grid.push(new Date(year, month, i - offset + 1));
  }
  return grid;
}

function getWeekNumber(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

function addMonths(date: Date, n: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + n, 1);
}

// ─── Calendar ─────────────────────────────────────────────
export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      mode = "single",
      selected,
      onSelect,
      fromDate,
      toDate,
      disabled,
      showWeekNumbers = false,
      weekStartsOn = 0,
      numberOfMonths = 1,
      defaultMonth,
      month: controlledMonth,
      onMonthChange,
      renderDay,
      className,
      classNames = {},
      showOutsideDays = true,
      inline = false,
    },
    ref
  ) => {
    const today = React.useMemo(() => startOfDay(new Date()), []);

    const [ viewMonth, setViewMonthRaw ] = React.useState<Date>(
      controlledMonth ?? defaultMonth ?? today
    );

    const setViewMonth = React.useCallback(
      (m: Date) => {
        if (!controlledMonth) setViewMonthRaw(m);
        onMonthChange?.(m);
      },
      [ controlledMonth, onMonthChange ]
    );

    React.useEffect(() => {
      if (controlledMonth) setViewMonthRaw(controlledMonth);
    }, [ controlledMonth ]);

    const [ view, setView ] = React.useState<CalendarView>("days");

    // ── Hover for range preview ──
    const [ hoverDate, setHoverDate ] = React.useState<Date | null>(null);

    // ── Helpers ──
    const isDisabled = React.useCallback(
      (d: Date): boolean => {
        if (fromDate && d < startOfDay(fromDate)) return true;
        if (toDate && d > startOfDay(toDate)) return true;
        if (!disabled) return false;
        if (typeof disabled === "function") return disabled(d);
        return disabled.some(dd => isSameDay(dd, d));
      },
      [ fromDate, toDate, disabled ]
    );

    const getSelectedState = React.useCallback(
      (d: Date): { isSelected: boolean; isRangeStart: boolean; isRangeEnd: boolean; isInRange: boolean } => {
        if (!selected) return { isSelected: false, isRangeStart: false, isRangeEnd: false, isInRange: false };

        if (mode === "single") {
          const sel = selected as Date;
          return { isSelected: sel && isSameDay(sel, d), isRangeStart: false, isRangeEnd: false, isInRange: false };
        }

        if (mode === "multiple") {
          const sel = selected as Date[];
          return { isSelected: sel.some(s => isSameDay(s, d)), isRangeStart: false, isRangeEnd: false, isInRange: false };
        }

        if (mode === "range") {
          const { from, to } = selected as DateRange;
          const hover = hoverDate;
          const rangeEnd = to ?? (from && hover ? hover : undefined);

          const isStart = from ? isSameDay(from, d) : false;
          const isEnd = rangeEnd ? isSameDay(rangeEnd, d) : false;
          let inRange = false;

          if (from && rangeEnd) {
            const lo = from <= rangeEnd ? from : rangeEnd;
            const hi = from <= rangeEnd ? rangeEnd : from;
            inRange = d > lo && d < hi;
          }
          return {
            isSelected: isStart || isEnd,
            isRangeStart: isStart,
            isRangeEnd: isEnd,
            isInRange: inRange,
          };
        }
        return { isSelected: false, isRangeStart: false, isRangeEnd: false, isInRange: false };
      },
      [ selected, mode, hoverDate ]
    );

    const handleDayClick = React.useCallback(
      (d: Date) => {
        if (isDisabled(d)) return;

        if (mode === "single") {
          onSelect?.(isSameDay(d, (selected as Date | undefined) ?? new Date("invalid")) ? undefined : d);
          return;
        }

        if (mode === "multiple") {
          const sel = (selected as Date[] | undefined) ?? [];
          const idx = sel.findIndex(s => isSameDay(s, d));
          if (idx >= 0) onSelect?.(sel.filter((_, i) => i !== idx));
          else onSelect?.([ ...sel, d ]);
          return;
        }

        if (mode === "range") {
          const { from, to } = (selected as DateRange | undefined) ?? {};
          if (!from || (from && to)) {
            onSelect?.({ from: d, to: undefined });
          } else {
            onSelect?.(from <= d ? { from, to: d } : { from: d, to: from });
          }
          return;
        }
      },
      [ mode, selected, onSelect, isDisabled ]
    );

    // ── Keyboard nav ──
    const [ focusedDate, setFocusedDate ] = React.useState<Date>(today);

    const handleKeyDown = (e: React.KeyboardEvent, d: Date) => {
      const moves: Record<string, () => Date> = {
        ArrowLeft: () => new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1),
        ArrowRight: () => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1),
        ArrowUp: () => new Date(d.getFullYear(), d.getMonth(), d.getDate() - 7),
        ArrowDown: () => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7),
        Home: () => new Date(d.getFullYear(), d.getMonth(), 1),
        End: () => new Date(d.getFullYear(), d.getMonth(), daysInMonth(d.getFullYear(), d.getMonth())),
        Enter: () => { handleDayClick(d); return d; },
        " ": () => { handleDayClick(d); return d; },
      };
      const fn = moves[ e.key ];
      if (!fn) return;
      e.preventDefault();
      const next = fn();
      setFocusedDate(next);
      if (next.getMonth() !== viewMonth.getMonth() || next.getFullYear() !== viewMonth.getFullYear()) {
        setViewMonth(new Date(next.getFullYear(), next.getMonth(), 1));
      }
    };

    // ── Day labels offset by weekStartsOn ──
    const dayLabels = Array.from({ length: 7 }, (_, i) =>
      DAYS_SHORT[ (i + weekStartsOn) % 7 ]
    );

    return (
      <div
        ref={ ref }
        className={ cn(
          "inline-flex flex-col select-none",
          !inline && "rounded-2xl border border-border/60 bg-popover p-4 shadow-md",
          numberOfMonths > 1 && "gap-6",
          classNames.root,
          className
        ) }
      >
        {/* ── Month grid(s) ── */ }
        <div className={ cn(
          "flex gap-6",
          numberOfMonths > 1 ? "flex-row flex-wrap" : "flex-col"
        ) }>
          { Array.from({ length: numberOfMonths }, (_, mi) => {
            const m = addMonths(viewMonth, mi);
            const year = m.getFullYear();
            const month = m.getMonth();
            const grid = getDayGrid(year, month, weekStartsOn);
            const weeks = grid.length / 7;

            return (
              <div key={ mi } className="flex flex-col gap-3 min-w-[240px]">
                {/* ── Header (only for first month, or all if numberOfMonths === 1) ── */ }
                { mi === 0 && (
                  <div className={ cn("flex items-center justify-between", classNames.header) }>
                    {/* Prev nav */ }
                    <div className="flex items-center gap-0.5">
                      { view === "days" && (
                        <NavBtn
                          onClick={ () => setViewMonth(addMonths(viewMonth, -12)) }
                          aria-label="Previous year"
                          className={ classNames.navBtn }
                        >
                          <ChevronsLeft className="h-4 w-4" />
                        </NavBtn>
                      ) }
                      <NavBtn
                        onClick={ () => view === "days"
                          ? setViewMonth(addMonths(viewMonth, -1))
                          : setView("days")
                        }
                        aria-label="Previous month"
                        className={ classNames.navBtn }
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </NavBtn>
                    </div>

                    {/* Title — click to switch views */ }
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={ () => setView(v => v === "days" ? "months" : "days") }
                        className={ cn(
                          "rounded-lg px-2 py-1 text-sm font-semibold text-foreground",
                          "hover:bg-muted/60 transition-colors",
                          classNames.title
                        ) }
                      >
                        { MONTHS[ month ] }
                      </button>
                      <button
                        type="button"
                        onClick={ () => setView(v => v === "days" ? "years" : "days") }
                        className={ cn(
                          "rounded-lg px-2 py-1 text-sm font-semibold text-foreground",
                          "hover:bg-muted/60 transition-colors",
                          classNames.title
                        ) }
                      >
                        { year }
                      </button>
                    </div>

                    {/* Next nav */ }
                    <div className="flex items-center gap-0.5">
                      <NavBtn
                        onClick={ () => view === "days"
                          ? setViewMonth(addMonths(viewMonth, 1))
                          : setView("days")
                        }
                        aria-label="Next month"
                        className={ classNames.navBtn }
                      >
                        <ChevronRight className="h-4 w-4" />
                      </NavBtn>
                      { view === "days" && (
                        <NavBtn
                          onClick={ () => setViewMonth(addMonths(viewMonth, 12)) }
                          aria-label="Next year"
                          className={ classNames.navBtn }
                        >
                          <ChevronsRight className="h-4 w-4" />
                        </NavBtn>
                      ) }
                    </div>
                  </div>
                ) }

                {/* ── Month picker view ── */ }
                { view === "months" && mi === 0 && (
                  <div className="grid grid-cols-3 gap-1 py-1">
                    { MONTHS.map((name, idx) => (
                      <button
                        key={ name }
                        type="button"
                        onClick={ () => { setViewMonth(new Date(year, idx, 1)); setView("days"); } }
                        className={ cn(
                          "rounded-xl px-2 py-2 text-sm font-medium transition-colors",
                          idx === month
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted/60 text-foreground/80"
                        ) }
                      >
                        { name.slice(0, 3) }
                      </button>
                    )) }
                  </div>
                ) }

                {/* ── Year picker view ── */ }
                { view === "years" && mi === 0 && (
                  <div className="grid grid-cols-4 gap-1 py-1 max-h-[200px] overflow-y-auto">
                    { Array.from({ length: 20 }, (_, i) => year - 10 + i).map(y => (
                      <button
                        key={ y }
                        type="button"
                        onClick={ () => { setViewMonth(new Date(y, month, 1)); setView("days"); } }
                        className={ cn(
                          "rounded-xl px-1 py-2 text-sm font-medium transition-colors",
                          y === year
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted/60 text-foreground/80"
                        ) }
                      >
                        { y }
                      </button>
                    )) }
                  </div>
                ) }

                {/* ── Day grid ── */ }
                { view === "days" && (
                  <>
                    {/* Weekday labels */ }
                    <div className={ cn("grid text-center", showWeekNumbers ? "grid-cols-8" : "grid-cols-7", classNames.weekdays) }>
                      { showWeekNumbers && <div className="text-[10px] text-muted-foreground/40 font-medium py-1">W</div> }
                      { dayLabels.map(d => (
                        <div key={ d } className={ cn("text-[11px] font-medium text-muted-foreground/60 py-1", classNames.weekday) }>
                          { d }
                        </div>
                      )) }
                    </div>

                    {/* Day cells */ }
                    <div role="grid" aria-label={ `${MONTHS[ month ]} ${year}` } className={ classNames.body }>
                      { Array.from({ length: weeks }, (_, wi) => {
                        const weekDays = grid.slice(wi * 7, wi * 7 + 7);
                        return (
                          <div
                            key={ wi }
                            role="row"
                            className={ cn("grid", showWeekNumbers ? "grid-cols-8" : "grid-cols-7", classNames.row) }
                          >
                            { showWeekNumbers && (
                              <div className={ cn(
                                "flex items-center justify-center text-[10px] text-muted-foreground/40 font-medium",
                                classNames.weekNumber
                              ) }>
                                { getWeekNumber(weekDays[ 0 ]) }
                              </div>
                            ) }
                            { weekDays.map((day, di) => {
                              const isOutside = day.getMonth() !== month;
                              const isTodayDay = isSameDay(day, today);
                              const isDis = isDisabled(day);
                              const {
                                isSelected, isRangeStart, isRangeEnd, isInRange
                              } = getSelectedState(day);
                              const isFocused = isSameDay(day, focusedDate);

                              if (isOutside && !showOutsideDays) {
                                return <div key={ di } role="gridcell" aria-hidden />;
                              }

                              const dayProps: DayRenderProps = {
                                isSelected, isToday: isTodayDay,
                                isDisabled: isDis, isOutside,
                                isRangeStart, isRangeEnd, isInRange,
                              };

                              if (renderDay) {
                                return (
                                  <div
                                    key={ di }
                                    role="gridcell"
                                    onClick={ () => !isDis && handleDayClick(day) }
                                    className={ cn("flex items-center justify-center", classNames.cell) }
                                  >
                                    { renderDay(day, dayProps) }
                                  </div>
                                );
                              }

                              return (
                                <div
                                  key={ di }
                                  role="gridcell"
                                  className={ cn(
                                    "relative flex items-center justify-center",
                                    // Range mid-zone background
                                    isInRange && "bg-primary/10",
                                    isRangeStart && "rounded-l-full bg-primary/10",
                                    isRangeEnd && "rounded-r-full bg-primary/10",
                                    classNames.cell
                                  ) }
                                >
                                  <button
                                    type="button"
                                    role="gridcell"
                                    aria-selected={ isSelected }
                                    aria-disabled={ isDis }
                                    tabIndex={ isFocused ? 0 : -1 }
                                    onClick={ () => handleDayClick(day) }
                                    onKeyDown={ e => handleKeyDown(e, day) }
                                    onMouseEnter={ () => mode === "range" && setHoverDate(day) }
                                    onMouseLeave={ () => mode === "range" && setHoverDate(null) }
                                    className={ cn(
                                      "relative z-10 h-9 w-9 rounded-full text-sm font-medium",
                                      "flex items-center justify-center",
                                      "transition-colors duration-100",
                                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                                      // Outside day
                                      isOutside && !isSelected && "text-muted-foreground/30",
                                      // Normal
                                      !isSelected && !isOutside && !isDis && "hover:bg-muted/70 text-foreground/85",
                                      // Today
                                      isTodayDay && !isSelected && "font-bold text-primary ring-1 ring-primary/30",
                                      // Selected / range endpoints
                                      isSelected && "bg-primary text-primary-foreground hover:bg-primary/90 font-semibold",
                                      // Disabled
                                      isDis && "pointer-events-none opacity-30",
                                      // Custom classes
                                      isSelected && classNames.daySelected,
                                      isTodayDay && classNames.dayToday,
                                      isDis && classNames.dayDisabled,
                                      isOutside && classNames.dayOutside,
                                      classNames.day,
                                    ) }
                                  >
                                    { day.getDate() }
                                  </button>
                                </div>
                              );
                            }) }
                          </div>
                        );
                      }) }
                    </div>
                  </>
                ) }
              </div>
            );
          }) }
        </div>
      </div>
    );
  }
);
Calendar.displayName = "Calendar";

// ─── NavBtn ───────────────────────────────────────────────
function NavBtn({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={ cn(
        "flex h-8 w-8 items-center justify-center rounded-xl",
        "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
        "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      ) }
      { ...props }
    >
      { children }
    </button>
  );
}
