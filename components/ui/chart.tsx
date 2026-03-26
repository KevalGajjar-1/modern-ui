"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ResponsiveContainer,
  LineChart, Line,
  BarChart, Bar,
  AreaChart, Area,
  PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  TooltipProps,
  TooltipPayload,
} from "recharts";

// ─── Colour palette ───────────────────────────────────────
export const CHART_COLORS = [
  "hsl(var(--chart-1, 262 83% 58%))",
  "hsl(var(--chart-2, 217 91% 60%))",
  "hsl(var(--chart-3, 160 84% 39%))",
  "hsl(var(--chart-4, 38 92% 50%))",
  "hsl(var(--chart-5, 0 84% 60%))",
  "hsl(var(--chart-6, 292 84% 61%))",
];

// ─── Types ────────────────────────────────────────────────
export type ChartType = "line" | "bar" | "area" | "pie" | "radar";

export interface ChartSeries {
  key: string;
  label?: string;
  color?: string;
  /** area/line: fill below the line */
  fill?: boolean;
  /** bar: stack */
  stackId?: string;
  /** line: make it dashed */
  dashed?: boolean;
}

export interface ChartProps {
  type: ChartType;
  data: Record<string, unknown>[];
  series: ChartSeries[];
  /** Key in data for the X-axis (or pie label) */
  xKey?: string;
  /** Show grid lines */
  grid?: boolean;
  /** Show X/Y axes */
  showAxes?: boolean;
  /** Show legend */
  showLegend?: boolean;
  /** Show tooltip */
  showTooltip?: boolean;
  /** Chart height in px */
  height?: number;
  /** Y axis formatter */
  yFormatter?: (v: number) => string;
  /** X axis formatter */
  xFormatter?: (v: string) => string;
  /** Custom tooltip content */
  tooltipContent?: (props: TooltipProps<number, string>) => React.ReactNode;
  className?: string;
}

