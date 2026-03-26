"use client";

import React, { useState } from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import { Calendar, DateRange } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ─── Display helpers ──────────────────────────────────────
function fmt(d?: Date) {
  if (!d) return "—";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function CalendarPage() {
  const [ single, setSingle ] = useState<Date | undefined>();
  const [ range, setRange ] = useState<DateRange>({});
  const [ multi, setMulti ] = useState<Date[]>([]);
  const [ twoMonth, setTwoMonth ] = useState<DateRange>({});
  const [ event, setEvent ] = useState<Date | undefined>();

  // booked dates for event demo
  const booked = [
    new Date(2026, 2, 28),
    new Date(2026, 3, 2),
    new Date(2026, 3, 5),
    new Date(2026, 3, 9),
  ];

  return (
    <DocsContent
      title="Calendar"
      description="A fully-featured date picker calendar supporting single, range, and multiple selection modes. Includes keyboard navigation, month/year drill-down views, week numbers, min/max date constraints, disabled dates, and a custom day renderer."
      importPath='import { Calendar, DateRange } from "@/components/ui/calendar";'
    >

      {/* ══════════════════════════════════════
          1. SINGLE DATE
      ══════════════════════════════════════ */}
      <Section
        id="single"
        title="Single Date"
        description="Default mode. Click a day to select it; click again to deselect. Use ↑↓←→ keys to navigate and Enter to select."
      >
        <ComponentPreview
          code={ `const [date, setDate] = useState<Date | undefined>();

<Calendar
  mode="single"
  selected={date}
  onSelect={d => setDate(d as Date | undefined)}
/>`}
        >
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Calendar
              mode="single"
              selected={ single }
              onSelect={ d => setSingle(d as Date | undefined) }
            />
            <div className="space-y-2 text-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                Selected
              </p>
              <p className="font-medium text-foreground">
                { single ? fmt(single) : "None" }
              </p>
              { single && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={ () => setSingle(undefined) }
                  className="text-xs h-7 px-2"
                >
                  Clear
                </Button>
              ) }
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. DATE RANGE
      ══════════════════════════════════════ */}
      <Section
        id="range"
        title="Date Range"
        description="Click a start date, then click an end date. Hover over days to preview the range. Click the start date again to reset."
      >
        <ComponentPreview
          code={ `const [range, setRange] = useState<DateRange>({});

<Calendar
  mode="range"
  selected={range}
  onSelect={r => setRange(r as DateRange)}
/>`}
        >
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Calendar
              mode="range"
              selected={ range }
              onSelect={ r => setRange((r as DateRange) ?? {}) }
            />
            <div className="space-y-2 text-sm min-w-[140px]">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Range</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground w-8 text-xs">From</span>
                  <span className="font-medium">{ fmt(range.from) }</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground w-8 text-xs">To</span>
                  <span className="font-medium">{ fmt(range.to) }</span>
                </div>
                { range.from && range.to && (
                  <Badge variant="secondary" className="mt-1 text-[10px]">
                    { Math.round((range.to.getTime() - range.from.getTime()) / 86400000) + 1 } days
                  </Badge>
                ) }
              </div>
              { (range.from || range.to) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={ () => setRange({}) }
                  className="text-xs h-7 px-2"
                >
                  Clear
                </Button>
              ) }
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          3. MULTIPLE DATES
      ══════════════════════════════════════ */}
      <Section
        id="multiple"
        title="Multiple Dates"
        description="Click any day to add it to the selection. Click again to remove it. Useful for booking recurring events."
      >
        <ComponentPreview
          code={ `const [dates, setDates] = useState<Date[]>([]);

<Calendar
  mode="multiple"
  selected={dates}
  onSelect={d => setDates(d as Date[])}
/>`}
        >
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Calendar
              mode="multiple"
              selected={ multi }
              onSelect={ d => setMulti((d as Date[]) ?? []) }
            />
            <div className="space-y-2 text-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                Selected ({ multi.length })
              </p>
              <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                { multi.length === 0
                  ? <span className="text-muted-foreground text-xs">None</span>
                  : multi
                    .sort((a, b) => a.getTime() - b.getTime())
                    .map(d => (
                      <Badge key={ d.toISOString() } variant="secondary" className="text-[10px] font-mono">
                        { fmt(d) }
                      </Badge>
                    ))
                }
              </div>
              { multi.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={ () => setMulti([]) }
                  className="text-xs h-7 px-2"
                >
                  Clear all
                </Button>
              ) }
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          4. TWO MONTHS
      ══════════════════════════════════════ */}
      <Section
        id="two-months"
        title="Two-Month Range Picker"
        description="Set numberOfMonths={2} to show two months side-by-side — ideal for hotel or flight booking UIs."
      >
        <ComponentPreview
          code={ `<Calendar
  mode="range"
  numberOfMonths={2}
  selected={range}
  onSelect={r => setRange(r as DateRange)}
/>`}
        >
          <div className="overflow-x-auto">
            <Calendar
              mode="range"
              numberOfMonths={ 2 }
              selected={ twoMonth }
              onSelect={ r => setTwoMonth((r as DateRange) ?? {}) }
            />
          </div>
          { (twoMonth.from || twoMonth.to) && (
            <div className="flex items-center gap-3 mt-3 text-sm">
              <Badge variant="secondary">{ fmt(twoMonth.from) } → { fmt(twoMonth.to) }</Badge>
              <Button variant="ghost" size="sm" onClick={ () => setTwoMonth({}) } className="text-xs h-7 px-2">
                Clear
              </Button>
            </div>
          ) }
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          5. MIN / MAX & DISABLED DATES
      ══════════════════════════════════════ */}
      <Section
        id="disabled"
        title="Min / Max & Disabled Dates"
        description="Pass fromDate / toDate to restrict the selectable range, and disabled to block specific dates or use a function."
      >
        <ComponentPreview
          code={ `const today = new Date();
const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, today.getDate());

<Calendar
  mode="single"
  fromDate={today}
  toDate={maxDate}
  disabled={(d) => d.getDay() === 0 || d.getDay() === 6} // block weekends
/>`}
        >
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Calendar
              mode="single"
              selected={ event }
              onSelect={ d => setEvent(d as Date | undefined) }
              fromDate={ new Date() }
              toDate={ new Date(2026, 5, 30) }
              disabled={ (d) => d.getDay() === 0 || d.getDay() === 6 }
            />
            <div className="text-sm space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                Rules
              </p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>✓ From today only</li>
                <li>✓ Until 30 Jun 2026</li>
                <li>✗ Weekends disabled</li>
              </ul>
              <p className="font-medium mt-2">{ event ? fmt(event) : "No date selected" }</p>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          6. WEEK NUMBERS
      ══════════════════════════════════════ */}
      <Section
        id="week-numbers"
        title="Week Numbers"
        description="Set showWeekNumbers to display ISO week numbers in the leftmost column."
      >
        <ComponentPreview
          code={ `<Calendar mode="single" showWeekNumbers weekStartsOn={1} />` }
        >
          <Calendar
            mode="single"
            showWeekNumbers
            weekStartsOn={ 1 }
            selected={ single }
            onSelect={ d => setSingle(d as Date | undefined) }
          />
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          7. CUSTOM DAY RENDERER
      ══════════════════════════════════════ */}
      <Section
        id="custom-day"
        title="Custom Day Renderer"
        description="Pass renderDay to fully control how each day cell renders — useful for showing availability, events, or prices."
      >
        <ComponentPreview
          code={ `const booked = [new Date(2026,2,28), new Date(2026,3,2), ...];

<Calendar
  mode="single"
  renderDay={(date, { isSelected, isToday, isDisabled }) => {
    const isBooked = booked.some(b => isSameDay(b, date));
    return (
      <div className={cn("relative h-9 w-9 rounded-full flex items-center justify-center text-sm",
        isSelected && "bg-primary text-primary-foreground",
        isBooked   && !isSelected && "text-red-500",
        isToday    && !isSelected && "ring-1 ring-primary/30 font-bold text-primary",
      )}>
        {date.getDate()}
        {isBooked && !isSelected && (
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-red-400" />
        )}
      </div>
    );
  }}
/>`}
        >
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Calendar
              mode="single"
              selected={ event }
              onSelect={ d => setEvent(d as Date | undefined) }
              renderDay={ (date, { isSelected, isToday: isTodayDay, isDisabled: isDis, isOutside }) => {
                const isBooked = booked.some(b =>
                  b.getFullYear() === date.getFullYear() &&
                  b.getMonth() === date.getMonth() &&
                  b.getDate() === date.getDate()
                );
                return (
                  <button
                    type="button"
                    disabled={ isDis }
                    className={ [
                      "relative h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isSelected ? "bg-primary text-primary-foreground"
                        : isBooked
                          ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                          : isOutside
                            ? "text-muted-foreground/30 hover:bg-muted/40"
                            : "hover:bg-muted/70 text-foreground/85",
                      isTodayDay && !isSelected ? "ring-1 ring-primary/40 font-bold text-primary" : "",
                      isDis ? "opacity-30 pointer-events-none" : "",
                    ].filter(Boolean).join(" ") }
                  >
                    { date.getDate() }
                    { isBooked && !isSelected && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-red-400" />
                    ) }
                    { isTodayDay && !isSelected && (
                      <span className="absolute top-1 right-1 h-1 w-1 rounded-full bg-primary" />
                    ) }
                  </button>
                );
              } }
            />
            <div className="text-xs space-y-3">
              <p className="font-semibold uppercase tracking-widest text-muted-foreground/60">Legend</p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary inline-block" /> Today
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-400 inline-block" /> Booked
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary/80 inline-block" /> Selected
                </div>
              </div>
              <p className="font-medium mt-2">{ event ? fmt(event) : "Pick a date" }</p>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          8. PROPS
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <PropsTable props={ [
          { name: "mode", type: '"single" | "range" | "multiple"', default: '"single"', description: "Selection mode." },
          { name: "selected", type: "Date | Date[] | DateRange", default: "—", description: "Controlled selected value." },
          { name: "onSelect", type: "(value) => void", default: "—", description: "Called when selection changes." },
          { name: "fromDate", type: "Date", default: "—", description: "Disable all dates before this." },
          { name: "toDate", type: "Date", default: "—", description: "Disable all dates after this." },
          { name: "disabled", type: "Date[] | (date: Date) => boolean", default: "—", description: "Specific dates or a function to disable." },
          { name: "numberOfMonths", type: "number", default: "1", description: "Number of month grids to render side-by-side." },
          { name: "weekStartsOn", type: "0 | 1 | 2 | 3 | 4 | 5 | 6", default: "0", description: "First day of the week (0 = Sunday, 1 = Monday)." },
          { name: "showWeekNumbers", type: "boolean", default: "false", description: "Display ISO week numbers." },
          { name: "showOutsideDays", type: "boolean", default: "true", description: "Show days from adjacent months." },
          { name: "defaultMonth", type: "Date", default: "today", description: "Initial month to display." },
          { name: "month", type: "Date", default: "—", description: "Controlled month." },
          { name: "onMonthChange", type: "(month: Date) => void", default: "—", description: "Called when the viewed month changes." },
          { name: "renderDay", type: "(date, DayRenderProps) => ReactNode", default: "—", description: "Custom day cell renderer." },
          { name: "inline", type: "boolean", default: "false", description: "Remove border and shadow (embed inline)." },
          { name: "classNames", type: "CalendarClassNames", default: "{}", description: "Override class names for each internal element." },
        ] } />
      </Section>
    </DocsContent>
  );
}
