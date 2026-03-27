"use client";

import React, { useState } from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import {
  Collapsible, CollapsibleTrigger, CollapsibleContent,
  useCollapsible,                            // ← clean context hook
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  ChevronDown, Settings, Bell, Shield, Palette,
  CreditCard, User, Code2, Terminal, FileText,
  Plus, Minus, HelpCircle, ChevronRight, Search,
  Filter, Download, Eye, EyeOff, Lock, Unlock,
  Calendar, Clock, Star, TrendingUp, AlertCircle,
  CheckCircle2, XCircle, Info, Zap, Globe,
  Smartphone, Laptop, Monitor, Tablet,
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

function EyeIcon() {
  const { open } = useCollapsible();
  return open ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />;
}

function LockIcon() {
  const { open } = useCollapsible();
  return open ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />;
}

// ─── Page ─────────────────────────────────────────────────
export default function CollapsiblePage() {
  const [ open1, setOpen1 ] = useState(false);
  const [ openSections, setOpenSections ] = useState<string[]>([ "appearance" ]);
  const [ searchQuery, setSearchQuery ] = useState("");
  const [ notifications, setNotifications ] = useState(true);
  const [ darkMode, setDarkMode ] = useState(false);

  const toggleSection = (id: string) =>
    setOpenSections(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [ ...prev, id ]
    );

  return (
    <DocsContent
      title="Collapsible"
      description="An animated show/hide container with smooth height transitions. Built with React state and CSS transitions - zero external dependencies."
      importPath='import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";'
    >

      {/* ══════════════════════════════════════
          1. BASIC USAGE
      ══════════════════════════════════════ */}
      <Section
        id="basic"
        title="Basic Usage"
        description="A trigger button that reveals content below it with an animated height transition."
      >
        <ComponentPreview
          code={`<Collapsible>
  <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
  <CollapsibleContent>
    <p className="px-3 pb-3 text-sm text-muted-foreground">
      Yes! Zero external dependencies — just React and Tailwind CSS.
    </p>
  </CollapsibleContent>
</Collapsible>`}
        >
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

      {/* ══════════════════════════════════════
          2. VARIANTS
      ══════════════════════════════════════ */}
      <Section
        id="variants"
        title="Visual Variants"
        description="Five visual styles covering every layout context from bare ghost to elevated card."
      >
        <ComponentPreview
          code={`{(["default","outline","ghost","card","flush"] as const).map(v => (
  <Collapsible key={v} variant={v}>
    <CollapsibleTrigger>{v}</CollapsibleTrigger>
    <CollapsibleContent>…</CollapsibleContent>
  </Collapsible>
))}`}
        >
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

      {/* ══════════════════════════════════════
          3. CONTROLLED STATE
      ══════════════════════════════════════ */}
      <Section
        id="controlled"
        title="Controlled State"
        description="Manage open state externally via the open + onOpenChange props."
      >
        <ComponentPreview
          code={`const [open, setOpen] = useState(false);

<Collapsible open={open} onOpenChange={setOpen} variant="outline">
  <CollapsibleTrigger>{open ? "Hide" : "Show"} details</CollapsibleTrigger>
  <CollapsibleContent>…</CollapsibleContent>
</Collapsible>

<Button onClick={() => setOpen(o => !o)}>Toggle externally</Button>`}
        >
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

      {/* ══════════════════════════════════════
          4. DEFAULT OPEN
      ══════════════════════════════════════ */}
      <Section
        id="default-open"
        title="Default Open"
        description="Use defaultOpen to start expanded without controlling state."
      >
        <ComponentPreview
          code={`<Collapsible defaultOpen variant="card">
  <CollapsibleTrigger>Notifications</CollapsibleTrigger>
  <CollapsibleContent>…</CollapsibleContent>
</Collapsible>`}
        >
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

      {/* ══════════════════════════════════════
          5. DISABLED STATE
      ══════════════════════════════════════ */}
      <Section
        id="disabled"
        title="Disabled State"
        description="Set disabled to prevent toggling and show visual feedback."
      >
        <ComponentPreview
          code={`<Collapsible disabled variant="outline">
  <CollapsibleTrigger>Locked section</CollapsibleTrigger>
  <CollapsibleContent>…</CollapsibleContent>
</Collapsible>`}
        >
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

      {/* ══════════════════════════════════════
          6. CUSTOM TRIGGERS
      ══════════════════════════════════════ */}
      <Section
        id="custom-triggers"
        title="Custom Triggers"
        description="Pass showChevron={false} and use useCollapsible() for full control over trigger appearance."
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold mb-3">Custom Icons</h4>
            <ComponentPreview
              code={`// Custom icon component — reads open state via useCollapsible()
function PlusMinusIcon() {
  const { open } = useCollapsible();
  return open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />;
}

<Collapsible variant="card">
  <CollapsibleTrigger showChevron={false}>
    <span>Advanced settings</span>
    <PlusMinusIcon />
  </CollapsibleTrigger>
  <CollapsibleContent>…</CollapsibleContent>
</Collapsible>`}
            >
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
✓ Bundle: 142 kB` }
                    </pre>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </ComponentPreview>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Eye/Lock Icons</h4>
            <ComponentPreview
              code={`function EyeIcon() {
  const { open } = useCollapsible();
  return open ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />;
}

function LockIcon() {
  const { open } = useCollapsible();
  return open ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />;
}

<Collapsible variant="outline">
  <CollapsibleTrigger showChevron={false}>
    <span>Sensitive content</span>
    <EyeIcon />
  </CollapsibleTrigger>
  <CollapsibleContent>…</CollapsibleContent>
</Collapsible>`}
            >
              <div className="w-full max-w-md space-y-3">
                <Collapsible variant="outline">
                  <CollapsibleTrigger showChevron={ false }>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span>Show password</span>
                    </div>
                    <EyeIcon />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 pb-3">
                      <Input type="text" defaultValue="super-secret-password" className="font-mono text-sm" />
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible variant="outline">
                  <CollapsibleTrigger showChevron={ false }>
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <span>Secure area</span>
                    </div>
                    <LockIcon />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 pb-3 space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Authentication verified</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        This content is now accessible.
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </ComponentPreview>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          7. SETTINGS PANEL
      ══════════════════════════════════════ */}
      <Section
        id="settings-panel"
        title="Settings Panel"
        description="Multi-section settings sidebar with independent open states and form controls."
      >
        <ComponentPreview
          code={`const [openSections, setOpenSections] = useState(["appearance"]);

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
))}`}
        >
          <div className="w-full max-w-xs rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-border/60">
              <p className="text-sm font-semibold">Settings</p>
            </div>
            <div className="px-2 py-2">
              { [
                {
                  id: "appearance", label: "Appearance", Icon: Palette,
                  content: (
                    <div className="space-y-3 pb-2">
                      <div className="space-y-2">
                        <Label className="text-xs font-medium">Theme</Label>
                        { [ "Light", "Dark", "System" ].map(t => (
                          <label key={ t } className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-muted/50 cursor-pointer">
                            <input type="radio" name="theme" defaultChecked={ t === "System" } className="accent-violet-600" />
                            <span className="text-sm">{ t }</span>
                          </label>
                        )) }
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-medium">Font Size</Label>
                        <select className="w-full text-sm px-2 py-1 rounded-lg border border-border/50 bg-background">
                          <option>Medium</option>
                          <option>Small</option>
                          <option>Large</option>
                        </select>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "notifications", label: "Notifications", Icon: Bell,
                  content: (
                    <div className="space-y-3 pb-2">
                      { [
                        { label: "Email alerts", desc: "Get notified via email", defaultChecked: true },
                        { label: "Push notifications", desc: "Browser push notifications", defaultChecked: false },
                        { label: "Weekly digest", desc: "Summary of weekly activity", defaultChecked: true },
                      ].map(({ label, desc, defaultChecked }) => (
                        <div key={ label } className="flex items-center justify-between px-2 py-1.5">
                          <div className="space-y-0.5">
                            <Label className="text-sm font-medium cursor-pointer">{ label }</Label>
                            <p className="text-xs text-muted-foreground">{ desc }</p>
                          </div>
                          <Switch defaultChecked={ defaultChecked } />
                        </div>
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
                    <div className="pb-2 px-2 space-y-3">
                      <div className="rounded-xl bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800/50 px-3 py-2.5">
                        <p className="text-xs font-semibold text-violet-700 dark:text-violet-400">Pro Plan</p>
                        <p className="text-xs text-violet-600/70 dark:text-violet-500">Next billing: Apr 26, 2026</p>
                      </div>
                      <Button size="sm" variant="outline" className="w-full">Manage Subscription</Button>
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

      {/* ══════════════════════════════════════
          8. FAQ PATTERN
      ══════════════════════════════════════ */}
      <Section
        id="faq"
        title="FAQ Pattern"
        description="Classic FAQ section using the flush variant with icons and status indicators."
      >
        <ComponentPreview
          code={`{faqs.map((faq, i) => (
  <Collapsible key={i} variant="flush">
    <CollapsibleTrigger>
      <HelpCircle className="h-4 w-4" />
      {faq.question}
    </CollapsibleTrigger>
    <CollapsibleContent>
      <p className="pb-4 text-sm text-muted-foreground">{faq.answer}</p>
    </CollapsibleContent>
  </Collapsible>
))}`}
        >
          <div className="w-full max-w-lg">
            { [
              { 
                q: "Is this component accessible?", 
                a: "Yes. The trigger uses aria-expanded and aria-controls pointing to the content region. Keyboard navigation works with Space and Enter.",
                status: "success"
              },
              { 
                q: "Does it use Radix or Headless UI?", 
                a: "No. Built entirely with React state, useEffect for height animation, and Tailwind CSS. Zero peer dependencies.",
                status: "info"
              },
              { 
                q: "Can I animate with CSS only?", 
                a: "The height animation runs on a CSS transition driven by measured scrollHeight. The duration prop adjusts the speed.",
                status: "warning"
              },
              { 
                q: "How do I use it in a form?", 
                a: "Wrap form fields in CollapsibleContent and bind open to your form logic — e.g. show optional fields when a checkbox is checked.",
                status: "success"
              },
            ].map((faq, i) => (
              <Collapsible key={ i } variant="flush">
                <CollapsibleTrigger className="py-3.5 gap-3">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{ faq.q }</span>
                    { faq.status === "success" && <CheckCircle2 className="h-3 w-3 text-green-500" /> }
                    { faq.status === "warning" && <AlertCircle className="h-3 w-3 text-yellow-500" /> }
                    { faq.status === "info" && <Info className="h-3 w-3 text-blue-500" /> }
                  </div>
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

      {/* ══════════════════════════════════════
          9. INTERACTIVE EXAMPLES
      ══════════════════════════════════════ */}
      <Section
        id="interactive"
        title="Interactive Examples"
        description="Real-world patterns with forms, search, and dynamic content."
      >
        <div className="space-y-6">
          {/* Search Filter */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Search & Filter</h4>
            <ComponentPreview
              code={`const [searchQuery, setSearchQuery] = useState("");
