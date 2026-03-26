"use client";

import React, { useState } from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import { Chart, ChartCard, CHART_COLORS } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

// ─── Sample data ──────────────────────────────────────────
const MONTHLY = [
  { month: "Jan", revenue: 4200, expenses: 2800, profit: 1400 },
  { month: "Feb", revenue: 5100, expenses: 3100, profit: 2000 },
  { month: "Mar", revenue: 4700, expenses: 2900, profit: 1800 },
  { month: "Apr", revenue: 6300, expenses: 3400, profit: 2900 },
  { month: "May", revenue: 5900, expenses: 3200, profit: 2700 },
  { month: "Jun", revenue: 7100, expenses: 3800, profit: 3300 },
  { month: "Jul", revenue: 6800, expenses: 3600, profit: 3200 },
  { month: "Aug", revenue: 7600, expenses: 4000, profit: 3600 },
  { month: "Sep", revenue: 8100, expenses: 4200, profit: 3900 },
  { month: "Oct", revenue: 7400, expenses: 3900, profit: 3500 },
  { month: "Nov", revenue: 8900, expenses: 4500, profit: 4400 },
  { month: "Dec", revenue: 9200, expenses: 4700, profit: 4500 },
];

const WEEKLY = [
  { day: "Mon", users: 340 },
  { day: "Tue", users: 480 },
  { day: "Wed", users: 520 },
  { day: "Thu", users: 390 },
  { day: "Fri", users: 610 },
  { day: "Sat", users: 720 },
  { day: "Sun", users: 460 },
];

const TRAFFIC = [
  { source: "Organic", value: 4200 },
  { source: "Direct", value: 2800 },
  { source: "Referral", value: 1600 },
  { source: "Social", value: 1100 },
  { source: "Email", value: 800 },
];

const RADAR_DATA = [
  { skill: "Design", score: 85 },
  { skill: "Engineering", score: 92 },
  { skill: "Marketing", score: 68 },
  { skill: "Sales", score: 74 },
  { skill: "Support", score: 88 },
  { skill: "Analytics", score: 79 },
];

const fmt$ = (v: number) => `$${(v / 1000).toFixed(1)}k`;
const fmtN = (v: number) => v.toLocaleString();

