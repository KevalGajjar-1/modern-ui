"use client";

import React, { useState } from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import {
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Grid2x2, List, LayoutGrid,
  Sun, Moon, Monitor,
  Quote, Code, Link2,
} from "lucide-react";

export default function ToggleGroupPage() {
  const [align, setAlign] = useState("left");
  const [format, setFormat] = useState<string[]>([]);
  const [view, setView] = useState("grid");
  const [theme, setTheme] = useState("system");

  const toggleFormat = (f: string) =>
    setFormat(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);

  return (
    <DocsContent
      title="Toggle Group"
      description="A set of toggleable buttons that work as radio buttons (single selection) or checkboxes (multiple selection). Supports connected pill strips, separated layouts, keyboard navigation, and full accessibility."
      importPath='import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";'
    >

      {/* ══════════════════════════════════════
          1. BASIC SINGLE
      ══════════════════════════════════════ */}
      <Section id="single" title="Single Selection"
        description="type='single' acts like radio buttons - only one item can be active at a time.">
        <ComponentPreview code={`const [value, setValue] = useState("left");

<ToggleGroup type="single" value={value} onValueChange={(v) => setValue(v as string)}>
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`}>
        <div className="flex flex-col gap-4 items-start">
          <ToggleGroup type="single" value={align} onValueChange={(v) => setAlign(v as string)}>
            <ToggleGroupItem value="left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right">Right</ToggleGroupItem>
          </ToggleGroup>
          <p className="text-xs text-muted-foreground font-mono">
            Selected: <strong>{align}</strong>
          </p>
        </div>
      </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. MULTIPLE SELECTION
      ══════════════════════════════════════ */}
      <Section id="multiple" title="Multiple Selection"
        description="type='multiple' acts like checkboxes - any number of items can be active.">
        <ComponentPreview code={`const [formats, setFormats] = useState<string[]>([]);
const toggle = (f: string) =>
  setFormats(p => p.includes(f) ? p.filter(x => x !== f) : [...p, f]);

<ToggleGroup type="multiple" value={formats} onValueChange={setFormats}>
  <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
  <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
  <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
</ToggleGroup>`}>
        <div className="flex flex-col gap-4 items-start">
          <ToggleGroup type="multiple" value={format} onValueChange={(v) => setFormat(v as string[])}>
            <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
            <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
            <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
            <ToggleGroupItem value="strikethrough">Strike</ToggleGroupItem>
          </ToggleGroup>
          <div className="flex gap-1.5 flex-wrap">
            {format.length === 0
              ? <span className="text-xs text-muted-foreground">No formatting</span>
              : format.map(f => (
                  <Badge key={f} variant="secondary" className="text-[10px]">{f}</Badge>
                ))
            }
          </div>
        </div>
      </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          3. ICON TOGGLES
      ══════════════════════════════════════ */}
      <Section id="icons" title="Icon Toggles"
        description="Works perfectly with icons for toolbars and formatting controls.">
        <ComponentPreview code={`<ToggleGroup type="multiple" value={formats} onValueChange={setFormats}>
  <ToggleGroupItem value="bold" size="xs">
    <Bold className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" size="xs">
    <Italic className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline" size="xs">
    <Underline className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`}>
        <div className="flex flex-col gap-4 items-start">
          <ToggleGroup type="multiple" value={format} onValueChange={(v) => setFormat(v as string[])}>
            <ToggleGroupItem value="bold" size="xs">
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" size="xs">
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" size="xs">
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="strikethrough" size="xs">
              <Strikethrough className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          4. VERTICAL ORIENTATION
      ══════════════════════════════════════ */}
      <Section id="vertical" title="Vertical Orientation"
        description="Set orientation='vertical' for stacked layouts like sidebars or settings panels.">
        <ComponentPreview code={`<ToggleGroup type="single" orientation="vertical" value={theme} onValueChange={setTheme}>
  <ToggleGroupItem value="system" className="justify-start gap-2">
    <Monitor className="h-4 w-4" /> System
  </ToggleGroupItem>
  <ToggleGroupItem value="light" className="justify-start gap-2">
    <Sun className="h-4 w-4" /> Light
  </ToggleGroupItem>
  <ToggleGroupItem value="dark" className="justify-start gap-2">
    <Moon className="h-4 w-4" /> Dark
  </ToggleGroupItem>
</ToggleGroup>`}>
        <div className="flex gap-8 items-start">
          <ToggleGroup type="single" orientation="vertical" value={theme} onValueChange={(v) => setTheme(v as string)}>
            <ToggleGroupItem value="system" className="justify-start gap-2">
              <Monitor className="h-4 w-4" /> System
            </ToggleGroupItem>
            <ToggleGroupItem value="light" className="justify-start gap-2">
              <Sun className="h-4 w-4" /> Light
            </ToggleGroupItem>
            <ToggleGroupItem value="dark" className="justify-start gap-2">
              <Moon className="h-4 w-4" /> Dark
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          5. SEPARATED (NOT CONNECTED)
      ══════════════════════════════════════ */}
      <Section id="separated" title="Separated Layout"
        description="Set connected={false} for individual buttons with gaps instead of a merged pill strip.">
        <ComponentPreview code={`<ToggleGroup type="single" connected={false} value={view} onValueChange={setView}>
  <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
  <ToggleGroupItem value="list">List</ToggleGroupItem>
  <ToggleGroupItem value="card">Card</ToggleGroupItem>
</ToggleGroup>`}>
        <div className="flex flex-col gap-4 items-start">
          <ToggleGroup type="single" connected={false} value={view} onValueChange={(v) => setView(v as string)}>
            <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
            <ToggleGroupItem value="list">List</ToggleGroupItem>
            <ToggleGroupItem value="card">Card</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          6. SIZES & VARIANTS
      ══════════════════════════════════════ */}
      <Section id="sizes" title="Sizes & Variants"
        description="Supports all Toggle sizes (sm, md, lg, icon) and variants (default, outline, ghost).">
        <ComponentPreview code={`<ToggleGroup type="single" variant="outline" size="sm">
  <ToggleGroupItem value="s">Small</ToggleGroupItem>
  <ToggleGroupItem value="m">Medium</ToggleGroupItem>
</ToggleGroup>

<ToggleGroup type="single" variant="ghost" size="lg">
  <ToggleGroupItem value="a">Large</ToggleGroupItem>
  <ToggleGroupItem value="b">Ghost</ToggleGroupItem>
</ToggleGroup>`}>
        <div className="flex flex-col gap-4 items-start">
          <ToggleGroup type="single" variant="outline" size="sm">
            <ToggleGroupItem value="s">Small</ToggleGroupItem>
            <ToggleGroupItem value="m">Medium</ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup type="single" variant="ghost" size="lg">
            <ToggleGroupItem value="a">Large</ToggleGroupItem>
            <ToggleGroupItem value="b">Ghost</ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup type="single" size="xs">
            <ToggleGroupItem value="quote"><Quote className="h-4 w-4" /></ToggleGroupItem>
            <ToggleGroupItem value="code"><Code className="h-4 w-4" /></ToggleGroupItem>
            <ToggleGroupItem value="link"><Link2 className="h-4 w-4" /></ToggleGroupItem>
          </ToggleGroup>
        </div>
      </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          7. DISABLED
      ══════════════════════════════════════ */}
      <Section id="disabled" title="Disabled"
        description="Set disabled on the group to disable all items, or on individual items for selective disabling.">
        <ComponentPreview code={`<ToggleGroup type="single" disabled value="left">
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`}>
        <div className="flex flex-col gap-4 items-start">
          <ToggleGroup type="single" disabled value="left">
            <ToggleGroupItem value="left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right">Right</ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup type="multiple" value={["bold"]}>
            <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
            <ToggleGroupItem value="italic" disabled>Italic</ToggleGroupItem>
            <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          8. PROPS
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <p className="text-sm font-semibold mb-3">ToggleGroup</p>
        <PropsTable props={[
          { name: "type", type: '"single" | "multiple"', default: '"single"', description: "Selection behavior." },
          { name: "value", type: "string | string[]", default: "—", description: "Controlled selected value(s)." },
          { name: "defaultValue", type: "string | string[]", default: "—", description: "Initial uncontrolled value." },
          { name: "onValueChange", type: "(value: string | string[]) => void", default: "—", description: "Called when selection changes." },
          { name: "variant", type: "ToggleVariant", default: '"default"', description: "Visual style for all items." },
          { name: "size", type: "ToggleSize", default: '"md"', description: "Size for all items." },
          { name: "disabled", type: "boolean", default: "false", description: "Disable all items." },
          { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Layout direction." },
          { name: "connected", type: "boolean", default: "true", description: "Merge borders into pill strip." },
          { name: "loop", type: "boolean", default: "true", description: "Arrow key navigation loops." },
          { name: "aria-label", type: "string", default: "—", description: "Accessible label." },
        ]} />

        <p className="text-sm font-semibold mb-3 mt-8">ToggleGroupItem</p>
        <PropsTable props={[
          { name: "value", type: "string", default: "required", description: "Unique identifier for the item." },
          { name: "variant", type: "ToggleVariant", default: "inherited", description: "Override group variant." },
          { name: "size", type: "ToggleSize", default: "inherited", description: "Override group size." },
          { name: "disabled", type: "boolean", default: "inherited", description: "Override group disabled state." },
          { name: "className", type: "string", default: "—", description: "Additional CSS classes." },
        ]} />
      </Section>
    </DocsContent>
  );
}
