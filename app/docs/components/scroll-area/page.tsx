"use client";

import React from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// ─── Sample data ──────────────────────────────────────────
const TAGS = [
  "React", "TypeScript", "Next.js", "Tailwind", "Radix", "shadcn",
  "Framer Motion", "Zod", "Prisma", "tRPC", "Drizzle", "Vitest",
  "Storybook", "Playwright", "Docker", "Kubernetes", "Vercel", "Netlify",
];

const INBOX = Array.from({ length: 20 }, (_, i) => ({
  id: `msg-${i}`,
  from: [ "Alice", "Bob", "Charlie", "Diana", "Eve", "Frank" ][ i % 6 ],
  subject: [ "New feature request", "Re: Meeting", "Bug report", "Invoice", "Feedback", "Deployment" ][ i % 6 ],
  preview: "Hey, just following up on the last issue we discussed...",
  time: `${i + 1}h ago`,
  unread: i % 3 === 0,
}));

const CODE_LINES = `import { ScrollArea } from "@/components/ui/scroll-area";

export function MyComponent() {
  return (
    <ScrollArea maxHeight={300} className="rounded-xl border">
      <div className="p-4">
        {items.map(item => (
          <div key={item.id} className="py-2 border-b last:border-b-0">
            {item.label}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}`.repeat(3);

