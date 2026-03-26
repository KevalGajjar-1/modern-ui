"use client";

import React, { useState } from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import { Spinner, InlineSpinner, OverlaySpinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Save, Upload, RefreshCw } from "lucide-react";

export default function SpinnerPage() {
  const [loadingBtn, setLoadingBtn] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const simulateLoad = (id: string, ms = 2000) => {
    setLoadingBtn(id);
    setTimeout(() => setLoadingBtn(null), ms);
  };

  return (
    <DocsContent
      title="Spinner"
      description="A loading indicator component with five animation variants, five sizes, three speeds, and helper components for common patterns like button loading states and full-page overlays."
      importPath='import { Spinner, InlineSpinner, OverlaySpinner } from "@/components/ui/spinner";'
    >

      {/* ══════════════════════════════════════
          1. BASIC
      ══════════════════════════════════════ */}
      <Section
        id="basic"
        title="Basic"
        description="Default ring spinner. It uses role='status' and aria-label for accessibility."
      >
        <ComponentPreview
          code={`<Spinner />
<Spinner label="Saving..." />
<Spinner showLabel label="Uploading file..." />`}
        >
          <div className="flex flex-wrap items-center gap-6">
            <Spinner />
            <Spinner label="Saving changes…" />
            <Spinner showLabel label="Uploading file…" />
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. VARIANTS
      ══════════════════════════════════════ */}
      <Section
        id="variants"
        title="Variants"
        description="Five distinct animation styles. Choose based on context — ring and dual for compact UIs, dots and bars for prominent states, pulse for subtle hints."
      >
        <ComponentPreview
          code={`<Spinner variant="ring"  showLabel label="Ring"  />
<Spinner variant="dual"  showLabel label="Dual"  />
<Spinner variant="dots"  showLabel label="Dots"  />
<Spinner variant="pulse" showLabel label="Pulse" />
<Spinner variant="bars"  showLabel label="Bars"  />`}
        >
          <div className="flex flex-wrap items-center gap-8">
            {(["ring", "dual", "dots", "pulse", "bars"] as const).map(v => (
              <div key={v} className="flex flex-col items-center gap-3">
                <Spinner variant={v} size="lg" />
                <span className="text-xs text-muted-foreground font-mono capitalize">{v}</span>
              </div>
            ))}
          </div>
        </ComponentPreview>

        {/* All variants side by side in a card */}
        <ComponentPreview
          code={`{/* All variants at md size with label */}
{(["ring","dual","dots","pulse","bars"] as const).map(v => (
  <Spinner key={v} variant={v} showLabel label={v} size="md" />
))}`}
        >
          <div className="w-full space-y-2">
            {(["ring", "dual", "dots", "pulse", "bars"] as const).map(v => (
              <div key={v} className="flex items-center gap-4 px-4 py-3 rounded-xl bg-muted/40 border border-border/40">
                <Spinner variant={v} size="md" />
                <div className="flex-1">
                  <p className="text-sm font-medium capitalize">{v}</p>
                  <p className="text-xs text-muted-foreground">
                    {v === "ring"  && "Classic rotating circle with transparent track"}
                    {v === "dual"  && "Two concentric rings spinning in opposite directions"}
                    {v === "dots"  && "Three dots bouncing in sequence"}
                    {v === "pulse" && "Expanding pulse ring around a center dot"}
                    {v === "bars"  && "Five bars scaling vertically with staggered delay"}
                  </p>
                </div>
                <Badge variant="outline" className="font-mono text-[10px] shrink-0">{v}</Badge>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          3. SIZES
      ══════════════════════════════════════ */}
      <Section
        id="sizes"
        title="Sizes"
        description="Five sizes — xs for icon buttons, xl for full-page loading screens."
      >
        <ComponentPreview
          code={`<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />`}
        >
          <div className="flex flex-col gap-6">
            {(["ring", "dots", "bars"] as const).map(v => (
              <div key={v} className="flex items-end gap-6">
                <span className="w-10 text-xs text-muted-foreground font-mono shrink-0">{v}</span>
                {(["xs", "sm", "md", "lg", "xl"] as const).map(s => (
                  <div key={s} className="flex flex-col items-center gap-2">
                    <Spinner variant={v} size={s} />
                    <span className="text-[10px] text-muted-foreground uppercase">{s}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          4. SPEEDS
      ══════════════════════════════════════ */}
      <Section
        id="speeds"
        title="Speed"
        description="Three animation speeds. Use slow for ambient background loaders, fast for snappy inline feedback."
      >
        <ComponentPreview
          code={`<Spinner speed="slow"   showLabel label="Slow"   />
<Spinner speed="normal" showLabel label="Normal" />
<Spinner speed="fast"   showLabel label="Fast"   />`}
        >
          <div className="flex flex-wrap items-center gap-8">
            {(["slow", "normal", "fast"] as const).map(s => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Spinner variant="ring" size="lg" speed={s} />
                <span className="text-xs text-muted-foreground font-mono capitalize">{s}</span>
              </div>
            ))}
          </div>
        </ComponentPreview>

        {/* All variants × all speeds */}
        <ComponentPreview
          code={`{/* All variants at every speed */}
{(["ring","dual","dots","pulse","bars"] as const).map(v =>
  (["slow","normal","fast"] as const).map(s => (
    <Spinner key={v+s} variant={v} speed={s} size="md" />
  ))
)}`}
        >
          <div className="overflow-x-auto w-full">
            <table className="text-xs border-collapse w-full">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-left text-muted-foreground font-medium">Variant ↓ / Speed →</th>
                  {(["slow", "normal", "fast"] as const).map(s => (
                    <th key={s} className="py-2 px-6 text-muted-foreground font-medium capitalize">{s}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(["ring", "dual", "dots", "pulse", "bars"] as const).map(v => (
                  <tr key={v} className="border-t border-border/40">
                    <td className="py-3 px-4 text-muted-foreground font-mono">{v}</td>
                    {(["slow", "normal", "fast"] as const).map(s => (
                      <td key={s} className="py-3 px-6">
                        <Spinner variant={v} speed={s} size="md" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          5. COLOR
      ══════════════════════════════════════ */}
      <Section
        id="color"
        title="Color"
        description="Spinner inherits the current text color via currentColor. Control it with Tailwind text-* classes."
      >
        <ComponentPreview
          code={`{/* Inherits text color — use text-* to colorize */}
<Spinner className="text-violet-600" />
<Spinner className="text-emerald-500" />
<Spinner className="text-rose-500" />
<Spinner className="text-amber-500" />
<Spinner className="text-blue-500" />

{/* White on dark background */}
<div className="bg-zinc-900 p-3 rounded-xl">
  <Spinner className="text-white" />
</div>`}
        >
          <div className="flex flex-wrap items-center gap-5">
            {[
              { color: "text-violet-600",  label: "violet"  },
              { color: "text-emerald-500", label: "emerald" },
              { color: "text-rose-500",    label: "rose"    },
              { color: "text-amber-500",   label: "amber"   },
              { color: "text-blue-500",    label: "blue"    },
              { color: "text-pink-500",    label: "pink"    },
            ].map(c => (
              <div key={c.label} className="flex flex-col items-center gap-2">
                <Spinner size="md" className={c.color} />
                <span className="text-[10px] text-muted-foreground">{c.label}</span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-2">
              <div className="bg-zinc-900 p-2.5 rounded-xl">
                <Spinner size="md" className="text-white" />
              </div>
              <span className="text-[10px] text-muted-foreground">on dark</span>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          6. IN BUTTONS
      ══════════════════════════════════════ */}
      <Section
        id="in-buttons"
        title="Button Loading State"
        description="Use InlineSpinner inside a Button to indicate async operations. Disable the button while loading to prevent double-submissions."
      >
        <ComponentPreview
          code={`import { InlineSpinner } from "@/components/ui/spinner";

const [loading, setLoading] = useState(false);

const handleSave = async () => {
  setLoading(true);
  await saveData();
  setLoading(false);
};

<Button onClick={handleSave} disabled={loading}>
  {loading
    ? <><InlineSpinner /> Saving…</>
    : <><Save className="h-4 w-4" /> Save changes</>
  }
</Button>`}
        >
          <div className="flex flex-wrap gap-3">
            {/* Save */}
            <Button
              onClick={() => simulateLoad("save")}
              disabled={loadingBtn === "save"}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 border-0"
            >
              {loadingBtn === "save"
                ? <><InlineSpinner className="text-white" /> Saving…</>
                : <><Save className="h-4 w-4" /> Save changes</>
              }
            </Button>

            {/* Upload */}
            <Button
              variant="outline"
              onClick={() => simulateLoad("upload", 3000)}
              disabled={loadingBtn === "upload"}
            >
              {loadingBtn === "upload"
                ? <><InlineSpinner /> Uploading…</>
                : <><Upload className="h-4 w-4" /> Upload file</>
              }
            </Button>

            {/* Refresh */}
            <Button
              variant="secondary"
              onClick={() => simulateLoad("refresh", 1500)}
              disabled={loadingBtn === "refresh"}
            >
              {loadingBtn === "refresh"
                ? <><InlineSpinner /> Refreshing…</>
                : <><RefreshCw className="h-4 w-4" /> Refresh</>
              }
            </Button>

            {/* Icon-only */}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => simulateLoad("icon")}
              disabled={loadingBtn === "icon"}
              aria-label={loadingBtn === "icon" ? "Loading" : "Refresh"}
            >
              {loadingBtn === "icon"
                ? <InlineSpinner size="xs" />
                : <RefreshCw className="h-4 w-4" />
              }
            </Button>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          7. FULL PAGE OVERLAY
      ══════════════════════════════════════ */}
      <Section
        id="overlay"
        title="Full-Page Overlay"
        description="OverlaySpinner covers the full viewport with a blurred backdrop. Set visible={false} to unmount it."
      >
        <ComponentPreview
          code={`import { OverlaySpinner } from "@/components/ui/spinner";

const [loading, setLoading] = useState(false);

<Button onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2500); }}>
  Show overlay
</Button>

<OverlaySpinner
  visible={loading}
  label="Loading your dashboard…"
  variant="ring"
  size="xl"
  blur
/>`}
        >
          <div className="flex flex-col gap-4 items-start">
            <Button
              variant="outline"
              onClick={() => {
                setShowOverlay(true);
                setTimeout(() => setShowOverlay(false), 2500);
              }}
              disabled={showOverlay}
            >
              {showOverlay ? <><InlineSpinner size="xs" /> Overlay active…</> : "Show overlay (2.5s)"}
            </Button>
            <p className="text-xs text-muted-foreground">
              Click the button to mount a full-viewport loading overlay for 2.5 seconds.
            </p>
          </div>
        </ComponentPreview>

        <OverlaySpinner
          visible={showOverlay}
          label="Loading your dashboard…"
          variant="ring"
          size="xl"
          blur
        />
      </Section>

      {/* ══════════════════════════════════════
          8. IN CARDS / SECTIONS
      ══════════════════════════════════════ */}
      <Section
        id="in-cards"
        title="Section Loading State"
        description="Use Spinner inside a card or section to indicate localized data fetching."
      >
        <ComponentPreview
          code={`{/* Centered in a card */}
<Card>
  <CardContent className="flex flex-col items-center justify-center h-40 gap-3">
    <Spinner variant="ring" size="lg" className="text-primary" />
    <p className="text-sm text-muted-foreground">Fetching analytics…</p>
  </CardContent>
</Card>`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {/* Loading card */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground">Analytics</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-32 gap-3">
                <Spinner variant="dual" size="lg" className="text-violet-600" />
                <p className="text-xs text-muted-foreground">Fetching data…</p>
              </CardContent>
            </Card>

            {/* Skeleton shimmer + spinner combo */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-3">
                  <Spinner variant="bars" size="sm" className="text-muted-foreground" />
                  <Skeleton className="h-3 w-full" />
                </div>
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-3 w-2/3" />
              </CardContent>
            </Card>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          9. SHOW LABEL
      ══════════════════════════════════════ */}
      <Section
        id="with-label"
        title="With Visible Label"
        description="Set showLabel to render the label text visually next to the spinner. The label is always present as a screen-reader-only element regardless."
      >
        <ComponentPreview
          code={`<Spinner showLabel label="Loading…" />
<Spinner showLabel label="Fetching results…" variant="dots" />
<Spinner showLabel label="Processing payment…" variant="bars" size="lg" className="text-emerald-600" />`}
        >
          <div className="flex flex-col gap-4">
            {[
              { label:"Loading…",             variant:"ring"  as const, size:"md" as const, color:""                  },
              { label:"Fetching results…",    variant:"dots"  as const, size:"md" as const, color:"text-violet-600"   },
              { label:"Processing payment…",  variant:"bars"  as const, size:"lg" as const, color:"text-emerald-600"  },
              { label:"Uploading file…",      variant:"pulse" as const, size:"md" as const, color:"text-blue-500"     },
            ].map(s => (
              <Spinner
                key={s.label}
                variant={s.variant}
                size={s.size}
                showLabel
                label={s.label}
                className={s.color}
              />
            ))}
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          10. PROPS TABLE
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <p className="text-sm font-semibold mb-3">Spinner</p>
        <PropsTable
          props={[
            { name:"variant",   type:'"ring" | "dual" | "dots" | "pulse" | "bars"', default:'"ring"',    description:"Animation style of the loading indicator." },
            { name:"size",      type:'"xs" | "sm" | "md" | "lg" | "xl"',            default:'"md"',      description:"Size of the spinner." },
            { name:"speed",     type:'"slow" | "normal" | "fast"',                  default:'"normal"',  description:"Animation speed — controls CSS duration variable." },
            { name:"label",     type:"string",                                        default:'"Loading…"',description:"Accessible label always present as sr-only. Shown visually when showLabel is true." },
            { name:"showLabel", type:"boolean",                                       default:"false",     description:"Render the label text visually beside the spinner." },
            { name:"className", type:"string",                                        default:"—",         description:"Tailwind classes — use text-* to change spinner color." },
          ]}
        />

        <p className="text-sm font-semibold mb-3 mt-8">InlineSpinner</p>
        <PropsTable
          props={[
            { name:"size",      type:'"xs" | "sm" | "md" | "lg" | "xl"', default:'"sm"',     description:"Size of the inline spinner. xs/sm recommended inside buttons." },
            { name:"speed",     type:'"slow" | "normal" | "fast"',        default:'"normal"', description:"Animation speed." },
            { name:"className", type:"string",                              default:"—",        description:"Use text-current to inherit the parent button text color." },
          ]}
        />

        <p className="text-sm font-semibold mb-3 mt-8">OverlaySpinner</p>
        <PropsTable
          props={[
            { name:"visible",  type:"boolean",                                        default:"true",     description:"Mount/unmount the overlay. Set to false to dismiss." },
            { name:"label",    type:"string",                                          default:'"Loading…"',description:"Accessible label and visible caption below the spinner." },
            { name:"variant",  type:'"ring" | "dual" | "dots" | "pulse" | "bars"',   default:'"ring"',   description:"Animation variant for the overlay spinner." },
            { name:"size",     type:'"xs" | "sm" | "md" | "lg" | "xl"',              default:'"xl"',     description:"Size of the overlay spinner." },
            { name:"blur",     type:"boolean",                                         default:"true",     description:"Apply backdrop-blur-sm to the overlay background." },
          ]}
        />
      </Section>

    </DocsContent>
  );
}
