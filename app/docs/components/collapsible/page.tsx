"use client";

import React, { useState } from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import {
  Collapsible, CollapsibleTrigger, CollapsibleContent,
  useCollapsible,                            // ← clean context hook
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ChevronDown, Settings, Bell, Shield, Palette,
  CreditCard, User, Code2, Terminal, FileText,
  Plus, Minus, HelpCircle, ChevronRight,
} from "lucide-react";

// ─── Custom trigger icons ────────────────────────────────
// Both consume useCollapsible() — no DOM hacks needed

function PlusMinusIcon() {
  const { open } = useCollapsible();
  return (
    <span className="transition-transform duration-200">
      { open
        ? <Minus className="h-4 w-4 text-muted-foreground" />
        : <Plus className="h-4 w-4 text-muted-foreground" /> }
    </span>
  );
}

function ArrowChevron() {
  const { open } = useCollapsible();
  return (
    <ChevronRight className={ cn(
      "h-4 w-4 text-muted-foreground transition-transform duration-200",
      open && "rotate-90"
    ) } />
  );
}

// ─── Page ─────────────────────────────────────────────────
export default function CollapsiblePage() {
  const [ open1, setOpen1 ] = useState(false);
  const [ openSections, setOpenSections ] = useState<string[]>([ "appearance" ]);

  const toggleSection = (id: string) =>
    setOpenSections(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [ ...prev, id ]
    );

  return (
    <DocsContent
      title="Collapsible"
      description="An animated show/hide container. Toggles content visibility with a smooth height transition. Zero dependencies — built entirely on React state and CSS transitions."
      importPath='import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";'
    >

      {/* 1. BASIC */ }
      <Section id="basic" title="Basic"
        description="A trigger button that reveals content below it with an animated height transition.">
        <ComponentPreview code={ `<Collapsible>
  <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
  <CollapsibleContent>
    <p className="px-3 pb-3 text-sm text-muted-foreground">
      Yes! Zero external dependencies — just React and Tailwind CSS.
    </p>
  </CollapsibleContent>
</Collapsible>`}>
          <div className="w-full max-w-md">
            <Collapsible>
              <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
              <CollapsibleContent>
                <p className="px-3 pb-3 text-sm text-muted-foreground leading-relaxed">
                  Yes! This component is built with zero external dependencies —
                  just React and Tailwind CSS. Copy it directly into your project.
                </p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </ComponentPreview>
      </Section>

      {/* 2. VARIANTS */ }
      <Section id="variants" title="Variants"
        description="Five visual styles covering every layout context from bare ghost to elevated card.">
        <ComponentPreview code={ `{(["default","outline","ghost","card","flush"] as const).map(v => (
  <Collapsible key={v} variant={v}>
    <CollapsibleTrigger>{v}</CollapsibleTrigger>
    <CollapsibleContent>…</CollapsibleContent>
  </Collapsible>
))}`}>
          <div className="w-full max-w-md space-y-3">
            { ([ "default", "outline", "ghost", "card", "flush" ] as const).map(v => (
              <Collapsible key={ v } variant={ v }>
                <CollapsibleTrigger>
                  <span className="font-medium capitalize">{ v }</span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <p className={ cn(
                    "text-sm text-muted-foreground leading-relaxed",
                    v === "card" && "px-5 pb-4",
                    v === "outline" && "px-4 pb-3",
                    v === "flush" && "pb-3",
                    (v === "default" || v === "ghost") && "px-3 pb-3",
                  ) }>
                    This is the <strong>{ v }</strong> variant.
                  </p>
                </CollapsibleContent>
              </Collapsible>
            )) }
          </div>
        </ComponentPreview>
      </Section>

      {/* 3. CONTROLLED */ }
      <Section id="controlled" title="Controlled"
        description="Manage open state externally via the open + onOpenChange props.">
        <ComponentPreview code={ `const [open, setOpen] = useState(false);

<Collapsible open={open} onOpenChange={setOpen} variant="outline">
  <CollapsibleTrigger>{open ? "Hide" : "Show"} details</CollapsibleTrigger>
  <CollapsibleContent>…</CollapsibleContent>
</Collapsible>

<Button onClick={() => setOpen(o => !o)}>Toggle externally</Button>`}>
          <div className="w-full max-w-md space-y-4">
            <Collapsible open={ open1 } onOpenChange={ setOpen1 } variant="outline">
              <CollapsibleTrigger>
                { open1 ? "Hide" : "Show" } details
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-4 pb-4 pt-2 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Controlled via external state.
                  </p>
                  <Badge variant="secondary" className="font-mono text-xs">
                    open: { String(open1) }
                  </Badge>
                </div>
              </CollapsibleContent>
            </Collapsible>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={ () => setOpen1(true) }>Open</Button>
              <Button size="sm" variant="outline" onClick={ () => setOpen1(false) }>Close</Button>
              <Button size="sm" variant="outline" onClick={ () => setOpen1(o => !o) }>Toggle</Button>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* 4. DEFAULT OPEN */ }
      <Section id="default-open" title="Default Open"
        description="Use defaultOpen to start expanded without controlling state.">
        <ComponentPreview code={ `<Collapsible defaultOpen variant="card">
  <CollapsibleTrigger>Notifications</CollapsibleTrigger>
  <CollapsibleContent>…</CollapsibleContent>
</Collapsible>`}>
          <div className="w-full max-w-md">
            <Collapsible defaultOpen variant="card">
              <CollapsibleTrigger>
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <span>Notifications</span>
                  <Badge className="ml-1 bg-violet-100 text-violet-700 border-0 text-[10px]">
                    3 new
                  </Badge>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-5 pb-4 space-y-2">
                  { [
                    { text: "Your file was uploaded", time: "2m ago", dot: "bg-emerald-500" },
                    { text: "Alex commented on your doc", time: "14m ago", dot: "bg-blue-500" },
                    { text: "Deployment completed", time: "1h ago", dot: "bg-violet-500" },
                  ].map((n, i) => (
                    <div key={ i } className="flex items-start gap-3 py-2">
                      <span className={ cn("w-2 h-2 rounded-full mt-1.5 shrink-0", n.dot) } />
                      <div>
                        <p className="text-sm">{ n.text }</p>
                        <p className="text-xs text-muted-foreground">{ n.time }</p>
                      </div>
                    </div>
                  )) }
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </ComponentPreview>
      </Section>

      {/* 5. DISABLED */ }
      <Section id="disabled" title="Disabled"
        description="Set disabled to prevent toggling.">
        <ComponentPreview code={ `<Collapsible disabled variant="outline">
  <CollapsibleTrigger>Locked section</CollapsibleTrigger>
  <CollapsibleContent>…</CollapsibleContent>
</Collapsible>`}>
          <div className="w-full max-w-md">
            <Collapsible disabled variant="outline">
              <CollapsibleTrigger>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span>Locked section (disabled)</span>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="px-4 pb-3 text-sm text-muted-foreground">
                  This content is locked.
                </p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </ComponentPreview>
      </Section>

      {/* 6. CUSTOM TRIGGER */ }
      <Section id="custom-trigger" title="Custom Trigger"
        description="Pass showChevron={false} and use useCollapsible() inside the trigger children for full control.">
        <ComponentPreview code={ `// Custom icon component — reads open state via useCollapsible()
function PlusMinusIcon() {
  const { open } = useCollapsible();
  return open
    ? <Minus className="h-4 w-4" />
    : <Plus  className="h-4 w-4" />;
}

<Collapsible variant="card">
  <CollapsibleTrigger showChevron={false}>
    <span>Advanced settings</span>
    <PlusMinusIcon />
  </CollapsibleTrigger>
  <CollapsibleContent>…</CollapsibleContent>
</Collapsible>`}>
          <div className="w-full max-w-md space-y-3">
            <Collapsible variant="card">
              <CollapsibleTrigger showChevron={ false }>
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-muted-foreground" />
                  <span>Advanced settings</span>
                </div>
                <PlusMinusIcon />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-5 pb-4 pt-1 space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Override build settings for this deployment only.
                  </p>
                  <code className="block text-xs bg-muted/60 px-3 py-2 rounded-lg font-mono">
                    NODE_ENV=production
                  </code>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible variant="ghost">
              <CollapsibleTrigger showChevron={ false }>
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">CLI output</span>
                </div>
                <ArrowChevron />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <pre className="mx-2 mb-2 text-xs bg-zinc-950 text-emerald-400 rounded-xl p-3 font-mono overflow-x-auto">
                  { `$ npm run build
✓ Compiled successfully
✓ Linting passed
✓ Type check passed
✓ Bundle: 142 kB`}
                </pre>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </ComponentPreview>
      </Section>

      {/* 7. SETTINGS PANEL */ }
      <Section id="settings-panel" title="Settings Panel"
        description="Multi-section settings sidebar with independent open states.">
        <ComponentPreview code={ `const [openSections, setOpenSections] = useState(["appearance"]);

{sections.map(s => (
  <Collapsible
    key={s.id}
    variant="ghost"
    open={openSections.includes(s.id)}
    onOpenChange={() => toggleSection(s.id)}
  >
    <CollapsibleTrigger><s.Icon />{s.label}</CollapsibleTrigger>
    <CollapsibleContent>{s.content}</CollapsibleContent>
  </Collapsible>
))}`}>
          <div className="w-full max-w-xs rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-border/60">
              <p className="text-sm font-semibold">Settings</p>
            </div>
            <div className="px-2 py-2">
              { [
                {
                  id: "appearance", label: "Appearance", Icon: Palette,
                  content: (
                    <div className="space-y-2 pb-2">
                      { [ "Light", "Dark", "System" ].map(t => (
                        <label key={ t } className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-muted/50 cursor-pointer">
                          <input type="radio" name="theme" defaultChecked={ t === "System" } className="accent-violet-600" />
                          <span className="text-sm">{ t }</span>
                        </label>
                      )) }
                    </div>
                  ),
                },
                {
                  id: "notifications", label: "Notifications", Icon: Bell,
                  content: (
                    <div className="space-y-2 pb-2">
                      { [ "Email alerts", "Push notifications", "Weekly digest" ].map(n => (
                        <label key={ n } className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-muted/50 cursor-pointer">
                          <input type="checkbox" defaultChecked className="accent-violet-600" />
                          <span className="text-sm">{ n }</span>
                        </label>
                      )) }
                    </div>
                  ),
                },
                {
                  id: "account", label: "Account", Icon: User,
                  content: (
                    <div className="space-y-1 pb-2">
                      { [ "Profile", "Password", "Two-factor auth", "Delete account" ].map(item => (
                        <button key={ item } className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors">
                          <ChevronRight className="h-3 w-3 shrink-0" />
                          { item }
                        </button>
                      )) }
                    </div>
                  ),
                },
                {
                  id: "billing", label: "Billing", Icon: CreditCard,
                  content: (
                    <div className="pb-2 px-2">
                      <div className="rounded-xl bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800/50 px-3 py-2.5">
                        <p className="text-xs font-semibold text-violet-700 dark:text-violet-400">Pro Plan</p>
                        <p className="text-xs text-violet-600/70 dark:text-violet-500">Next billing: Apr 26, 2026</p>
                      </div>
                    </div>
                  ),
                },
              ].map(section => (
                <Collapsible
                  key={ section.id }
                  variant="ghost"
                  open={ openSections.includes(section.id) }
                  onOpenChange={ () => toggleSection(section.id) }
                >
                  <CollapsibleTrigger className="gap-2.5 text-sm">
                    <section.Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                    { section.label }
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="ml-4 pl-3 border-l border-border/50">
                      { section.content }
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )) }
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* 8. FAQ */ }
      <Section id="faq" title="FAQ Pattern"
        description="Classic FAQ section using the flush variant.">
        <ComponentPreview code={ `{faqs.map((faq, i) => (
  <Collapsible key={i} variant="flush">
    <CollapsibleTrigger>{faq.question}</CollapsibleTrigger>
    <CollapsibleContent>
      <p className="pb-4 text-sm text-muted-foreground">{faq.answer}</p>
    </CollapsibleContent>
  </Collapsible>
))}`}>
          <div className="w-full max-w-lg">
            { [
              { q: "Is this component accessible?", a: "Yes. The trigger uses aria-expanded and aria-controls pointing to the content region. Keyboard navigation works with Space and Enter." },
              { q: "Does it use Radix or Headless UI?", a: "No. Built entirely with React state, useEffect for height animation, and Tailwind CSS. Zero peer dependencies." },
              { q: "Can I animate with CSS only?", a: "The height animation runs on a CSS transition driven by measured scrollHeight. The duration prop adjusts the speed." },
              { q: "How do I use it in a form?", a: "Wrap form fields in CollapsibleContent and bind open to your form logic — e.g. show optional fields when a checkbox is checked." },
            ].map((faq, i) => (
              <Collapsible key={ i } variant="flush">
                <CollapsibleTrigger className="py-3.5 gap-3">
                  <HelpCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{ faq.q }</span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <p className="pb-4 pl-7 text-sm text-muted-foreground leading-relaxed">
                    { faq.a }
                  </p>
                </CollapsibleContent>
              </Collapsible>
            )) }
          </div>
        </ComponentPreview>
      </Section>

      {/* 9. CODE REVEAL */ }
      <Section id="code-reveal" title="Code Block Reveal"
        description="Show a collapsed code snippet that expands on click.">
        <ComponentPreview code={ `<Collapsible variant="outline">
  <CollapsibleTrigger>
    <FileText className="h-4 w-4" />
    tailwind.config.ts
  </CollapsibleTrigger>
  <CollapsibleContent>
    <pre>…</pre>
  </CollapsibleContent>
</Collapsible>`}>
          <div className="w-full max-w-lg">
            <Collapsible variant="outline">
              <CollapsibleTrigger>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono text-sm">tailwind.config.ts</span>
                  <Badge variant="outline" className="ml-1 text-[10px] font-mono">config</Badge>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <pre className="text-xs bg-zinc-950 text-zinc-300 p-4 font-mono overflow-x-auto leading-relaxed">
                  { `import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
};

export default config;`}
                </pre>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </ComponentPreview>
      </Section>

      {/* 10. PROPS */ }
      <Section id="props" title="API Reference">
        <p className="text-sm font-semibold mb-3">Collapsible</p>
        <PropsTable props={ [
          { name: "open", type: "boolean", default: "—", description: "Controlled open state." },
          { name: "defaultOpen", type: "boolean", default: "false", description: "Initial open state for uncontrolled usage." },
          { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "Callback when open state changes." },
          { name: "variant", type: '"default"|"outline"|"ghost"|"card"|"flush"', default: '"default"', description: "Visual style of the container." },
          { name: "disabled", type: "boolean", default: "false", description: "Prevents toggling and dims the trigger." },
          { name: "duration", type: "number", default: "220", description: "Height transition duration in ms." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">CollapsibleTrigger</p>
        <PropsTable props={ [
          { name: "showChevron", type: "boolean", default: "true", description: "Show the built-in rotating ChevronDown icon." },
          { name: "className", type: "string", default: "—", description: "Merges with the variant trigger class." },
          { name: "disabled", type: "boolean", default: "false", description: "Disables this trigger independently of the root." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">CollapsibleContent</p>
        <PropsTable props={ [
          { name: "openClassName", type: "string", default: "—", description: "Class applied only when the content is open." },
          { name: "className", type: "string", default: "—", description: "Always-applied class on the content wrapper." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">useCollapsible</p>
        <PropsTable props={ [
          { name: "open", type: "boolean", default: "—", description: "Current open state — use inside any child of <Collapsible>." },
          { name: "toggle", type: "() => void", default: "—", description: "Toggle function — same as clicking the trigger." },
          { name: "disabled", type: "boolean", default: "—", description: "Whether the collapsible is disabled." },
        ] } />
      </Section>

    </DocsContent>
  );
}
