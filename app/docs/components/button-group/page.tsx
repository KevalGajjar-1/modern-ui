"use client";

import React, { useState } from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Bold, Italic, Underline, Strikethrough,
  Grid2x2, List, LayoutGrid,
  ChevronDown, Copy, ExternalLink,
  Sun, Moon, Monitor,
  ZoomIn, ZoomOut, RotateCcw,
} from "lucide-react";

export default function ButtonGroupPage() {
  const [ align, setAlign ] = useState("left");
  const [ format, setFormat ] = useState<string[]>([]);
  const [ view, setView ] = useState("grid");
  const [ theme, setTheme ] = useState("system");

  const toggleFormat = (f: string) =>
    setFormat(prev => prev.includes(f) ? prev.filter(x => x !== f) : [ ...prev, f ]);

  return (
    <DocsContent
      title="Button Group"
      description="Groups related buttons into a single cohesive unit. Supports horizontal and vertical orientation, attached (border-merged) and spaced layouts, single and multi-select toggle patterns, and full-width stretching."
      importPath='import { ButtonGroup } from "@/components/ui/button-group";'
    >

      {/* ══════════════════════════════════════
          1. BASIC
      ══════════════════════════════════════ */}
      <Section id="basic" title="Basic"
        description="Default horizontal attached group. Borders between buttons are merged automatically.">
        <ComponentPreview code={ `<ButtonGroup>
  <Button variant="outline">Back</Button>
  <Button variant="outline">Today</Button>
  <Button variant="outline">Forward</Button>
</ButtonGroup>`}>
          <ButtonGroup>
            <Button variant="outline">Back</Button>
            <Button variant="outline">Today</Button>
            <Button variant="outline">Forward</Button>
          </ButtonGroup>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. ICON TOGGLE (SINGLE SELECT)
      ══════════════════════════════════════ */}
      <Section id="single-select" title="Single Select Toggle"
        description="Swap variant on the active button to create a radio-like selection group.">
        <ComponentPreview code={ `const [align, setAlign] = useState("left");

<ButtonGroup>
  {[
    { value: "left",    icon: <AlignLeft />    },
    { value: "center",  icon: <AlignCenter />  },
    { value: "right",   icon: <AlignRight />   },
    { value: "justify", icon: <AlignJustify /> },
  ].map(({ value, icon }) => (
    <Button
      key={value}
      size="icon"
      variant={align === value ? "default" : "outline"}
      onClick={() => setAlign(value)}
    >
      {icon}
    </Button>
  ))}
</ButtonGroup>`}>
          <div className="flex flex-col gap-4">
            {/* Alignment */ }
            <ButtonGroup>
              { [
                { value: "left", icon: <AlignLeft className="h-4 w-4" /> },
                { value: "center", icon: <AlignCenter className="h-4 w-4" /> },
                { value: "right", icon: <AlignRight className="h-4 w-4" /> },
                { value: "justify", icon: <AlignJustify className="h-4 w-4" /> },
              ].map(({ value, icon }) => (
                <Button
                  key={ value }
                  size="icon"
                  variant={ align === value ? "default" : "outline" }
                  onClick={ () => setAlign(value) }
                >
                  { icon }
                </Button>
              )) }
            </ButtonGroup>

            {/* View mode */ }
            <ButtonGroup>
              { [
                { value: "grid", icon: <Grid2x2 className="h-4 w-4" />, label: "Grid" },
                { value: "list", icon: <List className="h-4 w-4" />, label: "List" },
                { value: "card", icon: <LayoutGrid className="h-4 w-4" />, label: "Card" },
              ].map(({ value, icon, label }) => (
                <Button
                  key={ value }
                  variant={ view === value ? "default" : "outline" }
                  size="sm"
                  className="gap-1.5"
                  onClick={ () => setView(value) }
                >
                  { icon } { label }
                </Button>
              )) }
            </ButtonGroup>

            <p className="text-xs text-muted-foreground font-mono">
              align: <strong>{ align }</strong> · view: <strong>{ view }</strong>
            </p>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          3. MULTI-SELECT TOGGLE
      ══════════════════════════════════════ */}
      <Section id="multi-select" title="Multi-Select Toggle"
        description="Allow multiple active buttons simultaneously — useful for rich text formatting toolbars.">
        <ComponentPreview code={ `const [format, setFormat] = useState<string[]>([]);
const toggle = (f: string) =>
  setFormat(p => p.includes(f) ? p.filter(x => x !== f) : [...p, f]);

<ButtonGroup>
  {[
    { value: "bold",          icon: <Bold />          },
    { value: "italic",        icon: <Italic />        },
    { value: "underline",     icon: <Underline />     },
    { value: "strikethrough", icon: <Strikethrough /> },
  ].map(({ value, icon }) => (
    <Button
      key={value}
      size="icon"
      variant={format.includes(value) ? "default" : "outline"}
      onClick={() => toggle(value)}
    >
      {icon}
    </Button>
  ))}
</ButtonGroup>`}>
          <div className="flex flex-col gap-3">
            <ButtonGroup>
              { [
                { value: "bold", icon: <Bold className="h-4 w-4" /> },
                { value: "italic", icon: <Italic className="h-4 w-4" /> },
                { value: "underline", icon: <Underline className="h-4 w-4" /> },
                { value: "strikethrough", icon: <Strikethrough className="h-4 w-4" /> },
              ].map(({ value, icon }) => (
                <Button
                  key={ value }
                  size="icon"
                  variant={ format.includes(value) ? "default" : "outline" }
                  onClick={ () => toggleFormat(value) }
                >
                  { icon }
                </Button>
              )) }
            </ButtonGroup>
            <div className="flex gap-1.5 flex-wrap">
              { format.length === 0
                ? <span className="text-xs text-muted-foreground">No formatting</span>
                : format.map(f => (
                  <Badge key={ f } variant="secondary" className="text-[10px]">{ f }</Badge>
                ))
              }
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          4. VERTICAL
      ══════════════════════════════════════ */}
      <Section id="vertical" title="Vertical Orientation"
        description="Set orientation='vertical' for stacked layouts like sidebars or action panels.">
        <ComponentPreview code={ `<ButtonGroup orientation="vertical">
  <Button variant="outline">Profile</Button>
  <Button variant="outline">Settings</Button>
  <Button variant="outline">Billing</Button>
  <Button variant="outline">Sign out</Button>
</ButtonGroup>`}>
          <div className="flex gap-8 items-start flex-wrap">
            <ButtonGroup orientation="vertical">
              <Button variant="outline" className="justify-start">Profile</Button>
              <Button variant="outline" className="justify-start">Settings</Button>
              <Button variant="outline" className="justify-start">Billing</Button>
              <Button variant="outline" className="justify-start text-red-500 hover:text-red-500">Sign out</Button>
            </ButtonGroup>

            <ButtonGroup orientation="vertical">
              { [
                { value: "system", icon: <Monitor className="h-4 w-4" />, label: "System" },
                { value: "light", icon: <Sun className="h-4 w-4" />, label: "Light" },
                { value: "dark", icon: <Moon className="h-4 w-4" />, label: "Dark" },
              ].map(({ value, icon, label }) => (
                <Button
                  key={ value }
                  variant={ theme === value ? "default" : "outline" }
                  className="justify-start gap-2"
                  onClick={ () => setTheme(value) }
                >
                  { icon } { label }
                </Button>
              )) }
            </ButtonGroup>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          5. SIZES & VARIANTS
      ══════════════════════════════════════ */}
      <Section id="sizes" title="Sizes"
        description="ButtonGroup works with any Button size — all buttons in the group should use the same size.">
        <ComponentPreview code={ `<ButtonGroup><Button size="sm" variant="outline">…</Button></ButtonGroup>
<ButtonGroup><Button size="md" variant="outline">…</Button></ButtonGroup>
<ButtonGroup><Button size="lg" variant="outline">…</Button></ButtonGroup>`}>
          <div className="flex flex-col gap-3 items-start">
            { ([ "sm", "default", "lg" ] as const).map(s => (
              <ButtonGroup key={ s }>
                <Button size={ s } variant="outline">Cut</Button>
                <Button size={ s } variant="outline">Copy</Button>
                <Button size={ s } variant="outline">Paste</Button>
              </ButtonGroup>
            )) }
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          6. MIXED — SPLIT BUTTON
      ══════════════════════════════════════ */}
      <Section id="split" title="Split Button"
        description="Combine a primary action with a dropdown trigger — a common pattern for publish/deploy buttons.">
        <ComponentPreview code={ `<ButtonGroup>
  <Button>Publish</Button>
  <Button size="icon" aria-label="More options">
    <ChevronDown className="h-4 w-4" />
  </Button>
</ButtonGroup>`}>
          <div className="flex flex-wrap gap-3">
            <ButtonGroup>
              <Button>Publish</Button>
              <Button size="icon" aria-label="More options">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </ButtonGroup>

            <ButtonGroup>
              <Button variant="outline" className="gap-1.5">
                <Copy className="h-4 w-4" /> Copy link
              </Button>
              <Button variant="outline" size="icon" aria-label="Open">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </ButtonGroup>

            <ButtonGroup>
              <Button variant="outline" size="icon"><ZoomOut className="h-4 w-4" /></Button>
              <Button variant="outline" size="sm" className="px-3 font-mono text-xs min-w-[52px]">100%</Button>
              <Button variant="outline" size="icon"><ZoomIn className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon"><RotateCcw className="h-4 w-4" /></Button>
            </ButtonGroup>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          7. SPACED (NOT ATTACHED)
      ══════════════════════════════════════ */}
      <Section id="spaced" title="Spaced (Not Attached)"
        description="Set attached={false} for a group with gaps between buttons — same semantic grouping without border merging.">
        <ComponentPreview code={ `<ButtonGroup attached={false}>
  <Button variant="outline">Cancel</Button>
  <Button>Save changes</Button>
</ButtonGroup>`}>
          <div className="flex flex-col gap-3 items-start">
            <ButtonGroup attached={ false } className="gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save changes</Button>
            </ButtonGroup>

            <ButtonGroup attached={ false } className="gap-2">
              <Button variant="destructive">Delete</Button>
              <Button variant="outline">Archive</Button>
              <Button variant="outline">Duplicate</Button>
            </ButtonGroup>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          8. FULL WIDTH
      ══════════════════════════════════════ */}
      <Section id="full-width" title="Full Width"
        description="Set fullWidth to stretch the group to its container, distributing width equally across buttons.">
        <ComponentPreview code={ `<ButtonGroup fullWidth>
  <Button variant="outline">Daily</Button>
  <Button variant="outline">Weekly</Button>
  <Button>Monthly</Button>
  <Button variant="outline">Yearly</Button>
</ButtonGroup>`}>
          <div className="max-w-sm w-full">
            <ButtonGroup fullWidth>
              <Button variant="outline">Daily</Button>
              <Button variant="outline">Weekly</Button>
              <Button>Monthly</Button>
              <Button variant="outline">Yearly</Button>
            </ButtonGroup>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          9. DISABLED
      ══════════════════════════════════════ */}
      <Section id="disabled" title="Disabled"
        description="Set disabled on the group to disable all children at once.">
        <ComponentPreview code={ `<ButtonGroup disabled>
  <Button variant="outline">Back</Button>
  <Button variant="outline">Today</Button>
  <Button variant="outline">Forward</Button>
</ButtonGroup>`}>
          <ButtonGroup disabled>
            <Button variant="outline">Back</Button>
            <Button variant="outline">Today</Button>
            <Button variant="outline">Forward</Button>
          </ButtonGroup>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          10. PROPS
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <PropsTable props={ [
          { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Layout direction of the group." },
          { name: "attached", type: "boolean", default: "true", description: "Merge borders between adjacent buttons." },
          { name: "disabled", type: "boolean", default: "false", description: "Disable all buttons in the group." },
          { name: "fullWidth", type: "boolean", default: "false", description: "Stretch group to fill its container." },
          { name: "variant", type: "ButtonVariant", default: "—", description: "Shared variant hint (consumed via context if needed)." },
          { name: "size", type: "ButtonSize", default: "—", description: "Shared size hint (consumed via context if needed)." },
        ] } />
      </Section>
    </DocsContent>
  );
}
