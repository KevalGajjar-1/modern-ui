"use client";

import React, { useState } from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import { DatePicker } from "@/components/ui/date-picker";
import { DateRange } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

function fmt(d?: Date) {
  if (!d) return "—";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function DatePickerPage() {
  const [ single, setSingle ] = useState<Date | undefined>();
  const [ range, setRange ] = useState<DateRange>({});
  const [ multi, setMulti ] = useState<Date[]>([]);
  const [ formDate, setFormDate ] = useState<Date | undefined>();
  const [ size, setSize ] = useState<"sm" | "md" | "lg">("md");

  return (
    <DocsContent
      title="Date Picker"
      description="An input-style trigger that opens a Calendar popover. Supports single, range, and multiple modes. Auto-positions above or below to stay in the viewport. Clearable and fully keyboard accessible."
      importPath='import { DatePicker } from "@/components/ui/date-picker";'
    >

      {/* ══════════════════════════════════════
          1. SINGLE DATE
      ══════════════════════════════════════ */}
      <Section
        id="single"
        title="Single Date"
        description="Click the input to open the calendar. The popover closes automatically when a date is selected."
      >
        <ComponentPreview
          code={ `const [date, setDate] = useState<Date | undefined>();

<DatePicker
  value={date}
  onChange={d => setDate(d as Date | undefined)}
  placeholder="Pick a date"
/>`}
        >
          <div className="flex flex-col gap-3 max-w-xs">
            <DatePicker
              value={ single }
              onChange={ d => setSingle(d as Date | undefined) }
              placeholder="Pick a date"
            />
            <p className="text-xs font-mono text-muted-foreground">
              value: <strong className="text-foreground">{ fmt(single) }</strong>
            </p>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. DATE RANGE
      ══════════════════════════════════════ */}
      <Section
        id="range"
        title="Date Range"
        description="Click start and end dates. The popover auto-closes when both ends are selected. Hover to preview the range."
      >
        <ComponentPreview
          code={ `const [range, setRange] = useState<DateRange>({});

<DatePicker
  mode="range"
  value={range}
  onChange={r => setRange((r as DateRange) ?? {})}
  placeholder="Select a date range"
  numberOfMonths={2}
/>`}
        >
          <div className="flex flex-col gap-3 max-w-sm">
            <DatePicker
              mode="range"
              value={ range }
              onChange={ r => setRange((r as DateRange) ?? {}) }
              placeholder="Select a date range"
              numberOfMonths={ 2 }
            />
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground flex-wrap">
              <span>from: <strong className="text-foreground">{ fmt(range.from) }</strong></span>
              <span>to: <strong className="text-foreground">{ fmt(range.to) }</strong></span>
              { range.from && range.to && (
                <Badge variant="secondary" className="text-[10px]">
                  { Math.round((range.to.getTime() - range.from.getTime()) / 86400000) + 1 } days
                </Badge>
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
        description="Stays open while you pick multiple dates. Shows a count badge when more than one is selected."
      >
        <ComponentPreview
          code={ `const [dates, setDates] = useState<Date[]>([]);

<DatePicker
  mode="multiple"
  value={dates}
  onChange={d => setDates((d as Date[]) ?? [])}
  placeholder="Pick multiple dates"
/>`}
        >
          <div className="flex flex-col gap-3 max-w-xs">
            <DatePicker
              mode="multiple"
              value={ multi }
              onChange={ d => setMulti((d as Date[]) ?? []) }
              placeholder="Pick multiple dates"
            />
            <div className="flex flex-wrap gap-1.5">
              { multi.length === 0
                ? <span className="text-xs text-muted-foreground">No dates selected</span>
                : multi
                  .sort((a, b) => a.getTime() - b.getTime())
                  .map(d => (
                    <Badge key={ d.toISOString() } variant="secondary" className="text-[10px] font-mono">
                      { fmt(d) }
                    </Badge>
                  ))
              }
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          4. SIZES
      ══════════════════════════════════════ */}
      <Section
        id="sizes"
        title="Sizes"
        description="Three sizes — sm, md (default), lg — to match your form layout."
      >
        <ComponentPreview
          code={ `<DatePicker size="sm" placeholder="Small"  />
<DatePicker size="md" placeholder="Medium" />
<DatePicker size="lg" placeholder="Large"  />`}
        >
          <div className="flex flex-col gap-3 max-w-xs">
            { ([ "sm", "md", "lg" ] as const).map(s => (
              <div key={ s } className="flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground w-5">{ s }</span>
                <DatePicker
                  size={ s }
                  placeholder={ `${s === "sm" ? "Small" : s === "md" ? "Medium" : "Large"} picker` }
                  className="flex-1"
                />
              </div>
            )) }
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          5. IN A FORM
      ══════════════════════════════════════ */}
      <Section
        id="form"
        title="Inside a Form"
        description="Works seamlessly with the Field component for labels, hints, and error states."
      >
        <ComponentPreview
          code={ `<Field label="Start date" required hint="Cannot be in the past">
  <DatePicker
    value={date}
    onChange={d => setDate(d as Date | undefined)}
    fromDate={new Date()}
    placeholder="Pick a date"
    name="start_date"
  />
</Field>

<Field label="End date" error={!endDate} errorMessage="Required">
  <DatePicker
    value={endDate}
    onChange={d => setEndDate(d as Date | undefined)}
    fromDate={startDate}
    error={!endDate}
    placeholder="Pick a date"
  />
</Field>`}
        >
          <div className="flex flex-col gap-4 max-w-xs">
            <Field
              label="Start date"
              required
              hint="Cannot be in the past"
            >
              <DatePicker
                value={ formDate }
                onChange={ d => setFormDate(d as Date | undefined) }
                fromDate={ new Date() }
                placeholder="Pick a date"
                name="start_date"
                className="w-full"
              />
            </Field>

            <Field
              label="End date"
              hint="Must be after start date"
              status={ formDate !== undefined && false ? "error" : "idle" }
              message={ formDate !== undefined && false ? "Required" : undefined }
            >
              <DatePicker
                value={ undefined }
                onChange={ () => { } }
                fromDate={ formDate }
                placeholder={ formDate ? `After ${fmt(formDate)}` : "Pick start first" }
                disabled={ !formDate }
                className="w-full"
              />
            </Field>

            <Button
              onClick={ () => setFormDate(undefined) }
              variant="outline"
              size="sm"
            >
              Reset form
            </Button>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          6. DISABLED & ERROR STATES
      ══════════════════════════════════════ */}
      <Section
        id="states"
        title="Disabled & Error"
        description="Disabled prevents interaction entirely. error adds a red ring — useful for form validation."
      >
        <ComponentPreview
          code={ `<DatePicker placeholder="Disabled"       disabled />
<DatePicker placeholder="Error state"    error />
<DatePicker placeholder="No clear btn"   clearable={false} />`}
        >
          <div className="flex flex-col gap-3 max-w-xs">
            <DatePicker placeholder="Disabled input" disabled />
            <DatePicker placeholder="Error — required" error />
            <DatePicker placeholder="Not clearable" clearable={ false }
              value={ new Date() } onChange={ () => { } } />
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          7. CUSTOM FORMAT
      ══════════════════════════════════════ */}
      <Section
        id="format"
        title="Custom Format"
        description="Pass formatDate and formatRange to control the display string without affecting the underlying Date value."
      >
        <ComponentPreview
          code={ `<DatePicker
  value={date}
  onChange={d => setDate(d as Date | undefined)}
  formatDate={d =>
    d.toLocaleDateString("en-US", {
      weekday: "short",
      month:   "long",
      day:     "numeric",
      year:    "numeric",
    })
  }
  placeholder="Thu, March 26, 2026"
/>`}
        >
          <DatePicker
            value={ single }
            onChange={ d => setSingle(d as Date | undefined) }
            formatDate={ d =>
              d.toLocaleDateString("en-US", {
                weekday: "short", month: "long", day: "numeric", year: "numeric",
              })
            }
            placeholder="Thu, March 26, 2026"
            className="max-w-xs w-full"
          />
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          8. PROPS
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <PropsTable props={ [
          { name: "mode", type: '"single" | "range" | "multiple"', default: '"single"', description: "Date selection mode." },
          { name: "value", type: "Date | Date[] | DateRange", default: "—", description: "Controlled selected value." },
          { name: "onChange", type: "(value) => void", default: "—", description: "Called when the selection changes." },
          { name: "placeholder", type: "string", default: "mode-based", description: "Input placeholder text." },
          { name: "disabled", type: "boolean | Date[] | (d) => boolean", default: "false", description: "Disable the trigger or specific calendar dates." },
          { name: "clearable", type: "boolean", default: "true", description: "Show X button to clear the value." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Input height and font size." },
          { name: "align", type: '"left" | "right" | "center"', default: '"left"', description: "Popover horizontal alignment." },
          { name: "formatDate", type: "(date: Date) => string", default: "en-IN short", description: "Custom formatter for single/multiple display." },
          { name: "formatRange", type: "(from?, to?) => string", default: "—", description: "Custom formatter for range display." },
          { name: "error", type: "boolean", default: "false", description: "Adds red border/ring for validation errors." },
          { name: "name", type: "string", default: "—", description: "Hidden input name for form submission." },
          { name: "numberOfMonths", type: "number", default: "1", description: "Months shown in the popover calendar." },
          { name: "fromDate", type: "Date", default: "—", description: "Earliest selectable date." },
          { name: "toDate", type: "Date", default: "—", description: "Latest selectable date." },
        ] } />
      </Section>
    </DocsContent>
  );
}