export default function ScrollAreaPage() {
  return (
    <DocsContent
      title="Scroll Area"
      description="A custom scrollable container with styled, draggable scrollbars. Supports vertical, horizontal, and both orientations. Built with a ResizeObserver and drag-to-scroll thumb — zero dependencies."
      importPath='import { ScrollArea } from "@/components/ui/scroll-area";'
    >

      {/* ══════════════════════════════════════
          1. BASIC
      ══════════════════════════════════════ */}
      <Section
        id="basic"
        title="Basic"
        description="Wrap any overflowing content. The scrollbar appears on hover."
      >
        <ComponentPreview
          code={ `<ScrollArea maxHeight={260} className="rounded-xl border">
  <div className="p-4">
    {items.map(item => (
      <div key={item} className="py-2 text-sm border-b last:border-b-0">
        {item}
      </div>
    ))}
  </div>
</ScrollArea>`}
        >
          <div className="w-full max-w-xs">
            <ScrollArea maxHeight={ 260 } className="rounded-xl border">
              <div className="p-3">
                { Array.from({ length: 24 }, (_, i) => `Item ${i + 1}`).map(item => (
                  <div key={ item } className="py-2 px-1 text-sm border-b border-border/40 last:border-b-0 text-foreground">
                    { item }
                  </div>
                )) }
              </div>
            </ScrollArea>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. SCROLLBAR VISIBILITY
      ══════════════════════════════════════ */}
      <Section
        id="visibility"
        title="Scrollbar Visibility"
        description="Three modes: hover (default), always, and scroll (shows only while scrolling)."
      >
        <ComponentPreview
          code={ `<ScrollArea scrollbarVisibility="hover"  maxHeight={200}>…</ScrollArea>
<ScrollArea scrollbarVisibility="always" maxHeight={200}>…</ScrollArea>
<ScrollArea scrollbarVisibility="scroll" maxHeight={200}>…</ScrollArea>`}
        >
          <div className="flex flex-wrap gap-4">
            { ([ "hover", "always", "scroll" ] as const).map(vis => (
              <div key={ vis } className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground font-mono">{ vis }</p>
                <ScrollArea
                  maxHeight={ 180 }
                  scrollbarVisibility={ vis }
                  className="w-48 rounded-xl border"
                >
                  <div className="p-3">
                    { Array.from({ length: 14 }, (_, i) => `Row ${i + 1}`).map(r => (
                      <div key={ r } className="py-1.5 text-xs border-b border-border/30 last:border-b-0">{ r }</div>
                    )) }
                  </div>
                </ScrollArea>
              </div>
            )) }
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          3. SCROLLBAR SIZE
      ══════════════════════════════════════ */}
      <Section
        id="scrollbar-size"
        title="Scrollbar Size"
        description="Adjust the scrollbar thumb width/height in pixels. Default is 6px."
      >
        <ComponentPreview
          code={ `<ScrollArea scrollbarSize={4}  maxHeight={200}>…</ScrollArea>
<ScrollArea scrollbarSize={6}  maxHeight={200}>…</ScrollArea>
<ScrollArea scrollbarSize={10} maxHeight={200}>…</ScrollArea>`}
        >
          <div className="flex flex-wrap gap-4">
            { [ { size: 4, label: "4px (thin)" }, { size: 6, label: "6px (default)" }, { size: 10, label: "10px (wide)" } ].map(s => (
              <div key={ s.size } className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground">{ s.label }</p>
                <ScrollArea
                  maxHeight={ 180 }
                  scrollbarSize={ s.size }
                  scrollbarVisibility="always"
                  className="w-48 rounded-xl border"
                >
                  <div className="p-3">
                    { Array.from({ length: 14 }, (_, i) => `Item ${i + 1}`).map(r => (
                      <div key={ r } className="py-1.5 text-xs border-b border-border/30 last:border-b-0">{ r }</div>
                    )) }
                  </div>
                </ScrollArea>
              </div>
            )) }
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          4. HORIZONTAL
      ══════════════════════════════════════ */}
      <Section
        id="horizontal"
        title="Horizontal Scroll"
        description="Set orientation='horizontal' for content that overflows on the x-axis."
      >
        <ComponentPreview
          code={ `<ScrollArea orientation="horizontal" className="rounded-xl border w-full">
  <div className="flex gap-3 p-4" style={{ width: "max-content" }}>
    {tags.map(tag => (
      <Badge key={tag} variant="secondary" className="whitespace-nowrap">
        {tag}
      </Badge>
    ))}
  </div>
</ScrollArea>`}
        >
          <div className="w-full max-w-lg">
            <ScrollArea
              orientation="horizontal"
              scrollbarVisibility="always"
              className="rounded-xl border w-full pb-3"
            >
              <div className="flex gap-2 px-3 pt-3" style={ { width: "max-content" } }>
                { TAGS.map(tag => (
                  <Badge key={ tag } variant="secondary" className="whitespace-nowrap px-3 py-1 text-xs">
                    { tag }
                  </Badge>
                )) }
              </div>
            </ScrollArea>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          5. BOTH AXES
      ══════════════════════════════════════ */}
      <Section
        id="both"
        title="Both Axes"
        description="Set orientation='both' for content that overflows in both directions — useful for code blocks and tables."
      >
        <ComponentPreview
          code={ `<ScrollArea
  orientation="both"
  maxHeight={240}
  className="rounded-xl border"
>
  <pre className="p-4 font-mono text-sm whitespace-pre" style={{ minWidth: "600px" }}>
    {code}
  </pre>
</ScrollArea>`}
        >
          <div className="w-full max-w-lg">
            <ScrollArea
              orientation="both"
              maxHeight={ 220 }
              scrollbarVisibility="hover"
              className="rounded-xl border bg-zinc-950"
            >
              <pre
                className="p-4 font-mono text-xs text-zinc-300 leading-relaxed"
                style={ { minWidth: "700px" } }
              >
                { CODE_LINES }
              </pre>
            </ScrollArea>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          6. INBOX EXAMPLE
      ══════════════════════════════════════ */}
      <Section
        id="inbox"
        title="Inbox List"
        description="A real-world example — an email inbox list with a fixed-height scroll area."
      >
        <ComponentPreview
          code={ `<ScrollArea maxHeight={400} className="rounded-2xl border">
  {messages.map((msg, i) => (
    <React.Fragment key={msg.id}>
      <div className="flex items-start gap-3 p-4 hover:bg-muted/40 cursor-pointer">
        <Avatar className="shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">{msg.from}</p>
          <p className="text-xs text-muted-foreground truncate">{msg.subject}</p>
          <p className="text-xs text-muted-foreground/60 truncate">{msg.preview}</p>
        </div>
        <p className="text-[10px] text-muted-foreground shrink-0">{msg.time}</p>
      </div>
      {i < messages.length - 1 && <Separator />}
    </React.Fragment>
  ))}
</ScrollArea>`}
        >
          <div className="w-full max-w-md">
            <ScrollArea maxHeight={ 380 } className="rounded-2xl border shadow-sm">
              { INBOX.map((msg, i) => (
                <React.Fragment key={ msg.id }>
                  <div className="flex items-start gap-3 px-4 py-3 hover:bg-muted/40 cursor-pointer transition-colors">
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarFallback className="text-[10px] bg-gradient-to-br from-violet-400 to-indigo-400 text-white">
                        { msg.from[ 0 ] }
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={ `text-sm ${msg.unread ? "font-semibold" : "font-medium"}` }>
                          { msg.from }
                        </p>
                        { msg.unread && (
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0" />
                        ) }
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{ msg.subject }</p>
                      <p className="text-xs text-muted-foreground/60 truncate">{ msg.preview }</p>
                    </div>
                    <p className="text-[10px] text-muted-foreground shrink-0 mt-0.5">{ msg.time }</p>
                  </div>
                  { i < INBOX.length - 1 && <Separator /> }
                </React.Fragment>
              )) }
            </ScrollArea>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          7. PROPS
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <PropsTable props={ [
          { name: "orientation", type: '"vertical" | "horizontal" | "both"', default: '"vertical"', description: "Which axis allows scrolling." },
          { name: "maxHeight", type: "string | number", default: "—", description: "Max height of the scroll area. Numbers are treated as px." },
          { name: "maxWidth", type: "string | number", default: "—", description: "Max width of the scroll area. Numbers are treated as px." },
          { name: "scrollbarSize", type: "number", default: "6", description: "Thickness of the scrollbar thumb in pixels." },
          { name: "scrollbarVisibility", type: '"always" | "hover" | "scroll"', default: '"hover"', description: "When to show the scrollbar — always, on hover, or while scrolling." },
          { name: "className", type: "string", default: "—", description: "Applied to the root wrapper element." },
        ] } />
      </Section>

    </DocsContent>
  );
}
