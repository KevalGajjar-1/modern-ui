"use client";

import React, { useState } from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Link2, Code2,
  Sun, Moon, Monitor,
  Grid2x2, LayoutList, LayoutGrid,
  Mic, MicOff, Video, VideoOff, Volume2, VolumeX,
} from "lucide-react";

export default function TogglePage() {
  // Controlled states for live demos
  const [isBold,      setIsBold]      = useState(false);
  const [isItalic,    setIsItalic]    = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [alignment,   setAlignment]   = useState("left");
  const [formats,     setFormats]     = useState<string[]>(["bold"]);
  const [theme,       setTheme]       = useState("system");
  const [view,        setView]        = useState("grid");
  const [micOn,       setMicOn]       = useState(true);
  const [videoOn,     setVideoOn]     = useState(true);
  const [muteOn,      setMuteOn]      = useState(false);

  return (
    <DocsContent
      title="Toggle"
      description="A two-state button that can be either on or off. Supports single toggles and grouped toggle sets with single or multiple selection, full keyboard navigation, and five visual variants."
      importPath='import { Toggle } from "@/components/ui/toggle";'
    >

      {/* ══════════════════════════════════════════
          1. BASIC
      ══════════════════════════════════════════ */}
      <Section
        id="basic"
        title="Basic"
        description="A standalone toggle button. Click to switch between on and off states."
      >
        <ComponentPreview
          code={`import { Toggle } from "@/components/ui/toggle";
import { Bold } from "lucide-react";

<Toggle aria-label="Bold" defaultPressed>
  <Bold className="h-4 w-4" />
</Toggle>`}
        >
          <div className="flex items-center gap-3">
            <Toggle aria-label="Toggle bold" defaultPressed>
              <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle aria-label="Toggle italic">
              <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle aria-label="Toggle underline">
              <Underline className="h-4 w-4" />
            </Toggle>
            <Toggle aria-label="Toggle strikethrough">
              <Strikethrough className="h-4 w-4" />
            </Toggle>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════════
          2. VARIANTS
      ══════════════════════════════════════════ */}
      <Section
        id="variants"
        title="Variants"
        description="Five visual styles. Each supports both the on and off state with distinct active styling."
      >
        <ComponentPreview
          code={`<Toggle variant="default"  defaultPressed><Bold className="h-4 w-4" /> Default</Toggle>
<Toggle variant="outline"  defaultPressed><Bold className="h-4 w-4" /> Outline</Toggle>
<Toggle variant="ghost"    defaultPressed><Bold className="h-4 w-4" /> Ghost</Toggle>
<Toggle variant="soft"     defaultPressed><Bold className="h-4 w-4" /> Soft</Toggle>
<Toggle variant="solid"    defaultPressed><Bold className="h-4 w-4" /> Solid</Toggle>`}
        >
          <div className="flex flex-wrap gap-3">
            {(["default", "outline", "ghost", "soft", "solid"] as const).map(v => (
              <Toggle key={v} variant={v} defaultPressed aria-label={v}>
                <Bold className="h-4 w-4" />
                <span className="capitalize">{v}</span>
              </Toggle>
            ))}
          </div>
        </ComponentPreview>

        {/* Show off state too */}
        <ComponentPreview
          code={`{/* Same variants — all OFF state */}
<Toggle variant="default">Default</Toggle>
<Toggle variant="outline">Outline</Toggle>
<Toggle variant="ghost">Ghost</Toggle>
<Toggle variant="soft">Soft</Toggle>
<Toggle variant="solid">Solid</Toggle>`}
        >
          <div className="flex flex-wrap gap-3">
            {(["default", "outline", "ghost", "soft", "solid"] as const).map(v => (
              <Toggle key={v} variant={v} aria-label={v}>
                <Bold className="h-4 w-4" />
                <span className="capitalize">{v}</span>
              </Toggle>
            ))}
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════════
          3. SIZES
      ══════════════════════════════════════════ */}
      <Section
        id="sizes"
        title="Sizes"
        description="Five sizes — xs through xl — to match any density requirement."
      >
        <ComponentPreview
          code={`<Toggle size="xs" variant="outline"><Bold className="h-3 w-3" />   XS</Toggle>
<Toggle size="sm" variant="outline"><Bold className="h-3.5 w-3.5" /> SM</Toggle>
<Toggle size="md" variant="outline"><Bold className="h-4 w-4" />   MD</Toggle>
<Toggle size="lg" variant="outline"><Bold className="h-4.5 w-4.5" /> LG</Toggle>
<Toggle size="xl" variant="outline"><Bold className="h-5 w-5" />   XL</Toggle>`}
        >
          <div className="flex flex-wrap items-center gap-3">
            {(["xs", "sm", "md", "lg", "xl"] as const).map(s => (
              <Toggle key={s} size={s} variant="outline" aria-label={s}>
                <Bold />
                <span className="uppercase">{s}</span>
              </Toggle>
            ))}
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════════
          4. CONTROLLED STATE
      ══════════════════════════════════════════ */}
      <Section
        id="controlled"
        title="Controlled"
        description="Manage the pressed state externally using the pressed and onPressedChange props."
      >
        <ComponentPreview
          code={`const [isBold,      setIsBold]      = useState(false);
const [isItalic,    setIsItalic]    = useState(false);
const [isUnderline, setIsUnderline] = useState(false);

<Toggle
  pressed={isBold}
  onPressedChange={setIsBold}
  variant="outline"
  aria-label="Toggle bold"
>
  <Bold className="h-4 w-4" />
  Bold
</Toggle>

<Toggle
  pressed={isItalic}
  onPressedChange={setIsItalic}
  variant="outline"
  aria-label="Toggle italic"
>
  <Italic className="h-4 w-4" />
  Italic
</Toggle>

<Toggle
  pressed={isUnderline}
  onPressedChange={setIsUnderline}
  variant="outline"
  aria-label="Toggle underline"
>
  <Underline className="h-4 w-4" />
  Underline
</Toggle>`}
        >
          <div className="flex flex-col gap-4 items-start">
            <div className="flex gap-2">
              <Toggle pressed={isBold}      onPressedChange={setIsBold}      variant="outline" aria-label="Toggle bold">
                <Bold className="h-4 w-4" /> Bold
              </Toggle>
              <Toggle pressed={isItalic}    onPressedChange={setIsItalic}    variant="outline" aria-label="Toggle italic">
                <Italic className="h-4 w-4" /> Italic
              </Toggle>
              <Toggle pressed={isUnderline} onPressedChange={setIsUnderline} variant="outline" aria-label="Toggle underline">
                <Underline className="h-4 w-4" /> Underline
              </Toggle>
            </div>
            <p className="text-xs text-muted-foreground font-mono bg-muted/50 px-3 py-2 rounded-lg">
              State → bold: <strong>{String(isBold)}</strong>
              {"  "}italic: <strong>{String(isItalic)}</strong>
              {"  "}underline: <strong>{String(isUnderline)}</strong>
            </p>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════════
          5. DISABLED
      ══════════════════════════════════════════ */}
      <Section
        id="disabled"
        title="Disabled"
        description="Set disabled to prevent interaction. Works on both Toggle and ToggleGroupItem."
      >
        <ComponentPreview
          code={`<Toggle disabled aria-label="Bold"><Bold className="h-4 w-4" /> Bold</Toggle>
<Toggle disabled defaultPressed variant="outline" aria-label="Italic">
  <Italic className="h-4 w-4" /> Italic (pressed)
</Toggle>

{/* Disable individual item in a group */}
<ToggleGroup type="single" defaultValue="left" connected>
  <ToggleGroupItem value="left"><AlignLeft className="h-4 w-4" /></ToggleGroupItem>
  <ToggleGroupItem value="center" disabled><AlignCenter className="h-4 w-4" /></ToggleGroupItem>
  <ToggleGroupItem value="right"><AlignRight className="h-4 w-4" /></ToggleGroupItem>
</ToggleGroup>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <Toggle disabled aria-label="Bold">
              <Bold className="h-4 w-4" /> Bold
            </Toggle>
            <Toggle disabled defaultPressed variant="outline" aria-label="Italic (pressed)">
              <Italic className="h-4 w-4" /> Italic
            </Toggle>
            <ToggleGroup type="single" defaultValue="left" connected aria-label="Text alignment">
              <ToggleGroupItem value="left"   aria-label="Align left">   <AlignLeft    className="h-4 w-4" /></ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Align center" disabled><AlignCenter  className="h-4 w-4" /></ToggleGroupItem>
              <ToggleGroupItem value="right"  aria-label="Align right">  <AlignRight   className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════════
          6. TOGGLE GROUP — SINGLE
      ══════════════════════════════════════════ */}
      <Section
        id="toggle-group-single"
        title="Toggle Group — Single"
        description="Only one item can be active at a time. Behaves like a radio group. Use for mutually exclusive choices like text alignment or view mode."
      >
        <ComponentPreview
          code={`import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";

const [alignment, setAlignment] = useState("left");

<ToggleGroup
  type="single"
  value={alignment}
  onValueChange={v => v && setAlignment(v)}
  variant="outline"
  connected
  aria-label="Text alignment"
>
  <ToggleGroupItem value="left"    aria-label="Align left">
    <AlignLeft className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="center"  aria-label="Align center">
    <AlignCenter className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="right"   aria-label="Align right">
    <AlignRight className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="justify" aria-label="Justify">
    <AlignJustify className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`}
        >
          <div className="flex flex-col gap-5 items-start">
            {/* Alignment */}
            <div className="flex flex-col gap-2">
              <p className="text-xs text-muted-foreground font-medium">Text Alignment</p>
              <ToggleGroup
                type="single"
                value={alignment}
                onValueChange={v => v && setAlignment(v as "left" | "center" | "right" | "justify")}
                variant="outline"
                connected
                aria-label="Text alignment"
              >
                <ToggleGroupItem value="left"    aria-label="Align left">    <AlignLeft    className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="center"  aria-label="Align center">  <AlignCenter  className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="right"   aria-label="Align right">   <AlignRight   className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="justify" aria-label="Justify">       <AlignJustify className="h-4 w-4" /></ToggleGroupItem>
              </ToggleGroup>
              <p className="text-xs font-mono text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-md">
                alignment: <strong>"{alignment}"</strong>
              </p>
            </div>

            {/* Theme switcher */}
            <div className="flex flex-col gap-2">
              <p className="text-xs text-muted-foreground font-medium">Theme</p>
              <ToggleGroup
                type="single"
                value={theme}
                onValueChange={v => v && setTheme(v as "light" | "system" | "dark")}
                variant="soft"
                connected={false}
                aria-label="Theme selection"
              >
                <ToggleGroupItem value="light" aria-label="Light mode">
                  <Sun  className="h-4 w-4" /> Light
                </ToggleGroupItem>
                <ToggleGroupItem value="system" aria-label="System default">
                  <Monitor className="h-4 w-4" /> System
                </ToggleGroupItem>
                <ToggleGroupItem value="dark" aria-label="Dark mode">
                  <Moon className="h-4 w-4" /> Dark
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* View switcher */}
            <div className="flex flex-col gap-2">
              <p className="text-xs text-muted-foreground font-medium">View</p>
              <ToggleGroup
                type="single"
                value={view}
                onValueChange={v => v && setView(v as "grid" | "list")}
                variant="outline"
                size="sm"
                connected
                aria-label="View mode"
              >
                <ToggleGroupItem value="grid" aria-label="Grid view">
                  <LayoutGrid className="h-4 w-4" /> Grid
                </ToggleGroupItem>
                <ToggleGroupItem value="list" aria-label="List view">
                  <LayoutList className="h-4 w-4" /> List
                </ToggleGroupItem>
                <ToggleGroupItem value="table" aria-label="Table view">
                  <Grid2x2 className="h-4 w-4" /> Table
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════════
          7. TOGGLE GROUP — MULTIPLE
      ══════════════════════════════════════════ */}
      <Section
        id="toggle-group-multiple"
        title="Toggle Group — Multiple"
        description="Any number of items can be active simultaneously. Use for text formatting, filters, or feature flags."
      >
        <ComponentPreview
          code={`const [formats, setFormats] = useState<string[]>(["bold"]);

<ToggleGroup
  type="multiple"
  value={formats}
  onValueChange={v => setFormats(v as string[])}
  variant="outline"
  connected
  aria-label="Text formatting"
>
  <ToggleGroupItem value="bold"          aria-label="Bold">
    <Bold className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic"        aria-label="Italic">
    <Italic className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline"     aria-label="Underline">
    <Underline className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="strikethrough" aria-label="Strikethrough">
    <Strikethrough className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="code"          aria-label="Inline code">
    <Code2 className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="link"          aria-label="Link">
    <Link2 className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`}
        >
          <div className="flex flex-col gap-5 items-start">
            {/* Rich text formatting */}
            <div className="flex flex-col gap-2">
              <p className="text-xs text-muted-foreground font-medium">Text Formatting</p>
              <ToggleGroup
                type="multiple"
                value={formats}
                onValueChange={v => setFormats(v as string[])}
                variant="outline"
                connected
                aria-label="Text formatting"
              >
                <ToggleGroupItem value="bold"          aria-label="Bold">         <Bold          className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="italic"        aria-label="Italic">       <Italic        className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="underline"     aria-label="Underline">    <Underline     className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="strikethrough" aria-label="Strikethrough"><Strikethrough className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="code"          aria-label="Inline code">  <Code2         className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="link"          aria-label="Link">         <Link2         className="h-4 w-4" /></ToggleGroupItem>
              </ToggleGroup>
              <p className="text-xs font-mono text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-md">
                formats: <strong>[{formats.map(f => `"${f}"`).join(", ")}]</strong>
              </p>
            </div>

            {/* List types */}
            <div className="flex flex-col gap-2">
              <p className="text-xs text-muted-foreground font-medium">List Style</p>
              <ToggleGroup
                type="multiple"
                defaultValue={["bullet"]}
                variant="soft"
                connected={false}
                aria-label="List types"
              >
                <ToggleGroupItem value="bullet" aria-label="Bullet list">
                  <List className="h-4 w-4" /> Bullet
                </ToggleGroupItem>
                <ToggleGroupItem value="ordered" aria-label="Ordered list">
                  <ListOrdered className="h-4 w-4" /> Ordered
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════════
          8. VERTICAL ORIENTATION
      ══════════════════════════════════════════ */}
      <Section
        id="vertical"
        title="Vertical Orientation"
        description="Use orientation='vertical' for sidebar nav, toolbars, or stacked controls. Arrow Up/Down navigates between items."
      >
        <ComponentPreview
          code={`<ToggleGroup
  type="single"
  orientation="vertical"
  defaultValue="left"
  variant="ghost"
  connected
  aria-label="Text alignment"
>
  <ToggleGroupItem value="left"><AlignLeft className="h-4 w-4" /> Left</ToggleGroupItem>
  <ToggleGroupItem value="center"><AlignCenter className="h-4 w-4" /> Center</ToggleGroupItem>
  <ToggleGroupItem value="right"><AlignRight className="h-4 w-4" /> Right</ToggleGroupItem>
  <ToggleGroupItem value="justify"><AlignJustify className="h-4 w-4" /> Justify</ToggleGroupItem>
</ToggleGroup>`}
        >
          <div className="flex gap-8 items-start">
            {/* Vertical connected */}
            <div className="flex flex-col gap-2">
              <p className="text-xs text-muted-foreground font-medium">Connected</p>
              <ToggleGroup
                type="single"
                orientation="vertical"
                defaultValue="left"
                variant="ghost"
                connected
                aria-label="Text alignment vertical"
              >
                <ToggleGroupItem value="left"    aria-label="Left">    <AlignLeft    className="h-4 w-4" /> Left</ToggleGroupItem>
                <ToggleGroupItem value="center"  aria-label="Center">  <AlignCenter  className="h-4 w-4" /> Center</ToggleGroupItem>
                <ToggleGroupItem value="right"   aria-label="Right">   <AlignRight   className="h-4 w-4" /> Right</ToggleGroupItem>
                <ToggleGroupItem value="justify" aria-label="Justify"> <AlignJustify className="h-4 w-4" /> Justify</ToggleGroupItem>
              </ToggleGroup>
            </div>
            {/* Vertical separated */}
            <div className="flex flex-col gap-2">
              <p className="text-xs text-muted-foreground font-medium">Separated</p>
              <ToggleGroup
                type="single"
                orientation="vertical"
                defaultValue="system"
                variant="soft"
                connected={false}
                aria-label="Theme vertical"
              >
                <ToggleGroupItem value="light"  aria-label="Light"> <Sun     className="h-4 w-4" /> Light</ToggleGroupItem>
                <ToggleGroupItem value="system" aria-label="System"><Monitor className="h-4 w-4" /> System</ToggleGroupItem>
                <ToggleGroupItem value="dark"   aria-label="Dark">  <Moon    className="h-4 w-4" /> Dark</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════════
          9. REAL-WORLD EXAMPLES
      ══════════════════════════════════════════ */}
      <Section
        id="examples"
        title="Real-world Examples"
        description="Common UI patterns built with Toggle and ToggleGroup."
      >
        {/* Meeting controls */}
        <ComponentPreview
          code={`{/* Video call controls */}
const [micOn,   setMicOn]   = useState(true);
const [videoOn, setVideoOn] = useState(true);
const [muteOn,  setMuteOn]  = useState(false);

<div className="flex gap-2 p-3 bg-zinc-900 rounded-2xl">
  <Toggle
    pressed={micOn}
    onPressedChange={setMicOn}
    variant="solid"
    size="lg"
    className={micOn ? "" : "bg-red-500/20 text-red-400 data-[state=on]:bg-red-500/20 data-[state=on]:text-red-400"}
    aria-label="Toggle microphone"
  >
    {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
  </Toggle>
  <Toggle pressed={videoOn} onPressedChange={setVideoOn} variant="solid" size="lg" aria-label="Toggle camera">
    {videoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
  </Toggle>
  <Toggle pressed={muteOn} onPressedChange={setMuteOn} variant="solid" size="lg" aria-label="Toggle volume">
    {muteOn ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
  </Toggle>
</div>`}
        >
          <div className="flex flex-col gap-6 items-start">

            {/* Meeting controls */}
            <div className="flex flex-col gap-2">
              <p className="text-xs text-muted-foreground font-medium">Meeting Controls</p>
              <div className="flex gap-2 p-3 bg-zinc-900 dark:bg-zinc-800 rounded-2xl">
                <Toggle
                  pressed={micOn}
                  onPressedChange={setMicOn}
                  variant="solid"
                  size="lg"
                  className={!micOn ? "bg-red-500/20 text-red-400 data-[state=on]:bg-red-500/20 data-[state=on]:text-red-400 hover:bg-red-500/30" : ""}
                  aria-label="Toggle microphone"
                >
                  {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </Toggle>
                <Toggle
                  pressed={videoOn}
                  onPressedChange={setVideoOn}
                  variant="solid"
                  size="lg"
                  className={!videoOn ? "bg-red-500/20 text-red-400 data-[state=on]:bg-red-500/20 data-[state=on]:text-red-400 hover:bg-red-500/30" : ""}
                  aria-label="Toggle camera"
                >
                  {videoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </Toggle>
                <Toggle
                  pressed={muteOn}
                  onPressedChange={setMuteOn}
                  variant="solid"
                  size="lg"
                  aria-label="Toggle volume"
                >
                  {muteOn ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Toggle>
              </div>
              <p className="text-xs font-mono text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-md">
                mic: <strong>{micOn ? "on" : "off"}</strong>{"  "}
                video: <strong>{videoOn ? "on" : "off"}</strong>{"  "}
                mute: <strong>{muteOn ? "on" : "off"}</strong>
              </p>
            </div>

            {/* All variants + sizes grid */}
            <div className="flex flex-col gap-2 w-full">
              <p className="text-xs text-muted-foreground font-medium">Variant × Size Matrix</p>
              <div className="overflow-x-auto">
                <table className="text-xs border-collapse w-full">
                  <thead>
                    <tr>
                      <th className="py-2 px-3 text-left text-muted-foreground font-medium">Variant ↓ / Size →</th>
                      {(["xs","sm","md","lg","xl"] as const).map(s => (
                        <th key={s} className="py-2 px-3 text-muted-foreground font-medium uppercase">{s}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(["default","outline","ghost","soft","solid"] as const).map(v => (
                      <tr key={v} className="border-t border-border/40">
                        <td className="py-2 px-3 text-muted-foreground font-mono capitalize">{v}</td>
                        {(["xs","sm","md","lg","xl"] as const).map(s => (
                          <td key={s} className="py-2 px-3">
                            <Toggle variant={v} size={s} defaultPressed aria-label={`${v} ${s}`}>
                              <Bold />
                            </Toggle>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════════
          10. PROPS TABLE
      ══════════════════════════════════════════ */}
      <Section id="props" title="API Reference">

        <p className="text-sm font-semibold mb-3">Toggle</p>
        <PropsTable
          props={[
            { name:"pressed",          type:"boolean",                                             default:"—",           description:"Controlled pressed state. Use with onPressedChange." },
            { name:"defaultPressed",   type:"boolean",                                             default:"false",       description:"Initial pressed state for uncontrolled usage." },
            { name:"onPressedChange",  type:"(pressed: boolean) => void",                          default:"—",           description:"Callback invoked when the pressed state changes." },
            { name:"variant",          type:'"default" | "outline" | "ghost" | "soft" | "solid"', default:'"default"',   description:"Visual style of the toggle." },
            { name:"size",             type:'"xs" | "sm" | "md" | "lg" | "xl"',                   default:'"md"',        description:"Size of the toggle button." },
            { name:"disabled",         type:"boolean",                                             default:"false",       description:"Prevents interaction and dims the button." },
            { name:"className",        type:"string",                                              default:"—",           description:"Additional Tailwind classes to merge." },
            { name:"aria-label",       type:"string",                                              default:"—",           description:"Accessible label — required when no visible text.", required:true },
          ]}
        />

        <p className="text-sm font-semibold mb-3 mt-8">ToggleGroup</p>
        <PropsTable
          props={[
            { name:"type",             type:'"single" | "multiple"',                               default:'"single"',    description:"Controls how many items can be active simultaneously.", required:true },
            { name:"value",            type:"string | string[]",                                   default:"—",           description:"Controlled active value(s)." },
            { name:"defaultValue",     type:"string | string[]",                                   default:"—",           description:"Initial value(s) for uncontrolled usage." },
            { name:"onValueChange",    type:"(value: string | string[]) => void",                  default:"—",           description:"Callback with the new value(s) when selection changes." },
            { name:"variant",          type:'"default" | "outline" | "ghost" | "soft" | "solid"', default:'"default"',   description:"Applied to all items unless individually overridden." },
            { name:"size",             type:'"xs" | "sm" | "md" | "lg" | "xl"',                   default:'"md"',        description:"Applied to all items unless individually overridden." },
            { name:"orientation",      type:'"horizontal" | "vertical"',                           default:'"horizontal"',description:"Controls layout direction and arrow-key navigation axis." },
            { name:"connected",        type:"boolean",                                             default:"true",        description:"Merges items into a single pill strip with shared borders." },
            { name:"loop",             type:"boolean",                                             default:"true",        description:"Whether keyboard navigation wraps from last item to first." },
            { name:"disabled",         type:"boolean",                                             default:"false",       description:"Disables all items in the group." },
          ]}
        />

        <p className="text-sm font-semibold mb-3 mt-8">ToggleGroupItem</p>
        <PropsTable
          props={[
            { name:"value",    type:"string",                                             default:"—",         description:"Unique identifier matched against the group's active value.", required:true },
            { name:"variant",  type:'"default" | "outline" | "ghost" | "soft" | "solid"',default:"(group)",  description:"Override the group variant for this item only." },
            { name:"size",     type:'"xs" | "sm" | "md" | "lg" | "xl"',                  default:"(group)",  description:"Override the group size for this item only." },
            { name:"disabled", type:"boolean",                                            default:"false",     description:"Disables this item only, leaving others interactive." },
          ]}
        />
      </Section>

    </DocsContent>
  );
}
