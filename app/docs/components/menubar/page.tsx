"use client";

import React, { useState } from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import {
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent,
  MenubarItem, MenubarSeparator, MenubarLabel, MenubarShortcut,
  MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem,
  MenubarSub, MenubarSubTrigger, MenubarSubContent,
} from "@/components/ui/menubar";
import { Badge } from "@/components/ui/badge";
import {
  File, FolderOpen, Save, Printer, Share2,
  Undo2, Redo2, Scissors, Copy, Clipboard,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  ZoomIn, ZoomOut, Maximize, Grid, SidebarOpen,
  Download, Upload, Trash2, Settings,
  FileText, FilePlus, FolderPlus,
} from "lucide-react";

export default function MenubarPage() {
  const [ showRuler, setShowRuler ] = useState(true);
  const [ showGrid, setShowGrid ] = useState(false);
  const [ showSidebar, setShowSidebar ] = useState(true);
  const [ showStatusBar, setShowStatusBar ] = useState(true);
  const [ fontFamily, setFontFamily ] = useState("inter");
  const [ zoom, setZoom ] = useState("100");
  const [ lastAction, setLastAction ] = useState<string | null>(null);

  const act = (label: string) => setLastAction(label);

  return (
    <DocsContent
      title="Menubar"
      description="A horizontal application menu bar — the kind you see in desktop apps and rich text editors. Supports submenus, checkbox items, radio groups, keyboard shortcuts, and separators."
      importPath='import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarLabel, MenubarShortcut, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarSub, MenubarSubTrigger, MenubarSubContent } from "@/components/ui/menubar";'
    >

      {/* ══════════════════════════════════════
          1. BASIC
      ══════════════════════════════════════ */}
      <Section
        id="basic"
        title="Basic"
        description="A three-menu File / Edit / View menubar. Click a trigger to open its menu. Hover-switching between menus is supported when any menu is open."
      >
        <ComponentPreview
          code={ `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem><FilePlus /> New file <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
      <MenubarItem><FolderOpen /> Open… <MenubarShortcut>⌘O</MenubarShortcut></MenubarItem>
      <MenubarSeparator />
      <MenubarItem><Save /> Save <MenubarShortcut>⌘S</MenubarShortcut></MenubarItem>
      <MenubarSeparator />
      <MenubarItem variant="destructive"><Trash2 /> Delete</MenubarItem>
    </MenubarContent>
  </MenubarMenu>

  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
    <MenubarContent>
      <MenubarItem><Undo2 /> Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
      <MenubarItem><Redo2 /> Redo <MenubarShortcut>⌘⇧Z</MenubarShortcut></MenubarItem>
      <MenubarSeparator />
      <MenubarItem><Copy /> Copy <MenubarShortcut>⌘C</MenubarShortcut></MenubarItem>
      <MenubarItem><Clipboard /> Paste <MenubarShortcut>⌘V</MenubarShortcut></MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`}
        >
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={ () => act("New file") }>
                  <FilePlus className="h-4 w-4 text-muted-foreground" /> New file
                  <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onClick={ () => act("New folder") }>
                  <FolderPlus className="h-4 w-4 text-muted-foreground" /> New folder
                </MenubarItem>
                <MenubarItem onClick={ () => act("Open") }>
                  <FolderOpen className="h-4 w-4 text-muted-foreground" /> Open…
                  <MenubarShortcut>⌘O</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={ () => act("Save") }>
                  <Save className="h-4 w-4 text-muted-foreground" /> Save
                  <MenubarShortcut>⌘S</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onClick={ () => act("Save As") }>
                  <FileText className="h-4 w-4 text-muted-foreground" /> Save as…
                  <MenubarShortcut>⌘⇧S</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem variant="destructive" onClick={ () => act("Delete") }>
                  <Trash2 className="h-4 w-4" /> Delete
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={ () => act("Undo") }>
                  <Undo2 className="h-4 w-4 text-muted-foreground" /> Undo
                  <MenubarShortcut>⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onClick={ () => act("Redo") }>
                  <Redo2 className="h-4 w-4 text-muted-foreground" /> Redo
                  <MenubarShortcut>⌘⇧Z</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={ () => act("Cut") }>
                  <Scissors className="h-4 w-4 text-muted-foreground" /> Cut
                  <MenubarShortcut>⌘X</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onClick={ () => act("Copy") }>
                  <Copy className="h-4 w-4 text-muted-foreground" /> Copy
                  <MenubarShortcut>⌘C</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onClick={ () => act("Paste") }>
                  <Clipboard className="h-4 w-4 text-muted-foreground" /> Paste
                  <MenubarShortcut>⌘V</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={ () => act("Zoom in") }>
                  <ZoomIn className="h-4 w-4 text-muted-foreground" /> Zoom in
                  <MenubarShortcut>⌘+</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onClick={ () => act("Zoom out") }>
                  <ZoomOut className="h-4 w-4 text-muted-foreground" /> Zoom out
                  <MenubarShortcut>⌘-</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onClick={ () => act("Fullscreen") }>
                  <Maximize className="h-4 w-4 text-muted-foreground" /> Fullscreen
                  <MenubarShortcut>F11</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          { lastAction && (
            <p className="text-xs text-muted-foreground mt-3 font-mono">
              Last action: <strong className="text-foreground">{ lastAction }</strong>
            </p>
          ) }
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. CHECKBOX ITEMS
      ══════════════════════════════════════ */}
      <Section
        id="checkbox"
        title="Checkbox Items"
        description="Use MenubarCheckboxItem for toggleable view options. State is managed outside the component."
      >
        <ComponentPreview
          code={ `const [showRuler,   setShowRuler]   = useState(true);
const [showGrid,    setShowGrid]    = useState(false);
const [showSidebar, setShowSidebar] = useState(true);

<MenubarMenu>
  <MenubarTrigger>View</MenubarTrigger>
  <MenubarContent>
    <MenubarLabel>Show / Hide</MenubarLabel>
    <MenubarCheckboxItem checked={showRuler}   onCheckedChange={setShowRuler}>
      Ruler
    </MenubarCheckboxItem>
    <MenubarCheckboxItem checked={showGrid}    onCheckedChange={setShowGrid}>
      Grid
    </MenubarCheckboxItem>
    <MenubarCheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
      Sidebar
    </MenubarCheckboxItem>
  </MenubarContent>
</MenubarMenu>`}
        >
          <div className="flex flex-col gap-4">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>View</MenubarTrigger>
                <MenubarContent>
                  <MenubarLabel>Panels</MenubarLabel>
                  <MenubarCheckboxItem checked={ showRuler } onCheckedChange={ setShowRuler }>
                    <Grid className="h-4 w-4 text-muted-foreground" /> Ruler
                  </MenubarCheckboxItem>
                  <MenubarCheckboxItem checked={ showGrid } onCheckedChange={ setShowGrid }>
                    <Grid className="h-4 w-4 text-muted-foreground" /> Grid
                  </MenubarCheckboxItem>
                  <MenubarCheckboxItem checked={ showSidebar } onCheckedChange={ setShowSidebar }>
                    <SidebarOpen className="h-4 w-4 text-muted-foreground" /> Sidebar
                  </MenubarCheckboxItem>
                  <MenubarCheckboxItem checked={ showStatusBar } onCheckedChange={ setShowStatusBar }>
                    <AlignLeft className="h-4 w-4 text-muted-foreground" /> Status bar
                  </MenubarCheckboxItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>

            <div className="flex flex-wrap gap-2 text-xs">
              { [
                { label: "Ruler", value: showRuler },
                { label: "Grid", value: showGrid },
                { label: "Sidebar", value: showSidebar },
                { label: "Status bar", value: showStatusBar },
              ].map(item => (
                <Badge
                  key={ item.label }
                  variant={ item.value ? "default" : "outline" }
                  className="font-mono text-[10px]"
                >
                  { item.label }: { item.value ? "on" : "off" }
                </Badge>
              )) }
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          3. RADIO GROUP
      ══════════════════════════════════════ */}
      <Section
        id="radio"
        title="Radio Group"
        description="Use MenubarRadioGroup + MenubarRadioItem for mutually exclusive options like font family or zoom level."
      >
        <ComponentPreview
          code={ `const [fontFamily, setFontFamily] = useState("inter");
const [zoom,       setZoom]       = useState("100");

<MenubarMenu>
  <MenubarTrigger>Format</MenubarTrigger>
  <MenubarContent>
    <MenubarLabel>Font family</MenubarLabel>
    <MenubarRadioGroup value={fontFamily} onValueChange={setFontFamily}>
      <MenubarRadioItem value="inter">Inter</MenubarRadioItem>
      <MenubarRadioItem value="mono">Monospace</MenubarRadioItem>
      <MenubarRadioItem value="serif">Serif</MenubarRadioItem>
    </MenubarRadioGroup>
    <MenubarSeparator />
    <MenubarLabel>Zoom</MenubarLabel>
    <MenubarRadioGroup value={zoom} onValueChange={setZoom}>
      <MenubarRadioItem value="75">75%</MenubarRadioItem>
      <MenubarRadioItem value="100">100%</MenubarRadioItem>
      <MenubarRadioItem value="125">125%</MenubarRadioItem>
      <MenubarRadioItem value="150">150%</MenubarRadioItem>
    </MenubarRadioGroup>
  </MenubarContent>
</MenubarMenu>`}
        >
          <div className="flex flex-col gap-4">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Format</MenubarTrigger>
                <MenubarContent>
                  <MenubarLabel>Font family</MenubarLabel>
                  <MenubarRadioGroup value={ fontFamily } onValueChange={ setFontFamily }>
                    <MenubarRadioItem value="inter">Inter</MenubarRadioItem>
                    <MenubarRadioItem value="mono">Monospace</MenubarRadioItem>
                    <MenubarRadioItem value="serif">Georgia Serif</MenubarRadioItem>
                    <MenubarRadioItem value="display">Display</MenubarRadioItem>
                  </MenubarRadioGroup>
                  <MenubarSeparator />
                  <MenubarLabel>Zoom level</MenubarLabel>
                  <MenubarRadioGroup value={ zoom } onValueChange={ setZoom }>
                    { [ "75", "100", "125", "150", "200" ].map(z => (
                      <MenubarRadioItem key={ z } value={ z }>{ z }%</MenubarRadioItem>
                    )) }
                  </MenubarRadioGroup>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>

            <div className="flex gap-2 text-xs">
              <Badge variant="secondary" className="font-mono text-[10px]">
                font: { fontFamily }
              </Badge>
              <Badge variant="secondary" className="font-mono text-[10px]">
                zoom: { zoom }%
              </Badge>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          4. SUBMENUS
      ══════════════════════════════════════ */}
      <Section
        id="submenus"
        title="Submenus"
        description="Nest MenubarSub inside a MenubarContent for fly-out submenus. They open on hover."
      >
        <ComponentPreview
          code={ `<MenubarMenu>
  <MenubarTrigger>File</MenubarTrigger>
  <MenubarContent>
    <MenubarItem>New file</MenubarItem>
    <MenubarSub>
      <MenubarSubTrigger>Export as…</MenubarSubTrigger>
      <MenubarSubContent>
        <MenubarItem>PDF</MenubarItem>
        <MenubarItem>PNG</MenubarItem>
        <MenubarItem>SVG</MenubarItem>
      </MenubarSubContent>
    </MenubarSub>
    <MenubarSub>
      <MenubarSubTrigger>Share</MenubarSubTrigger>
      <MenubarSubContent>
        <MenubarItem>Copy link</MenubarItem>
        <MenubarItem>Send via email</MenubarItem>
      </MenubarSubContent>
    </MenubarSub>
  </MenubarContent>
</MenubarMenu>`}
        >
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={ () => act("New document") }>
                  <FilePlus className="h-4 w-4 text-muted-foreground" /> New document
                  <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onClick={ () => act("Open") }>
                  <FolderOpen className="h-4 w-4 text-muted-foreground" /> Open…
                  <MenubarShortcut>⌘O</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>
                    <Download className="h-4 w-4 text-muted-foreground mr-2" /> Export as…
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem onClick={ () => act("Export PDF") }>PDF document</MenubarItem>
                    <MenubarItem onClick={ () => act("Export PNG") }>PNG image</MenubarItem>
                    <MenubarItem onClick={ () => act("Export SVG") }>SVG vector</MenubarItem>
                    <MenubarItem onClick={ () => act("Export CSV") }>CSV spreadsheet</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={ () => act("Export HTML") }>HTML page</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSub>
                  <MenubarSubTrigger>
                    <Share2 className="h-4 w-4 text-muted-foreground mr-2" /> Share
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem onClick={ () => act("Copy link") }>Copy link</MenubarItem>
                    <MenubarItem onClick={ () => act("Email link") }>Send via email</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={ () => act("Publish") }>Publish publicly</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem onClick={ () => act("Print") } >
                  <Printer className="h-4 w-4 text-muted-foreground" /> Print
                  <MenubarShortcut>⌘P</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          { lastAction && (
            <p className="text-xs text-muted-foreground mt-3 font-mono">
              Last action: <strong className="text-foreground">{ lastAction }</strong>
            </p>
          ) }
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          5. FULL EDITOR MENUBAR
      ══════════════════════════════════════ */}
      <Section
        id="editor"
        title="Full Editor Example"
        description="A complete rich text editor menubar combining all features — file ops, format toggles, radio zoom, submenus, and keyboard shortcuts."
      >
        <ComponentPreview code={ `<Menubar>…</Menubar>` }>
          <div className="w-full space-y-3">
            <Menubar>
              {/* FILE */ }
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={ () => act("New") }>
                    <FilePlus className="h-4 w-4 text-muted-foreground" /> New
                    <MenubarShortcut>⌘N</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={ () => act("Open") }>
                    <FolderOpen className="h-4 w-4 text-muted-foreground" /> Open
                    <MenubarShortcut>⌘O</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={ () => act("Save") }>
                    <Save className="h-4 w-4 text-muted-foreground" /> Save
                    <MenubarShortcut>⌘S</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <Download className="h-4 w-4 text-muted-foreground mr-2" /> Export
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      { [ "PDF", "DOCX", "HTML", "Markdown" ].map(f => (
                        <MenubarItem key={ f } onClick={ () => act(`Export ${f}`) }>
                          { f }
                        </MenubarItem>
                      )) }
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator />
                  <MenubarItem variant="destructive" onClick={ () => act("Delete") }>
                    <Trash2 className="h-4 w-4" /> Delete document
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              {/* EDIT */ }
              <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={ () => act("Undo") }>
                    <Undo2 className="h-4 w-4 text-muted-foreground" /> Undo
                    <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={ () => act("Redo") }>
                    <Redo2 className="h-4 w-4 text-muted-foreground" /> Redo
                    <MenubarShortcut>⌘⇧Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={ () => act("Cut") }>
                    <Scissors className="h-4 w-4 text-muted-foreground" /> Cut
                    <MenubarShortcut>⌘X</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={ () => act("Copy") }>
                    <Copy className="h-4 w-4 text-muted-foreground" /> Copy
                    <MenubarShortcut>⌘C</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={ () => act("Paste") }>
                    <Clipboard className="h-4 w-4 text-muted-foreground" /> Paste
                    <MenubarShortcut>⌘V</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              {/* FORMAT */ }
              <MenubarMenu>
                <MenubarTrigger>Format</MenubarTrigger>
                <MenubarContent>
                  <MenubarLabel>Text style</MenubarLabel>
                  <MenubarItem onClick={ () => act("Bold") }>
                    <Bold className="h-4 w-4 text-muted-foreground" /> Bold
                    <MenubarShortcut>⌘B</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={ () => act("Italic") }>
                    <Italic className="h-4 w-4 text-muted-foreground" /> Italic
                    <MenubarShortcut>⌘I</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={ () => act("Underline") }>
                    <Underline className="h-4 w-4 text-muted-foreground" /> Underline
                    <MenubarShortcut>⌘U</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarLabel>Alignment</MenubarLabel>
                  <MenubarRadioGroup value="left" onValueChange={ v => act(`Align ${v}`) }>
                    <MenubarRadioItem value="left">
                      <AlignLeft className="h-4 w-4 text-muted-foreground" /> Left
                    </MenubarRadioItem>
                    <MenubarRadioItem value="center">
                      <AlignCenter className="h-4 w-4 text-muted-foreground" /> Center
                    </MenubarRadioItem>
                    <MenubarRadioItem value="right">
                      <AlignRight className="h-4 w-4 text-muted-foreground" /> Right
                    </MenubarRadioItem>
                  </MenubarRadioGroup>
                  <MenubarSeparator />
                  <MenubarLabel>Font</MenubarLabel>
                  <MenubarRadioGroup value={ fontFamily } onValueChange={ setFontFamily }>
                    <MenubarRadioItem value="inter">Inter</MenubarRadioItem>
                    <MenubarRadioItem value="mono">Monospace</MenubarRadioItem>
                    <MenubarRadioItem value="serif">Serif</MenubarRadioItem>
                  </MenubarRadioGroup>
                </MenubarContent>
              </MenubarMenu>

              {/* VIEW */ }
              <MenubarMenu>
                <MenubarTrigger>View</MenubarTrigger>
                <MenubarContent>
                  <MenubarLabel>Panels</MenubarLabel>
                  <MenubarCheckboxItem checked={ showRuler } onCheckedChange={ setShowRuler }>
                    Ruler
                  </MenubarCheckboxItem>
                  <MenubarCheckboxItem checked={ showGrid } onCheckedChange={ setShowGrid }>
                    Grid overlay
                  </MenubarCheckboxItem>
                  <MenubarCheckboxItem checked={ showSidebar } onCheckedChange={ setShowSidebar }>
                    Sidebar
                  </MenubarCheckboxItem>
                  <MenubarCheckboxItem checked={ showStatusBar } onCheckedChange={ setShowStatusBar }>
                    Status bar
                  </MenubarCheckboxItem>
                  <MenubarSeparator />
                  <MenubarLabel>Zoom</MenubarLabel>
                  <MenubarRadioGroup value={ zoom } onValueChange={ setZoom }>
                    { [ "75", "100", "125", "150" ].map(z => (
                      <MenubarRadioItem key={ z } value={ z }>{ z }%</MenubarRadioItem>
                    )) }
                  </MenubarRadioGroup>
                  <MenubarSeparator />
                  <MenubarItem onClick={ () => act("Fullscreen") }>
                    <Maximize className="h-4 w-4 text-muted-foreground" /> Fullscreen
                    <MenubarShortcut>F11</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              {/* SETTINGS */ }
              <MenubarMenu>
                <MenubarTrigger>Settings</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={ () => act("Preferences") }>
                    <Settings className="h-4 w-4 text-muted-foreground" /> Preferences
                    <MenubarShortcut>⌘,</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <Upload className="h-4 w-4 text-muted-foreground mr-2" /> Integrations
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={ () => act("GitHub") }>GitHub</MenubarItem>
                      <MenubarItem onClick={ () => act("Figma") }>Figma</MenubarItem>
                      <MenubarItem onClick={ () => act("Notion") }>Notion</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>

            {/* Status row */ }
            <div className="flex flex-wrap gap-2 text-[10px]">
              { [
                { k: "font", v: fontFamily },
                { k: "zoom", v: `${zoom}%` },
                { k: "ruler", v: showRuler ? "on" : "off" },
                { k: "grid", v: showGrid ? "on" : "off" },
              ].map(s => (
                <Badge key={ s.k } variant="secondary" className="font-mono text-[9px]">
                  { s.k }: { s.v }
                </Badge>
              )) }
              { lastAction && (
                <Badge variant="outline" className="font-mono text-[9px]">
                  last: { lastAction }
                </Badge>
              ) }
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          6. PROPS
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <p className="text-sm font-semibold mb-3">MenubarContent</p>
        <PropsTable props={ [
          { name: "align", type: '"start" | "center" | "end"', default: '"start"', description: "Horizontal alignment of the dropdown relative to the trigger." },
          { name: "sideOffset", type: "number", default: "6", description: "Gap in px between the trigger and the dropdown." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">MenubarItem</p>
        <PropsTable props={ [
          { name: "variant", type: '"default" | "destructive"', default: '"default"', description: "Destructive variant renders red text." },
          { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction and dims the item." },
          { name: "inset", type: "boolean", default: "false", description: "Add left padding to align with checked items." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">MenubarCheckboxItem</p>
        <PropsTable props={ [
          { name: "checked", type: "boolean", default: "false", description: "Whether the item is checked." },
          { name: "onCheckedChange", type: "(checked: boolean) => void", default: "—", description: "Called when the checked state changes." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">MenubarRadioGroup</p>
        <PropsTable props={ [
          { name: "value", type: "string", default: "—", description: "Currently selected value." },
          { name: "onValueChange", type: "(value: string) => void", default: "—", description: "Called when selection changes." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">MenubarRadioItem</p>
        <PropsTable props={ [
          { name: "value", type: "string", default: "—", description: "Value this item represents in the radio group." },
        ] } />
      </Section>

    </DocsContent>
  );
}
