"use client";

import React from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ─── Placeholder image helper ─────────────────────────────
const IMG_BASE = "https://images.unsplash.com/photo";
const PHOTOS = [
  `${IMG_BASE}-1506905925346-21bda4d32df4?w=800&q=80`,
  `${IMG_BASE}-1469474968028-56623f02e42e?w=800&q=80`,
  `${IMG_BASE}-1501854140801-50d01698950b?w=800&q=80`,
  `${IMG_BASE}-1447752875215-b2761acb3c5d?w=800&q=80`,
  `${IMG_BASE}-1447752875215-b2761acb3c5d?w=800&q=80`,
  `${IMG_BASE}-1465146344425-f00d5f5c8f07?w=800&q=80`,
];

// Colored placeholder block used when no real image needed
function Placeholder({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={ cn(
        "absolute inset-0 flex items-center justify-center",
        "bg-gradient-to-br from-violet-500/20 via-indigo-500/20 to-blue-500/20",
        "border-2 border-dashed border-violet-300/40 dark:border-violet-700/40",
        className
      ) }
    >
      { label && (
        <span className="text-xs font-mono text-muted-foreground/60 select-none">
          { label }
        </span>
      ) }
    </div>
  );
}

export default function AspectRatioPage() {
  return (
    <DocsContent
      title="Aspect Ratio"
      description="Constrains content to a fixed width-to-height ratio using the native CSS aspect-ratio property. Supports named presets and custom numeric ratios. Direct img, video, and iframe children are automatically stretched to fill."
      importPath='import { AspectRatio } from "@/components/ui/aspect-ratio";'
    >

      {/* ══════════════════════════════════════
          1. BASIC
      ══════════════════════════════════════ */}
      <Section
        id="basic"
        title="Basic"
        description="Wrap an image in AspectRatio to lock its dimensions. The default ratio is 16:9 (video)."
      >
        <ComponentPreview
          code={ `import { AspectRatio } from "@/components/ui/aspect-ratio";

<div className="w-full max-w-sm">
  <AspectRatio ratio="video" className="rounded-2xl overflow-hidden">
    <img
      src="/images/landscape.jpg"
      alt="Mountain landscape"
    />
  </AspectRatio>
</div>`}
        >
          <div className="w-full max-w-sm">
            <AspectRatio ratio="video" className="rounded-2xl">
              <img
                src={ PHOTOS[ 0 ] }
                alt="Mountain landscape"
                className="rounded-2xl"
              />
            </AspectRatio>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. PRESETS
      ══════════════════════════════════════ */}
      <Section
        id="presets"
        title="Ratio Presets"
        description="Nine named presets covering the most common aspect ratios. Pass them as strings."
      >
        <ComponentPreview
          code={ `<AspectRatio ratio="square">…</AspectRatio>        {/* 1:1   */}
<AspectRatio ratio="video">…</AspectRatio>         {/* 16:9  */}
<AspectRatio ratio="video-vertical">…</AspectRatio> {/* 9:16  */}
<AspectRatio ratio="photo">…</AspectRatio>         {/* 4:3   */}
<AspectRatio ratio="photo-wide">…</AspectRatio>    {/* 3:2   */}
<AspectRatio ratio="ultrawide">…</AspectRatio>     {/* 21:9  */}
<AspectRatio ratio="portrait">…</AspectRatio>      {/* 2:3   */}
<AspectRatio ratio="golden">…</AspectRatio>        {/* 1.618:1 */}
<AspectRatio ratio="cinema">…</AspectRatio>        {/* 2.39:1  */}`}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
            { (
              [
                { ratio: "square", label: "1 : 1", desc: "square" },
                { ratio: "video", label: "16 : 9", desc: "video" },
                { ratio: "photo", label: "4 : 3", desc: "photo" },
                { ratio: "photo-wide", label: "3 : 2", desc: "photo-wide" },
                { ratio: "portrait", label: "2 : 3", desc: "portrait" },
                { ratio: "golden", label: "1.618 : 1", desc: "golden" },
                { ratio: "ultrawide", label: "21 : 9", desc: "ultrawide" },
                { ratio: "cinema", label: "2.39 : 1", desc: "cinema" },
                { ratio: "video-vertical", label: "9 : 16", desc: "video-vertical" },
              ] as const
            ).map(({ ratio, label, desc }, i) => (
              <div key={ ratio } className="flex flex-col gap-1.5">
                <AspectRatio
                  ratio={ ratio }
                  className="rounded-xl bg-muted/30 border border-border/40"
                >
                  <img
                    src={ PHOTOS[ i % PHOTOS.length ] }
                    alt={ desc }
                    className="rounded-xl opacity-80"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/30 rounded-xl">
                    <span className="text-white text-xs font-bold font-mono">{ label }</span>
                  </div>
                </AspectRatio>
                <Badge
                  variant="secondary"
                  className="self-start text-[10px] font-mono px-2"
                >
                  { desc }
                </Badge>
              </div>
            )) }
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          3. CUSTOM RATIO
      ══════════════════════════════════════ */}
      <Section
        id="custom"
        title="Custom Ratio"
        description="Pass any number for a fully custom ratio. The value represents width ÷ height."
      >
        <ComponentPreview
          code={ `{/* 5:4 photo print */}
<AspectRatio ratio={5 / 4} className="rounded-2xl">
  <img src="…" alt="…" />
</AspectRatio>

{/* 7:3 wide banner */}
<AspectRatio ratio={7 / 3} className="rounded-2xl">
  <img src="…" alt="…" />
</AspectRatio>

{/* Raw decimal */}
<AspectRatio ratio={1.85} className="rounded-2xl">
  <img src="…" alt="…" />
</AspectRatio>`}
        >
          <div className="w-full space-y-4 max-w-lg">
            { [
              { r: 5 / 4, label: "5 : 4  (print)", idx: 1 },
              { r: 7 / 3, label: "7 : 3  (banner)", idx: 2 },
              { r: 1.85, label: "1.85 : 1 (custom)", idx: 3 },
            ].map(({ r, label, idx }) => (
              <div key={ label } className="flex flex-col gap-1.5">
                <p className="text-xs text-muted-foreground font-mono">{ label }</p>
                <AspectRatio ratio={ r } className="rounded-xl">
                  <img
                    src={ PHOTOS[ idx % PHOTOS.length ] }
                    alt={ label }
                    className="rounded-xl"
                  />
                </AspectRatio>
              </div>
            )) }
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          4. OBJECT FIT MODES
      ══════════════════════════════════════ */}
      <Section
        id="fit"
        title="Object Fit"
        description="Control how the image fills the container with the fit prop — identical to CSS object-fit."
      >
        <ComponentPreview
          code={ `<AspectRatio ratio="video" fit="cover">
  <img src="…" alt="…" />
</AspectRatio>

<AspectRatio ratio="video" fit="contain">
  <img src="…" alt="…" />
</AspectRatio>

<AspectRatio ratio="video" fit="fill">
  <img src="…" alt="…" />
</AspectRatio>`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
            { ([ "cover", "contain", "fill" ] as const).map(fit => (
              <div key={ fit } className="flex flex-col gap-1.5">
                <p className="text-xs font-mono text-muted-foreground">{ fit }</p>
                <AspectRatio
                  ratio="video"
                  fit={ fit }
                  className="rounded-xl bg-muted/50 border border-border/40"
                >
                  <img
                    src={ PHOTOS[ 4 ] }
                    alt={ `Object fit ${fit}` }
                    className="rounded-xl"
                  />
                </AspectRatio>
              </div>
            )) }
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          5. WITH VIDEO & IFRAME
      ══════════════════════════════════════ */}
      <Section
        id="iframe"
        title="With iframe"
        description="AspectRatio automatically positions direct iframe and video children to fill the container."
      >
        <ComponentPreview
          code={ `<AspectRatio ratio="video" className="rounded-2xl overflow-hidden">
  <iframe
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    title="YouTube video"
    allow="accelerometer; autoplay"
    allowFullScreen
  />
</AspectRatio>`}
        >
          <div className="w-full max-w-lg">
            <AspectRatio ratio="video" className="rounded-2xl overflow-hidden bg-zinc-950">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-2xl"
              />
            </AspectRatio>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          6. REAL-WORLD — MEDIA GRID
      ══════════════════════════════════════ */}
      <Section
        id="media-grid"
        title="Media Grid"
        description="A photo gallery grid where every cell locks to a square ratio regardless of image dimensions."
      >
        <ComponentPreview
          code={ `<div className="grid grid-cols-3 gap-2">
  {photos.map((src, i) => (
    <AspectRatio key={i} ratio="square" className="rounded-xl">
      <img src={src} alt="" className="rounded-xl hover:scale-105 transition-transform" />
    </AspectRatio>
  ))}
</div>`}
        >
          <div className="grid grid-cols-3 gap-2 w-full max-w-sm">
            { PHOTOS.map((src, i) => (
              <AspectRatio key={ i } ratio="square" className="rounded-xl overflow-hidden">
                <img
                  src={ src }
                  alt={ `Photo ${i + 1}` }
                  className="rounded-xl hover:scale-105 transition-transform duration-300"
                />
              </AspectRatio>
            )) }
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          7. WITH OVERLAY CONTENT
      ══════════════════════════════════════ */}
      <Section
        id="overlay"
        title="With Overlay Content"
        description="Since AspectRatio uses position:relative, you can layer absolutely-positioned content on top of the media."
      >
        <ComponentPreview
          code={ `<AspectRatio ratio="video" className="rounded-2xl group">
  <img src="…" alt="…" className="rounded-2xl" />

  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-2xl" />

  {/* Caption */}
  <div className="absolute bottom-0 left-0 right-0 p-4">
    <p className="text-white font-semibold text-sm">Mountain at Sunrise</p>
    <p className="text-white/70 text-xs mt-0.5">Patagonia, Argentina</p>
  </div>

  {/* Badge */}
  <Badge className="absolute top-3 right-3">Featured</Badge>
</AspectRatio>`}
        >
          <div className="w-full max-w-sm">
            <AspectRatio ratio="video" className="rounded-2xl group">
              <img
                src={ PHOTOS[ 0 ] }
                alt="Mountain landscape"
                className="rounded-2xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-2xl" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-sm">Mountain at Sunrise</p>
                <p className="text-white/70 text-xs mt-0.5">Patagonia, Argentina</p>
              </div>
              <Badge className="absolute top-3 right-3 bg-white/90 text-foreground hover:bg-white/90 text-[10px]">
                Featured
              </Badge>
            </AspectRatio>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          8. PROPS
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <PropsTable
          props={ [
            {
              name: "ratio",
              type: '"square" | "video" | "video-vertical" | "photo" | "photo-wide" | "ultrawide" | "portrait" | "golden" | "cinema" | "auto" | number',
              default: '"video"',
              description: "Named preset or a custom number (width ÷ height). Use 'auto' to disable ratio enforcement.",
            },
            {
              name: "fit",
              type: '"cover" | "contain" | "fill" | "none" | "scale-down"',
              default: '"cover"',
              description: "CSS object-fit applied to direct img, video, and iframe children.",
            },
            {
              name: "position",
              type: "string",
              default: '"center"',
              description: "CSS object-position applied to direct img, video, and iframe children.",
            },
            {
              name: "className",
              type: "string",
              default: "—",
              description: "Applied to the root div. Use rounded-* and overflow-hidden here.",
            },
          ] }
        />
      </Section>
    </DocsContent>
  );
}