// ─── Default tooltip ──────────────────────────────────────
function DefaultTooltip({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) {
  if (!active || !payload?.length) return null;

  return (
    <div className={ cn(
      "rounded-xl border border-border/60 bg-popover px-3 py-2.5",
      "shadow-lg text-sm min-w-[120px]"
    ) }>
      { label && (
        <p className="font-semibold text-foreground mb-1.5 text-xs uppercase tracking-wide text-muted-foreground">
          { label }
        </p>
      ) }
      { payload.map((entry, i: number) => (
        <div key={ i } className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full shrink-0"
              style={ { background: entry.color } }
            />
            <span className="text-muted-foreground text-xs">
              { entry.name }
            </span>
          </div>
          <span className="font-semibold text-foreground tabular-nums text-xs">
            { typeof entry.value === "number"
              ? entry.value.toLocaleString()
              : entry.value }
          </span>
        </div>
      )) }
    </div>
  );
}

// ─── Pie tooltip ──────────────────────────────────────────
function PieTooltip({ active, payload }: { active?: boolean; payload?: any[] }) {
  if (!active || !payload?.length) return null;
  const entry = payload[ 0 ];
  return (
    <div className="rounded-xl border border-border/60 bg-popover px-3 py-2 shadow-lg text-sm">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={ { background: entry.payload?.fill } } />
        <span className="text-muted-foreground text-xs">{ entry.name }</span>
        <span className="font-semibold text-foreground text-xs tabular-nums ml-2">
          { typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value }
        </span>
      </div>
    </div>
  );
}

// ─── Shared axis style ────────────────────────────────────
const AXIS_STYLE = {
  tick: { fontSize: 11, fill: "hsl(var(--muted-foreground))" },
  line: { stroke: "hsl(var(--border))" },
  tickLine: false as const,
};

// ─── Chart ────────────────────────────────────────────────
export function Chart({
  type,
  data,
  series,
  xKey = "name",
  grid = true,
  showAxes = true,
  showLegend = false,
  showTooltip = true,
  height = 300,
  yFormatter = (v: number) => v.toLocaleString(),
  xFormatter,
  tooltipContent,
  className,
}: ChartProps) {
  const resolvedSeries = series.map((s, i) => ({
    ...s,
    color: s.color ?? CHART_COLORS[ i % CHART_COLORS.length ],
    label: s.label ?? s.key,
  }));

  const commonProps = {
    data,
    margin: { top: 8, right: 8, bottom: 0, left: 0 },
  };

  const tooltip = showTooltip ? (
    <Tooltip
      content={ tooltipContent
        ? (p: any) => <>{ tooltipContent(p) }</>
        : type === "pie"
          ? (p: any) => <PieTooltip { ...p } />
          : (p: any) => <DefaultTooltip { ...p } />
      }
      cursor={ {
        stroke: "hsl(var(--border))",
        strokeWidth: 1,
        fill: "hsl(var(--muted)/0.3)",
      } }
    />
  ) : null;

  const legend = showLegend ? (
    <Legend
      wrapperStyle={ { fontSize: 12, color: "hsl(var(--muted-foreground))" } }
      iconType="circle"
      iconSize={ 8 }
    />
  ) : null;

  const grid_ = grid ? (
    <CartesianGrid
      strokeDasharray="4 2"
      stroke="hsl(var(--border))"
      opacity={ 0.6 }
      vertical={ false }
    />
  ) : null;

  const xAxis = showAxes ? (
    <XAxis
      dataKey={ xKey }
      tick={ AXIS_STYLE.tick }
      axisLine={ AXIS_STYLE.line }
      tickLine={ AXIS_STYLE.tickLine }
      tickFormatter={ xFormatter }
      dy={ 6 }
    />
  ) : null;

  const yAxis = showAxes ? (
    <YAxis
      tick={ AXIS_STYLE.tick }
      axisLine={ false }
      tickLine={ AXIS_STYLE.tickLine }
      tickFormatter={ yFormatter }
      width={ 48 }
    />
  ) : null;

  // ── Render ──
  const renderInner = () => {
    if (type === "line") {
      return (
        <LineChart { ...commonProps }>
          { grid_ } { xAxis } { yAxis } { tooltip } { legend }
          { resolvedSeries.map(s => (
            <Line
              key={ s.key }
              type="monotone"
              dataKey={ s.key }
              name={ s.label }
              stroke={ s.color }
              strokeWidth={ 2 }
              strokeDasharray={ s.dashed ? "5 3" : undefined }
              dot={ false }
              activeDot={ { r: 4, strokeWidth: 0 } }
            />
          )) }
        </LineChart>
      );
    }

    if (type === "area") {
      return (
        <AreaChart { ...commonProps }>
          <defs>
            { resolvedSeries.map(s => (
              <linearGradient key={ s.key } id={ `grad-${s.key}` } x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ s.color } stopOpacity={ 0.25 } />
                <stop offset="100%" stopColor={ s.color } stopOpacity={ 0 } />
              </linearGradient>
            )) }
          </defs>
          { grid_ } { xAxis } { yAxis } { tooltip } { legend }
          { resolvedSeries.map(s => (
            <Area
              key={ s.key }
              type="monotone"
              dataKey={ s.key }
              name={ s.label }
              stroke={ s.color }
              strokeWidth={ 2 }
              fill={ `url(#grad-${s.key})` }
              dot={ false }
              activeDot={ { r: 4, strokeWidth: 0 } }
            />
          )) }
        </AreaChart>
      );
    }

    if (type === "bar") {
      return (
        <BarChart { ...commonProps } barCategoryGap="30%">
          { grid_ } { xAxis } { yAxis } { tooltip } { legend }
          { resolvedSeries.map(s => (
            <Bar
              key={ s.key }
              dataKey={ s.key }
              name={ s.label }
              fill={ s.color }
              stackId={ s.stackId }
              radius={ [ 4, 4, 0, 0 ] }
              maxBarSize={ 48 }
            />
          )) }
        </BarChart>
      );
    }

    if (type === "pie") {
      return (
        <PieChart>
          { tooltip }
          { legend }
          <Pie
            data={ data }
            dataKey={ series[ 0 ]?.key ?? "value" }
            nameKey={ xKey }
            cx="50%"
            cy="50%"
            innerRadius="55%"
            outerRadius="80%"
            paddingAngle={ 3 }
            strokeWidth={ 0 }
          >
            { data.map((_, i) => (
              <Cell
                key={ i }
                fill={ resolvedSeries[ 0 ]?.color
                  ? CHART_COLORS[ i % CHART_COLORS.length ]
                  : CHART_COLORS[ i % CHART_COLORS.length ] }
              />
            )) }
          </Pie>
        </PieChart>
      );
    }

    if (type === "radar") {
      return (
        <RadarChart data={ data } cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey={ xKey }
            tick={ { fontSize: 11, fill: "hsl(var(--muted-foreground))" } }
          />
          <PolarRadiusAxis tick={ false } axisLine={ false } />
          { tooltip }
          { legend }
          { resolvedSeries.map(s => (
            <Radar
              key={ s.key }
              name={ s.label }
              dataKey={ s.key }
              stroke={ s.color }
              fill={ s.color }
              fillOpacity={ 0.2 }
              strokeWidth={ 2 }
            />
          )) }
        </RadarChart>
      );
    }

    return null;
  };

  return (
    <div className={ cn("w-full", className) } style={ { height } }>
      <ResponsiveContainer width="100%" height="100%">
        { renderInner() ?? <></> }
      </ResponsiveContainer>
    </div>
  );
}

// ─── ChartCard ────────────────────────────────────────────
export interface ChartCardProps {
  title?: string;
  description?: string;
  badge?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export function ChartCard({
  title,
  description,
  badge,
  footer,
  className,
  children,
}: ChartCardProps) {
  return (
    <div className={ cn(
      "rounded-2xl border border-border/60 bg-card p-5",
      "shadow-sm flex flex-col gap-4",
      className
    ) }>
      { (title || description || badge) && (
        <div className="flex items-start justify-between gap-3">
          <div>
            { title && (
              <h3 className="text-sm font-semibold text-foreground">{ title }</h3>
            ) }
            { description && (
              <p className="text-xs text-muted-foreground mt-0.5">{ description }</p>
            ) }
          </div>
          { badge }
        </div>
      ) }
      { children }
      { footer && (
        <div className="pt-2 border-t border-border/40 text-xs text-muted-foreground">
          { footer }
        </div>
      ) }
    </div>
  );
}
