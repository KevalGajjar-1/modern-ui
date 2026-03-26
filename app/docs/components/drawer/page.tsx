"use client";

import React, { useState } from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import {
  Drawer, DrawerContent, DrawerHeader, DrawerTitle,
  DrawerDescription, DrawerBody, DrawerFooter, DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Field } from "@/components/ui/field";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Switch } from "@/components/ui/switch";
import {
  Settings, Bell, User, ShoppingCart, Filter,
  Plus, Trash2, Star, Package, CreditCard,
  MapPin, ChevronRight, Search, Menu,
} from "lucide-react";

// ─── Cart item ────────────────────────────────────────────
const CART_ITEMS = [
  { id: 1, name: "Wireless Headphones", price: 79.99, qty: 1, icon: Star },
  { id: 2, name: "USB-C Hub (7-in-1)", price: 49.99, qty: 2, icon: Package },
  { id: 3, name: "Mechanical Keyboard", price: 129.99, qty: 1, icon: Package },
];

export default function DrawerPage() {
  const [ side, setSide ] = useState<"left" | "right" | "top" | "bottom">("right");
  const [ size, setSize ] = useState<"xs" | "sm" | "md" | "lg" | "xl" | "full">("md");

  // Drawer open states
  const [ basic, setBasic ] = useState(false);
  const [ sideDemo, setSideDemo ] = useState(false);
  const [ cart, setCart ] = useState(false);
  const [ settings, setSettings ] = useState(false);
  const [ filter, setFilter ] = useState(false);
  const [ nav, setNav ] = useState(false);

  // Settings state
  const [ notifs, setNotifs ] = useState(true);
  const [ emails, setEmails ] = useState(false);
  const [ darkMode, setDarkMode ] = useState(false);
  const [ sound, setSound ] = useState(true);

  const cartTotal = CART_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <DocsContent
      title="Drawer"
      description="A panel that slides in from any edge — left, right, top, or bottom. Supports five sizes, a scroll-locked body, footer actions, and a drag handle on mobile-style bottom sheets. No external dependencies."
      importPath='import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerBody, DrawerFooter, DrawerClose } from "@/components/ui/drawer";'
    >

      {/* ══════════════════════════════════════
          1. BASIC
      ══════════════════════════════════════ */}
      <Section
        id="basic"
        title="Basic"
        description="A right-side drawer with header, scrollable body, and footer action buttons."
      >
        <ComponentPreview
          code={ `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open drawer</Button>

<Drawer open={open} onOpenChange={setOpen}>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Edit profile</DrawerTitle>
      <DrawerDescription>Update your public profile information.</DrawerDescription>
    </DrawerHeader>
    <DrawerBody>
      <Field label="Display name" required>
        <Input placeholder="Alex Johnson" />
      </Field>
      <Field label="Bio" className="mt-4">
        <Input placeholder="Tell us about yourself" />
      </Field>
    </DrawerBody>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
      <Button>Save changes</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
        >
          <Button onClick={ () => setBasic(true) }>Open drawer</Button>

          <Drawer open={ basic } onOpenChange={ setBasic }>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Edit profile</DrawerTitle>
                <DrawerDescription>
                  Update your public profile information below.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerBody className="space-y-4">
                <Field label="Display name" required>
                  <Input placeholder="Alex Johnson" />
                </Field>
                <Field label="Username" hint="letters, numbers and underscores only">
                  <Input placeholder="alex_99" />
                </Field>
                <Field label="Email" required>
                  <Input type="email" placeholder="alex@example.com" />
                </Field>
                <Field label="Role">
                  <NativeSelect defaultValue="member">
                    <NativeSelectOption value="admin">Admin</NativeSelectOption>
                    <NativeSelectOption value="member">Member</NativeSelectOption>
                    <NativeSelectOption value="viewer">Viewer</NativeSelectOption>
                  </NativeSelect>
                </Field>
                <Field label="Bio" optional>
                  <Input placeholder="Tell us about yourself" />
                </Field>
              </DrawerBody>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
                <Button onClick={ () => setBasic(false) }>Save changes</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. SIDES & SIZES
      ══════════════════════════════════════ */}
      <Section
        id="sides-sizes"
        title="Sides & Sizes"
        description="Choose from four sides and six sizes. Top/bottom drawers show a drag handle automatically."
      >
        <ComponentPreview
          code={ `<Drawer open={open} onOpenChange={setOpen} side="bottom">
  <DrawerContent size="lg">…</DrawerContent>
</Drawer>`}
        >
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              { ([ "left", "right", "top", "bottom" ] as const).map(s => (
                <Button
                  key={ s }
                  variant="outline"
                  className="capitalize"
                  onClick={ () => { setSide(s); setSideDemo(true); } }
                >
                  { s }
                </Button>
              )) }
            </div>

            <div className="flex flex-wrap gap-2">
              { ([ "xs", "sm", "md", "lg", "xl", "full" ] as const).map(sz => (
                <Button
                  key={ sz }
                  variant={ size === sz ? "default" : "outline" }
                  size="sm"
                  className="font-mono text-xs uppercase"
                  onClick={ () => setSize(sz) }
                >
                  { sz }
                </Button>
              )) }
            </div>

            <p className="text-xs text-muted-foreground">
              Selected size: <strong>{ size }</strong> — click a side button above to preview.
            </p>
          </div>

          <Drawer open={ sideDemo } onOpenChange={ setSideDemo } side={ side }>
            <DrawerContent size={ size } side={ side }>
              <DrawerHeader>
                <DrawerTitle className="capitalize">{ side } drawer — { size }</DrawerTitle>
                <DrawerDescription>
                  This drawer slides in from the <strong>{ side }</strong> edge at size <strong>{ size }</strong>.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerBody>
                <p className="text-sm text-muted-foreground">
                  Resize the preview or change sides/sizes to see how the drawer adapts.
                  Bottom and top drawers show a drag handle automatically.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  { [ "xs", "sm", "md", "lg", "xl", "full" ].map(sz => (
                    <Badge
                      key={ sz }
                      variant={ size === sz ? "default" : "outline" }
                      className="justify-center font-mono text-[10px] cursor-pointer"
                      onClick={ () => setSize(sz as typeof size) }
                    >
                      { sz }
                    </Badge>
                  )) }
                </div>
              </DrawerBody>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          3. SHOPPING CART
      ══════════════════════════════════════ */}
      <Section
        id="cart"
        title="Shopping Cart"
        description="A real-world right-side cart drawer with items, totals, and a checkout footer."
      >
        <ComponentPreview code={ `<Drawer open={open} onOpenChange={setOpen}>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Cart (3)</DrawerTitle>
    </DrawerHeader>
    <DrawerBody>
      {items.map(item => <CartItem key={item.id} {...item} />)}
    </DrawerBody>
    <DrawerFooter>
      <Button className="w-full">Checkout — ${cartTotal.toFixed(2)}</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
        >
          <Button onClick={ () => setCart(true) } className="gap-2">
            <ShoppingCart className="h-4 w-4" /> Open cart
            <Badge className="h-5 w-5 p-0 flex items-center justify-center text-[10px]">
              { CART_ITEMS.length }
            </Badge>
          </Button>

          <Drawer open={ cart } onOpenChange={ setCart }>
            <DrawerContent size="sm">
              <DrawerHeader>
                <DrawerTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Your cart
                  <Badge variant="secondary">{ CART_ITEMS.length } items</Badge>
                </DrawerTitle>
                <DrawerDescription>Review your items before checkout.</DrawerDescription>
              </DrawerHeader>

              <DrawerBody className="space-y-3">
                { CART_ITEMS.map(item => (
                  <div key={ item.id } className="flex items-center gap-3 p-3 rounded-2xl border border-border/40 bg-card">
                    <div className="w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{ item.name }</p>
                      <p className="text-xs text-muted-foreground">Qty: { item.qty }</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold">${ (item.price * item.qty).toFixed(2) }</p>
                      <p className="text-[10px] text-muted-foreground">${ item.price }/ea</p>
                    </div>
                  </div>
                )) }

                <div className="rounded-2xl bg-muted/30 p-3 space-y-1.5 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span><span>${ cartTotal.toFixed(2) }</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span><span className="text-emerald-600">Free</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-1 border-t border-border/40">
                    <span>Total</span><span>${ cartTotal.toFixed(2) }</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-2xl border border-border/40 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  Free delivery to India — estimated 3–5 days
                </div>
              </DrawerBody>

              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full sm:w-auto">Continue shopping</Button>
                </DrawerClose>
                <Button className="w-full sm:w-auto gap-2" onClick={ () => setCart(false) }>
                  <CreditCard className="h-4 w-4" />
                  Checkout — ${ cartTotal.toFixed(2) }
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          4. SETTINGS PANEL
      ══════════════════════════════════════ */}
      <Section
        id="settings"
        title="Settings Panel"
        description="A settings drawer with toggle switches — common in dashboards and admin UIs."
      >
        <ComponentPreview code={ `<DrawerContent size="sm">
  <DrawerHeader>
    <DrawerTitle>Settings</DrawerTitle>
  </DrawerHeader>
  <DrawerBody>
    <div className="flex justify-between items-center">
      <div>
        <p>Push notifications</p>
        <p className="text-xs text-muted-foreground">…</p>
      </div>
      <Switch checked={notifs} onCheckedChange={setNotifs} />
    </div>
  </DrawerBody>
</DrawerContent>`}
        >
          <Button variant="outline" onClick={ () => setSettings(true) } className="gap-2">
            <Settings className="h-4 w-4" /> Open settings
          </Button>

          <Drawer open={ settings } onOpenChange={ setSettings }>
            <DrawerContent size="sm">
              <DrawerHeader>
                <DrawerTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" /> Settings
                </DrawerTitle>
                <DrawerDescription>Manage your notification and display preferences.</DrawerDescription>
              </DrawerHeader>

              <DrawerBody className="space-y-1">
                {/* Section: Notifications */ }
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 px-1 pt-2 pb-1">
                  Notifications
                </p>
                { [
                  { label: "Push notifications", desc: "Receive alerts on your device.", value: notifs, set: setNotifs, icon: Bell },
                  { label: "Email digest", desc: "Weekly summary in your inbox.", value: emails, set: setEmails, icon: User },
                  { label: "Sound effects", desc: "Play sounds for key actions.", value: sound, set: setSound, icon: Bell },
                ].map(item => (
                  <div key={ item.label } className="flex items-center justify-between py-3 px-1 rounded-xl hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-muted/60 flex items-center justify-center shrink-0">
                        <item.icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{ item.label }</p>
                        <p className="text-xs text-muted-foreground">{ item.desc }</p>
                      </div>
                    </div>
                    <Switch checked={ item.value } onCheckedChange={ item.set } />
                  </div>
                )) }

                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 px-1 pt-4 pb-1">
                  Appearance
                </p>
                <div className="flex items-center justify-between py-3 px-1 rounded-xl hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-muted/60 flex items-center justify-center shrink-0">
                      <Settings className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Dark mode</p>
                      <p className="text-xs text-muted-foreground">Switch to a darker theme.</p>
                    </div>
                  </div>
                  <Switch checked={ darkMode } onCheckedChange={ setDarkMode } />
                </div>

                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 px-1 pt-4 pb-1">
                  Language & Region
                </p>
                <div className="space-y-3 px-1">
                  <Field label="Language">
                    <NativeSelect defaultValue="en">
                      <NativeSelectOption value="en">English</NativeSelectOption>
                      <NativeSelectOption value="hi">Hindi</NativeSelectOption>
                      <NativeSelectOption value="fr">French</NativeSelectOption>
                    </NativeSelect>
                  </Field>
                  <Field label="Timezone">
                    <NativeSelect defaultValue="ist">
                      <NativeSelectOption value="ist">IST (UTC+5:30)</NativeSelectOption>
                      <NativeSelectOption value="utc">UTC</NativeSelectOption>
                      <NativeSelectOption value="pst">PST (UTC-8)</NativeSelectOption>
                    </NativeSelect>
                  </Field>
                </div>
              </DrawerBody>

              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Discard</Button>
                </DrawerClose>
                <Button onClick={ () => setSettings(false) }>Save preferences</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          5. BOTTOM SHEET (filter)
      ══════════════════════════════════════ */}
      <Section
        id="bottom-sheet"
        title="Bottom Sheet"
        description="Bottom drawers act as mobile-style sheets. The drag handle appears automatically. Great for filters, pickers, and quick actions."
      >
        <ComponentPreview code={ `<Drawer open={open} onOpenChange={setOpen} side="bottom">
  <DrawerContent size="lg" side="bottom">
    <DrawerHeader>…</DrawerHeader>
    <DrawerBody>…</DrawerBody>
    <DrawerFooter>…</DrawerFooter>
  </DrawerContent>
</Drawer>`}
        >
          <Button variant="outline" onClick={ () => setFilter(true) } className="gap-2">
            <Filter className="h-4 w-4" /> Filters
            <Badge variant="secondary" className="text-[9px]">3 active</Badge>
          </Button>

          <Drawer open={ filter } onOpenChange={ setFilter } side="bottom">
            <DrawerContent size="lg" side="bottom">
              <DrawerHeader>
                <DrawerTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" /> Filter results
                </DrawerTitle>
                <DrawerDescription>Narrow down results by category, price, and rating.</DrawerDescription>
              </DrawerHeader>
              <DrawerBody className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Category">
                  <NativeSelect defaultValue="electronics">
                    <NativeSelectOption value="all">All categories</NativeSelectOption>
                    <NativeSelectOption value="electronics">Electronics</NativeSelectOption>
                    <NativeSelectOption value="clothing">Clothing</NativeSelectOption>
                    <NativeSelectOption value="books">Books</NativeSelectOption>
                  </NativeSelect>
                </Field>
                <Field label="Price range">
                  <NativeSelect defaultValue="under-100">
                    <NativeSelectOption value="all">Any price</NativeSelectOption>
                    <NativeSelectOption value="under-50">Under ₹50</NativeSelectOption>
                    <NativeSelectOption value="under-100">Under ₹100</NativeSelectOption>
                    <NativeSelectOption value="under-500">Under ₹500</NativeSelectOption>
                  </NativeSelect>
                </Field>
                <Field label="Min rating">
                  <NativeSelect defaultValue="4">
                    <NativeSelectOption value="any">Any rating</NativeSelectOption>
                    <NativeSelectOption value="3">3+ stars</NativeSelectOption>
                    <NativeSelectOption value="4">4+ stars</NativeSelectOption>
                    <NativeSelectOption value="5">5 stars only</NativeSelectOption>
                  </NativeSelect>
                </Field>
                <Field label="Sort by">
                  <NativeSelect defaultValue="relevance">
                    <NativeSelectOption value="relevance">Relevance</NativeSelectOption>
                    <NativeSelectOption value="price-asc">Price: low → high</NativeSelectOption>
                    <NativeSelectOption value="price-desc">Price: high → low</NativeSelectOption>
                    <NativeSelectOption value="newest">Newest</NativeSelectOption>
                  </NativeSelect>
                </Field>
                <div className="sm:col-span-2 flex flex-wrap gap-2">
                  { [ "Free shipping", "In stock", "On sale", "Top rated" ].map(tag => (
                    <Badge key={ tag } variant="outline" className="cursor-pointer hover:bg-muted/50 transition-colors">
                      { tag }
                    </Badge>
                  )) }
                </div>
              </DrawerBody>
              <DrawerFooter>
                <Button variant="outline" className="gap-2">
                  <Trash2 className="h-4 w-4" /> Clear all
                </Button>
                <Button onClick={ () => setFilter(false) }>
                  Apply filters
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          6. MOBILE NAV
      ══════════════════════════════════════ */}
      <Section
        id="mobile-nav"
        title="Mobile Navigation"
        description="A left-side drawer acting as a mobile hamburger menu — common in responsive layouts."
      >
        <ComponentPreview code={ `<Drawer open={open} onOpenChange={setOpen} side="left">
  <DrawerContent size="xs" side="left" showClose={false}>
    <DrawerHeader>…brand…</DrawerHeader>
    <DrawerBody>
      {navItems.map(item => <NavLink key={item.label} {...item} />)}
    </DrawerBody>
  </DrawerContent>
</Drawer>`}
        >
          <Button variant="outline" size="sm" onClick={ () => setNav(true) } className="gap-2">
            <Menu className="h-4 w-4" /> Menu
          </Button>

          <Drawer open={ nav } onOpenChange={ setNav } side="left">
            <DrawerContent size="xs" side="left">
              <DrawerHeader className="flex-row items-center justify-between pb-4 border-b border-border/40">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-bold text-sm">Modern UI</span>
                </div>
              </DrawerHeader>

              <DrawerBody className="pt-3 space-y-0.5">
                { [
                  { icon: LayoutDashboard, label: "Dashboard", active: true },
                  { icon: BarChart3, label: "Analytics", active: false },
                  { icon: User, label: "Profile", active: false },
                  { icon: Bell, label: "Notifications", active: false },
                  { icon: Package, label: "Orders", active: false },
                  { icon: CreditCard, label: "Billing", active: false },
                  { icon: Settings, label: "Settings", active: false },
                ].map(item => (
                  <button
                    key={ item.label }
                    onClick={ () => setNav(false) }
                    className={ `w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${item.active
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/70 hover:bg-muted/60 hover:text-foreground"
                      }` }
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 shrink-0" />
                      { item.label }
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
                  </button>
                )) }
              </DrawerBody>

              <DrawerFooter className="border-t border-border/40 bg-transparent">
                <button
                  onClick={ () => setNav(false) }
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-colors"
                >
                  <User className="h-4 w-4" />
                  <div className="flex-1 text-left">
                    <p className="text-xs font-semibold text-foreground">Alex Johnson</p>
                    <p className="text-[10px] text-muted-foreground">alex@example.com</p>
                  </div>
                  <Settings className="h-3.5 w-3.5 shrink-0" />
                </button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          7. PROPS
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <p className="text-sm font-semibold mb-3">Drawer</p>
        <PropsTable props={ [
          { name: "open", type: "boolean", default: "—", description: "Controlled open state." },
          { name: "defaultOpen", type: "boolean", default: "false", description: "Initial open state when uncontrolled." },
          { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "Called when open state changes." },
          { name: "side", type: '"left" | "right" | "top" | "bottom"', default: '"right"', description: "Edge the drawer slides from." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">DrawerContent</p>
        <PropsTable props={ [
          { name: "side", type: '"left" | "right" | "top" | "bottom"', default: "inherits", description: "Override the side per-content instance." },
          { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl" | "full"', default: '"md"', description: "Width (horizontal) or height (vertical) of the panel." },
          { name: "showClose", type: "boolean", default: "true", description: "Show the X close button in the top-right corner." },
          { name: "closeOnBackdrop", type: "boolean", default: "true", description: "Close the drawer when the backdrop is clicked." },
          { name: "showHandle", type: "boolean", default: "true", description: "Show a drag handle on top/bottom drawers." },
          { name: "onClose", type: "() => void", default: "—", description: "Additional callback fired when the drawer closes." },
        ] } />
      </Section>
    </DocsContent>
  );
}

// ─── tiny helpers ─────────────────────────────────────────
import { LayoutDashboard, BarChart3 } from "lucide-react";