const [filtersOpen, setFiltersOpen] = useState(false);

<Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
  <CollapsibleTrigger showChevron={false}>
    <Filter className="h-4 w-4" />
    Filters
  </CollapsibleTrigger>
  <CollapsibleContent>
    <div className="space-y-3 p-3">
      <Input placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      {/* Filter options */}
    </div>
  </CollapsibleContent>
</Collapsible>`}
            >
              <div className="w-full max-w-md">
                <Collapsible variant="ghost" open={ searchQuery !== "" } onOpenChange={ (open) => !open && setSearchQuery("") }>
                  <CollapsibleTrigger showChevron={ false } className="px-3 py-2.5 rounded-lg hover:bg-muted/60">
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <span>Search</span>
                    </div>
                    <EyeIcon />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 pb-3 space-y-3">
                      <Input 
                        placeholder="Search content..." 
                        value={ searchQuery }
                        onChange={ (e) => setSearchQuery(e.target.value) }
                        className="text-sm"
                      />
                      { searchQuery && (
                        <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                          <Search className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Searching for "{searchQuery}"
                          </span>
                        </div>
                      ) }
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </ComponentPreview>
          </div>

          {/* Device Selector */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Device Selector</h4>
            <ComponentPreview
              code={`const [selectedDevice, setSelectedDevice] = useState("desktop");

