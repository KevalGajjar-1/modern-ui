"use client";

import React, { useState } from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import {
  Skeleton, SkeletonText, SkeletonAvatar,
  SkeletonCard, SkeletonTable,
} from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

// ─── Fake content card ────────────────────────────────────
function ContentCard() {
  return (
    <div className="rounded-2xl border border-border/40 overflow-hidden bg-card">
      <div className="h-40 bg-gradient-to-br from-violet-400 to-indigo-500" />
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">AJ</div>
          <div>
            <p className="text-sm font-semibold">Alex Johnson</p>
            <p className="text-xs text-muted-foreground">2 hours ago</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Just shipped the new onboarding flow — cut drop-off by 40%. Super happy with how it turned out!
        </p>
        <div className="flex gap-2">
          <Button size="sm" className="flex-1">Follow</Button>
          <Button size="sm" variant="outline" className="w-20">Share</Button>
        </div>
      </div>
    </div>
  );
}

export default function SkeletonPage() {
  const [ loaded, setLoaded ] = useState(false);
  const [ variant, setVariant ] = useState<"shimmer" | "pulse" | "wave">("shimmer");

  return (
    <DocsContent
      title="Skeleton"
      description="Placeholder loading skeletons with three animation variants: shimmer (default), pulse, and wave. Includes pre-built compositions for text blocks, avatars, cards, and tables — plus a raw Skeleton primitive for custom layouts."
      importPath='import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonTable } from "@/components/ui/skeleton";'
    >

      {/* ══════════════════════════════════════
          1. BASIC
      ══════════════════════════════════════ */}
      <Section id="basic" title="Basic"
        description="The raw Skeleton primitive. Use w, h, and circle for quick sizing without extra classNames.">
        <ComponentPreview code={ `<Skeleton h={20} />
<Skeleton h={20} w="60%" />
<Skeleton circle w={48} h={48} />`}>
          <div className="flex flex-col gap-3 max-w-sm">
            <Skeleton h={ 20 } />
            <Skeleton h={ 20 } w="60%" />
            <div className="flex gap-3 items-center">
              <Skeleton circle w={ 48 } h={ 48 } />
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton h={ 14 } />
                <Skeleton h={ 11 } w="50%" />
              </div>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. VARIANTS
      ══════════════════════════════════════ */}
      <Section id="variants" title="Animation Variants"
        description="Switch between shimmer, pulse, and wave animations.">
        <ComponentPreview code={ `<Skeleton variant="shimmer" h={20} />
<Skeleton variant="pulse"   h={20} />
<Skeleton variant="wave"    h={20} />`}>
          <div className="flex flex-col gap-4 max-w-sm">
            <div className="flex gap-2">
              { ([ "shimmer", "pulse", "wave" ] as const).map(v => (
                <button
                  key={ v }
                  onClick={ () => setVariant(v) }
                  className={ [
                    "text-xs font-mono px-3 py-1.5 rounded-lg border transition-colors",
                    variant === v
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:bg-muted/60"
                  ].join(" ") }
                >
                  { v }
                </button>
              )) }
            </div>
            <SkeletonAvatar variant={ variant } />
            <SkeletonText variant={ variant } lines={ 3 } />
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          3. TEXT BLOCK
      ══════════════════════════════════════ */}
      <Section id="text" title="Text Block"
        description="SkeletonText renders N lines with a shorter last line to mimic real paragraph wrapping.">
        <ComponentPreview code={ `<SkeletonText lines={4} lastLineWidth="45%" />` }>
          <div className="max-w-sm">
            <SkeletonText lines={ 4 } lastLineWidth="45%" />
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          4. AVATAR ROW
      ══════════════════════════════════════ */}
      <Section id="avatar" title="Avatar Row"
        description="SkeletonAvatar shows a circle + name/subtitle lines — common in comment lists and feeds.">
        <ComponentPreview code={ `<SkeletonAvatar />
<SkeletonAvatar size={56} lines={2} />
<SkeletonAvatar size={32} lines={1} />`}>
          <div className="flex flex-col gap-4 max-w-xs">
            <SkeletonAvatar />
            <SkeletonAvatar size={ 56 } lines={ 2 } />
            <SkeletonAvatar size={ 32 } lines={ 1 } />
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          5. CARD
      ══════════════════════════════════════ */}
      <Section id="card" title="Card"
        description="SkeletonCard composes image + avatar + text + action buttons. Toggle loaded to compare with the real card.">
        <ComponentPreview code={ `{loaded
  ? <ContentCard />
  : <SkeletonCard imageH={160} lines={2} />
}`}>
          <div className="flex flex-col gap-3 max-w-xs">
            <div className="flex items-center gap-2">
              <Switch checked={ loaded } onCheckedChange={ setLoaded } />
              <span className="text-sm text-muted-foreground">
                { loaded ? "Loaded" : "Loading…" }
              </span>
            </div>
            { loaded ? <ContentCard /> : <SkeletonCard imageH={ 160 } lines={ 2 } /> }
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          6. TABLE
      ══════════════════════════════════════ */}
      <Section id="table" title="Table"
        description="SkeletonTable renders a configurable grid of rows and columns, with an optional header row.">
        <ComponentPreview code={ `<SkeletonTable rows={5} cols={4} hasHeader />` }>
          <SkeletonTable rows={ 5 } cols={ 4 } hasHeader />
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          7. PROPS
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <p className="text-sm font-semibold mb-3">Skeleton</p>
        <PropsTable props={ [
          { name: "variant", type: '"shimmer"|"pulse"|"wave"', default: '"shimmer"', description: "Animation style." },
          { name: "circle", type: "boolean", default: "false", description: "Force fully rounded (avatar) shape." },
          { name: "w", type: "string | number", default: "—", description: "Width shorthand (px number or CSS string)." },
          { name: "h", type: "string | number", default: "—", description: "Height shorthand (px number or CSS string)." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">SkeletonText</p>
        <PropsTable props={ [
          { name: "lines", type: "number", default: "3", description: "Number of text lines." },
          { name: "lastLineWidth", type: "string", default: '"60%"', description: "Width of the final line." },
          { name: "variant", type: "SkeletonVariant", default: '"shimmer"', description: "Passed to each line Skeleton." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">SkeletonCard</p>
        <PropsTable props={ [
          { name: "hasImage", type: "boolean", default: "true", description: "Show image placeholder at top." },
          { name: "imageH", type: "number", default: "160", description: "Image placeholder height in px." },
          { name: "lines", type: "number", default: "3", description: "Text lines in the body." },
          { name: "variant", type: "SkeletonVariant", default: '"shimmer"', description: "Animation passed to all children." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">SkeletonTable</p>
        <PropsTable props={ [
          { name: "rows", type: "number", default: "5", description: "Number of data rows." },
          { name: "cols", type: "number", default: "4", description: "Number of columns." },
          { name: "hasHeader", type: "boolean", default: "true", description: "Show a header row." },
          { name: "variant", type: "SkeletonVariant", default: '"shimmer"', description: "Animation passed to all cells." },
        ] } />
      </Section>
    </DocsContent>
  );
}
