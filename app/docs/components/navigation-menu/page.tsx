"use client";

import React from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuSeparator,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard, FileText, Settings, Users, BarChart3,
  Zap, Shield, Globe, Palette, Code2, Terminal,
  BookOpen, Newspaper, Video, Mic, Package,
  ChevronRight, Star, ArrowRight,
} from "lucide-react";

// ─── Re-usable card item ──────────────────────────────────
function NavCard({
  icon: Icon,
  title,
  description,
  badge,
  href = "#",
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  badge?: string;
  href?: string;
}) {
  return (
    <NavigationMenuLink
      href={ href }
      className="flex gap-3 p-3 rounded-xl hover:bg-muted/70 group/card"
    >
      <div className="w-9 h-9 rounded-xl bg-muted/60 flex items-center justify-center shrink-0 group-hover/card:bg-primary/10 transition-colors">
        <Icon className="h-4 w-4 text-muted-foreground group-hover/card:text-primary transition-colors" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">{ title }</span>
          { badge && (
            <Badge variant="secondary" className="text-[9px] h-4 px-1.5">{ badge }</Badge>
          ) }
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{ description }</p>
      </div>
    </NavigationMenuLink>
  );
}

export default function NavigationMenuPage() {
  return (
    <DocsContent
      title="Navigation Menu"
      description="A horizontal (or vertical) navigation bar with animated dropdown panels. Built on React state with hover + click support, keyboard navigation, Escape dismissal, and outside-click closing."
      importPath='import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu";'
    >

      {/* ══════════════════════════════════════
          1. BASIC
      ══════════════════════════════════════ */}
      <Section
        id="basic"
        title="Basic"
        description="A three-item nav bar. Click or hover a trigger to open its panel. Press Escape or click outside to close."
      >
        <ComponentPreview
          code={ `<NavigationMenu>
  <NavigationMenuList>

    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent width="260px">
        <div className="p-2 space-y-0.5">
          <NavigationMenuLink href="#">Analytics</NavigationMenuLink>
          <NavigationMenuLink href="#">Automation</NavigationMenuLink>
          <NavigationMenuLink href="#">Security</NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>

    <NavigationMenuItem>
      <NavigationMenuTrigger>Developers</NavigationMenuTrigger>
      <NavigationMenuContent width="220px">
        <div className="p-2 space-y-0.5">
          <NavigationMenuLink href="#">Docs</NavigationMenuLink>
          <NavigationMenuLink href="#">API Reference</NavigationMenuLink>
          <NavigationMenuLink href="#">SDK</NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>

    <NavigationMenuItem>
      <NavigationMenuLink href="#" className="px-3 py-2 text-sm font-medium">
        Pricing
      </NavigationMenuLink>
    </NavigationMenuItem>

  </NavigationMenuList>
</NavigationMenu>`}
        >
          <div className="w-full border-b border-border/40 bg-background px-4 py-2 rounded-2xl">
            <NavigationMenu ref={ React.createRef() }>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                  <NavigationMenuContent width="220px">
                    <div className="p-2 space-y-0.5">
                      <NavigationMenuLink href="#"><BarChart3 className="h-4 w-4 text-muted-foreground" />Analytics</NavigationMenuLink>
                      <NavigationMenuLink href="#"><Zap className="h-4 w-4 text-muted-foreground" />Automation</NavigationMenuLink>
                      <NavigationMenuLink href="#"><Shield className="h-4 w-4 text-muted-foreground" />Security</NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Developers</NavigationMenuTrigger>
                  <NavigationMenuContent width="220px">
                    <div className="p-2 space-y-0.5">
                      <NavigationMenuLink href="#"><BookOpen className="h-4 w-4 text-muted-foreground" />Documentation</NavigationMenuLink>
                      <NavigationMenuLink href="#"><Code2 className="h-4 w-4 text-muted-foreground" />API Reference</NavigationMenuLink>
                      <NavigationMenuLink href="#"><Terminal className="h-4 w-4 text-muted-foreground" />CLI</NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href="#" className="px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:bg-muted/70 hover:text-foreground transition-colors">
                    Pricing
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. MEGA MENU
      ══════════════════════════════════════ */}
      <Section
        id="mega-menu"
        title="Mega Menu"
        description="Wide multi-column panels for richer navigation. Use a grid inside NavigationMenuContent."
      >
        <ComponentPreview code={ `<NavigationMenuContent width="640px">
  <div className="grid grid-cols-2 gap-1 p-3">
    <NavCard icon={BarChart3} title="Analytics" description="Track key metrics." />
    <NavCard icon={Zap} title="Automation" description="Automate workflows." badge="New" />
    …
  </div>
</NavigationMenuContent>`}
        >
          <div className="w-full bg-background rounded-2xl border border-border/40 px-4 py-2">
            <NavigationMenu ref={ React.createRef() }>
              <NavigationMenuList>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Platform</NavigationMenuTrigger>
                  <NavigationMenuContent width="580px">
                    <div className="p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 px-3 pb-2">
                        Core Features
                      </p>
                      <div className="grid grid-cols-2 gap-0.5">
                        <NavCard icon={ BarChart3 } title="Analytics" description="Real-time dashboards and reports." />
                        <NavCard icon={ Zap } title="Automation" description="Trigger workflows automatically." badge="New" />
                        <NavCard icon={ Shield } title="Security" description="SOC 2 Type II compliance built-in." />
                        <NavCard icon={ Globe } title="Edge Network" description="Deploy to 300+ global regions." />
                        <NavCard icon={ Users } title="Team Access" description="Roles, SSO, and audit logs." />
                        <NavCard icon={ LayoutDashboard } title="Dashboard" description="Customisable admin workspace." badge="Beta" />
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent width="480px" align="center">
                    <div className="grid grid-cols-2 gap-0 p-3">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 px-3 pb-2">
                          Learn
                        </p>
                        <NavCard icon={ BookOpen } title="Documentation" description="Full guides and API reference." />
                        <NavCard icon={ Video } title="Video Tutorials" description="Step-by-step screencasts." />
                        <NavCard icon={ Mic } title="Podcast" description="Weekly engineering deep-dives." />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 px-3 pb-2">
                          Community
                        </p>
                        <NavCard icon={ Newspaper } title="Blog" description="Product news and updates." />
                        <NavCard icon={ Star } title="Changelog" description="What's new each release." />
                        <NavCard icon={ Package } title="Open Source" description="Our public repositories." />
                      </div>
                    </div>
                    <div className="border-t border-border/40 px-5 py-3 flex items-center justify-between bg-muted/20 rounded-b-2xl">
                      <p className="text-xs text-muted-foreground">New to the platform?</p>
                      <a href="#" className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                        Quick start <ArrowRight className="h-3 w-3" />
                      </a>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Developers</NavigationMenuTrigger>
                  <NavigationMenuContent width="240px">
                    <div className="p-2 space-y-0.5">
                      <NavigationMenuLink href="#"><Code2 className="h-4 w-4 text-muted-foreground" /> API Reference</NavigationMenuLink>
                      <NavigationMenuLink href="#"><Terminal className="h-4 w-4 text-muted-foreground" /> CLI Tools</NavigationMenuLink>
                      <NavigationMenuLink href="#"><Package className="h-4 w-4 text-muted-foreground" /> SDKs</NavigationMenuLink>
                      <NavigationMenuSeparator />
                      <NavigationMenuLink href="#" className="text-primary/90">
                        <Star className="h-4 w-4" /> GitHub ↗
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#"
                    className="px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:bg-muted/70 hover:text-foreground transition-colors"
                  >
                    Pricing
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          3. VERTICAL (sidebar)
      ══════════════════════════════════════ */}
      <Section
        id="vertical"
        title="Vertical / Sidebar"
        description="Set orientation='vertical' for a collapsible sidebar nav. Panels expand inline below each trigger."
      >
        <ComponentPreview
          code={ `<NavigationMenu orientation="vertical" className="w-56">
  <NavigationMenuList>

    <NavigationMenuItem>
      <NavigationMenuLink href="#" active>
        <LayoutDashboard /> Overview
      </NavigationMenuLink>
    </NavigationMenuItem>

    <NavigationMenuItem>
      <NavigationMenuTrigger>
        <Settings /> Settings
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="pl-4 space-y-0.5">
          <NavigationMenuLink href="#">General</NavigationMenuLink>
          <NavigationMenuLink href="#">Security</NavigationMenuLink>
          <NavigationMenuLink href="#">Billing</NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>

  </NavigationMenuList>
</NavigationMenu>`}
        >
          <div className="flex justify-start w-full">
            <div className="w-56 rounded-2xl border border-border/60 bg-card p-2">
              <NavigationMenu orientation="vertical" ref={ React.createRef() } className="w-full">
                <NavigationMenuList className="w-full">

                  <NavigationMenuItem className="w-full">
                    <NavigationMenuLink href="#" active className="w-full">
                      <LayoutDashboard className="h-4 w-4 shrink-0" /> Overview
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem className="w-full">
                    <NavigationMenuLink href="#" className="w-full">
                      <BarChart3 className="h-4 w-4 shrink-0 text-muted-foreground" /> Analytics
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem className="w-full">
                    <NavigationMenuTrigger className="w-full justify-between">
                      <span className="flex items-center gap-2.5">
                        <Settings className="h-4 w-4 shrink-0 text-muted-foreground" /> Settings
                      </span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="pl-5 pb-1 pt-0.5 space-y-0.5">
                        <NavigationMenuLink href="#" className="py-1.5 text-xs">General</NavigationMenuLink>
                        <NavigationMenuLink href="#" className="py-1.5 text-xs">Security</NavigationMenuLink>
                        <NavigationMenuLink href="#" className="py-1.5 text-xs">Billing</NavigationMenuLink>
                        <NavigationMenuLink href="#" className="py-1.5 text-xs">Integrations</NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem className="w-full">
                    <NavigationMenuTrigger className="w-full justify-between">
                      <span className="flex items-center gap-2.5">
                        <Users className="h-4 w-4 shrink-0 text-muted-foreground" /> Team
                      </span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="pl-5 pb-1 pt-0.5 space-y-0.5">
                        <NavigationMenuLink href="#" className="py-1.5 text-xs">Members</NavigationMenuLink>
                        <NavigationMenuLink href="#" className="py-1.5 text-xs">Roles</NavigationMenuLink>
                        <NavigationMenuLink href="#" className="py-1.5 text-xs">Invitations</NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem className="w-full">
                    <NavigationMenuLink href="#" className="w-full">
                      <FileText className="h-4 w-4 shrink-0 text-muted-foreground" /> Docs
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          4. FULL TOPBAR EXAMPLE
      ══════════════════════════════════════ */}
      <Section
        id="topbar"
        title="Full Top Bar"
        description="A complete app topbar with logo, nav, and CTA buttons — ready to drop into any layout."
      >
        <ComponentPreview code={ `<header className="flex items-center justify-between px-6 py-3 border-b">
  <Logo />
  <NavigationMenu>
    <NavigationMenuList>…</NavigationMenuList>
  </NavigationMenu>
  <div className="flex gap-2">
    <Button variant="ghost">Log in</Button>
    <Button>Get started</Button>
  </div>
</header>`}
        >
          <div className="w-full rounded-2xl border border-border/60 bg-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border/40">
              {/* Logo */ }
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-sm tracking-tight">Modern UI</span>
              </div>

              {/* Nav */ }
              <NavigationMenu ref={ React.createRef() }>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-xs">Product</NavigationMenuTrigger>
                    <NavigationMenuContent width="480px" align="center">
                      <div className="grid grid-cols-2 gap-0.5 p-3">
                        <NavCard icon={ BarChart3 } title="Analytics" description="Real-time data and reports." />
                        <NavCard icon={ Zap } title="Automation" description="Trigger workflows at scale." badge="New" />
                        <NavCard icon={ Shield } title="Security" description="Enterprise-grade compliance." />
                        <NavCard icon={ LayoutDashboard } title="Dashboard" description="Your command centre." />
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-xs">Docs</NavigationMenuTrigger>
                    <NavigationMenuContent width="220px">
                      <div className="p-2 space-y-0.5">
                        <NavigationMenuLink href="#" className="text-xs py-2"><BookOpen className="h-3.5 w-3.5 text-muted-foreground" /> Guides</NavigationMenuLink>
                        <NavigationMenuLink href="#" className="text-xs py-2"><Code2 className="h-3.5 w-3.5 text-muted-foreground" /> API Reference</NavigationMenuLink>
                        <NavigationMenuLink href="#" className="text-xs py-2"><Terminal className="h-3.5 w-3.5 text-muted-foreground" /> CLI</NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink href="#" className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-foreground/70 hover:bg-muted/60 hover:text-foreground transition-colors">
                      Pricing
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* CTA */ }
              <div className="flex items-center gap-2">
                <button className="text-xs font-medium text-foreground/70 hover:text-foreground transition-colors px-2.5 py-1.5 rounded-lg hover:bg-muted/50">
                  Log in
                </button>
                <button className="text-xs font-semibold bg-primary text-primary-foreground rounded-lg px-3 py-1.5 hover:bg-primary/90 transition-colors">
                  Get started
                </button>
              </div>
            </div>
            <div className="px-5 py-8 text-center text-muted-foreground/50 text-xs">
              Page content here
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          5. PROPS
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <p className="text-sm font-semibold mb-3">NavigationMenu</p>
        <PropsTable props={ [
          { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Controls layout direction and panel placement." },
          { name: "openDelay", type: "number", default: "0", description: "Milliseconds before a hovered item opens." },
          { name: "closeDelay", type: "number", default: "150", description: "Milliseconds before an item closes after mouse leaves." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">NavigationMenuTrigger</p>
        <PropsTable props={ [
          { name: "showChevron", type: "boolean", default: "true", description: "Show the rotating ChevronDown icon." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">NavigationMenuContent</p>
        <PropsTable props={ [
          { name: "align", type: '"start" | "center" | "end"', default: '"start"', description: "Horizontal alignment of the panel relative to its trigger." },
          { name: "width", type: "string", default: '"auto"', description: "CSS width of the dropdown panel." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">NavigationMenuLink</p>
        <PropsTable props={ [
          { name: "active", type: "boolean", default: "false", description: "Applies active background highlight." },
          { name: "asChild", type: "boolean", default: "false", description: "Merge link styles onto the direct child element." },
        ] } />
      </Section>
    </DocsContent>
  );
}
