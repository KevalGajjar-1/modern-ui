"use client";

import React, { useState } from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard, FileText, Code2, Terminal,
  Image, Settings, Users, BarChart3,
  FolderOpen, File, ChevronRight, Search,
} from "lucide-react";

// ─── Placeholder content helper ──────────────────────────
function PanelContent({
  label,
  icon: Icon,
  muted = false,
  className,
}: {
  label: string;
  icon?: React.ElementType;
  muted?: boolean;
  className?: string;
}) {
  return (
    <div
      className={ `h-full flex flex-col items-center justify-center gap-2 p-4 ${muted ? "bg-muted/20" : "bg-background"
        } ${className ?? ""}` }
    >
      { Icon && <Icon className="h-6 w-6 text-muted-foreground/40" /> }
      <p className="text-xs font-medium text-muted-foreground/60 select-none">{ label }</p>
    </div>
  );
}

export default function ResizablePage() {
  const [ sizes2, setSizes2 ] = useState([ 50, 50 ]);
  const [ sizes3, setSizes3 ] = useState([ 20, 55, 25 ]);

  return (
    <DocsContent
      title="Resizable"
      description="Drag-to-resize panel layouts with horizontal or vertical splits. Supports min/max constraints, a grip handle, localStorage persistence, and nested groups for complex editor-style UIs."
      importPath='import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";'
    >

      {/* ══════════════════════════════════════
          1. BASIC — TWO COLUMNS
      ══════════════════════════════════════ */}
      <Section
        id="basic"
        title="Two Columns"
        description="Drag the handle between the two panels to resize. The total always stays 100%."
      >
        <ComponentPreview
          code={ `import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

<ResizablePanelGroup direction="horizontal" className="h-40 rounded-2xl border border-border/60">
  <ResizablePanel index={0} defaultSize={50} minSize={20}>
    <div className="h-full flex items-center justify-center">Panel A</div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel index={1} defaultSize={50} minSize={20}>
    <div className="h-full flex items-center justify-center">Panel B</div>
  </ResizablePanel>
</ResizablePanelGroup>`}
        >
          <div className="w-full">
            <ResizablePanelGroup
              direction="horizontal"
              className="h-44 rounded-2xl border border-border/60 overflow-hidden"
              onLayout={ setSizes2 }
            >
              <ResizablePanel index={ 0 } defaultSize={ 50 } minSize={ 20 }>
                <PanelContent label="Panel A" icon={ FileText } />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel index={ 1 } defaultSize={ 50 } minSize={ 20 }>
                <PanelContent label="Panel B" icon={ Image } muted />
              </ResizablePanel>
            </ResizablePanelGroup>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary" className="font-mono text-[9px]">
                A: { sizes2[ 0 ]?.toFixed(1) }%
              </Badge>
              <Badge variant="secondary" className="font-mono text-[9px]">
                B: { sizes2[ 1 ]?.toFixed(1) }%
              </Badge>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. VERTICAL SPLIT
      ══════════════════════════════════════ */}
      <Section
        id="vertical"
        title="Vertical Split"
        description="Set direction='vertical' to split panels top and bottom."
      >
        <ComponentPreview
          code={ `<ResizablePanelGroup
  direction="vertical"
  className="h-64 rounded-2xl border border-border/60"
>
  <ResizablePanel index={0} defaultSize={40} minSize={20}>…</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel index={1} defaultSize={60} minSize={20}>…</ResizablePanel>
</ResizablePanelGroup>`}
        >
          <ResizablePanelGroup
            direction="vertical"
            className="h-64 rounded-2xl border border-border/60 overflow-hidden"
          >
            <ResizablePanel index={ 0 } defaultSize={ 40 } minSize={ 20 }>
              <PanelContent label="Top panel" icon={ BarChart3 } />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel index={ 1 } defaultSize={ 60 } minSize={ 20 }>
              <PanelContent label="Bottom panel" icon={ Terminal } muted />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          3. THREE PANELS
      ══════════════════════════════════════ */}
      <Section
        id="three-panels"
        title="Three Panels"
        description="Add a second handle for three-column or three-row layouts."
      >
        <ComponentPreview
          code={ `<ResizablePanelGroup direction="horizontal" className="h-44">
  <ResizablePanel index={0} defaultSize={20} minSize={10} maxSize={40}>
    Sidebar
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel index={1} defaultSize={55} minSize={30}>
    Editor
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel index={2} defaultSize={25} minSize={15} maxSize={40}>
    Preview
  </ResizablePanel>
</ResizablePanelGroup>`}
        >
          <div className="w-full">
            <ResizablePanelGroup
              direction="horizontal"
              className="h-52 rounded-2xl border border-border/60 overflow-hidden"
              onLayout={ setSizes3 }
            >
              <ResizablePanel index={ 0 } defaultSize={ 20 } minSize={ 10 } maxSize={ 40 }>
                <div className="h-full bg-muted/30 flex flex-col">
                  <div className="px-3 py-2 border-b border-border/40">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">Sidebar</p>
                  </div>
                  <div className="flex-1 p-2 space-y-1 overflow-y-auto">
                    { [ "index.tsx", "app.tsx", "layout.tsx", "page.tsx", "globals.css" ].map(f => (
                      <div key={ f } className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] text-muted-foreground hover:bg-muted/60 cursor-pointer">
                        <File className="h-3 w-3 shrink-0" /> { f }
                      </div>
                    )) }
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              <ResizablePanel index={ 1 } defaultSize={ 55 } minSize={ 30 }>
                <div className="h-full flex flex-col">
                  <div className="px-3 py-2 border-b border-border/40 flex items-center gap-2">
                    <Code2 className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">Editor</p>
                  </div>
                  <div className="flex-1 p-3 font-mono text-[11px] text-muted-foreground/60 overflow-y-auto">
                    <pre>{ `import React from "react";\n\nexport default function Page() {\n  return (\n    <main>\n      <h1>Hello world</h1>\n    </main>\n  );\n}` }</pre>
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              <ResizablePanel index={ 2 } defaultSize={ 25 } minSize={ 15 } maxSize={ 40 }>
                <div className="h-full bg-muted/10 flex flex-col">
                  <div className="px-3 py-2 border-b border-border/40">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">Preview</p>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center space-y-1">
                      <LayoutDashboard className="h-8 w-8 text-muted-foreground/20 mx-auto" />
                      <p className="text-[11px] text-muted-foreground/40">Live preview</p>
                    </div>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>

            <div className="flex gap-2 mt-2">
              { [ "Sidebar", "Editor", "Preview" ].map((l, i) => (
                <Badge key={ l } variant="secondary" className="font-mono text-[9px]">
                  { l }: { sizes3[ i ]?.toFixed(1) }%
                </Badge>
              )) }
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          4. NESTED (IDE LAYOUT)
      ══════════════════════════════════════ */}
      <Section
        id="nested"
        title="Nested Groups (IDE)"
        description="Nest ResizablePanelGroups to build complex editor-style layouts — a sidebar, editor, and a split bottom pane."
      >
        <ComponentPreview
          code={ `<ResizablePanelGroup direction="horizontal" className="h-80">
  {/* Sidebar */}
  <ResizablePanel index={0} defaultSize={18} minSize={12} maxSize={30}>
    …file tree…
  </ResizablePanel>
  <ResizableHandle withHandle />
  {/* Right column: editor + terminal */}
  <ResizablePanel index={1} defaultSize={82}>
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel index={0} defaultSize={65} minSize={30}>
        …editor…
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel index={1} defaultSize={35} minSize={20}>
        …terminal…
      </ResizablePanel>
    </ResizablePanelGroup>
  </ResizablePanel>
</ResizablePanelGroup>`}
        >
          <ResizablePanelGroup
            direction="horizontal"
            className="h-80 rounded-2xl border border-border/60 overflow-hidden"
          >
            {/* File tree */ }
            <ResizablePanel index={ 0 } defaultSize={ 18 } minSize={ 12 } maxSize={ 30 }>
              <div className="h-full bg-muted/20 flex flex-col text-[11px]">
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/40">
                  <FolderOpen className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-semibold text-muted-foreground/70">my-app</span>
                </div>
                <div className="p-2 space-y-0.5 overflow-y-auto flex-1">
                  { [
                    { name: "src", indent: 0, isFolder: true },
                    { name: "app", indent: 1, isFolder: true },
                    { name: "page.tsx", indent: 2, isFolder: false },
                    { name: "layout.tsx", indent: 2, isFolder: false },
                    { name: "components", indent: 1, isFolder: true },
                    { name: "ui", indent: 2, isFolder: true },
                    { name: "button.tsx", indent: 3, isFolder: false },
                    { name: "public", indent: 0, isFolder: true },
                    { name: "package.json", indent: 0, isFolder: false },
                  ].map(f => (
                    <div
                      key={ f.name }
                      className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-muted-foreground/70 hover:bg-muted/60 cursor-pointer"
                      style={ { paddingLeft: `${f.indent * 10 + 6}px` } }
                    >
                      { f.isFolder
                        ? <FolderOpen className="h-3 w-3 shrink-0 text-amber-400/70" />
                        : <File className="h-3 w-3 shrink-0 text-blue-400/70" />
                      }
                      <span className="truncate">{ f.name }</span>
                    </div>
                  )) }
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Right: editor + terminal */ }
            <ResizablePanel index={ 1 } defaultSize={ 82 }>
              <ResizablePanelGroup direction="vertical" className="h-full">
                {/* Editor */ }
                <ResizablePanel index={ 0 } defaultSize={ 65 } minSize={ 30 }>
                  <div className="h-full flex flex-col">
                    <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border/40 bg-muted/20">
                      <div className="flex gap-1.5">
                        { [ "page.tsx", "layout.tsx", "button.tsx" ].map((t, i) => (
                          <span key={ t } className={ `text-[10px] px-2 py-0.5 rounded-t-md border-t border-x border-border/40 cursor-pointer ${i === 0 ? "bg-background text-foreground" : "text-muted-foreground/60 hover:text-muted-foreground"}` }>
                            { t }
                          </span>
                        )) }
                      </div>
                    </div>
                    <div className="flex-1 p-3 font-mono text-[11px] text-muted-foreground/70 overflow-auto bg-background">
                      <div className="flex gap-4">
                        <div className="text-muted-foreground/30 select-none text-right" style={ { minWidth: "1.5rem" } }>
                          { Array.from({ length: 14 }, (_, i) => i + 1).map(n => <div key={ n }>{ n }</div>) }
                        </div>
                        <pre className="flex-1">{ `"use client";\nimport React from "react";\n\nexport default function Page() {\n  return (\n    <main className="p-8">\n      <h1 className="text-3xl font-bold">\n        Hello, world!\n      </h1>\n      <p className="mt-2 text-gray-500">\n        Built with Next.js\n      </p>\n    </main>\n  );\n}` }</pre>
                      </div>
                    </div>
                  </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* Terminal */ }
                <ResizablePanel index={ 1 } defaultSize={ 35 } minSize={ 20 }>
                  <div className="h-full flex flex-col bg-zinc-950 dark:bg-zinc-900">
                    <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/10">
                      <div className="flex items-center gap-1.5">
                        <Terminal className="h-3.5 w-3.5 text-zinc-400" />
                        <span className="text-[10px] font-medium text-zinc-400">Terminal</span>
                      </div>
                      <div className="flex gap-1">
                        { [ "zsh", "node", "git" ].map(t => (
                          <span key={ t } className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-500">{ t }</span>
                        )) }
                      </div>
                    </div>
                    <div className="flex-1 p-3 font-mono text-[11px] text-emerald-400/80 overflow-y-auto space-y-1">
                      <p className="text-zinc-500">❯ npm run dev</p>
                      <p><span className="text-blue-400">▲ Next.js</span> 15.2.1</p>
                      <p className="text-zinc-400">  - Local:   <span className="text-white">http://localhost:3000</span></p>
                      <p className="text-zinc-400">  - Network: <span className="text-white">http://192.168.1.5:3000</span></p>
                      <p className="text-emerald-400">✓ Ready in 1.2s</p>
                      <p className="text-zinc-500 mt-2">❯ <span className="animate-pulse">█</span></p>
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          5. PERSIST TO LOCALSTORAGE
      ══════════════════════════════════════ */}
      <Section
        id="persist"
        title="Persist Layout"
        description="Pass storageKey to automatically save and restore panel sizes across page reloads."
      >
        <ComponentPreview
          code={ `<ResizablePanelGroup
  direction="horizontal"
  storageKey="docs-layout"
  className="h-40 rounded-2xl border"
>
  <ResizablePanel index={0} defaultSize={35} minSize={20}>
    <p>Drag me — sizes persist on reload</p>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel index={1} defaultSize={65} minSize={20}>
    <p>Panel B</p>
  </ResizablePanel>
</ResizablePanelGroup>`}
        >
          <div className="w-full">
            <ResizablePanelGroup
              direction="horizontal"
              storageKey="docs-resizable-persist-demo"
              className="h-40 rounded-2xl border border-border/60 overflow-hidden"
            >
              <ResizablePanel index={ 0 } defaultSize={ 35 } minSize={ 20 }>
                <div className="h-full flex flex-col items-center justify-center gap-1.5 p-4 bg-muted/20">
                  <Settings className="h-5 w-5 text-muted-foreground/40" />
                  <p className="text-[11px] text-muted-foreground/60 text-center">
                    Drag me — sizes persist on reload
                  </p>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel index={ 1 } defaultSize={ 65 } minSize={ 20 }>
                <PanelContent label="Panel B" icon={ LayoutDashboard } />
              </ResizablePanel>
            </ResizablePanelGroup>
            <p className="text-xs text-muted-foreground mt-2">
              Resize the panels, then refresh the page — sizes are restored from{ " " }
              <code className="text-[10px] bg-muted px-1 py-0.5 rounded">localStorage</code>.
            </p>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          6. PROPS
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <p className="text-sm font-semibold mb-3">ResizablePanelGroup</p>
        <PropsTable props={ [
          { name: "direction", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direction panels are arranged and resized." },
          { name: "storageKey", type: "string", default: "—", description: "localStorage key to persist panel sizes." },
          { name: "onLayout", type: "(sizes: number[]) => void", default: "—", description: "Called whenever panel sizes change." },
          { name: "handleSize", type: "number", default: "5", description: "Visual size of the resize handle in px." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">ResizablePanel</p>
        <PropsTable props={ [
          { name: "index", type: "number", default: "0", description: "Zero-based panel index within the group. Must be set correctly." },
          { name: "defaultSize", type: "number", default: "equal split", description: "Initial size as a percentage (0–100)." },
          { name: "minSize", type: "number", default: "10", description: "Minimum size as a percentage." },
          { name: "maxSize", type: "number", default: "90", description: "Maximum size as a percentage." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">ResizableHandle</p>
        <PropsTable props={ [
          { name: "withHandle", type: "boolean", default: "false", description: "Show a visible grip icon on the handle." },
          { name: "disabled", type: "boolean", default: "false", description: "Prevent resizing via this handle." },
        ] } />
      </Section>
    </DocsContent>
  );
}
