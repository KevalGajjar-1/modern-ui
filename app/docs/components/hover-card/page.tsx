"use client";

import React from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays, MapPin, Link2, Users,
  Star, GitFork, Eye, Package,
  Building2, Clock,
} from "lucide-react";

export default function HoverCardPage() {
  return (
    <DocsContent
      title="Hover Card"
      description="A rich floating card that appears when hovering or focusing a trigger element. Built with pure React portals, viewport-aware positioning, and configurable open/close delays."
      importPath='import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";'
    >

      {/* ══════════════════════════════════════
          1. BASIC
      ══════════════════════════════════════ */}
      <Section
        id="basic"
        title="Basic"
        description="Hover over the trigger to reveal the card. It positions itself automatically to stay within the viewport."
      >
        <ComponentPreview
          code={ `import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

<HoverCard>
  <HoverCardTrigger asChild>
    <a href="#" className="underline decoration-dotted font-medium">
      @shadcn
    </a>
  </HoverCardTrigger>
  <HoverCardContent>
    <div className="flex gap-4 p-4">
      <Avatar>
        <AvatarImage src="…" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="font-semibold text-sm">@shadcn</h4>
        <p className="text-xs text-muted-foreground mt-1">
          Creator of shadcn/ui. Building design systems.
        </p>
        <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" />
          Joined December 2021
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`}
        >
          <div className="flex justify-center p-6">
            <HoverCard>
              <HoverCardTrigger asChild>
                <a href="#" className="underline decoration-dotted font-medium text-foreground hover:text-primary transition-colors">
                  @shadcn
                </a>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex gap-4 p-4">
                  <Avatar className="h-12 w-12 shrink-0">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-semibold text-sm">@shadcn</h4>
                      <Badge variant="secondary" className="text-[10px]">Pro</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Creator of shadcn/ui. Building open-source design systems and tools.
                    </p>
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" />
                      Joined December 2021
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. VARIANTS
      ══════════════════════════════════════ */}
      <Section
        id="variants"
        title="Variants"
        description="Four visual card styles. Glass works especially well on image-heavy backgrounds."
      >
        <ComponentPreview
          code={ `<HoverCardContent variant="default">…</HoverCardContent>
<HoverCardContent variant="outline">…</HoverCardContent>
<HoverCardContent variant="elevated">…</HoverCardContent>
<HoverCardContent variant="glass">…</HoverCardContent>`}
        >
          <div className="flex flex-wrap justify-center gap-6 p-6">
            { ([ "default", "outline", "elevated", "glass" ] as const).map(v => (
              <HoverCard key={ v }>
                <HoverCardTrigger asChild>
                  <Button variant="outline" size="sm" className="capitalize">
                    { v }
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent variant={ v } width="260px">
                  <div className="p-4 space-y-2">
                    <p className="text-sm font-semibold capitalize">{ v } variant</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      This is how the <strong>{ v }</strong> variant looks. Choose the one that best
                      fits your UI context.
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            )) }
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          3. PLACEMENT
      ══════════════════════════════════════ */}
      <Section
        id="placement"
        title="Placement"
        description="Control which side the card appears on with side, and fine-tune alignment with align."
      >
        <ComponentPreview
          code={ `<HoverCardContent side="top"    align="center">…</HoverCardContent>
<HoverCardContent side="bottom" align="center">…</HoverCardContent>
<HoverCardContent side="left"   align="center">…</HoverCardContent>
<HoverCardContent side="right"  align="center">…</HoverCardContent>

{/* Alignment variants */}
<HoverCardContent side="bottom" align="start">…</HoverCardContent>
<HoverCardContent side="bottom" align="end">…</HoverCardContent>`}
        >
          <div className="grid grid-cols-3 gap-3 place-items-center p-8">
            {/* Top row */ }
            <div />
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="outline" size="sm">Top</Button>
              </HoverCardTrigger>
              <HoverCardContent side="top" width="200px">
                <p className="p-3 text-xs text-center text-muted-foreground">side="top"</p>
              </HoverCardContent>
            </HoverCard>
            <div />

            {/* Middle row */ }
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="outline" size="sm">Left</Button>
              </HoverCardTrigger>
              <HoverCardContent side="left" width="200px">
                <p className="p-3 text-xs text-center text-muted-foreground">side="left"</p>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="outline" size="sm" className="text-primary border-primary/40">
                  Hover me
                </Button>
              </HoverCardTrigger>
              <HoverCardContent side="bottom" width="200px">
                <p className="p-3 text-xs text-center text-muted-foreground">side="bottom" (default)</p>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="outline" size="sm">Right</Button>
              </HoverCardTrigger>
              <HoverCardContent side="right" width="200px">
                <p className="p-3 text-xs text-center text-muted-foreground">side="right"</p>
              </HoverCardContent>
            </HoverCard>

            {/* Bottom row */ }
            <div />
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="outline" size="sm">Bottom</Button>
              </HoverCardTrigger>
              <HoverCardContent side="bottom" width="200px">
                <p className="p-3 text-xs text-center text-muted-foreground">side="bottom"</p>
              </HoverCardContent>
            </HoverCard>
            <div />
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          4. OPEN / CLOSE DELAY
      ══════════════════════════════════════ */}
      <Section
        id="delay"
        title="Open & Close Delay"
        description="Configure how long the card waits before opening and closing. Useful for preventing accidental triggers."
      >
        <ComponentPreview
          code={ `{/* Instant */}
<HoverCard openDelay={0} closeDelay={0}>…</HoverCard>

{/* Default (300ms open / 150ms close) */}
<HoverCard openDelay={300} closeDelay={150}>…</HoverCard>

{/* Slow reveal */}
<HoverCard openDelay={700} closeDelay={300}>…</HoverCard>`}
        >
          <div className="flex flex-wrap justify-center gap-4 p-6">
            { [
              { label: "Instant", open: 0, close: 0 },
              { label: "Default", open: 300, close: 150 },
              { label: "Slow", open: 700, close: 300 },
            ].map(d => (
              <HoverCard key={ d.label } openDelay={ d.open } closeDelay={ d.close }>
                <HoverCardTrigger asChild>
                  <Button variant="outline" size="sm">{ d.label }</Button>
                </HoverCardTrigger>
                <HoverCardContent width="220px">
                  <div className="p-3 space-y-1">
                    <p className="text-xs font-semibold">{ d.label }</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      open: { d.open }ms / close: { d.close }ms
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            )) }
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          5. REAL-WORLD — GITHUB PROFILE
      ══════════════════════════════════════ */}
      <Section
        id="github-profile"
        title="GitHub Profile Card"
        description="A complete GitHub-style user profile card triggered on a username mention."
      >
        <ComponentPreview
          code={ `<HoverCard>
  <HoverCardTrigger asChild>
    <a href="#" className="font-semibold text-primary hover:underline">
      @alexjohnson
    </a>
  </HoverCardTrigger>
  <HoverCardContent width="340px" variant="elevated">
    {/* Avatar + follow */}
    <div className="flex items-start justify-between p-4 pb-3">
      <Avatar className="h-14 w-14" />
      <Button size="sm" variant="outline">Follow</Button>
    </div>
    {/* Bio */}
    <div className="px-4 pb-3 space-y-2">
      <div>
        <h4 className="font-semibold text-sm">Alex Johnson</h4>
        <p className="text-xs text-muted-foreground">@alexjohnson</p>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">
        Senior Engineer at Vercel. Open source contributor.
        Building fast web experiences.
      </p>
      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground pt-1">
        <span><Building2 /> Vercel</span>
        <span><MapPin /> San Francisco</span>
        <span><Link2 /> alexj.dev</span>
      </div>
    </div>
    {/* Stats */}
    <Separator />
    <div className="flex px-4 py-3 gap-4 text-xs">
      <span><strong>247</strong> followers</span>
      <span><strong>89</strong> following</span>
    </div>
  </HoverCardContent>
</HoverCard>`}
        >
          <div className="flex justify-center p-8">
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs text-center">
              This PR was merged by{ " " }
              <HoverCard>
                <HoverCardTrigger asChild>
                  <a href="#" className="font-semibold text-primary hover:underline cursor-pointer" onClick={ e => e.preventDefault() }>
                    @alexjohnson
                  </a>
                </HoverCardTrigger>
                <HoverCardContent width="340px" variant="elevated">
                  <div className="flex items-start justify-between p-4 pb-3">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src="https://github.com/vercel.png" />
                      <AvatarFallback className="text-sm font-bold bg-gradient-to-br from-orange-400 to-rose-400 text-white">AJ</AvatarFallback>
                    </Avatar>
                    <Button size="sm" variant="outline" className="text-xs">Follow</Button>
                  </div>
                  <div className="px-4 pb-3 space-y-2.5">
                    <div>
                      <h4 className="font-semibold text-sm">Alex Johnson</h4>
                      <p className="text-xs text-muted-foreground">@alexjohnson</p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Senior Engineer at Vercel. Open source enthusiast.
                      Building fast, beautiful web experiences.
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground pt-1">
                      <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />Vercel</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />San Francisco, CA</span>
                      <span className="flex items-center gap-1"><Link2 className="h-3 w-3" />alexj.dev</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />Joined Jan 2019</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex px-4 py-3 gap-5 text-xs text-muted-foreground">
                    <span><strong className="text-foreground">247</strong> followers</span>
                    <span><strong className="text-foreground">89</strong> following</span>
                    <span><strong className="text-foreground">42</strong> repos</span>
                  </div>
                </HoverCardContent>
              </HoverCard>
              { " " }and reviewed by{ " " }
              <HoverCard>
                <HoverCardTrigger asChild>
                  <a href="#" className="font-semibold text-primary hover:underline cursor-pointer" onClick={ e => e.preventDefault() }>
                    @sarah_dev
                  </a>
                </HoverCardTrigger>
                <HoverCardContent width="280px">
                  <div className="flex gap-3 p-4">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-teal-400 text-white text-xs font-bold">SD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-sm">Sarah Dev</h4>
                      <p className="text-xs text-muted-foreground">@sarah_dev</p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        Frontend Engineer. TypeScript nerd. Tea enthusiast.
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              .
            </p>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          6. NPM PACKAGE CARD
      ══════════════════════════════════════ */}
      <Section
        id="package-card"
        title="Package Info Card"
        description="Hover over a package name to show its npm stats — a common pattern in documentation sites."
      >
        <ComponentPreview
          code={ `<HoverCard openDelay={200}>
  <HoverCardTrigger asChild>
    <code className="font-mono text-sm bg-muted px-2 py-0.5 rounded cursor-pointer">
      @tanstack/react-query
    </code>
  </HoverCardTrigger>
  <HoverCardContent width="300px" variant="elevated">
    {/* Package stats */}
    …
  </HoverCardContent>
</HoverCard>`}
        >
          <div className="flex flex-wrap justify-center gap-6 p-6">
            { [
              {
                name: "react-query",
                full: "@tanstack/react-query",
                desc: "Powerful asynchronous state management for React.",
                downloads: "8.2M",
                stars: "39.4k",
                version: "5.28.4",
                color: "from-red-400 to-orange-400",
              },
              {
                name: "zod",
                full: "zod",
                desc: "TypeScript-first schema validation with static type inference.",
                downloads: "12.1M",
                stars: "31.2k",
                version: "3.22.4",
                color: "from-blue-400 to-indigo-400",
              },
            ].map(pkg => (
              <HoverCard key={ pkg.name } openDelay={ 200 }>
                <HoverCardTrigger asChild>
                  <code className="font-mono text-sm bg-muted px-2.5 py-1 rounded-lg cursor-pointer hover:bg-muted/70 transition-colors border border-border/50">
                    { pkg.full }
                  </code>
                </HoverCardTrigger>
                <HoverCardContent width="300px" variant="elevated">
                  <div className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className={ `w-9 h-9 rounded-xl bg-gradient-to-br ${pkg.color} flex items-center justify-center shrink-0` }>
                        <Package className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm truncate">{ pkg.full }</h4>
                          <Badge variant="secondary" className="text-[10px] shrink-0">v{ pkg.version }</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{ pkg.desc }</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-3 gap-2 text-center">
                      { [
                        { icon: Eye, label: "Downloads", value: pkg.downloads },
                        { icon: Star, label: "Stars", value: pkg.stars },
                        { icon: GitFork, label: "License", value: "MIT" },
                      ].map(stat => (
                        <div key={ stat.label } className="space-y-0.5">
                          <stat.icon className="h-3.5 w-3.5 mx-auto text-muted-foreground" />
                          <p className="text-xs font-semibold">{ stat.value }</p>
                          <p className="text-[10px] text-muted-foreground">{ stat.label }</p>
                        </div>
                      )) }
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            )) }
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          7. PROPS
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <p className="text-sm font-semibold mb-3">HoverCard</p>
        <PropsTable props={ [
          { name: "openDelay", type: "number", default: "300", description: "Milliseconds to wait before opening after mouse enters trigger." },
          { name: "closeDelay", type: "number", default: "150", description: "Milliseconds to wait before closing after mouse leaves." },
          { name: "open", type: "boolean", default: "—", description: "Controlled open state." },
          { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "Callback when open state changes." },
          { name: "disabled", type: "boolean", default: "false", description: "Prevents the card from opening." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">HoverCardTrigger</p>
        <PropsTable props={ [
          { name: "asChild", type: "boolean", default: "false", description: "Merge trigger props onto the direct child element instead of wrapping in a span." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">HoverCardContent</p>
        <PropsTable props={ [
          { name: "side", type: '"top" | "bottom" | "left" | "right"', default: '"bottom"', description: "Which side of the trigger the card appears on." },
          { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Alignment of the card along the trigger's cross axis." },
          { name: "sideOffset", type: "number", default: "8", description: "Gap in pixels between trigger and card." },
          { name: "alignOffset", type: "number", default: "0", description: "Offset in pixels along the alignment axis." },
          { name: "variant", type: '"default" | "outline" | "elevated" | "glass"', default: '"default"', description: "Visual style of the card." },
          { name: "width", type: "string", default: '"320px"', description: "CSS width of the card." },
          { name: "arrow", type: "boolean", default: "false", description: "Show a directional arrow pointing to the trigger." },
        ] } />
      </Section>
    </DocsContent>
  );
}
