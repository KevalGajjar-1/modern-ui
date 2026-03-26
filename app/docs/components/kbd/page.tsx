"use client";

import React from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import { Kbd, KbdShortcut, Keys } from "@/components/ui/kbd";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function KbdPage() {
  return (
    <DocsContent
      title="Kbd"
      description="Renders a keyboard key or shortcut combination using the semantic <kbd> HTML element. Supports four variants, four sizes, and a KbdShortcut helper for key combinations."
      importPath='import { Kbd, KbdShortcut, Keys } from "@/components/ui/kbd";'
    >

      {/* ══════════════════════════════════════
          1. BASIC
      ══════════════════════════════════════ */}
      <Section
        id="basic"
        title="Basic"
        description="Use Kbd to display a single keyboard key. It renders a native <kbd> element for correct semantics."
      >
        <ComponentPreview
          code={`<Kbd>⌘</Kbd>
<Kbd>Ctrl</Kbd>
<Kbd>Shift</Kbd>
<Kbd>Esc</Kbd>
<Kbd>Tab</Kbd>
<Kbd>↵</Kbd>`}
        >
          <div className="flex flex-wrap items-center gap-2">
            {["⌘", "Ctrl", "⇧", "⌥", "Esc", "Tab", "↵", "⌫", "Space", "F1"].map(k => (
              <Kbd key={k}>{k}</Kbd>
            ))}
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. VARIANTS
      ══════════════════════════════════════ */}
      <Section
        id="variants"
        title="Variants"
        description="Four visual styles from subtle to prominent. Mix and match with your UI density."
      >
        <ComponentPreview
          code={`<Kbd variant="default">⌘</Kbd>
<Kbd variant="outline">⌘</Kbd>
<Kbd variant="flat">⌘</Kbd>
<Kbd variant="elevated">⌘</Kbd>`}
        >
          <div className="flex flex-col gap-6">
            {(["default", "outline", "flat", "elevated"] as const).map(v => (
              <div key={v} className="flex items-center gap-4">
                <span className="w-20 text-xs text-muted-foreground font-mono capitalize shrink-0">
                  {v}
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {["⌘", "Ctrl", "⇧", "⌥", "Esc", "Tab", "↵", "K"].map(k => (
                    <Kbd key={k} variant={v}>{k}</Kbd>
                  ))}
                </div>
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
        description="Four sizes to match surrounding text density — xs for dense tooltips, lg for prominent shortcut guides."
      >
        <ComponentPreview
          code={`<Kbd size="xs">⌘</Kbd>
<Kbd size="sm">⌘</Kbd>
<Kbd size="md">⌘</Kbd>
<Kbd size="lg">⌘</Kbd>`}
        >
          <div className="flex flex-col gap-5">
            {(["xs", "sm", "md", "lg"] as const).map(s => (
              <div key={s} className="flex items-center gap-4">
                <span className="w-8 text-xs text-muted-foreground font-mono uppercase shrink-0">{s}</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {["⌘", "⇧", "⌥", "Ctrl", "Esc", "Tab", "K"].map(k => (
                    <Kbd key={k} size={s}>{k}</Kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          4. KEY COMBINATIONS
      ══════════════════════════════════════ */}
      <Section
        id="combinations"
        title="Key Combinations"
        description="Use KbdShortcut to render multi-key combinations. The keys prop accepts an ordered array of key strings."
      >
        <ComponentPreview
          code={`import { KbdShortcut, Keys } from "@/components/ui/kbd";

{/* Using the Keys constant for symbols */}
<KbdShortcut keys={[Keys.Command, "K"]} />
<KbdShortcut keys={[Keys.Command, Keys.Shift, "P"]} />
<KbdShortcut keys={["Ctrl", "Z"]} />

{/* Custom separator */}
<KbdShortcut keys={[Keys.Command, "K"]} separator=" " />
<KbdShortcut keys={[Keys.Command, "K"]} separator={null} />`}
        >
          <div className="flex flex-col gap-5">
            {/* Default + separator */}
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground font-medium">Default separator "+"</p>
              <div className="flex flex-wrap items-center gap-4">
                <KbdShortcut keys={["⌘", "K"]} />
                <KbdShortcut keys={["⌘", "⇧", "P"]} />
                <KbdShortcut keys={["Ctrl", "Z"]} />
                <KbdShortcut keys={["Ctrl", "⇧", "Z"]} />
                <KbdShortcut keys={["⌥", "⇧", "F"]} />
                <KbdShortcut keys={["⌘", "⌥", "I"]} />
              </div>
            </div>

            {/* Space separator */}
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground font-medium">Space separator</p>
              <div className="flex flex-wrap items-center gap-4">
                <KbdShortcut keys={["⌘", "K"]} separator=" " />
                <KbdShortcut keys={["⌘", "⇧", "P"]} separator=" " />
                <KbdShortcut keys={["Ctrl", "Alt", "Del"]} separator=" " />
              </div>
            </div>

            {/* No separator (adjacent) */}
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground font-medium">No separator (adjacent keys)</p>
              <div className="flex flex-wrap items-center gap-4">
                <KbdShortcut keys={["⌘", "K"]}      separator={null} />
                <KbdShortcut keys={["⌘", "⇧", "P"]} separator={null} />
              </div>
            </div>

            {/* With variants */}
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground font-medium">With variants</p>
              <div className="flex flex-wrap items-center gap-4">
                <KbdShortcut keys={["⌘", "K"]} variant="outline"  />
                <KbdShortcut keys={["⌘", "K"]} variant="flat"     />
                <KbdShortcut keys={["⌘", "K"]} variant="elevated" />
              </div>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          5. INLINE IN PROSE
      ══════════════════════════════════════ */}
      <Section
        id="inline"
        title="Inline in Text"
        description="Kbd naturally flows within prose, labels, and tooltips without disrupting baseline alignment."
      >
        <ComponentPreview
          code={`<p>
  Press <Kbd size="sm">⌘</Kbd> <Kbd size="sm">K</Kbd> to open the
  command palette, or <Kbd size="sm">Esc</Kbd> to dismiss it.
</p>`}
        >
          <div className="space-y-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            <p>
              Press <Kbd size="sm" variant="elevated">⌘</Kbd>{" "}
              <Kbd size="sm" variant="elevated">K</Kbd> to open the command palette,
              or <Kbd size="sm" variant="elevated">Esc</Kbd> to dismiss it.
            </p>
            <p>
              Use <Kbd size="sm">Tab</Kbd> to move between fields and{" "}
              <KbdShortcut keys={["⇧", "Tab"]} size="sm" /> to go backwards.
            </p>
            <p>
              Hit <KbdShortcut keys={["Ctrl", "Z"]} size="sm" /> to undo or{" "}
              <KbdShortcut keys={["Ctrl", "⇧", "Z"]} size="sm" /> to redo your last action.
            </p>
            <p>
              Save your work at any time with{" "}
              <KbdShortcut keys={["⌘", "S"]} size="sm" variant="elevated" />.
            </p>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          6. SEARCH INPUT PATTERN
      ══════════════════════════════════════ */}
      <Section
        id="search"
        title="Search Input Pattern"
        description="A common pattern: show the keyboard shortcut inside a search bar to hint users about the quick-open hotkey."
      >
        <ComponentPreview
          code={`<div className="relative w-full max-w-sm">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <Input placeholder="Search..." className="pl-9 pr-16" />
  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
    <KbdShortcut keys={["⌘", "K"]} size="xs" />
  </div>
</div>`}
        >
          <div className="flex flex-col gap-4 w-full max-w-sm">
            {/* Standard ⌘K hint */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9 pr-20" readOnly />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <KbdShortcut keys={["⌘", "K"]} size="xs" variant="flat" />
              </div>
            </div>

            {/* Ctrl+/ variant */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Quick open..." className="pl-9 pr-20" readOnly />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <KbdShortcut keys={["Ctrl", "/"]} size="xs" variant="flat" />
              </div>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          7. SHORTCUTS REFERENCE TABLE
      ══════════════════════════════════════ */}
      <Section
        id="shortcuts-table"
        title="Shortcuts Reference Table"
        description="A real-world pattern: keyboard shortcuts reference rendered with Kbd and KbdShortcut inside a table."
      >
        <ComponentPreview
          code={`const shortcuts = [
  { action: "Open command palette", keys: ["⌘", "K"] },
  { action: "Save file",            keys: ["⌘", "S"] },
  { action: "Search",               keys: ["⌘", "F"] },
  // ...
];

<table>
  {shortcuts.map(s => (
    <tr key={s.action}>
      <td>{s.action}</td>
      <td><KbdShortcut keys={s.keys} size="sm" variant="elevated" /></td>
    </tr>
  ))}
</table>`}
        >
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="text-left py-2.5 px-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Action</th>
                  <th className="text-left py-2.5 px-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Mac</th>
                  <th className="text-left py-2.5 px-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Windows</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {[
                  { action: "Open command palette", mac: ["⌘", "K"],       win: ["Ctrl", "K"] },
                  { action: "Save file",            mac: ["⌘", "S"],       win: ["Ctrl", "S"] },
                  { action: "Find & replace",       mac: ["⌘", "H"],       win: ["Ctrl", "H"] },
                  { action: "Undo",                 mac: ["⌘", "Z"],       win: ["Ctrl", "Z"] },
                  { action: "Redo",                 mac: ["⌘", "⇧", "Z"], win: ["Ctrl", "Y"] },
                  { action: "Select all",           mac: ["⌘", "A"],       win: ["Ctrl", "A"] },
                  { action: "New file",             mac: ["⌘", "N"],       win: ["Ctrl", "N"] },
                  { action: "Close tab",            mac: ["⌘", "W"],       win: ["Ctrl", "W"] },
                ].map(row => (
                  <tr key={row.action} className="hover:bg-muted/30 transition-colors">
                    <td className="py-2.5 px-4 text-foreground">{row.action}</td>
                    <td className="py-2.5 px-4">
                      <KbdShortcut keys={row.mac} size="sm" variant="elevated" />
                    </td>
                    <td className="py-2.5 px-4">
                      <KbdShortcut keys={row.win} size="sm" variant="default" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          8. PROPS TABLE
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <p className="text-sm font-semibold mb-3">Kbd</p>
        <PropsTable
          props={[
            { name: "variant",   type: '"default" | "outline" | "flat" | "elevated"', default: '"default"', description: "Visual style of the key cap." },
            { name: "size",      type: '"xs" | "sm" | "md" | "lg"',                   default: '"md"',      description: "Size of the key cap." },
            { name: "className", type: "string",                                        default: "—",         description: "Additional Tailwind classes to merge." },
            { name: "children",  type: "React.ReactNode",                               default: "—",         description: "The key label or symbol to display.", required: true },
          ]}
        />

        <p className="text-sm font-semibold mb-3 mt-8">KbdShortcut</p>
        <PropsTable
          props={[
            { name: "keys",      type: "string[]",                                       default: "—",    description: "Ordered array of key label strings to render.", required: true },
            { name: "separator", type: "React.ReactNode",                                default: '"+"',  description: 'Separator rendered between keys. Pass null for no separator.' },
            { name: "variant",   type: '"default" | "outline" | "flat" | "elevated"',   default: '"default"', description: "Applied to every Kbd in the combination." },
            { name: "size",      type: '"xs" | "sm" | "md" | "lg"',                     default: '"md"',      description: "Applied to every Kbd in the combination." },
            { name: "className", type: "string",                                          default: "—",         description: "Applied to the wrapping span." },
          ]}
        />
      </Section>

    </DocsContent>
  );
}
