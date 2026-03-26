"use client";

import React, { useState } from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import {
  Command, CommandInput, CommandList, CommandGroup,
  CommandItem, CommandEmpty, CommandSeparator, CommandShortcut,
  CommandDialog,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard, FileText, Settings, Users,
  BarChart3, Search, Plus, Trash2, Copy,
  Globe, Palette, Code2,
  Terminal, Zap, Star, CreditCard, Bell,
  LogOut, Moon, Sun, HelpCircle, Keyboard,
  FolderOpen, FilePlus, ArrowRight,
  Calculator, Calendar, Mail,
} from "lucide-react";

// ─── Demo: selected value badge ───────────────────────────
function Selected({ value }: { value: string | null }) {
  if (!value) return null;
  return (
    <p className="text-xs font-mono text-muted-foreground mt-3">
      Selected: <strong className="text-foreground">{ value }</strong>
    </p>
  );
}

export default function CommandPage() {
  const [ selected, setSelected ] = useState<string | null>(null);
  const [ dialogOpen, setDialogOpen ] = useState(false);
  const [ theme, setTheme ] = useState<"light" | "dark">("light");

  return (
    <DocsContent
      title="Command"
      description="A command palette / combobox with fuzzy filtering, keyboard navigation (↑↓ Enter), and an optional modal dialog mode triggered by ⌘K. Zero dependencies — pure React."
      importPath='import { Command, CommandInput, CommandList, CommandGroup, CommandItem, CommandEmpty, CommandSeparator, CommandShortcut, CommandDialog } from "@/components/ui/command";'
    >

      {/* ══════════════════════════════════════
          1. BASIC
      ══════════════════════════════════════ */}
      <Section
        id="basic"
        title="Basic"
        description="Type in the search box to filter items. Use ↑↓ to navigate and Enter to select."
      >
        <ComponentPreview
          code={ `import {
  Command, CommandInput, CommandList,
  CommandGroup, CommandItem, CommandEmpty,
} from "@/components/ui/command";

<Command className="max-w-sm">
  <CommandInput placeholder="Search…" />
  <CommandList>
    <CommandEmpty />
    <CommandGroup heading="Pages">
      <CommandItem value="dashboard" onSelect={setSelected}>
        <LayoutDashboard /> Dashboard
      </CommandItem>
      <CommandItem value="documents" onSelect={setSelected}>
        <FileText /> Documents
      </CommandItem>
      <CommandItem value="settings" onSelect={setSelected}>
        <Settings /> Settings
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
        >
          <div className="w-full max-w-sm">
            <Command>
              <CommandInput placeholder="Search pages…" />
              <CommandList>
                <CommandEmpty />
                <CommandGroup heading="Pages">
                  <CommandItem value="dashboard" onSelect={ setSelected }>
                    <LayoutDashboard className="h-4 w-4 text-muted-foreground" /> Dashboard
                  </CommandItem>
                  <CommandItem value="analytics" onSelect={ setSelected }>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" /> Analytics
                  </CommandItem>
                  <CommandItem value="documents" onSelect={ setSelected }>
                    <FileText className="h-4 w-4 text-muted-foreground" /> Documents
                  </CommandItem>
                  <CommandItem value="team" onSelect={ setSelected }>
                    <Users className="h-4 w-4 text-muted-foreground" /> Team
                  </CommandItem>
                  <CommandItem value="settings" onSelect={ setSelected }>
                    <Settings className="h-4 w-4 text-muted-foreground" /> Settings
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
            <Selected value={ selected } />
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. GROUPED WITH SHORTCUTS
      ══════════════════════════════════════ */}
      <Section
        id="grouped"
        title="Groups & Shortcuts"
        description="Use CommandGroup for labelled sections and CommandShortcut to display keyboard hints at the end of an item."
      >
        <ComponentPreview
          code={ `<Command>
  <CommandInput />
  <CommandList>
    <CommandEmpty />
    <CommandGroup heading="Actions">
      <CommandItem value="new-file">
        <FilePlus /> New file <CommandShortcut>⌘N</CommandShortcut>
      </CommandItem>
      <CommandItem value="open">
        <FolderOpen /> Open <CommandShortcut>⌘O</CommandShortcut>
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Navigation">
      <CommandItem value="dashboard">
        <LayoutDashboard /> Dashboard <CommandShortcut>G D</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
        >
          <div className="w-full max-w-sm">
            <Command>
              <CommandInput placeholder="Type a command…" />
              <CommandList>
                <CommandEmpty />
                <CommandGroup heading="Actions">
                  <CommandItem value="new file" onSelect={ setSelected }>
                    <FilePlus className="h-4 w-4 text-muted-foreground" /> New file
                    <CommandShortcut>⌘N</CommandShortcut>
                  </CommandItem>
                  <CommandItem value="open file" onSelect={ setSelected }>
                    <FolderOpen className="h-4 w-4 text-muted-foreground" /> Open
                    <CommandShortcut>⌘O</CommandShortcut>
                  </CommandItem>
                  <CommandItem value="copy" onSelect={ setSelected }>
                    <Copy className="h-4 w-4 text-muted-foreground" /> Copy
                    <CommandShortcut>⌘C</CommandShortcut>
                  </CommandItem>
                  <CommandItem value="delete" onSelect={ setSelected } disabled>
                    <Trash2 className="h-4 w-4 text-muted-foreground" /> Delete (disabled)
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Navigation">
                  <CommandItem value="dashboard" onSelect={ setSelected }>
                    <LayoutDashboard className="h-4 w-4 text-muted-foreground" /> Dashboard
                    <CommandShortcut>G D</CommandShortcut>
                  </CommandItem>
                  <CommandItem value="settings" onSelect={ setSelected }>
                    <Settings className="h-4 w-4 text-muted-foreground" /> Settings
                    <CommandShortcut>G S</CommandShortcut>
                  </CommandItem>
                  <CommandItem value="billing" onSelect={ setSelected }>
                    <CreditCard className="h-4 w-4 text-muted-foreground" /> Billing
                    <CommandShortcut>G B</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
              </CommandList>
            </Command>
            <Selected value={ selected } />
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          3. COMMAND DIALOG (⌘K palette)
      ══════════════════════════════════════ */}
      <Section
        id="dialog"
        title="Command Dialog (⌘K)"
        description="CommandDialog wraps Command in a full-screen modal. Press ⌘K (or Ctrl+K on Windows/Linux) or click the button below to open it."
      >
        <ComponentPreview
          code={ `const [open, setOpen] = useState(false);

// Press ⌘K anywhere on the page to toggle
<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Type a command or search…" />
  <CommandList>
    <CommandEmpty />
    <CommandGroup heading="Suggestions">
      <CommandItem value="calculator">
        <Calculator /> Calculator
      </CommandItem>
      <CommandItem value="calendar">
        <Calendar /> Calendar
      </CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={ () => setDialogOpen(true) }
                className="gap-2"
              >
                <Search className="h-4 w-4" />
                Open command palette
                <kbd className="ml-1 text-[10px] font-mono bg-muted border border-border rounded px-1.5 py-0.5">
                  ⌘K
                </kbd>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Or press{ " " }
              <kbd className="text-[10px] font-mono bg-muted border border-border rounded px-1.5 py-0.5">⌘K</kbd>
              { " " }anywhere on this page.
            </p>

            <CommandDialog
              open={ dialogOpen }
              onOpenChange={ setDialogOpen }
              placeholder="Type a command or search…"
            >
              <CommandInput />
              <CommandList>
                <CommandEmpty />
                <CommandGroup heading="Suggestions">
                  <CommandItem value="calculator" onSelect={ v => { setSelected(v); setDialogOpen(false); } }>
                    <Calculator className="h-4 w-4 text-muted-foreground" /> Calculator
                  </CommandItem>
                  <CommandItem value="calendar" onSelect={ v => { setSelected(v); setDialogOpen(false); } }>
                    <Calendar className="h-4 w-4 text-muted-foreground" /> Calendar
                  </CommandItem>
                  <CommandItem value="email" onSelect={ v => { setSelected(v); setDialogOpen(false); } }>
                    <Mail className="h-4 w-4 text-muted-foreground" /> Email
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Pages">
                  <CommandItem value="dashboard" onSelect={ v => { setSelected(v); setDialogOpen(false); } }>
                    <LayoutDashboard className="h-4 w-4 text-muted-foreground" /> Dashboard
                    <CommandShortcut>G D</CommandShortcut>
                  </CommandItem>
                  <CommandItem value="analytics" onSelect={ v => { setSelected(v); setDialogOpen(false); } }>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" /> Analytics
                    <CommandShortcut>G A</CommandShortcut>
                  </CommandItem>
                  <CommandItem value="settings" onSelect={ v => { setSelected(v); setDialogOpen(false); } }>
                    <Settings className="h-4 w-4 text-muted-foreground" /> Settings
                    <CommandShortcut>G S</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Theme">
                  <CommandItem
                    value="light mode"
                    onSelect={ () => { setTheme("light"); setDialogOpen(false); } }
                  >
                    <Sun className="h-4 w-4 text-muted-foreground" /> Light mode
                    { theme === "light" && <Badge variant="secondary" className="ml-auto text-[9px]">active</Badge> }
                  </CommandItem>
                  <CommandItem
                    value="dark mode"
                    onSelect={ () => { setTheme("dark"); setDialogOpen(false); } }
                  >
                    <Moon className="h-4 w-4 text-muted-foreground" /> Dark mode
                    { theme === "dark" && <Badge variant="secondary" className="ml-auto text-[9px]">active</Badge> }
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Account">
                  <CommandItem value="profile" onSelect={ v => { setSelected(v); setDialogOpen(false); } }>
                    <Users className="h-4 w-4 text-muted-foreground" /> Profile
                  </CommandItem>
                  <CommandItem value="billing" onSelect={ v => { setSelected(v); setDialogOpen(false); } }>
                    <CreditCard className="h-4 w-4 text-muted-foreground" /> Billing
                  </CommandItem>
                  <CommandItem value="sign out" onSelect={ v => { setSelected(v); setDialogOpen(false); } }>
                    <LogOut className="h-4 w-4 text-muted-foreground" /> Sign out
                  </CommandItem>
                </CommandGroup>
              </CommandList>
              {/* Footer hint */ }
              <div className="flex items-center justify-between border-t border-border/60 px-4 py-2.5">
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground/60">
                  <span className="flex items-center gap-1">
                    <kbd className="font-mono bg-muted border border-border rounded px-1 py-0.5">↑↓</kbd> navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="font-mono bg-muted border border-border rounded px-1 py-0.5">↵</kbd> select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="font-mono bg-muted border border-border rounded px-1 py-0.5">esc</kbd> close
                  </span>
                </div>
                <Badge variant="outline" className="text-[9px] font-mono">⌘K</Badge>
              </div>
            </CommandDialog>

            <Selected value={ selected } />
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          4. LOADING STATE
      ══════════════════════════════════════ */}
      <Section
        id="loading"
        title="Loading State"
        description="Pass loading={true} to show a spinner in the search box — useful while fetching async results."
      >
        <ComponentPreview
          code={ `const [loading, setLoading] = useState(false);

<Command loading={loading}>
  <CommandInput />
  <CommandList>
    {loading
      ? <CommandEmpty>Searching…</CommandEmpty>
      : <>{…results…}</>
    }
  </CommandList>
</Command>`}
        >
          <div className="w-full max-w-sm">
            <Command loading>
              <CommandInput placeholder="Searching the docs…" />
              <CommandList>
                <CommandEmpty>
                  <div className="flex flex-col items-center gap-2 py-8">
                    <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    <p className="text-xs text-muted-foreground">Fetching results…</p>
                  </div>
                </CommandEmpty>
              </CommandList>
            </Command>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          5. CUSTOM FILTER
      ══════════════════════════════════════ */}
      <Section
        id="custom-filter"
        title="Custom Filter"
        description="Pass a filter function to override the default substring match. This example ranks by prefix match."
      >
        <ComponentPreview
          code={ `// Prioritise prefix matches
const prefixFirst = (value: string, search: string) =>
  value.toLowerCase().startsWith(search.toLowerCase()) ||
  value.toLowerCase().includes(search.toLowerCase());

<Command filter={prefixFirst}>
  …
</Command>`}
        >
          <div className="w-full max-w-sm">
            <Command
              filter={ (value, search) =>
                value.toLowerCase().includes(search.toLowerCase())
              }
            >
              <CommandInput placeholder="Filter by component name…" />
              <CommandList>
                <CommandEmpty />
                <CommandGroup heading="Components">
                  { [
                    { v: "button", icon: Zap },
                    { v: "badge", icon: Star },
                    { v: "command", icon: Terminal },
                    { v: "context menu", icon: Globe },
                    { v: "dialog", icon: Code2 },
                    { v: "dropdown menu", icon: Settings },
                    { v: "hover card", icon: HelpCircle },
                    { v: "input otp", icon: Keyboard },
                    { v: "navigation menu", icon: LayoutDashboard },
                    { v: "popover", icon: Bell },
                    { v: "select", icon: Palette },
                    { v: "tooltip", icon: Search },
                  ].map(({ v, icon: Icon }) => (
                    <CommandItem key={ v } value={ v } onSelect={ setSelected }
                      className="capitalize">
                      <Icon className="h-4 w-4 text-muted-foreground" /> { v }
                    </CommandItem>
                  )) }
                </CommandGroup>
              </CommandList>
            </Command>
            <Selected value={ selected } />
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          6. PROPS
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <p className="text-sm font-semibold mb-3">Command</p>
        <PropsTable props={ [
          { name: "value", type: "string", default: "—", description: "Controlled search value." },
          { name: "onValueChange", type: "(value: string) => void", default: "—", description: "Called when the search value changes." },
          { name: "filter", type: "(value: string, search: string) => boolean", default: "substring match", description: "Custom filter function. Return true to show an item." },
          { name: "shouldFilter", type: "boolean", default: "true", description: "Set false to disable client-side filtering (e.g. server search)." },
          { name: "loading", type: "boolean", default: "false", description: "Show spinner in search input." },
          { name: "placeholder", type: "string", default: '"Type a command…"', description: "Placeholder text for the search input." },
          { name: "label", type: "string", default: '"Command menu"', description: "aria-label for the combobox container." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">CommandItem</p>
        <PropsTable props={ [
          { name: "value", type: "string", default: "—", description: "Text used for filtering. Falls back to children text if omitted." },
          { name: "onSelect", type: "(value: string) => void", default: "—", description: "Called when the item is clicked or activated via keyboard." },
          { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction and dims the item." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">CommandDialog</p>
        <PropsTable props={ [
          { name: "open", type: "boolean", default: "—", description: "Controlled open state." },
          { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "Called when open state changes." },
          { name: "triggerKeys", type: "string[]", default: '["k"]', description: "Keys that, combined with ⌘/Ctrl, toggle the dialog." },
        ] } />
      </Section>
    </DocsContent>
  );
}