export default function ChartPage() {
  return (
    <DocsContent
      title="Chart"
      description="A thin, strongly-typed wrapper around Recharts. Supports line, area, bar, pie (donut), and radar charts. Each chart type accepts a unified data + series API with automatic colour assignment, custom tooltips, and a ChartCard container component."
      importPath='import { Chart, ChartCard } from "@/components/ui/chart";'
    >

      {/* ══════════════════════════════════════
          1. LINE
      ══════════════════════════════════════ */}
      <Section id="line" title="Line Chart"
        description="Pass type='line'. Multiple series are drawn as separate lines with auto-assigned colours.">
        <ComponentPreview code={ `<Chart
  type="line"
  data={monthly}
  xKey="month"
  series={[
    { key: "revenue",  label: "Revenue"  },
    { key: "expenses", label: "Expenses", dashed: true },
  ]}
  yFormatter={v => \`$\${(v/1000).toFixed(1)}k\`}
  height={280}
/>`}>
          <ChartCard
            title="Revenue vs Expenses"
            description="Jan – Dec 2025"
            badge={
              <Badge variant="secondary" className="gap-1 text-xs">
                <TrendingUp className="h-3 w-3 text-emerald-500" /> +18.4%
              </Badge>
            }
            footer="Revenue grew 18.4% YoY · Expenses up 12.1% YoY"
          >
            <Chart
              type="line"
              data={ MONTHLY }
              xKey="month"
              series={ [
                { key: "revenue", label: "Revenue" },
                { key: "expenses", label: "Expenses", dashed: true },
              ] }
              yFormatter={ fmt$ }
              height={ 260 }
              showLegend
            />
          </ChartCard>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. AREA
      ══════════════════════════════════════ */}
      <Section id="area" title="Area Chart"
        description="type='area' fills below each line with a gradient. Great for cumulative or volume data.">
        <ComponentPreview code={ `<Chart
  type="area"
  data={monthly}
  xKey="month"
  series={[{ key: "profit", label: "Net Profit" }]}
  yFormatter={v => \`$\${(v/1000).toFixed(1)}k\`}
/>`}>
          <ChartCard
            title="Net Profit"
            description="Monthly profit after expenses"
            badge={
              <Badge className="gap-1 text-xs bg-emerald-500/10 text-emerald-600 border-emerald-200">
                <TrendingUp className="h-3 w-3" /> +221%
              </Badge>
            }
          >
            <Chart
              type="area"
              data={ MONTHLY }
              xKey="month"
              series={ [ { key: "profit", label: "Net Profit" } ] }
              yFormatter={ fmt$ }
              height={ 260 }
            />
          </ChartCard>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          3. BAR
      ══════════════════════════════════════ */}
      <Section id="bar" title="Bar Chart"
        description="type='bar' renders grouped bars. Add stackId to stack multiple series.">
        <ComponentPreview code={ `<Chart
  type="bar"
  data={monthly}
  xKey="month"
  series={[
    { key: "revenue",  label: "Revenue",  stackId: "a" },
    { key: "expenses", label: "Expenses", stackId: "a" },
  ]}
/>`}>
          <div className="grid gap-4 sm:grid-cols-2">
            <ChartCard title="Weekly Active Users" description="Mon – Sun">
              <Chart
                type="bar"
                data={ WEEKLY }
                xKey="day"
                series={ [ { key: "users", label: "Users" } ] }
                yFormatter={ fmtN }
                height={ 220 }
              />
            </ChartCard>

            <ChartCard title="Revenue vs Expenses" description="Stacked · Jan–Dec">
              <Chart
                type="bar"
                data={ MONTHLY }
                xKey="month"
                series={ [
                  { key: "revenue", label: "Revenue", stackId: "a" },
                  { key: "expenses", label: "Expenses", stackId: "a" },
                ] }
                yFormatter={ fmt$ }
                height={ 220 }
                showLegend
              />
            </ChartCard>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          4. PIE / DONUT
      ══════════════════════════════════════ */}
      <Section id="pie" title="Pie / Donut Chart"
        description="type='pie' renders a donut by default (innerRadius=55%). One series key maps to the value field.">
        <ComponentPreview code={ `<Chart
  type="pie"
  data={traffic}
  xKey="source"
  series={[{ key: "value" }]}
  showLegend
  height={280}
/>`}>
          <div className="max-w-xs">
            <ChartCard
              title="Traffic Sources"
              description="All channels · last 30 days"
              footer={
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  { TRAFFIC.map((t, i) => (
                    <div key={ t.source } className="flex items-center gap-1.5">
                      <span
                        className="h-2 w-2 rounded-full shrink-0"
                        style={ { background: CHART_COLORS[ i % CHART_COLORS.length ] } }
                      />
                      <span>{ t.source }</span>
                      <span className="font-medium text-foreground">
                        { Math.round(t.value / TRAFFIC.reduce((a, b) => a + b.value, 0) * 100) }%
                      </span>
                    </div>
                  )) }
                </div>
              }
            >
              <Chart
                type="pie"
                data={ TRAFFIC }
                xKey="source"
                series={ [ { key: "value", label: "Visits" } ] }
                showTooltip
                height={ 220 }
              />
            </ChartCard>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          5. RADAR
      ══════════════════════════════════════ */}
      <Section id="radar" title="Radar Chart"
        description="type='radar' renders a spider/web chart. Good for skill matrices or multi-dimension comparisons.">
        <ComponentPreview code={ `<Chart
  type="radar"
  data={skills}
  xKey="skill"
  series={[{ key: "score", label: "Score" }]}
  height={280}
/>`}>
          <div className="max-w-xs">
            <ChartCard title="Team Skills" description="Self-assessed scores 0–100">
              <Chart
                type="radar"
                data={ RADAR_DATA }
                xKey="skill"
                series={ [ { key: "score", label: "Score" } ] }
                height={ 260 }
                showTooltip
              />
            </ChartCard>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          6. DASHBOARD LAYOUT
      ══════════════════════════════════════ */}
      <Section id="dashboard" title="Dashboard Layout"
        description="ChartCard composes cleanly into grid dashboards with title, badge, and footer slots.">
        <ComponentPreview code={ `<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <ChartCard title="Revenue" badge={<Badge>↑18%</Badge>}>
    <Chart type="area" data={…} series={[…]} height={120} showAxes={false} grid={false} />
  </ChartCard>
  …
</div>`}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            { [
              { title: "Revenue", key: "revenue", color: CHART_COLORS[ 0 ], trend: "+18%", up: true },
              { title: "Expenses", key: "expenses", color: CHART_COLORS[ 4 ], trend: "+12%", up: false },
              { title: "Profit", key: "profit", color: CHART_COLORS[ 2 ], trend: "+31%", up: true },
            ].map(({ title, key, color, trend, up }) => (
              <ChartCard
                key={ key }
                title={ title }
                badge={
                  <Badge
                    variant="secondary"
                    className={ `gap-1 text-xs ${up ? "text-emerald-600" : "text-red-500"}` }
                  >
                    { up
                      ? <TrendingUp className="h-3 w-3" />
                      : <TrendingDown className="h-3 w-3" />
                    }
                    { trend }
                  </Badge>
                }
              >
                <Chart
                  type="area"
                  data={ MONTHLY }
                  xKey="month"
                  series={ [ { key, color } ] }
                  yFormatter={ fmt$ }
                  height={ 100 }
                  showAxes={ false }
                  grid={ false }
                  showTooltip
                />
              </ChartCard>
            )) }
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          7. PROPS
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <p className="text-sm font-semibold mb-3">Chart</p>
        <PropsTable props={ [
          { name: "type", type: '"line"|"area"|"bar"|"pie"|"radar"', default: "required", description: "Chart type." },
          { name: "data", type: "Record<string, unknown>[]", default: "required", description: "Array of data objects." },
          { name: "series", type: "ChartSeries[]", default: "required", description: "Which keys to plot and how." },
          { name: "xKey", type: "string", default: '"name"', description: "Data key for the X-axis or pie labels." },
          { name: "grid", type: "boolean", default: "true", description: "Show horizontal grid lines." },
          { name: "showAxes", type: "boolean", default: "true", description: "Show X and Y axes." },
          { name: "showLegend", type: "boolean", default: "false", description: "Show series legend." },
          { name: "showTooltip", type: "boolean", default: "true", description: "Enable hover tooltip." },
          { name: "height", type: "number", default: "300", description: "Chart height in px." },
          { name: "yFormatter", type: "(v: number) => string", default: "toLocaleString", description: "Format Y-axis tick labels." },
          { name: "xFormatter", type: "(v: string) => string", default: "—", description: "Format X-axis tick labels." },
          { name: "tooltipContent", type: "(props) => ReactNode", default: "—", description: "Custom tooltip renderer." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">ChartSeries</p>
        <PropsTable props={ [
          { name: "key", type: "string", default: "required", description: "Data key to plot." },
          { name: "label", type: "string", default: "key", description: "Display name in legend/tooltip." },
          { name: "color", type: "string", default: "auto", description: "Override the auto-assigned colour." },
          { name: "dashed", type: "boolean", default: "false", description: "Dashed stroke (line/area only)." },
          { name: "stackId", type: "string", default: "—", description: "Stack key (bar only)." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">ChartCard</p>
        <PropsTable props={ [
          { name: "title", type: "string", default: "—", description: "Card heading." },
          { name: "description", type: "string", default: "—", description: "Subtitle below title." },
          { name: "badge", type: "ReactNode", default: "—", description: "Slot in the top-right corner." },
          { name: "footer", type: "ReactNode", default: "—", description: "Content below the chart." },
        ] } />
      </Section>
    </DocsContent>
  );
}
