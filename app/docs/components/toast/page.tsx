"use client";

import React, { useState } from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import { toast, Toaster } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Rocket, Heart, Star, Trash2, Save,
  Upload, Download, RefreshCw, Wifi, WifiOff,
  Bell, BellOff,
} from "lucide-react";

// ─── Fake async ───────────────────────────────────────────
function fakeUpload(succeed = true): Promise<{ url: string }> {
  return new Promise((res, rej) =>
    setTimeout(() => succeed ? res({ url: "https://cdn.example.com/file.pdf" }) : rej(new Error("Upload failed")), 2200)
  );
}

export default function ToastPage() {
  const [ position, setPosition ] = useState<
    "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"
  >("bottom-right");

  const [ customTitle, setCustomTitle ] = useState("Files uploaded successfully!");
  const [ customDesc, setCustomDesc ] = useState("3 files · 4.2 MB total");

  return (
    <DocsContent
      title="Toast"
      description="A lightweight, zero-dependency toast notification system with a singleton imperative API. Supports six variants, promise toasts, action buttons, configurable positions, auto-dismiss with a live progress bar, and pause-on-hover."
      importPath='import { toast, Toaster } from "@/components/ui/toast";'
    >
      {/* Mount one <Toaster /> at the root (or here for the demo) */ }
      <Toaster position={ position } />

      {/* ══════════════════════════════════════
          SETUP NOTE
      ══════════════════════════════════════ */}
      <Section id="setup" title="Setup">
        <p className="text-sm text-muted-foreground mb-3">
          Mount <code className="text-xs bg-muted px-1.5 py-0.5 rounded-md">&lt;Toaster /&gt;</code> once in your root layout. Then call{ " " }
          <code className="text-xs bg-muted px-1.5 py-0.5 rounded-md">toast()</code> from anywhere — no context or provider needed.
        </p>
        <ComponentPreview
          code={ `// app/layout.tsx
import { Toaster } from "@/components/ui/toast";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}

// Anywhere in your app:
import { toast } from "@/components/ui/toast";

toast.success("Saved!");
toast.error("Something went wrong.");`}
        >
          <Button onClick={ () => toast("Hello from toast! 👋") }>
            Show toast
          </Button>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          1. VARIANTS
      ══════════════════════════════════════ */}
      <Section
        id="variants"
        title="Variants"
        description="Six built-in variants: default, success, error, warning, info, and loading (persistent until dismissed or updated)."
      >
        <ComponentPreview
          code={ `toast("Default notification");
toast.success("Changes saved successfully!");
toast.error("Failed to delete file.");
toast.warning("Storage almost full — 95% used.");
toast.info("New version available: v2.4.0.");
toast.loading("Syncing your data…");`}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <Button variant="outline" size="sm"
              onClick={ () => toast("Default notification", { position }) }>
              Default
            </Button>
            <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-950/30"
              onClick={ () => toast.success("Changes saved!", { position }) }>
              Success
            </Button>
            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/30"
              onClick={ () => toast.error("Something went wrong.", { position }) }>
              Error
            </Button>
            <Button variant="outline" size="sm" className="text-amber-600 border-amber-200 hover:bg-amber-50 dark:border-amber-800 dark:hover:bg-amber-950/30"
              onClick={ () => toast.warning("Disk almost full!", { position }) }>
              Warning
            </Button>
            <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-950/30"
              onClick={ () => toast.info("Update available.", { position }) }>
              Info
            </Button>
            <Button variant="outline" size="sm"
              onClick={ () => {
                const id = toast.loading("Syncing data…", { position });
                setTimeout(() => toast.dismiss(id), 3000);
              } }>
              Loading
            </Button>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. WITH DESCRIPTION
      ══════════════════════════════════════ */}
      <Section
        id="description"
        title="Title + Description"
        description="Add a description for more context. You can also customise the content live below."
      >
        <ComponentPreview
          code={ `toast.success("Files uploaded!", {
  description: "3 files · 4.2 MB total",
  position:    "bottom-right",
})`}
        >
          <div className="flex flex-col gap-3 max-w-sm">
            <Input
              value={ customTitle }
              onChange={ e => setCustomTitle(e.target.value) }
              placeholder="Title"
            />
            <Input
              value={ customDesc }
              onChange={ e => setCustomDesc(e.target.value) }
              placeholder="Description (optional)"
            />
            <Button
              onClick={ () =>
                toast.success(customTitle, {
                  description: customDesc || undefined,
                  position,
                })
              }
            >
              Show toast
            </Button>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          3. ACTION BUTTON
      ══════════════════════════════════════ */}
      <Section
        id="action"
        title="Action Button"
        description="Add a single action link — great for undo flows or navigation on success."
      >
        <ComponentPreview
          code={ `toast.error("Message deleted.", {
  action: {
    label: "Undo",
    onClick: () => toast.success("Message restored!"),
  },
})`}
        >
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={ () =>
              toast.error("3 files deleted.", {
                position,
                action: { label: "Undo", onClick: () => toast.success("Files restored!", { position }) },
              })
            }>
              <Trash2 className="h-4 w-4 mr-1.5" /> Delete with undo
            </Button>

            <Button variant="outline" size="sm" onClick={ () =>
              toast.success("Post published!", {
                position,
                action: { label: "View post →", onClick: () => { } },
              })
            }>
              <Star className="h-4 w-4 mr-1.5" /> Publish post
            </Button>

            <Button variant="outline" size="sm" onClick={ () =>
              toast.info("New version v3.0 available.", {
                position,
                action: { label: "Update now", onClick: () => toast.loading("Updating…", { position }) },
              })
            }>
              <RefreshCw className="h-4 w-4 mr-1.5" /> Update available
            </Button>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          4. PROMISE TOAST
      ══════════════════════════════════════ */}
      <Section
        id="promise"
        title="Promise Toast"
        description="toast.promise() shows a loading state while the promise is pending, then transitions to success or error automatically."
      >
        <ComponentPreview
          code={ `toast.promise(uploadFile(), {
  loading: "Uploading file…",
  success: (data) => \`Uploaded to \${data.url}\`,
  error:   (err)  => \`Upload failed: \${err.message}\`,
}, { position: "bottom-right" })`}
        >
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={ () =>
                toast.promise(
                  fakeUpload(true),
                  {
                    loading: "Uploading file…",
                    success: (d) => `Uploaded to ${d.url}`,
                    error: (e) => `Upload failed: ${(e as Error).message}`,
                  },
                  { position }
                )
              }
            >
              <Upload className="h-4 w-4 mr-1.5" /> Upload (success)
            </Button>
            <Button
              variant="outline"
              onClick={ () =>
                toast.promise(
                  fakeUpload(false),
                  {
                    loading: "Uploading file…",
                    success: "Uploaded!",
                    error: (e) => `Failed: ${(e as Error).message}`,
                  },
                  { position }
                ).catch(() => { })
              }
            >
              <Upload className="h-4 w-4 mr-1.5" /> Upload (fail)
            </Button>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          5. CUSTOM ICON
      ══════════════════════════════════════ */}
      <Section
        id="custom-icon"
        title="Custom Icon"
        description="Pass any ReactNode as icon to override the default variant icon."
      >
        <ComponentPreview
          code={ `toast("Launching in 3…2…1!", {
  icon:     <Rocket className="h-4 w-4 text-violet-500" />,
  duration: 5000,
})`}
        >
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={ () =>
              toast("Launching in 3…2…1!", {
                position,
                icon: <Rocket className="h-4 w-4 text-violet-500" />,
                duration: 5000,
              })
            }>
              <Rocket className="h-4 w-4 mr-1.5" /> Custom icon
            </Button>

            <Button variant="outline" size="sm" onClick={ () =>
              toast("You earned a new badge!", {
                position,
                icon: <Star className="h-4 w-4 text-amber-400" />,
                description: "10-day streak — keep it up!",
              })
            }>
              <Star className="h-4 w-4 mr-1.5" /> Achievement
            </Button>

            <Button variant="outline" size="sm" onClick={ () =>
              toast("You have a new follower", {
                position,
                icon: <Heart className="h-4 w-4 text-pink-500" />,
                description: "@design_community started following you",
                action: { label: "View profile", onClick: () => { } },
              })
            }>
              <Heart className="h-4 w-4 mr-1.5" /> Notification
            </Button>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          6. POSITION
      ══════════════════════════════════════ */}
      <Section
        id="positions"
        title="Positions"
        description="Select a position below — all toasts in this demo will appear there. Configure the default in <Toaster position='…' />."
      >
        <ComponentPreview
          code={ `<Toaster position="top-center" />
// or per-toast:
toast.success("Saved!", { position: "top-right" })`}
        >
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-2 max-w-xs">
              { ([ "top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right" ] as const).map(p => (
                <button
                  key={ p }
                  onClick={ () => setPosition(p) }
                  className={ cn(
                    "text-[10px] font-mono px-2 py-1.5 rounded-lg border transition-colors",
                    position === p
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:bg-muted/60"
                  ) }
                >
                  { p }
                </button>
              )) }
            </div>
            <Button
              size="sm"
              className="max-w-xs"
              onClick={ () => toast.success(`Showing at ${position}`, { position }) }
            >
              Fire toast at <strong className="ml-1">{ position }</strong>
            </Button>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          7. PERSISTENT & DISMISS
      ══════════════════════════════════════ */}
      <Section
        id="persistent"
        title="Persistent & Programmatic Dismiss"
        description="Set duration={0} for a persistent toast. Use the returned id to dismiss it later from code."
      >
        <ComponentPreview
          code={ `const id = toast.warning("Offline — reconnecting…", {
  duration: 0,
  icon: <WifiOff />,
});

// Later:
toast.success("Back online!", { id, update: true, duration: 3000 });`}
        >
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={ () => {
                const id = toast.warning("You are offline", {
                  position,
                  duration: 0,
                  icon: <WifiOff className="h-4 w-4 text-amber-500" />,
                  description: "Reconnecting…",
                  id: "offline-toast",
                });
                setTimeout(() =>
                  toast.success("Back online!", {
                    id: "offline-toast",
                    position,
                    update: true,
                    icon: <Wifi className="h-4 w-4" />,
                    duration: 3000,
                  }), 3000
                );
              } }
            >
              <WifiOff className="h-4 w-4 mr-1.5" /> Simulate offline →  online
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={ () => toast.dismissAll() }
            >
              Dismiss all
            </Button>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          8. PROPS
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <p className="text-sm font-semibold mb-3">toast() options</p>
        <PropsTable props={ [
          { name: "title", type: "string", default: "—", description: "Main toast message." },
          { name: "description", type: "string", default: "—", description: "Secondary body text below the title." },
          { name: "variant", type: '"default"|"success"|"error"|"warning"|"info"|"loading"', default: '"default"', description: "Visual style and icon." },
          { name: "duration", type: "number", default: "4000", description: "Auto-dismiss duration in ms. 0 = persistent." },
          { name: "position", type: "ToastPosition", default: '"bottom-right"', description: "Where the toast appears." },
          { name: "id", type: "string", default: "auto", description: "Custom id for later update/dismiss." },
          { name: "action", type: "{ label: string; onClick: () => void }", default: "—", description: "Inline action button." },
          { name: "icon", type: "React.ReactNode", default: "variant icon", description: "Custom icon overriding the variant default." },
          { name: "update", type: "boolean", default: "true", description: "Replace an existing toast with the same id." },
          { name: "onDismiss", type: "(id: string) => void", default: "—", description: "Called after the toast is removed." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">Toaster props</p>
        <PropsTable props={ [
          { name: "position", type: "ToastPosition", default: '"bottom-right"', description: "Default position for toasts that don't specify one." },
          { name: "closeButton", type: "boolean", default: "true", description: "Show X button on each toast." },
          { name: "maxToasts", type: "number", default: "5", description: "Maximum toasts visible per position at once." },
        ] } />
      </Section>
    </DocsContent>
  );
}

function cn(...cls: (string | boolean | undefined | null)[]) {
  return cls.filter(Boolean).join(" ");
}
