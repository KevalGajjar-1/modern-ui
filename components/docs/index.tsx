"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search, Menu, X, ChevronRight, Copy, Check,
  BookOpen, Wrench, Palette, Map,
  SquareStack, Bell, Navigation, FormInput,
  Table2, Layers, MessageCircle, LayoutDashboard,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme-toggle";
import { Badge } from "@/components/ui/badge";

// ─── Types ───────────────────────────────────────────────
export interface SidebarItem { title: string; href: string; isNew?: boolean }
export interface SidebarCategory { title: string; icon: React.ReactNode; items: SidebarItem[] }

// ─── Navigation data ─────────────────────────────────────
export const DOCS_NAVIGATION: SidebarCategory[] = [
  {
    title: "Getting Started",
    icon: <BookOpen size={ 13 } />,
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Theming", href: "/docs/theming" },
      { title: "Roadmap", href: "/docs/roadmap" },
    ],
  },
  {
    title: "Core UI",
    icon: <SquareStack size={ 13 } />,
    items: [
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Alert", href: "/docs/components/alert" },
      { title: "Alert Dialog", href: "/docs/components/alert-dialog" },
      { title: "Aspect Ratio", href: "/docs/components/aspect-ratio" },
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Button", href: "/docs/components/button" },
      { title: "Button Group", href: "/docs/components/button-group", isNew: true },
      { title: "Card", href: "/docs/components/card" },
      { title: "Carousel", href: "/docs/components/carousel", isNew: true },
      { title: "Chart", href: "/docs/components/chart", isNew: true },
      { title: "Collapsible", href: "/docs/components/collapsible" },
      { title: "Kbd", href: "/docs/components/kbd" },
      { title: "Portal", href: "/docs/components/portal" },
      { title: "Resizable", href: "/docs/components/resizable" },
      { title: "Separator", href: "/docs/components/separator" },
      { title: "Skeleton", href: "/docs/components/skeleton" },
      { title: "Spinner", href: "/docs/components/spinner" },
      { title: "Toggle", href: "/docs/components/toggle" },
      { title: "Toggle Group", href: "/docs/components/toggle-group" },
      { title: "Typography", href: "/docs/components/typography" },
    ].sort((a, b) => a.title.localeCompare(b.title)),
  },
  {
    title: "Navigation",
    icon: <Navigation size={ 13 } />,
    items: [
      { title: "Breadcrumb", href: "/docs/components/breadcrumb" },
      { title: "Menubar", href: "/docs/components/menubar" },
      { title: "Navigation Menu", href: "/docs/components/navigation-menu" },
      { title: "Pagination", href: "/docs/components/pagination" },
      { title: "Sidebar", href: "/docs/components/sidebar" },
      { title: "Tabs", href: "/docs/components/tabs" },
    ].sort((a, b) => a.title.localeCompare(b.title)),
  },
  {
    title: "Forms",
    icon: <FormInput size={ 13 } />,
    items: [
      { title: "Calendar", href: "/docs/components/calendar" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Command", href: "/docs/components/command" },
      { title: "Date Picker", href: "/docs/components/date-picker" },
      { title: "Field", href: "/docs/components/field" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Input Group", href: "/docs/components/input-group" },
      { title: "Input OTP", href: "/docs/components/input-otp" },
      { title: "Label", href: "/docs/components/label" },
      { title: "Native Select", href: "/docs/components/native-select" },
      { title: "Radio Group", href: "/docs/components/radio-group" },
      { title: "Select", href: "/docs/components/select" },
      { title: "Slider", href: "/docs/components/slider" },
      { title: "Switch", href: "/docs/components/switch" },
      { title: "Textarea", href: "/docs/components/textarea" },
    ].sort((a, b) => a.title.localeCompare(b.title)),
  },
  {
    title: "Data Display",
    icon: <Table2 size={ 13 } />,
    items: [
      { title: "Data Table", href: "/docs/components/data-table" },
      { title: "Scroll Area", href: "/docs/components/scroll-area" },
      { title: "Table", href: "/docs/components/table" },
    ].sort((a, b) => a.title.localeCompare(b.title)),
  },
  {
    title: "Overlay",
    icon: <Layers size={ 13 } />,
    items: [
      { title: "Context Menu", href: "/docs/components/context-menu" },
      { title: "Dialog", href: "/docs/components/dialog" },
      { title: "Drawer", href: "/docs/components/drawer" },
      { title: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
      { title: "Hover Card", href: "/docs/components/hover-card" },
      { title: "Popover", href: "/docs/components/popover" },
      { title: "Sheet", href: "/docs/components/sheet" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
    ].sort((a, b) => a.title.localeCompare(b.title)),
  },
  {
    title: "Feedback",
    icon: <MessageCircle size={ 13 } />,
    items: [
      { title: "Alert", href: "/docs/components/alert" },
      { title: "Progress", href: "/docs/components/progress" },
      { title: "Spinner", href: "/docs/components/spinner" },
      { title: "Toast", href: "/docs/components/toast" },
    ].sort((a, b) => a.title.localeCompare(b.title)),
  },
];

// ─── Sidebar ──────────────────────────────────────────────
export function DocsSidebar() {
  const pathname = usePathname();
  const [ query, setQuery ] = useState("");

  const filtered = DOCS_NAVIGATION
    .map(cat => ({
      ...cat,
      items: cat.items.filter(i =>
        i.title.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter(cat => cat.items.length > 0);

  return (
    <aside className="w-64 border-r h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto hidden lg:flex flex-col bg-background/60 backdrop-blur-sm">
      {/* Search */ }
      <div className="px-5 pt-6 pb-4 border-b border-border/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={ 13 } />
          <input
            type="text"
            placeholder="Search components..."
            className="w-full pl-8 pr-4 py-2 text-xs border rounded-xl bg-muted/50 focus:outline-none focus:outline-2 focus:outline-violet-500/20 focus:border-violet-400 transition-all placeholder:text-muted-foreground/60"
            value={ query }
            onChange={ e => setQuery(e.target.value) }
          />
          { query && (
            <button
              onClick={ () => setQuery("") }
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={ 12 } />
            </button>
          ) }
        </div>
      </div>

      {/* Nav */ }
      <nav className="flex-1 px-3 py-5 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-border">
        { filtered.map(cat => (
          <div key={ cat.title }>
            <div className="flex items-center gap-1.5 px-2 mb-2">
              <span className="text-muted-foreground/70">{ cat.icon }</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/70">
                { cat.title }
              </span>
            </div>

            <ul className="space-y-0.5">
              { cat.items.map(item => {
                const active = pathname === item.href;
                return (
                  <li key={ item.href }>
                    <Link
                      href={ item.href }
                      className={ cn(
                        "group flex items-center justify-between px-3 py-2 text-sm rounded-xl transition-all duration-150",
                        active
                          ? "bg-violet-600 text-white font-medium shadow-sm shadow-violet-200"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                      ) }
                    >
                      <span className="flex items-center gap-2">
                        { active && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0" />
                        ) }
                        { item.title }
                      </span>
                      <div className="flex items-center gap-1.5">
                        { item.isNew && (
                          <span className={ cn(
                            "text-[9px] font-bold px-1.5 py-0.5 rounded-full",
                            active
                              ? "bg-white/20 text-white"
                              : "bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400"
                          ) }>
                            NEW
                          </span>
                        ) }
                        <ChevronRight size={ 12 } className={ cn(
                          "transition-transform",
                          active ? "opacity-60" : "opacity-0 group-hover:opacity-50"
                        ) } />
                      </div>
                    </Link>
                  </li>
                );
              }) }
            </ul>
          </div>
        )) }

        {/* Empty state */ }
        { filtered.length === 0 && (
          <div className="px-3 py-8 text-center">
            <p className="text-xs text-muted-foreground">
              No results for <strong className="text-foreground">"{ query }"</strong>
            </p>
            <button
              onClick={ () => setQuery("") }
              className="mt-2 text-xs text-violet-500 hover:underline"
            >
              Clear search
            </button>
          </div>
        ) }
      </nav>

      {/* Footer */ }
      <div className="px-5 py-4 border-t border-border/50">
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-xl px-3 py-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono">v1.0.0</span>
          <span className="ml-auto text-[10px] opacity-60">stable</span>
        </div>
      </div>
    </aside>
  );
}

// ─── Layout ───────────────────────────────────────────────
export function DocsLayout({ children }: { children: React.ReactNode }) {
  const [ isMobileOpen, setIsMobileOpen ] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-violet-200 selection:text-violet-900">

      {/* Header */ }
      <header className="h-16 border-b sticky top-0 z-50 bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-2 hover:bg-accent rounded-xl transition-colors"
            onClick={ () => setIsMobileOpen(true) }
          >
            <Menu size={ 18 } />
          </button>

          <Link href="/" className="font-bold text-lg tracking-tighter flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-sm shadow-violet-200 transition-transform group-hover:scale-110">
              M
            </div>
            <span className="hidden sm:inline-block">Modern UI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            { [
              { href: "/docs", label: "Docs" },
              { href: "/docs/components/button", label: "Components" },
              { href: "/docs/roadmap", label: "Roadmap" },
            ].map(n => (
              <Link key={ n.href } href={ n.href }
                className="px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all">
                { n.label }
              </Link>
            )) }
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 bg-muted/70 px-3 py-1.5 rounded-full font-mono text-[10px] text-muted-foreground border border-border/50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            v1.0.0
          </div>
          <ThemeToggle />
          <Link
            href="https://github.com"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Body */ }
      <div className="flex flex-1 max-w-screen-2xl mx-auto w-full">
        <DocsSidebar />
        <main className="flex-1 p-6 lg:p-12 xl:p-16 overflow-hidden">
          <div className="max-w-4xl mx-auto">
            { children }
          </div>
        </main>
      </div>

      {/* Mobile Drawer */ }
      <AnimatePresence>
        { isMobileOpen && (
          <>
            <motion.div
              initial={ { opacity: 0 } } animate={ { opacity: 1 } } exit={ { opacity: 0 } }
              onClick={ () => setIsMobileOpen(false) }
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div
              initial={ { x: "-100%" } } animate={ { x: 0 } } exit={ { x: "-100%" } }
              transition={ { type: "spring", damping: 26, stiffness: 220 } }
              className="fixed inset-y-0 left-0 w-72 bg-background z-[70] lg:hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <Link href="/" className="font-bold text-lg tracking-tighter flex items-center gap-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                    M
                  </div>
                  Modern UI
                </Link>
                <button
                  onClick={ () => setIsMobileOpen(false) }
                  className="p-1.5 hover:bg-accent rounded-lg transition-colors"
                >
                  <X size={ 16 } />
                </button>
              </div>

              <div className="px-4 py-3 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={ 12 } />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-8 pr-3 py-2 text-xs border rounded-xl bg-muted/50 focus:outline-none focus:border-violet-400 transition-all"
                  />
                </div>
              </div>

              <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
                { DOCS_NAVIGATION.map(cat => (
                  <div key={ cat.title }>
                    <div className="flex items-center gap-1.5 px-2 mb-1.5">
                      <span className="text-muted-foreground/70">{ cat.icon }</span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60">
                        { cat.title }
                      </span>
                    </div>
                    <ul className="space-y-0.5">
                      { cat.items.map(item => (
                        <li key={ item.href }>
                          <Link
                            href={ item.href }
                            onClick={ () => setIsMobileOpen(false) }
                            className="flex items-center justify-between px-3 py-2 text-sm rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-all"
                          >
                            { item.title }
                            { item.isNew && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400">
                                NEW
                              </span>
                            ) }
                          </Link>
                        </li>
                      )) }
                    </ul>
                  </div>
                )) }
              </nav>

              <div className="px-5 py-4 border-t border-border/50">
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-xl px-3 py-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono">v1.0.0</span>
                  <span className="ml-auto text-[10px] opacity-60">stable</span>
                </div>
              </div>
            </motion.div>
          </>
        ) }
      </AnimatePresence>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────
export function Section({
  title, description, children, id, className,
}: {
  title: string; description?: string; children: React.ReactNode; id?: string; className?: string;
}) {
  return (
    <section className={ cn("mb-14 scroll-mt-24", className) } id={ id }>
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight mb-2 flex items-center group">
          { title }
          { id && (
            <Link
              href={ `#${id}` }
              className="ml-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-all text-base font-normal"
            >
              #
            </Link>
          ) }
        </h2>
        { description && (
          <p className="text-muted-foreground leading-relaxed max-w-3xl">{ description }</p>
        ) }
      </div>
      { children }
    </section>
  );
}

// ─── DemoCard ─────────────────────────────────────────────
export function DemoCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={ cn(
      "rounded-2xl border border-border/60 bg-card p-8 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5",
      className
    ) }>
      { children }
    </div>
  );
}

// ─── ComponentPreview ─────────────────────────────────────
export function ComponentPreview({ children, code }: { children: React.ReactNode; code?: string }) {
  const [ activeTab, setActiveTab ] = useState<"preview" | "code">("preview");
  const id = React.useId();

  return (
    <div className="my-6 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 rounded-xl bg-muted/60 p-1 border border-border/50">
          { ([ "preview", "code" ] as const).map(tab => (
            <button key={ tab } type="button" onClick={ () => setActiveTab(tab) }
              className={ cn(
                "relative rounded-lg px-4 py-1.5 text-xs font-medium capitalize transition-all",
                activeTab === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              ) }>
              { activeTab === tab && (
                <motion.div
                  layoutId={ `tab-${id}` }
                  className="absolute inset-0 rounded-lg bg-background shadow-sm border border-border/40"
                  transition={ { type: "spring", bounce: 0.2, duration: 0.5 } }
                />
              ) }
              <span className="relative z-10">{ tab }</span>
            </button>
          )) }
        </div>
        { code && <CopyButton value={ code } /> }
      </div>

      <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm">
        { activeTab === "preview" ? (
          <div className="flex min-h-[320px] w-full items-center justify-center p-8 md:p-12">
            { children }
          </div>
        ) : (
          <CodeBlock code={ code ?? "" } noMargin />
        ) }
      </div>
    </div>
  );
}

// ─── CodeBlock ────────────────────────────────────────────
export function CodeBlock({ code, noMargin, filename }: { code: string; noMargin?: boolean; filename?: string }) {
  return (
    <div className={ cn("relative group", !noMargin && "my-6") }>
      { filename && (
        <div className="flex items-center gap-2 bg-zinc-900 px-4 py-2.5 border-b border-zinc-800 rounded-t-xl">
          <span className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
          </span>
          <span className="text-xs text-zinc-400 font-mono ml-1">{ filename }</span>
        </div>
      ) }
      <pre className={ cn(
        "bg-zinc-950 text-zinc-300 p-5 overflow-x-auto font-mono text-[13px] leading-relaxed",
        "scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent",
        filename ? "rounded-b-xl" : "rounded-xl"
      ) }>
        <code>{ code }</code>
      </pre>
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton value={ code } dark />
      </div>
    </div>
  );
}

// ─── CopyButton ───────────────────────────────────────────
export function CopyButton({ value, dark }: { value: string; dark?: boolean }) {
  const [ copied, setCopied ] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={ copy } title="Copy code"
      className={ cn(
        "p-2 rounded-lg transition-all flex items-center gap-1.5 text-xs font-medium",
        dark
          ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200"
          : "hover:bg-accent text-muted-foreground hover:text-foreground"
      ) }>
      { copied
        ? <><Check size={ 14 } className="text-emerald-500" />{ dark && <span className="text-emerald-400">Copied</span> }</>
        : <><Copy size={ 14 } />{ dark && <span>Copy</span> }</>
      }
    </button>
  );
}

// ─── PropsTable ───────────────────────────────────────────
export interface PropDefinition {
  name: string; type: string; default?: string; required?: boolean; description: string;
}

export function PropsTable({ props }: { props: PropDefinition[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border/60 mb-8 shadow-sm">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-muted/50 border-b border-border/60">
            { [ "Prop", "Type", "Default", "Description" ].map(h => (
              <th key={ h } className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                { h }
              </th>
            )) }
          </tr>
        </thead>
        <tbody className="divide-y divide-border/40">
          { props.map(p => (
            <tr key={ p.name } className="hover:bg-muted/30 transition-colors">
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <code className="font-mono text-violet-600 dark:text-violet-400 font-semibold text-[13px]">
                    { p.name }
                  </code>
                  { p.required && (
                    <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded-full">
                      req
                    </span>
                  ) }
                </div>
              </td>
              <td className="px-5 py-3.5">
                <code className="font-mono text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground border border-border/50">
                  { p.type }
                </code>
              </td>
              <td className="px-5 py-3.5 font-mono text-xs text-muted-foreground">
                { p.default ?? <span className="opacity-40">—</span> }
              </td>
              <td className="px-5 py-3.5 text-muted-foreground text-sm leading-relaxed">
                { p.description }
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}

// ─── DocsContent ──────────────────────────────────────────
export function DocsContent({
  title, description, children, importPath, badge,
}: {
  title: string; description: string; children: React.ReactNode;
  importPath?: string; badge?: string;
}) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
      <header className="mb-12 pb-10 border-b border-border/60">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={ 11 } className="opacity-50" />
          <Link href="/docs" className="hover:text-foreground transition-colors">Docs</Link>
          <ChevronRight size={ 11 } className="opacity-50" />
          <span className="text-foreground font-medium">{ title }</span>
        </nav>

        <div className="flex items-start gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{ title }</h1>
              { badge && (
                <Badge className="bg-violet-100 text-violet-700 border-0 text-[10px] font-bold mt-1.5 shrink-0">
                  { badge }
                </Badge>
              ) }
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              { description }
            </p>
          </div>
        </div>

        { importPath && (
          <div className="mt-6 flex items-center gap-2 bg-zinc-950 text-zinc-300 border border-zinc-800 rounded-xl px-4 py-3 w-fit shadow-md">
            <code className="text-sm font-mono">{ importPath }</code>
            <div className="w-px h-4 bg-zinc-700 mx-1" />
            <CopyButton value={ importPath } dark />
          </div>
        ) }
      </header>

      <div className="space-y-10">
        { children }
      </div>
    </div>
  );
}