<Collapsible variant="card">
  <CollapsibleTrigger showChevron={false}>
    <Monitor className="h-4 w-4" />
    Device Preview
  </CollapsibleTrigger>
  <CollapsibleContent>
    <div className="space-y-2">
      {[
        { id: "desktop", icon: Monitor, label: "Desktop" },
        { id: "laptop", icon: Laptop, label: "Laptop" },
        { id: "tablet", icon: Tablet, label: "Tablet" },
        { id: "mobile", icon: Smartphone, label: "Mobile" }
      ].map(device => (
        <button
          key={device.id}
          onClick={() => setSelectedDevice(device.id)}
          className={cn(
            "w-full flex items-center gap-3 p-2 rounded-lg text-sm",
            selectedDevice === device.id ? "bg-muted" : "hover:bg-muted/50"
          )}
        >
          <device.icon className="h-4 w-4" />
          {device.label}
        </button>
      ))}
    </div>
  </CollapsibleContent>
</Collapsible>`}
            >
              <div className="w-full max-w-md">
                <Collapsible variant="card">
                  <CollapsibleTrigger showChevron={ false }>
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-muted-foreground" />
                      <span>Device Preview</span>
                    </div>
                    <EyeIcon />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-5 pb-4 space-y-2">
                      { [
                        { id: "desktop", icon: Monitor, label: "Desktop" },
                        { id: "laptop", icon: Laptop, label: "Laptop" },
                        { id: "tablet", icon: Tablet, label: "Tablet" },
                        { id: "mobile", icon: Smartphone, label: "Mobile" }
                      ].map(device => (
                        <button
                          key={ device.id }
                          className={ cn(
                            "w-full flex items-center gap-3 p-2 rounded-lg text-sm transition-colors",
                            "hover:bg-muted/50"
                          ) }
                        >
                          <device.icon className="h-4 w-4 text-muted-foreground" />
                          { device.label }
                        </button>
                      )) }
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </ComponentPreview>
          </div>

          {/* Stats Dashboard */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Stats Dashboard</h4>
            <ComponentPreview
              code={`<Collapsible variant="outline" defaultOpen>
  <CollapsibleTrigger>
    <TrendingUp className="h-4 w-4" />
    Analytics Overview
  </CollapsibleTrigger>
  <CollapsibleContent>
    <div className="grid grid-cols-2 gap-3 p-4">
      <div className="text-center">
        <p className="text-2xl font-bold">2.4k</p>
        <p className="text-xs text-muted-foreground">Visitors</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold">89%</p>
        <p className="text-xs text-muted-foreground">Conversion</p>
      </div>
    </div>
  </CollapsibleContent>
