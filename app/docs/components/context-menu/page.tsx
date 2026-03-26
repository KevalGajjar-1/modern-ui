"use client";

import React, { useState } from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import {
  ContextMenu, ContextMenuTrigger, ContextMenuContent,
  ContextMenuItem, ContextMenuSeparator, ContextMenuLabel,
  ContextMenuShortcut, ContextMenuCheckboxItem,
  ContextMenuRadioGroup, ContextMenuRadioItem,
  ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent,
} from "@/components/ui/context-menu";
import { Badge } from "@/components/ui/badge";
import {
  Copy, Clipboard, Scissors, Trash2, Pencil,
  FolderOpen, Download, Share2, Star, StarOff,
  Eye, EyeOff, Lock, Unlock, RefreshCw,
  Image, FileText, Link2, ExternalLink,
  Palette, ZoomIn, ZoomOut, RotateCw,
  Pin, PinOff, Archive, Tag,
  ChevronRight, MoreHorizontal,
} from "lucide-react";

// ─── Demo trigger area helper ─────────────────────────────
function RightClickArea({
  children,
  className,
  label = "Right-click anywhere in this area",
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={ cn(
        "relative w-full min-h-[120px] flex flex-col items-center justify-center gap-2",
        "rounded-2xl border-2 border-dashed border-border/50 bg-muted/20",
        "cursor-context-menu select-none transition-colors",
        "hover:border-border/80 hover:bg-muted/30",
        className
      ) }
    >
      <MoreHorizontal className="h-5 w-5 text-muted-foreground/40" />
      <p className="text-xs text-muted-foreground/50">{ label }</p>
      { children }
    </div>
  );
}

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ContextMenuPage() {
  const [ starred, setStarred ] = useState(false);
  const [ pinned, setPinned ] = useState(false);
  const [ showMeta, setShowMeta ] = useState(true);
  const [ viewMode, setViewMode ] = useState("grid");
  const [ sortBy, setSortBy ] = useState("name");
  const [ lastAction, setLastAction ] = useState<string | null>(null);
  const [ imageFilter, setImageFilter ] = useState("none");

  const act = (label: string) => setLastAction(label);

  return (
    <DocsContent
      title="Context Menu"
      description="A right-click (or long-press) triggered popup menu. Positioned automatically to stay within the viewport. Supports submenus, checkbox and radio items, keyboard shortcuts, and Escape dismissal."
      importPath='import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuLabel, ContextMenuShortcut, ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent } from "@/components/ui/context-menu";'
    >

      {/* ══════════════════════════════════════
          1. BASIC
      ══════════════════════════════════════ */}
      <Section
        id="basic"
        title="Basic"
        description="Right-click the dashed area to open the context menu. It dismisses on item click, Escape, or outside click."
      >
        <ComponentPreview
          code={ `import {
  ContextMenu, ContextMenuTrigger, ContextMenuContent,
  ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut,
} from "@/components/ui/context-menu";

<ContextMenu>
  <ContextMenuTrigger>
    <div className="border-2 border-dashed rounded-2xl p-10 cursor-context-menu">
      Right-click me
    </div>
  </ContextMenuTrigger>

  <ContextMenuContent>
    <ContextMenuItem>
      <Copy /> Copy <ContextMenuShortcut>⌘C</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem>
      <Clipboard /> Paste <ContextMenuShortcut>⌘V</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem variant="destructive">
      <Trash2 /> Delete
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}
        >
          <div className="w-full max-w-md">
            <ContextMenu>
              <ContextMenuTrigger>
                <RightClickArea>
                  <span />
                </RightClickArea>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem onClick={ () => act("Cut") }>
                  <Scissors className="h-4 w-4 text-muted-foreground" /> Cut
                  <ContextMenuShortcut>⌘X</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem onClick={ () => act("Copy") }>
                  <Copy className="h-4 w-4 text-muted-foreground" /> Copy
                  <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem onClick={ () => act("Paste") }>
                  <Clipboard className="h-4 w-4 text-muted-foreground" /> Paste
                  <ContextMenuShortcut>⌘V</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem variant="destructive" onClick={ () => act("Delete") }>
                  <Trash2 className="h-4 w-4" /> Delete
                  <ContextMenuShortcut>⌫</ContextMenuShortcut>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
            { lastAction && (
              <p className="text-xs font-mono text-muted-foreground mt-3">
                Last action: <strong className="text-foreground">{ lastAction }</strong>
              </p>
            ) }
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. CHECKBOX & RADIO ITEMS
      ══════════════════════════════════════ */}
      <Section
        id="checkbox-radio"
        title="Checkbox & Radio Items"
        description="Use ContextMenuCheckboxItem for toggles and ContextMenuRadioGroup + ContextMenuRadioItem for exclusive selections."
      >
        <ComponentPreview
          code={ `const [starred, setStarred] = useState(false);
const [viewMode, setViewMode] = useState("grid");

<ContextMenu>
  <ContextMenuTrigger>…</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuCheckboxItem
      checked={starred}
      onCheckedChange={setStarred}
    >
      <Star /> Starred
    </ContextMenuCheckboxItem>

    <ContextMenuSeparator />
    <ContextMenuLabel>View as</ContextMenuLabel>
    <ContextMenuRadioGroup value={viewMode} onValueChange={setViewMode}>
      <ContextMenuRadioItem value="grid">Grid</ContextMenuRadioItem>
      <ContextMenuRadioItem value="list">List</ContextMenuRadioItem>
      <ContextMenuRadioItem value="columns">Columns</ContextMenuRadioItem>
    </ContextMenuRadioGroup>
  </ContextMenuContent>
</ContextMenu>`}
        >
          <div className="w-full max-w-md">
            <ContextMenu>
              <ContextMenuTrigger>
                <RightClickArea label="Right-click for view options">
                  <span />
                </RightClickArea>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuLabel>Toggles</ContextMenuLabel>
                <ContextMenuCheckboxItem checked={ starred } onCheckedChange={ setStarred }>
                  <Star className="h-4 w-4 text-muted-foreground" /> Starred
                </ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem checked={ pinned } onCheckedChange={ setPinned }>
                  <Pin className="h-4 w-4 text-muted-foreground" /> Pinned
                </ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem checked={ showMeta } onCheckedChange={ setShowMeta }>
                  <Eye className="h-4 w-4 text-muted-foreground" /> Show metadata
                </ContextMenuCheckboxItem>
                <ContextMenuSeparator />
                <ContextMenuLabel>View as</ContextMenuLabel>
                <ContextMenuRadioGroup value={ viewMode } onValueChange={ setViewMode }>
                  { [ "grid", "list", "columns", "gallery" ].map(v => (
                    <ContextMenuRadioItem key={ v } value={ v } className="capitalize">{ v }</ContextMenuRadioItem>
                  )) }
                </ContextMenuRadioGroup>
                <ContextMenuSeparator />
                <ContextMenuLabel>Sort by</ContextMenuLabel>
                <ContextMenuRadioGroup value={ sortBy } onValueChange={ setSortBy }>
                  { [ "name", "date", "size", "type" ].map(v => (
                    <ContextMenuRadioItem key={ v } value={ v } className="capitalize">{ v }</ContextMenuRadioItem>
                  )) }
                </ContextMenuRadioGroup>
              </ContextMenuContent>
            </ContextMenu>

            <div className="flex flex-wrap gap-2 mt-3">
              { [
                { k: "starred", v: String(starred) },
                { k: "pinned", v: String(pinned) },
                { k: "viewMode", v: viewMode },
                { k: "sortBy", v: sortBy },
              ].map(s => (
                <Badge key={ s.k } variant="secondary" className="font-mono text-[9px]">
                  { s.k }: { s.v }
                </Badge>
              )) }
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          3. SUBMENUS
      ══════════════════════════════════════ */}
      <Section
        id="submenus"
        title="Submenus"
        description="ContextMenuSub opens a fly-out panel on hover. Nest as many levels deep as needed."
      >
        <ComponentPreview
          code={ `<ContextMenuSub>
  <ContextMenuSubTrigger>
    <Share2 /> Share
  </ContextMenuSubTrigger>
  <ContextMenuSubContent>
    <ContextMenuItem>Copy link</ContextMenuItem>
    <ContextMenuItem>Send via email</ContextMenuItem>
    <ContextMenuSub>
      <ContextMenuSubTrigger>Social media</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuItem>Twitter / X</ContextMenuItem>
        <ContextMenuItem>LinkedIn</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
  </ContextMenuSubContent>
</ContextMenuSub>`}
        >
          <div className="w-full max-w-md">
            <ContextMenu>
              <ContextMenuTrigger>
                <RightClickArea label="Right-click for sub-menu demo">
                  <span />
                </RightClickArea>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem onClick={ () => act("Open") }>
                  <FolderOpen className="h-4 w-4 text-muted-foreground" /> Open
                </ContextMenuItem>
                <ContextMenuItem onClick={ () => act("Rename") }>
                  <Pencil className="h-4 w-4 text-muted-foreground" /> Rename
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuSub>
                  <ContextMenuSubTrigger>
                    <Share2 className="h-4 w-4 text-muted-foreground mr-2" /> Share
                  </ContextMenuSubTrigger>
                  <ContextMenuSubContent>
                    <ContextMenuItem onClick={ () => act("Copy link") }>
                      <Link2 className="h-4 w-4 text-muted-foreground" /> Copy link
                    </ContextMenuItem>
                    <ContextMenuItem onClick={ () => act("Open in new tab") }>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" /> Open in new tab
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuSub>
                      <ContextMenuSubTrigger>
                        <Share2 className="h-4 w-4 text-muted-foreground mr-2" /> Social media
                      </ContextMenuSubTrigger>
                      <ContextMenuSubContent>
                        <ContextMenuItem onClick={ () => act("Share Twitter") }>Twitter / X</ContextMenuItem>
                        <ContextMenuItem onClick={ () => act("Share LinkedIn") }>LinkedIn</ContextMenuItem>
                        <ContextMenuItem onClick={ () => act("Share WhatsApp") }>WhatsApp</ContextMenuItem>
                      </ContextMenuSubContent>
                    </ContextMenuSub>
                  </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSub>
                  <ContextMenuSubTrigger>
                    <Download className="h-4 w-4 text-muted-foreground mr-2" /> Export as
                  </ContextMenuSubTrigger>
                  <ContextMenuSubContent>
                    { [ "PDF", "PNG", "SVG", "CSV", "JSON" ].map(f => (
                      <ContextMenuItem key={ f } onClick={ () => act(`Export ${f}`) }>
                        { f }
                      </ContextMenuItem>
                    )) }
                  </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuItem variant="destructive" onClick={ () => act("Delete") }>
                  <Trash2 className="h-4 w-4" /> Delete
                  <ContextMenuShortcut>⌫</ContextMenuShortcut>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
            { lastAction && (
              <p className="text-xs font-mono text-muted-foreground mt-3">
                Last action: <strong className="text-foreground">{ lastAction }</strong>
              </p>
            ) }
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          4. REAL WORLD — FILE BROWSER
      ══════════════════════════════════════ */}
      <Section
        id="file-browser"
        title="File Browser"
        description="A file grid where each item has its own context menu with file-specific actions."
      >
        <ComponentPreview code={ `files.map(file => (
  <ContextMenu key={file.id}>
    <ContextMenuTrigger asChild>
      <div className="file-card">…</div>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>Open</ContextMenuItem>
      <ContextMenuItem>Rename</ContextMenuItem>
      <ContextMenuCheckboxItem checked={file.starred}>Star</ContextMenuCheckboxItem>
      <ContextMenuSeparator />
      <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
))}`}
        >
          <div className="w-full max-w-lg">
            <div className="grid grid-cols-3 gap-2">
              { [
                { name: "design-system.fig", icon: Palette, type: "Figma", size: "4.2 MB" },
                { name: "report-q1.pdf", icon: FileText, type: "PDF", size: "1.8 MB" },
                { name: "hero-image.png", icon: Image, type: "PNG", size: "2.3 MB" },
                { name: "data-export.csv", icon: FileText, type: "CSV", size: "320 KB" },
                { name: "README.md", icon: FileText, type: "MD", size: "8 KB" },
                { name: "archive.zip", icon: Archive, type: "ZIP", size: "18.4 MB" },
              ].map((file) => (
                <ContextMenu key={ file.name }>
                  <ContextMenuTrigger asChild>
                    <div className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border/40 bg-card hover:bg-muted/40 cursor-context-menu select-none transition-colors group">
                      <div className="w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center">
                        <file.icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <span className="text-[10px] font-medium text-center leading-tight truncate w-full text-center">
                        { file.name }
                      </span>
                      <span className="text-[9px] text-muted-foreground/60">{ file.size }</span>
                    </div>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuLabel>{ file.type } file</ContextMenuLabel>
                    <ContextMenuItem onClick={ () => act(`Open ${file.name}`) }>
                      <FolderOpen className="h-4 w-4 text-muted-foreground" /> Open
                    </ContextMenuItem>
                    <ContextMenuItem onClick={ () => act(`Rename ${file.name}`) }>
                      <Pencil className="h-4 w-4 text-muted-foreground" /> Rename
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuSub>
                      <ContextMenuSubTrigger>
                        <Share2 className="h-4 w-4 text-muted-foreground mr-2" /> Share
                      </ContextMenuSubTrigger>
                      <ContextMenuSubContent>
                        <ContextMenuItem onClick={ () => act("Copy link") }>
                          <Link2 className="h-4 w-4 text-muted-foreground" /> Copy link
                        </ContextMenuItem>
                        <ContextMenuItem onClick={ () => act("Send email") }>
                          Send via email
                        </ContextMenuItem>
                      </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuItem onClick={ () => act(`Download ${file.name}`) }>
                      <Download className="h-4 w-4 text-muted-foreground" /> Download
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem variant="destructive" onClick={ () => act(`Delete ${file.name}`) }>
                      <Trash2 className="h-4 w-4" /> Delete
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              )) }
            </div>
            { lastAction && (
              <p className="text-xs font-mono text-muted-foreground mt-3">
                Last action: <strong className="text-foreground">{ lastAction }</strong>
              </p>
            ) }
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          5. IMAGE CANVAS MENU
      ══════════════════════════════════════ */}
      <Section
        id="canvas"
        title="Image / Canvas Menu"
        description="A context menu for image editing surfaces — zoom, rotate, filter, and layer controls."
      >
        <ComponentPreview code={ `<ContextMenu>
  <ContextMenuTrigger asChild>
    <canvas className="rounded-2xl bg-muted cursor-context-menu" />
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuLabel>Image</ContextMenuLabel>
    <ContextMenuRadioGroup value={filter} onValueChange={setFilter}>
      <ContextMenuRadioItem value="none">Original</ContextMenuRadioItem>
      <ContextMenuRadioItem value="grayscale">Grayscale</ContextMenuRadioItem>
      <ContextMenuRadioItem value="sepia">Sepia</ContextMenuRadioItem>
    </ContextMenuRadioGroup>
  </ContextMenuContent>
</ContextMenu>`}
        >
          <div className="w-full max-w-md">
            <ContextMenu>
              <ContextMenuTrigger asChild>
                <div
                  className="relative w-full h-40 rounded-2xl overflow-hidden cursor-context-menu"
                  style={ {
                    filter: imageFilter === "grayscale" ? "grayscale(1)"
                      : imageFilter === "sepia" ? "sepia(0.8)"
                        : imageFilter === "blur" ? "blur(3px)"
                          : imageFilter === "invert" ? "invert(0.8)"
                            : undefined,
                    transition: "filter 0.3s ease",
                  } }
                >
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
                    alt="Mountain"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="secondary" className="text-[9px] font-mono">
                      filter: { imageFilter }
                    </Badge>
                  </div>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuLabel>Image actions</ContextMenuLabel>
                <ContextMenuItem onClick={ () => act("Zoom in") }>
                  <ZoomIn className="h-4 w-4 text-muted-foreground" /> Zoom in
                  <ContextMenuShortcut>⌘+</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem onClick={ () => act("Zoom out") }>
                  <ZoomOut className="h-4 w-4 text-muted-foreground" /> Zoom out
                  <ContextMenuShortcut>⌘-</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem onClick={ () => act("Rotate") }>
                  <RotateCw className="h-4 w-4 text-muted-foreground" /> Rotate 90°
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuLabel>Filter</ContextMenuLabel>
                <ContextMenuRadioGroup value={ imageFilter } onValueChange={ setImageFilter }>
                  { [ "none", "grayscale", "sepia", "blur", "invert" ].map(f => (
                    <ContextMenuRadioItem key={ f } value={ f } className="capitalize">
                      { f === "none" ? "Original" : f }
                    </ContextMenuRadioItem>
                  )) }
                </ContextMenuRadioGroup>
                <ContextMenuSeparator />
                <ContextMenuSub>
                  <ContextMenuSubTrigger>
                    <Download className="h-4 w-4 text-muted-foreground mr-2" /> Save as
                  </ContextMenuSubTrigger>
                  <ContextMenuSubContent>
                    { [ "PNG", "JPEG", "WEBP", "SVG" ].map(f => (
                      <ContextMenuItem key={ f } onClick={ () => act(`Save ${f}`) }>
                        { f }
                      </ContextMenuItem>
                    )) }
                  </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuItem onClick={ () => act("Copy image") }>
                  <Copy className="h-4 w-4 text-muted-foreground" /> Copy image
                  <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          6. PROPS
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <p className="text-sm font-semibold mb-3">ContextMenu</p>
        <PropsTable props={ [
          { name: "disabled", type: "boolean", default: "false", description: "Prevents the context menu from opening on right-click." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">ContextMenuItem</p>
        <PropsTable props={ [
          { name: "variant", type: '"default" | "destructive"', default: '"default"', description: "Destructive renders red text and red hover background." },
          { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction and dims the item." },
          { name: "inset", type: "boolean", default: "false", description: "Adds left padding to align with checked/radio items." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">ContextMenuCheckboxItem</p>
        <PropsTable props={ [
          { name: "checked", type: "boolean", default: "false", description: "Whether the item displays a checkmark." },
          { name: "onCheckedChange", type: "(checked: boolean) => void", default: "—", description: "Called when the item is clicked." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">ContextMenuRadioGroup</p>
        <PropsTable props={ [
          { name: "value", type: "string", default: "—", description: "Active radio value." },
          { name: "onValueChange", type: "(value: string) => void", default: "—", description: "Called when a radio item is selected." },
        ] } />
      </Section>
    </DocsContent>
  );
}