</Collapsible>`}
            >
              <div className="w-full max-w-md">
                <Collapsible variant="outline" defaultOpen>
                  <CollapsibleTrigger>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span>Analytics Overview</span>
                      <Badge variant="secondary" className="text-xs">Live</Badge>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 pb-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <p className="text-2xl font-bold">2.4k</p>
                          <p className="text-xs text-muted-foreground">Visitors</p>
                          <p className="text-xs text-green-600">+12%</p>
                        </div>
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <p className="text-2xl font-bold">89%</p>
                          <p className="text-xs text-muted-foreground">Conversion</p>
                          <p className="text-xs text-green-600">+5%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                        <Info className="h-4 w-4 text-blue-500" />
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                          Data updated 2 minutes ago
                        </p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </ComponentPreview>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          10. CODE REVEAL
      ══════════════════════════════════════ */}
      <Section
        id="code-reveal"
        title="Code Block Reveal"
        description="Show collapsed code snippets that expand on click with syntax highlighting."
      >
        <ComponentPreview
          code={`<Collapsible variant="outline">
  <CollapsibleTrigger>
    <FileText className="h-4 w-4" />
    tailwind.config.ts
  </CollapsibleTrigger>
  <CollapsibleContent>
    <pre className="text-xs bg-zinc-950 text-zinc-300 p-4 font-mono overflow-x-auto">
      {configCode}
    </pre>
  </CollapsibleContent>
</Collapsible>`}
        >
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

export default config;` }
                </pre>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          11. ANIMATION VARIATIONS
      ══════════════════════════════════════ */}
      <Section
        id="animations"
        title="Animation Variations"
        description="Control animation speed and behavior with the duration prop."
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold mb-3">Fast Animation</h4>
            <ComponentPreview
              code={`<Collapsible duration={100} variant="outline">
  <CollapsibleTrigger>Quick toggle (100ms)</CollapsibleTrigger>
  <CollapsibleContent>Fast content reveal</CollapsibleContent>
</Collapsible>`}
            >
              <div className="w-full max-w-md">
                <Collapsible duration={100} variant="outline">
                  <CollapsibleTrigger>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <span>Quick toggle (100ms)</span>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <p className="px-4 pb-3 text-sm text-muted-foreground">
                      Fast content reveal for snappy interactions.
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </ComponentPreview>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Slow Animation</h4>
            <ComponentPreview
              code={`<Collapsible duration={500} variant="outline">
  <CollapsibleTrigger>Slow reveal (500ms)</CollapsibleTrigger>
  <CollapsibleContent>Dramatic content transition</CollapsibleContent>
</Collapsible>`}
            >
              <div className="w-full max-w-md">
                <Collapsible duration={500} variant="outline">
                  <CollapsibleTrigger>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Slow reveal (500ms)</span>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <p className="px-4 pb-3 text-sm text-muted-foreground">
                      Dramatic content transition for emphasis.
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </ComponentPreview>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          12. API REFERENCE
      ══════════════════════════════════════ */}
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
          { name: "duration", type: "number", default: "—", description: "Animation duration in ms." },
          { name: "triggerId", type: "string", default: "—", description: "Generated trigger element ID." },
          { name: "contentId", type: "string", default: "—", description: "Generated content element ID." },
        ] } />
      </Section>

    </DocsContent>
  );
}
